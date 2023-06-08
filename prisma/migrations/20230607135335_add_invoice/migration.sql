-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Paid', 'Pending');

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "billFromName" TEXT NOT NULL,
    "billFromEmail" TEXT NOT NULL,
    "billFromCity" TEXT NOT NULL,
    "billFromAddress" TEXT NOT NULL,
    "billFromCountry" TEXT NOT NULL,
    "billToName" TEXT NOT NULL,
    "billToEmail" TEXT NOT NULL,
    "billToCity" TEXT NOT NULL,
    "billToAddress" TEXT NOT NULL,
    "billToCountry" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
