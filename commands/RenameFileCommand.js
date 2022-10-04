const { Command } = require("./Command");
const fs = require("fs");

class RenameFile extends Command {
	constructor() {
		super("rm", "renames 'file name' or 'file-name' to file_name", [
			["<old separator>", "The folder which contains files to be renamed"],
			["<new separator>", "The folder which contains files to be renamed"],
		]);
	}

	action(oldSep, newSep) {
		const temp = "/";
		const files = fs.readdirSync(__dirname + temp);
		files.forEach((file) => {
			const newName = file.split(oldSep).join(newSep);
			fs.renameSync(__dirname + temp + file, __dirname + temp + newName);
		});
		this.result = "done.";
	}
}

module.exports = RenameFile;
