var log = require('./logger');
var _ = require('./utils/mindash');

function StoreObserver(options) {
  options = options || {};

  this.component = options.component;
  this.onStoreChanged = options.onStoreChanged || _.noop;

  this.listeners = _.map(options.stores, function (store) {
    return this.listenToStore(store);
  }, this);
}

StoreObserver.prototype = {
  dispose: function () {
    _.invoke(this.listeners, 'dispose');
  },
  listenToStore: function (store) {
    var component = this.component;
    var storeDisplayName = store.displayName || store.id;

    log.trace(
      'The ' + component.displayName + ' component  (' + component.id +
      ') is listening to the ' + storeDisplayName + ' store'
    );

    return store.for(component).addChangeListener(function (state, store) {
      var storeDisplayName = store.displayName || store.id;

      log.trace(
        storeDisplayName + ' store has changed. ' +
        'The ' + component.displayName + ' component (' + component.id + ') is updating'
      );

      if (store && store.action) {
        store.action.addComponentHandler({
          displayName: this.component.displayName
        }, store);
      }

      this.onStoreChanged(store);
    }, this);
  }
};

module.exports = StoreObserver;