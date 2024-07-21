/*
  Warnings:

  - Added the required column `doctorId` to the `MedicalHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hospitalId` to the `MedicalHistory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MedicalHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MedicalHistory_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MedicalHistory" ("createdAt", "id", "patientId", "updatedAt") SELECT "createdAt", "id", "patientId", "updatedAt" FROM "MedicalHistory";
DROP TABLE "MedicalHistory";
ALTER TABLE "new_MedicalHistory" RENAME TO "MedicalHistory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
