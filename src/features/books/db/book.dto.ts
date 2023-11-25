import {IsNotEmpty, IsUrl} from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty() name: string;
    @IsUrl() url: string;
}