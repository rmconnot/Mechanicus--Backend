/*
  Warnings:

  - You are about to drop the `QuoteService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "QuoteService" DROP CONSTRAINT "QuoteService_quoteID_fkey";

-- DropForeignKey
ALTER TABLE "QuoteService" DROP CONSTRAINT "QuoteService_serviceID_fkey";

-- DropTable
DROP TABLE "QuoteService";

-- CreateTable
CREATE TABLE "_QuoteToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_QuoteToService_AB_unique" ON "_QuoteToService"("A", "B");

-- CreateIndex
CREATE INDEX "_QuoteToService_B_index" ON "_QuoteToService"("B");

-- AddForeignKey
ALTER TABLE "_QuoteToService" ADD FOREIGN KEY ("A") REFERENCES "Quote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_QuoteToService" ADD FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
