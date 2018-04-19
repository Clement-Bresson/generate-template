/* eslint-disable no-console */

const chalk = require('chalk');
const { compose } = require('ramda');

module.exports = {
  error: compose(console.error, chalk.red),
  success: compose(console.log, chalk.green),
  info: compose(console.info, chalk.blue),
};
