import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

import {HydratedDocument, Types} from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({
    versionKey: false,
})
export class Book {
    @Prop({required: true, unique: true}) name: string;
    @Prop({required: true}) url: string;
    @Prop() cover?: string;
    @Prop() description?: string;
    @Prop() id: Types.ObjectId;
    @Prop({required: true}) creator: string;
    @Prop({default: []}) likedBy: string[];
}

export const BookSchema = SchemaFactory.createForClass(Book);
BookSchema.method('toJSON', function () {
    const {_id, ...object} = this.toObject();
    object.id = _id;
    return object;
});