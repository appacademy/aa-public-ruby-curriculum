# Windowed Max Range

Given an array and a window size `w`, find the maximum range (`max - min`)
within a set of `w` elements.

Let's say you are given the array `[1, 2, 3, 5]` and a window size of 3.
Here, there are only two cases to consider:

```plaintext
1. [1 2 3] 5
2. 1 [2 3 5]
```

In the first case, the difference between the max and min elements of
the window is two (`3 - 1 == 2`). In the second case, that difference is
three (`5 - 2 == 3`). You want to write a function that will return the
larger of these two differences.

## Learning goals

By the end of this practice, you should be able to

* Approach a difficult problem using algorithms
* Explain the time complexity of your solution
* Explain the differences between a stack and a queue
* Use simple data structures to build more complicated ones

## Phase 1: Naive solution

One approach to solving this problem would be:

* Initialize a local variable `current_max_range` to `nil`.
* Iterate over the array and consider each window of size `w`. For each
   window:
  * Find the `min` value in the window.
  * Find the `max` value in the window.
  * Calculate `max - min` and compare it to `current_max_range`. Reset the value
    of `current_max_range` if necessary.
* Return `current_max_range`.

Implement this approach in a method, `windowed_max_range(array, window_size)`.
Make sure your code passes the following test cases:

```ruby
windowed_max_range([1, 0, 2, 5, 4, 8], 2) == 4 # 4, 8
windowed_max_range([1, 0, 2, 5, 4, 8], 3) == 5 # 0, 2, 5
windowed_max_range([1, 0, 2, 5, 4, 8], 4) == 6 # 2, 5, 4, 8
windowed_max_range([1, 3, 2, 5, 4, 8], 5) == 6 # 3, 2, 5, 4, 8
```

Think about the time complexity of your method. How many iterations are
required at each step? What is its overall time complexity in Big-O
notation?

### Analysis

It turns out that it is quite costly to calculate the `min` and `max`
elements of each window (each method is an `O(n)` operation). If you use
the `min` AND `max` methods built into Ruby, this costs us `2 * window_size`
iterations for each window (overall time complexity: `O(n^2)`).

What's more, in the naive solution, you consider each window as a slice of the
input array. On the first iteration, you slice the array from index `0` to
index `w`. On the second iteration, you slice from `1` to `w + 1`, and so
forth. However, slicing an array is rather costly (again, `O(n)`).
Remember, a new array is created when slicing an existing array.

What if it were possible to calculate `min` and `max` instantaneously (in
constant time) per window? This would allow you to find the windowed max range
in `O(n)` time. You can achieve this by writing a custom data structure
dedicated to solving this specific problem.

### Optimized solution

You will be creating a sequence of data structures that will culminate in a
`MinMaxStackQueue`, our custom data structure that will keep track of the `min`
and `max` in constant time. We will get to the specifics of how it does this
in a second.

You will be building the following in order:

* `MyQueue`
* `MyStack`
* `StackQueue`
* `MinMaxStack`
* `MinMaxStackQueue`

## Phase 2: `MyQueue`

Since the window only moves one index at a time, it would be nicer to represent
it as a `queue`. Every time you move the window, you could enqueue the next
element and dequeue the last element. This would allow you to avoid using
`Array#slice` so that you can traverse the array in constant time.

A **queue** is a simple abstract linear data structure where elements are stored
in order and can be added or removed one at a time. A queue follows the **first
in, first out** (FIFO) principle. Unlike Ruby's Array data structure, most Queue
implementations do not expose methods to slice or sort the data, or to find a
specific element. The basic operations are:

* Queue
  * `enqueue`: adds an element to the back of the queue
  * `dequeue`: removes an element from the front of the queue and returns it

You will also write a `peek` method, which returns the "top" or "next" item
without actually removing it.

Queues may be implemented in terms of simpler data structures, such as linked
lists, but in Ruby you can actually use an Array as the underlying data store,
as long as you don't expose it publicly (i.e., don't define an `attr_reader` for
it). You'll use an Array in today's exercises.

