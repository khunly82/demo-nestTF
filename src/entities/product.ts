import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    // -99999,99 - 99999,99 
    @Column({ type: 'decimal', precision: 7, scale: 2 })
    price: number;

    @Column()
    active: boolean;

    @Column()
    createDate: Date;

    @Column({ length: 1000, nullable: true })
    description: string;

    @Column()
    categoryId: number;

    @ManyToOne(() => Category, c => c.products)
    category: Category
}