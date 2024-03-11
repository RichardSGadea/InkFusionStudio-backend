import { Appointment } from "../../models/Appointment";
import { Factory } from "./Factory";
import { faker } from '@faker-js/faker';


export class AppointmentFactory extends Factory<Appointment>{
    protected generate(): Appointment {
        return{
            appointmentDate: faker.date.future(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.soon(),
            status: false,
        } as Appointment
    }
}