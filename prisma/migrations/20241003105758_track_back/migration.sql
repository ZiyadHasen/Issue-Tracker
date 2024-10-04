/*
  Warnings:

  - You are about to drop the column `assignedToUserId` on the `issue` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `users` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `Issue_assignedToUserId_fkey`;

-- AlterTable
ALTER TABLE `issue` DROP COLUMN `assignedToUserId`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `emailVerified`,
    ADD COLUMN `email_verified` DATETIME(3) NULL;
