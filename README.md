# Bitmap Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A collection of Node.js scripts for converting images to monochrome bitmap arrays suitable for various embedded displays, including SSD1306 OLED and Seeed Studio reTerminal E1001 e-ink displays.

## 📋 Overview

This repository provides two specialized bitmap generators:

- **ssd1306Bitmap.js**: Converts images to bitmap arrays for 128x64 SSD1306 OLED displays used in Arduino projects
- **E1001Bitmap.js**: Generates C header files with bitmap data for the 800x480 e-ink display on the reTerminal E1001

Both scripts use the Sharp library for high-performance image processing and produce optimized monochrome bitmaps.

## 🖥️ Supported Displays

### SSD1306 OLED (128x64)
- **Resolution**: 128x64 pixels
- **Format**: Linear bitmap array (packed MSB first)
- **Use Case**: Arduino projects with SSD1306 displays

### reTerminal E1001 (800x480)
- **Resolution**: 800x480 pixels
- **Format**: Linear bitmap in C header file
- **Use Case**: Seeed Studio reTerminal E1001 e-ink display

## 🚀 Getting Started

### Installation

1. Clone the repository or download the scripts
2. Navigate to the project directory
3. Install dependencies:

```sh
npm install
```

### Prerequisites

- Node.js (v14 or higher)
- Sharp library (installed via npm)

## 📖 Usage

### For SSD1306 OLED Displays

1. Place your input image as `image.png` in the project root
2. Run the script:

```sh
node ssd1306Bitmap.js
```

3. The script generates `bitmap.h` containing the bitmap array for Arduino use

**Example Output:**
```c
const uint8_t bitmap[] = {
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
// ... more data
};
```

### For reTerminal E1001 Displays

1. Place your input image as `SEED.png` in the project root
2. Run the script:

```sh
node E1001Bitmap.js
```

3. The script generates `seed800x480.h` - a complete C header file

**Example Output:**
```c
#ifndef SEED800X480_H
#define SEED800X480_H

// Monochrome bitmap: 800x480
#define BITMAP_WIDTH 800
#define BITMAP_HEIGHT 480
const unsigned int bitmap_width = 800;
const unsigned int bitmap_height = 480;
const unsigned int bitmap_byte_count = 48000;
const unsigned char seed800x480[] = {
// ... bitmap data
};

#endif
```

## 🔧 How It Works

Both scripts follow similar processing steps:

1. **Image Loading**: Load and resize input image to target resolution
2. **Grayscale Conversion**: Convert to monochrome using Sharp
3. **Thresholding**: Apply binary threshold (128) for 1-bit conversion
4. **Bit Packing**: Pack 8 pixels into bytes (MSB first for SSD1306, linear for E1001)
5. **Output Generation**: Create C-compatible array or header file

## 📋 Requirements

- **Node.js**: v14+
- **Sharp**: ^0.33.5
- **Input Images**: PNG format recommended
- **Output**: C header files for embedded programming

## 👨‍💻 About the Author

Handy_4ndy is a developer specializing in IoT, embedded systems, and blockchain integrations. They create tools and examples for makers and developers working with ESP32, Arduino, and various display technologies.

### 🔗 Related Projects

- **[ESP32-XRPL](https://github.com/Handy4ndy/ESP32-XRPL)**: ESP32-based XRPL account monitor
- **[reTerminal-E1001-Examples](https://github.com/Handy4ndy/Handy-reTerminal-E1001)**: Arduino examples for reTerminal E1001

## 🤝 Contributing

Contributions welcome! Please:

- Report bugs or issues
- Suggest improvements
- Submit pull requests
- Share your bitmap generation use cases

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

*Built with ❤️ for the embedded development community. Happy coding!*"