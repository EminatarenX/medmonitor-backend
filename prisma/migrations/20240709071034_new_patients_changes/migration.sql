/*
  Warnings:

  - You are about to drop the `appointment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `register` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `appointment_doctorId_fkey`;

-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `appointment_hospitalId_fkey`;

-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `appointment_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `register` DROP FOREIGN KEY `register_doctorId_fkey`;

-- DropForeignKey
ALTER TABLE `register` DROP FOREIGN KEY `register_hospitalId_fkey`;

-- DropForeignKey
ALTER TABLE `register` DROP FOREIGN KEY `register_patientId_fkey`;

-- AlterTable
ALTER TABLE `patient` MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'patient';

-- DropTable
DROP TABLE `appointment`;

-- DropTable
DROP TABLE `register`;
