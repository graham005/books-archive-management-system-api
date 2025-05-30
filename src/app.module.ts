import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { AuthorsModule } from './authors/authors.module';
import { BooksModule } from './books/books.module';
import { CategoriesModule } from './categories/categories.module';
import { BookreviewsModule } from './bookreviews/bookreviews.module';

@Module({
  imports: [UsersModule, ProfilesModule, AuthorsModule, BooksModule, CategoriesModule, BookreviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
