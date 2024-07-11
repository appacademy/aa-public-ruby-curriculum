# Instance Eval and Class Eval

Both `instance_eval` and `class_eval` are used in metaprogramming to create
methods. What follows is a brief explanation of their use.

## Overview

In a rather counterintuitive manner, `instance_eval` is often used to
dynamically create class methods, and `class_eval` is often used to dynamically
create instance methods.

### Table: Evaluation Contexts When Defining Methods
| Receiver      | `instance_eval`                                      | `class_eval`                                              |
| ------------- |:-----------------------------------------------------| --------------------------------------------------------- |
| instance      | Results in an instance method on a specific instance | n/a                                                       |
| class         | Results in a class method                            | Results in an instance method on all instances of a class |

## `instance_eval`

`instance_eval` evaluates a given string or code block in context of its
receiver as an instance.

### Example

In the following example, `add_cat!` is evaluated on `my_cats`, the receiver,
which is an instance of the `Array` class. Notice that `add_cat!` is therefore
only available on `my_cats` and not on all `Array` instances.

```ruby
my_cats = Array.new
other_cats = Array.new

my_cats.instance_eval do
  def add_cat!
    self.push("Cat No. #{self.length + 1}")
  end
end

p my_cats # => []
p other_cats # => []

my_cats.add_cat!
puts my_cats # => ["Cat No. 1"]

other_cats.add_cat! # => NoMethodError: undefined method `add_cat!' for []:Array
```

`instance_eval` only evaluates the given code block in context of the specific
instance of the receiver.

Taking this further, one can use `instance_eval` on a class. The result is that
the class on which it is called is treated as an instance of the `Class` class.
It then follows that any method placed in an `instance_eval` called on a class
will act as a class method.

```ruby
class Cat
end

Cat.instance_eval do
  def random_cat_action
    [:sleep, :purr, :meow, :eat, :do_a_backflip].sample
  end
end

Cat.random_cat_action
```

In the above example, the `random_cat_method` could have just as easily been
monkey-patched in the following manner:

```ruby
class Cat
end

class Cat
  def self.random_cat_action
    [:sleep, :purr, :meow, :eat, :do_a_backflip].sample
  end
end
```

So what's the benefit of the `instance_eval` implementation? It can be used
when the name of the class is unknown until runtime. Use `instance_eval` when
you want to dynamically create class methods.

## `class_eval`

As its name suggests, `class_eval` evaluates in the context of a receiver's
class. This method essentially opens up the class as if you were initially
defining the class or monkey-patching it.

### Example

As an example, one could use `class_eval` in the following manner:

```ruby
acrocat_one = Cat.new
acrocat_two = Cat.new

Cat.class_eval do
  def do_a_backflip
    puts 'tumble tumble'
  end
end

acrocat_one.do_a_backflip # => 'tumble tumble'
acrocat_two.do_a_backflip # => 'tumble tumble'
```

Because `Cat` is evaluated as a class, the methods defined are treated as
instance methods. This means that every instance of the `Cat` class will have
access to the `do_a_backflip` method. It is functionally equivalent to the
following:

```ruby
class Cat
  def do_a_backflip
    puts 'tumble tumble'
  end
end
```

Once again, the benefit of `class_eval` is that it can be used when the class
name is unknown until runtime. Use `class_eval` when you want to dynamically
define an instance method.
