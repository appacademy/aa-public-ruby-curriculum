Function.prototype.myThrottle = function (interval) {
  // declare a variable outside of the returned function
  let tooSoon = false;
  return (...args) => {
    // the function only gets invoked if tooSoon is false
    // it sets tooSoon to true, and uses setTimeout to set it back to
    // false after interval ms
    // any invocation within this interval will skip the if 
    // statement and do nothing
    if (!tooSoon) {
      tooSoon = true;
      setTimeout(() => tooSoon = false, interval);
      this(...args);
    }
  }
}


Function.prototype.myDebounce = function (interval) {
  // declare a variable outside of the returned function
  let timeout;
  // return a function that takes an arbitrary number of arguments
  return (...args) => {
    // declare a function that sets timeout to null and invokes this with args
    const fnCall = () => {
      this(...args);
    }
    // each time this function is called, it will clear the previous timeout
    // and create a new one that invokes fnCall after the interval has passed
    // since the timeout is reset every time the function is invoked, 
    // fnCall will only be called once the interval has passed without any new 
    // invocations
    clearTimeout(timeout);
    timeout = setTimeout(fnCall, interval);
  }
}
