/*
  Warnings:

  - You are about to drop the `_QuoteToService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_QuoteToService" DROP CONSTRAINT "_QuoteToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_QuoteToService" DROP CONSTRAINT "_QuoteToService_B_fkey";

-- DropTable
DROP TABLE "_QuoteToService";

-- CreateTable
CREATE TABLE "QuoteService" (
    "id" SERIAL NOT NULL,
    "serviceID" INTEGER NOT NULL,
    "quoteID" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuoteService" ADD FOREIGN KEY ("serviceID") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuoteService" ADD FOREIGN KEY ("quoteID") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;
