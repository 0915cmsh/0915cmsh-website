/*
  Warnings:

  - Added the required column `password` to the `Inquiry` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "InquiryComment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "inquiryId" INTEGER NOT NULL,
    "author" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "InquiryComment_inquiryId_fkey" FOREIGN KEY ("inquiryId") REFERENCES "Inquiry" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Inquiry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "company" TEXT,
    "position" TEXT,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Inquiry" ("body", "company", "createdAt", "email", "id", "name", "phone", "position", "title", "type") SELECT "body", "company", "createdAt", "email", "id", "name", "phone", "position", "title", "type" FROM "Inquiry";
DROP TABLE "Inquiry";
ALTER TABLE "new_Inquiry" RENAME TO "Inquiry";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
