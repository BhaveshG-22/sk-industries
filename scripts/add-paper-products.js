const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

async function addPaperProducts() {
  console.log('📦 Adding paper products to categories...');
  console.log('='.repeat(50));

  try {
    // First, get the categories
    const categories = await prisma.category.findMany({
      where: {
        slug: {
          in: ['paper-plates', 'paper-bowls', 'paper-cups']
        }
      }
    });

    console.log(`Found ${categories.length} paper categories`);

    // Helper function to create slug from title
    function createSlug(title) {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Products data for each category
    const productsData = {
      'paper-plates': [
        {
          title: 'Premium White Paper Plates 9 inch',
          slug: 'premium-white-paper-plates-9-inch',
          description: 'High-quality disposable paper plates perfect for parties and events. Sturdy construction holds hot and cold foods.',
          salePrice: 45.00,
          originalPrice: 55.00,
          stock: 500,
          badge: 'Best Seller',
          status: 'AVAILABLE'
        },
        {
          title: 'Eco-Friendly Brown Paper Plates 10 inch',
          slug: 'eco-friendly-brown-paper-plates-10-inch',
          description: 'Made from recycled materials, these eco-friendly plates are perfect for environmentally conscious consumers.',
          salePrice: 52.00,
          originalPrice: 60.00,
          stock: 300,
          badge: 'Eco-Friendly',
          status: 'AVAILABLE'
        },
        {
          title: 'Decorative Gold Rim Paper Plates 8 inch',
          slug: 'decorative-gold-rim-paper-plates-8-inch',
          description: 'Elegant paper plates with gold rim design, ideal for special occasions and formal gatherings.',
          salePrice: 65.00,
          originalPrice: 75.00,
          stock: 200,
          badge: 'Premium',
          status: 'AVAILABLE'
        },
        {
          title: 'Heavy Duty Paper Plates 9 inch',
          slug: 'heavy-duty-paper-plates-9-inch',
          description: 'Extra strong paper plates designed to handle heavy meals without bending or breaking.',
          salePrice: 48.00,
          originalPrice: null,
          stock: 400,
          badge: 'Heavy Duty',
          status: 'AVAILABLE'
        },
        {
          title: 'Colorful Kids Paper Plates 7 inch',
          slug: 'colorful-kids-paper-plates-7-inch',
          description: 'Fun and colorful paper plates designed especially for children\'s parties and meals.',
          salePrice: 35.00,
          originalPrice: 42.00,
          stock: 250,
          badge: 'Kids Special',
          status: 'AVAILABLE'
        },
        {
          title: 'Biodegradable Paper Plates 9 inch',
          slug: 'biodegradable-paper-plates-9-inch',
          description: 'Fully biodegradable paper plates that decompose naturally, perfect for outdoor events.',
          salePrice: 58.00,
          originalPrice: 68.00,
          stock: 180,
          badge: 'Biodegradable',
          status: 'AVAILABLE'
        }
      ],
      'paper-bowls': [
        {
          title: 'Deep Paper Bowls 16 oz',
          slug: 'deep-paper-bowls-16-oz',
          description: 'Deep paper bowls perfect for soups, salads, and pasta. Leak-resistant coating keeps contents secure.',
          salePrice: 42.00,
          originalPrice: 50.00,
          stock: 350,
          badge: 'Leak-Proof',
          status: 'AVAILABLE'
        },
        {
          title: 'Microwave Safe Paper Bowls 12 oz',
          slug: 'microwave-safe-paper-bowls-12-oz',
          description: 'Microwave-safe paper bowls suitable for heating food. Convenient for both home and office use.',
          salePrice: 38.00,
          originalPrice: null,
          stock: 400,
          badge: 'Microwave Safe',
          status: 'AVAILABLE'
        },
        {
          title: 'Elegant White Paper Bowls 20 oz',
          slug: 'elegant-white-paper-bowls-20-oz',
          description: 'Large capacity elegant white paper bowls, perfect for serving generous portions at events.',
          salePrice: 55.00,
          originalPrice: 62.00,
          stock: 220,
          badge: 'Large Size',
          status: 'AVAILABLE'
        },
        {
          title: 'Eco Paper Bowls with Handles 14 oz',
          slug: 'eco-paper-bowls-with-handles-14-oz',
          description: 'Environmentally friendly paper bowls with convenient handles for easy carrying.',
          salePrice: 48.00,
          originalPrice: 55.00,
          stock: 280,
          badge: 'With Handles',
          status: 'AVAILABLE'
        },
        {
          title: 'Designer Paper Bowls 16 oz',
          slug: 'designer-paper-bowls-16-oz',
          description: 'Stylish designer paper bowls with modern patterns, adding elegance to any dining experience.',
          salePrice: 62.00,
          originalPrice: 72.00,
          stock: 150,
          badge: 'Designer',
          status: 'AVAILABLE'
        },
        {
          title: 'Compostable Paper Bowls 18 oz',
          slug: 'compostable-paper-bowls-18-oz',
          description: 'Fully compostable paper bowls made from sustainable materials, perfect for eco-conscious events.',
          salePrice: 52.00,
          originalPrice: 60.00,
          stock: 190,
          badge: 'Compostable',
          status: 'AVAILABLE'
        }
      ],
      'paper-cups': [
        {
          title: 'Insulated Coffee Paper Cups 12 oz',
          slug: 'insulated-coffee-paper-cups-12-oz',
          description: 'Double-wall insulated paper cups perfect for hot beverages. Keeps drinks hot and hands cool.',
          salePrice: 35.00,
          originalPrice: 42.00,
          stock: 600,
          badge: 'Insulated',
          status: 'AVAILABLE'
        },
        {
          title: 'Cold Drink Paper Cups 16 oz',
          slug: 'cold-drink-paper-cups-16-oz',
          description: 'Large capacity paper cups ideal for cold beverages, smoothies, and iced drinks.',
          salePrice: 32.00,
          originalPrice: null,
          stock: 500,
          badge: 'Cold Drinks',
          status: 'AVAILABLE'
        },
        {
          title: 'Premium Coffee Shop Cups 8 oz',
          slug: 'premium-coffee-shop-cups-8-oz',
          description: 'Professional-grade paper cups used by coffee shops. Perfect for espresso and small beverages.',
          salePrice: 28.00,
          originalPrice: 35.00,
          stock: 450,
          badge: 'Coffee Shop',
          status: 'AVAILABLE'
        },
        {
          title: 'Eco-Friendly Paper Cups 10 oz',
          slug: 'eco-friendly-paper-cups-10-oz',
          description: 'Made from recycled paper with biodegradable coating. Perfect for environmentally conscious businesses.',
          salePrice: 38.00,
          originalPrice: 45.00,
          stock: 320,
          badge: 'Eco-Friendly',
          status: 'AVAILABLE'
        },
        {
          title: 'Party Paper Cups 14 oz',
          slug: 'party-paper-cups-14-oz',
          description: 'Colorful and fun paper cups perfect for parties, celebrations, and special events.',
          salePrice: 30.00,
          originalPrice: 36.00,
          stock: 380,
          badge: 'Party Special',
          status: 'AVAILABLE'
        },
        {
          title: 'Hot Beverage Paper Cups 6 oz',
          slug: 'hot-beverage-paper-cups-6-oz',
          description: 'Small paper cups perfect for espresso, tea, and other hot beverages. Heat-resistant coating.',
          salePrice: 25.00,
          originalPrice: 30.00,
          stock: 400,
          badge: 'Hot Beverages',
          status: 'AVAILABLE'
        }
      ]
    };

    let totalProductsCreated = 0;

    // Add products to each category
    for (const category of categories) {
      console.log(`\n📋 Adding products to ${category.name} category...`);
      
      const categoryProducts = productsData[category.slug];
      if (!categoryProducts) {
        console.log(`   ⚠️  No products defined for ${category.slug}`);
        continue;
      }

      for (const productData of categoryProducts) {
        try {
          const product = await prisma.product.create({
            data: {
              ...productData,
              categoryId: category.id,
              isActive: true,
              salePrice: productData.salePrice,
              originalPrice: productData.originalPrice
            }
          });
          
          console.log(`   ✅ Created: ${product.title} (₹${product.salePrice})`);
          totalProductsCreated++;
          
        } catch (error) {
          console.log(`   ❌ Error creating "${productData.title}":`, error.message);
        }
      }
    }

    console.log('\n📊 Final Summary:');
    console.log(`   Total products created: ${totalProductsCreated}`);
    console.log(`   Expected: ${categories.length * 6} products`);
    
    // Show final category breakdown
    console.log('\n🎯 Category breakdown:');
    for (const category of categories) {
      const productCount = await prisma.product.count({
        where: {
          categoryId: category.id,
          isActive: true
        }
      });
      console.log(`   ${category.name}: ${productCount} products`);
    }

    console.log('\n🎉 Paper products added successfully!');
    console.log('   You can now view these products on the homepage');
    console.log('   and manage them through the admin panel.');

  } catch (error) {
    console.error('❌ Error adding products:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  console.log('🚀 SK Group Paper Products Setup');
  console.log('Adding 6 products to each paper category');
  console.log('='.repeat(55));

  await addPaperProducts();
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});