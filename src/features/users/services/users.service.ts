import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';

import * as bcrypt from 'bcrypt';
import {FilterQuery, Model} from 'mongoose';

import {User} from '../db/user.schema';
import {UserSearchParams} from '../users.controller';
import {RegisterDto} from '../../auth/services/auth.dto';
import {SearchUtilsService} from '../../../shared/services/search-utils.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private searchUtilsService: SearchUtilsService,
    ) {
    }

    async create(registerDto: RegisterDto): Promise<User> {
        const password = await bcrypt.hash(registerDto.password, 10);

        return new this.userModel({
            ...registerDto,
            password,
        }).save();
    }

    async findMany({limit, name}: UserSearchParams): Promise<User[]> {
        const filter: FilterQuery<User> = this.searchUtilsService.buildSearchFilter<User>(
            {key: 'name', value: name},
        );

        if (limit) {
            return this.userModel.find(filter).limit(limit).exec();
        } else {
            return this.userModel.find(filter).exec();
        }
    }

    async findByName(name: string): Promise<User> {
        return this.searchUtilsService.handleNotFound<User>(
            await this.userModel.findOne({name}).exec(),
            'user'
        );
    }
}
