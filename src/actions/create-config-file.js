const fs = require('fs');
const paths = require('../utils/paths');
const { CONFIGURATION_FILENAME } = require('../constants');
const chalk = require('chalk');

const createConfigFile = () => {
  if (fs.existsSync(paths.configFile)) {
    console.error(
      chalk.red(
        `${CONFIGURATION_FILENAME} file already exists in your project`,
      ),
    );
    return;
  }
  fs.writeFileSync(paths.configFile, fs.readFileSync(paths.blankConfig));
  console.log(chalk.green(`${CONFIGURATION_FILENAME} file created`));
};

module.exports = createConfigFile;
