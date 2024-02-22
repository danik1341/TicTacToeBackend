import * as mongoose from 'mongoose';

// Define the TypeScript type for the game board
interface GameBoard {
  board: string[];
  currentPlayer: 'X' | 'O';
  winStatus: 'X' | 'O' | '';
}

// Define the Mongoose schema for the game board
const gameBoardSchema = new mongoose.Schema({
  board: { type: [String], default: Array(9).fill(null) },
  currentPlayer: { type: String, default: 'X' },
  winStatus: { type: String, default: '' },
});

// Define the TypeScript interface for the User document that extends mongoose.Document
export interface User extends mongoose.Document {
  email: string;
  games: number;
  wins: number;
  losses: number;
  currentGame: GameBoard;
}

// Define the Mongoose schema for the User, including the game board as a subdocument
export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  games: { type: Number, default: 0 },
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  currentGame: { type: gameBoardSchema, default: () => ({}) },
});

// Create the User model from the schema
export const UserModel = mongoose.model<User>('User', UserSchema);
