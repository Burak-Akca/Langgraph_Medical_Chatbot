from typing import Any, Dict

from src.main.graph.state import GraphState
from src.main.ingestion import get_retriever


def retrieve(state: GraphState) -> Dict[str, Any]:
    print("---RETRIEVE---")
    question = state["question"]

    documents = get_retriever().invoke(question)
    return {"documents": documents, "question": question}