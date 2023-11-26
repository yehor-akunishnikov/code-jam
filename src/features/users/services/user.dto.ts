import {IsNotEmpty, IsStrongPassword} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty() name: string;
    @IsNotEmpty() @IsStrongPassword() password: string;
}