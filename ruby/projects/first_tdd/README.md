# Test-Driven Development

Do all of the following exercises using Test-Driven Development (TDD). That
means writing specs **first**!  

When approaching each problem, make sure to

  1. Read the entire problem statement.
  2. Talk with your partner to identify test cases and key functionality to
     expect from your code.
  3. Write RSpec tests.
  4. Write the method you now have tests for. Follow the red-green-refactor
     approach until all specs pass.  

**Expected time: 2 hrs**

## Learning goals

By the end of this practice, you should

* Be able to explain what functionality your testing will cover
* Know the hierarchy / syntax of RSpec methods (`describe`, `before`, `let`,
  `it`, `expect`, etc.)
* Be comfortable writing RSpec tests
* Know when to use `let` and `subject`

## `uniq`

Array has a `uniq` method that removes duplicates from an array. It returns the
unique elements in the order in which they first appeared:

```ruby
[1, 2, 1, 3, 3].uniq # => [1, 2, 3]
```

Write your own version of this method called `my_uniq`; it should take in an
array and return a new array.

## `two_sum`

Write a new `Array#two_sum` method that finds all pairs of positions where the
elements at those positions sum to zero.

**N.B.:** Ordering matters. You want each of the pairs to be sorted with the
smaller index before the bigger index. You then want the array of pairs to be
sorted "dictionary-wise":

```ruby
[-1, 0, 2, -2, 1].two_sum # => [[0, 4], [2, 3]]
```

* `[0, 2]` before `[2, 1]` (smaller first elements come first)
* `[0, 1]` before `[0, 2]` (then smaller second elements come first)

## `my_transpose`

To represent a _matrix_, or two-dimensional grid of numbers, you can write an
array containing arrays which represent rows:

```ruby
rows = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
]

row1 = rows[0]
row2 = rows[1]
row3 = rows[2]
```

You could equivalently have stored the matrix as an array of columns:

```ruby
cols = [
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8]
]
```

Write a method, `my_transpose`, which will convert between the row-oriented and
column-oriented representations. You may assume square matrices for simplicity's
sake. Usage will look like the following:

```ruby
my_transpose([
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
])
 # => [[0, 3, 6],
 #     [1, 4, 7],
 #     [2, 5, 8]]
```

## Stock Picker

Write a method that takes an array of stock prices (prices on days 0, 1, ...),
and outputs the most profitable pair of days on which to first buy the stock and
then sell the stock.  Remember, you can't sell stock before you buy it!

## Towers of Hanoi

Write a [Towers of Hanoi][Hanoi] game.

Keep three arrays, which represent the piles of discs. Pick a representation of
the discs to store in the arrays, maybe just a number representing their size.
Don't worry too much about making the user interface pretty.

In a loop, prompt the user (using [gets][gets-and-chomp]). Ask what pile to
select a disc from and where to put it.

After each move, check to see if they have succeeded in moving all the
discs to the final pile. If so, they win!

**Note:** Don't worry about testing the UI. Testing console I/O is tricky (i.e.,
don't bother checking `gets` or `puts`). Focus on:

* `#move`
* `#won?`

**When you're finished, get a code review from an Instructor!**

## Resources

* [Ruby Doc on Array](http://www.ruby-doc.org/3.1.3/Array.html)
* [Ruby Array Article](http://zetcode.com/lang/rubytutorial/arrays/)

[gets-and-chomp]: http://andreacfm.com/ruby/2011/06/11/learning-ruby-gets-and-chomp.html
[Hanoi]: http://en.wikipedia.org/wiki/Towers_of_hanoi