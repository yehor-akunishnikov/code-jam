import {IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength, NotContains} from 'class-validator';

export class SignInDto {
    @IsNotEmpty() @IsString() password: string;
    @IsNotEmpty() @IsString() name: string;
}

export class RegisterDto {
    @IsNotEmpty() @IsString() @MaxLength(15) @MinLength(3) @NotContains(" ") name: string;
    @IsNotEmpty() @IsString() @IsStrongPassword() @NotContains(" ") password: string;
}