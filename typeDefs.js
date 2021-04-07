exports.typeDefs = `
type Query {
    customers: [Customer!]!
    customer(id:Int!): Customer!
    vehicles(customerID:Int!): [Vehicle!]!
    services: [Service!]!
    quote(customerID:Int!): [Quote!]!
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

input VehicleInput {
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
    price: Float
    type: String
    quotes: [QuoteServiceInput]
}

type Quote {
    id: Int
    scheduleDate: String
    status: String
    services: [QuoteService]
    mechanic: Mechanic!
    mechanicID: Int!
    vehicle: Vehicle!
    vehicleID: Int!
    customerID: Int
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
    serviceID: Int
    quoteID: Int
}

type Mechanic {
    id:Int
    firstName: String
    lastName: String
    phone: String
    quotes: [Quote]
}

input MechanicInput {
    firstName: String
    lastName: String
    phone: String
    quotes: [QuoteInput]
}

type Mutation {
    createCustomer(
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
    ): Customer
}`;
