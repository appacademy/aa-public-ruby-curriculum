# Bonus Phase: Dynamic Arrays

You're probably used to working with Ruby's `Array` class by now. It's very
convenient and chock-full of optimized methods. But it's a little too magical
for data structure adventurers like you, so you're going to build Ruby's entire
`Array` class from scratch.

This is getting into some serious stuff now, so don't try this at home (and you
probably won't want to use your home-spun `Array` class in production; you are
doing this for the sake of knowledge and discovery only!)

Let's pull back the hood a bit.

Ruby is written in **C**. C is a very low-level language, which means it's much
closer to machine code than Ruby itself is. In Ruby, you never have to deal with
things like garbage collection or memory management. That is to say, you never
have to tell Ruby "Hey, I'm never going to use this hash again, so please delete
it from memory". Ruby just knows to do it for you. This is because some
machinery inside of Ruby is taking care of all the little details for you.

Similarly, underlying all of the flexibility and convenience of the Ruby `Array`
data structure, there is a more rigid and constraining data structure: the C
array.

C arrays are extremely simple. Each one is basically a row of buckets. C arrays
must have their memory allocated before-hand, and they never change in size. You
can jump into any bucket in that array in `O(1)` time, and you can put anything
into that bucket. And that's it. The API is overwhelmingly simple. For our
purposes, there's no `push`, no `pop`, no `each` or `includes?`. In fact, you
can't even just add a bunch of items to the array: you have to know beforehand
how many items you will ever want the array to hold. Otherwise, you'll get
overflow errors (i.e., a bad time).

Ruby is nice, so Ruby decided to build a pretty little `Array` class on top of
C's array. But this array doesn't require you to know how big the underlying
array will ever need to be. Instead, Ruby's arrays resize dynamically, just like
the hash maps you built.

By now you know the drill. Let's build this thing.

C arrays are not exposed to you in Ruby, so you can't work directly with them to
rebuild Ruby's dynamic array. But to simulate the exercise, you've been given
access to a `StaticArray` class. `StaticArray` mimics a C array (and, as you
now know, contains one underneath the hood). Use the `StaticArray` class from
the skeleton's last file to build your dynamic array.

Get to it. Specs await.

## Super-bonuses

- Power up your dynamic array so that it uses a [ring
  buffer][ring-buffer-reading]. This will allow you to `shift` and `unshift` in
  `O(1)` time while minimizing your space usage. The math here is tricky; lots
  of modulo division and keeping track of a `@start_idx`. But once you have
  this, you've got the dynamic array mastered.

- Augment your hash map so that it retains insertion order. (Ruby hashes began
  retaining insertion order after Ruby 1.9.) In order to pull this off, you'll
  have to add an additional data structure. See if you can figure it out! Test
  it using your `#each` and see if the original order is retained after
  reassignments.

[ring-buffer-reading]: https://en.wikipedia.org/wiki/Circular_buffer#How_it_works