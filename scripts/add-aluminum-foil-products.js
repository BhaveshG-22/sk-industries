const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function addAluminumFoilProducts() {
  try {
    console.log('🚀 Adding Aluminum Foil Products');
    console.log('='.repeat(50));

    // First, find or create the aluminum foils category
    let aluminumFoilCategory = await prisma.category.findUnique({
      where: { slug: 'aluminium-foils' }
    });

    if (!aluminumFoilCategory) {
      console.log('Creating Aluminium Foils category...');
      aluminumFoilCategory = await prisma.category.create({
        data: {
          name: 'Aluminium Foils',
          slug: 'aluminium-foils',
          description: 'High-quality aluminum foils for kitchen and food packaging needs',
          isActive: true
        }
      });
      console.log('✅ Aluminium Foils category created');
    } else {
      console.log('✅ Aluminium Foils category already exists');
    }

    // Define the products to add
    const products = [
      {
        title: '9 Meter Aluminum Foil (Pack 2)',
        slug: '9-meter-aluminum-foil',
        description: 'Premium quality 9 meter aluminum foil roll, perfect for food storage and wrapping. Microwave safe, cold resistant, and grease resistant.',
        originalPrice: 45.00,
        salePrice: 35.00,
        status: 'AVAILABLE',
        image: 'https://gavali-group-products.s3.us-east-1.amazonaws.com/product-images/704b964d-572d-4eca-ae66-3eac5e209620.png',
        stock: 5,
        sku: 'ALF-9M-001',
        metaTitle: '9 Meter Aluminum Foil - Gavali Group',
        metaDescription: 'High-quality 9 meter aluminum foil roll for kitchen use. Microwave safe and food grade.',
        tags: ['aluminum foil', '9 meter', 'kitchen', 'food storage']
      },
      {
        title: '21 Meter Aluminum Foil (Pack 2)',
        slug: '21-meter-aluminum-foil', 
        description: 'Extended length 21 meter aluminum foil roll for larger food preparation needs. Microwave safe, cold resistant, and grease resistant.',
        originalPrice: 85.00,
        salePrice: 75.00,
        status: 'AVAILABLE',
        image: 'https://gavali-group-products.s3.us-east-1.amazonaws.com/product-images/14eb2549-7676-43af-be2e-51f921d6982c.png',
        stock: 5,
        sku: 'ALF-21M-001',
        metaTitle: '21 Meter Aluminum Foil - Gavali Group',
        metaDescription: 'Premium 21 meter aluminum foil roll for extended kitchen use. Food grade and microwave safe.',
        tags: ['aluminum foil', '21 meter', 'kitchen', 'food storage', 'extended length']
      },
      {
        title: '72 Meter Aluminum Foil (Pack 2)',
        slug: '72-meter-aluminum-foil-pack-2',
        description: 'Bulk pack of 2 x 72 meter aluminum foil rolls for commercial and heavy home use. Microwave safe, cold resistant, and grease resistant.',
        originalPrice: 250.00,
        salePrice: 220.00,
        status: 'AVAILABLE', 
        image: 'https://gavali-group-products.s3.us-east-1.amazonaws.com/product-images/94b834bf-4e7b-4f43-9416-0e7267b56190.png',
        stock: 5,
        sku: 'ALF-72M-PACK2-001',
        metaTitle: '72 Meter Aluminum Foil Pack 2 - Gavali Group',
        metaDescription: 'Bulk pack of 72 meter aluminum foil rolls for commercial use. Premium quality and food grade.',
        tags: ['aluminum foil', '72 meter', 'pack 2', 'bulk', 'commercial', 'food storage']
      }
    ];

    console.log('Adding products...');
    
    for (const productData of products) {
      // Check if product already exists
      const existingProduct = await prisma.product.findUnique({
        where: { slug: productData.slug }
      });

      if (existingProduct) {
        console.log(`⚠️  Product "${productData.title}" already exists`);
        continue;
      }

      // Create the product
      const product = await prisma.product.create({
        data: {
          ...productData,
          categoryId: aluminumFoilCategory.id,
          isActive: true,
          isFeatured: false,
          showStockCount: true
        }
      });

      console.log(`✅ Added: ${product.title} (Stock: ${product.stock})`);
    }

    console.log();
    console.log('🎉 All aluminum foil products added successfully!');
    console.log('   - 3 products created with 5 units each in stock');
    console.log('   - Images from S3 bucket');
    console.log('   - Category: Aluminium Foils');

  } catch (error) {
    console.error('❌ Error adding products:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
addAluminumFoilProducts();