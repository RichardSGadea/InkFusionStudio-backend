import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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

    @Column({name: "phone_number"})
    phoneNumber!: number;

    @Column({name: "is_active"})
    isActive!: boolean;





}
