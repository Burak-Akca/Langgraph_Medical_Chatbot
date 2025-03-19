from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from src.main.graph.graph import app  # Mevcut app.invoke çağrısını kullanıyoruz
from fastapi.middleware.cors import CORSMiddleware

# Ortam değişkenlerini yükle
load_dotenv()

# FastAPI başlat
api = FastAPI()
api.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ya da belirli bir domain: ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Tüm HTTP metodlarına izin ver
    allow_headers=["*"],  # Tüm başlıklara izin ver
)

# Girdi modeli (request body için)
class QuestionRequest(BaseModel):
    question: str

@api.post("/rag")
async def rag_api(request: QuestionRequest):
    result = app.invoke({"question": request.question})
    return {"answer": result["generation"]}

