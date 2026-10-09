/*
  Warnings:

  - A unique constraint covering the columns `[showtimeId,seatId]` on the table `BookingSeat` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `showtimeId` to the `BookingSeat` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "BookingSeat_bookingId_seatId_key";

-- AlterTable
ALTER TABLE "BookingSeat" ADD COLUMN     "showtimeId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "BookingSeat_bookingId_idx" ON "BookingSeat"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "BookingSeat_showtimeId_seatId_key" ON "BookingSeat"("showtimeId", "seatId");

-- AddForeignKey
ALTER TABLE "BookingSeat" ADD CONSTRAINT "BookingSeat_showtimeId_fkey" FOREIGN KEY ("showtimeId") REFERENCES "Showtime"("id") ON DELETE CASCADE ON UPDATE CASCADE;
