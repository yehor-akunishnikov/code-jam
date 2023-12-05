import {ArgumentsHost, Catch, RpcExceptionFilter} from '@nestjs/common';

import { MongoServerError } from 'mongodb';
import * as mongoose from 'mongoose';

@Catch(mongoose.mongo.MongoServerError)
export class MongoErrorFilter implements RpcExceptionFilter {
    catch(exception: MongoServerError, host: ArgumentsHost) : any {
        const ctx = host.switchToHttp(),
            response = ctx.getResponse();

        return response.status(400).json({
            statusCode: 400,
            createdBy: 'ValidationErrorFilter',
            errors: ['Invalid entity'],
        });
    }
}

