const { Command } = require("./Command");

class ResizeImage extends Command {
	constructor() {
		super("ri", "resizes images", [["<path>"]]);
	}

	action(path) {
		this.result = path;
	}
}

module.exports = ResizeImage;
