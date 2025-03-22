import os
from typing import Literal, Optional
from pydantic import BaseModel, Field
from dotenv import load_dotenv,find_dotenv
from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI

# Çevre değişkenlerini yükle
# Çevre değişkenlerini yükle
path=find_dotenv()
load_dotenv(path)
api_key = os.environ.get("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY bulunamadı! Lütfen çevre değişkenlerini kontrol edin.1111111")


llm =ChatGoogleGenerativeAI(model="gemini-1.5-pro", google_api_key=api_key, temperature=0.4)

# LLM başlatma

# Yapılandırılmış çıktı modeli
class RouteWithJustification(BaseModel):
    datasource: Literal["vectorstore", "websearch"] = Field(
        ...
    )
    

# Modeli yapılandırılmış çıktı ile kullan
structured_router = llm.with_structured_output(RouteWithJustification)

# Sistem mesajı tanımlama
system_prompt = """
you are  an expert  at routing  a user  question  to a vectorstore or web search.
The  vectorstore contains  documents  related to medical diagnosis.
use the vectorstore  for questions on these  topics. For all else , use web-search
"""

# Prompt şablonu oluşturma
route_prompt = ChatPromptTemplate.from_messages([
    ("system", system_prompt),
    ("human", "{question}")
])

# Router pipeline
router = route_prompt | structured_router

# Test çağrısı
if __name__ == "__main__":
    response = router.invoke("what is the glucoma?")
    print(response)
