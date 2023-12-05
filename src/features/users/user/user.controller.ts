import {Body, Controller, Get, Put, Req, UseGuards} from '@nestjs/common';

import {RequestWithAuthPayload} from '../../../common/models';
import {AuthGuard} from '../../auth/guard/auth.guard';
import {UsersService} from '../services/users.service';
import {UpdateUserDto} from '../services/user.dto';
import {User} from '../db/user.schema';

@Controller('user')
export class UserController {
    constructor(
        private usersService: UsersService,
    ) { }

    @UseGuards(AuthGuard) @Get('me') public getMe(
        @Req() request: RequestWithAuthPayload
    ): Promise<User> {
        return this.usersService.findByName(request.user.username);
    }

    @UseGuards(AuthGuard) @Put('me') public updateMe(
        @Req() request: RequestWithAuthPayload,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<User> {
        return this.usersService.update(request.user.username, updateUserDto);
    }
}
