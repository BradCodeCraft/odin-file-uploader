/*
  Warnings:

  - You are about to drop the column `folderId` on the `File` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."File" DROP CONSTRAINT "File_folderId_fkey";

-- AlterTable
ALTER TABLE "public"."File" DROP COLUMN "folderId";

-- CreateTable
CREATE TABLE "public"."_FileToFolder" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FileToFolder_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FileToFolder_B_index" ON "public"."_FileToFolder"("B");

-- AddForeignKey
ALTER TABLE "public"."_FileToFolder" ADD CONSTRAINT "_FileToFolder_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."File"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_FileToFolder" ADD CONSTRAINT "_FileToFolder_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
