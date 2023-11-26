import {Module} from '@nestjs/common';
import {APP_GUARD} from '@nestjs/core';

import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config';

import * as process from 'process';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersModule} from './features/users/users.module';
import {BooksModule} from './features/books/books.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@clusterjam.8rfonxk.mongodb.net/?retryWrites=true&w=majority`),
        ThrottlerModule.forRoot([{
            ttl: 60000,
            limit: 10,
        }]),
        BooksModule,
        UsersModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        },
        AppService
    ],
})
export class AppModule {
}
