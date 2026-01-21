# HR AI Docs

Generate professional HR documents (Offer Letters) in seconds using a modern **Next.js frontend** + **FastAPI backend**.

---

## ✨ Features

- Clean HR Offer Letter generator UI
- FastAPI backend generates `.docx` offer letters
- One-click DOCX download
- Simple form-based input (Employee + Company + Salary + Terms)
- Works locally with separate Frontend + Backend

---

## 🧱 Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- TailwindCSS

### Backend
- FastAPI (Python)
- python-docx (DOCX generation)
- uvicorn

---

## 📁 Project Structure

```bash
hr-ai-docs/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   ├── templates/
│   ├── generated/
│   └── venv/
│
└── frontend/
    ├── app/
    ├── public/
    ├── package.json
    └── ...
✅ Requirements
Node.js 18+

Python 3.10+

pip

(recommended) virtualenv

🔧 Setup (Local)
1) Clone repo
bash
Copy code
git clone https://github.com/<your-username>/hr-ai-docs.git
cd hr-ai-docs
▶️ Run Backend (FastAPI)
1) Go to backend
bash
Copy code
cd backend
2) Create & activate virtual env
bash
Copy code
python3 -m venv venv
source venv/bin/activate
3) Install dependencies
bash
Copy code
pip install -r requirements.txt
4) Run server
bash
Copy code
uvicorn main:app --reload --port 8000
Backend will run at:

http://127.0.0.1:8000

Docs:

http://127.0.0.1:8000/docs

▶️ Run Frontend (Next.js)
1) Open new terminal and go to frontend
bash
Copy code
cd frontend
2) Install dependencies
bash
Copy code
npm install
3) Run frontend
bash
Copy code
npm run dev
Frontend will run at:

http://localhost:3000

🔗 API Endpoints (Backend)
POST /generate-offer-letter

Generates DOCX

GET /download/<filename>

Downloads generated DOCX

🔐 Environment Variables
Frontend
Create:
frontend/.env.local

Example:

env
Copy code
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_key_here
⚠️ Never push secret keys to GitHub.

🚀 Deployment Notes
For production:

Deploy Frontend on Vercel

Deploy Backend on Render / Railway / VPS

Update frontend API URL from 127.0.0.1:8000 to the deployed backend URL

🛡️ Security
Make sure these are in .gitignore:

.env

.env.local

backend/venv/

node_modules/

backend/generated/

📌 Roadmap
Add more HR documents (Experience letter, Relieving letter, etc.)

Add PDF export

Add login & saved history

Add multiple templates

📄 License
MIT (or choose a license later)

👤 Author
Built by Manik

pgsql
Copy code

If you want, I can also write a *shorter cleaner* README (more professional).
::contentReference[oaicite:0]{index=0}






You said:
please shorter and cleaner 


ChatGPT said:
Paste this shorter clean README into README.md:

md
Copy code
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