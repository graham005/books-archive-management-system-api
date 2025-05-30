import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/authors/entities/author.entity';
import { Bookreview } from 'src/bookreviews/entities/bookreview.entity';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>,
    @InjectRepository(Bookreview) private readonly bookreviewRepository: Repository<Bookreview>
  ) {}
  create(createBookDto: CreateBookDto) {
    const newBook = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(newBook)
      .then((book) => {
        return book;
      })
      .catch((error) => {
        throw new Error(`Error creating book: ${error.message}`);
      });
  }

  async findAll(title?: string, author?: string, category?: string) {
    if (title) {
      return this.bookRepository.find({
        where: { title },
        relations: ['author', 'bookreviews'],
      });
    }
    if (author) {
      const authorEntity = await this.authorRepository.findOne({ where: { name: author } });
      if (!authorEntity) {
        throw new Error(`Author with name ${author} not found`);
      }
      return this.bookRepository.find({
        where: { author: { id: authorEntity.id } },
        relations: ['author', 'bookreviews'],
      });
    }
    if (category) {
      return this.bookRepository.find({
        where: { category: category },
        relations: ['author', 'bookreviews'],
      });
    }
    return await this.bookRepository.find({
      relations: ['author', 'bookreviews'],});
  }

  findOne(id: number) {
    return this.bookRepository.findOne({
      where: { id },
      relations: ['author', 'bookreviews'],
    }).then((book) => {
      if (!book) {
        throw new Error(`Book with ID ${id} not found`);
      }
      return book;
    }).catch((error) => {
      throw new Error(`Error finding book: ${error.message}`);
    });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookRepository.update(id, updateBookDto)
      .then((result) => {
        if (result.affected === 0) {
          throw new Error(`Book with ID ${id} not found`);
        }
      })
      .catch((error) => {
        throw new Error(`Error updating book: ${error.message}`);
      })
      .finally(() => {
        return this.findOne(id);
      });
  }

  remove(id: number) {
    return this.bookRepository.delete(id)
      .then((result) => {
        if (result.affected === 0) {
          throw new Error(`Book with ID ${id} not found`);
        }
      })
      .catch((error) => {
        throw new Error(`Error deleting book: ${error.message}`);
      });
  }

  async createReview(bookId: number, reviewContent: string) {
    const book = await this.findOne(bookId);
    if (!book) {
      throw new Error(`Book with ID ${bookId} not found`);
    }
    const newReview = this.bookreviewRepository.create({
      content: reviewContent,
      book: book,
    });
    return this.bookreviewRepository.save(newReview)
      .then((review) => {
        return review;
      })
      .catch((error) => {
        throw new Error(`Error creating book review: ${error.message}`);
      });
  }
}
