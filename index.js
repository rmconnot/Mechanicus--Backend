const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");
const { PrismaClient } = require("@prisma/client");
const { resolvers } = require("./resolvers.js");
const { typeDefs } = require("./typeDefs.js");

const app = express();
const prisma = new PrismaClient();

console.log("resolvers: ", resolvers);
console.log("typeDefs: ", typeDefs);

var schema = makeExecutableSchema({ typeDefs, resolvers });

app
	.use(express.static(path.join(__dirname, "public")))
	.use(
		"/graphql",
		graphqlHTTP({
			schema: schema,
			graphiql: true,
			context: {
				prisma,
			},
		})
	)
	.listen(PORT, () => console.log(`Listening on ${PORT}`));
