const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const products = {
  cups: [
    // Small Sizes
    { name: "Paper Cup", size: "55 ml", description: "Small tasting cup", image: "https://picsum.photos/200/300", category: "Small Sizes" },
    { name: "Paper Cup", size: "65 ml", description: "Espresso size", image: "https://picsum.photos/300/200", category: "Small Sizes" },
    { name: "Paper Cup", size: "85 ml", description: "Small beverage cup", image: "https://picsum.photos/400/300", category: "Small Sizes" },
    { name: "Paper Cup", size: "110 ml", description: "Perfect for small drinks", image: "https://picsum.photos/500/400", category: "Small Sizes" },
    
    // Medium Sizes
    { name: "Paper Cup", size: "150 ml", description: "Ideal for coffee and tea", image: "https://picsum.photos/600/400", category: "Medium Sizes" },
    { name: "Paper Cup", size: "200 ml", description: "Standard serving size", image: "https://picsum.photos/700/500", category: "Medium Sizes" },
    
    // Large Sizes
    { name: "Paper Cup", size: "250 ml", description: "Large serving option", image: "https://picsum.photos/800/600", category: "Large Sizes" },
  ],
  plates: [
    // Round Plates
    { name: "Round Plate", size: "8\"", description: "Standard 8-inch plate", image: "https://picsum.photos/900/600", category: "Round Plates" },
    { name: "Round Plate", size: "9\"", description: "Medium 9-inch plate", image: "https://picsum.photos/1000/700", category: "Round Plates" },
    { name: "Round Plate", size: "10\"", description: "Large 10-inch plate", image: "https://picsum.photos/1200/800", category: "Round Plates" },
    
    // Square Plates
    { name: "Square Plate", size: "4x4\"", description: "Compact square design", image: "https://picsum.photos/200/300", category: "Square Plates" },
    { name: "Square Plate", size: "5x5\"", description: "Large square plate", image: "https://picsum.photos/300/200", category: "Square Plates" },
  ],
  bowls: [
    { name: "White Paper Bowl", size: "150 ml", description: "Small white paper bowl", image: "https://picsum.photos/400/300", category: "Paper Bowls" },
    { name: "White Paper Bowl", size: "200 ml", description: "Medium white paper bowl", image: "https://picsum.photos/500/400", category: "Paper Bowls" },
    { name: "White Paper Bowl", size: "250 ml", description: "Standard white paper bowl", image: "https://picsum.photos/600/400", category: "Paper Bowls" },
    { name: "White Paper Bowl", size: "360 ml", description: "Large white paper bowl", image: "https://picsum.photos/700/500", category: "Paper Bowls" },
  ]
};

function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

async function migrateProducts() {
  try {
    console.log('Starting product migration...');

    // Collect all unique categories
    const allCategories = new Set();
    Object.values(products).forEach(categoryProducts => {
      categoryProducts.forEach(product => {
        allCategories.add(product.category);
      });
    });

    console.log(`Found ${allCategories.size} categories to create`);

    // Create or update categories
    const categoryMap = {};
    for (const categoryName of allCategories) {
      const slug = createSlug(categoryName);
      
      const category = await prisma.category.upsert({
        where: { slug },
        update: { name: categoryName },
        create: {
          name: categoryName,
          slug,
          description: `${categoryName} products`,
          isActive: true
        }
      });
      
      categoryMap[categoryName] = category.id;
      console.log(`Created/updated category: ${categoryName} (${category.id})`);
    }

    // Create products
    let totalProductsCreated = 0;
    
    for (const [productType, productList] of Object.entries(products)) {
      console.log(`\nProcessing ${productType} products...`);
      
      for (let i = 0; i < productList.length; i++) {
        const product = productList[i];
        const title = `${product.name} - ${product.size}`;
        const slug = createSlug(title);
        
        try {
          const dbProduct = await prisma.product.upsert({
            where: { slug },
            update: {
              title,
              description: product.description,
              salePrice: 29.99, // Default price
              image: product.image,
              badge: product.size,
              stock: 100,
              isActive: true,
              isFeatured: i === 0, // Make first product in each category featured
              categoryId: categoryMap[product.category]
            },
            create: {
              title,
              slug,
              description: product.description,
              salePrice: 29.99, // Default price
              image: product.image,
              badge: product.size,
              stock: 100,
              isActive: true,
              isFeatured: i === 0, // Make first product in each category featured
              categoryId: categoryMap[product.category],
              sku: `${productType.toUpperCase()}-${String(i + 1).padStart(3, '0')}`
            }
          });
          
          console.log(`Created/updated product: ${title} (${dbProduct.id})`);
          totalProductsCreated++;
          
          // Add product image as ProductImage
          try {
            await prisma.productImage.create({
              data: {
                url: product.image,
                altText: title,
                sequence: 0,
                productId: dbProduct.id,
                isActive: true
              }
            });
          } catch (imgError) {
            console.log(`Note: Could not create image for ${title} (may already exist)`);
          }
          
        } catch (error) {
          console.error(`Error creating product ${title}:`, error);
        }
      }
    }

    console.log(`\n✅ Migration completed!`);
    console.log(`📊 Summary:`);
    console.log(`   Categories created/updated: ${allCategories.size}`);
    console.log(`   Products created/updated: ${totalProductsCreated}`);
    
    // Display created categories
    const finalCategories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      }
    });
    
    console.log(`\n📋 Categories in database:`);
    finalCategories.forEach(cat => {
      console.log(`   - ${cat.name}: ${cat._count.products} products`);
    });

  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

migrateProducts();