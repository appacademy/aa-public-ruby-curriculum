## JavaScript Data Types

Before we start manipulating data, we first have to know what kinds of data we
can manipulate. JavaScript has 6 data types:

* 5 Primitive Types:
  * Numbers
  * String (text)
  * Boolean
  * Undefined
  * Null
* and objects.

### `NaN`

`NaN` stands for Not-A-Number. It is a property of the global object and is
_not_ a JS data type. `NaN` is the result of any illegal numerical operations.

Run the code below in your `node` console:

```javascript
> 20 * "happy"
NaN
```

## Falsey vs. Truthy

In Ruby, the only falsey values are `nil` and `false`.

```ruby
if 0
  puts 'In Ruby, this will print'
end

```

In Javascript, zeros, empty strings, `undefined`, `null`, and `NaN` are all
considered falsey values. Everything else is true.

```javascript
if (0 || "" || undefined || null || NaN) {
  console.log('In JavaScript, this will not print.')
}

```
Take care when writing conditional statements in JavaScript!

## Primitives vs. Objects

Let's discuss the differences between Javascript's 5 primitive types and
objects.

A **primitive type** is data that is not an object and cannot have methods. This
is different from Ruby where everything is an object and we could do things
like:

```ruby
(irb)> -5.abs
# => 5
```
This calls the method `abs` on the `-5` object.

In JavaScript, numbers are primitives and do not have object methods. Thus, the
equivalent would be:

```js
> Math.abs(-5)
// => 5
```

Here we are calling the method `abs` on the `Math` object and passing in the
number `-5` as an argument.

It is important to understand not just the syntactic difference between these
two examples, but to also understand the fundamental difference between how the
two languages represent data:

+ In Ruby everything is an object;
+ whereas in JS there are primitive data types that are *not* objects.

## JS Objects

Objects in JavaScript are similar to objects in Ruby in that they can store both
state (Ruby instance variables) and behavior (Ruby methods).

In JavaScript you can construct a new object like so:

```js
var cat = {
  name: "Breakfast",
  age: 8,
  purr: function () {
    console.log("meow!");
  }
};
```

We say that `name`, `age`, and `purr` are the **properties** of the `cat`
object. We access the values of these properties using the dot or bracket
notation.

```js
// using Bracket-Notation
console.log(cat['name']); // => Breakfast
// using Dot-Notation
console.log(cat.age); // => 8

// calling a method
cat.purr(); // => 'meow!'

// reassigning properties
cat.name = "Earl";
cat['age'] += 1;
```

Similar to hashes in Ruby, objects in JS are just a collection of associated
properties and values.

**NB**: There is a key difference between Javascript objects and Ruby objects in
terms of how state and behavior are treated.

* In **JavaScript**, state and behavior of the object are treated the same way. Both are accessible as properties of the object.
* In **Ruby**, state and behavior are separated into instance variables and
  methods which are accessed differently (i.e., `@ivar` vs. `self.method_name`).
