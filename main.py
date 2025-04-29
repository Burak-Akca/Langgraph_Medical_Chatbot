from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from src.main.graph.graph import app  # Mevcut app.invoke çağrısını kullanıyoruz
from fastapi.middleware.cors import CORSMiddleware
import os



api = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

api.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # '*' yerine belirli adresler
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Girdi modeli (request body için)
class QuestionRequest(BaseModel):
    question: str

@api.post("/rag")
async def rag_api(request: QuestionRequest):
    result = app.invoke({"question": request.question})
    return {"answer": result["generation"]}

if __name__ == "__main__":
    

    result = app.invoke({"question": "What is the  cold?"})
    print(result["generation"])