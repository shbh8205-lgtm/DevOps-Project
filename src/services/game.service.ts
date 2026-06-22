import { PrismaClient, GameStatus, ParticipantRole } from '@prisma/client';

const prisma = new PrismaClient();

export class GameService {
  
  /**
   * צירוף משתמש למשחק קיים
   * @param userId מזהה המשתמש
   * @param gameId מזהה המשחק
   */
  async joinGame(userId: number, gameId: number) {
    // 1. שליפת המשחק ובדיקה האם הוא קיים ובאיזה סטטוס הוא נמצא
    const game = await prisma.game.findUnique({
      where: { id: gameId },
      select: { status: true } // שולפים רק את הסטטוס כדי לייעל את השילוף
    });

    // אם המשחק לא נמצא כלל
    if (!game) {
      throw new Error(`Game with ID ${gameId} not found.`);
    }

    // בדיקה שהסטטוס הוא PENDING (הקביל ל-Waiting לפי ה-Enum שהגדרנו)
    // אם המשחק כבר התחיל (IN_PROGRESS / Live) או הסתיים - נזרוק שגיאה
    if (game.status !== GameStatus.PENDING) {
      throw new Error(`Cannot join this game. The game is currently ${game.status.toLowerCase()}.`);
    }

    // 2. בדיקה האם המשתמש כבר רשום למשחק זה
    const existingParticipant = await prisma.gameParticipant.findUnique({
      where: {
        userId_gameId: {
          userId: userId,
          gameId: gameId,
        },
      },
    });

    if (existingParticipant) {
      throw new Error('User is already registered for this game.');
    }

    // 3. רישום המשתמש למשחק בתפקיד PLAYER
    const newParticipant = await prisma.gameParticipant.create({
      data: {
        userId: userId,
        gameId: gameId,
        role: ParticipantRole.PLAYER,
        score: 0 // ערך דיפולטיבי (מוגדר גם בסכמה, אך טוב לביטחון)
      },
    });

    return newParticipant;
  }
}