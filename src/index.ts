import "reflect-metadata";
import express from 'express';
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSchema } from "type-graphql";
import { CountryResolver } from "./resolver/CountryResolver";
import { AppDataSource } from "./data-source";

async function main() {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");

    const schema = await buildSchema({
        resolvers: [CountryResolver],
        validate: false,
    });

    const server = new ApolloServer({
        schema
    });

    const app = express();
    await server.start();  

    app.use(express.json());
    
    app.use('/graphql', expressMiddleware(server, {
        context: async (arg) => {
            return {
              req: arg.req,
              res: arg.res,
            };
          },
    }));

    app.listen(4000, () => {
        console.log(`🚀 Server ready at http://localhost:4000/graphql`);
    });
}

main().catch(error => {
    console.error("Failed to start the server: ", error);
});
