from supabase import create_client
from sentence_transformers import SentenceTransformer
from faker import Faker
import random
import os
from dotenv import load_dotenv

load_dotenv()

fake = Faker()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

model = SentenceTransformer('all-MiniLM-L6-v2')

skills_pool = [
    "Python",
    "FastAPI",
    "React",
    "Node.js",
    "SQL",
    "Machine Learning",
    "AI",
    "LangChain",
    "Docker",
    "AWS",
    "JavaScript",
    "TypeScript",
    "Data Science",
    "NLP",
    "TensorFlow",
    "PyTorch",
]

locations = [
    "Hyderabad",
    "Bangalore",
    "Mumbai",
    "Delhi",
    "Pune",
    "Chennai",
]

for i in range(250):

    selected_skills = random.sample(skills_pool, k=random.randint(3, 6))

    resume_text = (
        f"{fake.name()} is skilled in "
        f"{', '.join(selected_skills)} "
        f"with experience in software development and AI systems."
    )

    embedding = model.encode(resume_text).tolist()

    candidate = {
        "name": fake.name(),
        "skills": ", ".join(selected_skills),
        "experience": random.randint(1, 10),
        "location": random.choice(locations),
        "resume_text": resume_text,
        "embedding": embedding,
    }

    supabase.table("candidates").insert(candidate).execute()

    print(f"Inserted candidate {i+1}")

print("Done inserting 250 candidates")