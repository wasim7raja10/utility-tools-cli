const sharp = require("sharp");
const { Command } = require("./Command");
const fs = require("fs");
const { join } = require("path");

class ResizeImage extends Command {
<<<<<<< HEAD
  constructor() {
    super("ri", "resize images", [["<path>"]]);
  }

  action(pathInput) {
    const temp = "/";
    const files = fs.readdirSync(pathInput);

    files.forEach(async file => {
      await sharp(pathInput + temp + file)
        .webp({ quality: 80 }) // converting to webp format
        .resize({ height: 427, width: 640 }) // resize dimension of image
        .toFile(file.split(".")[0] + ".webp"); // changing the extension of file to .webp
    });
    this.result = fs.readdirSync(pathInput);
  }
=======
	constructor() {
		super("ri", "resize images", [["<path>"], ["<width>"], ["<height>"], ["<format>"]]);
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
>>>>>>> 34a1f339d8b8279c60f151f7db11f5caaa33376f
}

module.exports = ResizeImage;
