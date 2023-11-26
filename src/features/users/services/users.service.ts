import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';

import {Model} from 'mongoose';

import {User} from '../db/user.schema';
import {CreateUserDto, UpdateUserDto} from './user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);

        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findOne({_id: id}).exec();
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        const updatedUser = this.userModel.findOneAndReplace(
            {_id: id},
            updateUserDto,
            {new: true}
        );

        return updatedUser.exec();
    }

    async remove(id: string): Promise<void> {
        await this.userModel.findByIdAndDelete({_id: id}).exec();

        return;
    }
}
