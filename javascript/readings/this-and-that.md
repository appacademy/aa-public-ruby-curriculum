# this

Consider this example:

```javascript
let cat = {
  purr: function() {
    console.log("meow");
  },
  purrMore: function() {
    for (let i = 0; i < 10; i++) {
      this.purr();
    }
  }
};

cat.purr();
cat.purrMore();
```

When we call a function like `cat.purr()` or `cat.purrMore()`, a variable named
`this` gets set. Through the `this` variable, the method can access the object
it was called on. `this` is a lot like `self` in Ruby.

We do not use `this` in the `purr` method, but we do in `purrMore`. In
`purrMore`, we use `this` to access the `cat` object that has a `purr` method.

Unlike Ruby's `self`, `this` is not optional if you want to access the
attributes of the object. In other words, `purr()` instead of `this.purr()`
would not work.

If we had used `purr()` instead of `this.purr()` in `purrMore`, the function
would have first looked for a **local variable** named `purr` in the scope of
`purrMore` and if it hadn't found it there, it would have then looked up its
scope chain. `this.purr()` tells `purrMore` to look at `cat`, the object it was
invoked on, to find `purr`.

This is because `cat.purrMore` function is called **method-style**, i.e.
`object.method(arguments, ...)`. Using method-style invocation (a.k.a.
dot-notation) sets `this` to the object preceding the dot.

Calling a function in the traditional **function style** (`f(a, b, c)`) **does
not** set `this` properly. In such cases, `this` is set to the global scope
(either `window` or `global`).

```js
var purrLots = cat.purrMore;
purrLots(); // this evaluates to the global scope
```

# Scope Issues with `this`

There is one tricky thing about `this`, and it comes up when passing callbacks.
Observe, dear reader:

```javascript
function times(num, fun) {
  for (let i = 0; i < num; i++) {
    fun(); // call is made "function-style"
  }
}

const cat = {
  age: 5,

  ageOneYear: function() {
    this.age += 1;
  }
};

cat.ageOneYear(); // works

times(10, cat.ageOneYear); // ReferenceError; this.age is not defined
```

Calling `cat.ageOneYear()` method style works. But the calls to increment the
cat's `age` ten times don't.

```
~$ node test.js
{ age: 6, ageTenYears: [Function] }
```

In the example, we pull out the `cat.ageOneYear` method and pass it to `times`.
`times` calls the method, **but it calls it function-style**. Recall that
function-style method calls use `window` or `global` as `this`.

There are two ways around this problem. The first is to introduce an **anonymous
closure** to capture `cat`:

```javascript
// `times` is the same:
function times(num, fun) {
  for (let i = 0; i < num; i++) {
    fun(); // call is made "function-style"
  }
}

const cat = {
  age: 5,

  ageOneYear: function() {
    this.age += 1;
  }
};

// Function argument is different:
times(10, function() {
  cat.ageOneYear();
});
```

`times` will still call the passed function function-style, so `this` will still
be set to `window`. But the closure doesn't care, **because inside, it
explicitly calls `ageOneYear` method style on `cat`**.

This is a very common pattern, so there is another, less verbose alternative
using `Function.prototype.bind`.

```javascript
times(10, cat.ageOneYear.bind(cat));
```

`bind` is a method you can call on JS functions. Other methods defined on
`Function` objects live in `Function.prototype`.

`bind` works just like the closure we made, in which `cat#ageOneYear` is called
method style on the `cat` object. `cat.ageOneYear.bind(cat)` returns a closure
that will still be called function-style, but which calls `cat.ageOneYear`
method-style inside of it.

Note that you can bind functions to any scope, not just `this`:

```javascript
const crazyMethod = cat.ageOneYear.bind(dog);
```

# Nested `this` Problems

Let's see the same problem in another context:

```javascript
function SumCalculator() {
  // scope 0
  this.sum = 0;
}

SumCalculator.prototype.addNumbers = function(numbers) {
  // scope 1
  numbers.forEach(function(number) {
    // scope 2
    this.sum += number; // noooo!
  });

  return this.sum;
};
```

For the same reason as before, the use of `this` in scope 2 will not work.
Because the anonymous function will not be called method style by
`Array.prototype.forEach`, `this` will not be set properly. That makes sense if
you think about it: the anonymous function is not even a method of
`SumCalculator`!

This problem can be hard to spot, because even though we are using `this` in a
method of `SumCalculator`, we're also inside an anonymous, nested function which
will be called function style. In particular, the correct use of `this` in scope
1 will mean something different than the incorrect use in scope 2.

This sort of runs counter to our basic understanding of closures: that they can
access variables defined in the enclosing scope. However, `this` is special
because **`this` doesn't get captured; it gets reset every time a function is
called**.

If we do want to close over `this`, we need to store it in a normal, capturable
local variable:

```javascript
function SumCalculator() {
  // scope 0
  this.sum = 0;
}

SumCalculator.prototype.addNumbers = function(numbers) {
  const sumCalculator = this;

  numbers.forEach(function(number) {
    sumCalculator.sum += number; // will work as intended
  });

  return this.sum;
};
```

Because `sumCalculator` is a normal local variable (as opposed to the special
`this` variable), it can be captured and used by the closure in the usual way.
Later, when the closure is called function style, it won't matter, because
instead of using `this` (which would have been reset to `window`), we instead
use `sumCalculator`, which holds the old reference to the `SumCalculator` object
that `addNumbers` was called on.

Instead of `sumCalculator`, you may often see people name a variable like this
`that`. `that` is just a conventional name, there is no magic to it. A somewhat
less common name is `self`. I prefer a less abstract name like `sumCalculator`,
but it is a matter of personal code style.

To repeat: the reason this solution works is because `sumCalculator` is a normal
variable captured according to typical rules, while `this` is a special variable
**which is never captured and is reset on every function call**.

## The ES6 Solution

ES6 provides an elegant solution to callback scoping issues through arrow functions (see ES6 Arrow Functions reading).

## References

- [Useful Stack Overflow](http://stackoverflow.com/questions/4886632/what-does-var-that-this-mean-in-javascript)
