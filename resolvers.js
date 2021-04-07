const newCustomerSub = "NEW_CUSTOMER";
const newAppointmentsSub = "NEW_APPOINTMENTS";
const { PubSub } = require("apollo-server");

const pubsub = new PubSub();

const { withFilter } = require("apollo-server");

exports.resolvers = {
	Query: {
		customers: (root, args, context, info) => {
			return context.prisma.customer.findMany();
		},

		customer: async (root, args, context, info) => {
			console.log(args);

			if (args.id) {
				return context.prisma.customer.findUnique({
					where: {
						id: args.id,
					},
					include: {
						vehicles: true,
					},
				});
			}

			if (args.email && args.password) {
				try {
					const existingCustomer = await context.prisma.customer.findUnique({
						where: {
							email: args.email,
						},
					});
					console.log(existingCustomer);

					if (existingCustomer.password === args.password) {
						return existingCustomer;
					} else {
						throw new Error("Invalid login credentials");
					}
				} catch (e) {
					console.error(e);
					throw new Error("Invalid login credentials");
				}
			}
		},

		appointments: (root, args, context, info) => {
			return context.prisma.appointment.findMany({
				where: {
					customerID: args.customerID,
				},
				include: {
					vehicle: true,
				},
			});
		},

		vehicle: (root, args, context, info) => {
			return context.prisma.vehicle.findMany({
				where: {
					id: args.customerID,
				},
			});
		},

		quote: (root, args, context, info) => {
			return context.prisma.quote.findMany({
				where: {
					id: args.customerID,
				},
				include: {
					mechanician: true,
					vehicle: true,
					services: {
						select: { service: true }
					}
				},
			});
		},
	},
	Mutation: {
		createCustomer: async (root, args, context) => {
			console.log("creating customer");
			const existingCustomer = await context.prisma.customer.findUnique({
				where: {
					email: args.email,
				},
			});

			if (existingCustomer) {
				throw new Error(
					`The email ${args.email} is already attached to an account`
				);
			}

			try {
				pubsub.publish(newCustomerSub, {
					newCustomer: {
						phone: args.phone,
						email: args.email,
						password: args.password,
					},
				});
			} catch (e) {
				console.error(e);
			}

			return context.prisma.customer.create({
				data: {
					firstName: args.firstName,
					lastName: args.lastName,
					phone: args.phone,
					email: args.email,
					password: args.password,
					streetAddress1: args.streetAddress1,
					streetAddress2: args.streetAddress2,
					city: args.city,
					state: args.state,
					zipcode: args.zipcode,

					vehicles: [
						{
							vin: args.vehicles[0].vin,
							vehicleType: args.vehicles[0].vehicleType,
							year: args.vehicles[0].year,
							make: args.vehicles[0].make,
							model: args.vehicles[0].model,
							imgUrl: args.vehicles[0].imgUrl,
						},
					],
				},
			});
		},

		updateCustomer: (root, args, context) => {
			return context.prisma.customer.update({
				where: {
					id: args.id,
				},
				data: {
					firstName: args.firstName,
					lastName: args.lastName,
					phone: args.phone,
					email: args.email,
					password: args.password,
					streetAddress1: args.streetAddress1,
					streetAddress2: args.streetAddress2,
					city: args.city,
					state: args.state,
					zipcode: args.zipcode,

					vehicles: {
						create: [
							{
								vin: args.vehicles[0].vin,
								vehicleType: args.vehicles[0].vehicleType,
								year: args.vehicles[0].year,
								make: args.vehicles[0].make,
								model: args.vehicles[0].model,
								imgUrl: args.vehicles[0].imgUrl,
							},
						],
					},
				},
			});
		},

		createAppointment: async (root, args, context) => {
			const newAppointment = await context.prisma.appointment.create({
				data: {
					customerID: args.customerID,
					vehicleID: args.vehicleID,
					// mechanicID: args.mechanicID,
					dateTime: args.dateTime,
				},
			});

			// console.log("New Appointment: ", newAppointment);

			try {
				const appointmentVehicle = await context.prisma.vehicle.findUnique({
					where: {
						id: args.vehicleID,
					},
				});
				newAppointment.vehicle = appointmentVehicle;
				pubsub.publish(newAppointmentsSub, {
					newAppointment: newAppointment,
				});
			} catch (e) {
				console.error(e);
			}

			return newAppointment;
		},
	},
	Subscription: {
		// newCustomer: {
		// 	subscribe: (root, args, context) => {
		// 		console.log("subscribing");
		// 		return pubsub.asyncIterator(newCustomerSub);
		// 	},
		// },
		newAppointment: {
			subscribe: withFilter(
				() => pubsub.asyncIterator(newAppointmentsSub),
				(payload, variables) => {
					return payload.newAppointment.customerID === variables.customerID;
				}
			),
		},
	},
};