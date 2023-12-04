import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';

import {AuthService} from './services/auth.service';
import {RegisterDto, SignInDto} from './services/auth.dto';
import {User} from '../users/db/user.schema';
import {UsersService} from '../users/services/users.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) {
    }

    @HttpCode(HttpStatus.OK)
    @Post('login') public async signIn(
        @Body() signInDto: SignInDto
    ): Promise<{token: string}> {
        return this.authService.signIn(signInDto.name, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register') public register(@Body() registerDto: RegisterDto): Promise<User> {
        return this.usersService.create(registerDto);
    }
}
