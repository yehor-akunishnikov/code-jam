import {Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import {UsersService} from '../../users/services/users.service';
import {User} from '../../users/db/user.schema';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async signIn(name: string, pass: string): Promise<{token: string}> {
        const user = await this.usersService.findByName(name);

        if(!user) {
            throw new NotFoundException('User not found')
        }

        const isPassMatching = await bcrypt.compare(pass, user.password);

        if (!isPassMatching) {
            throw new UnauthorizedException();
        }

        const payload = {sub: user.id, username: user.name};
        const token = await this.jwtService.signAsync(payload)

        return {token};
    }
}
