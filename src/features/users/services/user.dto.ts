import {IsNotEmpty, IsOptional, IsString, MinLength} from 'class-validator';
import {IsStrongPassword, MaxLength, NotContains} from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty() @IsString() @MaxLength(15) @MinLength(3) @NotContains(" ") name: string;
    @IsOptional() @IsNotEmpty() @IsString() @IsStrongPassword() password: string;
    @IsOptional() @IsNotEmpty() @IsString() @MaxLength(100) about: string;
}