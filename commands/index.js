const normalizedPath = require("path").join(__dirname, "./");

let importedCommands = require("fs")
	.readdirSync(normalizedPath)
	.filter((file) => file.match(/[a-zA-Z]+Command.js/))
	.map(function (file) {
		const c = require("./" + file);
		return new c();
	});

module.exports.commands = importedCommands;
