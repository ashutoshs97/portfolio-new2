import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = 'public/images';
const files = fs.readdirSync(dir);

async function optimizeImages() {
  for (const file of files) {
    if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const inputPath = path.join(dir, file);
      const parsed = path.parse(file);
      const outputPath = path.join(dir, parsed.name + '.webp');

      console.log(`Processing ${file}...`);
      
      try {
        await sharp(inputPath)
          .resize({ width: 1920, withoutEnlargement: true }) // Scale down huge mockups to max 1920px wide
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        console.log(`Saved ${parsed.name}.webp`);
        fs.unlinkSync(inputPath); // delete old file
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
  console.log('Done optimizing images.');
}

optimizeImages();
