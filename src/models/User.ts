import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role";
import { Appointment } from "./Appointment";

@Entity("users")
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: "first_name"})
    firstName!: string;

    @Column({name: "last_name"})
    lastName!: string;

    @Column({name: "email"})
    email!: string;

    @Column({name: "password"})
    password!: string;


    @Column({name: "is_active"})
    isActive!: boolean;

    @Column({name: "role_id"})
    roleId!: number;

    //Relation: User {0..n}...{1} Role

    @ManyToOne(()=>Role,(role)=>role.users)
    @JoinColumn ({name:"role_id"})
    role!:Role;

    //Relation: Client(User) {1}...{0..n} Appointment

    @OneToMany(()=>Appointment,(appointment)=>appointment.client)
    clientAppointments?: Appointment[]

    //Relation: worker(User) {1}...{0..n} Appointment

    @OneToMany(()=>Appointment,(appointment)=>appointment.worker)
    workerAppointments?: Appointment[]

}
