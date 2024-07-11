# Metaprogramming and Reflection

**Goals**:

* Learn how to use `send`
* Learn how to use `define_method`
* Learn how to use `method_missing`

## send and define_method

One of the powers of Ruby is **reflection** (also called
**introspection**): the ability for a program to examine itself.

For starters, we can ask an object what methods it will respond to:

```ruby
obj = Object.new
obj.methods
 => [:nil?, :===, :=~, :!~, :eql?, :hash, :<=>, :class, ...]
```

`Object#methods` returns an array of symbols, each the name of a
method that can be sent to the object. This is helpful for debugging,
but not super useful in production code.

More significantly, we can call a method by name:

```ruby
[].send(:count) # => 0
```

When is something like send useful? Why not just call the method the
normal way? Well, using **`send`** lets us write methods like this:

```ruby
def do_three_times(object, method_name)
  3.times { object.send(method_name) }
end

class Dog
  def bark
    puts "Woof"
  end
end

dog = Dog.new
do_three_times(dog, :bark)
```

We can even define new methods dynamically with **`define_method`**:

```ruby
class Dog
  # defines a class method that will define more methods; this is
  # called a **macro**.

  def self.makes_sound(name)
    define_method(name) { puts "#{name}!" }
  end

  makes_sound(:woof)
  makes_sound(:bark)
  makes_sound(:grr)
end

dog = Dog.new
dog.woof
dog.bark
dog.grr
```

**A couple notes:**

* The code inside `Dog` class is executed at the time Ruby defines the
  `Dog` class. `makes_sound` is called at class definition time,
  **not** each time a new `Dog` object is created.
* That makes sense, because the work of `makes_sound` sets up an
  instance method to be shared by **all** `Dog` objects. It's not
  instance-specific.
* Inside the definition of the `Dog` class, `makes_sound` knows to
  call the class method because `self == Dog` here.
* In the `makes_sound` macro, `self == Dog` because this is a `Dog`
  class method. `define_method` is implicitly called on `Dog`, adding
  a new method named `name`. The block is the code to run when the
  method is (later) called on an instance of `Dog`.

We don't write macros every single day, but they are frequently quite
useful. Some of the most famous macro methods are:

* `attr_accessor`: defines getter/setter methods given an instance variable name.
* `belongs_to`/`has_many`: defines a method to perform a SQL query to fetch associated objects.

## method_missing

When a method is called on an object, Ruby first looks for an existing
method with that name. If no such method exists, then it calls the
`Object#method_missing` method. It passes the method name (as a
symbol) and any arguments to `#method_missing`.

The default version simply raises an exception about the missing
method, but you may override `#method_missing` for your own purposes:

```ruby
class T
  def method_missing(*args)
    p args
  end
end
```

```ruby
T.new.adfasdfa(:a, :b, :c) # => [:adfasdfa, :a, :b, :c]
```

Here's a simple example:

```ruby
class Cat
  def say(anything)
    puts anything
  end

  def method_missing(method_name)
    method_name = method_name.to_s
    if method_name.start_with?("say_")
      text = method_name[("say_".length)..-1]

      say(text)
    else
      # do the usual thing when a method is missing (i.e., raise an
      # error)
      super
    end
  end
end

earl = Cat.new
earl.say_hello # puts "hello"
earl.say_goodbye # puts "goodbye"
```

Using `method_missing`, we are able to "define" an infinite number of
methods; we allow the user to call any method prefixed `say_` on a
`Cat`. This is very powerful; it isn't possible to do this using
`define_method` itself.

However, overriding `method_missing` can result in difficult to
understand/debug to code, and should not be your first resort when
attempting metaprogramming. Only if you want this infinite
expressability should you use `method_missing`; prefer a macro if the
user just wants to define a small set of methods.

### An Advanced Example: Dynamic Finders

What if we overrode `#method_missing` in `ActiveRecord::Base` to work for `#find_by_*` methods, so we could do the following:

```ruby
User.find_by_first_name_and_last_name("Ned", "Ruggeri")
User.find_by_username_and_state("ruggeri", "California")
```

We could do this by parsing the "missing" method name and combining the column names (separated by `and`s) with the given arguments. It might look something like this:

```ruby
class ActiveRecord::Base
  def method_missing(method_name, *args)
    method_name = method_name.to_s
    if method_name.start_with?("find_by_")
      # attributes_string is, e.g., "first_name_and_last_name"
      attributes_string = method_name[("find_by_".length)..-1]

      # attribute_names is, e.g., ["first_name", "last_name"]
      attribute_names = attributes_string.split("_and_")

      unless attribute_names.length == args.length
        raise "unexpected # of arguments"
      end

      search_conditions = {}
      attribute_names.length.times do |i|
        search_conditions[attribute_names[i]] = args[i]
      end

      # Imagine search takes a hash of search conditions and finds
      # objects with the given properties.
      self.search(search_conditions)
    else
      # complain about the missing method
      super
    end
  end
end
```

**NB:** Dynamic finders were actually a feature of Rails until just recently. Rails 4.2 deprecated (supported, but didn't recommend) dynamic finders, and as of Rails 5, they are no longer supported. Although, they are quite handy, they tend to lead to overly verbose code and are not very performant. For these reasons we also recommend against using them. Check out [this][defense-of-dynamic-finders] blog post if you'd like to learn more.

## Type Introspection

So far we focused on finding, defining, and calling methods at
runtime. We can also find class information:

```ruby
"who am i".class # => String
"who am i".is_a?(String) # => true
```

I commonly use `Object#class` when debugging or using pry to see what
kind of thing I'm dealing with, so that I can then know what class to
look up the documentation for.

Here we can see that even classes are objects in Ruby:

```ruby
Object.is_a?(Object) # => true
# such meta, wow
```

Deep. Let's dig deeper:

```ruby
Object.class # => Class
```

Okay, all classes are instances of a `Class` class.

```ruby
Class.superclass # => Module
Class.superclass.superclass # => Object
```

Classes are types of `Module`s (not important), which are
`Object`s. In Ruby everything is an `Object`, even `Class`es!

To summarize: `Object` is of type `Class`, which is a subclass of
`Object` itself. Whoa!

## Methods with Varying Argument Types

Say we have written a method `perform_get` that fetches a resource
over the internet. As a convenience to the user, we'd like
`perform_get` to take either a `String`, which is the literal URL to
fetch, or a hash, with the URL broken into parts

```ruby
perform_get("http://www.google.com/+")
perform_get(
  :scheme => :http,
  :host => "www.google.com",
  :path => "/+"
)
```

In the case where we give `perform_get` a hash, it's going to need to
do some extra work to construct the URL to get. How might this work?
Perhaps like so:

```ruby
def perform_get(url)
  if url.is_a?(Hash)
    # url is actually a hash of url options, call another method
    # to turn it into a string representation.
    url = make_url(url)
  end

  # ...
end
```

This is a quite common trick used by library writers to make their
methods much more flexible. You may not write a method like this
often, but as you grow more experienced, this kind of trick will come
in handy from time to time.

[defense-of-dynamic-finders]:http://chrisholtz.com/blog/in-defense-of-dynamic-finders
