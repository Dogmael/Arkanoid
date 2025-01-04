-- CreateTable
CREATE TABLE "User" (
    "pk_user" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "bestScore" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("pk_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
