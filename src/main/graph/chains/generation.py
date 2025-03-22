from langchain_core.output_parsers import StrOutputParser
import os
from typing import Literal, Optional
from pydantic import BaseModel, Field
from dotenv import load_dotenv
from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
import importlib.util
import os
import sys
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI


load_dotenv()
api_key = os.environ.get("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY bulunamadı! Lütfen çevre değişkenlerini kontrol edin.")


# LLM başlatma
llm =ChatGoogleGenerativeAI(model="gemini-1.5-pro", google_api_key=api_key, temperature=0.4)

# LLM başlatma

# Modeli yapılandırılmış çıktı ile kullan



# ChatPromptTemplate olarak tanımla
prompt_template = ChatPromptTemplate.from_template("""
You are an assistant for question-answering tasks. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. Use three sentences maximum and keep the answer concise.
and write sentences nicely
Question: {question} 
Context: {context} 
Answer:
""")

# Doğru şekilde zincirleme
generation_chain = prompt_template | llm | StrOutputParser()





# Test çağrısı
if __name__ == "__main__":
   print(generation_chain.invoke({"context": "The capital of Turkey is Ankara.", "question": "What is the capital of Turkey?"}))