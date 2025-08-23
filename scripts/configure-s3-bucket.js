const { S3Client, DeletePublicAccessBlockCommand, PutBucketPolicyCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

const publicReadPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PublicReadGetObject",
      Effect: "Allow",
      Principal: "*",
      Action: "s3:GetObject",
      Resource: `arn:aws:s3:::${BUCKET_NAME}/*`
    }
  ]
};

async function configureS3Bucket() {
  try {
    console.log(`🔧 Configuring S3 bucket: ${BUCKET_NAME}`);
    console.log('='.repeat(50));

    // Step 1: Remove Public Access Block
    console.log('1. Removing Public Access Block...');
    try {
      await s3Client.send(new DeletePublicAccessBlockCommand({
        Bucket: BUCKET_NAME
      }));
      console.log('   ✅ Public Access Block removed successfully');
    } catch (error) {
      if (error.name === 'NoSuchPublicAccessBlockConfiguration') {
        console.log('   ✅ No Public Access Block to remove');
      } else {
        console.log('   ❌ Error removing Public Access Block:', error.message);
        return;
      }
    }

    // Step 2: Add bucket policy
    console.log('2. Adding public read bucket policy...');
    try {
      await s3Client.send(new PutBucketPolicyCommand({
        Bucket: BUCKET_NAME,
        Policy: JSON.stringify(publicReadPolicy)
      }));
      console.log('   ✅ Bucket policy added successfully');
    } catch (error) {
      console.log('   ❌ Error adding bucket policy:', error.message);
      return;
    }

    console.log();
    console.log('🎉 S3 bucket configured successfully!');
    console.log('   - Public access is now enabled');
    console.log('   - Public read policy is applied');
    console.log('   - Images uploaded will be publicly accessible');

  } catch (error) {
    console.error('❌ Configuration failed:', error.message);
  }
}

async function main() {
  console.log('🚀 S3 Bucket Auto-Configuration');
  console.log('='.repeat(50));
  
  if (!BUCKET_NAME || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.log('❌ Missing required environment variables');
    return;
  }

  console.log('⚠️  WARNING: This will make your S3 bucket publicly readable!');
  console.log('   Only objects will be readable, not listable.');
  console.log('   Continue? (This script will proceed in 3 seconds...)');
  
  // Wait 3 seconds before proceeding
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  await configureS3Bucket();
  
  // Run the check script again to verify
  console.log();
  console.log('🔍 Verifying configuration...');
  console.log('─'.repeat(30));
  
  // Re-run the check
  const { execSync } = require('child_process');
  execSync('node scripts/check-s3-bucket.js', { stdio: 'inherit' });
}

main().catch(console.error);