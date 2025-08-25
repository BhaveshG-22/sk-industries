import { PrismaClient, ProductStatus } from '@prisma/client'

const prisma = new PrismaClient()

const categoriesData = [
  {
    name: "CONTAINERS",
    slug: "containers",
    description: "Storage containers and packaging products",
    products: [
      {
        title: "2Ply Facial Tissue Box 100 Pulls - (Pack of 3)",
        slug: "2ply-facial-tissue-box-100-pulls-pack-3",
        salePrice: 299,
        status: "SOLD_OUT" as ProductStatus,
        image: "https://prd.place/400?id=1",
        badge: "3 BOXES"
      },
      {
        title: "Premium Face Wash Set",
        slug: "premium-face-wash-set",
        salePrice: 199,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=2"
      },
      {
        title: "Hand Sanitizer Gel 500ml",
        slug: "hand-sanitizer-gel-500ml",
        originalPrice: 150,
        salePrice: 120,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=6",
        badge: "500ML"
      },
      {
        title: "Moisturizing Body Lotion 200ml",
        slug: "moisturizing-body-lotion-200ml",
        originalPrice: 180,
        salePrice: 149,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=13",
        badge: "ORGANIC"
      },
      {
        title: "Anti-Bacterial Soap Bar Set",
        slug: "anti-bacterial-soap-bar-set",
        salePrice: 89,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=14",
        badge: "PACK OF 4"
      },
      {
        title: "Dental Care Kit Complete",
        slug: "dental-care-kit-complete",
        originalPrice: 299,
        salePrice: 249,
        status: "SOLD_OUT" as ProductStatus,
        image: "https://prd.place/400?id=15"
      },
      {
        title: "Shampoo & Conditioner Bundle",
        slug: "shampoo-conditioner-bundle",
        salePrice: 399,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=16",
        badge: "COMBO"
      },
      {
        title: "Face Mask Sheet Pack",
        slug: "face-mask-sheet-pack",
        originalPrice: 120,
        salePrice: 89,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=17",
        badge: "10 SHEETS"
      }
    ]
  },
  {
    name: "FOOD WRAPPING",
    slug: "food-wrapping",
    description: "Food storage and wrapping solutions",
    products: [
      {
        title: "2Ply Facial Tissue Box 200 Pulls - (Pack of 3)",
        slug: "2ply-facial-tissue-box-200-pulls-pack-3",
        originalPrice: 525,
        salePrice: 299,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=3",
        badge: "3 BOXES"
      },
      {
        title: "Food Storage Containers Set",
        slug: "food-storage-containers-set",
        salePrice: 599,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=7",
        badge: "SET OF 5"
      },
      {
        title: "Aluminum Foil Roll 30m",
        slug: "aluminum-foil-roll-30m",
        salePrice: 180,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=8"
      },
      {
        title: "Cling Film Wrap 100m",
        slug: "cling-film-wrap-100m",
        originalPrice: 99,
        salePrice: 79,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=18"
      },
      {
        title: "Parchment Paper Sheets",
        slug: "parchment-paper-sheets",
        salePrice: 149,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=19",
        badge: "50 SHEETS"
      },
      {
        title: "Vacuum Seal Bags Pack",
        slug: "vacuum-seal-bags-pack",
        salePrice: 299,
        status: "SOLD_OUT" as ProductStatus,
        image: "https://prd.place/400?id=20",
        badge: "PACK OF 20"
      },
      {
        title: "Food Wrap Paper Eco",
        slug: "food-wrap-paper-eco",
        originalPrice: 159,
        salePrice: 129,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=21",
        badge: "ECO-FRIENDLY"
      },
      {
        title: "Ziplock Bags Assorted",
        slug: "ziplock-bags-assorted",
        salePrice: 199,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=22",
        badge: "MULTI-SIZE"
      },
      {
        title: "Freezer Bags Heavy Duty",
        slug: "freezer-bags-heavy-duty",
        salePrice: 249,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=23"
      }
    ]
  },
  {
    name: "KITCHEN HYGIENE", 
    slug: "kitchen-hygiene",
    description: "Kitchen cleaning and hygiene products",
    products: [
      {
        title: "2Ply Napkin Tissue Box 50 Pulls - (Pack of 4)",
        slug: "2ply-napkin-tissue-box-50-pulls-pack-4",
        salePrice: 250,
        status: "SOLD_OUT" as ProductStatus,
        image: "https://prd.place/400?id=4",
        badge: "4 BOXES"
      },
      {
        title: "Kitchen Cleaning Wipes",
        slug: "kitchen-cleaning-wipes",
        originalPrice: 99,
        salePrice: 79,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=9",
        badge: "80 WIPES"
      },
      {
        title: "Dish Soap Liquid 500ml",
        slug: "dish-soap-liquid-500ml",
        salePrice: 145,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=10"
      },
      {
        title: "Scrub Sponges Multi-Pack",
        slug: "scrub-sponges-multi-pack",
        salePrice: 89,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=24",
        badge: "PACK OF 12"
      },
      {
        title: "Degreaser Spray Kitchen",
        slug: "degreaser-spray-kitchen",
        originalPrice: 179,
        salePrice: 149,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=25"
      },
      {
        title: "Microfiber Cleaning Cloths",
        slug: "microfiber-cleaning-cloths",
        salePrice: 199,
        status: "SOLD_OUT" as ProductStatus,
        image: "https://prd.place/400?id=26",
        badge: "SET OF 6"
      },
      {
        title: "Oven Cleaner Gel Strong",
        slug: "oven-cleaner-gel-strong",
        salePrice: 229,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=27"
      },
      {
        title: "Dishwasher Tablets Pack",
        slug: "dishwasher-tablets-pack",
        originalPrice: 299,
        salePrice: 249,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=28",
        badge: "30 TABLETS"
      },
      {
        title: "Cutting Board Sanitizer",
        slug: "cutting-board-sanitizer",
        salePrice: 129,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=29"
      }
    ]
  },
  {
    name: "HOUSEHOLD CLEANER",
    slug: "household-cleaner",
    description: "General household cleaning products",
    products: [
      {
        title: "3 Ply Toilet Tissue Paper Rolls - (Pack Of 4)",
        slug: "3-ply-toilet-tissue-paper-rolls-pack-4",
        salePrice: 275,
        status: "AVAILABLE" as ProductStatus, 
        image: "https://prd.place/400?id=5",
        badge: "3 PLY"
      },
      {
        title: "Multi-Surface Cleaner Spray",
        slug: "multi-surface-cleaner-spray",
        originalPrice: 199,
        salePrice: 159,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=11",
        badge: "750ML"
      },
      {
        title: "Floor Cleaner Concentrate",
        slug: "floor-cleaner-concentrate",
        salePrice: 220,
        status: "SOLD_OUT" as ProductStatus,
        image: "https://prd.place/400?id=12"
      },
      {
        title: "Glass Cleaner Streak-Free",
        slug: "glass-cleaner-streak-free",
        salePrice: 149,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=30"
      },
      {
        title: "Bathroom Cleaner Disinfectant",
        slug: "bathroom-cleaner-disinfectant",
        originalPrice: 189,
        salePrice: 159,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=31"
      },
      {
        title: "Laundry Detergent Pods",
        slug: "laundry-detergent-pods",
        salePrice: 399,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=32",
        badge: "40 PODS"
      },
      {
        title: "Fabric Softener Liquid",
        slug: "fabric-softener-liquid",
        originalPrice: 179,
        salePrice: 149,
        status: "SOLD_OUT" as ProductStatus,
        image: "https://prd.place/400?id=33"
      },
      {
        title: "Air Freshener Spray Pack",
        slug: "air-freshener-spray-pack",
        salePrice: 199,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=34",
        badge: "PACK OF 3"
      },
      {
        title: "Carpet Cleaner Foam",
        slug: "carpet-cleaner-foam",
        salePrice: 279,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=35"
      },
      {
        title: "Wood Polish Spray",
        slug: "wood-polish-spray",
        originalPrice: 149,
        salePrice: 119,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=36"
      },
      {
        title: "Stain Remover Pen Set",
        slug: "stain-remover-pen-set",
        salePrice: 89,
        status: "AVAILABLE" as ProductStatus,
        image: "https://prd.place/400?id=37",
        badge: "SET OF 3"
      },
      {
        title: "Drain Cleaner Gel",
        slug: "drain-cleaner-gel",
        salePrice: 199,
        status: "SOLD_OUT" as ProductStatus,
        image: "https://prd.place/400?id=38"
      }
    ]
  }
]

