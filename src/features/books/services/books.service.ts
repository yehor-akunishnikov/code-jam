import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {CreateBookDto, UpdateBookDto} from './book.dto';
import {BookSearchParams} from '../books.controller';
import {Book} from '../db/book.schema';

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<Book>
    ) { }

    async create(createBookDto: CreateBookDto, userName: string): Promise<Book> {
        const createdBook = new this.bookModel({
            ...createBookDto,
            creator: userName,
        });

        return createdBook.save();
    }

    async findMany({limit, name}: BookSearchParams): Promise<Book[]> {
        if (limit) {
            return this.bookModel.find({
                name: {$regex: new RegExp(name, 'i')},
            }).limit(limit).exec();
        } else {
            return this.bookModel.find({
                name: {$regex: new RegExp(name, 'i')},
            }).exec();
        }
    }

    async findOne(id: string): Promise<Book> {
        return this.bookModel.findById(id).exec();
    }

    async update(updateBookDto: UpdateBookDto, currentUserName: string): Promise<Book> {
        const {id, ...bookObject} = updateBookDto;

        const book = await this.findOne(id);

        if (book.creator !== currentUserName) {
            throw new HttpException('Only the book creator can edit a book', HttpStatus.UNAUTHORIZED);
        }

        if (updateBookDto.creator !== currentUserName) {
            throw new HttpException('Book creator reassignment is forbidden', HttpStatus.FORBIDDEN);
        }

        const updatedBook = this.bookModel.findByIdAndUpdate(
            id,
            {...bookObject, _id: id},
            {new: true}
        );

        return updatedBook.exec();
    }

    async remove(id: string, currentUserName: string): Promise<void> {
        const book = await this.findOne(id);

        if (book.creator !== currentUserName) {
            throw new HttpException('Only the book creator can edit a book', HttpStatus.UNAUTHORIZED);
        }

        await this.bookModel.findByIdAndDelete(id).exec();

        return;
    }
}
