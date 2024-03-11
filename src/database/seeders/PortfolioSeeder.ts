import { SeederConfig } from "../../config/seeders";
import { Portfolio } from "../../models/Portfolio";
import { PortfolioFactory } from "../factories/PortfolioFactory";
import { Seeder } from "./Seeder";

export class PortfolioSeeder extends Seeder{
    protected async generate(): Promise<void> {
        const {PORTFOLIOS}=SeederConfig

        const portfolios = new PortfolioFactory().createMany(PORTFOLIOS)

        await Portfolio.save(portfolios)
    }
}