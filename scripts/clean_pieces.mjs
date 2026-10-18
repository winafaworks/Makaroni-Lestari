import sharp from "sharp";
import fs from "fs";
import path from "path";

const pieces = [
  {
    file: "piece_cokelat.webp",
    isBackground: (r, g, b) => {
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const sat = max - min;
      return (min > 110 && sat < 65) || min > 140 || (r > 120 && g > 120 && b > 120);
    }
  },
  {
    file: "piece_balado.webp",
    isBackground: (r, g, b) => {
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const sat = max - min;
      return b > 140 || (min > 165 && sat < 65) || min > 195;
    }
  },
  {
    file: "piece_pedas_gurih.webp",
    isBackground: (r, g, b) => {
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const sat = max - min;
      return b > 145 || (min > 165 && sat < 65) || min > 195;
    }
  },
  {
    file: "piece_jagung_bakar.webp",
    isBackground: (r, g, b) => {
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const sat = max - min;
      return b > 145 || (min > 165 && sat < 65) || min > 195;
    }
  },
  {
    file: "piece_original.webp",
    isBackground: (r, g, b) => {
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const sat = max - min;
      return (b > 160 && sat < 60) || (min > 195 && sat < 60) || min > 220;
    }
  },
  {
    file: "piece_daun_seledri.webp",
    isBackground: (r, g, b) => {
      const min = Math.min(r, g, b);
      const max = Math.max(r, g, b);
      const sat = max - min;
      return (b > 160 && sat < 60) || (min > 195 && sat < 60) || min > 220;
    }
  }
];

async function processPiece({ file, isBackground }) {
  const inputPath = path.join("public", "images", file);
  const inputBuffer = fs.readFileSync(inputPath);
  const { data, info } = await sharp(inputBuffer).raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;

  // Mask: 0 = background/transparent, 1 = macaroni foreground
  const mask = new Uint8Array(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3];

      if (a < 30 || isBackground(r, g, b)) {
        mask[y * w + x] = 0;
      } else {
        mask[y * w + x] = 1;
      }
    }
  }

  // Remove isolated speckles/noise (fewer than 4 foreground neighbors)
  const cleanedMask = new Uint8Array(w * h);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const idx = y * w + x;
      if (mask[idx] === 1) {
        let count = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (mask[(y + dy) * w + (x + dx)] === 1) count++;
          }
        }
        if (count >= 4) {
          cleanedMask[idx] = 1;
        }
      }
    }
  }

  // Defringe boundary pixels and smooth alpha edge
  const outputData = Buffer.from(data);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const pIdx = y * w + x;
      const bIdx = pIdx * 4;

      if (cleanedMask[pIdx] === 0) {
        outputData[bIdx + 3] = 0;
      } else {
        let neighborBgCount = 0;
        let avgR = 0, avgG = 0, avgB = 0, solidCount = 0;

        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy;
            const nx = x + dx;
            if (ny >= 0 && ny < h && nx >= 0 && nx < w) {
              const nIdx = ny * w + nx;
              if (cleanedMask[nIdx] === 0) {
                neighborBgCount++;
              } else {
                avgR += data[nIdx * 4];
                avgG += data[nIdx * 4 + 1];
                avgB += data[nIdx * 4 + 2];
                solidCount++;
              }
            }
          }
        }

        if (neighborBgCount > 0) {
          // Edge feathering and defringing
          const alphaRatio = 1 - (neighborBgCount / 10);
          outputData[bIdx + 3] = Math.max(120, Math.min(255, Math.round(alphaRatio * 255)));

          // Defringe by replacing color with average interior color
          if (solidCount > 0) {
            outputData[bIdx] = Math.round(avgR / solidCount);
            outputData[bIdx + 1] = Math.round(avgG / solidCount);
            outputData[bIdx + 2] = Math.round(avgB / solidCount);
          }
        } else {
          outputData[bIdx + 3] = 255;
        }
      }
    }
  }

  const cleanedImage = sharp(outputData, {
    raw: {
      width: w,
      height: h,
      channels: 4
    }
  }).trim();

  const finalBuffer = await cleanedImage.webp({ quality: 95, alphaQuality: 100 }).toBuffer();

  fs.writeFileSync(path.join("public", "images", file), finalBuffer);
  
  const distDir = path.join("dist", "images");
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, file), finalBuffer);
  }

  console.log(`Successfully cleaned and defringed ${file}`);
}

async function main() {
  for (const piece of pieces) {
    await processPiece(piece);
  }
  console.log("All pieces successfully processed!");
}

main().catch(console.error);
