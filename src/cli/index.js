const program = require('commander');
const initialize = require('../actions/initialize');
const newFile = require('../actions/new-file');

module.exports = () => {
  program.version('1.0.0').description('A highly customizable CLI to generate template files.');

  program
    .command('new')
    .alias('n')
    .description('Start generator to create a new file from a template')
    .action(newFile);

  program
    .command('init')
    .alias('i')
    .description('Initialize an empty .templates folder at your project root')
    .action(initialize);

  program.parse(process.argv);

  if (program.args.length === 0) {
    program.help();
  }
};