Implement a `Queue` class. Use the following `initialize` method as a starting
point:

```ruby
class MyQueue
  def initialize
    @store = []
  end
end
```

Implement `peek`, `size`, `empty?`, `enqueue`, and `dequeue` methods on your
`MyQueue`.

## Phase 3: `MyStack`

You want to find the windowed max range of an array in O(n) time, which means
you cannot make use of `Array#slice`, and each window must calculate the `min`
and `max` instantly. Every time you move the window, you `enqueue` the next
element and `dequeue` the last element. This solves the problem with `slice`.
However, removing items from `MyQueue` takes O(n) time. As the first element of
the array is shifted off, the remaining elements will be reassigned in new
position in memory. Also, it still leaves you with the problem of expensive `min`
and `max` operations. To resolve this, you'll have to make clever use of another
data structure, the **stack**.

Stacks are another simple linear data structure. Elements are also stored in
order and can be added or removed one at a time. A stack is **first in, last
out** (FILO). Similar to queues, stack implementations do not expose methods to
slice or sort the data, or to find a specific element. The basic operations are:

* Stack
  * `push`: adds an element to the top of the stack
  * `pop`:  removes an element from the top of the stack and returns it

Implement a `Stack` class. Use the following `initialize` method as a
starting point:

```ruby
class MyStack
  def initialize
    @store = []
  end
end
```

Implement `peek`, `size`, `empty?`, `pop` and `push` methods on your `MyStack`.

## Phase 4: `StackQueue`

With that done, you're going to implement a queue again, but with a twist:
rather than use an Array, you will implement it using your `MyStack` class under
the hood because `push`ing and `pop`ping from `MyStack` takes O(1) time. Done
properly, you will still have a queue but with the advantages of dequeuing in
O(1) time.

Before you start to code this, sit down and talk to your partner about
how you might implement this. You should not modify your `MyStack`
class, but use the interface it provides to implement a queue.

When you're ready, implement this `StackQueue` class with `size`, `empty?`,
`enqueue`, and `dequeue` methods.

**Hint**: You will want to use more than one instance of `MyStack`.

**Hint 2**: What if you always pushed onto one stack, and always popped
from the other? How will these two stacks interact?

**Hint 3**: Think about how a slinky walks down stairs. As the slinky descends
down a stair step, the top of a slinky becomes the bottom of the slinky...

**Code Review**: Request an Instructor code review at the end of this phase.

## Phase 5: `MinMaxStack`

Before you move on, let's take a step back to your `MyStack` class. You'll
modify it so that you always know the maximum value in the stack. We could write
a `max` method that calls `@store.max`. However, this requires you to iterate
over every item in the `@store` array, which gives you a time complexity of
O(n). This isn't good enough for you; you want to be able to return the max in
constant time (O(1)). If you can't iterate over `@store`, how else could you
modify the stack to get this functionality?

Once you have `max` implemented, it should be easy to add a `min` method.

**Hint**: You could store some metadata with the value of each element. In other
words, you can store more information than just the value with each new element
added to the store. Think about how to do this and what information to store.

Implement `peek`, `size`, `empty?`, `max`, `min`, `pop`, and `push` methods on
your `MinMaxStack`.

## Phase 6: `MinMaxStackQueue`

Just as you used your `MyStack` (Phase 3) to build your `StackQueue` (Phase 4),
use your `MinMaxStack` (Phase 5) to build a `MinMaxStackQueue`.

What methods are needed to solve this problem in O(n) time?

## Phase 7: Windowed Max Range

Now that you have a working `MinMaxStackQueue`, windowed max range should be a
much easier problem to solve. You'll want to follow the same basic approach as
above, but use our new data structure instead of array slices. As before, return
the `current_max_range` at the end of the method. Make sure all the test cases
pass, and that both of you understand the time complexity of this solution.

**Code Review**: Request an Instructor code review at the end of this phase.