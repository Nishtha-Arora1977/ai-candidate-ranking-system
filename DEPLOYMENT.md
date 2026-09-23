# Deployment Guide

## Vercel Frontend

The repo is a monorepo with `frontend/` and `backend/`. Vercel needs to build from the frontend directory.

### Setup

1. In Vercel project settings:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - Alternative: Use the provided `vercel.json` at repo root which handles build commands.

2. Add environment variable in Vercel:
   - `NEXT_PUBLIC_API_URL` = URL of your FastAPI backend (e.g., `https://your-backend.onrender.com`)

   If not set, the app will try relative `/api` routes. The `next.config.js` rewrites `/api/*` to the backend URL when `NEXT_PUBLIC_API_URL` is set.

3. Deploy. The frontend will proxy API calls to the backend via rewrites.

## Backend Deployment (Render / Railway)

FastAPI backend requires Python env vars:

- `SUPABASE_URL`
- `SUPABASE_KEY`

Deploy `backend/` as a web service:
- Build: `pip install -r requirements.txt`
- Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`

The backend uses SentenceTransformer `all-MiniLM-L6-v2` which downloads on first run – ensure enough memory/disk.

CORS is open (`allow_origins=["*"]`). Restrict in production.

## Local Development

Frontend:
```bash
cd frontend
cp .env.example .env.local
# edit NEXT_PUBLIC_API_URL to http://localhost:8000
npm install
npm run dev
```

Backend:
```bash
cd backend
# create .env with SUPABASE_URL and SUPABASE_KEY
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## Notes

- Do not commit `.env` files. Backend `.env` has been removed from git history.
- The API client now uses `NEXT_PUBLIC_API_URL` with fallback to relative paths for Vercel rewrites.
- Vercel build now succeeds locally.
