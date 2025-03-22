import os
from typing import Literal, Optional
from pydantic import BaseModel, Field
from dotenv import load_dotenv,find_dotenv
from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
import importlib.util
import os
import sys
from langchain_google_genai import ChatGoogleGenerativeAI


from src.main.ingestion import get_retriever

# Çevre değişkenlerini yükle
path=find_dotenv()
load_dotenv(path)

api_key = os.environ.get("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY bulunamadı! Lütfen çevre değişkenlerini kontrol edin.333333")


# LLM başlatma
llm =ChatGoogleGenerativeAI(model="gemini-1.5-pro", google_api_key=api_key, temperature=0.4)

# LLM başlatma

# Yapılandırılmış çıktı modeli
class GradeHallucinations(BaseModel):
    binaryscore: str  = Field(
        ...,description="Answer is grounded in the facts . 'yes' or 'no'"
    )
    

# Modeli yapılandırılmış çıktı ile kullan
structured_llm_grader = llm.with_structured_output(GradeHallucinations)

# Sistem mesajı tanımlama
system_prompt = """
You are a grader assessing whether an LLM generation is grounded in / supported by a set of retrieved facts. \n Give a binary score 'yes' or 'no'. 
'Yes' means that the answer is grounded in / supported by the set of facts
"""

# Prompt şablonu oluşturma
hallucination_prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "Set of facts: \n\n {documents} \n\n LLM generation: {generation}")
])

# Router pipeline
hallucination_grader=hallucination_prompt |  structured_llm_grader







# Test çağrısı
if __name__ == "__main__":
   pass