class Store {
  constructor(rootReducer, appliedMiddleware) {
    this.rootReducer = rootReducer;
    this.appliedMiddleware = appliedMiddleware;
    this.state = rootReducer({});
    this.subscriptions = [];

    this.getState = this.getState.bind(this);
    this.dispatch = this.dispatch.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  getState() {
    return Object.assign({}, this.state);
  }

  dispatch(action) {
    this.appliedMiddleware(this, action => {
      this.state = this.rootReducer(this.state, action, this.subscriptions);
      return this.state;
    })(action);
  }

  subscribe(cb) {
    this.subscriptions.push(cb);
  }
}

const createStore = (...args) => new Store(...args);

const combineReducers = config => {
  return (prevState, action, subscriptions) => {
    const nextState = {};
    let stateChanged = false;
    Object.keys(config).forEach(k => {
      if (!action) {
        const args = [, { type: "__initialize" }];
        nextState[k] = config[k](...args);
        stateChanged = true;
      } else {
        const next = config[k](prevState[k], action);
        if (next !== prevState[k]) stateChanged = true;
        nextState[k] = next;
      }
    });

    if (stateChanged) {
      if (subscriptions) subscriptions.forEach(cb => cb(nextState));
      return nextState;
    }
    return prevState;
  }
}
