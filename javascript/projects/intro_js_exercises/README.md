# Intro JavaScript Exercises

## Learning Goals

- Be able to write the same types of functions you were able to write in Ruby
- Know how to pass functions as arguments to other functions and call them as
  callbacks
- Know how closures work
- Know how JavaScript's prototypical inheritance works
  - Know how to monkey-patch new methods onto a class in JavaScript

**NB**: Remember that in JavaScript we use `camelCase` for variable names. And
don't forget your semicolons!

## Phase 0: Setup

Download the [`skeleton`][skeleton] and fill in the corresponding file with each
phase. The `index.html` file already has each of the `.js` script files
included, so you need not worry about editing it. Simply `open index.html` and
your code should be available from the Chrome Console (`CMD-ALT-i` to open).

[skeleton]:
  https://assets.aaonline.io/fullstack/javascript/projects/intro_js_exercises/skeleton.zip

## Phase 1: Arrays

### Overview

Let's take a little while to create a few (hopefully familiar) functions. These
should give you some experience iterating over and mutating arrays.

### Instructions

Monkey-patch the following methods to the `Array` class. Remember, we want to
use `prototype` here.

- `Array#uniq` - returns a new array containing each individual element of the
  original array only once (creating all unique elements)
  - should keep elements in the order in which they first appear in the
    original array
  - should not mutate the original array
  - `([1,2,2,3,3,3].uniq() => [1,2,3])`
- `Array#twoSum` - returns an array of position pairs where the elements sum to zero
- `Array#transpose` - returns the [transpose] of a two-dimensional array
  - should not mutate the original array

### Recap

That was super fun, right?

[transpose]: https://en.wikipedia.org/wiki/Transpose

## Phase 2: Enumerable

### Overview

JavaScript enumerates over arrays differently than Ruby; rather than taking a
block, they take a _callback_ function, which is invoked for each element of the
array. Take a look at the [MDN Array Documentation][mdn-array] if it is unclear
how these methods are supposed to work.

### Instructions

Again, monkey-patch the following methods to the `Array` class using swell new
language we've been learning.

- `Array#myEach(callback)` - receives a callback function and executes the
  callback for each element in the array
  - Note that JavaScript's `forEach` function has no return value (returns
    `undefined`)
- `Array#myMap(callback)` - receives a callback function, returns a new array of
  the results of calling the callback function on each element of the array
  - should use `myEach` and a closure
- `Array#myReduce(callback[, initialValue])` - (like Ruby's `Array#inject`)
  receives a callback function, and optional initial value, returns an
  accumulator by applying the callback function to each element and the result
  of the last invocation of the callback (or initial value if supplied)

  - `initialValue` is optional and should default to the first element of the
    array if not provided
  - examples:

    ```js
    // without initialValue
    [1, 2, 3].myReduce(function(acc, el) {
      return acc + el;
    }); // => 6

    // with initialValue
    [1, 2, 3].myReduce(function(acc, el) {
      return acc + el;
    }, 25); // => 31
    ```

  - should also use `myEach`

**NB** `[initialValue]` is the conventional way for documentation to express
that the args between `[` and `]` are optional inputs. Your function definition
will not include these square brackets.

### Recap

Closures and callbacks are part of the foundation of JavaScript and provide us
with a lot of flexibility and modularity in our code. Thanks to closures we can
create higher order functions and "hide" private variables.

[mdn-array]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

## Phase 3: Iteration

### Overview

Let's do a few slightly more involved problems with arrays. These should be
pretty familiar.

### Instructions

Write the following functions:

- `Array#bubbleSort` - receives an array, returns a sorted array by implementing
  [`bubble sort`][bubblesort] sorting algorithm
- `String#substrings` - receives a string, returns an array of all substrings

### Recap

These implementations should be almost identical to those we created in Ruby,
with some differences in what we're allowed to use. There is no parallel
assignment in JavaScript like we saw in Ruby, but we do get the [destructuring
assignment][destructuring] syntax. In addition to the `+=` operator we had in
Ruby, we now also have the `++` [increment operator][increment] in JavaScript.

[bubblesort]: https://en.wikipedia.org/wiki/Bubble_sort
[destructuring]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
[increment]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Increment_()

## Phase 4: Recursion

### Overview

Thought you were done with recursion, eh? Never! Recursion is not only an
important method of destructuring problems, but also form the basis of many of
the interview questions you may be asked while job hunting. Let's get some more
practice with recursion in JavaScript!

### Instructions

Write the following functions:

- `range(start, end)` - receives a start and end value, returns an array from
  start up to end
- `sumRec(arr)` - receives an array of numbers and recursively sums them
- `exponent(base, exp)` - receives a base and exponent, returns the base raise
  to the power of the exponent (`base ^ exp`)

  - write two versions:

  ```
  # this is math, not Ruby methods.

  # version 1
  exp(b, 0) = 1
  exp(b, n) = b * exp(b, n - 1)

  # recursion 2
  exp(b, 0) = 1
  exp(b, 1) = b
  exp(b, n) = exp(b, n / 2) ** 2             [for even n]
  exp(b, n) = b * (exp(b, (n - 1) / 2) ** 2) [for odd n]
  ```

- `fibonacci(n)` - receives an integer, `n`, and returns the first `n` Fibonacci
  numbers
- `deepDup(arr)` - deep dup of an `Array`!

---

#### 💡 Aside: type-checking in javascript

Type checking in JS can get very strange at times. There's a [`typeof`
operator][typeof] and and an [`instanceof` operator][instanceof]. For our
purposes, we need to use the `instanceof` operator.

