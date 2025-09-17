const { 
  S3Client, 
  GetPublicAccessBlockCommand, 
  PutPublicAccessBlockCommand,
  PutBucketPolicyCommand,
  GetBucketPolicyCommand,
  DeletePublicAccessBlockCommand 
} = require('@aws-sdk/client-s3');
require('dotenv').config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

// Simple bucket policy for public read access
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

async function checkPublicAccessBlock() {
  try {
    console.log('🔍 Checking current public access block settings...');
    const response = await s3Client.send(new GetPublicAccessBlockCommand({
      Bucket: BUCKET_NAME
    }));
    
    const pab = response.PublicAccessBlockConfiguration;
    console.log('   Current settings:');
    console.log('   - BlockPublicAcls:', pab?.BlockPublicAcls ?? 'not set');
    console.log('   - IgnorePublicAcls:', pab?.IgnorePublicAcls ?? 'not set');
    console.log('   - BlockPublicPolicy:', pab?.BlockPublicPolicy ?? 'not set');
    console.log('   - RestrictPublicBuckets:', pab?.RestrictPublicBuckets ?? 'not set');
    
    return pab;
  } catch (error) {
    if (error.name === 'NoSuchPublicAccessBlockConfiguration') {
      console.log('   ✅ No public access block configuration (public access allowed)');
      return null;
    }
    console.log('   ❌ Error checking public access block:', error.message);
    throw error;
  }
}

async function enablePublicAccess() {
  try {
    console.log('🔓 Enabling public access...');
    
    // Remove public access block entirely
    await s3Client.send(new DeletePublicAccessBlockCommand({
      Bucket: BUCKET_NAME
    }));
    
    console.log('   ✅ Public access block removed');
    
    // Wait a moment for the change to propagate
    await new Promise(resolve => setTimeout(resolve, 2000));
    
  } catch (error) {
    if (error.name === 'NoSuchPublicAccessBlockConfiguration') {
      console.log('   ✅ No public access block to remove');
    } else {
      console.log('   ❌ Error removing public access block:', error.message);
      throw error;
    }
  }
}

async function setBucketPolicy() {
  try {
    console.log('📋 Setting bucket policy for public read access...');
    
    await s3Client.send(new PutBucketPolicyCommand({
      Bucket: BUCKET_NAME,
      Policy: JSON.stringify(publicReadPolicy, null, 2)
    }));
    
    console.log('   ✅ Bucket policy set successfully');
    
  } catch (error) {
    console.log('   ❌ Error setting bucket policy:', error.message);
    throw error;
  }
}

async function verifyPublicAccess() {
  try {
    console.log('🧪 Verifying public access...');
    
    // Check if bucket policy exists
    const policy = await s3Client.send(new GetBucketPolicyCommand({
      Bucket: BUCKET_NAME
    }));
    
    console.log('   ✅ Bucket policy exists');
    console.log('   📄 Policy:', JSON.stringify(JSON.parse(policy.Policy), null, 2));
    
    // Test public access with a sample URL
    const testUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/test-upload.png`;
    console.log('   🔗 Test URL:', testUrl);
    
    try {
      const response = await fetch(testUrl, { method: 'HEAD' });
      if (response.ok) {
        console.log('   ✅ Public access test successful');
      } else if (response.status === 404) {
        console.log('   ✅ Public access working (file not found is expected)');
      } else {
        console.log('   ⚠️  Public access test returned:', response.status, response.statusText);
      }
    } catch (fetchError) {
      console.log('   ⚠️  Could not test public access:', fetchError.message);
    }
    
  } catch (error) {
    if (error.name === 'NoSuchBucketPolicy') {
      console.log('   ❌ No bucket policy found');
    } else {
      console.log('   ❌ Error verifying public access:', error.message);
    }
  }
}

async function main() {
  console.log('🚀 S3 Public Access Configuration');
  console.log('='.repeat(50));
  console.log(`Bucket: ${BUCKET_NAME}`);
  console.log();
  
  if (!BUCKET_NAME || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.log('❌ Missing required environment variables');
    return;
  }

  try {
    // Step 1: Check current public access block
    const currentPAB = await checkPublicAccessBlock();
    
    // Step 2: Enable public access if blocked
    if (currentPAB && (currentPAB.BlockPublicAcls || currentPAB.BlockPublicPolicy || 
                      currentPAB.IgnorePublicAcls || currentPAB.RestrictPublicBuckets)) {
      console.log('   🔒 Public access is currently blocked');
      await enablePublicAccess();
    } else {
      console.log('   🔓 Public access is already enabled');
    }
    
    // Step 3: Set bucket policy for public read
    await setBucketPolicy();
    
    // Step 4: Verify the configuration
    await verifyPublicAccess();
    
    console.log();
    console.log('🎉 S3 public access configured successfully!');
    console.log('   - Public access block: DISABLED');
    console.log('   - Bucket policy: PUBLIC READ enabled');
    console.log('   - Uploaded images should now be publicly accessible');
    console.log();
    console.log('💡 Test by uploading an image and accessing its S3 URL directly');
    
  } catch (error) {
    console.error('❌ Failed to configure public access:', error.message);
    console.error('Full error:', error);
  }
}

main().catch(console.error);