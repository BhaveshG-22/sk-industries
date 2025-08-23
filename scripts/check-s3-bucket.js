const { S3Client, GetBucketPolicyCommand, GetPublicAccessBlockCommand, PutBucketPolicyCommand, DeletePublicAccessBlockCommand } = require('@aws-sdk/client-s3');
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

async function checkAndConfigureBucket() {
  try {
    console.log(`🔍 Checking S3 bucket: ${BUCKET_NAME}`);
    console.log('─'.repeat(50));

    // 1. Check Public Access Block settings
    console.log('1. Checking Public Access Block settings...');
    try {
      const publicAccessBlockResponse = await s3Client.send(
        new GetPublicAccessBlockCommand({ Bucket: BUCKET_NAME })
      );
      
      const pab = publicAccessBlockResponse.PublicAccessBlockConfiguration;
      console.log('   Current Public Access Block settings:');
      console.log(`   - BlockPublicAcls: ${pab.BlockPublicAcls}`);
      console.log(`   - IgnorePublicAcls: ${pab.IgnorePublicAcls}`);
      console.log(`   - BlockPublicPolicy: ${pab.BlockPublicPolicy}`);
      console.log(`   - RestrictPublicBuckets: ${pab.RestrictPublicBuckets}`);

      const hasPublicAccess = !pab.BlockPublicAcls && !pab.IgnorePublicAcls && 
                             !pab.BlockPublicPolicy && !pab.RestrictPublicBuckets;
      
      if (hasPublicAccess) {
        console.log('   ✅ Public access is allowed');
      } else {
        console.log('   ❌ Public access is blocked');
        console.log('   💡 To fix: Disable "Block all public access" in AWS Console');
        console.log('   💡 Or run: aws s3api delete-public-access-block --bucket', BUCKET_NAME);
      }
    } catch (error) {
      if (error.name === 'NoSuchPublicAccessBlockConfiguration') {
        console.log('   ✅ No Public Access Block configured (public access allowed)');
      } else {
        console.log('   ❌ Error checking Public Access Block:', error.message);
      }
    }

    console.log();

    // 2. Check bucket policy
    console.log('2. Checking bucket policy...');
    try {
      const policyResponse = await s3Client.send(
        new GetBucketPolicyCommand({ Bucket: BUCKET_NAME })
      );
      
      const policy = JSON.parse(policyResponse.Policy);
      console.log('   Current bucket policy:');
      console.log(JSON.stringify(policy, null, 2));

      // Check if it has public read access
      const hasPublicRead = policy.Statement.some(stmt => 
        stmt.Effect === 'Allow' && 
        stmt.Principal === '*' && 
        (stmt.Action === 's3:GetObject' || stmt.Action.includes('s3:GetObject'))
      );

      if (hasPublicRead) {
        console.log('   ✅ Bucket policy allows public read access');
      } else {
        console.log('   ❌ Bucket policy does not allow public read access');
        console.log('   💡 Suggested policy:');
        console.log(JSON.stringify(publicReadPolicy, null, 2));
      }
    } catch (error) {
      if (error.name === 'NoSuchBucketPolicy') {
        console.log('   ❌ No bucket policy configured');
        console.log('   💡 Suggested policy to add:');
        console.log(JSON.stringify(publicReadPolicy, null, 2));
      } else {
        console.log('   ❌ Error checking bucket policy:', error.message);
      }
    }

    console.log();

    // 3. Test URL accessibility
    console.log('3. Testing public URL accessibility...');
    const testImageUrl = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/test-image.jpg`;
    console.log(`   Test URL format: ${testImageUrl}`);
    
    try {
      const response = await fetch(testImageUrl, { method: 'HEAD' });
      if (response.ok) {
        console.log('   ✅ Test URL is accessible');
      } else {
        console.log(`   ❌ Test URL returned status: ${response.status}`);
      }
    } catch (error) {
      console.log('   ❌ Test URL is not accessible:', error.message);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.message.includes('The specified bucket does not exist')) {
      console.log('💡 The bucket does not exist. Create it first:');
      console.log(`   aws s3 mb s3://${BUCKET_NAME} --region ${process.env.AWS_REGION}`);
    }
  }
}

async function main() {
  console.log('🚀 S3 Bucket Configuration Checker');
  console.log('='.repeat(50));
  
  if (!BUCKET_NAME || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.log('❌ Missing required environment variables:');
    console.log('   - AWS_S3_BUCKET_NAME');
    console.log('   - AWS_ACCESS_KEY_ID'); 
    console.log('   - AWS_SECRET_ACCESS_KEY');
    console.log('   - AWS_REGION');
    return;
  }

  await checkAndConfigureBucket();
  
  console.log();
  console.log('📋 Summary:');
  console.log('- Ensure "Block all public access" is disabled in AWS Console');
  console.log('- Add the suggested bucket policy for public read access');
  console.log('- Test image uploads through the admin interface');
}

main().catch(console.error);