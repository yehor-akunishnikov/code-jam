import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UseGuards
} from '@nestjs/common';

import {CreateBookDto, UpdateBookDto} from './services/book.dto';
import {BooksService} from './services/books.service';
import {AuthGuard} from '../auth/guard/auth.guard';
import {Book} from './db/book.schema';

export interface BookSearchParams {
    limit?: number,
    name?: string,
}

@Controller('books')
export class BooksController {
    constructor(
        private booksService: BooksService,
    ) { }

    @Get() public getMany(@Query() query: BookSearchParams = {name: ''}): Promise<Book[]> {
        return this.booksService.findMany(query);
    }

    @Get(':id') public getOne(@Param('id') id: string): Promise<Book> {
        return this.booksService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Post() public create(@Body() createBookDto: CreateBookDto): Promise<Book> {
        return this.booksService.create(createBookDto);
    }

    @UseGuards(AuthGuard)
    @Put(':id') public update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
        if (id !== updateBookDto.id) {
            throw new HttpException('Parameter id should match entity id', HttpStatus.BAD_REQUEST);
        }

        return this.booksService.update(updateBookDto);
    }

    @UseGuards(AuthGuard)
    @Delete(':id') public remove(@Param('id') id: string): Promise<void> {
        return this.booksService.remove(id);
    }
}
