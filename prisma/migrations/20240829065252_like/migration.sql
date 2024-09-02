/*
  Warnings:

  - The primary key for the `Like` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,postId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Like" DROP CONSTRAINT "Like_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Like_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_postId_key" ON "Like"("userId", "postId");
