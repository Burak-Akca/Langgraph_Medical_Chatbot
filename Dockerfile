FROM python:3.11

WORKDIR /app

COPY .env .env
COPY .gitignore .gitignore
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt


COPY . .
EXPOSE 8000


CMD ["uvicorn", "main:api", "--host", "0.0.0.0", "--port", "8000"]