[instanceof]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
[typeof]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof

---

- `bsearch(arr, target)` - receives a sorted array, returns the index of the
  target or `-1` if not found

---

#### 💡 Another aside: Why `-1`?

In case you are wondering, returning `-1` is a common practice when returning
the index of an element that does not exist. The reasoning behind this is to
return the same type (`-1` is also a number) as if the element was found; that
way we can still bracket into the array, but will get `undefined` back. Though
this was not the case with Ruby, you will likely see this in other programming
languages. Try this on your own if you are curious.

---

- `mergesort(arr)` - receives an array, returns a sorted copy of the array by
  implementing [`merge sort`][merge-sort] sorting algorithm
- `subsets(arr)` - receives an array, returns an array containing all the
  subsets of the original array

### Recap

As you may have noticed, recursion works much the same in JavaScript as in Ruby.
Yay!

[merge-sort]: https://en.wikipedia.org/wiki/Merge_sort

## Phase 5: Create a `Cat` Class

### Overview

ES5 class syntax is very different from Ruby. Here we will be creating a `Cat`
class via a constructor function and adding instance variables by building out
`Cat.prototype`. This syntax may seem very strange, but it fits quite nicely into
the "Everything is an object" model.

### Instructions

- Define a `Cat` class
  - The constructor function should take a name and owner and store them in the
    instance
- Write `Cat.prototype.cuteStatement` method that returns
  `"[owner] loves [name]"`
  - `cuteStatement` should be defined on the prototype
- Prototypes example:
  - Create several `Cat` instances, test out their `cuteStatement` method
  - Reassign the `Cat.prototype.cuteStatement` method with a function that
    returns `"Everyone loves [name]!"`
  - Invoke the `cuteStatement` method on your old cats; the new method should be
    invoked
- Add a `meow` method to the `Cat` class You can now call `meow` on your
  previously constructed `Cat` instances
- Take one of your cats and set the `meow` property **on the instance**
  (`cat1.meow = function () { ... }`. Call `meow` on this `Cat` instance; call
  `meow` on any other cat. The other cats should continue to use the `prototype`
  method.

### Recap

We have used the `new` keyword and added methods to the prototype. We have
explored how classes instances are really just objects that are able to behave
like a class by maintaining a reference to their prototype. Note that it is
unusual to add a method directly to an instance, but is important to note that
methods defined on the instance override those defined on the prototype.

## Phase 6: Students and Courses

### Overview
Use the Object-Oriented Programming in JS reading for reference as you work on this exercise!

### Instructions

Write classes to model students and the courses they can enroll in.

#### `Student` class

- `Student` - a constructor function which should take a first and last name,
  and set both of those as attributes. It should also set a courses attribute to
  an empty array.
- `Student.prototype.name` - returns the concatenation of the student's first
  and last name
- `Student.prototype.enroll` - receives `Course` object, adds it to the
  student's list of courses, and updates the `Course`'s list of enrolled
  students
  - `enroll` should ignore attempts to re-enroll a student
- `Student.prototype.courseLoad` - returns a hash of departments to number of
  credits the student is taking in that department

#### `Course` class

- `Course`, a constructor function which should take the course name,
  department, and number of credits. It should also initialize `students`
  attribute to an empty array.
- `Course.prototype.addStudent` should add a student to the class
  - Probably can rely upon `Student.prototype.enroll`

### Overlapping Courses

- Each course should also take a set of days of the week (`'mon'`, `'tue'`,
  ...), plus a time block (assume each day is broken into 8 consecutive time
  blocks). So a course could meet `['mon', 'wed', 'fri']` during block #1.
  - Update your constructor function to also take a time block and days of the
    week
- Write a method `Course.prototype.conflictsWith` which takes a second `Course`
  and returns true if they conflict
- Update `Student.prototype.enroll` so that an error is raised if a `Student`
  enrolls in a course that conflicts with an existing course time
  - Write a `Student.prototype.hasConflict` helper method

### Recap

Though we will be relying on Rails for most of our data modeling going forward,
there are times when model logic is best handled on the frontend. In this case
we may find it beneficial to use OOP to aid us in that abstraction.

## You are the hero of your own story! Move on to the next exercise. 😸
