var _ = require('./mindash');
var Registry = require('./registry');

function MartyBuilder(version) {
  this.values = {};
  this.classes = {};
  this.version = version;
}

MartyBuilder.prototype = {
  registerClass: function (id, clazz) {
    this.classes[id] = clazz;
  },
  register: function (id, value) {
    this.values[id] = value;
  },
  build: function () {
    var marty = {
      version: this.version,
      registry: new Registry({
        classes: this.classes
      })
    };

    _.each(this.classes, function (clazz, id) {
      marty[id] = clazz;
    });

    _.each(this.values, function (value, id) {
      marty[id] = value;
    });

    return marty;
  }
};

module.exports = MartyBuilder;