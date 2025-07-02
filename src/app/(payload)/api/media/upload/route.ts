import { NextRequest, NextResponse } from 'next/server'
import { getPayloadClient } from '@/lib/payloadClient'
import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

// Disable Next.js default body parser to handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export async function POST(request: NextRequest) {
  try {
    const payload = getPayloadClient()

    const form = new formidable.IncomingForm({
      maxFileSize: MAX_FILE_SIZE,
      multiples: false,
      keepExtensions: true,
    })

    const data = await new Promise<{ files: formidable.File[] }>((resolve, reject) => {
      form.parse(request, (err, fields, files) => {
        if (err) {
          reject(err)
          return
        }
        // formidable returns files as object, convert to array
        const fileArray = Array.isArray(files.file) ? files.file : [files.file]
        resolve({ files: fileArray })
      })
    })

    if (!data.files || data.files.length === 0) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const file = data.files[0]

    if (!ALLOWED_MIME_TYPES.includes(file.mimetype || '')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File size exceeds limit' }, { status: 400 })
    }

    // Read file buffer
    const fileBuffer = fs.readFileSync(file.filepath)

    // Create media document in Payload CMS
    const mediaDoc = await payload.create({
      collection: 'media',
      data: {
        filename: file.originalFilename,
        mimeType: file.mimetype,
        filesize: file.size,
      },
      file: {
        data: fileBuffer,
        filename: file.originalFilename || 'upload',
        mimetype: file.mimetype || 'application/octet-stream',
      },
    })

    return NextResponse.json({ media: mediaDoc })
  } catch (error) {
    console.error('File upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
