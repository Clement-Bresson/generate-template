const R = require('ramda');

const argIs = type => R.compose(R.is(type), R.nthArg(0));
const noArg = (...args) => R.length(args) === 0;
const getIndex = R.compose(R.view, R.lensIndex);

module.exports = {
  argIs,
  noArg,
  getIndex,
};
