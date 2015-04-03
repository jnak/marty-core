var logger = require('./lib/logger');
var _ = require('./lib/utils/mindash');
var warnings = require('./lib/warnings');
var Dispatcher = require('./lib/dispatcher');
var Diagnostics = require('./lib/diagnostics');
var environment = require('./lib/environment');

module.exports = function (marty) {
  marty.register('logger', logger);
  marty.register('dispose', dispose);
  marty.register('warnings', warnings);
  marty.register('dispatcher', Dispatcher);
  marty.register('Dispatcher', Dispatcher);
  marty.register('Diagnostics', Diagnostics);
  marty.register('diagnostics', Diagnostics);

  _.each(environment, function (value, key) {
    marty.register(key, value);
  });

  function dispose() {
    Dispatcher.dispose();
    this.registry.dispose();
  }
};