## Partner A: WhiteBoarding

## Concepts

1. **What is a class?**

**Answer:** A text-book answer: classes are a blue-print for constructing
computer models for real or virtual objects.

In reality: classes hold data, have methods that interact with that data, and
are used to instantiate objects.

2. **What does self mean?**

**Answer:** `self` always refers to the current object. But this question is
more difficult than it seems because Classes are also objects in ruby.

```rb

class WhatIsSelf
  def test
    puts "At the instance level, self is #{self}"
  end

  def self.test
    puts "At the class level, self is #{self}"
  end
end

WhatIsSelf.test
 #=> At the class level, self is WhatIsSelf

WhatIsSelf.new.test
 #=> At the instance level, self is #<WhatIsSelf:0x28190>
```

3. **What is the use of `super`?**

It calls a method on the parent class with the same name as the method that
calls `super`.

### OOP – Jukebox

### Prompt

Design a musical jukebox using object-oriented principles.

### Solution

Here are some answers to questions the interviewee might ask:

##### Is the jukebox physical or virtual?

Assume the jukebox is virtual or computer-simulated.

##### Does the jukebox accept currency?

Assume the jukebox operates free of charge.

Here is the skeleton of a potential solution:

```ruby
class Jukebox
  attr_accessor :user
  attr_reader :current_track

  def initialize(player, user)
    @player = player
    @user = user
    @current_track = nil
  end
end

class Player
  attr_accessor :album, :playlist

  def initialize(album, playlist)
    @album = album
    @playlist = playlist
  end

  def play_track(track)
    # Begin playing...
  end
end

class Playlist
  def initialize
    @queue = []
  end

  def add_track(track)
    @queue.push(track)
  end

  def shift
    @queue.shift
  end
end

class Album
  # Information about the album
end

class Track
  # Information about the track, including album
end

class User
  # Information about the user.
end
```

## Implement BFS

For this problem assume there is a Node class. The node class will take in a
value as part of its initialization.

Write a new method `bfs` on the `Node` class that does a breadth-first search
starting at a root node. It takes in a proc as an argument. Assume nodes have a
value, and a `attr_reader` on that value. Assume there are working
`parent`/`child`-related methods for Node.

Example usage:

```ruby
n1 = Node.new(1) #making a node with a value of 1

n1.bfs {|node| node.value == 1} #=> n1 (found a node with value == 1)
```

### Solution

```rb
class Node
  # -- Assume nodes have a value, and a attr_reader on value
  # -- Also, assume there are working parent/child-related methods for Node

  def bfs(&prc)
    raise "Must give a proc" if prc.nil?

    queue = [self]

    until queue.empty?
      visited = queue.shift
      return visited if prc.call(visited.val)
      queue += visited.children
    end

    nil
  end
end
```
