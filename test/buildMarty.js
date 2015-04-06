var buildMarty = require('../lib/buildMarty');
var TestSource = require('./fixtures/testSource');

module.exports = function () {
  return buildMarty({
    modules: [
      fixtures,
      require('../register')
    ]
  });
};

function fixtures(marty) {
  marty.registerStateSource('TestSource', 'testSource', TestSource);
}