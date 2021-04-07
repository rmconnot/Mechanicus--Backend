exports.resolvers = {
	Query: {
		customers: (root, args, context, info) => {
			return context.prisma.customer.findMany();
		},

		customer: (root, args, context, info) => {
			return context.prisma.customer.findUnique({
				where: {
					id: args.id,
				},
				include: {
					vehicles: true,
				},
			});
		},

		customerByEmail: (root, args, context, info) => {
			return context.prisma.customer.findUnique({
				where: {
					email: args.email,
				},
			});
		}
	},
	Mutation: {
		createCustomer: async (root, args, context) => {
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

			return context.prisma.customer.create({
				data: {
					phone: args.phone,
					email: args.email,
					password: args.password,
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
	},
};
