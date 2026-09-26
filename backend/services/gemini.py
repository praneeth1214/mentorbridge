import asyncio
import json
import os

import httpx
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

GEMINI_URL = (
    "https://generativelanguage.googleapis.com/v1beta/"
    "models/gemini-3.6-flash:generateContent"
)


# ============================================================
# COMMON GEMINI REQUEST
# ============================================================

async def _gemini_request(
    payload: dict,
    retries: int = 2,
):
    if not GEMINI_API_KEY:
        raise RuntimeError("GEMINI_API_KEY is missing.")

    headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY,
    }

    delays = [2, 4]

    async with httpx.AsyncClient(timeout=60.0) as client:

        for attempt in range(retries + 1):

            response = await client.post(
                GEMINI_URL,
                headers=headers,
                json=payload,
            )

            if response.status_code == 200:
                return response.json()

            # Do NOT repeatedly hammer Gemini on quota errors.
            if response.status_code == 429:
                raise RuntimeError(
                    "Gemini rate limit reached. "
                    "Please wait a moment and try again."
                )

            # Temporary server failures can be retried.
            if response.status_code in (
                408,
                500,
                502,
                503,
                504,
            ):
                if attempt < retries:
                    print(
                        f"Gemini returned {response.status_code}. "
                        f"Retrying in {delays[attempt]} seconds..."
                    )

                    await asyncio.sleep(delays[attempt])
                    continue

            raise RuntimeError(
                f"Gemini API error: {response.status_code} "
                f"{response.text}"
            )

    raise RuntimeError(
        "Gemini service is temporarily unavailable."
    )


# ============================================================
# PROBLEM ANALYSIS
# ============================================================

async def analyze_problem(
    problem: str,
    domain: str = "",
):
    prompt = f"""
You are an expert startup and business problem analyst.

Analyze the following startup/business challenge and return ONLY
valid JSON.

Challenge:
{problem}

Domain:
{domain}

Return exactly this structure:

{{
  "domain": "string",
  "problem_summary": "short clear summary",
  "problem_areas": ["area1", "area2", "area3"],
  "required_skills": ["skill1", "skill2", "skill3"],
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "experience_requirements": ["requirement1", "requirement2"]
}}

Do not add markdown.
Do not add explanations outside the JSON.
"""

    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json"
        }
    }

    data = await _gemini_request(payload)

    try:
        text = (
            data["candidates"][0]
            ["content"]
            ["parts"][0]
            ["text"]
        )

        return json.loads(text)

    except (
        KeyError,
        IndexError,
        json.JSONDecodeError,
    ) as exc:

        raise RuntimeError(
            f"Invalid Gemini response: {data}"
        ) from exc


# ============================================================
# MENTOR MATCH EXPLANATION
# ============================================================

async def explain_mentor_match(
    problem: str,
    analysis: dict,
    mentor: dict,
):
    prompt = f"""
You are an expert mentor-matching analyst for MENTORBRIDGE.

Explain why this professional is relevant to the student's problem.

STUDENT PROBLEM:
{problem}

AI ANALYSIS:
{json.dumps(analysis, ensure_ascii=False)}

MENTOR PROFILE:
{json.dumps(mentor, ensure_ascii=False)}

Write a concise explanation in 2-3 sentences.

Focus only on concrete overlap between:
- the student's problem
- required skills
- problem areas
- mentor expertise
- mentor industries
- mentor experience

Do not invent experience.
Do not mention that you are an AI.
Do not give a generic compliment.
Return only the explanation text.
"""

    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ]
    }

    data = await _gemini_request(payload)

    try:
        return (
            data["candidates"][0]
            ["content"]
            ["parts"][0]
            ["text"]
            .strip()
        )

    except (KeyError, IndexError) as exc:

        raise RuntimeError(
            f"Invalid Gemini explanation response: {data}"
        ) from exc


# ============================================================
# KNOWLEDGE COPILOT
# ============================================================

async def answer_copilot(
    problem: str,
    domain: str,
    question: str,
):
    prompt = f"""
You are Knowledge Copilot inside MENTORBRIDGE.

Your job is to help a student understand and explore their
startup or business problem before speaking with an experienced
professional.

CURRENT CHALLENGE:
{problem}

DOMAIN:
{domain or "Not specified"}

STUDENT QUESTION:
{question}

Instructions:

1. Answer specifically in relation to the student's challenge.
2. Give practical and understandable guidance.
3. Do not invent facts about the student's business.
4. If information is missing, clearly say what information would
   help answer the question.
5. Prefer concise structured answers.
6. When useful, use short bullet points.
7. Help the student prepare for a conversation with an experienced
   mentor.
8. Do not pretend to be the mentor.
9. Do not say you are a human.
10. Avoid generic motivational language.

Keep the answer focused and useful.
"""

    payload = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt
                    }
                ]
            }
        ],
        "generationConfig": {
            "temperature": 0.4,
            "maxOutputTokens": 700,
        },
    }

    data = await _gemini_request(
        payload,
        retries=1,
    )

    try:
        return (
            data["candidates"][0]
            ["content"]
            ["parts"][0]
            ["text"]
            .strip()
        )

    except (KeyError, IndexError) as exc:

        raise RuntimeError(
            f"Invalid Gemini Copilot response: {data}"
        ) from exc