import {IsMongoId, IsNotEmpty, IsOptional, IsString, IsUrl} from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty() @IsString() name: string;
    @IsNotEmpty() @IsUrl() url: string;
    @IsOptional() @IsNotEmpty() @IsUrl() cover?: string;
    @IsOptional() @IsString() @IsNotEmpty() description?: string;
}

export class UpdateBookDto {
    @IsNotEmpty() @IsString() name: string;
    @IsNotEmpty() @IsUrl() url: string;
    @IsOptional() @IsNotEmpty() @IsUrl() cover?: string;
    @IsOptional() @IsString() @IsNotEmpty() description?: string;
    @IsMongoId() @IsNotEmpty() id: string;
    @IsNotEmpty() @IsString() creator: string;
}