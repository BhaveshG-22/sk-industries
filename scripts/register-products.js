const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();

// Product data with S3 URLs
const productsData = [
  {
    name: "250ml Container",
    description: "Perfect for small portions and sampling. Food grade material with leak-proof design.",
    shortDescription: "Compact 250ml container ideal for samples and small servings",
    salePrice: 200,
    originalPrice: null,
    specifications: "Volume: 250ml, Material: Food grade plastic, Features: Stackable, leak-proof",
    features: ["Food grade material", "Leak-proof design", "Stackable"],
    imageUrl: "https://gavali-group-products.s3.us-east-1.amazonaws.com/products/250ml-container.png"
  },
  {
    name: "450ml Container",
    description: "Ideal for individual servings. Microwave safe and dishwasher friendly with durable construction.",
    shortDescription: "Mid-size 450ml container perfect for individual portions",
    salePrice: 230,
    originalPrice: null,
    specifications: "Volume: 450ml, Material: Food grade plastic, Features: Microwave safe, dishwasher friendly",
    features: ["Microwave safe", "Dishwasher friendly", "Durable construction"],
    imageUrl: "https://gavali-group-products.s3.us-east-1.amazonaws.com/products/450ml-container.png"
  },
  {
    name: "600ml Oval Container",
    description: "Unique oval design for versatile use. Space efficient with elegant design for multi-purpose applications.",
    shortDescription: "Stylish 600ml oval container with space-efficient design",
    salePrice: 260,
    originalPrice: null,
    specifications: "Volume: 600ml, Shape: Oval, Material: Food grade plastic, Features: Space efficient, elegant design",
    features: ["Space efficient", "Elegant design", "Multi-purpose"],
    imageUrl: "https://gavali-group-products.s3.us-east-1.amazonaws.com/products/600ml-oval-container.png"
  },
  {
    name: "750ml Container",
    description: "Large capacity for family portions. Heavy duty construction with premium quality materials.",
    shortDescription: "Large 750ml container designed for family-sized portions",
    salePrice: 290,
    originalPrice: null,
    specifications: "Volume: 750ml, Material: Premium food grade plastic, Features: Heavy duty, family size",
    features: ["Family size", "Heavy duty", "Premium quality"],
    imageUrl: "https://gavali-group-products.s3.us-east-1.amazonaws.com/products/750ml-container.png"
  }
];

async function createCategory() {
  try {
    // Check if Containers category exists
    let category = await prisma.category.findFirst({
      where: { name: "Containers" }
    });

    if (!category) {
      // Create Containers category
      category = await prisma.category.create({
        data: {
          name: "Containers",
          description: "Premium quality food containers in various sizes",
          slug: "containers",
          isActive: true
        }
      });
      console.log('✅ Created category: Containers');
    } else {
      console.log('✅ Category already exists: Containers');
    }

    return category;
  } catch (error) {
    console.error('❌ Error creating category:', error);
    throw error;
  }
}

async function registerProducts() {
  try {
    console.log('🚀 Product Registration Script');
    console.log('='.repeat(50));

    // Create category first
    const category = await createCategory();

    console.log('\n📦 Registering products...');

    for (const productData of productsData) {
      try {
        // Check if product already exists
        const existingProduct = await prisma.product.findFirst({
          where: { title: productData.name }
        });

        if (existingProduct) {
          console.log(`⚠️  Product already exists: ${productData.name}`);
          continue;
        }

        // Create product
        const product = await prisma.product.create({
          data: {
            title: productData.name,
            description: productData.description,
            salePrice: productData.salePrice,
            originalPrice: productData.originalPrice,
            categoryId: category.id,
            isActive: true,
            isFeatured: true,
            stock: 1000, // Bulk quantity available
            image: productData.imageUrl,
            slug: productData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
            status: 'AVAILABLE',
            showStockCount: true
          }
        });

        // Create product image
        await prisma.productImage.create({
          data: {
            productId: product.id,
            url: productData.imageUrl,
            altText: `${productData.name} - Gavali Group`,
            sequence: 1,
            isActive: true
          }
        });

        console.log(`✅ Registered: ${productData.name} (ID: ${product.id})`);
        console.log(`   🔗 Image: ${productData.imageUrl}`);
        console.log(`   💰 Price: ₹${productData.salePrice} per 100 pieces`);
        console.log();

      } catch (productError) {
        console.error(`❌ Error registering ${productData.name}:`, productError.message);
      }
    }

    console.log('📊 Registration Summary');
    console.log('='.repeat(30));

    // Get final counts
    const totalProducts = await prisma.product.count({
      where: { categoryId: category.id }
    });

    const totalImages = await prisma.productImage.count({
      where: {
        product: {
          categoryId: category.id
        }
      }
    });

    console.log(`📦 Total products in Containers category: ${totalProducts}`);
    console.log(`🖼️  Total product images: ${totalImages}`);
    console.log(`🔗 Category ID: ${category.id}`);

    console.log('\n🎉 Product registration completed!');
    console.log('Products are now available in your database and ready to use.');

  } catch (error) {
    console.error('❌ Registration failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
registerProducts().catch(console.error);