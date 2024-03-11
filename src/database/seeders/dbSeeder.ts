import { RoleSeeder } from "./RoleSeeder";
import { UserSeeder } from "./UserSeeder";

(async () =>{
    console.log("Starting seeders...");
    await new RoleSeeder().start();
    await new UserSeeder().start();

})();