import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import {InjectModel} from '@nestjs/mongoose';
import {FilterQuery, Model} from 'mongoose';

import {CreateBookDto, UpdateBookDto} from './book.dto';
import {BookSearchParams} from '../books.controller';
import {Book} from '../db/book.schema';

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<Book>
    ) {
    }

    async create(createBookDto: CreateBookDto, userName: string): Promise<Book> {
        let createdBook: Book;

        try {
            createdBook = await new this.bookModel({
                ...createBookDto,
                creator: userName,
            }).save();
        } catch (e) {
            if (e.code === 11000) {
                throw new HttpException('Name should be unique', HttpStatus.BAD_REQUEST);
            }

            throw new HttpException('Failed to create book', HttpStatus.BAD_REQUEST);
        }

        return createdBook;
    }

    async findMany({limit, name, creator}: BookSearchParams): Promise<Book[]> {
        const filter: FilterQuery<Book> = this.buildSearchFilter(
            ['name', name],
            ['creator', creator],
        );

        if (limit) {
            return this.bookModel.find(filter).limit(limit).exec();
        } else {
            return this.bookModel.find(filter).exec();
        }
    }

    async findOne(id: string): Promise<Book> {
        const book = await this.bookModel.findById(id).exec();

        return this.handleNotFound(book);
    }

    async findOneByName(name: string): Promise<Book> {
        const book = await this.bookModel.findOne({name}).exec();

        return this.handleNotFound(book);
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

    private handleNotFound(book: Book): Book {
        if (book) {
            return book;
        } else {
            throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
        }
    }

    private buildSearchFilter(...queryParams: [string, string][]): FilterQuery<Book> {
        const filter: FilterQuery<Book> = {};

        queryParams.forEach(param => {
            if (param[1]) {
                filter[param[0]] = {$regex: new RegExp(param[1], 'i')};
            }
        });

        return filter;
    }
}
