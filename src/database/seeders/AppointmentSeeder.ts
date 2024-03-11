import { SeederConfig } from "../../config/seeders";
import { getRandomSubarray, getRandomValueFromArray, getUsersAccordingRole } from "../../helpers/common";
import { Appointment } from "../../models/Appointment";
import { Portfolio } from "../../models/Portfolio";
import { User } from "../../models/User";
import { AppointmentFactory } from "../factories/AppointmentFactory";
import { Seeder } from "./Seeder";

export class AppointmentSeeder extends Seeder{
    protected async generate(): Promise<void> {
        const {APPOINTMENTS,PORTFOLIO_PER_APPOINTMENT} = SeederConfig

        const users= await User.find();
        const portfolios= await Portfolio.find();

        const workers=getUsersAccordingRole(users,2);
        const clients=getUsersAccordingRole(users,3);

        const appointments = new AppointmentFactory().createMany(APPOINTMENTS)
    

        appointments.forEach(appointment=>{
            appointment.client= getRandomValueFromArray(clients);
            appointment.worker= getRandomValueFromArray(workers);
            appointment.appointmentPortfolios = getRandomSubarray(portfolios,PORTFOLIO_PER_APPOINTMENT);
        })


        

        await Appointment.save(appointments);
        
        
        

    }
}