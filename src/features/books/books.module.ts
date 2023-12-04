import {Module} from '@nestjs/common';

import {MongooseModule} from '@nestjs/mongoose';

import {BooksController} from './books.controller';
import {Book, BookSchema} from './db/book.schema';
import {BooksService} from './services/books.service';
import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Book.name, schema: BookSchema}
        ]),
        AuthModule
    ],
    providers: [BooksService],
    controllers: [BooksController],
})
export class BooksModule {
}
