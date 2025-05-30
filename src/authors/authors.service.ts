import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>
  ) {}
  async create(createAuthorDto: CreateAuthorDto) {
    const newAuthor = await this.authorRepository.create(createAuthorDto);
    return await this.authorRepository.save(newAuthor)
      .then((author) => {
        return author;
      })
      .catch((error) => {
        throw new Error(`Error creating author: ${error.message}`);
      });
  }

  findAll() {
    return this.authorRepository.find({
      relations: ['books'],
    });
  }

  findOne(id: number) {
    return this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    }).then((author) => {
      if (!author) {
        throw new Error(`Author with ID ${id} not found`);
      }
      return author;
    }).catch((error) => {
      throw new Error(`Error finding author: ${error.message}`);
    });
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return this.authorRepository.update(id, updateAuthorDto)
      .then((result) => {
        if (result.affected === 0) {
          throw new Error(`Author with ID ${id} not found`);
        }
      })
      .catch((error) => {
        throw new Error(`Error updating author: ${error.message}`);
      })
      .finally(() => {
        return this.findOne(id);
      });
  }

  remove(id: number) {
    return this.authorRepository.delete(id)
      .then((result) => {
        if (result.affected === 0) {
          throw new Error(`Author with ID ${id} not found`);
        }
      })
      .catch((error) => {
        throw new Error(`Error removing author: ${error.message}`);
      });
  }

  async findBooksByAuthor(authorId: number) {
    const author = await this.findOne(authorId);
    if (!author) {
      throw new Error(`Author with ID ${authorId} not found`);
    }
    return this.bookRepository.find({
      where: { author: { id: author.id } },
      relations: ['author'],
    });
  }
}
