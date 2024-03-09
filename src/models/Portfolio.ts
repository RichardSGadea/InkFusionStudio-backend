import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment";

@Entity("portfolio")
export class Portfolio extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: "name"})
    name!: string;

    @Column({name:"image"})
    image!: string

    @Column({name: "price"})
    price!: number;

    @Column({name: "created_at"})
    createdAt!: Date;

    @Column({name: "updated_at"})
    updatedAt!: Date;

    //Relation Portfolio {0..n}--{0..n} Appointment
    @ManyToMany(()=>Appointment, (appointment) => appointment.appointmentPortfolios)
    appointments?: Appointment[]
}
