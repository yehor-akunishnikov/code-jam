import {IsNotEmpty, IsString, IsStrongPassword} from 'class-validator';

export class SignInDto {
    @IsNotEmpty() @IsString() password: string;
    @IsNotEmpty() @IsString() name: string;
}

export class RegisterDto {
    @IsNotEmpty() @IsString() name: string;
    @IsNotEmpty() @IsStrongPassword() password: string;
}