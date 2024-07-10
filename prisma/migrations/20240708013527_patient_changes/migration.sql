/*
  Warnings:

  - You are about to drop the column `birthDay` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `patient` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `patient` table. All the data in the column will be lost.
  - Added the required column `address` to the `patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthDate` to the `patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `patient` DROP COLUMN `birthDay`,
    DROP COLUMN `city`,
    DROP COLUMN `country`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `birthDate` DATETIME(3) NOT NULL,
    ADD COLUMN `gender` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NULL;
