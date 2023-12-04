import {IsMongoId, IsNotEmpty, IsOptional, IsString, IsUrl, NotContains} from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty() @IsString() @NotContains(" ") name: string;
    @IsNotEmpty() @IsUrl() url: string;
    @IsOptional() @IsNotEmpty() @IsUrl() cover?: string;
    @IsOptional() @IsString() @IsNotEmpty() description?: string;
}

export class UpdateBookDto {
    @IsNotEmpty() @IsString() @NotContains(" ") name: string;
    @IsNotEmpty() @IsUrl() url: string;
    @IsOptional() @IsNotEmpty() @IsUrl() cover?: string;
    @IsOptional() @IsString() @IsNotEmpty() description?: string;
    @IsMongoId() @IsNotEmpty() id: string;
    @IsNotEmpty() @IsString() creator: string;
}