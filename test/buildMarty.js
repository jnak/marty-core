var buildMarty = require('../lib/buildMarty');

module.exports = function () {
  return buildMarty({
    modules: [
      require('../register')
    ]
  });
};