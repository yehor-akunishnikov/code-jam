import {IsNotEmpty, IsStrongPassword} from 'class-validator';

export class SignInDto {
    @IsNotEmpty() password: string;
    @IsNotEmpty() name: string;
}

export class RegisterDto {
    @IsNotEmpty() name: string;
    @IsNotEmpty() @IsStrongPassword() password: string;
}