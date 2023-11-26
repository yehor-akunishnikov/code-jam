import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query} from '@nestjs/common';

import {User} from './db/user.schema';
import {CreateUserDto} from './services/user.dto';
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

    @Get() public getMany(@Query() query: UserSearchParams = {name: ''}): Promise<User[]> {
        return this.usersService.findMany(query);
    }

    @Get(':id') public getOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Post() public create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }
}
