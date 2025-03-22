from typing import Any, Dict

from langchain.schema import Document
from langchain_community.tools.tavily_search import TavilySearchResults

from src.main.graph.state import GraphState
import os
from dotenv import load_dotenv
load_dotenv()



api_key = os.environ.get("TAVILY_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY bulunamadı! Lütfen çevre değişkenlerini kontrol edin.")


web_search_tool = TavilySearchResults(k=3 ,api_key=api_key)

def web_search(state: GraphState) -> Dict[str, Any]:
    print("---WEB SEARCH---")
    question = state["question"]

    # Eğer documents yoksa boş bir liste başlat
    documents = state.get("documents", [])

    docs = web_search_tool.invoke({"query": question})
    web_results = "\n".join([d["content"] for d in docs])
    web_results = Document(page_content=web_results)

    # Sonucu documents listesine ekle
    documents.append(web_results)

    return {"documents": documents, "question": question}