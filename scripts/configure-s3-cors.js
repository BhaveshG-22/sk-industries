const { S3Client, PutBucketCorsCommand, GetBucketCorsCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

const corsConfiguration = {
  CORSRules: [
    {
      AllowedHeaders: ['*'],
      AllowedMethods: ['PUT', 'POST', 'GET', 'DELETE'],
      AllowedOrigins: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://*.vercel.app', 'https://www.sk-industries.in'],
      ExposeHeaders: ['ETag'],
      MaxAgeSeconds: 3600,
    },
  ],
};

async function configureS3CORS() {
  try {
    console.log(`🔧 Configuring CORS for S3 bucket: ${BUCKET_NAME}`);
    console.log('='.repeat(50));

    // Check existing CORS configuration
    console.log('1. Checking existing CORS configuration...');
    try {
      const existingCors = await s3Client.send(new GetBucketCorsCommand({
        Bucket: BUCKET_NAME
      }));
      console.log('   Current CORS rules:');
      console.log(JSON.stringify(existingCors.CORSRules, null, 2));
    } catch (error) {
      if (error.name === 'NoSuchCORSConfiguration') {
        console.log('   ✅ No existing CORS configuration found');
      } else {
        console.log('   ❌ Error checking CORS:', error.message);
      }
    }

    // Set CORS configuration
    console.log('2. Setting CORS configuration...');
    try {
      await s3Client.send(new PutBucketCorsCommand({
        Bucket: BUCKET_NAME,
        CORSConfiguration: corsConfiguration
      }));
      console.log('   ✅ CORS configuration applied successfully');
    } catch (error) {
      console.log('   ❌ Error setting CORS:', error.message);
      return;
    }

    // Verify CORS configuration
    console.log('3. Verifying CORS configuration...');
    try {
      const newCors = await s3Client.send(new GetBucketCorsCommand({
        Bucket: BUCKET_NAME
      }));
      console.log('   New CORS rules:');
      console.log(JSON.stringify(newCors.CORSRules, null, 2));
    } catch (error) {
      console.log('   ❌ Error verifying CORS:', error.message);
    }

    console.log();
    console.log('🎉 CORS configured successfully!');
    console.log('   - Direct uploads from browser are now allowed');
    console.log('   - Supports localhost development and production domains');
    console.log('   - Test the image upload feature now');

  } catch (error) {
    console.error('❌ CORS configuration failed:', error.message);
  }
}

async function main() {
  console.log('🚀 S3 CORS Configuration');
  console.log('='.repeat(50));
  
  if (!BUCKET_NAME || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.log('❌ Missing required environment variables');
    return;
  }

  await configureS3CORS();
}

main().catch(console.error);