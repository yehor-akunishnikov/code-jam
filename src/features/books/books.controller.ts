import {Controller, Get} from '@nestjs/common';

import {BooksService} from './services/books.service';
import {Book} from './db/book.schema';

@Controller('books')
export class BooksController {
    constructor(
        private booksService: BooksService,
    ) { }

    @Get() public getAll(): Promise<Book[]> {
        return this.booksService.findAll();
    }
}
