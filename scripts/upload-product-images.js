const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

// Product image mapping
const productImages = [
  {
    localPath: '/Users/bhaveshgavali/Desktop/OpenSource/gavaligroup/public/250ml-gg.png',
    s3Key: 'products/250ml-container.png',
    description: '250ml Container'
  },
  {
    localPath: '/Users/bhaveshgavali/Desktop/OpenSource/gavaligroup/public/450ml-gg.png',
    s3Key: 'products/450ml-container.png',
    description: '450ml Container'
  },
  {
    localPath: '/Users/bhaveshgavali/Desktop/OpenSource/gavaligroup/public/600ml-gg.png',
    s3Key: 'products/600ml-container.png',
    description: '600ml Container'
  },
  {
    localPath: '/Users/bhaveshgavali/Desktop/OpenSource/gavaligroup/public/600ml2-gg.png',
    s3Key: 'products/600ml-oval-container.png',
    description: '600ml Oval Container'
  },
  {
    localPath: '/Users/bhaveshgavali/Desktop/OpenSource/gavaligroup/public/750ml-gg.png',
    s3Key: 'products/750ml-container.png',
    description: '750ml Container'
  }
];

async function uploadImageToS3(localPath, s3Key, description) {
  try {
    console.log(`📤 Uploading ${description}...`);
    
    // Check if file exists
    if (!fs.existsSync(localPath)) {
      console.log(`   ❌ File not found: ${localPath}`);
      return null;
    }

    // Read the file
    const fileContent = fs.readFileSync(localPath);
    const fileExtension = path.extname(localPath).toLowerCase();
    
    // Determine content type
    let contentType = 'application/octet-stream';
    switch (fileExtension) {
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      case '.webp':
        contentType = 'image/webp';
        break;
    }

    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: s3Key,
      Body: fileContent,
      ContentType: contentType,
      CacheControl: 'max-age=31536000', // Cache for 1 year
    });

    await s3Client.send(command);
    
    const publicUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;
    console.log(`   ✅ Uploaded successfully`);
    console.log(`   🔗 Public URL: ${publicUrl}`);
    
    return publicUrl;
  } catch (error) {
    console.log(`   ❌ Upload failed: ${error.message}`);
    return null;
  }
}

async function uploadAllImages() {
  console.log('🚀 Product Image Upload Script');
  console.log('='.repeat(50));
  
  if (!BUCKET_NAME || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.log('❌ Missing required environment variables');
    return;
  }

  console.log(`📦 Target S3 Bucket: ${BUCKET_NAME}`);
  console.log(`🌍 AWS Region: ${process.env.AWS_REGION}`);
  console.log();

  const uploadResults = [];

  for (const image of productImages) {
    const publicUrl = await uploadImageToS3(image.localPath, image.s3Key, image.description);
    uploadResults.push({
      ...image,
      publicUrl,
      success: !!publicUrl
    });
    console.log();
  }

  // Summary
  console.log('📊 Upload Summary');
  console.log('='.repeat(30));
  
  const successful = uploadResults.filter(r => r.success);
  const failed = uploadResults.filter(r => !r.success);
  
  console.log(`✅ Successful uploads: ${successful.length}`);
  console.log(`❌ Failed uploads: ${failed.length}`);
  console.log();

  if (successful.length > 0) {
    console.log('🔗 Public URLs for successful uploads:');
    console.log('-'.repeat(40));
    successful.forEach(result => {
      console.log(`${result.description}:`);
      console.log(`   ${result.publicUrl}`);
      console.log();
    });
  }

  if (failed.length > 0) {
    console.log('❌ Failed uploads:');
    console.log('-'.repeat(20));
    failed.forEach(result => {
      console.log(`${result.description}: ${result.localPath}`);
    });
  }

  // Generate code snippet for updating the component
  if (successful.length > 0) {
    console.log('💻 Code snippet for FeaturedProducts component:');
    console.log('-'.repeat(50));
    console.log('// Replace the image URLs in your component:');
    successful.forEach((result, index) => {
      console.log(`// Product ${index + 1} (${result.description}):`);
      console.log(`image: "${result.publicUrl}",`);
    });
  }
}

// Allow running with custom image paths via command line
function parseArgs() {
  const args = process.argv.slice(2);
  
  if (args.length >= 2) {
    const customLocalPath = args[0];
    const customS3Key = args[1];
    const customDescription = args[2] || path.basename(customLocalPath);
    
    productImages.length = 0; // Clear existing
    productImages.push({
      localPath: customLocalPath,
      s3Key: customS3Key,
      description: customDescription
    });
  }
}

// Main execution
async function main() {
  parseArgs();
  await uploadAllImages();
}

// Usage examples in comments
console.log('💡 Usage Examples:');
console.log('   Default: node scripts/upload-product-images.js');
console.log('   Custom:  node scripts/upload-product-images.js "/path/to/image.png" "products/my-image.png" "My Product"');
console.log();

main().catch(console.error);