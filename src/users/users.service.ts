import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  // Injects the User model for database operations
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  // Finds a user by email or creates a new one if it doesn't exist
  async findOrCreate(email: string): Promise<User> {
    let user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      user = new this.userModel({ email });
      await user.save();
    }
    return user;
  }

  // Updates user statistics based on game outcome
  async updateUserStats(
    userEmail: string,
    win: boolean,
    draw: boolean,
  ): Promise<void> {
    const updateObject: any = { $inc: { games: 1 } };

    if (win) {
      updateObject.$inc.wins = 1; // Increment wins if the user won
    } else if (!draw) {
      updateObject.$inc.losses = 1; // Increment losses if the user lost
    }

    await this.userModel
      .findOneAndUpdate({ email: userEmail }, updateObject)
      .exec();
  }

  // Retrieves a user by their email
  async findUserByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  // Updates the current game state for a user
  async updateGameState(
    email: string,
    gameBoard: string[],
    currentPlayer: 'X' | 'O',
    winStatus: string,
  ): Promise<void> {
    await this.userModel
      .findOneAndUpdate(
        { email },
        {
          'currentGame.board': gameBoard,
          'currentGame.currentPlayer': currentPlayer,
          'currentGame.winStatus': winStatus,
        },
      )
      .exec();
  }

  // Resets the game to its initial state
  async resetGame(email: string): Promise<void> {
    await this.userModel
      .findOneAndUpdate(
        { email },
        {
          'currentGame.board': Array(9).fill(null),
          'currentGame.currentPlayer': 'X',
          'currentGame.winStatus': '',
        },
      )
      .exec();
  }

  // Updates game statistics (games played, wins, and losses)
  async updateGameStats(
    email: string,
    winStatus: 'X' | 'O' | '',
    draw: boolean,
  ): Promise<void> {
    const update: any = { $inc: { games: 1 } };

    if (winStatus === 'X') {
      update.$inc.wins = 1;
    } else if (winStatus === 'O') {
      update.$inc.losses = 1;
    } else {
      update.$inc.losses = 1;
    }

    await this.userModel.findOneAndUpdate({ email }, update).exec();
  }

  // Updates only the current game board and win status without resetting other user data
  async updateCurrentGame(
    email: string,
    gameBoard: string[],
    winStatus: string,
  ): Promise<void> {
    await this.userModel
      .findOneAndUpdate(
        { email },
        {
          'currentGame.board': gameBoard,
          'currentGame.winStatus': winStatus,
        },
      )
      .exec();
  }
}
