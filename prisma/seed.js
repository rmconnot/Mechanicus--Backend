const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const seedCustomers = [
	{
		firstName: "John",
		lastName: "Smith",
		phone: "123-456-7890",
		email: "example1@email.com",
		password: "password1",
		streetAddress1: "123 Sesame Street",
		streetAddress2: "Apt. 1",
		city: "Ann Arbor",
		state: "MI",
		zipcode: 48105,
		vehicles: {
			create: [
				{
					vin: "1234567890",
					vehicleType: "Sedan",
					year: 2000,
					make: "Ford",
					model: "Focus SE",
					imgUrl:
						"https://file.kelleybluebookimages.com/kbb/base/evox/CP/10858/2017-Ford-Focus-front_10858_032_2400x1800_YZ.png",
				},
			],
		},
	},
	{
		firstName: "Jane",
		lastName: "Doe",
		phone: "123-456-7890",
		email: "example2@email.com",
		password: "password2",
		streetAddress1: "123 Sesame Street",
		streetAddress2: "Apt. 2",
		city: "Ypsilanti",
		state: "MI",
		zipcode: 48197,
		vehicles: {
			create: [
				{
					vin: "0987654321",
					vehicleType: "SUV",
					year: 2010,
					make: "Chevrolet",
					model: "Trailblazer",
					imgUrl:
						"https://www.gannett-cdn.com/presto/2020/07/10/PDTF/76f14475-53f5-4abe-ae0f-a4f4911c8be3-IMG_2481.JPG",
				},
			],
		},
	},
	{
		firstName: "Ben",
		lastName: "James",
		phone: "123-456-7890",
		email: "example3@email.com",
		password: "password3",
		streetAddress1: "123 Sesame Street",
		streetAddress2: "Apt. 3",
		city: "Detroit",
		state: "MI",
		zipcode: 48201,
		vehicles: {
			create: [
				{
					vin: "1122334455",
					vehicleType: "Truck",
					year: 2005,
					make: "Toyota",
					model: "Tundra",
					imgUrl:
						"https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2021/tundra/8W2/1.png",
				},
			],
		},
	},
];

const seedServices = [
	{
		price: 100,
		type: "Vehicle Inspection",
	},
	{
		price: 110,
		type: "Oil change",
	},
	{
		price: 120,
		type: "Brake repair",
	},
	{
		price: 130,
		type: "Battery replacement",
	},
];

const seedMechanics = [
	{
		firstName: "Michael",
		lastName: "Williams",
		phone: "123-456-7890",
	},
	{
		firstName: "Bill",
		lastName: "Davis",
		phone: "123-456-7890",
	},
];

// const seedQuoteServices = [

// 	{ quoteID: 1, serviceID: 1 },
// 	{ quoteID: 1, serviceID: 2 },
// 	{ quoteID: 1, serviceID: 3 },
// 	{ quoteID: 2, serviceID: 2 },
// 	{ quoteID: 2, serviceID: 3 },
// ];

const seedQuotes = [
	{
		createdAt: new Date(),
		status: "confirm",
		mechanicID: 1,
		vehicleID: 1,
		customerID: 1,
	},
	{
		createdAt: new Date(),
		status: "confirm",
		mechanicID: 2,
		vehicleID: 2,
		customerID: 2,
	},
];

async function main() {
	// Create seed customers
	for (let item of seedCustomers) {
		const newRecord = await prisma.customer.create({ data: item });
		console.log(
			`Created new customer: ${newRecord.firstName} (ID: ${newRecord.id})`
		);
	}

	// Create seed services
	for (let item of seedServices) {
		const newEntry = await prisma.service.create({ data: item });
		console.log(`Created new service: ${newEntry.type} (ID: ${newEntry.id})`);
	}

	//Create seed Mechanics
	for (let item of seedMechanics) {
		const newEntry = await prisma.mechanic.create({ data: item });
		console.log(
			`Created new mechanic: ${newEntry.firstName} (ID: ${newEntry.id})`
		);
	}

	//Create seed Quotes
	for (let item of seedQuotes) {
		const newEntry = await prisma.quote.create({ data: item });
		console.log(
			`Created new quote: ${newEntry.createdAt} (ID: ${newEntry.id})`
		);
	}

	//Create seed QuoteServices
	// for (let item of seedQuoteServices) {
	// 	const newEntry = await prisma.quoteService.create({ data: item });
	// 	console.log(
	// 		`Created new QuoteService: (ID: ${newEntry.id})`
	// 	);
	// }
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
