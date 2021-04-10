exports.typeDefs = `
type Query {
    customers: [Customer!]!
    services: [Service!]!
    vehicle(id:Int!): Vehicle!
    vehicles(customerID:Int!): [Vehicle!]!
    quote(customerID:Int!): [Quote!]! 
    customer(id:Int, email:String, password:String): Customer
    appointments(customerID:Int!): [Appointment!]!
}

type Subscription {
    newCustomer: Customer
    newAppointment(customerID:Int!): Appointment
    newQuote(customerID:Int!): Appointment
}

type Quote {
    id: Int 
    transaction: Transaction
    customerID: Int
    mechanic: Mechanic
    mechanicID: Int
    vehicleID: Int
    vehicle: Vehicle
    quoteDate: String
    status: String
    costEstimate: Float
    description: String
    services: [QuoteService]
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
    quotes: [QuoteService]
}

input ServiceInput {
    customerID: Int
    price: Float
    type: String
    quotes: [QuoteServiceInput]
}

type Mechanic {
    id:Int
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
    services: [QuoteServiceInput]
    mechanicID: Int
    vehicleID: Int
    customerID: Int
}

type QuoteService {
    id: Int
    service: Service!
    serviceID: Int!
    quote: Quote!
    quoteID: Int!
}

input QuoteServiceInput {
    customerID: Int
    serviceID: Int
    quoteID: Int
}

type Appointment {
    id: Int
    customerID: Int
    quoteID: Int
    scheduleDate: String
    dateTime: String
    quote: Quote
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
        customerID: Int!
        vehicleID: Int!
    ): Appointment
}`;
