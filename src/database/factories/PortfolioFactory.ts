import { Portfolio } from "../../models/Portfolio";
import { Factory } from "./Factory";
import { faker } from '@faker-js/faker';

export class PortfolioFactory extends Factory<Portfolio>{
    protected generate(): Portfolio {
        return {
            name: faker.lorem.sentence({min: 3, max: 5}),
            image: faker.image.urlLoremFlickr(),
            price: +faker.finance.amount({min:5,max:250,dec: 2, symbol: '€'}),
            createdAt: faker.date.past(),
            updatedAt: faker.date.future(),
        } as Portfolio;
    }
}