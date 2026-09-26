import json
from pathlib import Path

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


BASE_DIR = Path(__file__).resolve().parent.parent
MENTORS_FILE = BASE_DIR / "data" / "mentors.json"

_mentors = None
_vectorizer = None
_mentor_matrix = None


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


def get_vectorizer_and_matrix():
    global _vectorizer, _mentor_matrix

    if _vectorizer is None or _mentor_matrix is None:
        mentors = load_mentors()

        texts = [mentor_text(mentor) for mentor in mentors]

        _vectorizer = TfidfVectorizer(
            lowercase=True,
            stop_words="english",
            ngram_range=(1, 2),
            sublinear_tf=True,
        )

        _mentor_matrix = _vectorizer.fit_transform(texts)

    return _vectorizer, _mentor_matrix


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
    mentors = load_mentors()
    vectorizer, mentor_matrix = get_vectorizer_and_matrix()

    problem_text = build_problem_text(problem, analysis)

    problem_vector = vectorizer.transform([problem_text])

    similarities = cosine_similarity(
        problem_vector,
        mentor_matrix,
    )[0]

    ranked_indices = np.argsort(similarities)[::-1][:top_k]

    results = []

    for index in ranked_indices:
        mentor = mentors[index].copy()

        similarity = float(similarities[index])

        match_percentage = round(
            max(0.0, min(1.0, similarity)) * 100
        )

        mentor["match_percentage"] = match_percentage
        mentor["similarity"] = round(similarity, 4)

        results.append(mentor)

    return results