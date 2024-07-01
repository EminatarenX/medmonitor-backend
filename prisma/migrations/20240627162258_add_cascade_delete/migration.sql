-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `appointment_doctorId_fkey`;

-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `appointment_hospitalId_fkey`;

-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `appointment_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `doctor` DROP FOREIGN KEY `doctor_hospitalId_fkey`;

-- DropForeignKey
ALTER TABLE `hospitalInformation` DROP FOREIGN KEY `hospitalInformation_hospitalId_fkey`;

-- DropForeignKey
ALTER TABLE `monitor` DROP FOREIGN KEY `monitor_patientId_fkey`;

-- DropForeignKey
ALTER TABLE `patient` DROP FOREIGN KEY `patient_doctorId_fkey`;

-- DropForeignKey
ALTER TABLE `patient` DROP FOREIGN KEY `patient_hospitalId_fkey`;

-- DropForeignKey
ALTER TABLE `register` DROP FOREIGN KEY `register_doctorId_fkey`;

-- DropForeignKey
ALTER TABLE `register` DROP FOREIGN KEY `register_hospitalId_fkey`;

-- DropForeignKey
ALTER TABLE `register` DROP FOREIGN KEY `register_patientId_fkey`;

-- AddForeignKey
ALTER TABLE `hospitalInformation` ADD CONSTRAINT `hospitalInformation_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `hospital`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor` ADD CONSTRAINT `doctor_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `hospital`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient` ADD CONSTRAINT `patient_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `doctor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `patient` ADD CONSTRAINT `patient_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `hospital`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `register` ADD CONSTRAINT `register_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `register` ADD CONSTRAINT `register_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `doctor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `register` ADD CONSTRAINT `register_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `hospital`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointment` ADD CONSTRAINT `appointment_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointment` ADD CONSTRAINT `appointment_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `doctor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointment` ADD CONSTRAINT `appointment_hospitalId_fkey` FOREIGN KEY (`hospitalId`) REFERENCES `hospital`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monitor` ADD CONSTRAINT `monitor_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patient`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
