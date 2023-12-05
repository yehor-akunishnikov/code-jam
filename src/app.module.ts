import {Module} from '@nestjs/common';
import {APP_GUARD} from '@nestjs/core';

import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigModule} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';

import * as process from 'process';

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
        JwtModule.register({
            global: true,
            secret: process.env.JWT_KEY,
            signOptions: { expiresIn: '20m' },
        }),
        BooksModule,
        UsersModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        },
    ]
})
export class AppModule {
}
