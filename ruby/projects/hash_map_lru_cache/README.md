# MyHashMap

Today you will implement your very own HashMap. If this sounds tricky, don't
worry: you have specs provided. Download the skeleton to get started.

> **NOTE:** To download the skeleton, click on the `Download Project` button at
> the bottom of this page. On the ensuing GitHub page, click the green `<> Code`
> button and select `Download ZIP`.

## Learning goals

By the end of this project, you should be able to

- Describe the characteristics of a good hashing function
- Explain how a linked list works and know how to traverse it
- Explain how a hash map works
- Implement an LRU cache using hash maps and linked lists

## Phase 1: IntSet

A _Set_ is a data type that can store unordered, unique items. Sets don't make
any promises regarding insertion order, and they won't store duplicates. In
exchange for those constraints, sets have remarkably fast retrieval time and can
quickly look up the presence of values.

Many mathematicians claim that sets are the foundation of mathematics, so
basically you're going to build **all of mathematics** today. No big deal.

A set is an _abstract data type_ ([ADT]). An ADT can be thought of as a
high-level description of a structure and an API (i.e., a specific set of
methods). Examples of ADTs are things like sets, maps, or queues. But any given
data type or API can be realized through many different implementations. Those
implementations are known as _data structures_.

Different data structures can implement the same abstract data type, but some
data structures will work better than others. This practice will show you **the
best** implementations, or close to them. (In reality, there's usually no single
best implementation of an ADT; there are always tradeoffs.)

Sound cool yet? Now let's go build a Set.

[ADT]: https://en.wikipedia.org/wiki/Abstract_data_type

### MaxIntSet

Let's start with the first stage. In this version of a set, you can only store
integers that live in a predefined range. So given a maximum integer that
someone will ever want to store, you provide a set that can store that integer
and any smaller non-negative numbers.

- Initialize your MaxIntSet with an integer called `max` to define the range of
  integers that you're keeping track of.
- Internal structure:
  - An array called `@store` of length `max`
  - Each index in the `@store` will correspond to an item, and the value at that
    index will correspond to its presence (either `true` or `false`)
  - E.g., the set `{ 0, 2, 3 }` will be stored as: `[true, false, true, true]`
  - The size of the array will remain constant!
  - The `MaxIntSet` should raise an error if someone tries to insert, remove, or
    check inclusion of a number that is out of bounds.
- Methods:
  - `#insert`
  - `#remove`
  - `#include?`

Once you've built this and it works, move on to the next iteration.

### IntSet

Now let's see if you can keep track of an arbitrary range of integers. Here's
where it gets interesting. Create a brand new class for this one. You'll still
initialize an array of a fixed length--say, 20. But now, instead of each element
being `true` or `false`, they'll each be sub-arrays.

Imagine the set as consisting of 20 buckets (the sub-arrays). When you insert an
integer into this set, you'll pick one of the 20 buckets where that integer will
live. That can be done easily with the modulo operator: `i = n % 20`.

Using this mapping, which wraps around once every 20 integers, every integer
will be deterministically assigned to a bucket. Using this concept, create your
new and improved set.

- Initialize an array of size 20 with an empty array stored at each index.
- To add a number to the set, modulo (%) the number by the set's length and
  add it to the array at that index. If the integer is present in that bucket,
  then it's included in the set.
- You should implement the `#[]` method to easily look up a bucket in the store;
  calling `self[num]` will be more DRY than `@store[num % num_buckets]` at every
  step of the way!
- Your new set should be able to keep track of an arbitrary range of integers,
  including negative integers. Test it out.

### ResizingIntSet

The IntSet is okay for small sample sizes. But if the number of elements grows
pretty big, your set's retrieval time depends more and more on an array scan,
which is what you're trying to get away from. It's slow.

