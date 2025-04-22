# 1. Base image olarak Node.js kullan
FROM node:lts

# 2. Çalışma dizinini oluştur ve ayarla
WORKDIR /app

# 3. package.json ve package-lock.json dosyalarını kopyala
COPY package*.json ./

# 4. Gerekli bağımlılıkları yükle
RUN npm install

# 5. Proje dosyalarını kopyala
COPY . .
RUN npm run build

# 6. Vite için portu expose et
EXPOSE 3000


# 7. Vite dev server'ı çalıştır
CMD ["npm", "run", "dev"]
