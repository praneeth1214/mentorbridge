import json
from pathlib import Path

import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


BASE_DIR = Path(__file__).resolve().parent.parent
MENTORS_FILE = BASE_DIR / "data" / "mentors.json"

_model = None
_mentors = None
_mentor_embeddings = None


def load_model():
    global _model

    if _model is None:
        _model = SentenceTransformer("all-MiniLM-L6-v2")

    return _model


def load_mentors():
    global _mentors

    if _mentors is None:
        with open(MENTORS_FILE, "r", encoding="utf-8") as file:
            _mentors = json.load(file)

    return _mentors


def mentor_text(mentor):
    return " ".join(
        [
            mentor["role"],
            mentor["company"],
            mentor["experience_summary"],
            " ".join(mentor["expertise"]),
            " ".join(mentor["industries"]),
            " ".join(mentor["skills"]),
        ]
    )


def get_mentor_embeddings():
    global _mentor_embeddings

    if _mentor_embeddings is None:
        model = load_model()
        mentors = load_mentors()

        texts = [mentor_text(mentor) for mentor in mentors]

        _mentor_embeddings = model.encode(
            texts,
            normalize_embeddings=True,
        )

    return _mentor_embeddings


def build_problem_text(problem: str, analysis: dict):
    return " ".join(
        [
            problem,
            analysis.get("domain", ""),
            analysis.get("problem_summary", ""),
            " ".join(analysis.get("problem_areas", [])),
            " ".join(analysis.get("required_skills", [])),
            " ".join(analysis.get("keywords", [])),
            " ".join(analysis.get("experience_requirements", [])),
        ]
    )


def match_mentors(problem: str, analysis: dict, top_k: int = 3):
    model = load_model()
    mentors = load_mentors()
    mentor_embeddings = get_mentor_embeddings()

    problem_text = build_problem_text(problem, analysis)

    problem_embedding = model.encode(
        [problem_text],
        normalize_embeddings=True,
    )

    similarities = cosine_similarity(
        problem_embedding,
        mentor_embeddings,
    )[0]

    ranked_indices = np.argsort(similarities)[::-1][:top_k]

    results = []

    for index in ranked_indices:
        mentor = mentors[index].copy()

        similarity = float(similarities[index])

        # Convert similarity into a readable percentage.
        # This is a similarity score, not a probability.
        match_percentage = round(
            max(0.0, min(1.0, similarity)) * 100
        )

        mentor["match_percentage"] = match_percentage
        mentor["similarity"] = round(similarity, 4)

        results.append(mentor)

    return results