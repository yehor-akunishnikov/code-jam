import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import {FilterQuery, Model} from 'mongoose';

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
        const filter: FilterQuery<User> = this.buildSearchFilter(['name', name]);

        if (limit) {
            return this.userModel.find(filter).limit(limit).exec();
        } else {
            return this.userModel.find(filter).exec();
        }
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();

        return this.handleNotFound(user);
    }

    async findByName(name: string): Promise<User> {
        const user = await this.userModel.findOne({name}).exec();

        return this.handleNotFound(user);
    }

    private handleNotFound(user: User): User {
        if (user) {
            return user;
        } else {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }
    }

    private buildSearchFilter(...queryParams: [string, string][]): FilterQuery<User> {
        const filter: FilterQuery<User> = {};

        queryParams.forEach(param => {
            if (param[1]) {
                filter[param[0]] = {$regex: new RegExp(param[1], 'i')};
            }
        });

        return filter;
    }
}
