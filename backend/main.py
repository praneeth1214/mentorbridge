from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from services.gemini import (
    analyze_problem,
    explain_mentor_match,
    answer_copilot,
)

from services.matching import match_mentors

from services.trust_ledger import (
    get_ledger,
    record_action,
    verify_chain,
)


app = FastAPI(
    title="MENTORBRIDGE API",
    version="1.0.0",
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:8443",
    "http://127.0.0.1:8443",
    "https://mentorbridge-nyzw.vercel.app",
],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# REQUEST MODELS
# ============================================================

class AnalyzeRequest(BaseModel):
    problem: str = Field(min_length=30)
    domain: Optional[str] = ""


class MatchRequest(BaseModel):
    problem: str = Field(min_length=30)
    domain: Optional[str] = ""


class ExplainRequest(BaseModel):
    problem: str = Field(min_length=30)
    analysis: dict
    mentor: dict


class CopilotRequest(BaseModel):
    problem: str = Field(min_length=1)
    domain: Optional[str] = ""
    question: str = Field(min_length=1)


# ============================================================
# ROOT
# ============================================================

@app.get("/")
def root():
    return {
        "name": "MENTORBRIDGE API",
        "status": "running",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }


# ============================================================
# AI ANALYSIS
# ============================================================

@app.post("/api/analyze")
async def analyze(request: AnalyzeRequest):

    try:

        analysis = await analyze_problem(
            request.problem,
            request.domain or "",
        )

        return {
            "success": True,
            "analysis": analysis,
        }

    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )


# ============================================================
# MENTOR MATCHING
# ============================================================

@app.post("/api/match")
async def match(request: MatchRequest):

    try:

        analysis = await analyze_problem(
            request.problem,
            request.domain or "",
        )

        mentors = match_mentors(
            request.problem,
            analysis,
            top_k=3,
        )

        return {
            "success": True,
            "analysis": analysis,
            "matches": mentors,
        }

    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )


# ============================================================
# MENTOR EXPLANATION
# ============================================================

@app.post("/api/explain")
async def explain(request: ExplainRequest):

    try:

        explanation = await explain_mentor_match(
            request.problem,
            request.analysis,
            request.mentor,
        )

        return {
            "success": True,
            "explanation": explanation,
        }

    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )


# ============================================================
# KNOWLEDGE COPILOT
# ============================================================

@app.post("/api/copilot")
async def copilot(request: CopilotRequest):

    try:

        answer = await answer_copilot(
            problem=request.problem,
            domain=request.domain or "",
            question=request.question,
        )

        # Record Copilot usage in trust ledger
        try:
            record_action(
                action="KNOWLEDGE_COPILOT_USED",
                metadata={
                    "domain": request.domain or "",
                    "question_length": len(request.question),
                },
            )
        except Exception:
            pass

        return {
            "success": True,
            "answer": answer,
        }

    except RuntimeError as exc:

        message = str(exc)

        if "rate limit" in message.lower():

            raise HTTPException(
                status_code=429,
                detail=message,
            )

        raise HTTPException(
            status_code=503,
            detail=message,
        )

    except Exception as exc:

        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )


# ============================================================
# TRUST LEDGER
# ============================================================

@app.get("/api/ledger")
def ledger():

    return {
        "success": True,
        "records": get_ledger(),
    }


@app.get("/api/ledger/verify")
def verify_ledger():

    result = verify_chain()

    return {
        "success": True,
        **result,
    }


@app.post("/api/ledger/record")
def create_ledger_record(
    action: str,
    metadata: Optional[dict] = None,
):

    record = record_action(
        action=action,
        metadata=metadata or {},
    )

    return {
        "success": True,
        "record": record,
    }