async function main() {
  console.log('🌱 Start seeding...')
  
  // Clear existing data
  console.log('🧹 Clearing existing data...')
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()
  await prisma.blogPost.deleteMany()
  
  // Create categories with products
  for (const categoryData of categoriesData) {
    const { products, ...categoryInfo } = categoryData
    
    console.log(`📦 Creating category: ${categoryInfo.name}`)
    
    const category = await prisma.category.create({
      data: {
        ...categoryInfo,
        products: {
          create: products.map(product => ({
            ...product,
            originalPrice: product.originalPrice || null
          }))
        }
      }
    })
    
    console.log(`✅ Created category "${category.name}" with ${products.length} products`)
  }
  
  // Create blog posts
  console.log('📝 Creating blog posts...')
  
  const blogPosts = [
    {
      title: "Essential Hygiene Products for Modern Living",
      slug: "essential-hygiene-products-modern-living",
      content: "In today's fast-paced world, maintaining proper hygiene has become more important than ever. From personal care to household cleanliness, the right products can make all the difference in ensuring a healthy and comfortable living environment. Whether you're looking for premium facial tissues, effective sanitizers, or comprehensive cleaning solutions, choosing quality products is key to protecting your family's health and well-being. Our curated selection of hygiene essentials covers everything from daily personal care routines to deep cleaning needs, helping you maintain the highest standards of cleanliness in your home and personal life.",
      excerpt: "Discover the essential hygiene products that make a difference in modern living, from personal care to household cleanliness.",
      featuredImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=450&fit=crop",
      isPublished: true,
      publishedAt: new Date('2024-01-15'),
      metaTitle: "Essential Hygiene Products for Modern Living | Gavali Group",
      metaDescription: "Discover the best hygiene products for your home and personal care needs. Quality products for a healthier lifestyle.",
      tags: ["hygiene", "health", "lifestyle", "cleaning"],
      authorName: "Gavali Group Team",
      authorEmail: "info@gavaligroup.com"
    },
    {
      title: "Smart Food Storage Solutions: Keep Your Kitchen Organized",
      slug: "smart-food-storage-solutions-kitchen-organized",
      content: "Effective food storage is crucial for maintaining freshness, preventing waste, and keeping your kitchen organized. With the right combination of storage containers, wrapping materials, and preservation techniques, you can extend the life of your groceries while maintaining optimal flavor and nutrition. From vacuum-sealed bags that lock in freshness to eco-friendly wrapping papers that protect the environment, modern food storage solutions offer both convenience and sustainability. Learn how to choose the right products for different types of food, understand the benefits of various storage methods, and discover professional tips for maximizing the shelf life of your ingredients while reducing food waste.",
      excerpt: "Learn how smart food storage solutions can keep your kitchen organized and reduce food waste effectively.",
      featuredImage: "https://plus.unsplash.com/premium_photo-1737073520175-b3303a6e1e76?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isPublished: true,
      publishedAt: new Date('2024-02-01'),
      metaTitle: "Smart Food Storage Solutions | Kitchen Organization Tips",
      metaDescription: "Discover effective food storage solutions to keep your kitchen organized and reduce waste. Professional tips and quality products.",
      tags: ["food storage", "kitchen", "organization", "sustainability"],
      authorName: "Kitchen Expert",
      authorEmail: "kitchen@gavaligroup.com"
    },
    {
      title: "The Ultimate Guide to Kitchen Hygiene and Safety",
      slug: "ultimate-guide-kitchen-hygiene-safety",
      content: "Kitchen hygiene is the cornerstone of food safety and family health. Proper sanitization, regular cleaning routines, and the use of appropriate cleaning products can prevent foodborne illnesses and maintain a safe cooking environment. This comprehensive guide covers everything from daily maintenance tasks to deep cleaning procedures, helping you understand which products work best for different surfaces and situations. We'll explore the importance of temperature control, proper food handling techniques, and the role of quality cleaning supplies in maintaining a hygienic kitchen. Whether you're a home cook or professional chef, these principles and product recommendations will help you create and maintain the cleanest, safest kitchen possible.",
      excerpt: "Master kitchen hygiene with our comprehensive guide to safety practices and the best cleaning products for your culinary space.",
      featuredImage: "https://plus.unsplash.com/premium_photo-1737180621286-c2250ccce178?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      isPublished: true,
      publishedAt: new Date('2024-02-15'),
      metaTitle: "Ultimate Guide to Kitchen Hygiene and Safety | Gavali Group",
      metaDescription: "Complete guide to kitchen hygiene and safety practices. Learn proper cleaning techniques and discover the best products for your kitchen.",
      tags: ["kitchen safety", "hygiene", "cleaning", "food safety"],
      authorName: "Safety Specialist",
      authorEmail: "safety@gavaligroup.com"
    },
    {
      title: "Creating a Healthier Home: Household Cleaning Essentials",
      slug: "creating-healthier-home-household-cleaning-essentials",
      content: "A clean home is a healthy home, and choosing the right cleaning products is essential for creating an environment that promotes well-being for your entire family. From multi-surface cleaners that tackle everyday messes to specialized products for deep cleaning challenges, understanding how different cleaning solutions work can help you maintain a spotless and sanitized living space. This guide explores the science behind effective cleaning, the importance of using appropriate products for different materials and surfaces, and how to develop sustainable cleaning routines that fit your lifestyle. We'll also discuss the benefits of concentrated formulas, eco-friendly options, and professional-grade products that deliver superior results while being safe for your family and pets.",
      excerpt: "Transform your living space with the right household cleaning essentials and create a healthier environment for your family.",
      featuredImage: "https://images.unsplash.com/photo-1558618047-3c8c4d8d123a?w=800&h=450&fit=crop",
      isPublished: true,
      publishedAt: new Date('2024-03-01'),
      metaTitle: "Creating a Healthier Home with Quality Cleaning Products",
      metaDescription: "Discover essential household cleaning products for a healthier home environment. Expert tips and premium cleaning solutions.",
      tags: ["home cleaning", "household", "health", "family safety"],
      authorName: "Home Care Expert",
      authorEmail: "homecare@gavaligroup.com"
    },
    {
      title: "Sustainable Living: Eco-Friendly Cleaning and Hygiene Choices",
      slug: "sustainable-living-eco-friendly-cleaning-hygiene-choices",
      content: "Making environmentally conscious choices in your cleaning and hygiene routines doesn't mean compromising on effectiveness. Today's eco-friendly products combine powerful cleaning action with sustainable ingredients and packaging, allowing you to maintain the highest standards of cleanliness while protecting the planet. This comprehensive exploration of green cleaning solutions covers biodegradable formulas, recyclable packaging, and renewable ingredients that deliver exceptional results without harmful environmental impact. Learn how to identify truly eco-friendly products, understand the benefits of concentrated formulas that reduce packaging waste, and discover how small changes in your product choices can make a significant positive impact on both your home's health and the environment's well-being.",
      excerpt: "Explore eco-friendly cleaning and hygiene products that protect both your family and the environment without compromising effectiveness.",
      featuredImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=450&fit=crop",
      isPublished: true,
      publishedAt: new Date('2024-03-15'),
      metaTitle: "Sustainable Living: Eco-Friendly Cleaning Solutions",
      metaDescription: "Choose eco-friendly cleaning and hygiene products for sustainable living. Protect your family and environment with green solutions.",
      tags: ["sustainability", "eco-friendly", "green cleaning", "environment"],
      authorName: "Sustainability Expert",
      authorEmail: "green@gavaligroup.com"
    }
  ]

  for (const post of blogPosts) {
    await prisma.blogPost.create({
      data: post
    })
    console.log(`✅ Created blog post: "${post.title}"`)
  }
  
  console.log('🌱 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })