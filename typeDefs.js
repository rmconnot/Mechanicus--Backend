exports.typeDefs = `
type Query {
    customers: [Customer!]!
    services(servicesList:[Int]): [Service!]!
    vehicle(id:Int!): Vehicle!
    vehicles(customerID:Int!): [Vehicle!]!
    quotes(customerID:Int!): [Quote!]! 
    customer(id:Int, email:String, password:String): Customer
    appointments(customerID:Int!): [Appointment!]!
    appointment(appointmentID:Int!): Appointment!
    customerProfile(id:Int): Customer
}
type Subscription {
    newCustomer: Customer
    newAppointment(customerID:Int!): Appointment
    newQuote(customerID:Int!): Quote
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
    services: [Service]
}


type Transaction {
    id: Int 
    quoteID: Int
    service: String
    cost: Float
    dateTime: String
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
type Service {
    id: Int
    price: Float
    type: String
    quotes: [Quote]
}
input ServiceInput {
    customerID: Int
    price: Float
    type: String
    quotes: [QuoteInput]
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
    scheduleDate: String
    status: String
    services: [ServiceInput]
    mechanicID: Int
    vehicleID: Int
    customerID: Int
}

input QuoteServiceInput {
    id: Int!
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
        vehicles: [VehicleInput]
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
        services: [Int]!
        ): Quote
}`;
