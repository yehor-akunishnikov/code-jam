import {forwardRef, Module} from '@nestjs/common';

import {AuthController} from './auth.controller';
import {AuthService} from './services/auth.service';
import {UsersModule} from '../users/users.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        forwardRef(() => UsersModule),
    ]
})
export class AuthModule {
}
