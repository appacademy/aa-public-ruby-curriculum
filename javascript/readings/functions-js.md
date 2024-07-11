# JavaScript Functions

Functions in JavaScript are just a special type of JS objects. In other words,
you can do anything to a function that you can do to an object.

## Declaring functions

There are multiple ways to declare a function and assign it to a variable in
Javascript.

**Function-style**:

```js
function functionName(arg1, arg2, arg3, argN) {
  // code block...
}
```

**Expression-style**:

```js
const functionName = function(arg1, arg2, arg3, argN) {
  // code block...
};
```

**Fat Arrow-style (ES6+)**:

```js
const functionName = (arg1, arg2, arg3, argN) => {
  // code block...
};
```

**NB**: There is a slight functional difference between function-style and
expression-style function declarations, but we'll get to that later.

### Invoking functions with `()`

Functions are called a bit differently in JavaScript than in Ruby. In Ruby,
after a function is declared, it is invoked (ie. _called_) every time it is
referenced:

```ruby
def ret_hello
  "hello"
end

ret_hello #=> "hello"
```

In Javascript, referencing the function name by itself will only return a
pointer to the function; to execute it, you must invoke the function **with
arguments**. If no arguments are required, this looks like `()` appended to the
function name.

```javascript
// function with 0 arguments
function retHello() {
  return "hello";
}

retHello; //=> [Function: retHello]
retHello(); //=> "hello"
```

```js
// function with 2 arguments
function sum(n1, n2) {
  return n1 + n2;
}

sum; //=> [Function: sum]
sum(10, 20); //=> 30
```

### No implicit returns

In JavaScript, **functions usually do not have implicit `return`s**.

```javascript
function retHi() {
  "hi";
}

retHi(); // undefined
```

**Exception:** single-line fat-arrow functions.

```js
retHi = () => "hi";

retHi(); // "hi"
```

## Assigning properties to a function

```javascript
const fun = function() {
  console.log("So much fun");
};

fun.amount = 100;
console.log(fun.amount);
// => 100
```

This seems like a bizarre thing to do at first, but the ability to treat
functions like any other object is fundamental to JavaScript. We will learn more
and see a more practical example of this when we discuss Object-Oriented
Programming in JavaScript.

## Passing a function as an argument to another function

**NB**: Functions that are passed as an argument to another function are called
**callbacks**.

```javascript
function logIfEven(num) {
  if (num % 2 === 0) {
    console.log(`${num} is an even number!`);
  }
}

[1, 2, 3].forEach(logIfEven);
```

Here we pass the function `logIfEven` to `Array`'s [`forEach`][for-each] method.
`forEach` will call `logIfEven` for each element in the array, passing in the
value. `forEach` is a function that takes another function (ie. a _callback_) as
an argument.

Let's write our own `forEach`:

```javascript
function myForEach(array, cb) {
  for (let i = 0; i < array.length; i++) {
    cb(array[i]);
  }
}

myForEach([1, 2, 3], logIfEven);
```

It is very common to pass _anonymous functions_ as arguments:

```javascript
// **Notice the formatting!**
[1, 2, 3].forEach(function(num) {
  if (num % 2 === 0) {
    console.log(num);
  }
});
```

The key difference between a function and an object in JavaScript is that
functions can be invoked with the `()` operator while regular objects cannot.

[for-each]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

## JS functions in Ruby

In Ruby you can accomplish something similar by creating a `Proc` from a `block`,
but the importance of functions as first class objects is greater in JavaScript.

```ruby
# a Proc is an object oriented version of a function
my_proc = Proc.new { |name| puts "Hi #{name}!" }
```
