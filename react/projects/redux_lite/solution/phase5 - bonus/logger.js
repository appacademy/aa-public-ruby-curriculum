const logger = store => next => action => {
  const prevState = store.getState();
  const nextState = next(action);
  
  console.log("%c prevState: ", "color: purple; font-size: 20px;");
  console.log(prevState);
  console.log("%c action: ", "color: blue; font-size: 20px;");
  console.log(action);
  console.log("%c nextState: ", "color: green; font-size: 20px;")
  console.log(nextState);
}