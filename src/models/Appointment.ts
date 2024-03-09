import { BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./User";
import { Portfolio } from "./Portfolio";

@Entity("appointments")
export class Appointment extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!:number;

    @Column({name: "appointment_date"})
    appointmentDate!: Date;

    @Column({name: "created_at"})
    createdAt!: Date;

    @Column({name: "updated_at"})
    updatedAt!: Date;

    @Column({name: "status"})
    status!: boolean;

    //Relation Appointment {0..n}--{1} User(client)
    
    @ManyToOne(()=>User, (user)=> user.clientAppointments)
    @JoinColumn({name: "client_id"})
    client!: User;

    //Relation Appointment {0..n}--{1} User(worker)

    @ManyToOne(()=>User, (user)=> user.workerAppointments)
    @JoinColumn({name: "worker_id"})
    worker!: User;

    //Relation Appointment {0..n}--{0..n} Portfolio
    @ManyToMany(()=>Portfolio,(portfolio) => portfolio.appointments)
    @JoinTable({
        name: "appointment_portfolio",
        joinColumn:{
            name:"appointment_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn:{
            name:"portfolio_id",
            referencedColumnName: "id"
        }
    })
    appointmentPortfolios!: Portfolio[]


}
