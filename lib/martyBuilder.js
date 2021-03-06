class MartyBuilder {
  constructor(marty) {
    this._marty = marty;
    this.stateSources = {};
  }
  registerStateSource(id, stateSourceId, clazz) {
    this.registerClass(id, clazz);
    this.stateSources[stateSourceId] = clazz;
  }
  registerClass(id, clazz) {
    this._marty[id] = clazz;
    this._marty.registry.addClass(id, clazz);
  }
  register(id, value) {
    this._marty[id] = value;
  }
}

module.exports = MartyBuilder;