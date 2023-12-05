import {Module} from '@nestjs/common';

import {MongooseModule} from '@nestjs/mongoose';

import {BooksController} from './books.controller';
import {Book, BookSchema} from './db/book.schema';
import {BooksService} from './services/books.service';
import {AuthModule} from '../auth/auth.module';
import {SharedModule} from '../../shared/shared.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: Book.name, schema: BookSchema}
        ]),
        AuthModule,
        SharedModule
    ],
    providers: [BooksService],
    controllers: [BooksController],
})
export class BooksModule {
}
