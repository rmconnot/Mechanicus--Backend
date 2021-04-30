const { PrismaClient, Prisma } = require("@prisma/client");
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
				{
					vin: "43829651765761567",
					vehicleType: "SUV",
					year: 2019,
					make: "Chevrolet",
					model: "Trailblazer",
					imgUrl:
						"https://www.gannett-cdn.com/presto/2020/07/10/PDTF/76f14475-53f5-4abe-ae0f-a4f4911c8be3-IMG_2481.JPG",
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

const seedParts = [
	//1
	{
		type: "Synthetic oil",
		price: 30.0,
	},
	//2
	{
		type: "Conventional oil",
		price: 22.0,
	},
	//3
	{
		type: "Oil filter",
		price: 8.0,
	},
	//4
	{
		type: "Brake pad front",
		price: 39.0,
	},
	//5
	{
		type: "Brake pad rear",
		price: 39.0,
	},
	//6
	{
		type: "Battery",
		price: 156.0,
	},
];
const labor_rate = 95;
const seedServices = [
	{
		type: "Brake pad replacement",
		laborTime: 1.5,
		price: 1.5*labor_rate,
		parts: { connect: [{ id: 4 }, { id: 5 }] },
	},
	{
		type: "Brake pad and rotor replacement",
		laborTime: 2.5,
		price: 2.5*labor_rate,
		parts: { connect: [{ id: 4 }, { id: 5 }] },
	},
	{
		type: "Oil change",
		laborTime: 0.5,
		price: 0.5*labor_rate,
		parts: { connect: [{ id: 1 }, { id: 2 }, { id: 3 }] },
	},
	{
		type: "Inspection",
		price: 50.0,
	},
	{
		type: "Battery jump service",
		price: 50.0,
	},
	{
		type: "Battery replacement",
		laborTime: 0.5,
		price: 0.5*labor_rate,
		parts: { connect: { id: 6 } },
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

const seedDate = new Date();
const seedQuotes = [
	{
		createdAt: seedDate,
		status: "confirmed",
		vehicle: { connect: { id: 1 } },
		customer: { connect: { id: 1 } },
		billItems: {
			create: [
				{
					serviceID: 1,
					cost: 1.5*95,
				},{
					serviceID: 3,
					cost: 0.5*95,
				},{
					partID: 1,
					cost: 30.0,
				},{
					partID: 3,
					cost: 10.0,
				},{
					partID: 5,
					cost: 42.0,
				},
			],
		},
		costEstimate: 288.32
	},
	{
		createdAt: seedDate,
		status: "confirm",
		vehicle: { connect: { id: 1 } },
		customer: { connect: { id: 1 } },
		billItems: {
			create: [
				{
					serviceID: 4,
					cost: 50.0,
				},
			],
		},
		costEstimate: 53.0
	},
	{
		createdAt: seedDate,
		status: "confirm",
		vehicle: { connect: { id: 2 } },
		customer: { connect: { id: 2 } },
		billItems: {
			create: [
				{
					serviceID: 1,
					cost: 1.5*95,
				},{
					serviceID: 3,
					cost: 0.5*95,
				},{
					partID: 1,
					cost: 30.0,
				},{
					partID: 3,
					cost: 10.0,
				},{
					partID: 5,
					cost: 42.0,
				},
			],
		},
		costEstimate: 288.32
	},
];

const seedAppointments = [
	{
		customerID: 1,
		quoteID: 1,
		mechanicID: 1,
		status: "approved",
		scheduleDate: '04/05/2021',
		address: "123 Sesame Street",
	},
	{
		customerID: 2,
		quoteID: 2,
		mechanicID: 2,
		status: "approved",
		scheduleDate: '04/06/2021',
		address: "123 Sesame Street",
	},
	{
		customerID: 1,
		quoteID: 3,
		mechanicID: 1,
		status: "completed",
		scheduleDate: '04/02/2021',
		address: "123 Sesame Street",
	},
]

const seedTransactions = [{}];

async function main() {
	// Create seed customers
	for (let item of seedCustomers) {
		const newRecord = await prisma.customer.create({ data: item });
		console.log(
			`Created new customer: ${newRecord.firstName} (ID: ${newRecord.id})`
		);
	}

	// Create seed parts
	for (let item of seedParts) {
		const newEntry = await prisma.part.create({ data: item });
		console.log(`Created new part: ${newEntry.type} (ID: ${newEntry.id})`);
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
		const newEntry = await prisma.quote.create({
			data: item,
		});
		console.log(
			`Created new quote: ${newEntry.createdAt} (ID: ${newEntry.id})`
		);
	}

	// Create seed appointments
	for (let item of seedAppointments) {
		const newEntry = await prisma.appointment.create({ data: item });
		console.log(
			`Created new appointment(ID: ${newEntry.id}): customer ${
				newEntry.customerID
			} with quote ${newEntry.quoteID}`
		);
	}

}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
