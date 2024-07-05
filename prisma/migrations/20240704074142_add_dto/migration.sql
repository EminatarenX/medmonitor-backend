/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `doctor` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `doctor` ADD COLUMN `phone` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `doctor_phone_key` ON `doctor`(`phone`);
