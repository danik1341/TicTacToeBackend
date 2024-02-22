import { Body, Controller, Post, Query, Headers } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post('play')
  makeMove(
    @Headers('Authorization') userEmail: string,
    @Query('difficulty') difficulty: 'easy' | 'medium' | 'hard',
    @Body() moveData: { row: number; column: number },
  ) {
    return this.gameService.handlePlayerMove(userEmail, difficulty, moveData);
  }
}
