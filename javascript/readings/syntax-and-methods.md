# Syntax

## semi-colons;

In Javascript, an _expression_ is a line of code that returns a value. A
_statement_ is any line of code. **Every expression needs a semi-colon at the
end.** Statements that aren't expressions don't generally require semi-colons
and may cause syntax errors.

For example,

```javascript
// variable assignments are expressions
let x = 5;

// function declarations are statements
function() {}

if (x === 5) { // `if` blocks are statements
  console.log("hello"); // console.log's are expressions
}
```

## { curly braces }

Curly braces are used to delineate code blocks such as in function definitions,
loops, and `if` blocks. Curly braces can also be used to define JavaScript
objects.

```javascript
// `if/else` block
if (boolean) {
  // code block...
} else {
  // another code block...
}

// loop
while (condition) {
  // code block...
}

// function definition
function foo() {
  // code block...
}

// JS object
let obj = { key: "value" };
```

Missing curly braces is a very common mistake! Build good habits
early.

## Looping

Use blocks to delineate code within loops.

### `for` Loops

```js
for (let i = 0; i < 10; i++) {
  // code block
}
```

### `while` loops

```js
while (condition) {
  // code block
}
```

### Looping Keywords

#### `continue`

Skips the current iteration.

```javascript
let result = [];
for (let i = 1; i < 10; i++) {
  if (i % 3 === 0) {
    continue;
  }
  result.push(i);
}

console.log(result); // [1, 2, 4, 5, 7, 8]
```

#### `break`

Exits the loop.

```js
let result = [];
for (let i = 1; i < 10; i++) {
  if (i % 3 === 0) {
    break;
  }
  result.push(i);
}

console.log(result); // [1, 2]
```

## `switch` Statements

```js
switch (expression) {
  case x:
    // code block
    break;
  case y:
    // code block
    break;
  default:
  // code block
}
```

# Useful Methods

You'll notice that many of these operators are very similar to Ruby! Give them a
try in Node.

## `console.log`

This is similar to `puts` in Ruby.

```javascript
> console.log('hello')
hello
```

## Comments in JS

```javascript
// this is a javascript in-line comment

/*
  this is
  a javascript
  comment block
*/
```

## Mathematical Operators

- `+`
- `-`
- `*`
- `/`
- `%`

## Comparison Operators

- `>`
- `<`
- `>=`
- `<=`
- `===`
- `!==`

**NB:** Three equals signs? What's that about? There is a double equals operator
(`==`) in JS as well, but we'll mostly be sticking with `===`. The double equals
sign does some type of conversion which can lead to confusing results.

## Logical Operators

- `&&`: and
- `||`: or
- `!`: not

## String Methods

- `String.prototype.toLowerCase`
- `String.prototype.toUpperCase`
- `String.prototype.indexOf`
- `+`: concatenation

## Array Properties

- `Array.prototype.length`

## Array Methods

- `Array.prototype.pop`
- `Array.prototype.push`
- `Array.prototype.unshift`
- `Array.prototype.shift`
- `Array.prototype.indexOf`
  - Similar to `Array#index` in Ruby, but returns `-1` when it does not find an
    item.
- `[]`
  - Index using bracket notation (similar to Ruby).
- `Array.prototype.slice([start, [end]])`
  - Makes a copy of an array from the start index up to but not including the
    end index. Both arguments are optional (the first and last elements are used
    by default).
- `Array.includes` (ES6+)
  - Identical to `Array#include?` in Ruby
- `Array.isArray`(ES6+):

  - Class method that accepts one argument and returns a boolean representing
    whether it is an `Array`.