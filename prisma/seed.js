const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const dummyCustomers = [
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

const dummyServices = [
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

const dummyMechanician = [
	{
		firstName: 'Michael',
		lastName:'Williams',
		phone: "123-456-7890",
	},
	{
		firstName: 'Bill',
		lastName:'Davis',
		phone: "123-456-7890",
	}
]

const dummyQuoteService = [
	{ quoteID: 1, serviceID: 1 },
	{ quoteID: 1, serviceID: 2 },
	{ quoteID: 1, serviceID: 3 },
	{ quoteID: 2, serviceID: 2 },
	{ quoteID: 2, serviceID: 3 },
];

const dummyQuotes = [
	{
		scheduleDate: "03/04/2021", //need to combine with Shuyang's calendar picker
		status: "confirm",
		mechanicianID: 1,
		vehicleID: 1,
		customerID: 1,
	},

	{
		scheduleDate: "05/04/2021", //need to combine with Shuyang's calendar picker
		status: "confirm",
		mechanicianID: 2,
		vehicleID: 2,
		customerID: 2,
	},
]

async function main() {
	// Create a new customer
	for (let customer of dummyCustomers) {
		const newCustomer = await prisma.customer.create({ data: customer });
		console.log(
			`Created new customer: ${newCustomer.firstName} (ID: ${newCustomer.id})`
		);
	}

	for (let service of dummyServices) {
		const newService = await prisma.service.create({ data: service });
		console.log(
			`Created new service: ${newService.type} (ID: ${newService.id})`
		);
	}
	for (let mechanician of dummyMechanician) {
		const newMechanician = await prisma.mechanician.create({ data: mechanician });
	}
	for (let quote of dummyQuotes) {
		const newQuote = await prisma.quote.create({ data: quote });
	}
	for (let quoteService of dummyQuoteService) {
		const newQuoteService = await prisma.quoteService.create({ data: quoteService });
	}
}


main().catch((e) => console.error(e));