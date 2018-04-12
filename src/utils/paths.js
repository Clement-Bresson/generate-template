const path = require('path');
const { CONFIGURATION_FILENAME } = require('../constants');

const root = path.resolve(process.cwd()); // to do: ensure it resolves directory where package.json is located
const assets = path.join(__dirname, '../assets');
const blankConfig = path.join(assets, CONFIGURATION_FILENAME);
const configFile = path.join(root, CONFIGURATION_FILENAME);

module.exports = {
  assets,
  blankConfig,
  configFile,
  root,
};
