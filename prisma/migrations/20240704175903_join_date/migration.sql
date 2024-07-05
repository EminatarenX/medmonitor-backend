/*
  Warnings:

  - You are about to drop the column `joinBirth` on the `doctor` table. All the data in the column will be lost.
  - Added the required column `joinDate` to the `doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctor` DROP COLUMN `joinBirth`,
    ADD COLUMN `joinDate` DATETIME(3) NOT NULL;
