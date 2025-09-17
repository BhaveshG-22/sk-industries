const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function addProductImages() {
  console.log('🖼️  Adding placeholder images to products...');
  console.log('='.repeat(50));

  try {
    // Placeholder image URLs
    const imageUrls = [
      'https://picsum.photos/200/300',
      'https://picsum.photos/300/200', 
      'https://picsum.photos/400/300',
      'https://picsum.photos/500/400',
      'https://picsum.photos/600/400',
      'https://picsum.photos/700/500',
      'https://picsum.photos/800/600',
      'https://picsum.photos/900/600',
      'https://picsum.photos/1000/700',
      'https://picsum.photos/1200/800'
    ];

    // Get all products
    console.log('1. Fetching all products...');
    const products = await prisma.product.findMany({
      where: {
        isActive: true
      },
      include: {
        images: true,
        category: {
          select: {
            name: true,
            slug: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    console.log(`   Found ${products.length} products`);

    if (products.length === 0) {
      console.log('   ⚠️  No products found to add images to');
      return;
    }

    let totalImagesAdded = 0;

    console.log('\n2. Adding images to products...');

    // Add images to each product
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      
      // Skip if product already has images
      if (product.images.length > 0) {
        console.log(`   ⏭️  Skipping ${product.title} - already has ${product.images.length} images`);
        continue;
      }

      // Use different image for each product (cycling through the array)
      const imageUrl = imageUrls[i % imageUrls.length];
      
      try {
        // Create product image record
        const productImage = await prisma.productImage.create({
          data: {
            url: imageUrl,
            altText: `${product.title} - Product Image`,
            sequence: 0,
            isActive: true,
            productId: product.id
          }
        });

        console.log(`   ✅ Added image to: ${product.title} (${product.category.name})`);
        console.log(`      Image URL: ${imageUrl}`);
        totalImagesAdded++;

      } catch (error) {
        console.log(`   ❌ Error adding image to "${product.title}":`, error.message);
      }
    }

    console.log('\n3. Final verification...');
    
    // Get updated product counts with images
    const categories = await prisma.category.findMany({
      where: {
        slug: {
          in: ['paper-plates', 'paper-bowls', 'paper-cups']
        }
      },
      include: {
        products: {
          where: {
            isActive: true
          },
          include: {
            images: {
              where: {
                isActive: true
              }
            }
          }
        }
      }
    });

    console.log('\n📊 Final Summary:');
    console.log(`   Total images added: ${totalImagesAdded}`);
    
    categories.forEach(category => {
      const productsWithImages = category.products.filter(p => p.images.length > 0);
      const productsWithoutImages = category.products.filter(p => p.images.length === 0);
      
      console.log(`\n   ${category.name}:`);
      console.log(`   - Total products: ${category.products.length}`);
      console.log(`   - Products with images: ${productsWithImages.length}`);
      console.log(`   - Products without images: ${productsWithoutImages.length}`);
      
      if (productsWithoutImages.length > 0) {
        console.log(`   - Missing images for: ${productsWithoutImages.map(p => p.title).join(', ')}`);
      }
    });

    console.log('\n🎉 Product images added successfully!');
    console.log('   Products now have placeholder images for display');
    console.log('   You can view them on the homepage and in the admin panel');

  } catch (error) {
    console.error('❌ Error adding product images:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  console.log('🚀 SK Group Product Images Setup');
  console.log('Adding placeholder images from picsum.photos');
  console.log('='.repeat(55));

  await addProductImages();
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});