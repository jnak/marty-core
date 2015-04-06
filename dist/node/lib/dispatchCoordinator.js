'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var log = require('./logger');
var uuid = require('./utils/uuid');
var warnings = require('./warnings');
var Instances = require('./instances');
var resolve = require('./utils/resolve');
var Environment = require('./environment');

var DispatchCoordinator = (function () {
  function DispatchCoordinator(type, options) {
    _classCallCheck(this, DispatchCoordinator);

    if (!options && warnings.superNotCalledWithOptions && Environment.isServer) {
      log.warn('Warning: Options were not passed into an action creators\' constructor');
    }

    this.__type = type;
    this.__id = uuid.type(this.__type);

    Instances.add(this, options);
  }

  _createClass(DispatchCoordinator, [{
    key: 'dispatch',
    value: function dispatch(type) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var dispatcher = getInstance(this).dispatcher;

      return dispatcher.dispatchAction({
        type: type,
        arguments: args
      });
    }
  }, {
    key: 'for',
    value: function _for(obj) {
      return resolve(this, obj);
    }
  }, {
    key: 'context',
    get: function () {
      return getInstance(this).context;
    }
  }]);

  return DispatchCoordinator;
})();

function getInstance(creators) {
  return Instances.get(creators);
}

module.exports = DispatchCoordinator;