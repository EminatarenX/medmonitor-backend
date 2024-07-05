/*
  Warnings:

  - Added the required column `area` to the `doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctor` ADD COLUMN `area` VARCHAR(191) NOT NULL;
