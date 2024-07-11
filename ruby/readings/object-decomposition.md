# Decomposition into Objects
So far, when we've tackled programming problems, we've tried to break
up the problem into methods; small bits of code that do one
thing. This helps us manage the complexity of a complex task by
breaking it into smaller, easily understood and digested tasks.

Object oriented design is another way to decompose complex
problems. Imagine a simulation of minnows and sharks: each "turn", the
minnows swim away from the shark, and the shark swims after the closest
minnow.

When decomposing a problem into objects, we look for the nouns; those
are good candidates to use as a class. (The verbs often end up as
methods). Here, we could create a `Minnow` class and a `Shark` class.

```ruby
class Minnow
end

class Shark
end
```

A `Minnow` and a `Shark` swim differently. They should both have a
`#swim` method, but they should do different things.

```ruby
class Minnow
  def swim
    # swim away from any sharks
  end
end

class Shark
  def swim
    # swim toward closest fish
  end
end
```

Finally, each `Minnow` and `Shark` have a position in the aquarium:

```ruby
class Minnow
  attr_reader :position
  
  def initialize(initial_position)
    # save the minnow's initial position
    @position = initial_position
  end
  
  def swim
    # swim away from any sharks; update @position
  end
end
```

Notice what we've done here: each `Minnow` or `Shark` keeps track of
its own position. Stored information like a `Minnow`'s position is
called the *state* of an object. `Minnow`s and `Shark`s have their own
way of doing things (they both `#swim` differently); this is called
*behavior*.

Object oriented design is about breaking a complex problem down into
classes, each of which is responsible for its own state and
behavior. This lets us write our `Minnow` code mostly in isolation of
code for the `Shark` or an `Aquarium` or a `Fisherman`. Writing code in
this way not only makes it more modular (and thus extensible), but
breaking the problem down into sub-problems makes each piece easier to
reason about.

## Choosing the right level of granularity
We've said that we should "look for the nouns" when deciding what
classes to define. But how do we choose the nouns? In our Shark/Minnow
problem, why is `Shark` and `Minnow` the right level of granularity,
and not an `Aquarium` class that is responsible for modeling both
sharks and fishes?

Each class should do one thing. The proposed `Aquarium` class would try to do
two things: model fish and model sharks.

How do we decide what a single responsibility is? The best way to
think about it is this: you should define classes at the level of
abstraction at which you want to make changes. You might want to make
changes to the minnows, but not the sharks, so they should be separate
classes. Jeff Atwood [explains][1] this idea better than we can.

You will gain a better intuition about design as you read and write more code.
As a beginner, watch out for the beginner's tendency either to create classes
that are responsible for way too many things (like `Aquarium`), or to create way
too many small classes before they are needed (we don't need `FishTail`,
`FishEye`, etc. classes here).

Rule of thumb: a large class is >125 lines of code. Sometimes that's
not a design mistake, but it's suspicious after that. 300+ lines is a
behemoth. You should start looking for ways to break down a class that
large.

[1]: https://blog.codinghorror.com/curlys-law-do-one-thing/
