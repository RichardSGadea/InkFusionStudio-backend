import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment";
import { Portfolio } from "./Portfolio";

@Entity("appointment_portfolio")
export class AppointmentPortfolio extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Appointment, (appointment)=> appointment.appointment_portfolios)
    @JoinColumn({name: "appointment_id"})
    appointment!: Appointment[];

    @ManyToOne(() => Portfolio, (portfolio)=> portfolio.appointment_portfolios)
    @JoinColumn({name: "portfolio_id"})
    portfolio!: Portfolio[];
}
