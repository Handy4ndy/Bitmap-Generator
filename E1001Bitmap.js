// Bitmap generator for Seeed Studio reTerminal E1001 (800x480)
// Converts an image to a monochrome bitmap header file
// Usage: node E1001Bitmap.js (requires 'SEED.png' in the same directory)

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');


// Configurable parameters
const inputImage = 'SEED.png'; // Input image file
const outputHeader = 'seed800x480.h'; // Output header file
const targetWidth = 800;
const targetHeight = 480;
const arrayName = 'seed800x480';

// Helper: Pack 8 bits into a byte (MSB first)
function packBitsToBytes(bits) {
  const bytes = [];
  for (let i = 0; i < bits.length; i += 8) {
    let byte = 0;
    for (let b = 0; b < 8; b++) {
      if (i + b < bits.length) {
        byte |= (bits[i + b] & 1) << (7 - b);
      }
    }
    bytes.push(byte);
  }
  return bytes;
}

// Main processing
sharp(inputImage)
  .resize(targetWidth, targetHeight, {
    fit: 'fill',
    kernel: 'lanczos3',
    background: { r: 255, g: 255, b: 255, alpha: 1 }
  })
  .greyscale()
  .raw()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    // Threshold to 1-bit (monochrome)
    const bits = [];
    for (let i = 0; i < data.length; i++) {
      bits.push(data[i] < 128 ? 0 : 1); // 0=black, 1=white
    }
    const bytes = packBitsToBytes(bits);

    // Generate C header content
    let header = `#ifndef ${arrayName.toUpperCase()}_H\n`;
    header += `#define ${arrayName.toUpperCase()}_H\n\n`;
    header += `// Monochrome bitmap: ${targetWidth}x${targetHeight}\n`;
    header += `#define BITMAP_WIDTH ${targetWidth}\n`;
    header += `#define BITMAP_HEIGHT ${targetHeight}\n`;
    header += `const unsigned int bitmap_width = ${targetWidth};\n`;
    header += `const unsigned int bitmap_height = ${targetHeight};\n`;
    header += `const unsigned int bitmap_byte_count = ${bytes.length};\n`;
    header += `const unsigned char ${arrayName}[] = {\n`;
    for (let i = 0; i < bytes.length; i++) {
      header += `0x${bytes[i].toString(16).padStart(2, '0')},`;
      if ((i + 1) % 16 === 0) header += '\n';
    }
    header = header.replace(/,$/, '');
    header += '\n};\n\n#endif\n';

    fs.writeFileSync(outputHeader, header);
    console.log(`Header file generated: ${outputHeader} (${bytes.length} bytes)`);
  })
  .catch(err => {
    console.error('Error:', err);
  });
