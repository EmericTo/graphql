import { DataSource } from "typeorm";
import { Country } from "./entity/Country";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "data.db",
    synchronize: true,
    logging: false,
    entities: [Country],
    subscribers: [],
    migrations: [],
})
