import { Author } from "src/authors/entities/author.entity";
import { Bookreview } from "src/bookreviews/entities/bookreview.entity";
import { Category } from "src/categories/entities/category.entity";
import { Column, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    category: string;

    @Column()
    description: string;

    @Column('date')
    publicationYear: number;

    @Column('boolean', { default: true })
    isAvailable: boolean;

    @ManyToOne(() => Author, (author) => author.books)
    author: Author;

    @OneToMany(() => Bookreview, (bookreview) => bookreview.book)
    bookreviews: Bookreview[];

    @ManyToMany(() => Category, (category) => category.books)
    @JoinTable()
    categories: Category[];
}
