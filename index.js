#!/usr/bin/env node

const { Command } = require("commander");
const { commands } = require("./commands");

const program = new Command();

commands.forEach((c) => {
  //get the definition of our command
  const commandDef = c.definition();

  //we then use it to build the command we're going to be executing later.
  const subCommand = program
    .command(commandDef.command)
    .description(commandDef.help);

  commandDef.arguments.forEach((arg) => {
    subCommand.argument(arg[0], arg[1]);
  });

  commandDef.options.forEach((o) => {
    subCommand.option([o[0], o[1]].join(","), o[2], o[3]);
  });
  subCommand.action(function () {
    c.action.apply(c, arguments);
    console.log(c.getResult());
  });
});

//parse the input and decide which command we're trying to execute.
program.parse();
