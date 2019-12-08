import express from "express";
import compression from "compression";
import cors from "cors";
import schema from "./schema";
import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";

import environments from "./config/environments";
import Database from './config/database';

if (process.env.NODE_EV !== "production") {
  const envs = environments;
  console.log(envs);
}

async function init() {
  const app = express();

  app.use("*", cors());

  app.use(compression());

  const database = new Database();
  const db = await database.init();

  const context: any = async({req, connection}: any) => {
    const token = req ? req.headers.authorization : connection.authorization;
    return { db, token };
  }

  const server = new ApolloServer({
    schema,
    context,
    introspection: true
  });

  server.applyMiddleware({ app });

  // app.use('/', graphqlHTTP({
  //     schema,
  //     graphiql: true
  // }));

  const PORT = 5300;

  const httpServer = createServer(app);

  httpServer.listen({ port: PORT }, () =>
    console.log(`Hola mundo API GraphQL http://localhost:${PORT}/graphql`)
  );
}

init();