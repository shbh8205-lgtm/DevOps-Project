# פרויקט DevOps-Project

זהו פרויקט Node.js עם TypeScript ו-Prisma שמתחבר למסד נתונים PostgreSQL בתוך Docker.

## מה נמצא בפרויקט

- `src/` - קוד מקור ב-TypeScript
- `prisma/schema.prisma` - הגדרת הסכימה של Prisma
- `Dockerfile` - בניית מכולת Node
- `docker-compose.yml` - פריסה של PostgreSQL ואפליקציה בסביבת Docker
- `package.json` - תסריטי בנייה ותלויות

## איך להריץ

1. ודא ש-Docker ו-Docker Compose מותקנים ומותאמים.
2. בתיקיית הפרויקט, הרץ:
   ```bash
   docker compose up --build
   ```
3. השירותים יעלו:
   - `postgres_db` – מסד נתונים PostgreSQL
   - `app_service` – האפליקציה שמריצה מיגרציות ומתחברת למסד הנתונים

## סביבה

האפליקציה משתמשת ב-`DATABASE_URL` עם חיבור לפוסטגרס בתוך הרשת של Docker.

## קבצי מפתח

- `src/main.ts` - נקודת כניסה לאפליקציה
- `src/prisma.ts` - יצירת Prisma Client עם מתאם PostgreSQL
- `src/services/game.service.ts` - שירות לניהול צירוף משתמשים למשחק
- `prisma/schema.prisma` - מודלים של `User`, `Game` ו-`GameParticipant`

## הערות

- אם יש שגיאות בבנייה, בדוק שהתקנת את התלויות ושהפורט 5433 פנוי במכונה.
- אפשר להתאים את ה-`DATABASE_URL` ב-`docker-compose.yml` אם צריך לשנות שם משתמש, סיסמה או שם מסד.
