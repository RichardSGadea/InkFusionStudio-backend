import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}
