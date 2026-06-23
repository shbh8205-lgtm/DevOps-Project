import { GameService } from './services/game.service.js';
import { prisma } from './prisma.js';
import { GameStatus } from '@prisma/client';

const gameService = new GameService();

async function main() {
  console.log('🔄 1. Connecting to the database...');
  // Prisma מתחברת אוטומטית בפעולה הראשונה, אך ניתן לבצע חיבור יזום:
  await prisma.$connect();
  console.log('✅ Connected successfully.');

  console.log('\n🔄 2. Creating dummy data (User and Game)...');

  // יצירת משתמש דמי עם אימייל רנדומלי קטן כדי למנוע שגיאות כפל בהרצות חוזרות
  const randomId = Math.floor(Math.random() * 10000);
  const dummyUser = await prisma.user.create({
    data: {
      username: `TestUser_${randomId}`,
      email: `user_${randomId}@example.com`,
    },
  });
  console.log(`👤 Dummy User created: ${dummyUser.username} (ID: ${dummyUser.id})`);

  // יצירת משחק דמי בסטטוס PENDING (המקביל ל-Waiting)
  const dummyGame = await prisma.game.create({
    data: {
      title: `Epic Match #${randomId}`,
      status: GameStatus.PENDING, // סטטוס Waiting
    },
  });
  console.log(`🎮 Dummy Game created: "${dummyGame.title}" (ID: ${dummyGame.id})`);

  console.log('\n🔄 3. Calling joinGame function...');

  // 4. ניסיון צירוף המשתמש למשחק וטיפול בשגיאות
  try {
    const result = await gameService.joinGame(dummyUser.id, dummyGame.id);

    // הדפסת הודעת הצלחה
    console.log('\n🚀 Success: User joined game!');
    console.log('Details:', result);

  } catch (error: any) {
    // הדפסת השגיאה במידה והפעולה נכשלה
    console.error('\n❌ Operation failed!');
    console.error(`Reason: ${error.message}`);
  }
}

// הרצת הפונקציה הראשית וסגירת החיבור בסיום
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('An unexpected error occurred in main execution:', e);
    await prisma.$disconnect();
    process.exit(1);
  });