var _ = require('./utils/mindash');

function MartyBuilder(version) {
  this.factories = {};
  this.version = version;
}

MartyBuilder.prototype = {
  register: function (id, obj) {
    this.registerFactory(id, function () {
      return obj;
    });
  },
  registerFactory: function (id, factory) {
    this.factories[id] = factory;
  },
  build: function () {
    var marty = {
      version: this.version
    };

    _.each(this.factories, function (factory, id) {
      marty[id] = factory();
    });

    return marty;
  }
};

module.exports = MartyBuilder;