// Bitmap generator for SSD1306 OLED displays (128x64)
// Converts an image to a monochrome bitmap in the format expected by SSD1306
// Usage: node ssd1306Bitmap.js (requires 'image.png' in the same directory)

const sharp = require('sharp');
const fs = require('fs');

// Input image file and output file name
const inputImage = 'image.png';
const outputFileName = 'bitmap.h';

// Process the image using sharp
sharp(inputImage)

  .resize(128, 64) // Resize the image to 128x64 pixels
  .greyscale() // Convert the image to greyscale
  .raw() // Get raw pixel data
  .toBuffer() // Convert the image to a buffer

  .then(data => {
    let bitmapArray = [];
    
    // Convert pixel data to a binary array
    for (let i = 0; i < data.length; i++) {
      const brightness = data[i] < 128 ? 1 : 0; 
      bitmapArray.push(brightness);
    }

    // Convert binary array to C array format
    let bitmapCArray = 'const uint8_t bitmap[] = {\n';
    for (let i = 0; i < bitmapArray.length; i += 8) {
      let byte = 0;
      for (let bit = 0; bit < 8; bit++) {
        byte |= (bitmapArray[i + bit] << (7 - bit)); // Pack 8 bits into a byte
      }
      bitmapCArray += `0x${byte.toString(16).padStart(2, '0')}, `; 
      if ((i / 8 + 1) % 16 === 0) bitmapCArray += '\n'; // Add newline every 16 bytes
    }
    bitmapCArray += '};\n';

    // Write the C array to the output file
    fs.writeFileSync(outputFileName, bitmapCArray);
    console.log('Bitmap array saved to', outputFileName);
  })
  .catch(err => {
    console.error('Error processing image:', err); 
  });