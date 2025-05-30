import { Book } from "src/books/entities/book.entity";
import { Column, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => Book, (book) => book.categories)
    books: Book[];
}
