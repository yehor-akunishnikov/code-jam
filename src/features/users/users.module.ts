import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {UsersController} from './users.controller';
import {UsersService} from './services/users.service';
import {User, UserSchema} from './db/user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ]),
    ],
    providers: [UsersService],
    exports: [UsersService],
    controllers: [UsersController]
})
export class UsersModule {
}
