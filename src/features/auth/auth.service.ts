import {Injectable, UnauthorizedException} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import {UsersService} from '../users/services/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {
    }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        const isPassMatching = await bcrypt.compare(pass, user.password);

        if (!isPassMatching) {
            throw new UnauthorizedException();
        }

        const {password, ...result} = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return result;
    }
}
