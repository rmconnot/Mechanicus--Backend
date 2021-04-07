-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "streetAddress1" TEXT,
    "streetAddress2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipcode" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "customerID" INTEGER NOT NULL,
    "vin" TEXT NOT NULL,
    "vehicleType" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "imgUrl" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "type" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quote" (
    "id" SERIAL NOT NULL,
    "scheduleDate" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "mechanicianID" INTEGER NOT NULL,
    "vehicleID" INTEGER NOT NULL,
    "customerID" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuoteService" (
    "id" SERIAL NOT NULL,
    "serviceID" INTEGER NOT NULL,
    "quoteID" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mechanician" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "phone" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vehicle" ADD FOREIGN KEY ("customerID") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD FOREIGN KEY ("mechanicianID") REFERENCES "Mechanician"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD FOREIGN KEY ("vehicleID") REFERENCES "Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD FOREIGN KEY ("customerID") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteService" ADD FOREIGN KEY ("serviceID") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteService" ADD FOREIGN KEY ("quoteID") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
