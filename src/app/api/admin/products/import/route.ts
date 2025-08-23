import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Hardcoded product data from your existing components
const hardcodedProducts = [
  // Personal Hygiene Products
  {
    title: "2Ply Facial Tissue Box 100 Pulls - (Pack of 3)",
    slug: "2ply-facial-tissue-100-pack-3",
    salePrice: 299,
    status: "SOLD_OUT",
    image: "https://prd.place/400?id=1",
    badge: "3 BOXES",
    sku: "PH001",
    stock: 0,
    categorySlug: "personal-hygiene"
  },
  {
    title: "Premium Face Wash Set",
    slug: "premium-face-wash-set",
    salePrice: 199,
    status: "AVAILABLE",
    image: "https://prd.place/400?id=2",
    sku: "PH002",
    stock: 50,
    categorySlug: "personal-hygiene"
  },
  {
    title: "Hand Sanitizer Gel 500ml",
    slug: "hand-sanitizer-gel-500ml",
    originalPrice: 150,
    salePrice: 120,
    status: "AVAILABLE",
    image: "https://prd.place/400?id=6",
    badge: "500ML",
    sku: "PH003",
    stock: 100,
    categorySlug: "personal-hygiene"
  },
  {
    title: "Moisturizing Body Lotion 200ml",
    slug: "moisturizing-body-lotion-200ml",
    originalPrice: 180,
    salePrice: 149,
    status: "AVAILABLE",
    image: "https://prd.place/400?id=13",
    badge: "ORGANIC",
    sku: "PH004",
    stock: 75,
    categorySlug: "personal-hygiene"
  },
  {
    title: "Toothbrush Set Electric",
    slug: "toothbrush-set-electric",
    salePrice: 899,
    status: "AVAILABLE",
    image: "https://prd.place/400?id=18",
    badge: "RECHARGEABLE",
    sku: "PH005",
    stock: 25,
    categorySlug: "personal-hygiene"
  },
  {
    title: "Body Wash Antibacterial",
    slug: "body-wash-antibacterial",
    originalPrice: 249,
    salePrice: 199,
    status: "AVAILABLE",
    image: "https://prd.place/400?id=19",
    sku: "PH006",
    stock: 60,
    categorySlug: "personal-hygiene"
  },
  {
    title: "Hand Cream Moisturizing",
    slug: "hand-cream-moisturizing",
    salePrice: 129,
    status: "SOLD_OUT",
    image: "https://prd.place/400?id=20",
    badge: "VITAMIN E",
    sku: "PH007",
    stock: 0,
    categorySlug: "personal-hygiene"
  },
  {
    title: "Nail Care Kit Complete",
    slug: "nail-care-kit-complete",
    originalPrice: 399,
    salePrice: 299,
    status: "AVAILABLE",
    image: "https://prd.place/400?id=21",
    badge: "12 PIECES",
    sku: "PH008",
    stock: 30,
    categorySlug: "personal-hygiene"
  },
  {
    title: "Deodorant Spray Set",
    slug: "deodorant-spray-set",
    salePrice: 449,
    status: "AVAILABLE",
    image: "https://prd.place/400?id=22",
    badge: "PACK OF 3",
    sku: "PH009",
    stock: 40,
    categorySlug: "personal-hygiene"
  },
  {
    title: "Lip Balm Collection",
    slug: "lip-balm-collection",
    originalPrice: 199,
    salePrice: 149,
    status: "AVAILABLE",
    image: "https://prd.place/400?id=23",
    badge: "6 FLAVORS",
    sku: "PH010",
    stock: 80,
    categorySlug: "personal-hygiene"
  },

  // Food Wrapping Products
  {
    title: "Food Wrapping Paper 21 Meters - (Pack of 2)",
    slug: "food-wrapping-paper-21m-pack-2",
    salePrice: 245,
    status: "SOLD_OUT",
    image: "https://prd.place/400?id=24",
    badge: "21 METERS",
    sku: "FW001",
    stock: 0,
    categorySlug: "food-wrapping"
  },
  {
    title: "Aluminium Foil 9 Meters - (Pack of 2)",
    slug: "aluminium-foil-9m-pack-2",
    salePrice: 199,
    status: "SOLD_OUT",
    image: "https://prd.place/400?id=25",
    sku: "FW002",
    stock: 0,
    categorySlug: "food-wrapping"
  },
  {
    title: "Baking Paper Sheets 10.25*10.25 Inches - 100 Sheets",
    slug: "baking-paper-sheets-100-sheets",
    originalPrice: 299,
    salePrice: 245,
    status: "AVAILABLE",
    image: "https://prd.place/400?id=26",
    badge: "100 SHEETS",
    sku: "FW003",
    stock: 120,
    categorySlug: "food-wrapping"
  },
  {
    title: "2Ply Facial Tissue Box 200 Pulls - (Pack of 3)",
    slug: "2ply-facial-tissue-200-pack-3",
    originalPrice: 525,
    salePrice: 299,
    status: "AVAILABLE",
    image: "https://prd.place/400?id=27",
    badge: "3 BOXES",
    sku: "FW004",
    stock: 45,
    categorySlug: "food-wrapping"
  },
  {
    title: "Plastic Wrap Heavy Duty",
    slug: "plastic-wrap-heavy-duty",
    salePrice: 179,
    status: "AVAILABLE",
    image: "https://prd.place/400?id=28",
    badge: "500M",
    sku: "FW005",
    stock: 90,
    categorySlug: "food-wrapping"
  },

  // Kitchen Hygiene Products
  {
    title: "Kitchen Cleaning Spray 500ml",
    slug: "kitchen-cleaning-spray-500ml",
    originalPrice: 180,
    salePrice: 149,
    status: "AVAILABLE",
    image: "https://prd.place/400?id=18",
    sku: "KH001",
    stock: 65,
    categorySlug: "kitchen-hygiene"
  },
  {
    title: "Dishwashing Liquid 1L",
    slug: "dishwashing-liquid-1l",
    salePrice: 99,
    status: "AVAILABLE",
    image: "https://prd.place/400?id=19",
    badge: "1L",
    sku: "KH002",
    stock: 150,
    categorySlug: "kitchen-hygiene"
  },
  {
    title: "Microfiber Kitchen Towels Set",
    slug: "microfiber-kitchen-towels-set",
    originalPrice: 299,
    salePrice: 199,
    status: "AVAILABLE",
    image: "https://prd.place/400?id=20",
    badge: "SET OF 5",
    sku: "KH003",
    stock: 55,
    categorySlug: "kitchen-hygiene"
  },

  // Household Cleaner Products
  {
    title: "All Purpose Cleaner 1L",
    slug: "all-purpose-cleaner-1l",
    originalPrice: 250,
    salePrice: 199,
    status: "AVAILABLE",
    image: "https://prd.place/400?id=32",
    badge: "1L",
    sku: "HC001",
    stock: 80,
    categorySlug: "household-cleaner"
  },
  {
    title: "Toilet Bowl Cleaner 500ml",
    slug: "toilet-bowl-cleaner-500ml",
    salePrice: 129,
    status: "AVAILABLE",
    image: "https://prd.place/400?id=33",
    sku: "HC002",
    stock: 90,
    categorySlug: "household-cleaner"
  }
]

