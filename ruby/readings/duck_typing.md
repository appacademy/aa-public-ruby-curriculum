# Duck Typing

_"If it looks like a duck, swims like a duck, and quacks like a duck, then it is
probably a duck."_

_Duck typing_ is the programming practice of (effectively) determining an
object's type based not on what the object **is** (i.e., its class) but on what
it **does**. In other words, "If it quacks like a duck, treat it like a duck
(even if it's actually a goose/hunter/etc.)." 

In most _statically_ typed languages, when you define a method, you must specify
the type (String, Integer, etc.) of its parameters and return value--likewise
with variables when you declare them. As a _dynamically_ typed language, Ruby
lacks this kind of explicit variable and method typing, and so is well-suited to
duck typing.

## A Basic Example

Consider this (_extremely_ useful) function:

```ruby
def get_third_element(array)
  array[2]
end
```

As you hopefully deduced, this function takes in an array and returns the third
element:

```ruby
[2] pry(main)> arr = [1, 2, 3]
=> [1, 2, 3]
[3] pry(main)> arr.is_a?(Array)
=> true
[4] pry(main)> get_third_element(arr)
=> 3
```

In truth, however, `get_third_element` does not actually care if you pass it an
array; all it cares about is that the received argument responds to the `[]`
operator. So you could also do this:

```rb
[5] pry(main)> str = "duck"
=> "duck"
[6] pry(main)> str.is_a?(Array)
=> false
[7] pry(main)> get_third_element(str)
=> "c"
```

or even this:

```rb
[8] pry(main)> h = {2 => "second element"}
=> {2=>"second element"}
[9] pry(main)> h.is_a?(Array)
=> false
[10] pry(main)> get_third_element(h)
=> "second element"
```

In short: with duck typing, what matters is that the argument you pass to
`get_third_element` responds like an `Array`, regardless of its actual class. 

## Checking for Valid Input When Duck Typing

Sometimes you will still want to check for valid input when duck typing. Because
duck typing focuses on behavior rather than identity, validity checks typically
use `respond_to?` rather than `is_a?`. For example, assume you have the
following `Duck`, `DuckHunter`, and `Goose` classes:

```ruby
class Duck
  def initialize(name)
    @name = name
  end

  def quack
    puts "#{@name} says `Quack!`"
  end
end

class DuckHunter
  def initialize(name)
    @name = name
  end

  def quack
    puts "#{@name} makes a fake `Quack!`"
  end
end

class Goose
  def initialize(name)
    @name = name
  end
end
```

You could write a duck-typed `make_quack` function like this:

```rb
def make_quack(duck)
  if duck.respond_to?(:quack)
    duck.quack
  else
    puts "That's not a duck!"
  end
end
```

Testing in pry shows the following results:

```ruby
[2] pry(main)> duck = Duck.new('Daffy')
=> #<Duck:0x00007fc714a40848 @name="Daffy">
[3] pry(main)> hunter = DuckHunter.new('Bob')
=> #<DuckHunter:0x00007fc7150d4650 @name="Bob">
[4] pry(main)> goose = Goose.new('Mother')
=> #<Goose:0x00007fc714a8b348 @name="Mother">
[5] pry(main)> make_quack(duck)
Daffy says `Quack!`
=> nil
[6] pry(main)> make_quack(hunter)
Bob makes a fake `Quack!`
=> nil
[7] pry(main)> make_quack(goose)
That's not a duck!
=> nil
```

The `DuckHunter` gets duck typed but the `Goose` does not!

## Defining Classes That Follow the Duck Typing Principle

In Ruby, we sometimes talk about classes that are _x_-like: array-like,
hash-like, etc. You'll encounter many such classes when you learn Rails. 

Every such class follows the principle of duck typing. If you are writing your
own array-like class, for example, it is not necessary for it to inherit from
`Array`. What matters is that instances of your class **behave** like
arrays, responding to most of the same methods in a predictable fashion.

Not only does this mean you can treat instances of your array-like class as if
they were arrays, but it also means that another developer can start using your
class without having to learn many new patterns.

So how would you accomplish this with your hypothetical array-like class? A
start would be to include the same module(s) that `Array` does--specifically,
`Enumerable`. Then, for every common `Array` method, you'd write your own method
of the same name with similar behavior. For example, you should probably write a
`#+` method, which should concatenate two of your array-like instances together
into a third instance.

Sometimes, writing a class that uses duck typing means writing methods that
might feel redundant or unnecessary. For instance, if you are writing a
string-like `Emoji` class, you should probably still write an `#upcase` method
(which would just return a copy of the same emoji). 

Why? It's easiest to answer with an example. Let's say you have an array with
some `Emoji` and some `String` elements. It would be much nicer to write:

```rb
array.map { |el| el.upcase }
```

rather than: 

```rb
array.map { |el| el.respond_to?(:upcase) ? el.upcase : el }
```

## What you've learned

In this reading, you've learned what duck typing is, how to check for valid
input when duck typing, and how duck typing principles apply to creating _x_-like classes.
