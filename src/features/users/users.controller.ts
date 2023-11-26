import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';

import {User} from './db/user.schema';
import {CreateUserDto, UpdateUserDto} from './services/user.dto';
import {UsersService} from './services/users.service';

@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService,
    ) { }

    @Get() public getAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id') public getOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Post() public create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Put(':id') public update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        if (id !== updateUserDto.id) {
            throw new HttpException('Parameter id should match entity id', HttpStatus.BAD_REQUEST);
        }

        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id') public remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    }
}
