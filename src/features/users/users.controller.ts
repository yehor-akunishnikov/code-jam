import {Controller, DefaultValuePipe, Get, Param, Query} from '@nestjs/common';

import {User} from './db/user.schema';
import {UsersService} from './services/users.service';

export interface UserSearchParams {
    limit?: number,
    name?: string,
}

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
    ) { }

    @Get() public getMany(
        @Query('name', new DefaultValuePipe(null)) name: string,
        @Query('limit', new DefaultValuePipe(null)) limit: number,
    ): Promise<User[]> {
        return this.usersService.findMany({name, limit});
    }

    @Get(':name') public async getOneByName(
        @Param('name') name: string
    ): Promise<User> {
        return this.usersService.findByName(name);
    }
}
