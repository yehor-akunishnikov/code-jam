import {Injectable} from '@nestjs/common';

import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';

import {Book} from '../db/book.schema';
import {CreateBookDto, UpdateBookDto} from './book.dto';

@Injectable()
export class BooksService {
    constructor(
        @InjectModel(Book.name) private bookModel: Model<Book>
    ) { }

    async create(createBookDto: CreateBookDto): Promise<Book> {
        const createdBook = new this.bookModel(createBookDto);

        return createdBook.save();
    }

    async findAll(): Promise<Book[]> {
        return this.bookModel.find().exec();
    }

    async findOne(id: string): Promise<Book> {
        return this.bookModel.findById(id).exec();
    }

    async update(updateBookDto: UpdateBookDto): Promise<Book> {
        const {id, ...bookObject} = updateBookDto;

        const updatedBook = this.bookModel.findByIdAndUpdate(
            id,
            {...bookObject, _id: id},
            {new: true}
        );

        return updatedBook.exec();
    }

    async remove(id: string): Promise<void> {
        await this.bookModel.findByIdAndDelete(id).exec();

        return;
    }
}
