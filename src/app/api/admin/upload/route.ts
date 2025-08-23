import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { v4 as uuidv4 } from 'uuid'

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function POST(request: Request) {
  try {
    const { fileName, fileType, uploadType = 'products' } = await request.json()
    
    if (!fileName || !fileType) {
      return NextResponse.json({ error: 'fileName and fileType are required' }, { status: 400 })
    }

    // Validate uploadType
    const validUploadTypes = ['products', 'blog-images']
    if (!validUploadTypes.includes(uploadType)) {
      return NextResponse.json({ error: 'Invalid uploadType. Must be "products" or "blog-images"' }, { status: 400 })
    }

    // Generate unique filename with appropriate folder
    const fileExtension = fileName.split('.').pop()
    const uniqueFileName = `${uploadType}/${uuidv4()}.${fileExtension}`

    // Create pre-signed URL for upload
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: uniqueFileName,
      ContentType: fileType,
    })

    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

    // Generate public URL (will be accessible after upload)
    const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`

    return NextResponse.json({
      success: true,
      uploadUrl,
      imageUrl,
      fileName: uniqueFileName,
    })
  } catch (error) {
    console.error('Error generating presigned URL:', error)
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    )
  }
}