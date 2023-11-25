import {Body, Controller, Get, Post} from '@nestjs/common';

import {BooksService} from './services/books.service';
import {Book} from './db/book.schema';
import {CreateBookDto} from './db/book.dto';

@Controller('books')
export class BooksController {
    constructor(
        private booksService: BooksService,
    ) { }

    @Get() public getAll(): Promise<Book[]> {
        return this.booksService.findAll();
    }

    @Post() public create(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.booksService.create(createBookDto);
    }
}
