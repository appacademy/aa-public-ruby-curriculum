# LRU Cache (Part Two)

**Finish Phases 1-5 before continuing!**

## Phase 6: LRU Cache

Let's upgrade your hash map to make an LRU Cache.

LRU stands for _Least Recently Used_. It's basically a cache of the `n`
most-recently-used items. In other words, if something doesn't get looked at
often enough, you trash it. It could be web pages, objects in memory on a video
game, or kitty toys. But it's usually not kitty toys.

[Read more about it here][lru-cache].

If you're confused, that's okay. Just follow these basic principles and you'll
be fine.

- Your cache will only hold `max` items (you should be able to set the
  `max` upon initialize).
- When you retrieve or insert an item, you should mark that item as now being
  the most recently used item in your cache.
- When you insert an item, if the cache exceeds size `max`, delete the least
  recently used item. This keeps the cache size always at or below `max`.

So that's your caching strategy. But how do you actually build this thing? Well,
an LRU cache is built using a combination of two data structures: a hash map
and a linked list.

This is how you'll use the linked list: each node in the list will hold a cached
object. You'll always add new nodes to the end of the list, so the nodes at the
end will always be the freshest, while those at the beginning are the oldest.
Whenever an object is requested and found in the cache, it becomes the freshest
item, so you'll need to move it to the end of the list to maintain that order.

Once the cache is full, you'll need to expire old entries too, so you'll remove
items from the beginning since those are the oldest.

With just that, you've got a decent strategy for your LRU cache. Using a linked
list, it's easy to add stuff, delete stuff, and to update its position among the
most recently used items in your cache.

The only problem is lookup time. Linked lists are slow. If you want to figure
out if an item is in the cache, you have to look at each node one-by-one; that's
an `O(n)` traversal. That's not great. Let's see if you can augment this with a
hash map to make it faster.

Here's the plan: you'll create a hash map whose keys will be the same keys that
you put in your linked list. But unlike the linked list, your hash map won't
store the values associated with those keys. Instead, the hash map will point to
the _node object in your linked list_ (if it exists). Every time you update the
LRU cache by inserting or deleting an element, you'll insert it into your hash
or delete it from your hash (which both take `O(1)` time).

![](https://assets.aaonline.io/fullstack/ruby/assets/lru-cache-scaled500.png)

You'll have two data structures to keep in sync now, which is a little more
complicated. But the upside is that your hash map will allow you to jump into
the middle of the linked list instantly, in `O(1)` time. That's awesome.

With this combination of data structures, you'll have `O(1)` lookup, insertion,
and deletion for your cache. You can't ask for better.

So let's map the same data in both a hash map and a linked list.

[lru-cache]: https://www.geeksforgeeks.org/lru-cache-implementation/

### Instructions

- Let's say you're building an LRU cache that's going to cache the values of the
  perfect squares. Our LRU cache will store a `@prc`--in this case, it will be
  `Proc.new { |x| x ** 2}`--to compute the squares. You don't want to compute
  the square for the same number twice, though, so you will first check to see
  if the value is in your LRU cache. If you get an input that doesn't exist in
  the cache, you will compute the input's square using the Proc and then store
  the result in the cache.
- Now build your LRU cache. How you proceed for any given input will depend on
  whether or not that input already appears as a key in your hash map.
  - If the input/key does appear in your hash map, then the corresponding node
    exists in the cache. Remember to move the node to the end of the list (since
    it's now the most recently used item) before you return its value.
  - If the input/key is not in your hash map, then its value is not stored in
    the cache. You should compute its value and add it to the cache:
    - First, call the proc using the key as input; the output will be the key's
      value.
    - Next, append that key-value pair to the linked list (since, again, it's
      now the most recently used item). Then add the key to your hash, along
      with a pointer to the new node.
    - Finally, check if the cache has exceeded its `max` size. If so, call the
      `eject!` function, which should delete the least recently used item so
      that your LRU cache is back to `max` size.
    - **Hint:** to delete that item, you have to 1) delete the **first** item in
      your linked list and 2) delete that item's key from your hash. Implemented
      correctly, these should both happen in `O(1)` time.

And you did it! Congratulations! Celebrate by getting a **code review**!