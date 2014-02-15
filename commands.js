var REGEX;

REGEX = /^([\w-]+)(?:\|([^ ]+))?( \(\*\))?[\n\s]+(\w+)((?:.|\n)*)$/;

exports.getCommands = function() {
  var command, commands, docs, parsed, _i, _len;
  docs = require("fs").readFileSync("" + __dirname + "/commands.txt", "utf-8");
  parsed = docs.split(/\n\n /g).map(function(command) {
    return command.match(REGEX);
  });
  commands = {};
  for (_i = 0, _len = parsed.length; _i < _len; _i++) {
    command = parsed[_i];
    if (command != null) {
      commands[command[1]] = {
        name: command[1],
        args: command[2],
        privileged: !!command[3],
        reply: command[4] !== "none" ? command[4] : null,
        details: command[5].split("\n").map(function(l) {
          return l.replace(/^\s+/, "");
        }).join("\n")
      };
    }
  }
  return commands;
};
