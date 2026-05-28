
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from supabase import create_client
from dotenv import load_dotenv
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
import os

# Load environment variables
load_dotenv()

# FastAPI app
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# Supabase credentials
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

# Create Supabase client
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Load embedding model
model = SentenceTransformer('all-MiniLM-L6-v2')


# Request schema
class JDRequest(BaseModel):
    job_description: str


# Home route
@app.get("/")
def home():
    return {"message": "Candidate Ranking API Running"}


# Fetch all candidates
@app.get("/candidates")
def get_candidates():
    response = supabase.table("candidates").select("*").execute()
    return response.data


# Generate embeddings for candidates
@app.post("/generate-embeddings")
def generate_embeddings():

    candidates = supabase.table("candidates").select("*").execute().data

    for candidate in candidates:

        text = candidate["resume_text"]

        embedding = model.encode(text).tolist()

        supabase.table("candidates").update({
            "embedding": embedding
        }).eq("id", candidate["id"]).execute()

    return {"message": "Embeddings generated successfully"}


# AI Candidate Matching Endpoint
@app.post("/api/mike/match")
def match_candidates(data: JDRequest):

    jd = data.job_description.lower()

    # Generate JD embedding
    jd_embedding = model.encode(jd)

    # Fetch candidates
    candidates = supabase.table("candidates").select("*").execute().data

    results = []

    for candidate in candidates:

        score = 0

        skills = candidate["skills"].lower()

        # Keyword matching
        if "python" in jd and "python" in skills:
            score += 30

        if "fastapi" in jd and "fastapi" in skills:
            score += 25

        if "ai" in jd and "ai" in skills:
            score += 20

        if "langchain" in jd and "langchain" in skills:
            score += 20

        # Experience score
        experience_score = candidate["experience"] * 5
        score += experience_score

        # Embedding similarity
        candidate_embedding = candidate.get("embedding")

        similarity_score = 0

        try:
            if candidate_embedding:

                candidate_embedding = [
                    float(x) for x in candidate_embedding
                ]

                jd_embedding_list = [
                    float(x) for x in jd_embedding
                ]

                dot_product = sum(
                    a * b
                    for a, b in zip(jd_embedding_list, candidate_embedding)
                )

                similarity_score = round(dot_product * 10, 2)

                score += similarity_score

        except Exception:
            similarity_score = 0

        # Match rationale
        reason = (
            f"Matched relevant skills with "
            f"{candidate['experience']} years experience "
            f"and semantic similarity score of {similarity_score}"
        )

        results.append({
            "name": candidate["name"],
            "skills": candidate["skills"],
            "experience": candidate["experience"],
            "location": candidate["location"],
            "score": round(score, 2),
            "semantic_similarity": similarity_score,
            "reason": reason
        })

    # Sort candidates by score
    ranked = sorted(results, key=lambda x: x["score"], reverse=True)

    return {
        "top_matches": ranked[:10]
    }