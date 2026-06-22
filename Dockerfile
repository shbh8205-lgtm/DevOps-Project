# השתמש בגרסה יציבה ועדכנית של Node.js
FROM node:20-alpine

# הגדרת תיקיית העבודה בתוך הקונטיינר
WORKDIR /app

# העתקת קבצי הגדרות החבילות
COPY package*.json ./

# התקנת כל התלויות (כולל Prisma)
RUN npm install

# העתקת תיקיית הגדרות הסכמה של Prisma
COPY prisma ./prisma/

# יצירת ה-Prisma Client באופן מקומי בתוך ה-Image
RUN npx prisma generate

# העתקת שאר קוד המקור של האפליקציה (כולל תיקיית src)
COPY . .

# שלב ההרצה ינוהל דרך ה-docker-compose באמצעות פקודה ייעודית