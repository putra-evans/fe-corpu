# Gunakan image Node.js sebagai base image
FROM 10.5.44.50:5050/devops/base-images/kominfotik-node-20.19-alpine

# Setel direktori kerja di container
WORKDIR /app

# Copy semua file dari project ke dalam container
COPY . .

# Install dependencies aplikasi
RUN npm install

# Build aplikasi
RUN npm run build

RUN ls -lha
RUN cat .env

# Jalankan aplikasi dengan perintah berikut
CMD ["npm", "start"]

# Expose port 3000 untuk mengakses aplikasi Next.js
EXPOSE 3000
