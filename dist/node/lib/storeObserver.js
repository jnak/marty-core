'use strict';

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var log = require('./logger');
var _ = require('./mindash');

var StoreObserver = (function () {
  function StoreObserver(options) {
    var _this = this;

    _classCallCheck(this, StoreObserver);

    options = options || {};

    this.component = options.component;
    this.onStoreChanged = options.onStoreChanged || _.noop;

    this.listeners = _.map(options.stores, function (store) {
      return _this.listenToStore(store);
    });
  }

  _createClass(StoreObserver, [{
    key: 'dispose',
    value: function dispose() {
      _.invoke(this.listeners, 'dispose');
    }
  }, {
    key: 'listenToStore',
    value: function listenToStore(store) {
      var _this2 = this;

      var component = this.component;
      var storeDisplayName = store.displayName || store.id;

      log.trace('The ' + component.displayName + ' component  (' + component.id + ') is listening to the ' + storeDisplayName + ' store');

      return store['for'](component).addChangeListener(function (state, store) {
        var storeDisplayName = store.displayName || store.id;

        log.trace('' + storeDisplayName + ' store has changed. ' + ('The ' + _this2.component.displayName + ' component (' + _this2.component.id + ') is updating'));

        if (store && store.action) {
          store.action.addComponentHandler({
            displayName: _this2.component.displayName
          }, store);
        }

        _this2.onStoreChanged(store);
      });
    }
  }]);

  return StoreObserver;
})();

module.exports = StoreObserver;