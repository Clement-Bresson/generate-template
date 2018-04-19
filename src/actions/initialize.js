const {
  paths: { lib, project },
} = require('../utils/paths');
const log = require('../utils/log');
const { copyFile, createDirectoryIfDoesNotExist } = require('../utils/file');

module.exports = async () => {
  createDirectoryIfDoesNotExist(project.configDir);
  copyFile(lib.exampleFile, project.exampleFile);
  log.success('Initialization successful');
  log.info('If you are using a linter, please add "**/*.template.*" in your ignorePaths');
};
