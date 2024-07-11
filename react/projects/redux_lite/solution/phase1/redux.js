class Store {

  constructor(rootReducer) {
    this.rootReducer = rootReducer;
    this.state = {};

    this.getState = this.getState.bind(this);
  }

  getState() {
    return Object.assign({}, this.state);
  }
}

const createStore = (...args) => new Store(...args);