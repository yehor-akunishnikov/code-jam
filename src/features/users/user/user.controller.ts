import {Controller, Get, Req, UseGuards} from '@nestjs/common';

import {AuthGuard} from '../../auth/guard/auth.guard';
import {UsersService} from '../services/users.service';
import {User} from '../db/user.schema';
import {RequestWithAuthPayload} from '../../../common/models';

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
}
