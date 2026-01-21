# HR AI Docs

A full-stack app to generate professional **HR Offer Letters (.docx)** in seconds.

## Features
- Next.js form UI
- FastAPI backend
- DOCX generation from template placeholders
- One-click download

## Tech Stack
- Frontend: Next.js (App Router) + TypeScript + TailwindCSS
- Backend: FastAPI + python-docx + uvicorn

## Run Locally

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
Frontend
bash
Copy code
cd frontend
npm install
npm run dev
Open:

Frontend: http://localhost:3000

Backend docs: http://127.0.0.1:8000/docs

Notes
Keep secrets in .env / .env.local (never push to GitHub).

Generated documents are served via:

POST /generate-offer-letter

GET /download/{filename}

Author
Manik