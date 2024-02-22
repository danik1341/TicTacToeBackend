// BotStrategy interface defines the structure for bot strategies,
// requiring a method to make a move based on the current game board and player.
export interface BotStrategy {
  makeMove(gameBoard: string[], currentPlayer: 'X' | 'O'): string[];
}

// makeRandomMove selects a random empty spot on the board for the bot's move.
export const makeRandomMove = (gameBoard: string[]): string[] => {
  // Identify all empty positions on the game board.
  const emptyIndices = gameBoard
    .map((value, index) => (value === null ? index : null))
    .filter((value) => value !== null);

  // If there are empty spots, choose one at random for the bot's move.
  if (emptyIndices.length > 0) {
    const randomMoveIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    gameBoard[randomMoveIndex] = 'O'; // Assigns the bot's symbol to the chosen position.
  }

  return gameBoard; // Return the updated game board.
};

// captureCenterOrCorner aims to capture either the center or a corner position on the board,
// which are strategic spots in tic-tac-toe.
export const captureCenterOrCorner = (gameBoard: string[]): number => {
  // Prioritize these positions due to their strategic importance.
  const centerAndCorners = [0, 2, 4, 6, 8];

  // Filter for unoccupied strategic positions.
  const availableMoves = centerAndCorners.filter(
    (index) => gameBoard[index] === null,
  );

  if (availableMoves.length > 0) {
    if (gameBoard[4] === null) {
      return 4; // Center is most preferred if available.
    }
    // Choose a random corner if the center is not available.
    const randomCornerIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomCornerIndex];
  }

  return -1; // Return -1 if no strategic position is available.
};

// findWinningMove checks the board for a move that would result in a win for the specified player.
export const findWinningMove = (
  gameBoard: string[],
  player: 'X' | 'O',
): number => {
  // Define all possible win conditions based on board positions.
  const winConditions = [
    [0, 1, 2], // Rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonals
    [2, 4, 6],
  ];

  // Iterate over each win condition to check if a winning move is available.
  for (const condition of winConditions) {
    const [a, b, c] = condition;

    // Check if two positions are filled by the player and one is empty (winning move).
    if (
      gameBoard[a] === player &&
      gameBoard[b] === player &&
      gameBoard[c] === null
    ) {
      return c;
    } else if (
      gameBoard[a] === player &&
      gameBoard[c] === player &&
      gameBoard[b] === null
    ) {
      return b;
    } else if (
      gameBoard[b] === player &&
      gameBoard[c] === player &&
      gameBoard[a] === null
    ) {
      return a;
    }
  }

  return -1; // No winning move found, indicating no immediate win is possible.
};
