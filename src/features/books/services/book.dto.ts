import {IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString, IsUrl, NotContains} from 'class-validator';

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
    @IsOptional() @IsMongoId() @IsNotEmpty() id: string;
    @IsOptional() @IsNotEmpty() @IsString() creator: string;
    @IsOptional() @IsArray() likedBy: string[];
}

export class LikeBookDto {
    @IsBoolean() @IsNotEmpty() like: boolean;
}