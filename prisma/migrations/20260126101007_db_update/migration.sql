/*
  Warnings:

  - You are about to drop the column `accessToken` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `sessionToken` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Made the column `subCategoryId` on table `posts` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `expires_at` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `token` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailVerified` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_subCategoryId_fkey";

-- DropIndex
DROP INDEX "sessions_accessToken_key";

-- DropIndex
DROP INDEX "sessions_sessionToken_key";

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "subCategoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "accessToken",
DROP COLUMN "expiresAt",
DROP COLUMN "sessionToken",
ADD COLUMN     "expires_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "ip_address" TEXT,
ADD COLUMN     "token" TEXT NOT NULL,
ADD COLUMN     "user_agent" TEXT;

-- AlterTable
ALTER TABLE "sub_categories" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "icon" DROP NOT NULL,
ALTER COLUMN "color" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "password",
DROP COLUMN "emailVerified",
ADD COLUMN     "emailVerified" BOOLEAN NOT NULL,
ALTER COLUMN "created_at" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_token_key" ON "sessions"("token");

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "sub_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
