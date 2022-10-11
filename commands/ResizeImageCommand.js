const sharp = require("sharp");
const { Command } = require("./Command");
const fs = require("fs");
const { join } = require("path");

class ResizeImage extends Command {
  constructor() {
    super("ri", "resize images", [
      ["<path>"],
      ["<width>"],
      ["<height>"],
      ["<format>"],
    ]);
  }

  action(pathInput, width, height, format) {
    const files = fs.readdirSync(pathInput);

    files.forEach(async (file) => {
      try {
        const image = sharp(join(pathInput, file));
        image[format]({ quality: 80 }); // set quality based on format

        await image
          .resize({ height: Number(height), width: Number(width) }) // resize dimension of image
          .toFile(`${file.split(".")[0]}.${format}`); // changing the extension of file to given format
      } catch (err) {
        console.error(`Failed to resize ${file} :: ${err.message}`);
      }
    });
    this.result = fs.readdirSync(pathInput);
  }
}

module.exports = ResizeImage;
