import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import {Model} from 'mongoose';

import {User} from '../db/user.schema';
import {UserSearchParams} from '../users.controller';
import {RegisterDto} from '../../auth/services/auth.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) {
    }

    async create(registerDto: RegisterDto): Promise<User> {
        const password = await bcrypt.hash(registerDto.password, 10);
        let user: User = null;

        try {
            user = await new this.userModel({
                ...registerDto,
                password,
            }).save();
        } catch (e) {
            if (e.code === 11000) {
                throw new HttpException('Name should be unique', HttpStatus.BAD_REQUEST);
            }

            throw new HttpException('Failed to create user', HttpStatus.BAD_REQUEST);
        }

        return user;
    }

    async findMany({limit, name}: UserSearchParams): Promise<User[]> {
        if (limit) {
            return this.userModel.find({
                name: {$regex: new RegExp(name, 'i')},
            }).limit(limit).exec();
        } else {
            return this.userModel.find({
                name: {$regex: new RegExp(name, 'i')},
            }).exec();
        }
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    async findByName(name: string): Promise<User> {
        return this.userModel.findOne({name}).exec();
    }
}
