import { Controller, Post, Body, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/login')
  async login(@Body('email') email: string, @Res() response: Response) {
    try {
      const user = await this.usersService.findOrCreate(email);
      return response.status(200).json(user);
    } catch (error) {
      return response.status(500).json({ message: 'An error occurred', error });
    }
  }
}
