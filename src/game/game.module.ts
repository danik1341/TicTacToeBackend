import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [GameService],
  controllers: [GameController],
  imports: [UsersModule],
})
export class GameModule {}
