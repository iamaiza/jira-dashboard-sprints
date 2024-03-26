require("dotenv").config;
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { PrismaClient } = require("@prisma/client");
const User = require("./resolvers/User");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Task = require("./resolvers/Task");
const Sprint = require("./resolvers/Sprint");
const Comment = require("./resolvers/Comment");

const startServer = async() => {
    const app = express();
    app.use(express.json());
    app.use(cors({
        origin: "https://localhost:3000",
        credentials: true
    }))

    const schema = fs.readFileSync("./schema.graphql", "utf8");
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers: { Query, Mutation, Task, Sprint, User, Comment }
    });

    const { url } = await startStandaloneServer(server, {
        listen: 4000,
        context: async({ req, res }) => {
            const prisma = new PrismaClient();
            return { req, res, prisma }
        }
    });
    console.log(`Server is ready at ${url}`);
} 

startServer().catch(err => console.log(err.message))