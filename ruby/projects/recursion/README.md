# Recursion

These exercises will give you practice using recursion.

## Learning goals

By the end of this practice, you should be able to

- Reason about recursive programs, including
  - Writing a base case for a recursive method
  - Writing the inductive step for a recursive method
- Explain the benefits of writing a method recursively vs. iteratively
- Trace a recursive method and figure out how many recursive steps it will take
- Write recursive sorting and searching algorithms

## Warmup

- Write a recursive method, `range`, that takes a start and an end and returns
  an array of all numbers in that range, exclusive. For example, `range(1, 5)`
  should return `[1, 2, 3, 4]`. If `end < start`, return an empty array.
- Write both a recursive and an iterative method to sum an array.

## Exponentiation

Write two versions of `exponent` that use two different recursions:

```plaintext
# this is math, not Ruby methods.

# recursion 1
exp(b, 0) = 1
exp(b, n) = b * exp(b, n - 1)

# recursion 2
exp(b, 0) = 1
exp(b, 1) = b
exp(b, n) = exp(b, n / 2) ** 2             [for even n]
exp(b, n) = b * (exp(b, (n - 1) / 2) ** 2) [for odd n]
```

Note that for recursion 2, you will need to square the results of
`exp(b, n / 2)` and `(exp(b, (n - 1) / 2)`. Remember that you don't need to do
anything special to square a number, just calculate the value and multiply it by
itself. **So don't cheat and use exponentiation in your solution.**

**Suggestion**: Break the methods down into parts. For more information, check
out the Breaking Methods Into Parts reading in the sidebar.

**Suggestion 2**: Try walking through your code with **simple examples.**

If the `n == 256`, about how many nested recursive steps will you run in the
first case?

How deep will you need to recurse for the second? Keep in mind that the first
reduces the exponent by one for each recursion, while the second reduces it by
half.

In addition to testing your methods by running the code, try the following
exercise:

On paper, write out the value of each variable for every line in the code:

- Write out what happens with base 0 and power 0 as inputs, i.e., `exp(0,0)`
  (should be easy).
- Write out what happens for base 0 and power 1, i.e., `exp(0,1)`.
- Write out what happens for base 1 and power 0.
- Write out what happens for base 1 and power 1.
- Write out what happens for base 1 and power 2.
- Write out what happens for base 2 and power 0.
- Write out what happens for base 2 and power 1.
- Write out what happens for base 2 and power 2.

Make sure you can trace from the very beginning to the very end in these
examples.

How many examples do you need to walk through to be confident that it works?

## Deep dup

The `#dup` method doesn't make a **deep copy**:

```ruby
robot_parts = [
  ["nuts", "bolts", "washers"],
  ["capacitors", "resistors", "inductors"]
]

robot_parts_copy = robot_parts.dup

# shouldn't modify robot_parts
robot_parts_copy[1] << "LEDs"
# but it does
robot_parts[1] # => ["capacitors", "resistors", "inductors", "LEDs"]
```

When you `dup` an `Array`, it creates a new array to hold the elements, but
doesn't recursively `dup` any arrays contained therein. So the `dup` method
creates one new array, but just copies over references to the original interior
arrays.

Sometimes you want a shallow dup and sometimes you want a deep dup. Ruby keeps
things simple by giving you shallow dup, and letting you write deep dup
yourself.

**Using recursion and the `is_a?` method, write an `Array#deep_dup` method that
will perform a "deep" duplication of the interior arrays.**

**Note:** For simplicity's sake, you are only going to ensure the deep
duplication of arrays. Don't worry about deep-duping (or regular-duping) other
types of mutable objects (like strings, hashes, instances of custom classes,
etc.), since this would require that you implement a deep dup method for each of
those classes as well.

It's okay to iterate over array elements using the normal `each` for this one.
:-)

**You should be able to handle "mixed" arrays**. For instance:
`[1, [2], [3, [4]]]`.

## Fibonacci

Write a recursive and an iterative Fibonacci method. The method should take in
an integer `n` and return the first `n` Fibonacci numbers **in an array**.

You shouldn't have to pass any arrays between methods; you should be able to do
this just passing a single argument for the number of Fibonacci numbers
requested.

## Binary search

The binary search algorithm begins by comparing the target value to the value of
the middle element of a sorted array. If the target value is equal to the
middle element's value, then the position is returned and the search is
finished. If the target value is less than the middle element's value, then the
search continues on the lower half of the array; or if the target value is
greater than the middle element's value, then the search continues on the upper
half of the array.

This process continues, eliminating half of the elements--and comparing the
target value to the value of the middle element of the remaining elements--until
either the target value is found (and its associated element position is
returned) or the entire array has been searched (and "not found" is
returned).

Write a recursive [binary search][wiki-binary-search]: `bsearch(array, target)`.
**Note that binary search works only on sorted arrays**. Make sure to return the
location of the found object (or `nil` if not found!). **Hint:** you will
probably want to use subarrays.

Make sure that these test cases are working:

```rb
bsearch([1, 2, 3], 1) # => 0
bsearch([2, 3, 4, 5], 3) # => 1
bsearch([2, 4, 6, 8, 10], 6) # => 2
bsearch([1, 3, 4, 5, 9], 5) # => 3
bsearch([1, 2, 3, 4, 5, 6], 6) # => 5
bsearch([1, 2, 3, 4, 5, 6], 0) # => nil
bsearch([1, 2, 3, 4, 5, 7], 6) # => nil
```

