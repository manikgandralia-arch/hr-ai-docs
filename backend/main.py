import os
from datetime import datetime

from dotenv import load_dotenv
from docx import Document
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from openai import OpenAI
from pydantic import BaseModel

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EmployeeData(BaseModel):
    employee_name: str
    employee_address: str
    designation: str
    department: str
    company_name: str
    work_location: str
    reporting_manager: str
    offer_date: str
    joining_date: str
    ctc: str
    probation_months: str
    notice_period: str
    working_hours: str
    hr_name: str


def replace_placeholders(doc: Document, mapping: dict):
    for para in doc.paragraphs:
        for key, value in mapping.items():
            if key in para.text:
                for run in para.runs:
                    if key in run.text:
                        run.text = run.text.replace(key, value)

    for table in doc.tables:
        for row in table.rows:
            for cell in row.cells:
                for para in cell.paragraphs:
                    for key, value in mapping.items():
                        if key in para.text:
                            for run in para.runs:
                                if key in run.text:
                                    run.text = run.text.replace(key, value)


@app.post("/generate-offer-letter")
def generate_offer_letter(data: EmployeeData):
    template_path = os.path.join("templates", "offer_letter_template.docx")
    doc = Document(template_path)

    mapping = {
        "{EMPLOYEE_NAME}": data.employee_name,
        "{EMPLOYEE_ADDRESS}": data.employee_address,
        "{DESIGNATION}": data.designation,
        "{DEPARTMENT}": data.department,
        "{COMPANY_NAME}": data.company_name,
        "{WORK_LOCATION}": data.work_location,
        "{REPORTING_MANAGER}": data.reporting_manager,
        "{OFFER_DATE}": data.offer_date,
        "{JOINING_DATE}": data.joining_date,
        "{CTC}": data.ctc,
        "{PROBATION_MONTHS}": data.probation_months,
        "{NOTICE_PERIOD}": data.notice_period,
        "{WORKING_HOURS}": data.working_hours,
        "{HR_NAME}": data.hr_name,
    }

    replace_placeholders(doc, mapping)

    out_dir = "generated"
    os.makedirs(out_dir, exist_ok=True)

    filename = (
        f"OfferLetter_{data.employee_name.replace(' ', '_')}_"
        f"{datetime.now().strftime('%Y%m%d%H%M%S')}.docx"
    )
    out_path = os.path.join(out_dir, filename)
    doc.save(out_path)

    full_text = "\n".join([p.text for p in doc.paragraphs if p.text.strip()])

    prompt = f"""
You are an HR compliance assistant for India.
Check this Offer letter for missing or risky clauses.

Return ONLY valid JSON with keys:
risk_score (1-10),
missing_clauses (array),
weak_clauses (array),
suggested_text (array)

Document:
{full_text}
"""

    try:
        resp = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,
        )
        ai_review = resp.choices[0].message.content
    except Exception as e:
        ai_review = f'{{"error":"AI check failed: {str(e)}"}}'

    return {"docx_file": filename, "ai_review": ai_review}


@app.get("/download/{filename}")
def download_file(filename: str):
    path = os.path.join("generated", filename)
    return FileResponse(
        path,
        filename=filename,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    )