import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';

import {BooksService} from './services/books.service';
import {Book} from './db/book.schema';
import {CreateBookDto, UpdateBookDto} from './services/book.dto';

@Controller('books')
export class BooksController {
    constructor(
        private booksService: BooksService,
    ) { }

    @Get() public getAll(): Promise<Book[]> {
        return this.booksService.findAll();
    }

    @Get(':id') public getOne(@Param('id') id: string): Promise<Book> {
        return this.booksService.findOne(id);
    }

    @Post() public create(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.booksService.create(createBookDto);
    }

    @Put(':id') public update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
        if (id !== updateBookDto.id) {
            throw new HttpException('Parameter id should match entity id', HttpStatus.BAD_REQUEST);
        }

        return this.booksService.update(updateBookDto);
    }

    @Delete(':id') public remove(@Param('id') id: string): Promise<void> {
        return this.booksService.remove(id);
    }
}