## Merge sort

Implement a [`merge_sort`][wiki-merge-sort] method that sorts an `Array`:

- The base cases are for arrays of length 0 or 1. Do not use a length-2 array as
  a base case. This is unnecessary.
- You'll want to write a `merge` helper method to merge the sorted halves.
- To get a visual idea of how merge sort works, watch [this gif][wiki-merge-gif]
  and check out [this diagram][merge-diagram].

[wiki-binary-search]: http://en.wikipedia.org/wiki/Binary_search
[wiki-merge-sort]: http://en.wikipedia.org/wiki/Merge_sort
[wiki-merge-gif]: https://en.wikipedia.org/wiki/Merge_sort#/media/File:Merge-sort-example-300px.gif
[merge-diagram]: https://assets.aaonline.io/fullstack/ruby/assets/merge-sort-diagram.png

## Array subsets

Write a method `subsets` that will return all subsets of an array.

```ruby
subsets([]) # => [[]]
subsets([1]) # => [[], [1]]
subsets([1, 2]) # => [[], [1], [2], [1, 2]]
subsets([1, 2, 3])
# => [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]]
```

You can implement this as an Array method if you prefer.

**Hint**: For `subsets([1, 2, 3])`, there are two kinds of subsets:

- Those that do not contain `3` (all of these are subsets of `[1, 2]`).
- For every subset that does not contain `3`, there is also a corresponding
  subset that **does** contain `3`.

## Permutations

Write a recursive `permutations(array)` method that calculates all the
[permutations][wiki-permutations] of the given array. For an array of length `n`
there are `n!` different permutations. So for an array with three elements, you
will have `3 * 2 * 1 = 6` different permutations.

```ruby
permutations([1, 2, 3]) # => [[1, 2, 3], [1, 3, 2],
                        #     [2, 1, 3], [2, 3, 1],
                        #     [3, 1, 2], [3, 2, 1]]

```

You can use Ruby's built in [`Array#permutation`][ruby-permutations] method to
get a better understanding of what you will be building (but do **NOT** use this
method in your `permutations` code!).

```ruby
[1, 2, 3].permutation.to_a  # => [[1, 2, 3], [1, 3, 2],
                            #     [2, 1, 3], [2, 3, 1],
                            #     [3, 1, 2], [3, 2, 1]]
```

[wiki-permutations]: https://en.wikipedia.org/wiki/Permutation
[ruby-permutations]: https://ruby-doc.org/core-2.2.0/Array.html#method-i-permutation

## Make change

> **Note:** Ruby Quiz posed this problem as Quiz #154 (see link below). The link
> includes discussion and solutions, however, so don't visit it until you have
> at least attempted a solution yourself first!

Write a `make_change` method that, given 1) the amount of change to make and 2)
an array of possible coin values, e.g., [25, 10, 5, 1]--assume you have an
infinite supply of each coin type--returns the optimal (= least amount of coins)
change. (This is more challenging than it may sound at first.)

Here's a game plan for solving the problem.

First, write a 'greedy' version called `greedy_make_change`:

- Take as many of the biggest coins as possible and add them to your result.
- Add to the result by recursively calling your method on the remaining amount,
  leaving out the biggest coin, until the remainder is zero.

Once you have a working greedy version, talk with your partner about refactoring
this to `make_better_change`. What's wrong with `greedy_make_change`?

Consider the case of `greedy_make_change(24, [10,7,1])`. Because it takes as
many `10` pieces as possible, `greedy_make_change` misses the correct answer of
`[10,7,7]` (try it in pry).

To `make_better_change`, you only take one coin at a time and never rule out
denominations that you've already used. This allows each coin to be available
each time you get a new remainder. By iterating over the denominations and
continuing to search for the best change, you assure that you test for
'non-greedy' uses of each denomination.

Discuss the following game plan and then work together to implement your new
method:

- Iterate over each coin.
- **Grab only one** of that one coin and recursively call `make_better_change`
  on the remainder using coins less than or equal to the current coin.
- Add the single coin to the change returned by the recursive call. This
  will be a possible solution, but may not be the best one.
- Keep track of the best solution and return it at the end.

**N.B.:** Don't generate every possible permutation of coins and then compare
them. Remember that a permutation is not the same thing as a combination. You
**will** need to check every combination of coins that add up to your `target`,
you just don't want to check the same combination in different orders. If you
get stuck you can start by writing a solution that calculates and compares all
of the permutations without storing them in an array. Then go back and refactor
your solution so that it only calculates and compares all of the different
combinations. If you and your partner get totally stuck, or would like to
compare your answer, feel free to reference [this video
walkthrough][make-change] of the problem or see this
[discussion][make-change-mirror] on Ruby Quiz.

Make sure you and your partner understand each line before moving on.

[make-change-mirror]: https://web.archive.org/web/20130215052843/http://rubyquiz.com/quiz154.html
[make-change]: https://vimeo.com/91207646

## Resources

- [Recursion][wiki-recursion] (Wikipedia)

[wiki-recursion]: http://en.wikipedia.org/wiki/Recursion_(computer_science)