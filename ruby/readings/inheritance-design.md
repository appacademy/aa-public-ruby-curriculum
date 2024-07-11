# Inheritance and DRY

When defining classes, we want to avoid duplicating code in their
methods. For instance, imagine two classes, `Minnow` and `Shark`. Both
of these classes might have a method `#eat`, like so:

```ruby
class Minnow
  def eat
    puts "eat eat eat"
  end
end

class Shark
  def eat
    puts "eat eat eat"
  end
end
```

The *DRY principle* ("Don't repeat yourself") tells us that we should
try to remove this duplicated code, if possible. Inheritance will help
us do that. We'll have `Minnow` and `Shark` inherit from a `Fish`
parent class:

```ruby
class Fish
  def eat
    puts "eat eat eat"
  end
end

class Minnow < Fish
end

class Shark < Fish
end
```

## Inheritance and Generic Code

Because `Minnow` and `Shark` are both different types of `Fish`, we
can write *generic* code that can process any kind of `Fish`, and it
will work with both `Minnow`s and `Shark`s. Here's an example with
many types of employee.

```ruby
class Employee
  def wage
    20_000
  end
end

class Manager < Employee
  def wage
    50_000
  end
end

class CEO < Manager
  def wage
    1_000_000
  end
end

# calculate the total salary of many employees
def total_salary(employees)
  total = 0
  employees.each do |employee|
    # Don't know/care what kind of `Employee` (regular, Manager,
    # or CEO) this is. We can treat them all the same.
    total += employee.wage
  end
end
```

## Don't go crazy

Don't introduce subclasses before you need them. In the example of
`Employee`/`Manager` we were a little aggressive; we could have had
just one `Worker` class and a variable that held the `@wage` of the
`Worker`.

A good guideline to follow is not to introduce a new subclass until:

* You are facing two different subclasses of the base class AND
* The two subclasses have substantially different behavior.

In short, don't use inheritance until it serves a purpose like keeping
your code DRY or helping code organization. Needlessly complicated
inheritance hierarchies are a common mistake of novice programmers.
