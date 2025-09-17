const { S3Client, CreateBucketCommand, PutBucketCorsCommand, GetBucketCorsCommand, HeadBucketCommand } = require('@aws-sdk/client-s3');
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
      AllowedOrigins: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002', 'https://*.vercel.app', 'https://www.sk-group.com'],
      ExposeHeaders: ['ETag'],
      MaxAgeSeconds: 3600,
    },
  ],
};

async function checkBucketExists() {
  try {
    await s3Client.send(new HeadBucketCommand({ Bucket: BUCKET_NAME }));
    return true;
  } catch (error) {
    if (error.name === 'NotFound' || error.$metadata?.httpStatusCode === 404) {
      return false;
    }
    throw error;
  }
}

async function createS3Bucket() {
  try {
    console.log(`🪣 Creating S3 bucket: ${BUCKET_NAME}`);
    
    const createParams = {
      Bucket: BUCKET_NAME,
      CreateBucketConfiguration: process.env.AWS_REGION === 'us-east-1' ? undefined : {
        LocationConstraint: process.env.AWS_REGION
      }
    };

    await s3Client.send(new CreateBucketCommand(createParams));
    console.log('   ✅ S3 bucket created successfully');
    
    // Wait a bit for bucket to be available
    await new Promise(resolve => setTimeout(resolve, 2000));
    
  } catch (error) {
    if (error.name === 'BucketAlreadyOwnedByYou') {
      console.log('   ✅ Bucket already exists and is owned by you');
    } else if (error.name === 'BucketAlreadyExists') {
      console.log('   ❌ Bucket already exists but is owned by someone else');
      throw error;
    } else {
      console.log('   ❌ Error creating bucket:', error.message);
      throw error;
    }
  }
}

async function configureS3CORS() {
  try {
    console.log(`🔧 Configuring CORS for S3 bucket: ${BUCKET_NAME}`);

    // Set CORS configuration
    console.log('1. Setting CORS configuration...');
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
    console.log('2. Verifying CORS configuration...');
    try {
      const newCors = await s3Client.send(new GetBucketCorsCommand({
        Bucket: BUCKET_NAME
      }));
      console.log('   ✅ CORS rules verified:');
      console.log('   ', JSON.stringify(newCors.CORSRules, null, 2));
    } catch (error) {
      console.log('   ❌ Error verifying CORS:', error.message);
    }

  } catch (error) {
    console.error('❌ CORS configuration failed:', error.message);
  }
}

async function main() {
  console.log('🚀 S3 Bucket Setup and CORS Configuration');
  console.log('='.repeat(50));
  
  if (!BUCKET_NAME || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION) {
    console.log('❌ Missing required environment variables:');
    console.log('   BUCKET_NAME:', !!BUCKET_NAME);
    console.log('   AWS_ACCESS_KEY_ID:', !!process.env.AWS_ACCESS_KEY_ID);
    console.log('   AWS_SECRET_ACCESS_KEY:', !!process.env.AWS_SECRET_ACCESS_KEY);
    console.log('   AWS_REGION:', !!process.env.AWS_REGION);
    return;
  }

  try {
    // Check if bucket exists
    console.log('🔍 Checking if bucket exists...');
    const bucketExists = await checkBucketExists();
    
    if (!bucketExists) {
      console.log('   Bucket does not exist, creating...');
      await createS3Bucket();
    } else {
      console.log('   ✅ Bucket already exists');
    }

    // Configure CORS
    await configureS3CORS();

    console.log();
    console.log('🎉 S3 setup completed successfully!');
    console.log('   - Bucket is ready for uploads');
    console.log('   - CORS configured for web uploads');
    console.log('   - Test the image upload feature now');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.error('Full error:', error);
  }
}

main().catch(console.error);