import { Book } from "src/books/entities/book.entity";
import { User } from "src/users/entities/user.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Bookreview {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column('decimal', { precision: 2, scale: 1 })
    rating: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => User, (user) => user.bookreviews)
    user: User;

    @ManyToOne(() => Book, (book) => book.bookreviews)
    book: Book;
}
