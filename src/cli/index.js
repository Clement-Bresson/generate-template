const program = require('commander');
const { CONFIGURATION_FILENAME } = require('../constants');
const createConfigFile = require('../actions/create-config-file');

const generateTemplate = () => {
  program
    .version('1.0.0')
    .option('-i, --init', `Create ${CONFIGURATION_FILENAME} file`);

  program
    .command('new [name] <path>')
    .description('Create a new template')
    .action((name, path) => {
      console.log(rootPath);
    });

  program.parse(process.argv);

  if (program.init) {
    createConfigFile();
    return;
  }
};

module.exports = generateTemplate;
