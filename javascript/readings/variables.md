# Variables

There are a few different ways to declare variables and constants in JavaScript.
Let's go over the use cases for each.

1. **`var`**
2. **`let`** (ES6+)
3. **`const`** (ES6+)
4. **`window`** and **`global`**

**NB**: the subsections below talk a great deal about scoping in JavaScript.
Some things will make more sense after you have learned about scope, so re-read
as necessary!

## Declaration

In JavaScript, in order to use a variable or constant, we must declare it by
prepending the variable's name with `var`, `let`, or `const`. Declaring a
variable is the only way to introduce it to the environment.

### `var`

To declare a **functionally-scoped variable**, use the `var` keyword.

```javascript
var myVar;
```

To initialize a variable (ie. declare a variable and assign it a value):

```javascript
var myVar = 5;
```

Now it is time to experiment. Open your Terminal/Command Prompt and type the
following:

```javascript
$ node
> myVar;
```

Since we have not declared `myVar`, you'll see an error message:
`ReferenceError: myVar is not defined`. Let's fix this.

```javascript
> var myVar;
undefined

> myVar; // We now can access myVar without error because we declared it.
undefined // Evaluates to undefined because we did not assign myVar a value

> myVar = 5; // Assign it a value of 5
5
```

What will this evaluate to?

```js
> myVar + 2; // What will this evaluate to?
```

**NB**: Notice that when a variable is declared or initialized, node always
prints out something underneath it. That is the return value. Everything in
javascript has a return value, even variable declarations and initializations.
`undefined` is the default return value.

**NB**: `var` is not the preferred means of declaring a variable in ES6. `let`
or `const` are preferred.

### `let` (ES6+)

`let` is a new feature in ES6.

We can use `let` to declare **block-scoped variables**. How are block-scoped
variables different from function-scoped variables? Consider the following:

```javascript
function blockScope() {
  if (true) {
    var x = 'var';
    let y = 'let';
    console.log(x); // 'var'
    console.log(y); // 'let'
  }
  console.log(x); // 'var'
  console.log(y); // ReferenceError: y is not defined
}

blockScope(); // evoking the function

console.log(x); // ReferenceError: x is not defined
console.log(y); // ReferenceError: y is not defined
```

Examples of blocks in javascript include `if` statements, `while` loops,
`switch` statements, and `for` loops (more on these later).

JavaScript will raise a `SyntaxError` if you try to declare the same `let`
variable twice in one block.

For a more detailed description of `let`, please refer to the [MDN
Documentation][mdn-let].

[mdn-let]:https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let

### `const` (ES6+)

`const` is a new feature in ES6.

We use `const` to declare **constants**. Constants should be used for constructs
that will not be re-declared or re-assigned.

Properties of constants:

* They are block-scoped like `let`.
* Unlike Ruby constants, JavaScript will actually enforce constants by raising
  an error if you try to reassign them.
* Trying to redeclare a constant with a `var` or `let` by the same name will
  also raise an error.

A quick example:

```javascript
> const favFood = "cheeseboard pizza"; // Initializes a constant
undefined

> const favFood = "some inferior food"; // Re-initialization raises an error
TypeError: Identifier 'favFood' has already been declared

> let favFood = "some other inferior food"; // Re-initialization raises an error
TypeError: Identifier 'favFood' has already been declared

> favFood = "deep-dish pizza"; // Re-assignment raises an error
TypeError: Assignment to constant variable.
```

**NB**: Constants are not immutable. Only the binding is immutable. For example,
if we set a constant equal to an object, we can still modify that object:

```js
const animals = {};
animals.cetacea = 'beluga whale';
animals.rodent = 'capybara'; // This works!

animals = {cetacea: 'beluga whale'}; // Raises an error
```

**NB**: Constants cannot be reassigned but new constants of the same names can
be declared in nested scopes. For example,

```js
const favFood = "cheeseboard pizza"
console.log(favFood);

if (true) {  
  const favFood = "noodles"; // This works! Declaration is scoped to the `if` block
  console.log(favFood); // Prints "noodles"
}

console.log(favFood); // Prints 'cheeseboard pizza'
```

## Globals

**If you leave off a declaration when initializing a variable, it will become a global. Never do this.**

```js
function good() {
  let x = 5;
}

function bad() {
  y = "Expect the unexpected (eg. globals)";
}

function why() {
  console.log(y); // "Expect the unexpected (eg. globals)""
  console.log(x); // Raises an error
}

good();
bad();
why();
```

Unintended global variables create confusing, unpredictable errors. If you
intentionally want to create a global variable (i.e. to define a library such as
JQuery or Underscore), explicitly add it to your environment's global context:

```js
// node
global.myGlobal = "it's a small world, after all";

// browser
window.myGlobal = "it's a small, small world";
```
