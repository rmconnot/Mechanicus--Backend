exports.typeDefs = `
type Query {
    customers: [Customer!]!
    vehicle(customerID:Int!): [Vehicle!]!
    quote(customerID:Int!): [Quote!]! 
    customer(id:Int, email:String, password:String): Customer
    appointments(customerID:Int!): [Appointment!]!
}

type Subscription {
    newCustomer: Customer
    newAppointment(customerID:Int!): Appointment
}

type Quote {
    id: Int 
    transaction: Transaction
    customerID: Int
    mechanicID: Int
    vehicleID: Int
    dateTime: String
    costEstimate: Float
    description: String
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
    vehicles: [VehicleInput]
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

type Quote {
    customerID: Int
    scheduleDate: String
    status: String
    mechanicianID: Int
    mechanician: Mechanician
    vehicleID: Int
    vehicle: Vehicle
    services: [QuoteService]
}

input QuoteInput {
    scheduleDate: String
    status: String
    services: [QuoteServiceInput]
    mechanicianID: Int
    vehicleID: Int
    customerID: Int
}

type QuoteService {
    id: Int
    serviceID: Int
    quoteID: Int
    service: Service
}

input QuoteServiceInput {
    customerID: Int
    serviceID: Int
    quoteID: Int
}

type Mechanician {
    id:Int
    firstName: String
    lastName: String
    phone: String
    quotes: [Quote]
}

input MechanicianInput {
    customerID: Int
    firstName: String
    lastName: String
    phone: String
    quotes: [QuoteInput]
}

type Appointment {
    id: Int
    customerID: Int
    dateTime: String
    vehicle: Vehicle
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
        dateTime: String
    ): Appointment
}`;
