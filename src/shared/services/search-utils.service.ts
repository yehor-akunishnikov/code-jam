import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import {FilterQuery} from 'mongoose';

@Injectable()
export class SearchUtilsService {
    public buildSearchFilter<T>(...queryParams: { key: string, value: string }[]): FilterQuery<T> {
        const filter = {};

        queryParams.forEach(({key, value}) => {
            if (value) {
                filter[key] = {$regex: new RegExp(value, 'i')};
            }
        });

        return filter;
    }

    public handleNotFound<T>(entity: T, key: string): T {
        if (entity) {
            return entity;
        } else {
            throw new HttpException(`${key.charAt(0).toUpperCase() + key.slice(1)} not found`, HttpStatus.NOT_FOUND);
        }
    }
}
