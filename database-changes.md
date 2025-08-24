# Database Schema Changes

This file documents manual database changes made outside of Prisma migrations.

## Changes Made

### 1. ProductImage Table (Added manually)
```sql
CREATE TABLE "product_images" (
  "id" TEXT NOT NULL,
  "url" TEXT NOT NULL,
  "altText" TEXT,
  "sequence" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "productId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "product_images" ADD CONSTRAINT "product_images_productId_fkey" 
FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE INDEX "product_images_productId_idx" ON "product_images"("productId");
```

### 2. ShowStockCount Field (Added manually)
```sql
ALTER TABLE "products" ADD COLUMN "showStockCount" BOOLEAN NOT NULL DEFAULT false;
```

## Current Status
- ✅ Database schema is current
- ✅ Prisma schema synced via `prisma db pull`
- ✅ Prisma client generated and working
- ⚠️ No migration history (due to connection limitations)

## Future Migrations
When migration functionality becomes available:
1. Create baseline migration: `npx prisma migrate resolve --applied 0_init`
2. Future changes should use: `npx prisma migrate dev --name <description>`

## Rollback Information
To revert changes:
```sql
-- Remove showStockCount field
ALTER TABLE "products" DROP COLUMN "showStockCount";

-- Remove ProductImage table
DROP TABLE "product_images";
```