const { Command } = require("./Command");
const fs = require("fs");

class RenameFile extends Command {
	constructor() {
		super("rm", "renames 'file name' or 'file-name' to file_name", [
			["<path>"],
			["<old separator>"],
			["<new separator>"],
		]);
	}

	action(path, oldSep, newSep) {
		const temp = "/";
		const files = fs.readdirSync(path);
		files.forEach((file) => {
			const newName = file.split(oldSep).join(newSep);
			fs.renameSync(path + temp + file, path + temp + newName);
		});
		this.result = fs.readdirSync(path);
	}
}

module.exports = RenameFile;
