import { AppointmentSeeder } from "./AppointmentSeeder";
import { PortfolioSeeder } from "./PortfolioSeeder";
import { RoleSeeder } from "./RoleSeeder";
import { UserSeeder } from "./UserSeeder";

(async () =>{
    console.log("Starting seeders...");
    await new RoleSeeder().start();
    await new UserSeeder().start();
    await new PortfolioSeeder().start();
    await new AppointmentSeeder().start();

})();