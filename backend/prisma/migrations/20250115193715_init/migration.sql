-- CreateTable
CREATE TABLE "user" (
    "pk_user" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "best_score" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("pk_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_user_name_key" ON "user"("user_name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
