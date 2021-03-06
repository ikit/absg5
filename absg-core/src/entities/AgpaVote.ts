import { Entity, Column, JoinColumn, Index, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { AgpaCategory } from "./AgpaCategory";
import { AgpaPhoto } from "./AgpaPhoto";
import { User } from "./User";

@Entity()
@Index(["year", "category", "user", "photo"], { unique: true })
export class AgpaVote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ comment: "Année de la photo", width: 4 })
    year: number;

    @ManyToOne(() => AgpaCategory)
    @JoinColumn()
    category: AgpaCategory;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @ManyToOne(() => AgpaPhoto)
    @JoinColumn()
    photo: AgpaPhoto;

    @Column({ comment: "Vote attribué à la photo", width: 1 })
    score: number;
}
