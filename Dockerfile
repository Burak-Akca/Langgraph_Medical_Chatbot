FROM python:3.11

WORKDIR /app
COPY .env .env

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY credential.json /app/credential.json

COPY . .
EXPOSE 8000


CMD ["uvicorn", "main:api", "--host", "0.0.0.0", "--port", "8000"]

