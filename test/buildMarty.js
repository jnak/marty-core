var Marty = require('../lib/marty');
var TestSource = require('./fixtures/testSource');

module.exports = function () {
  var marty = new Marty();

  marty.use(require('../main'));
  marty.use(function (marty) {
    marty.registerStateSource('TestSource', 'testSource', TestSource);
  });

  return marty;
};