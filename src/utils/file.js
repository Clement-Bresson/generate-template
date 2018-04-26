const {
  existsSync, mkdirSync, readFileSync, writeFileSync,
} = require('fs-extra');
const R = require('ramda');

const getParser = (type) => {
  switch (type) {
    case 'json':
      return JSON.parse;
    case 'text':
      return R.identity;
    default:
      return undefined;
  }
};

const getFileContent = type =>
  R.memoizeWith(
    R.identity,
    R.cond([
      [existsSync, R.compose(getParser(type), R.partialRight(readFileSync, ['utf-8']))],
      [R.T, R.always(undefined)],
    ]),
  );

const getJSONFileContent = getFileContent('json');
const getTextFileContent = getFileContent('text');

const copyFile = (from, to) => {
  writeFileSync(to, readFileSync(from));
};

const createDirectoryIfDoesNotExist = (path) => {
  if (!existsSync(path)) {
    mkdirSync(path);
  }
};

module.exports = {
  copyFile,
  createDirectoryIfDoesNotExist,
  getJSONFileContent,
  getTextFileContent,
};
