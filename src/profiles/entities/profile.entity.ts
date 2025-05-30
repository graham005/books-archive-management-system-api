import { User } from "src/users/entities/user.entity";
import { Column, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export class Profile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bio: string;

    @Column()
    avatar: string;

    @Column('date')
    dateOfBirth: string;

    @Column()
    location: string;

    @OneToOne(() => User, user => user.profile)
    user: User;
}
