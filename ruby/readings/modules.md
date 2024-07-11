# Modules

A Ruby **module** is like a class, except you don't instantiate a
module. Modules consist of methods that can be *mixed in* to a Ruby
class. In Ruby, we use a module to collect methods that may be
mixed in and shared by many classes to keep our code DRY.

Let's see an example:

```ruby
module Greetable
  def greet
    "Hello, my name is #{self.name}"
  end
end

class Human
  include Greetable
  
  def initialize(name)
    @name = name
  end
  
  def name
    @name
  end
end

class Robot
  include Greetable
  
  def name
    "Robot Model #2000"
  end
end
```

We "mix in" a module by using the `include` method. This will
take the methods defined in the module and make them available to
instances of `Robot` and `Human`.

Note that module methods may call methods of the class that they are
mixed into. In this case, the `Greetable` module needs to access a
`name` method. Both `Robot` and `Human` have `name` methods.

The most famous module is `Enumerable`. All the various methods of
`Enumerable` are defined in terms of an `each` method, which the class
(be it `Array`, `Hash`, etc.) must define. I sometimes describe
modules as "power packs", in that they extend the abilities of a
class.

### Include vs extend

It is common to mix in a module to add instance methods to a class;
we've used `include` to do this. You can also use the `Class#extend`
method to mix in module methods *as class methods*. Here's an example:

```ruby
module Findable
  def objects
    @objects ||= {}
  end

  def find(id)
    objects[id]
  end

  def track(id, object)
    objects[id] = object
  end
end

class Cat
  extend Findable
  
  def initialize(name)
    @name = name
    Cat.track(@name, self)
  end
end

Cat.new("Gizmo")
Cat.find("Gizmo") # finds Gizmo Cat object
```

## Mixins vs Multiple Inheritance

Ruby doesn't support multiple inheritance: a class can only have one
parent class. Only a few languages do support multiple inheritance;
you can read about the "Diamond problem" if you want to learn why.

Ruby's answer to multiple inheritance is the ability to mix in
modules. If two classes should share methods, but it is not feasible
for them to share a base class, we can instead factor the common
methods out into a module and `include` this in both the classes.

Again, the prototypical example is the `Enumerable` module:

```ruby
module Enumerable
  def map(&prc)
    results = []

    # notice how we need `each` to write `map`
    self.each { |el| results << prc.call(el) }

    results
  end

  ...
end

class Array < Object
  include Enumerable
  ...
end

class Hash < Object
  include Enumerable
  ...
end
```

Now all of the methods in the `Enumerable` module (e.g., `map`) are
mixed in to Array and Hash.

## Namespaces

Modules have a second, unrelated purpose: as
**namespaces**. Namespaces prevent name collisions. Say you have a
method `make_bacon` in file 'A.rb'. Later, you decide to define a
method `make_bacon` in file 'B.rb'. If you're writing a program that
`requires` both files, one `make_bacon` definition is going to
overwrite the other and you'll be in trouble.

This is where modules come in; if you wrap the code in 'A.rb' and
'B.rb' in modules, you won't have any difficulty. This is how 'A.rb'
looks:

```ruby
module A
  def self.make_bacon
    ...
  end
end
```

'B.rb' looks like this:

```ruby
module B
  def self.make_bacon
    ...
  end
end
```

Let's use A and B in a program to make some bacon.

```ruby
require "A"
require "B"

a_grade_bacon = A.make_bacon
b_grade_bacon = B.make_bacon
```

Yay! Two different kinds of bacon!

It doesn't normally make sense to put your application code inside a
module, but if you want to make your code widely available as a gem,
you would want to wrap it in a module so as to minimize potential
conflicts.
