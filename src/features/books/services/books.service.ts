import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';

import {FilterQuery, Model} from 'mongoose';

import {SearchUtilsService} from '../../../shared/services/search-utils.service';
import {CreateBookDto, LikeBookDto, UpdateBookDto} from './book.dto';
import {BookSearchParams} from '../books.controller';
import {Book} from '../db/book.schema';

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<Book>,
        private searchUtilsService: SearchUtilsService,
    ) {
    }

    async create(createBookDto: CreateBookDto, userName: string): Promise<Book> {
        return new this.bookModel({
            ...createBookDto,
            creator: userName,
        }).save();
    }

    async findMany({limit, name, creator}: BookSearchParams): Promise<Book[]> {
        const filter: FilterQuery<Book> = this.searchUtilsService.buildSearchFilter<Book>(
            {key: 'name', value: name},
            {key: 'creator', value: creator},
        );

        if (limit) {
            return this.bookModel.find(filter).limit(limit).exec();
        } else {
            return this.bookModel.find(filter).exec();
        }
    }

    async findOne(id: string): Promise<Book> {
        return this.searchUtilsService.handleNotFound<Book>(
            await this.bookModel.findById(id).exec(),
            'book'
        );
    }

    async findOneByName(name: string): Promise<Book> {
        return this.searchUtilsService.handleNotFound<Book>(
            await this.bookModel.findOne({name}).exec(),
            'book'
        );
    }

    async update(updateBookDto: UpdateBookDto, currentUserName: string, idParam: string): Promise<Book> {
        const {id, creator, likedBy, ...bookObject} = updateBookDto;
        const book = await this.findOne(id);

        if (idParam !== id) {
            throw new HttpException('Parameter id should match entity id', HttpStatus.BAD_REQUEST);
        }

        if (book.creator !== currentUserName) {
            throw new HttpException('Only the book creator can edit a book', HttpStatus.UNAUTHORIZED);
        }

        return this.bookModel.findByIdAndUpdate(
            id,
            bookObject,
            {new: true}
        );
    }

    async remove(id: string, currentUserName: string): Promise<void> {
        const book = this.searchUtilsService.handleNotFound<Book>(await this.findOne(id), 'book');

        if (book.creator !== currentUserName) {
            throw new HttpException('Only the book creator can edit a book', HttpStatus.UNAUTHORIZED);
        }

        await this.bookModel.findByIdAndDelete(id).exec();

        return;
    }

    async like(likeBookDto: LikeBookDto, userName: string, id: string): Promise<Book> {
        const book = await this.findOne(id);

        if (likeBookDto.like) {
            return this.bookModel.findByIdAndUpdate(
                id,
                {likedBy: [...book.likedBy, userName]},
                {new: true}
            );
        } else {
            return this.bookModel.findByIdAndUpdate(
                id,
                {likedBy: book.likedBy.filter(name => name !== userName)},
                {new: true}
            );
        }
    }
}
