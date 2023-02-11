-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mailingAddress" TEXT NOT NULL,
    "GPA" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
