/*
  Warnings:

  - You are about to drop the column `channel` on the `monitor` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_monitor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "doctorId" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "hospitalId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "monitor_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "monitor_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "doctor" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "monitor_hospitalId_fkey" FOREIGN KEY ("hospitalId") REFERENCES "hospital" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_monitor" ("createdAt", "doctorId", "hospitalId", "id", "patientId") SELECT "createdAt", "doctorId", "hospitalId", "id", "patientId" FROM "monitor";
DROP TABLE "monitor";
ALTER TABLE "new_monitor" RENAME TO "monitor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;