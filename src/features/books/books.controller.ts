import {Body, Controller, DefaultValuePipe, Delete, Get} from '@nestjs/common';
import {Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';

import {CreateBookDto, LikeBookDto, UpdateBookDto} from './services/book.dto';
import {RequestWithAuthPayload} from '../../common/models';
import {BooksService} from './services/books.service';
import {AuthGuard} from '../auth/guard/auth.guard';
import {Book} from './db/book.schema';

export interface BookSearchParams {
    limit?: number,
    name?: string,
    creator?: string,
}

@Controller('books')
export class BooksController {
    constructor(
        private booksService: BooksService,
    ) {
    }

    @Get() public getMany(
        @Query('name', new DefaultValuePipe(null)) name: string,
        @Query('creator', new DefaultValuePipe(null)) creator: string,
        @Query('limit', new DefaultValuePipe(null)) limit: number,
    ): Promise<Book[]> {
        return this.booksService.findMany({name, creator, limit});
    }

    @Get(':name') public async getOneByName(
        @Param('name') name: string
    ): Promise<Book> {
        return this.booksService.findOneByName(name);
    }

    @UseGuards(AuthGuard) @Post() public create(
        @Body() createBookDto: CreateBookDto,
        @Req() request: RequestWithAuthPayload
    ): Promise<Book> {
        return this.booksService.create(createBookDto, request.user.username);
    }

    @UseGuards(AuthGuard) @Put(':id') public update(
        @Param('id') id: string,
        @Body() updateBookDto: UpdateBookDto,
        @Req() request: RequestWithAuthPayload
    ): Promise<Book> {
        return this.booksService.update(updateBookDto, request.user.username, id);
    }

    @UseGuards(AuthGuard) @Put('like/:id') public like(
        @Param('id') id: string,
        @Body() likeBookDto: LikeBookDto,
        @Req() request: RequestWithAuthPayload
    ): Promise<Book> {
        return this.booksService.like(likeBookDto, request.user.username, id);
    }

    @UseGuards(AuthGuard) @Delete(':id') public remove(
        @Param('id') id: string,
        @Req() request: RequestWithAuthPayload
    ): Promise<void> {
        return this.booksService.remove(id, request.user.username);
    }
}
