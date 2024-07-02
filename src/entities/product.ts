import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    active: boolean;

    @Column()
    createDate: Date;

    @Column()
    description: string;

    @ManyToOne(() => Category, c => c.products)
    category: Category
}