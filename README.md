# 🏥 LangGraph Medical Chatbot

[![Python](https://img.shields.io/badge/Python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-green.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-19.0+-blue.svg)](https://reactjs.org/)
[![LangGraph](https://img.shields.io/badge/LangGraph-Latest-orange.svg)](https://langchain-ai.github.io/langgraph/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Modern medical information retrieval and chatbot system. Built with LangGraph, LangChain, and React, powered by RAG (Retrieval-Augmented Generation) technology for intelligent medical assistance.

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### 🤖 Intelligent Chatbot
- **RAG (Retrieval-Augmented Generation)**: Retrieves medical information from vector database to generate accurate answers
- **Web Search Integration**: Performs web searches for up-to-date medical information
- **Hallucination Detection**: Prevents generation of false information
- **Multi-language Support**: Turkish and English language support

### 🔍 Smart Routing
- **Automatic Routing**: Analyzes questions to route to the most appropriate information source
- **Dynamic Decision Making**: Decides between web search or RAG usage based on document quality
- **Quality Assessment**: Continuously evaluates document and answer quality

### 🎯 User Experience
- **Real-time Streaming**: Instant response flow with SSE (Server-Sent Events)
- **Session Management**: Chat history storage with MongoDB
- **Responsive UI**: Modern React-based user interface
- **Authentication**: Secure JWT-based authentication

## 🏗️ Architecture

### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   LangGraph     │
│   (React)       │◄──►│   (FastAPI)     │◄──►│   Workflow      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   MongoDB       │    │   Vector DB     │    │   External      │
│   (Chat History)│    │   (FAISS)       │    │   APIs          │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### LangGraph Workflow
```
Question → Router → [Web Search | RAG] → Grade Documents → Generate → Quality Check → End
                ↓              ↓              ↓              ↓
            Web Search    Retrieve      Grade Docs    Generate
                ↓              ↓              ↓              ↓
            Generate      Grade Docs    [Web Search | Generate]  Quality Check
                ↓              ↓              ↓              ↓
            End          [Web Search | Generate]  [Retry | End]  [End | Retry | Web Search]
```

## 🛠️ Technologies

### Backend
- **Python 3.11+**: Main programming language
- **FastAPI**: Modern, fast web framework
- **LangGraph**: AI workflow orchestration
- **LangChain**: LLM integration and RAG
- **MongoDB**: Chat history and session management
- **FAISS**: Vector database
- **Pydantic**: Data validation

### Frontend
- **React 19**: Modern UI framework
- **TypeScript**: Type safety
- **Vite**: Fast build tool
- **Tailwind CSS**: Utility-first CSS framework
- **Material-UI**: UI component library
- **Axios**: HTTP client

### DevOps & Deployment
- **Docker**: Containerization
- **Jenkins**: CI/CD pipeline
- **Kubernetes**: Container orchestration
- **Google Cloud Platform**: Cloud infrastructure
- **DVC**: Data version control

## 🚀 Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- MongoDB
- Docker (optional)

### 1. Clone Repository
```bash
git clone https://github.com/Burak-Akca/Langgraph_Medical_Chatbot.git
cd Langgraph_Medical_Chatbot
```

### 2. Backend Setup
```bash
# Create virtual environment
python -m venv .venv

# Windows
.venv\Scripts\activate

# Linux/Mac
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Environment variables
cp .env.example .env
# Edit .env file
```

### 3. Frontend Setup
```bash
cd frontend/chatbot-frontend
npm install
```

### 4. Database Setup
```bash
# Start MongoDB with Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or connect using MongoDB Compass
```

### 5. Data Preparation
```bash
# Pull data with DVC
dvc pull

# Create vector database
python src/main/ingestion.py
```

## 🎮 Usage

### Start Backend
```bash
# Development
python mainv2.py

# Production
uvicorn mainv2:api --host 0.0.0.0 --port 7200
```

### Start Frontend
```bash
cd frontend/chatbot-frontend
npm run dev
```

### API Testing
```bash
# Health check
curl http://localhost:7200/health

# RAG streaming
curl -X POST "http://localhost:7200/rag-stream" \
  -H "Content-Type: application/json" \
  -d '{"question": "What is diabetes?", "session_id": "test123"}'
```

## 📚 API Documentation

### Endpoints

#### `POST /rag-stream`
Streaming RAG response for medical questions.

**Request Body:**
```json
{
  "question": "What is the treatment for diabetes?",
  "session_id": "unique_session_id"
}
```

**Response:** Server-Sent Events (SSE) stream
- `event: start` - Stream start
- `event: delta` - Token chunks
- `event: done` - Stream end

#### `GET /health`
System health status check.

**Response:**
```json
{
  "status": "healthy",
  "database": "connected"
}
```

### Environment Variables
```bash
# MongoDB
MONGO_URI=mongodb://localhost:27017

# API Keys
GOOGLE_API_KEY=your_google_api_key
TAVILY_API_KEY=your_tavily_api_key

# LangChain
OPENAI_API_KEY=your_openai_api_key
```

## 🚀 Deployment

### With Docker
```bash
# Backend build
docker build -t medical-chatbot-backend .

# Frontend build
cd frontend/chatbot-frontend
docker build -t medical-chatbot-frontend .

# Docker Compose
docker-compose up -d
```

### With Kubernetes
```bash
# GKE deployment
kubectl apply -f deployment.yaml

# Service exposure
kubectl expose deployment medical-chatbot --type=LoadBalancer
```

### Jenkins CI/CD
The project is configured with Jenkins pipeline for automatic build and deployment:
- Automated testing
- Docker image build
- GCR push
- GKE deployment

## 🔧 Development

### Project Structure
```
Langgraph_Medical_Chatbot/
├── src/
│   ├── main/
│   │   ├── graph/           # LangGraph workflow
│   │   │   ├── nodes/       # Workflow nodes
│   │   │   ├── chains/      # LangChain chains
│   │   │   └── state.py     # Graph state
│   │   ├── data/            # Data processing
│   │   └── ingestion.py     # Data ingestion
├── frontend/
│   └── chatbot-frontend/    # React application
├── backend/                  # .NET backend (optional)
├── pipeline/                 # ML pipeline
├── notebook/                 # Jupyter notebooks
├── config/                   # Configuration files
├── logs/                     # Application logs
└── artifacts/                # Build artifacts
```

### Adding New Node
```python
# src/main/graph/nodes/new_node.py
from src.main.graph.state import GraphState

def new_node(state: GraphState) -> GraphState:
    # Node logic
    return state

# src/main/graph/graph.py
from src.main.graph.nodes.new_node import new_node

workflow.add_node("NEW_NODE", new_node)
```

### Testing
```bash
# Python tests
python -m pytest tests/

# Frontend tests
cd frontend/chatbot-frontend
npm test
```

## 🤝 Contributing

1. Fork the project
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- PEP 8 Python style guide
- Use type hints
- Write docstrings
- Unit test coverage
- Conventional commits

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for detailed change history.

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

## 👥 Team

- **Burak Akça** - [@Burak-Akca](https://github.com/Burak-Akca) - Project Manager & Backend Developer

## 🙏 Acknowledgments

- [LangChain](https://langchain.com/) - AI framework
- [LangGraph](https://langchain-ai.github.io/langgraph/) - Workflow orchestration
- [FastAPI](https://fastapi.tiangolo.com/) - Web framework
- [React](https://reactjs.org/) - UI library

## 📞 Contact

- **GitHub Issues**: [Project Issues](https://github.com/Burak-Akca/Langgraph_Medical_Chatbot/issues)
- **Email**: [Add your email]
- **LinkedIn**: [Add your LinkedIn profile]

---

⭐ Don't forget to star this project if you like it!
