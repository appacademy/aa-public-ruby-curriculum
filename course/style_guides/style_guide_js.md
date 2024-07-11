# JavaScript Style Guide

## Table of Contents

* [Arrow Functions](#arrow-functions)
* [Blocks](#blocks)
* [Checking Equality](#checking-equality)
* [Class Prototypes](#class-prototypes)
* [Describing Methods](#describing-methods-in-readmes)
* [Destructuring](#destructuring)
* [Import vs Require](#import-vs-require)
* [Let vs. Const](#let-vs-const)
* [Objects](#objects)
* [Spacing](#spacing)
* [Strings](#strings)
* [Use Strict](#use-strict)
* [`this`](#this)

## Arrow Functions

**Prefer `=>` over `function` except:**

0.	**Use `function` in the global scope and for Object.prototype properties.**
	*	Arrows here would assign `this` to something you don't expect (most likely `window/global`).
0.	**Use `function` for class constructors.**
	* Arrows can't be constructors.


### Omit `()` and `{}` only when an function has a single argument and a single expression.

```js
// bad
someFunction(arg => {
	...
	...
	return ...
});

// good
someFunction((arg) => {
	...
	...
	return ...
});

//good
someFunction(arg => singleExpression);
```

## Blocks

**Use braces if writing a multi-line block.**

```javascript
// bad
if (test)
  return false;

// good
if (test) return false;

// good
if (test) {
  return false;
}

```

**With `if`/`else` blocks**, put the `else` on the same line as the `if` closing brace.

```javascript
// good
if (something) {
	// do this
} else {
	// do this
}

// bad
if (something) {

}
else {

}
```

## Checking Equality

**Use `===` and `!==`, not `==` or `!=`.** Type coercion can be unpredictable. Prefer explicit type conversion with the `===` operator.

## `let` vs `const`

**Prefer `const`** unless you *must* use `let`. Use `let` when reassignment is
necessary. Don't use `var`.

## Class Prototypes

**Don't overwrite the prototype.** You'll lose the `constructor` and mess up
the inheritance chain.

```js
function Cat () {};

// bad
Cat.prototype = {
	function method () {}
	...
}

// good
Cat.prototype.method = function () {};
...
```

## Describing Methods in READMEs

**Use `Object.prototype.method` rather than `Object#method`.**

## Objects

**Use object method short hand.**

```javascript
// bad
const atom = {
  value: 1,

  addValue: function (value) {
    return atom.value + value;
  }
};

// good
const atom = {
  value: 1,

  addValue (value) {
    return atom.value + value;
  }
};
```

## Destructuring

Use object destructuring to extract multiple attributes from an object.

```js
		{ benchId, params: { pathname } } = this.props;

		benchId == this.props.benchId; // true
		pathname == this.props.params.pathname; // true
	}

```

## Import vs. Require 

Prefer Import syntax.

## Strings

**Use single quotes instead of double quotes.**

```javascript
// good
const goodString = 'pizza';

//bad
const badString = "french-style scrambled eggs";
```

**Always use template literals for interpolating.** Prefer single-quoted strings otherwise.

```javascript
// good
function interpolateGood(word) {
	return `I interpolate ${word} good!`;
}

// bad
function interpolateBad(word) {
	return 'I interpolate ' + word + ' bad!';
}

// bad
const needlessTemplateLiteral = `this is unnecessary`;
```

## Spacing

**Always use spaces following key words and before blocks.**
```javascript

// good
if (true) {
	// something
}

while (true) {
	// something
}

function () {
	// something
}

// bad
if(true) {
	// something
}

while (true){
	// something
}

function(){
	// something
}

```

**Don't use spaces after function names. Do put spaces before their curly braces.**

```javascript
// good
function Cat() {
	// stuff
}

// bad
function Cat () {
	// stuff
}
```

**Don't use extra spaces in parentheses.**

```javascript
// good
if (true) {
	// something
}

// bad
if ( true ) {
	// something
}
```

**Put spaces after semi-colons.**

```javascript
// good
for (var i = 0; i < array.length; i++) {
	array[i];
}

// bad
for (var i = 0;i < array.length;i++) {
	array[i];
}
```

## `this`
`this` is easily gotten wrong. Therefore, only use `this` in constructors and in setting up closures.  See [Google's style-guide rule](https://google.github.io/styleguide/javascriptguide.xml#this).

```js
// good
BenchActions.fetchBenches = function(){
	BenchApiUtil.fetchBenches(BenchActions.receiveBenches);
}

// bad
BenchActions.fetchBenches = function(){
	BenchApiUtil.fetchBenches(this.receiveBenches);
}
```
