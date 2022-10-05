const sharp = require("sharp");
const { Command } = require("./Command");
const fs = require("fs");

class ResizeImage extends Command {
	constructor() {
		super("ri", "resize images", [["<path>"]]);
	}

	action(pathInput) {
		const temp = "/";
		const files = fs.readdirSync(pathInput);

		files.forEach(async (file) => {
			await sharp(pathInput + temp + file)
				.webp({ quality: 80 }) // converting to webp format
				.resize({ height: 427, width: 640 }) // resize dimension of image
				.toFile(file.split(".")[0] + ".webp"); // changing the extension of file to .webp
		});
		this.result = fs.readdirSync(pathInput);
	}
}

module.exports = ResizeImage;
