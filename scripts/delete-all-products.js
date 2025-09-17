const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function deleteAllProducts() {
  console.log('Starting to delete all products...')
  
  try {
    // First delete all product images (foreign key constraint)
    const deletedImages = await prisma.productImage.deleteMany({})
    console.log(`Deleted ${deletedImages.count} product images`)
    
    // Then delete all products
    const deletedProducts = await prisma.product.deleteMany({})
    console.log(`Deleted ${deletedProducts.count} products`)
    
    console.log('✅ All products and related images have been deleted successfully!')
    
  } catch (error) {
    console.error('❌ Error deleting products:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the function
deleteAllProducts()