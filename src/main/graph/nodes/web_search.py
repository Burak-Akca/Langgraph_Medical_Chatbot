from typing import Any, Dict

from langchain.schema import Document
from langchain_community.tools.tavily_search import TavilySearchResults

from src.main.graph.state import GraphState

web_search_tool = TavilySearchResults(k=3)

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