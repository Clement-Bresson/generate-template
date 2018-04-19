const {
  getTemplateExtension,
  getTemplateNames,
  getTemplateVariables,
  renderTemplate,
} = require('../utils/template');
const { prompt } = require('inquirer');
const log = require('../utils/log');
const R = require('ramda');
const fs = require('fs');
const chalk = require('chalk');

module.exports = async () => {
  const templateNames = getTemplateNames();
  if (R.length(templateNames) < 1) {
    log.error('Please configure at least one template in configuration file.');
    return;
  }
  const { template } = await prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Which template would you like to use?',
      choices: templateNames,
    },
  ]);
  const { ...values } = await prompt(getTemplateVariables(template).map(variable => ({
    type: 'input',
    name: variable,
    message: `What is ${chalk.blue(variable)} value ?`,
  })));
  const { filename } = await prompt({
    type: 'input',
    name: 'filename',
    message: 'Please enter filename',
  });
  fs.writeFileSync(
    `${filename}${getTemplateExtension(template)}`,
    renderTemplate(template, values),
  );
};
