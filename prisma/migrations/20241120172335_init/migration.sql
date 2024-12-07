/*
  Warnings:

  - Changed the type of `amount` on the `sales` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `quantity` on the `sales` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `rate` on the `sales` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "sales" DROP COLUMN "amount",
ADD COLUMN     "amount" MONEY NOT NULL,
DROP COLUMN "quantity",
ADD COLUMN     "quantity" MONEY NOT NULL,
DROP COLUMN "rate",
ADD COLUMN     "rate" MONEY NOT NULL;
