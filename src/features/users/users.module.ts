import {forwardRef, Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {UsersController} from './users.controller';
import {UsersService} from './services/users.service';
import {User, UserSchema} from './db/user.schema';
import {AuthModule} from '../auth/auth.module';
import { UserController } from './user/user.controller';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ]),
        forwardRef(() => AuthModule)
    ],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController, UserController]
})
export class UsersModule {
}
