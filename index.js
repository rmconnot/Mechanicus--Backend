const { resolvers } = require("./resolvers.js");
const { typeDefs } = require("./typeDefs.js");

const express = require("express");
const http = require("http");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { ApolloServer } = require("apollo-server-express");

// const PORT = process.env.PORT || 4000;

// const server = new ApolloServer({
// 	typeDefs,
// 	resolvers,
// 	subscriptions: {
// 		path: "/subscriptions",
// 		onConnect: (connectionParams, webSocket, context) => {
// 			console.log("Client connected");
// 		},
// 		onDisconnect: (webSocket, context) => {
// 			console.log("Client disconnected");
// 		},
// 	},
// 	context: {
// 		prisma,
// 	},
// });

// server.listen().then(({ url }) => {
// 	console.log(
// 		`Subscription endpoint ready at ws://localhost:${PORT}${
// 			server.subscriptionsPath
// 		}`
// 	);
// });

async function startApolloServer() {
	const PORT = process.env.PORT || 4000;
	const app = express();
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
		context: { prisma },
	});
	await server.start();
	server.applyMiddleware({ app });

	const httpServer = http.createServer(app);
	server.installSubscriptionHandlers(httpServer);
	// Make sure to call listen on httpServer, NOT on app.
	await new Promise((resolve) => httpServer.listen(PORT, resolve));
	console.log(
		`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
	);
	console.log(
		`🚀 Subscriptions ready at ws://localhost:${PORT}${
			server.subscriptionsPath
		}`
	);
	return { server, app, httpServer };
}

startApolloServer();

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
