// User Controller
import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Users } from 'src/entities/users.entity'
import { UsersOutput } from 'src/interfaces/users-output.interface'
import { GetUser } from '../auth/decorator/get-user.decorator'
import { UserService } from './user.service'

@ApiTags('USER')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // Get logged in user info
    @ApiResponse({ status: 200, description: 'Retrieve logged in user info.' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('/me')
    async getUserInfo(@GetUser() user: Users): Promise<UsersOutput> {
        return this.userService.getUserInfo(user)
    }

    // Get user info by his id
    @ApiResponse({ status: 200, description: 'Retrieve user info by his id.' })
    @ApiParam({ name: 'id', description: 'Users id' })
    @Get('/:id')
    async getUserInfoById(@Param('id') userId: string): Promise<UsersOutput> {
        return this.userService.getUserInfoById(userId)
    }
}
