const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function cleanupCategories() {
  console.log('🧹 Starting category cleanup...');
  console.log('='.repeat(50));

  try {
    // List of categories to KEEP (case-insensitive matching)
    const categoriesToKeep = [
      'paper plates',
      'paper bowls', 
      'paper cups'
    ];

    console.log('1. Fetching all existing categories...');
    const allCategories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    console.log(`   Found ${allCategories.length} categories:`);
    allCategories.forEach(cat => {
      console.log(`   - ${cat.name} (${cat._count.products} products)`);
    });

    console.log('\n2. Identifying categories to remove...');
    const categoriesToDelete = allCategories.filter(category => {
      const categoryNameLower = category.name.toLowerCase();
      return !categoriesToKeep.some(keepName => 
        categoryNameLower.includes(keepName.toLowerCase()) ||
        keepName.toLowerCase().includes(categoryNameLower)
      );
    });

    console.log(`   Categories to DELETE (${categoriesToDelete.length}):`);
    categoriesToDelete.forEach(cat => {
      console.log(`   ❌ ${cat.name} (${cat._count.products} products)`);
    });

    const categoriesToKeepFiltered = allCategories.filter(category => {
      const categoryNameLower = category.name.toLowerCase();
      return categoriesToKeep.some(keepName => 
        categoryNameLower.includes(keepName.toLowerCase()) ||
        keepName.toLowerCase().includes(categoryNameLower)
      );
    });

    console.log(`   Categories to KEEP (${categoriesToKeepFiltered.length}):`);
    categoriesToKeepFiltered.forEach(cat => {
      console.log(`   ✅ ${cat.name} (${cat._count.products} products)`);
    });

    if (categoriesToDelete.length === 0) {
      console.log('\n🎉 No categories need to be deleted!');
      return;
    }

    console.log('\n3. Preparing to delete products and categories...');
    
    // Get total products that will be affected
    const productsToDelete = await prisma.product.findMany({
      where: {
        categoryId: {
          in: categoriesToDelete.map(cat => cat.id)
        }
      },
      select: {
        id: true,
        title: true,
        category: {
          select: {
            name: true
          }
        }
      }
    });

    console.log(`   Products to be deleted: ${productsToDelete.length}`);

    // Show confirmation prompt
    console.log('\n⚠️  WARNING: This will permanently delete:');
    console.log(`   - ${categoriesToDelete.length} categories`);
    console.log(`   - ${productsToDelete.length} products`);
    console.log('   - All associated product images and data');
    
    // In a real script, you'd want user confirmation here
    // For now, I'll add a safety check
    console.log('\n🔒 Safety Check: Add CONFIRM=true environment variable to proceed');
    
    if (process.env.CONFIRM !== 'true') {
      console.log('\n❌ Cleanup cancelled. To proceed, run:');
      console.log('   CONFIRM=true node scripts/cleanup-categories.js');
      return;
    }

    console.log('\n4. Deleting products...');
    const deleteProductsResult = await prisma.product.deleteMany({
      where: {
        categoryId: {
          in: categoriesToDelete.map(cat => cat.id)
        }
      }
    });
    console.log(`   ✅ Deleted ${deleteProductsResult.count} products`);

    console.log('\n5. Deleting categories...');
    const deleteCategoriesResult = await prisma.category.deleteMany({
      where: {
        id: {
          in: categoriesToDelete.map(cat => cat.id)
        }
      }
    });
    console.log(`   ✅ Deleted ${deleteCategoriesResult.count} categories`);

    console.log('\n6. Final verification...');
    const remainingCategories = await prisma.category.findMany({
      select: {
        name: true,
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    console.log(`   Remaining categories (${remainingCategories.length}):`);
    remainingCategories.forEach(cat => {
      console.log(`   ✅ ${cat.name} (${cat._count.products} products)`);
    });

    console.log('\n🎉 Category cleanup completed successfully!');
    console.log('   - Only PAPER PLATES, PAPER BOWLS and PAPER CUPS categories remain');
    console.log('   - All other categories and their products have been removed');

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Also create a function to clean up announcements
async function cleanupAnnouncements() {
  console.log('\n📢 Cleaning up announcements...');
  
  try {
    // List of announcement messages to KEEP
    const announcementsToKeep = [
      'Additional 15% discount on purchases above ₹1000',
      'Free shipping over ₹499'
    ];

    console.log('1. Fetching all announcements...');
    const allAnnouncements = await prisma.announcement.findMany({
      select: {
        id: true,
        title: true,
        message: true,
        status: true
      }
    });

    console.log(`   Found ${allAnnouncements.length} announcements`);

    const announcementsToDelete = allAnnouncements.filter(announcement => {
      return !announcementsToKeep.some(keepMessage => 
        announcement.message.includes(keepMessage) ||
        keepMessage.includes(announcement.message)
      );
    });

    if (announcementsToDelete.length === 0) {
      console.log('   ✅ No announcements need to be deleted!');
      return;
    }

    console.log(`   Announcements to DELETE (${announcementsToDelete.length}):`);
    announcementsToDelete.forEach(ann => {
      console.log(`   ❌ "${ann.message}"`);
    });

    if (process.env.CONFIRM === 'true') {
      const deleteResult = await prisma.announcement.deleteMany({
        where: {
          id: {
            in: announcementsToDelete.map(ann => ann.id)
          }
        }
      });
      console.log(`   ✅ Deleted ${deleteResult.count} announcements`);
    }

  } catch (error) {
    console.error('❌ Error cleaning announcements:', error);
  }
}

async function main() {
  console.log('🚀 SK Group Database Cleanup');
  console.log('Keep only: PAPER PLATES, PAPER BOWLS & PAPER CUPS categories');
  console.log('Keep only: Discount & Free shipping announcements');
  console.log('='.repeat(60));

  await cleanupCategories();
  await cleanupAnnouncements();

  console.log('\n✨ All cleanup tasks completed!');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});