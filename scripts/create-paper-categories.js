const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function createPaperCategories() {
  console.log('📝 Creating paper product categories...');
  console.log('='.repeat(50));

  try {
    const categories = [
      {
        name: 'PAPER PLATES',
        slug: 'paper-plates',
        description: 'High-quality disposable paper plates for all occasions'
      },
      {
        name: 'PAPER BOWLS',
        slug: 'paper-bowls', 
        description: 'Eco-friendly paper bowls perfect for serving food'
      },
      {
        name: 'PAPER CUPS',
        slug: 'paper-cups',
        description: 'Disposable paper cups for hot and cold beverages'
      }
    ];

    console.log('1. Checking existing categories...');
    const existingCategories = await prisma.category.findMany();
    console.log(`   Found ${existingCategories.length} existing categories`);

    console.log('2. Creating new categories...');
    
    for (const category of categories) {
      try {
        const created = await prisma.category.create({
          data: {
            name: category.name,
            slug: category.slug,
            description: category.description,
            isActive: true
          }
        });
        console.log(`   ✅ Created: ${created.name} (ID: ${created.id})`);
      } catch (error) {
        if (error.code === 'P2002') {
          console.log(`   ⚠️  Category "${category.name}" already exists`);
        } else {
          console.log(`   ❌ Error creating "${category.name}":`, error.message);
        }
      }
    }

    console.log('3. Final verification...');
    const finalCategories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    console.log(`   Total categories: ${finalCategories.length}`);
    finalCategories.forEach(cat => {
      console.log(`   ✅ ${cat.name} (slug: ${cat.slug})`);
    });

    console.log('\n🎉 Paper categories created successfully!');
    console.log('   - PAPER PLATES');
    console.log('   - PAPER BOWLS');
    console.log('   - PAPER CUPS');
    console.log('\nYou can now add products to these categories via the admin panel.');

  } catch (error) {
    console.error('❌ Error creating categories:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  console.log('🚀 SK Group Paper Categories Setup');
  console.log('Creating: PAPER PLATES, PAPER BOWLS & PAPER CUPS');
  console.log('='.repeat(55));

  await createPaperCategories();
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});