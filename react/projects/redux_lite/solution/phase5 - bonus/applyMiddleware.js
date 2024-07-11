const applyMiddleware = (...middlewares) => (store, cb) => action => {
  const middlewaresCopy = [...middlewares];
  const invokeNextMiddleware = (action) => {
    let nextMiddleware = middlewaresCopy.shift();
    if (!nextMiddleware) {
      return cb(action);
    }
    return nextMiddleware(store)(invokeNextMiddleware)(action);
  }
  return invokeNextMiddleware(action);
}
