import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary (User needs to add API keys here if not in env)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'daybrhbsc',
  api_key: process.env.CLOUDINARY_API_KEY || 'YOUR_API_KEY_HERE',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'YOUR_API_SECRET_HERE',
});

const inputDir = path.join(process.cwd(), 'public', 'prisma2.0-images');
const outputDir = path.join(process.cwd(), 'public', 'prisma2.0-webp');

async function processImages() {
  try {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.jpg') || file.endsWith('.png'));
    
    // Sort files correctly (prisma2.0-1, prisma2.0-2, ... prisma2.0-10)
    files.sort((a, b) => {
      const numA = parseInt(a.match(/(\d+)\.jpg/)[1]);
      const numB = parseInt(b.match(/(\d+)\.jpg/)[1]);
      return numA - numB;
    });

    console.log(`Found ${files.length} images. Starting conversion to WebP...`);

    const convertedFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const inputPath = path.join(inputDir, file);
      const pageNum = file.match(/(\d+)\.jpg/)[1];
      const outputFilename = `prisma2.0-page-${pageNum.padStart(4, '0')}.webp`;
      const outputPath = path.join(outputDir, outputFilename);

      // Convert to WebP
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      convertedFiles.push(outputPath);
      console.log(`[${i + 1}/${files.length}] Converted ${file} -> ${outputFilename}`);
    }

    console.log('✅ Conversion to WebP complete! Images are in public/prisma2.0-webp/');
    console.log('\n--- CLOUDINARY UPLOAD ---');
    console.log('To automatically upload these to Cloudinary and delete the local folders, you need your Cloudinary API Key and Secret.');
    console.log('If you have them, please add them to the top of this script and uncomment the upload code below.');

    /*
    // --- UNCOMMENT BELOW TO ENABLE CLOUDINARY UPLOAD ---
    
    console.log('Starting Cloudinary Upload...');
    for (const filePath of convertedFiles) {
      const filename = path.basename(filePath, '.webp');
      const res = await cloudinary.uploader.upload(filePath, {
        folder: 'prisma2.0-pages',
        public_id: filename,
        format: 'webp',
      });
      console.log(`Uploaded ${filename} to ${res.secure_url}`);
    }
    
    console.log('✅ Upload complete! You can now safely delete the local image folders.');
    // fs.rmSync(inputDir, { recursive: true, force: true });
    // fs.rmSync(outputDir, { recursive: true, force: true });
    */

  } catch (error) {
    console.error('Error during processing:', error);
  }
}

processImages();
