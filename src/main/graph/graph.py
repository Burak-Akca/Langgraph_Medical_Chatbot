

from src.main.graph.node_constants import GENERATE,GRADE_DOCUMENTS,RETRIEVE,WEBSEARCH
from src.main.graph.nodes.retrieve import retrieve
from src.main.graph.nodes.generate import generate
from src.main.graph.nodes.web_search import web_search
from src.main.graph.nodes.grade_documents import grade_documents


from src.main.graph.chains.router import router,RouteWithJustification
from src.main.graph.state import GraphState
from src.main.graph.chains.hallucination import hallucination_grader
from src.main.graph.chains.answer_grader import answer_grader
from langgraph.graph import END,StateGraph
from dotenv import load_dotenv




def decide_to_generate(state):
    print("---ASSESS GRADED DOCUMENTS---")

    if state["web_search"]:
        print(
            "---DECISION: NOT ALL DOCUMENTS ARE NOT RELEVANT TO QUESTION, INCLUDE WEB SEARCH---"
        )
        return WEBSEARCH
    else:
        print("---DECISION: GENERATE---")
        return GENERATE


def grade_generation_grounded_in_documents_and_question(state: GraphState) -> str:
    print("---CHECK HALLUCINATIONS---")
    question = state["question"]
    documents = state["documents"]
    generation = state["generation"]

    score = hallucination_grader.invoke(
        {"documents": documents, "generation": generation}
    )

    if hallucination_grade := score.binaryscore:
        print("---DECISION: GENERATION IS GROUNDED IN DOCUMENTS---")
        print("---GRADE GENERATION vs QUESTION---")
        score = answer_grader.invoke({"question": question, "generation": generation})
        if answer_grade := score.binaryscore:
            print("---DECISION: GENERATION ADDRESSES QUESTION---")
            return "useful"
        else:
            print("---DECISION: GENERATION DOES NOT ADDRESS QUESTION---")
            return "not useful"
    else:
        print("---DECISION: GENERATION IS NOT GROUNDED IN DOCUMENTS, RE-TRY---")
        return "not supported"

def route_question(state: GraphState) -> str:
    print("---ROUTE QUESTION---")
    question = state["question"]
    source: RouteWithJustification = router.invoke({"question": question})
    if source.datasource == WEBSEARCH:
        print("---ROUTE QUESTION TO WEB SEARCH---")
        return WEBSEARCH
    elif source.datasource == "vectorstore":
        print("---ROUTE QUESTION TO RAG---")
        return RETRIEVE

workflow= StateGraph(GraphState)
workflow.add_node(WEBSEARCH,web_search)


workflow.add_node(RETRIEVE,retrieve)
workflow.add_node(GRADE_DOCUMENTS,grade_documents)

workflow.add_node(GENERATE,generate)


workflow.set_conditional_entry_point(
    route_question,
    {
        WEBSEARCH: WEBSEARCH,
        RETRIEVE: RETRIEVE,
    },
)
workflow.add_edge(RETRIEVE, GRADE_DOCUMENTS)
workflow.add_conditional_edges(
    GRADE_DOCUMENTS,
    decide_to_generate,
    {
        WEBSEARCH: WEBSEARCH,
        GENERATE: GENERATE,
    },
)

workflow.add_conditional_edges(
    GENERATE,
    grade_generation_grounded_in_documents_and_question,
    {
        "not supported": GENERATE,
        "useful": END,
        "not useful": WEBSEARCH,
    },
)
workflow.add_edge(WEBSEARCH, GENERATE)
workflow.add_edge(GENERATE, END)

app = workflow.compile()

png_data = app.get_graph().draw_mermaid_png()  # Metot sadece kendisi çağrılmalı
with open("grappppppp.png", "wb") as f:
    f.write(png_data)  # PNG verisini dosyaya yaz


    