import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'db9l85phg',
  api_key: '664826733568731',
  api_secret: 'uMOARWVXpLjae8X4I_zGhaCOCSI',
});

async function uploadFolder(inputDir, cloudinaryFolder, filePrefix, isAlreadyWebp) {
  if (!fs.existsSync(inputDir)) {
    console.log(`Directory ${inputDir} does not exist, skipping...`);
    return [];
  }

  const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.webp'));
  
  // Sort files correctly based on number
  files.sort((a, b) => {
    const numA = parseInt(a.match(/(\d+)\.(jpg|webp|png)/)[1]);
    const numB = parseInt(b.match(/(\d+)\.(jpg|webp|png)/)[1]);
    return numA - numB;
  });

  console.log(`Found ${files.length} images in ${inputDir}. Starting upload to Cloudinary...`);
  const uploadedUrls = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inputPath = path.join(inputDir, file);
    const pageNum = file.match(/(\d+)\.(jpg|webp|png)/)[1];
    
    // We will upload it directly, and Cloudinary can convert or store it
    const publicId = `${filePrefix}-page-${pageNum.padStart(4, '0')}`;

    console.log(`[${i + 1}/${files.length}] Uploading ${file} to Cloudinary...`);
    
    let uploadPath = inputPath;
    
    // Convert to webp on the fly if it's not already webp
    if (!isAlreadyWebp) {
        const tempPath = inputPath + '.webp';
        await sharp(inputPath).webp({ quality: 80 }).toFile(tempPath);
        uploadPath = tempPath;
    }

    try {
        const res = await cloudinary.uploader.upload(uploadPath, {
            folder: cloudinaryFolder,
            public_id: publicId,
            format: 'webp',
            overwrite: true
        });
        
        uploadedUrls.push(res.secure_url);
        console.log(`Uploaded to ${res.secure_url}`);
        
        // Clean up temp file
        if (!isAlreadyWebp && fs.existsSync(uploadPath)) {
            fs.unlinkSync(uploadPath);
        }
    } catch (err) {
        console.error(`Failed to upload ${file}`, err);
    }
  }
  return uploadedUrls;
}

async function main() {
    console.log("=== UPLOADING PRISMA 1.0 ===");
    const urls1 = await uploadFolder(
        path.join(process.cwd(), 'public', 'prisma-images'),
        'prisma1.0-pages',
        'prisma1.0',
        false // JPGs
    );
    if (urls1.length > 0) {
        fs.writeFileSync('prisma1_urls.json', JSON.stringify(urls1, null, 2));
    }

    console.log("\n=== UPLOADING PRISMA 2.0 ===");
    const urls2 = await uploadFolder(
        path.join(process.cwd(), 'public', 'prisma2.0-webp'),
        'prisma2.0-pages',
        'prisma2.0',
        true // Already WEBP
    );
    if (urls2.length > 0) {
        fs.writeFileSync('prisma2_urls.json', JSON.stringify(urls2, null, 2));
    }
    
    console.log('Uploads complete! Check prisma1_urls.json and prisma2_urls.json');
}

main();
