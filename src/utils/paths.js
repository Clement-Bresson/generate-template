const path = require('path');
const { existsSync } = require('fs-extra');
const {
  CONFIGURATION_FILENAME,
  CONFIGURATION_DIRECTORY,
  EXAMPLE_FILENAME,
} = require('../constants');
const R = require('ramda');

const getCurrentPath = path.resolve(process.cwd());

const getProjectRoot = (currPath = process.cwd()) => {
  if (existsSync(path.join(currPath, 'package.json'))) {
    return path.resolve(currPath);
  }
  return getProjectRoot(path.join(currPath, '..'));
};

const rootDir = getProjectRoot();
const resolveFrom = absolutePath => R.partial(path.join, [absolutePath]);
const assetsDir = resolveFrom(__dirname)('../assets');
const defaultsDir = resolveFrom(__dirname)('../defaultsDir');
const resolveFromRoot = resolveFrom(rootDir);
const resolveFromAssets = resolveFrom(assetsDir);
const resolveFromDefaults = resolveFrom(defaultsDir);
const configDir = resolveFromRoot(CONFIGURATION_DIRECTORY);
const resolveFromConfig = resolveFrom(configDir);

const isPathValid = x => typeof x === 'string'; // to do: check if path seems really legit

module.exports = {
  getCurrentPath,
  paths: {
    lib: {
      assetsDir,
      defaultsDir,
      defaultsConfigFile: resolveFromDefaults(CONFIGURATION_FILENAME),
      configFile: resolveFromAssets(CONFIGURATION_FILENAME),
      exampleFile: resolveFromAssets(EXAMPLE_FILENAME),
    },
    project: {
      configDir,
      configFile: resolveFromConfig(CONFIGURATION_FILENAME),
      exampleFile: resolveFromConfig(EXAMPLE_FILENAME),
      rootDir,
    },
  },
  isPathValid,
  resolveFrom,
  resolveFromRoot,
};
