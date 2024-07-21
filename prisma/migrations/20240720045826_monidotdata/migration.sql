-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_monitorData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "monitorId" TEXT NOT NULL,
    "bpm" REAL NOT NULL,
    "spo2" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "monitorData_monitorId_fkey" FOREIGN KEY ("monitorId") REFERENCES "monitor" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_monitorData" ("bpm", "id", "monitorId", "spo2") SELECT "bpm", "id", "monitorId", "spo2" FROM "monitorData";
DROP TABLE "monitorData";
ALTER TABLE "new_monitorData" RENAME TO "monitorData";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