export async function POST() {
  try {
    // First, create categories if they don't exist
    const categories = await Promise.all([
      prisma.category.upsert({
        where: { slug: 'personal-hygiene' },
        update: {},
        create: {
          name: 'PERSONAL HYGIENE',
          slug: 'personal-hygiene',
          description: 'Personal care and hygiene products',
        },
      }),
      prisma.category.upsert({
        where: { slug: 'food-wrapping' },
        update: {},
        create: {
          name: 'FOOD WRAPPING',
          slug: 'food-wrapping',
          description: 'Food storage and wrapping solutions',
        },
      }),
      prisma.category.upsert({
        where: { slug: 'kitchen-hygiene' },
        update: {},
        create: {
          name: 'KITCHEN HYGIENE',
          slug: 'kitchen-hygiene',
          description: 'Kitchen cleaning and hygiene products',
        },
      }),
      prisma.category.upsert({
        where: { slug: 'household-cleaner' },
        update: {},
        create: {
          name: 'HOUSEHOLD CLEANER',
          slug: 'household-cleaner',
          description: 'General household cleaning products',
        },
      })
    ])

    // Create a map for easy category lookup
    const categoryMap = categories.reduce((map, category) => {
      map[category.slug] = category.id
      return map
    }, {} as Record<string, string>)

    // Import products
    const importedProducts = []
    for (const productData of hardcodedProducts) {
      const product = await prisma.product.upsert({
        where: { slug: productData.slug },
        update: {
          salePrice: productData.salePrice,
          originalPrice: productData.originalPrice || null,
          status: productData.status,
          stock: productData.stock,
          badge: productData.badge || null,
        },
        create: {
          title: productData.title,
          slug: productData.slug,
          originalPrice: productData.originalPrice || null,
          salePrice: productData.salePrice,
          status: productData.status,
          image: productData.image,
          badge: productData.badge || null,
          sku: productData.sku,
          stock: productData.stock,
          isActive: true,
          isFeatured: false,
          categoryId: categoryMap[productData.categorySlug],
        },
      })
      importedProducts.push(product)
    }

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${importedProducts.length} products`,
      products: importedProducts
    })
  } catch (error) {
    console.error('Error importing products:', error)
    return NextResponse.json(
      { error: 'Failed to import products' },
      { status: 500 }
    )
  }
}