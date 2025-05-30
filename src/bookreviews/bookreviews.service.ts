import { Injectable } from '@nestjs/common';
import { CreateBookreviewDto } from './dto/create-bookreview.dto';
import { UpdateBookreviewDto } from './dto/update-bookreview.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Bookreview } from './entities/bookreview.entity';

@Injectable()
export class BookreviewsService {
  constructor(
    @InjectRepository(Bookreview) private readonly bookreviewRepository: Repository<Bookreview>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>
  ) {}
  async create(createBookreviewDto: CreateBookreviewDto) {
    const newBookreview = await this.bookreviewRepository.create(createBookreviewDto);
    return await this.bookreviewRepository.save(newBookreview)
      .then((bookreview) => {
        return bookreview;
      })
      .catch((error) => {
        throw new Error(`Error creating book review: ${error.message}`);
      });
  }

  findAll() {
    return this.bookreviewRepository.find({
      relations: ['user', 'book'],
    });
  }

  findOne(id: number) {
    return this.bookreviewRepository.findOne({
      where: { id },
      relations: ['user', 'book'],
    }).then((bookreview) => {
      if (!bookreview) {
        throw new Error(`Book review with ID ${id} not found`);
      }
      return bookreview;
    }).catch((error) => {
      throw new Error(`Error finding book review: ${error.message}`);
    });
  }

  update(id: number, updateBookreviewDto: UpdateBookreviewDto) {
    return this.bookreviewRepository.update(id, updateBookreviewDto)
      .then((result) => {
        if (result.affected === 0) {
          throw new Error(`Book review with ID ${id} not found`);
        }
      })
      .catch((error) => {
        throw new Error(`Error updating book review: ${error.message}`);
      })
      .finally(() => {
        return this.findOne(id);
      });
  }

  remove(id: number) {
    return this.bookreviewRepository.delete(id)
      .then((result) => {
        if (result.affected === 0) {
          throw new Error(`Book review with ID ${id} not found`);
        }
      })
      .catch((error) => {
        throw new Error(`Error deleting book review: ${error.message}`);
      });
  }
}
