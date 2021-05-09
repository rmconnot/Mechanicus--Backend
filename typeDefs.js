exports.typeDefs = `
type Query {
    customers: [Customer!]!
    services(servicesList:[Int]): [Service!]!
    parts(partsList:[Int]): [Part!]!
    vehicle(id:Int!): Vehicle!
    vehicles(customerID:Int!): [Vehicle!]!
    quotes(customerID:Int!): [Quote!]! 
    customer(id:Int, email:String, password:String): Customer
    appointments(customerID:Int!): [Appointment!]!
    appointment(id:Int!): Appointment!
    customerProfile(id:Int): Customer
}
type Subscription {
    newCustomer: Customer
    newAppointment(customerID:Int!): Appointment
    newQuote(customerID:Int!): Quote
    newVehicle(customerID: Int!): Vehicle
}

type Quote {
    id: Int 
    transaction: Transaction
    customerID: Int
    vehicleID: Int
    vehicle: Vehicle
    createdAt: String
    status: String
    costEstimate: Float
    description: String
    billItems: [BillItem]
}

type Transaction {
    id: Int 
    appointment: Appointment
    appointmentID: Int
    cost: Float
    createdAt: String
}

type Customer {
    id: Int
    firstName: String
    lastName: String
    phone: String
    email: String
    password: String
    streetAddress1: String
    streetAddress2: String
    city: String
    state: String
    zipcode: Int
    vehicles: [Vehicle]
    quotes: [Quote]
    appointments: [Appointment]
}

input CustomerInput {
    firstName: String
    lastName: String
    phone: String
    email: String
    password: String
    streetAddress1: String
    streetAddress2: String
    city: String
    state: String
    zipcode: Int
}

input VehicleInput {
    customerID: Int  
    vin: String
    vehicleType: String
    year: Int
    make: String
    model: String
    imgUrl: String
}

type Vehicle {
    id: Int
    customerID: Int  
    vin: String
    vehicleType: String
    year: Int
    make: String
    model: String
    imgUrl: String
}

type Part {
    id: Int
    price: Float
    type: String
    services: [Service]
}

input PartInput {
    price: Float
    type: String
    services: [ServiceInput]
}

type Service {
    id: Int
    price: Float
    type: String
    laborTime: Float
    parts: [Part]
}

input ServiceInput {
    price: Float
    type: String
    laborTime: Float
    quotes: [QuoteInput]
    parts: [PartInput]
}

type BillItem {
    id: Int
    service: Service
    serviceID: Int
    part: Part
    partID: Int
    cost: Float
    quote: Quote
    quoteID: Int
}

input BillItemInput {
    serviceID: Int
    partID: Int
    cost: Float
    quoteID: Int
}

type Mechanic {
    id:Int
    firstName: String
    lastName: String
    phone: String
}

input MechanicInput {
    firstName: String
    lastName: String
    phone: String
    quotes: [QuoteInput]
}

input QuoteInput {
    createdAt: String
    status: String
    billItems: [BillItemInput]
    mechanicID: Int
    vehicleID: Int
    customerID: Int
}


type Appointment {
    id: Int
    customer: Customer
    customerID: Int
    scheduleDate: String
    quote: Quote
    quoteID: Int
    status: String
    mechanic: Mechanic
    mechanicID: Int
    address: String
    finalCost: String
}
type Mutation {
    createCustomer(
        firstName: String
        lastName: String
        phone: String!
        email: String!
        password: String!
        streetAddress1: String
        streetAddress2: String
        city: String
        state: String
        zipcode: Int
    ): Customer,
    updateCustomer(
        id: Int!,
        firstName: String
        lastName: String
        phone: String
        email: String
        password: String
        streetAddress1: String
        streetAddress2: String
        city: String
        state: String
        zipcode: Int
    ): Customer,
    createAppointment(
        address: String!
        customerID: Int!
        quoteID: Int!
        scheduleDate: String!
        status: String!
    ): Appointment,
    createQuote(
        costEstimate: Float!
        customerID: Int!
		status: String!
        vehicleID: Int!
        billItems: [BillItemInput]
        ): Quote,
    createVehicle(
        customerID: Int!
        vin: String!
        vehicleType: String!
        year: Int!
        make: String!
        model: String!
    ): Vehicle,
    updateAppointment(
        id: Int!
        status: String
    ): Appointment,
    createTransaction(
        quoteID: Int!
        cost: Float!
    ): Transaction
}`;
