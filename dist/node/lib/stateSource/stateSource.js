'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var log = require('../logger');
var uuid = require('../utils/uuid');
var warnings = require('../warnings');
var Instances = require('../instances');
var resolve = require('../utils/resolve');
var Environment = require('../environment');

var StateSource = (function () {
  function StateSource(options) {
    _classCallCheck(this, StateSource);

    if (!options && warnings.superNotCalledWithOptions && Environment.isServer) {
      log.warn('Warning: Options were not passed into a state source\'s constructor');
    }

    this.__type = 'StateSource';
    this.__id = uuid.type(this.__type);

    Instances.add(this, options);
  }

  _createClass(StateSource, [{
    key: 'context',
    get: function () {
      return Instances.get(this).context;
    }
  }, {
    key: 'for',
    value: function _for(obj) {
      return resolve(this, obj);
    }
  }, {
    key: 'dispose',
    value: function dispose() {
      Instances.dispose(this);
    }
  }]);

  return StateSource;
})();

module.exports = StateSource;