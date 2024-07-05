/*
  Warnings:

  - Added the required column `gender` to the `doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joinBirth` to the `doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctor` ADD COLUMN `education` VARCHAR(191) NULL,
    ADD COLUMN `experience` VARCHAR(191) NULL,
    ADD COLUMN `gender` VARCHAR(191) NOT NULL,
    ADD COLUMN `joinBirth` DATETIME(3) NOT NULL;
