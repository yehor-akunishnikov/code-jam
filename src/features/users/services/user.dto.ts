import {IsMongoId, IsNotEmpty} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty() name: string;
    @IsNotEmpty() password: string;
}

export class UpdateUserDto {
    @IsNotEmpty() name: string;
    @IsMongoId() @IsNotEmpty() id: string;
}