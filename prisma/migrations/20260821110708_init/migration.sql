-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Test_description_key" ON "Test"("description");
