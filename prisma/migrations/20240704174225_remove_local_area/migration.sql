/*
  Warnings:

  - You are about to drop the column `city` on the `doctor` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `doctor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `doctor` DROP COLUMN `city`,
    DROP COLUMN `country`;
