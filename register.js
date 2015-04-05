var _ = require('./lib/mindash');
var logger = require('./lib/logger');
var warnings = require('./lib/warnings');
var Dispatcher = require('./lib/dispatcher');
var Diagnostics = require('./lib/diagnostics');
var environment = require('./lib/environment');
var getClassName = require('./lib/utils/getClassName');

module.exports = function (marty) {
  marty.register('logger', logger);
  marty.register('dispose', dispose);
  marty.register('warnings', warnings);
  marty.register('register', register);
  marty.register('dispatcher', Dispatcher);
  marty.register('Dispatcher', Dispatcher);
  marty.register('Diagnostics', Diagnostics);
  marty.register('diagnostics', Diagnostics);

  registerEverythingIn(environment);

  function registerEverythingIn(obj) {
    _.each(obj, function (value, key) {
      marty.register(key, value);
    });
  }

  function dispose() {
    Dispatcher.dispose();
    this.registry.dispose();
  }

  function register(clazz, id) {
    var className = getClassName(clazz);

    if (!clazz.id) {
      clazz.id = id || className;
    }

    if (!clazz.displayName) {
      clazz.displayName = clazz.id;
    }

    return this.registry.register(clazz);
  }
};