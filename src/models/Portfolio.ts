import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment";
import { AppointmentPortfolio } from "./AppointmentPortfolio";

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

    //Relation Portfolio {1}--{0..n} AppointmentPortfolio 
    @OneToMany(()=> AppointmentPortfolio, (appointmentPortfolio)=>appointmentPortfolio.portfolio)
    appointment_portfolios?:AppointmentPortfolio;
}
