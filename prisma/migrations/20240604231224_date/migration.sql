-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_gift" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "urls" TEXT,
    "available" BOOLEAN NOT NULL,
    "userID" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "gift_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_gift" ("available", "id", "image", "name", "urls", "userID") SELECT "available", "id", "image", "name", "urls", "userID" FROM "gift";
DROP TABLE "gift";
ALTER TABLE "new_gift" RENAME TO "gift";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
