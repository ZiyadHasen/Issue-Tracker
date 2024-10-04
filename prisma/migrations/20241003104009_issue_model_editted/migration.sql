/*
  Warnings:

  - You are about to drop the column `email_verified` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `issue` ADD COLUMN `assignedToUserId` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `email_verified`,
    ADD COLUMN `emailVerified` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
