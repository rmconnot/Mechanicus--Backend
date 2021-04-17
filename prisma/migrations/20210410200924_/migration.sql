/*
  Warnings:

  - You are about to drop the column `scheduleDate` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the column `mechanicianID` on the `Quote` table. All the data in the column will be lost.
  - You are about to drop the `Mechanician` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuoteService` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "QuoteService" DROP CONSTRAINT "QuoteService_quoteID_fkey";

-- DropForeignKey
ALTER TABLE "QuoteService" DROP CONSTRAINT "QuoteService_serviceID_fkey";

-- DropForeignKey
ALTER TABLE "Quote" DROP CONSTRAINT "Quote_mechanicianID_fkey";

-- AlterTable
ALTER TABLE "Quote" DROP COLUMN "scheduleDate",
DROP COLUMN "mechanicianID",
ADD COLUMN     "mechanicID" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "costEstimate" DOUBLE PRECISION,
ADD COLUMN     "description" TEXT,
ALTER COLUMN "status" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "quoteID" INTEGER;

-- DropTable
DROP TABLE "Mechanician";

-- DropTable
DROP TABLE "QuoteService";

-- CreateTable
CREATE TABLE "Mechanic" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "streetAddress1" TEXT,
    "streetAddress2" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipcode" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "quoteID" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "customerID" INTEGER NOT NULL,
    "scheduleDate" TEXT NOT NULL,
    "quoteID" INTEGER,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mechanic.email_unique" ON "Mechanic"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_quoteID_unique" ON "Transaction"("quoteID");

-- CreateIndex
CREATE UNIQUE INDEX "Appointment_quoteID_unique" ON "Appointment"("quoteID");

-- CreateIndex
CREATE UNIQUE INDEX "Customer.email_unique" ON "Customer"("email");

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY ("quoteID") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD FOREIGN KEY ("customerID") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD FOREIGN KEY ("quoteID") REFERENCES "Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD FOREIGN KEY ("mechanicID") REFERENCES "Mechanic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD FOREIGN KEY ("quoteID") REFERENCES "Quote"("id") ON DELETE SET NULL ON UPDATE CASCADE;
