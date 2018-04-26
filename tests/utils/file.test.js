const u = require('../../src/utils/file');
const { expect } = require('chai');
const path = require('path');
const { existsSync, removeSync, writeFileSync } = require('fs-extra');
const glob = require('glob');

const dirPath = path.resolve(__dirname);
let dist;

describe('Utils - file', () => {
  afterEach(() => {
    glob
      .sync('**/*+(dummy)*', {
        cwd: dirPath,
        dot: true,
      })
      .forEach((filePath) => {
        removeSync(path.join(dirPath, filePath));
      });
  });

  describe('Files managers', () => {
    afterEach(() => {
      expect(existsSync(dist)).to.equal(true);
    });

    it('createDirectoryIfDoesNotExist', () => {
      dist = path.join(dirPath, 'dummy');
      u.createDirectoryIfDoesNotExist(dist);
    });

    it('copyFile', () => {
      dist = path.join(dirPath, 'dummy.js');
      const from = path.join(dirPath, 'file.test.js');
      u.copyFile(from, dist);
    });
  });

  describe('Files readers', () => {
    it('getJSONFileContent', () => {
      const JSONcontent = '{"foo": "bar"}';
      dist = path.join(dirPath, 'dummy.json');
      writeFileSync(dist, JSONcontent);
      expect(u.getJSONFileContent(dist).foo).to.equal('bar');
    });

    it('getTextFileContent', () => {
      const textContent = 'Hello world!';
      dist = path.join(dirPath, 'dummy.json');
      writeFileSync(dist, textContent);
      expect(u.getTextFileContent(dist)).to.equal('Hello world!');
    });
  });
});
