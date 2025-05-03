import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private currentId = 1;

  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const createdBook = new this.bookModel({
      ...createBookDto,
      id: this.currentId++,
    });
    return createdBook.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookModel.findOne({ id });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookModel.findOneAndUpdate({ id }, updateBookDto, {
      new: true,
    });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return book;
  }

  async remove(id: number): Promise<void> {
    const result = await this.bookModel.deleteOne({ id });
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
  }
}
