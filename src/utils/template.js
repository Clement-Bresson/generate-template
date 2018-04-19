const glob = require('glob');
const { getIndex } = require('./');
const { resolveConfigValue } = require('./config');
const {
  resolveFromRoot,
  paths: { project },
} = require('./paths');
const { getTextFileContent } = require('./file');
const R = require('ramda');
const mustache = require('mustache');

const getTemplatesPaths = () => {
  const extension = resolveConfigValue('extension');
  return glob.sync(`**/*${extension}.*`, { cwd: project.rootDir, dot: true });
};

const extracTemplateNameFromPath = R.compose(getIndex(0), R.split('.'), R.last, R.split('/'));

const getTemplates = R.compose(
  R.map(R.converge(R.merge, [R.compose(R.objOf('name'), extracTemplateNameFromPath), R.objOf('path')])),
  getTemplatesPaths,
);

const getTemplate = R.converge(R.find, [R.unary(R.propEq('name')), getTemplates]);

const getTemplateNames = R.compose(R.map(R.prop('name')), getTemplates);

const getTemplateContent = R.compose(
  getTextFileContent,
  resolveFromRoot,
  R.prop('path'),
  getTemplate,
);

const getTemplateExtension = R.compose(
  R.compose(R.last, R.split(resolveConfigValue('extension'))),
  R.prop('path'),
  getTemplate,
);

const findMustacheVariables = R.compose(
  R.uniq,
  R.flatten,
  R.map(getIndex(1)),
  R.filter(R.compose(R.equals('name'), getIndex(0))),
);

const getTemplateVariables = R.compose(findMustacheVariables, mustache.parse, getTemplateContent);

const renderTemplate = (template, variables = {}) =>
  mustache.render(getTemplateContent(template), variables);

module.exports = {
  getTemplateExtension,
  getTemplateVariables,
  getTemplateNames,
  findMustacheVariables,
  renderTemplate,
};
