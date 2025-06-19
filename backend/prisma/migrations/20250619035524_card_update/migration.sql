/*
  Warnings:

  - You are about to drop the column `description` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `message` on the `Card` table. All the data in the column will be lost.
  - Added the required column `author` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gif` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "description",
DROP COLUMN "message",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "gif" TEXT NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL;
