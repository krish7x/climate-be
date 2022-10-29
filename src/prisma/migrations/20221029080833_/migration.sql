/*
  Warnings:

  - You are about to drop the column `adminId` on the `SiteMapping` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `SiteMapping` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SiteMapping" DROP CONSTRAINT "SiteMapping_adminId_fkey";

-- AlterTable
ALTER TABLE "SiteMapping" DROP COLUMN "adminId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Admin";

-- AddForeignKey
ALTER TABLE "SiteMapping" ADD CONSTRAINT "SiteMapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
