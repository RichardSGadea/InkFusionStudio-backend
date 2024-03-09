import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("portfolio")
export class Portfolio extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: "name"})
    name!: string;

    @Column({name: "price"})
    price!: number;

    @Column({name: "created_at"})
    createdAt!: Date;

    @Column({name: "updated_at"})
    updatedAt!: Date;


}
