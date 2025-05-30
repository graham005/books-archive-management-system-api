import { Bookreview } from 'src/bookreviews/entities/bookreview.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Column, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    isActive: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToOne(() => Profile, profile => profile.user)
    @JoinColumn()
    profile: Relation<Profile>;

    @OneToMany(() => Bookreview, bookreview => bookreview.user)
    bookreviews: Relation<Bookreview[]>;
}
