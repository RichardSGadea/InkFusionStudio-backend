import { SeederConfig } from "../../config/seeders";
import { UserRoles } from "../../constants/UserRoles";
import { User } from "../../models/User";
import { UserFactory } from "../factories/UserFactory";
import { Seeder } from "./Seeder";

export class UserSeeder extends Seeder{
    protected async generate(): Promise<void> {
        const {ADMINS, WORKERS, CLIENTS} = SeederConfig;

        const userFactory = new UserFactory();

        //admins
        const adminUsers = userFactory.createMany(ADMINS);
        adminUsers.forEach((user)=>{
            user.role = UserRoles.ADMIN;
        });

        //workers
        const workerUsers =  userFactory.createMany(WORKERS);
        workerUsers.forEach((user)=>{
            user.role = UserRoles.WORKER;
        });

        //clients
        const clientUsers = userFactory.createMany(CLIENTS);
        clientUsers.forEach((user)=>{
            user.role = UserRoles.CLIENT;
        });

        //Save to DataBase
        const allUsers = [...adminUsers, ...workerUsers, ...clientUsers];
        await User.save(allUsers)

    }
}