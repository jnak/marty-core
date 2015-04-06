var _ = require('./lib/mindash');
var logger = require('./lib/logger');
var warnings = require('./lib/warnings');
var Dispatcher = require('./lib/dispatcher');
var Diagnostics = require('./lib/diagnostics');
var environment = require('./lib/environment');
var StateSource = require('./lib/stateSource');
var getClassName = require('./lib/utils/getClassName');
var createStateSourceClass = require('./lib/stateSource/createStateSourceClass');

module.exports = function (marty) {
  marty.registerClass('StateSource', StateSource);

  marty.register('logger', logger);
  marty.register('dispose', dispose);
  marty.register('warnings', warnings);
  marty.register('register', register);
  marty.register('dispatcher', Dispatcher);
  marty.register('Dispatcher', Dispatcher);
  marty.register('Diagnostics', Diagnostics);
  marty.register('diagnostics', Diagnostics);
  marty.register('createStateSource', createStateSource);

  _.each(environment, function (value, key) {
    marty.register(key, value);
  });

  function dispose() {
    Dispatcher.dispose();
    this.registry.dispose();
  }

  function createStateSource(properties) {
    var BaseType = properties.type ? marty.stateSources[properties.type] : StateSource;

    if (!BaseType) {
      throw new Error('Unknown state source ' + properties.type);
    }

    var StateSourceClass = createStateSourceClass(properties, BaseType);
    var defaultInstance = this.register(StateSourceClass);

    return defaultInstance;
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