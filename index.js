const { resolvers } = require("./resolvers.js");
const { typeDefs } = require("./typeDefs.js");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { ApolloServer } = require("apollo-server");

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
	typeDefs,
	resolvers,
	subscriptions: {
		path: "/subscriptions",
		onConnect: (connectionParams, webSocket, context) => {
			console.log("Client connected");
		},
		onDisconnect: (webSocket, context) => {
			console.log("Client disconnected");
		},
	},
	context: {
		prisma,
	},
});

server.listen().then(({ url }) => {
	console.log(
		`Subscription endpoint ready at ws://localhost:${PORT}${
			server.subscriptionsPath
		}`
	);
});

/////////////////// ********** ------------  ************* /////////////////////

// const path = require("path");
// const { execute, subscribe } = require("graphql");
// const { createServer } = require("http");
// const { SubscriptionServer } = require("subscriptions-transport-ws");
// const { PubSub } = require("graphql-subscriptions")
// const { graphqlHTTP } = require("express-graphql");
// const { makeExecutableSchema } = require("graphql-tools");
// const express = require("express");

// var schema = makeExecutableSchema({ typeDefs, resolvers });
// var app = express();

// app.use(
// 	"/graphql",
// 	graphqlHTTP({
// 		schema: schema,
// 		graphiql: { subscriptionEndpoint: `ws://localhost:${PORT}/subscriptions` },
// 		context: {
// 			prisma,
// 			pubsub,
// 		},
// 	})
// );

// const ws = createServer(app);

// ws.listen(PORT, () => {
// 	// Set up the WebSocket for handling GraphQL subscriptions.
// 	new SubscriptionServer(
// 		{
// 			execute,
// 			subscribe,
// 			schema
// 		},
// 		{
// 			server: ws,
// 			path: "/subscriptions",
// 		}
// 	);
// });