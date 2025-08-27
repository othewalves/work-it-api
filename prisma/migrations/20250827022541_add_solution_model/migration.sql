-- CreateTable
CREATE TABLE "public"."Solution" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "description" TEXT,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "store_id" TEXT NOT NULL,

    CONSTRAINT "Solution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Solution" ADD CONSTRAINT "Solution_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "public"."Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
