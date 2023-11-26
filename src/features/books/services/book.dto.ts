import {IsMongoId, IsNotEmpty, IsOptional, IsUrl} from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty() name: string;
    @IsNotEmpty() @IsUrl() url: string;
    @IsOptional() @IsNotEmpty() @IsUrl() cover?: string;
    @IsOptional() @IsNotEmpty() description?: string;
}

export class UpdateBookDto {
    @IsNotEmpty() name: string;
    @IsNotEmpty() @IsUrl() url: string;
    @IsOptional() @IsNotEmpty() @IsUrl() cover?: string;
    @IsOptional() @IsNotEmpty() description?: string;
    @IsMongoId() @IsNotEmpty() id: string;
}