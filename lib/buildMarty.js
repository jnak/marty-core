var _ = require('lodash');
var MartyBuilder = require('./martyBuilder');

module.exports = function (options) {
  options || (options = {});

  var builder = new MartyBuilder(options.version);

  _.each(options.modules, function (register) {
    register(builder, options.react);
  });

  return builder.build();
};