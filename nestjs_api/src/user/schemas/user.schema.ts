import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";



@Schema()
export class User extends Document {
    

    @Prop({required:true}) 
    username:string;


    @Prop({required:true})
    password:string;
}


export const UserSchema = SchemaFactory.createForClass(User);