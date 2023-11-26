import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';

import {HydratedDocument, Types} from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
    versionKey: false,
})
export class User {
    @Prop({required: true}) name: string;
    @Prop({required: true}) password: string;
    @Prop() id: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.method('toJSON', function () {
    const { _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
});