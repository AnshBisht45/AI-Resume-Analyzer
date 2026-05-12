from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
from fastapi import FastAPI, UploadFile, File

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

skills_list = [
    "mysql",
    "postgresql",
    "database",
    "python",
    "java",
    "c++",
    "react",
    "sql",
    "machine learning",
    "fastapi",
    "tensorflow",
    "html",
    "css",
    "javascript",
    "node.js"
]

@app.get("/")
def home():
    return {"message": "AI Resume Analyzer Running"}

@app.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    text = ""

    with pdfplumber.open(file.file) as pdf:

        for page in pdf.pages:

            extracted = page.extract_text()

            if extracted:
                text += extracted

    lower_text = text.lower()

    found_skills = []

    for skill in skills_list:

        if skill.lower() in lower_text:

            found_skills.append(skill)

    ats_score = len(found_skills) * 10

    if ats_score > 100:
        ats_score = 100

    return {
    "ats_score": ats_score,
    "skills_found": found_skills
}