Scanning for an item in an array (when you don't know the index) takes `O(n)`
time because you potentially have to look at every item. So if you're having to
do an array scan on one of the 20 buckets, that bucket will have on average
1/20th of the overall items. That gives us an overall time complexity
proportional to `0.05n`. When you strip out the 0.05 constant factor, that's
still `O(n)`. Meh.

Let's see if you can do better.

- Make a new class: ResizingIntSet. This time, let's increase the number of
  buckets as the size of the set increases. The goal is to have `store.length >
  n` at all times.
- You may want to implement an `inspect` method to make debugging easier.
- What are the time complexities of the operations of your set implementation?

## Phase 2: Hashing

**Notes:**

- **Don't spend more than 20 minutes working on hashing functions.** Great
  hashing functions are hard to write. Your goal is to write a good-enough
  hashing function and move on to the fun stuff ahead! Call over an Instructor
  if needed.
- **Avoid using Byebug inside your hash methods.** The functioning of Byebug's
  internal code will cause this to break since it calls `Array#hash`.
- **You may want to refer to this resource on [XOR][xor-info]. Please read the
  intro and the section about bitwise XOR (i.e., exclusive or)** (`^` in Ruby).
  XOR is a great tool for hashing because it's fast and it provides a good,
  nearly uniform output of bits.

A hash function is a sequence of mathematical operations that deterministically
maps any arbitrary data into a pre-defined range of values. Anything that does
that is a hash function. However, a _good_ hash function satisfies the property
of being **uniform** in how it distributes that data over its range of values.

To create a good hash function, you want to be able to hash absolutely anything.
That includes integers, strings, arrays, and even other hashes.

Also, a hash function should be **deterministic**, meaning that it should always
produce the same value given the same input. It's also essential that equivalent
objects produce the same hash. So if you have two arrays, each equal to
`[1, 2, 3]`, you want them both to hash to the same value.

Let's construct a nice hashing function that'll do that for you. Be creative
here!

Write hash functions for `Array`, `String`, and `Hash`. Build these up
sequentially.

- Use `Integer#hash` as a base hashing function. The trick here will be to
  create a scheme to convert instances of each class to a `Integer` and then
  apply this hashing function. This can be used on `Numeric`s such as the index
  of an array element.
  - Don't try to overwrite Ruby's native `Integer#hash`; making a hash function
    for numbers is something that's outside the scope of this assignment.
- Ordering of elements is essential to hashing an `Array` or `String`. This
  means each element in an `Array` or `String` should be associated with its
  index during hashing. Ex. `[1, 2, 3].hash == [3, 2, 1].hash # => false`
- On the other hand, ordering is **not** to be considered with a `Hash`. Hashes
  are based on sets and have no fixed order. E.g.,
  `{a: 1, b: 2}.hash == {b: 2, a: 1}.hash # => true`

### Hints

- Can you write `String#hash` in terms of `Array#hash`?
- When you get to hashing hashes: one trick to make a hash function
  order-agnostic is to turn the object into an array, stably sort the array, and
  then hash the array. This'll make it so every unordered version of that same
  object will hash to the same value.

[More reading on hash functions][hash-info].

[xor-info]: https://www.calleerlandsson.com/posts/rubys-bitwise-operators/
[hash-info]: https://en.wikipedia.org/wiki/Hash_function

## Phase 3: HashSet

Now that you've got your hashing functions, you can store more than just
integers. A proper hashing function also ensures that the elements that you
store will be evenly distributed amongst your buckets, hopefully keeping your
buckets to length <= 1. Your freshly cooked up hashing functions are awesome,
but for the rest of this project, rely on the built-in Ruby hashing functions to
minimize the clustering of elements that can occur with your hand-made
functions. Let's go ahead and implement a HashSet!

This will be a simple improvement on `ResizingIntSet`. Just hash every item
before performing any operation on it. This will return an integer, which you
can modulo by the number of buckets. Implement the `#[]` method to DRY up your
code. With this simple construction, your set will be able to handle keys of any
data type.

Not too different from what you had before - and you now have a much better set
that works with any data type! Time to request a **code review.**

Now let's take it one step further.

Up until now, your hash set has only been able to insert and then check for
inclusion. You couldn't create a map of values, as in key-value pairs. Let's
change that and create a _hash map_. But first, you'll have to build a
subordinate, underlying data structure.

## Phase 4: Linked list

A [linked list][linked-list-wiki] is a data structure that consists of a series
of nodes. Each node holds a value and a pointer to the next node (or to `nil`).
Given a pointer to the first (or head) node, you can access any arbitrary node
by traversing the nodes in order.

You will be implementing a special type of linked list called a "doubly linked
list". This means that each node should also hold a pointer to the previous
node. Given a pointer to the last (or tail) node, you can traverse the list in
reverse order.

Your `LinkedList`s will ultimately be used in lieu of arrays for your `HashMap`
buckets. In order to make the `HashMap` work, each node in your linked list will
need to store both a key and a value.

The `Node` class is provided for you. It's up to you to implement the
`LinkedList`.

### Making heads and tails of `LinkedList`

There are a few ways to implement `LinkedList`. You can either start with the
head and tail of your list as `nil`, or start them off as sentinel nodes. For
this project, you will be using sentinel nodes to avoid unnecessary type
checking for `nil`.

A sentinel node is merely a "dummy" node that does not hold a value. Your
`LinkedList` should keep track of pointers (read: instance variables) to
sentinel nodes for its head and tail. The head and tail should never be
reassigned.

Given these properties of your `LinkedList`, how might you check if your list is
empty? How might you check if you are at the end of your list? Think about how
your linked list will function as you implement the methods below.

### Methods to implement

Go forth and implement the following methods:

- `first`
- `empty?`
- `#append(key, val)` - Append a new node to the end of the list.
- `#update(key, val)` - Find an existing node by key and update its value.
- `#get(key)`
- `#include?(key)`
- `#remove(key)`

If you are surprised by any spec failures along the way, remember to read both
the RSpec messages and the spec file itself. Does the setup for this test rely
on any methods that you haven’t yet implemented? Be sure not to put on “spec
blinders”: try out the methods you’re writing for yourself to test their
behavior, and don’t let passed or failed specs be your only metric for whether
you’ve written the code you need.

Once you're done with those methods, you're also going to make your linked lists
enumerable. You want them to be just as flexible as arrays. Remember back to
when you wrote `Array#my_each` and let's get this thing enumerating. The block
passed to `#each` will yield to a `node`.

Once you have `#each` defined, you can include the `Enumerable` module into your
class. As long as you have `each` defined, the `Enumerable` module gives you
`map`, `each_with_index`, `select`, `any?`, and all of the other enumeration
methods for free! (Note: you may wish to refactor your `#update`, `#get`, and
`#include` methods to use your `#each` method for cleaner code!)

## Phase 5: Hash Map (reprise)

So now let's incorporate your linked list into your hash buckets. Instead of
Arrays, you'll use `LinkedLists` for your buckets. Each linked list will start
out empty. Whenever you want to insert an item into a bucket, you'll just append
it to the end of that bucket's linked list.

So here again is a summary of how you use your hash map:

- Hash the key, mod by the number of buckets. (Implement the `#bucket` method
  first for cleaner code - it should return the correct bucket for a hashed
  key.)
- To **set**, insert a new node with the key and value into the correct bucket.
  (You can use your `LinkedList#append` method.) If the key already exists, you
  will need to update the existing node.
- To **get**, check whether the linked list contains the key you're looking up.
- To **delete**, remove the node corresponding to that key from the linked list.

Finally, let's make your hash map properly enumerable. You know the drill.
Implement `#each` and then include the `Enumerable` module. Your method should
yield `[key, value]` pairs.

Also make sure your hash map resizes when the count exceeds the number of
buckets! In order to resize properly, you have to double the size of the
container for your buckets. Having done so, enumerate over each of your linked
lists and re-insert their contents into your newly-resized hash map. If you
don't re-hash them, your hash map will be completely broken. Can you see why?

Now pass those specs.

Once you're done, you should have a fully functioning hash map that can use
numbers, strings, arrays, or hashes as keys. Show off your understanding by
asking an Instructor for a **code review**.

[linked-list-wiki]: https://en.wikipedia.org/wiki/Linked_list

## Head to Part 2!

Once you are finished with Phases 1 - 5, head over to [Part Two.](part_two.md)