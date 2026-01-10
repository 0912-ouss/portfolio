-- Add status column to User table
ALTER TABLE "User" ADD COLUMN "status" TEXT DEFAULT 'Active';
