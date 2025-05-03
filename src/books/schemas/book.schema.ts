import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true, minlength: 3 })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  year: number;

  @Prop({ default: false })
  isPublished: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);
