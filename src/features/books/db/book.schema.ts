import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

import {HydratedDocument, Types} from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({
    versionKey: false,
})
export class Book {
    @Prop({required: true}) name: string;
    @Prop({required: true}) url: string;
    @Prop() id: Types.ObjectId;
}

export const BookSchema = SchemaFactory.createForClass(Book);

BookSchema.method('toJSON', function () {
    const { _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});