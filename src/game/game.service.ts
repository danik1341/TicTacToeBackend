import { Injectable } from '@nestjs/common';
import {
  BotStrategy,
  captureCenterOrCorner,
  findWinningMove,
  makeRandomMove,
} from './bot-utils';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GameService {
  constructor(private usersService: UsersService) {}

  // Maps difficulty levels to their corresponding bot strategies.
  private botStrategies: { [difficulty: string]: BotStrategy } = {
    easy: new EasyBotStrategy(),
    medium: new MediumBotStrategy(),
    hard: new HardBotStrategy(),
  };

  // Handles a player's move and updates the game state accordingly.
  async handlePlayerMove(
    userEmail: string,
    difficulty: 'easy' | 'medium' | 'hard',
    moveData: { row: number; column: number },
  ): Promise<any> {
    let user = await this.usersService.findUserByEmail(userEmail);

    // Initialize or reset game state if it does not exist or game is completed
    if (!user.currentGame || user.currentGame.winStatus) {
      await this.usersService.resetGame(userEmail);
      user = await this.usersService.findUserByEmail(userEmail);
    }

    let { board: gameBoard, currentPlayer, winStatus } = user.currentGame;

    // Calculate the position index based on row and column.
    const position = moveData.row * 3 + moveData.column;
    if (gameBoard[position] !== null) {
      return {
        error: 'This spot is already taken. Please choose another spot.',
      };
    }

    // Update the game board with the player's move.
    gameBoard[position] = currentPlayer;
    if (this.checkWin(gameBoard, currentPlayer)) {
      winStatus = 'X';
    }

    // Check for a win or a draw after the player's move.
    if (winStatus || this.isBoardFull(gameBoard)) {
      await this.usersService.updateGameStats(
        userEmail,
        winStatus,
        this.isBoardFull(gameBoard),
      );
      await this.usersService.resetGame(userEmail);
    } else {
      // Bot makes its move
      const strategy = this.botStrategies[difficulty];
      gameBoard = strategy.makeMove(
        gameBoard,
        currentPlayer === 'X' ? 'O' : 'X',
      );
      if (this.checkWin(gameBoard, 'O')) {
        winStatus = 'O';
      }

      if (winStatus || this.isBoardFull(gameBoard)) {
        await this.usersService.updateGameStats(
          userEmail,
          winStatus,
          this.isBoardFull(gameBoard),
        );
        await this.usersService.resetGame(userEmail);
      } else {
        // Update the game state without resetting
        await this.usersService.updateCurrentGame(
          userEmail,
          gameBoard,
          winStatus,
        );
      }
    }

    return { gameBoard, winStatus };
  }

  // Checks if the current game board configuration results in a win for the specified player.
  private checkWin(gameBoard: string[], player: 'X' | 'O'): boolean {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columns
      [0, 4, 8],
      [2, 4, 6], // Diagonals
    ];

    // Return true if any win condition is met.
    return winConditions.some((condition) =>
      condition.every((index) => gameBoard[index] === player),
    );
  }

  // Checks if all positions on the game board are filled, indicating a draw.
  private isBoardFull(gameBoard: string[]): boolean {
    return gameBoard.every((position) => position !== null);
  }
}

// Defines a strategy for the "Easy" difficulty level of the bot.
class EasyBotStrategy implements BotStrategy {
  // For the easy strategy, the bot always makes a random move.
  makeMove(gameBoard: string[]): string[] {
    // Utilizes a utility function to select a random empty spot on the board.
    return makeRandomMove(gameBoard);
  }
}

// Defines a strategy for the "Medium" difficulty level of the bot.
class MediumBotStrategy implements BotStrategy {
  makeMove(gameBoard: string[]): string[] {
    // First, the bot attempts to find and make a blocking move if the player is about to win.
    let moveMade = findWinningMove(gameBoard, 'X');
    if (moveMade !== -1) {
      gameBoard[moveMade] = 'O'; // Blocks the player's winning move.
      return gameBoard;
    }

    // If no immediate threat, the bot tries to capture the center or a corner position.
    moveMade = captureCenterOrCorner(gameBoard);
    if (moveMade !== -1) {
      gameBoard[moveMade] = 'O'; // Captures a strategic position.
      return gameBoard;
    }

    // As a fallback, if no strategic move is found, make a random move.
    return makeRandomMove(gameBoard);
  }
}

// Defines a strategy for the "Hard" difficulty level of the bot.
class HardBotStrategy implements BotStrategy {
  makeMove(gameBoard: string[]): string[] {
    // The bot first tries to find a winning move for itself.
    let moveMade = findWinningMove(gameBoard, 'O');
    if (moveMade !== -1) {
      gameBoard[moveMade] = 'O'; // Makes the winning move.
      return gameBoard;
    }

    // If no winning move is available, it tries to block the player's potential winning move.
    moveMade = findWinningMove(gameBoard, 'X');
    if (moveMade !== -1) {
      gameBoard[moveMade] = 'O'; // Blocks the player's winning move.
      return gameBoard;
    }

    // If there are no immediate winning or blocking moves, try to capture a strategic position.
    moveMade = captureCenterOrCorner(gameBoard);
    if (moveMade !== -1) {
      gameBoard[moveMade] = 'O'; // Captures center or corner.
      return gameBoard;
    }

    // If no other strategic moves are applicable, fallback to making a random move.
    return makeRandomMove(gameBoard);
  }
}
