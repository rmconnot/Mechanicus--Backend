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

const dummyQuoteService = [
	{ quoteID: 1, serviceID: 1 },
	{ quoteID: 1, serviceID: 2 },
	{ quoteID: 1, serviceID: 3 },
	{ quoteID: 2, serviceID: 2 },
	{ quoteID: 2, serviceID: 3 },
];

async function main() {
	// Create a new customer
	for (let customer of dummyCustomers) {
		const newCustomer = await prisma.customer.create({ data: customer });
		console.log(
			`Created new customer: ${newCustomer.firstName} (ID: ${newCustomer.id})`
		);
	}

	// Create new services
	for (let item of dummyServices) {
		const newEntry = await prisma.service.create({ data: item });
		console.log(
			`Created new service: ${newEntry.type} (ID: ${newEntry.id})`
		);
	}
	
}

main().catch((e) => console.error(e));
