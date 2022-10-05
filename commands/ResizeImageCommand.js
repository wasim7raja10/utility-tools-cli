const sharp = require("sharp");
const { Command } = require("./Command");
const fs = require("fs");

class ResizeImage extends Command {
	constructor() {
		super("ri", "resize images", [["<path>"], ["<width>"], ["<height>"]]);
	}

	action(pathInput, width = 640, height = 427) {
		const temp = "/";
		const files = fs.readdirSync(pathInput);

		files.forEach(async (file) => {
			await sharp(pathInput + temp + file)
				.webp({ quality: 80 }) // converting to webp format
				.resize({ height: height, width: width }) // resize dimension of image
				.toFile(file.split(".")[0] + ".webp"); // changing the extension of file to .webp
		});
		this.result = fs.readdirSync(pathInput);
	}
}

module.exports = ResizeImage;
