// User Controller
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Users } from 'src/entities/users.entity';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // Get logged in user info
    @UseGuards(AuthGuard('jwt'))
    @Get('/me')
    async getUserInfo(@GetUser() user: Users): Promise<Users> {
        return this.userService.getUserInfo(user);
    }

    // Get user info by his id
    @Get('/:id')
    async getUserInfoById(@Param('id') userId: string): Promise<Users> {
        return this.userService.getUserInfoById(userId);
    }
}
