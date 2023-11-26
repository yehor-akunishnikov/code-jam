import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import {Model} from 'mongoose';

import {User} from '../db/user.schema';
import {CreateUserDto} from './user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const password = await bcrypt.hash(createUserDto.password, 10);

        const createdUser = new this.userModel({
            ...createUserDto,
            password,
        });

        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }
}
