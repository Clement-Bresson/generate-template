const { getJSONFileContent } = require('./file');
const {
  paths: { project },
} = require('./paths');
const defaults = require('../defaults/config');
const { argIs, noArg } = require('./');
const R = require('ramda');

const getConfigContent = () => getJSONFileContent(project.configFile);

const getConfig = R.cond([
  [noArg, getConfigContent],
  [argIs(String), R.converge(R.prop, [R.identity, getConfigContent])],
]);

const resolveConfigValue = key => getConfig(key) || defaults[key];

module.exports = {
  getConfig,
  resolveConfigValue,
};
