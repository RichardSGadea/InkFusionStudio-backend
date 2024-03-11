import { Portfolio } from "../../models/Portfolio";
import { Factory } from "./Factory";
import { faker } from '@faker-js/faker';

export class PortfolioFactory extends Factory<Portfolio>{
    protected generate(): Portfolio {
        return {
            name: faker.lorem.sentence({min: 3, max: 5}),
            image: faker.image.urlLoremFlickr(),
            price: faker.number.float({min: 10, max:150, fractionDigits:2}),
            createdAt: faker.date.past(),
            updatedAt: faker.date.future(),
        } as Portfolio;
    }
}