import { Book } from "src/books/entities/book.entity";
import { Column, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";

export class Author {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    bio: string;

    @Column('date')
    birthDate: string;

    @Column('boolean', { default: true })
    isActive: boolean;

    @OneToMany(() => Book, book => book.author)
    books: Relation<Book[]>;
}
