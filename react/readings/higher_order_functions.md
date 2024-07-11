# Higher-Order Functions

Functions that operate on other functions, either by receiving them as arguments
or returning them, are called **higher-order functions**. Functions that are
passed as parameters to and invoked in a *higher-order function* are known as
**callbacks**. This perspective makes it especially easy to abstract over the
actions they represent.

## Closures

A **closure**, also known as *lexical scoping*, is a function that uses **free variables**,
variables defined outside of its scope. Closures tend to come in handy when 
writing higher-order functions. Consider the following code:

```js
const calculator = function (operationCb) { // high-order function
  return function (op1, op2) { // closure
    console.log(`calling with ${op1} ${op2}`);
    const result = operationCb(op1, op2);
    console.log(`equals ${result}`);
  };
}

const addition = function (n1, n2) { // callback
  console.log(`${n1} + ${n2}`);
  return n1 + n2;
}

const adder = calculator(addition);
adder(1, 2);
// calling with 1 2
// 1 + 2
// equals 3
```

The `calculator` function receives a callback as an argument (`operationCb`)
which is called in the anonymous function `calculator` returns. This return
value would not work if the inner function could not close over `operationCb`, a
variable defined outside of its scope.

## Composing Functions

Composing functions is an idea that you were probably first introduced to in
math class. A function that composes two functions might look like the following:

```js
const compose = function (f, g) {
  return function (x) {
    return f(g(x));
  };
};
```

This would allow us to do the following:

```js
const timesTwo = (num) => num * 2;
const plusSix = (num) => num + 6;

const plusThenTimes = compose(timesTwo, plusSix);
plusThenTimes(3); //=> 18

const timesThenPlus = compose(plusSix, timesTwo);
timesThenPlus(3); //=> 12
```

This pattern applies to more than just mathematical operations, of course -- we 
can use this pattern more generally.

## Currying Functions

We've already written `Function.prototype.curry` that takes as an argument a
number `n` representing the total number of arguments to be passed in and
collects these arguments until their count reaches that `n`. At which point, it
calls the original function. This pattern allows us to write functions that can
take arguments as they become available and, in the meantime, be passed around
among other functions.

## ES6 Syntax

ES6 makes it easy to write higher-order functions using fat-arrow function
notation. The two examples below illustrate the same function:

```js
// ES5:
function foo(arg1) {
  return function(arg2) {
    return function(arg3) {
      console.log(`${arg1} came before ${arg2} and ${arg3} came last`);
    };
  };
}

// ES6:
const foo = arg1 => arg2 => arg3 => {
  console.log(`${arg1} came before ${arg2} and ${arg3} came last`);
};
```

**NB:** Remember, ES6 arrow functions, unlike normal JS functions, are 
automatically bound to the context (`this`) that existed when they were defined. 
In other words, `this` means the same thing inside an arrow function that it 
does outside of it.

## Summary of Higher-Order Functions

+ Higher-order functions are functions that:
  + Define and return functions;
  + Accept callbacks as arguments;
  + Or do both.
