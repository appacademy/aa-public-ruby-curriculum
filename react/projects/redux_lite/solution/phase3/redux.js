class Store {

  constructor(rootReducer) {
    this.rootReducer = rootReducer;
    this.state = {};
    this.getState = this.getState.bind(this);
  }

  getState() {
    return Object.assign({}, this.state);
  }

  dispatch(action) {
    this.state = this.rootReducer(this.state, action);
  }
}

const createStore = (...args) => new Store(...args);

const combineReducers = config => {
  return (prevState, action) => {
    const nextState = {};
    Object.keys(config).forEach(k => {
      if (!action) {
        const args = [ , { type: "__initialize" }];
        nextState[k] = config[k](...args);
      } else {
        nextState[k] = config[k](prevState[k], action);
      }
    });
    return nextState;
  }
}