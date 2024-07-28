# LRU Cache

Tonight you're going to use an array to implement a basic [Least Recently Used
(LRU) Cache][lru-cache]. This will be a simple implementation that doesn't use a
hash map or linked list. You should assume your input is limited to Integers,
Strings, Arrays, Symbols, and Hashes. You will allow the user to set the size of
the cache.  

Ultimately, your LRU Cache should function as follows:

```ruby
  johnny_cache = LRUCache.new(4)

  johnny_cache.add("I walk the line")
  johnny_cache.add(5)

  johnny_cache.count # => returns 2

  johnny_cache.add([1,2,3])
  johnny_cache.add(5)
  johnny_cache.add(-5)
  johnny_cache.add({a: 1, b: 2, c: 3})
  johnny_cache.add([1,2,3,4])
  johnny_cache.add("I walk the line")
  johnny_cache.add(:ring_of_fire)
  johnny_cache.add("I walk the line")
  johnny_cache.add({a: 1, b: 2, c: 3})


  johnny_cache.show # => prints [[1, 2, 3, 4], :ring_of_fire, "I walk the line", {:a=>1, :b=>2, :c=>3}]
```

Use the framework below to get started.  

```ruby
  class LRUCache
    def initialize
    end

    def count
      # returns number of elements currently in cache
    end

    def add(el)
      # adds element to cache according to LRU principle
    end

    def show
      # shows the items in the cache, with the LRU item first
    end

    private
    # helper methods go here!

  end
```

Once you have written your code, thoroughly test it to make sure it truly is an
LRU Cache.  

## Time complexity

As you might have guessed, this is not the typical implementation of an LRU
Cache. Any thoughts as to why?

Consider the time complexity of the `LRUCache#add` method you wrote. In the App
Academy solution, it's `O(n)`, where n is the size of the cache. For a large
cache, that's a very lengthy process for simply adding one element. How might
you improve the efficiency?  Brainstorm some ways you might apply the ADTs from
tonight's readings to do this.

## Bonus

Write specs to test that your implementation works!  

[lru-cache]: https://www.geeksforgeeks.org/lru-cache-implementation/