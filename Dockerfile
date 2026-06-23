FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# התקנת תלויות תוך עקיפת ה-SSL ישירות בפקודה
RUN npm install --strict-ssl=false

COPY prisma ./prisma/

# פתרון חסין-אש: העברת משתנה הסביבה ישירות בשורת הפקודה (Inline)
RUN NODE_TLS_REJECT_UNAUTHORIZED=0 npx prisma generate

COPY . .