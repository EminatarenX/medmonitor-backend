-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "fullname" TEXT,
    "telephone" TEXT
);

-- CreateTable
CREATE TABLE "gift" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "urls" TEXT NOT NULL,
    "available" BOOLEAN NOT NULL,
    "userID" TEXT,
    CONSTRAINT "gift_userID_fkey" FOREIGN KEY ("userID") REFERENCES "user" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
