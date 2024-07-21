/*
  Warnings:

  - You are about to drop the `bpmSpo2` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "bpmSpo2";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "monitorData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "monitorId" TEXT NOT NULL,
    "bpm" REAL NOT NULL,
    "spo2" REAL NOT NULL,
    CONSTRAINT "monitorData_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "monitor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
