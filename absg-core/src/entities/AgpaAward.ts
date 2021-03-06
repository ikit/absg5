import { Entity, Column, JoinColumn, Index, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { AgpaCategory } from "./AgpaCategory";
import { AgpaPhoto } from "./AgpaPhoto";
import { User } from "./User";

export enum AgpaAwardType {
    honor = "honor",
    nominated = "nominated",
    bronze = "bronze",
    sylver = "sylver",
    gold = "gold",
    diamond = "diamond"
}

@Entity()
@Index(["year", "category", "user", "award"], { unique: true })
export class AgpaAward {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ comment: "Année d'attribution de l'agpa", width: 4 })
    year: number;

    @ManyToOne(() => AgpaCategory)
    @JoinColumn()
    category: AgpaCategory;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @Column("enum", {
        enum: ["honor", "nominated", "bronze", "sylver", "gold", "diamond"],
        comment: `'L\'agpa décerné`
    })
    award: AgpaAwardType;

    @ManyToOne(() => AgpaPhoto)
    @JoinColumn()
    photo: AgpaPhoto;
}
