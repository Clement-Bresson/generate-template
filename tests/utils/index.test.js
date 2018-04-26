const u = require('../../src/utils');
const { expect } = require('chai');

describe('Utils - index', () => {
  it('argIs', () => {
    expect(u.argIs(String)('test')).to.equal(true);
    expect(u.argIs(Number)(0)).to.equal(true);
    expect(u.argIs(Boolean)(true)).to.equal(true);
    expect(u.argIs(String)(undefined)).to.equal(false);
    expect(u.argIs(String)(0)).to.equal(false);
  });

  it('noArg', () => {
    expect(u.noArg()).to.equal(true);
    expect(u.noArg('foo')).to.equal(false);
    expect(u.noArg(null)).to.equal(false);
  });

  it('getIndex', () => {
    expect(u.getIndex(1)(['a', 'b', 'c'])).to.equal('b');
    expect(u.getIndex(2)(['a', 'b', 'c'])).to.equal('c');
  });
});
