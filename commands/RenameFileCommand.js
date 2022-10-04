const { Command } = require("./Command");
const fs = require("fs");

class RenameFile extends Command {
	constructor() {
		super("rm", "renames 'file name' or 'file-name' to file_name", [
			["<path>", "The path of the folder which contains files"],
			[("<old separator>", "The folder which contains files to be renamed")],
			["<new separator>", "The folder which contains files to be renamed"],
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
