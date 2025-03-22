import os
from typing import Literal, Optional
from pydantic import BaseModel, Field
from dotenv import load_dotenv,find_dotenv
from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
import importlib.util
import os
import sys


from src.main.ingestion import get_retriever
# Çevre değişkenlerini yükle
path=find_dotenv()
load_dotenv(path)
api_key = os.environ.get("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY bulunamadı! Lütfen çevre değişkenlerini kontrol edin.5555555555")


llm =ChatGoogleGenerativeAI(model="gemini-1.5-pro", google_api_key=api_key, temperature=0.4)

# Yapılandırılmış çıktı modeli
class GradeAnswer(BaseModel):
    binaryscore: str  = Field(
        ...,description="Answer is grounded in the facts . 'yes' or 'no'"
    )
    

# Modeli yapılandırılmış çıktı ile kullan
structured_llm_grader = llm.with_structured_output(GradeAnswer)

# Sistem mesajı tanımlama
system_prompt = """
You are a grader assessing whether an answer addresses /
 resolves a question \n Give a binary score 'yes' or 'no'. Yes' means that the answer resolves the question.
"""

# Prompt şablonu oluşturma
answer_prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "User question: \n\n {question} \n\n LLM generation: {generation}")
])

# Router pipeline
answer_grader=answer_prompt |  structured_llm_grader







# Test çağrısı
if __name__ == "__main__":
   pass