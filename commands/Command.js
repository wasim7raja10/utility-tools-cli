class Command {
  constructor(name, descr, args = [], options = []) {
    this.command = name;
    this.help = descr;
    this.arguments = args;
    this.options = options;
    this.result = "";
  }

  getResult() {
    return this.result;
  }

  definition() {
    return {
      command: this.command,
      help: this.help,
      arguments: this.arguments,
      options: this.options,
    };
  }

  action() {
    throw Error("This method needs to be implemented by each specific command");
  }
}

module.exports.Command = Command;
