import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const srcDir = './asset/kemasan lainnya';
const destDir = './public/images/kemasan_lainnya';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
console.log('Processing files:', files);

for (const file of files) {
  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, file);
  
  // 1. Copy original
  fs.copyFileSync(srcPath, destPath);
  
  // 2. Also generate optimized webp if not already webp
  const ext = path.extname(file);
  const base = path.basename(file, ext);
  const webpPath = path.join(destDir, `${base}.webp`);
  
  try {
    const meta = await sharp(srcPath).metadata();
    console.log(`${file}: ${meta.width}x${meta.height}, format: ${meta.format}`);
    
    await sharp(srcPath)
      .resize({ width: Math.min(meta.width || 1200, 1200), withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(webpPath);
      
    console.log(`Generated: ${webpPath}`);
  } catch (err) {
    console.error(`Error processing ${file}:`, err);
  }
}

console.log('All images processed successfully.');
