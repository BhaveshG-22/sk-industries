const { S3Client, PutBucketPolicyCommand, GetBucketPolicyCommand, PutBucketAclCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

// Bucket policy to allow public read access and authenticated uploads
const bucketPolicy = {
  Version: "2012-10-17",
  Statement: [
    {
      Sid: "PublicReadGetObject",
      Effect: "Allow",
      Principal: "*",
      Action: "s3:GetObject",
      Resource: `arn:aws:s3:::${BUCKET_NAME}/*`
    },
    {
      Sid: "AllowAuthenticatedUploads",
      Effect: "Allow",
      Principal: {
        AWS: `arn:aws:iam::*:user/*`
      },
      Action: [
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      Resource: `arn:aws:s3:::${BUCKET_NAME}/*`
    }
  ]
};

async function fixS3Permissions() {
  try {
    console.log('🔧 Fixing S3 bucket permissions...');
    console.log('='.repeat(50));

    // 1. Set bucket policy for public read access
    console.log('1. Setting bucket policy...');
    try {
      await s3Client.send(new PutBucketPolicyCommand({
        Bucket: BUCKET_NAME,
        Policy: JSON.stringify(bucketPolicy)
      }));
      console.log('   ✅ Bucket policy set successfully');
    } catch (error) {
      console.log('   ❌ Error setting bucket policy:', error.message);
    }

    // 2. Verify bucket policy
    console.log('2. Verifying bucket policy...');
    try {
      const policy = await s3Client.send(new GetBucketPolicyCommand({
        Bucket: BUCKET_NAME
      }));
      console.log('   ✅ Current bucket policy:');
      console.log('   ', policy.Policy);
    } catch (error) {
      console.log('   ❌ Error getting bucket policy:', error.message);
    }

    console.log();
    console.log('🎉 S3 permissions updated!');
    console.log('   - Public read access enabled');
    console.log('   - Authenticated uploads allowed');
    console.log('   - Test the image upload again');

  } catch (error) {
    console.error('❌ Permission fix failed:', error.message);
  }
}

async function main() {
  console.log('🚀 S3 Permission Fix');
  
  if (!BUCKET_NAME || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.log('❌ Missing required environment variables');
    return;
  }

  await fixS3Permissions();
}

main().catch(console.error);