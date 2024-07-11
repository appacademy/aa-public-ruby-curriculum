# References

In the Ruby language variables hold **references** to objects.

```ruby
my_object = Object.new
# my_object now refers to a new instance of Object

my_object = Object.new
# a new Object instance is created, and the my_object variable is
# reassigned so that it now refers to this object, rather than the old
# object.

# call `my_method` on the object that `my_object` refers to
my_object.my_method
```

One point is that `=` does not **mutate** (modify) an object; it merely
**reassigns** the variable so that it now refers to a new object.

Here is another example.

```ruby
def add_to_array!(array, item)
  array << item
end

my_array = []
add_to_array!(my_array, "an item!")
p my_array
```

This code will modify the array referred to by `my_array`. When we call
`add_to_array`, we're passing it a reference to the same object referred to by
`my_array`, as well as a reference to the literal string `"an item!"`. So inside
`add_to_array`, the variable `array` refers to the same object that `my_array`
refers to outside the method. So modifications to the array inside the method
will be visible outside.

## The `[]=` and accessor methods

We've said that `=` never modifies an object, and merely reassigns a variable to
refer to a new object. But then how do I explain this:

```ruby
my_hash = {}
# add a key & value to the hash
my_hash[:key] = :value
```

How does this work? Notice that we aren't just assigning to a variable; we're
asking to mutate `my_hash` so that `:key` will refer to `:value` now. To do
this, Ruby calls the `[]=` method on the hash. Here's how it might be defined:

```ruby
class Hash
  def []=(key, val)
    # code to set key so that it maps to value...
  end
end
```

In fact, we can even write this with the usual method call notation:

```ruby
my_hash.[]=(:key, :value)
```

Other writer methods work similarly:

```ruby
class Cat
  attr_accessor :name
end

my_cat = Cat.new
my_cat.name = "Breakfast" # == my_cat.name=("Breakfast")
```

Conveniences like this (the ability to write `hash[:key] = :value` instead of
`hash.[]=(:key, :value)`) are called *syntactic sugar*. They don't change the
fundamental way the language works; they are merely shortcuts to make things a
little easier on us.

## `+=` and `!=`

One last bit of syntactic sugar is to discuss how Ruby interprets `+=` and `!=`.
This is done quite simply

```ruby
x += y # => x = x + y, will work as long as `#+` is defined
x != y # => !(x == y), will use the `#==` method
```

So while `[]=` was a method, `+=` and `!=` are pure syntactic sugar. Ruby will
translate them into code that calls `+` and `==` respectively.

## The or trick

The Ruby `||` operation does something called short circuiting:

    true || this_code_is_not_run
    false || this_code_will_be_run

Ruby is sort of lazy; it won't evaluate the right side if the left side of `||`
is already true. That makes sense, because regardless of what the right side is,
the whole or statement will always be true. Ruby understands this, and so as a
special rule won't execute more than it needs to.

Ruby will return the first "truthy" value from the or:

    (1 || 2) == 1
    (nil || 5) == 5

There's an "or trick" that uses `||=`:

```ruby
class MemoizedFibonacci
  def initialize
    @values = {}
  end

  def fib(n)
    @values[n] ||= calculate_fib(n)
    # expands to:
    #     @values[n] = @values[n] || calculate_fib(n)
    # if @values[n] is nil (not previously computed), will call
    # `calculate_fib` and store the result for later reference.
  end

  private
  def calculate_fib(n)
    case n
    when 0
      0
    when 1
      1
    else
      fib(n - 1) + fib(n - 2)
    end
  end
end
```
