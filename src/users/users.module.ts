import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Bookreview } from 'src/bookreviews/entities/bookreview.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([User, Profile, Bookreview]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
