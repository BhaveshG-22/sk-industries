const { S3Client, ListObjectsV2Command, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
require('dotenv').config();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;

async function testAWSConnection() {
  console.log('🧪 Testing AWS S3 Connection');
  console.log('='.repeat(40));
  
  console.log('Environment check:');
  console.log('  AWS_REGION:', process.env.AWS_REGION);
  console.log('  AWS_ACCESS_KEY_ID:', process.env.AWS_ACCESS_KEY_ID ? 'SET' : 'NOT SET');
  console.log('  AWS_SECRET_ACCESS_KEY:', process.env.AWS_SECRET_ACCESS_KEY ? 'SET' : 'NOT SET');
  console.log('  BUCKET_NAME:', BUCKET_NAME);
  console.log();

  try {
    // Test 1: List bucket contents
    console.log('1. Testing bucket access...');
    const listResponse = await s3Client.send(new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      MaxKeys: 5
    }));
    console.log('   ✅ Bucket access successful');
    console.log('   📁 Found', listResponse.Contents?.length || 0, 'objects');

    // Test 2: Generate presigned URL
    console.log('2. Testing presigned URL generation...');
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: 'test-upload.png',
      ContentType: 'image/png'
    });
    
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    console.log('   ✅ Presigned URL generated successfully');
    console.log('   🔗 URL starts with:', uploadUrl.substring(0, 50) + '...');

    // Test 3: Check if we can make a simple PUT request to verify the URL
    console.log('3. Testing upload permissions...');
    const testData = Buffer.from('test data');
    
    try {
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: testData,
        headers: { 'Content-Type': 'image/png' }
      });
      
      if (uploadResponse.ok) {
        console.log('   ✅ Upload test successful');
        console.log('   📤 Test file uploaded to S3');
      } else {
        console.log('   ❌ Upload test failed:', uploadResponse.status, uploadResponse.statusText);
        const errorText = await uploadResponse.text();
        console.log('   Error details:', errorText);
      }
    } catch (uploadError) {
      console.log('   ❌ Upload test error:', uploadError.message);
    }

    console.log();
    console.log('🎉 AWS connection test completed!');

  } catch (error) {
    console.error('❌ AWS connection test failed:');
    console.error('   Error:', error.message);
    console.error('   Code:', error.name);
    
    if (error.name === 'CredentialsProviderError') {
      console.error('   💡 Check your AWS credentials in .env file');
    } else if (error.name === 'NoSuchBucket') {
      console.error('   💡 The S3 bucket does not exist');
    } else if (error.name === 'AccessDenied') {
      console.error('   💡 AWS credentials do not have sufficient permissions');
    }
  }
}

testAWSConnection();