import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Movie extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  year: string;

  @Prop()
  rated: string;

  @Prop()
  released: Date;

  @Prop({})
  description: string;

  @Prop()
  genre: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
