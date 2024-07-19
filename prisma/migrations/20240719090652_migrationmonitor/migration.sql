/*
  Warnings:

  - You are about to drop the column `bloodPressure` on the `monitor` table. All the data in the column will be lost.
  - You are about to drop the column `heartRate` on the `monitor` table. All the data in the column will be lost.
  - You are about to drop the column `oxygenSaturation` on the `monitor` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "bpmSpo2" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "monitorId" TEXT NOT NULL,
    "bpm" REAL NOT NULL,
    "spo2" REAL NOT NULL,
    CONSTRAINT "bpmSpo2_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "monitor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_monitor" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "patientId" TEXT NOT NULL,
    CONSTRAINT "monitor_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_monitor" ("id", "patientId") SELECT "id", "patientId" FROM "monitor";
DROP TABLE "monitor";
ALTER TABLE "new_monitor" RENAME TO "monitor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
