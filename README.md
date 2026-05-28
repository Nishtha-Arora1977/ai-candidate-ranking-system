# AI Candidate Ranking System 🚀

An AI-powered candidate ranking platform that intelligently matches candidates with job descriptions using semantic analysis, embeddings, and AI-based scoring.

Built using FastAPI, Next.js, Supabase, pgvector, and Sentence Transformers.

---

# ✨ Features

✅ AI-powered candidate matching  
✅ Semantic similarity scoring  
✅ Intelligent ranking system  
✅ Modern futuristic UI  
✅ Candidate score visualization  
✅ Search & sorting functionality  
✅ AI analysis section  
✅ Dynamic candidate cards  
✅ Top match highlighting  
✅ Responsive design  
✅ Supabase database integration  
✅ FastAPI REST APIs  
✅ Next.js frontend dashboard  

---

# 🛠️ Tech Stack

## Frontend
- Next.js
- TypeScript
- Tailwind CSS
- React

## Backend
- FastAPI
- Python
- Sentence Transformers
- NumPy

## Database
- Supabase
- PostgreSQL
- pgvector

---

# 📸 Screenshots

## AI Dashboard
- Intelligent AI Hiring Platform UI
- Semantic AI Matching
- Match Score Progress Bars
- Candidate Ranking Cards

## Backend APIs
- Swagger API Docs
- FastAPI Endpoints
- AI Matching API

## Database
- Supabase Integration
- Candidate Storage
- Vector Embeddings

---

# ⚡ API Endpoints

## Get Candidates

```http
GET /candidates
```

## Match Candidates

```http
POST /api/mike/match
```

Request Body:

```json
{
  "job_description": "Looking for Python FastAPI AI engineer with LangChain experience"
}
```

## Generate Embeddings

```http
POST /generate-embeddings
```

---

# 🧠 AI Matching Logic

The platform ranks candidates using:

- Skill matching
- Semantic similarity
- Resume embeddings
- Experience analysis
- Intelligent scoring algorithm

---

# 🚀 Run Project Locally

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Nishtha-Arora1977/ai-candidate-ranking-system.git
```

---

# 2️⃣ Backend Setup

```bash
cd backend
```

Create virtual environment:

```bash
python3 -m venv venv
```

Activate virtual environment:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run backend server:

```bash
uvicorn main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

Swagger Docs:

```text
http://127.0.0.1:8000/docs
```

---

# 3️⃣ Frontend Setup

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

# 🗄️ Supabase Setup

1. Create Supabase project
2. Enable pgvector extension
3. Create candidates table
4. Add API keys in `.env`

Example `.env`:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

---

# 📊 Project Highlights

- AI semantic ranking engine
- Beautiful futuristic dashboard
- Real-time candidate analysis
- Recruiter-friendly UI
- Scalable architecture
- Portfolio-ready full-stack AI project

---

# 🔥 Future Improvements

- Resume PDF upload
- Real OpenAI embeddings
- Authentication system
- Recruiter dashboard
- Advanced filters
- Export candidate reports
- Deployment on Vercel & Render
- RAG-based resume search
- LLM-powered recommendations

---

# 👩‍💻 Author

## Nishtha Arora

AI | Data Analytics | Generative AI | Full Stack AI Projects

GitHub:
https://github.com/Nishtha-Arora1977



