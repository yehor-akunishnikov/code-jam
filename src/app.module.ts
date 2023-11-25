import {Module} from '@nestjs/common';

import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config';

import * as process from 'process';

import {BooksModule} from './features/books/books.module';
import {AppController} from './app.controller';
import {AppService} from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clusterjam.8rfonxk.mongodb.net/?retryWrites=true&w=majority`),
        BooksModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
