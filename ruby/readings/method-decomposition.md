# Method Decomposition & Design

## Methods should be atomic

**Each method should do one thing.** A method should do a single, atomic thing
(this is sometimes called the _Single Responsibility Principle_). This may be
one line of code, or three, but rarely more than ten. **Methods should be
short.** Let's take a look at an example of refactoring one long method into
short, atomic methods, **NB** this is sometimes called "iterative stiffening".
We'll use an implementation of the Towers of Hanoi exercise we worked on in the
array section.

Here's the problem description in case you don't remember it:

```
Write a Towers of Hanoi game.

Keep three arrays, which represents the piles of discs. Pick a representation
of the discs to store in the arrays; maybe just a number representing their size.

In a loop, prompt the user (using gets) and ask what pile to select a disc
from, and where to put it.

After each move, check to see if they have succeeded in moving all the discs,
to the final pile. If so, they win!

```

Here's an example of a one-method solution:

```ruby
def hanoi
  disks = (1..3).to_a.reverse
  stacks = [disks, [], []]
  until stacks[0].empty? && stacks[1..2].any?(&:empty?)
    max_height = stacks.map(&:count).max
    render_string = (max_height - 1).downto(0).map do |height|
      stacks.map do |stack|
        stack[height] || " "
      end.join("\t")
    end.join("\n")
    puts render_string
    move_hash = { "a" => 0, "b" => 1, "c" => 2 }
    while true
      print "Move From: "
      from_stack_num = move_hash[gets.chomp]
      break unless from_stack_num.nil?
      puts "Invalid move!"
    end
    while true
      print "Move To: "
      to_stack_num = move_hash[gets.chomp]
      break unless to_stack_num.nil?
      puts "Invalid move!"
    end
    from_stack, to_stack = stacks.values_at(from_stack_num, to_stack_num)
    raise "cannot move from empty stack" if from_stack.empty?
    unless (to_stack.empty? || to_stack.last > from_stack.last)
      raise "cannot move onto smaller disk"
    end
    to_stack.push(from_stack.pop)
  end
  puts "You did it!"
end
```

Let's start breaking this method into smaller methods. What are the steps that
we take in this one fairly long method?

1. Set up a stack of disks
2. Set up a set of 3 stacks
3. Loop until its over
4. Display the stacks
5. Get move to position
6. Get move from position
7. Move the disk while checking to see if move is valid

Now that we've listed the atomic steps, it will be easy to split the method into
smaller methods. Let's go step by step, and start by extracting the `disks`
method:

```ruby
def disks
  (1..3).to_a.reverse
end

def hanoi
  stacks = [disks, [], []]
  # ...
```

Notice that the `disks` method has _one_ job of returning a stack of disks.

Lets extract stacks into a method that builds the stacks using disks.

```ruby
def disks
  (1..3).to_a.reverse
end

def stacks
  [disks, [], []]
end

def hanoi
  until stacks[0].empty? && stacks[1..2].any?(&:empty?)
  # ...
```

Notice that stacks has one job of building the stacks from the disks.

Now we're looping until the game is over, but it looks like this over condition
is starting to get a bit complex. Lets break out over into its own method.

```ruby
def over?
  stacks[0].empty? && stacks[1..2].any?(&:empty?)
end

def hanoi
  until over?
  # ...
```

While we're taking turns moving disks we'll probably want to display the current
state of the board each time. Extracting that block of code might look like
this:

```ruby
def display
  max_height = stacks.map(&:count).max
  render_string = (max_height - 1).downto(0).map do |height|
    stacks.map do |stack|
      stack[height] || " "
    end.join("\t")
  end.join("\n")
end

def hanoi
  until over?
    puts display
    # ...
```

The next step is to get the from and to stacks. This logic for getting a stack
is mostly the same, less the prompt. We can write a method that takes a prompt
as an argument.

```ruby
def get_stack(prompt)
  move_hash = { "a" => 0, "b" => 1, "c" => 2 }
  while true
    print prompt
    stack_num = move_hash[gets.chomp]
    return stack_num unless stack_num.nil?
    puts "Invalid move!"
  end
end

def hanoi
  until over?
    puts display
    from_stack_num = get_stack("Move from: ")
    to_stack_num = get_stack("Move to: ")
    from_stack, to_stack = @stacks.values_at(from_stack_num, to_stack_num)
    raise "cannot move from empty stack" if from_stack.empty?
    unless (to_stack.empty? || to_stack.last > from_stack.last)
      raise "cannot move onto smaller disk"
    end
    to_stack.push(from_stack.pop)
  # ...
```

Our methods are starting to look leaner :). The next step is to extract the work
of moving the disk into its own `move_disk` method.

```ruby
def move_disk(from_stack, to_stack)
  from_stack, to_stack = @stacks.values_at(from_stack_num, to_stack_num)
  raise "cannot move from empty stack" if from_stack.empty?
  unless (to_stack.empty? || to_stack.last > from_stack.last)
    raise "cannot move onto smaller disk"
  end
  to_stack.push(from_stack.pop)
end

def hanoi
  until over?
    puts display
    from_stack = get_stack("Move from: ")
    to_stack = get_stack("Move to: ")
    move_disk(from_stack, to_stack)
  end
end
```

**It reads like plain English.** Hiding away our implementation details in
well-named helper methods both reduced the length of `hanoi` and made its
structure more transparent. If somebody looks at this code, they will
immediately understand what is going on, even without reading the definitions of
`get_stack` and `move_disk`. This makes it a lot easier to understand code.

If they are interested in the implementation of a _specific action_, they know
where to find it: localized to an atomic, helper method.

## Do not use global state

A good general goal is that your methods should be like a mathematical function:
it should take something in and return something. It should not rely on anything
besides what is explicitly passed in, and it should not have side-effects; it
should communicate its result through the return value.

Some languages are stricter than Ruby: they don't allow you to use any data
except what is passed in as an argument, and they don't let you change any
outside ("global") variables variables, or communicate outside except through
the return value. Ruby is more flexible, but the majority of methods should be
written in this style.

Simply put: **the only way in should be the arguments, the only way out should
be the return value**.

Here's an example of something super terrible:

```ruby
# create a global i variable
$i = nil

def square_then_add_two(num)
  $i = num
  square

  $i = $i + 2
end

def square
  # get global variable, square it, and reset
  $i = $i * $i

  nil
end
```

First, `square` relies on a _global_ variable. This should have been passed in
directly. Everything that a method needs should be declared up-front as a
parameter to the method. This makes it easier to know how to call the method:
just pass in the listed arguments.

Second, `square` doesn't return anything useful; instead, it communicates by
setting a global variable. That is unnecessarily convoluted; just give the
answer back directly.

A general guideline, avoid global state. Don't use global variables to get
around passing in arguments or return values. I basically never use `$`
variables.

## Don't modify arguments

Callers do not typically expect you to modify an argument. For instance:

```ruby
def combine_ingredients(alcohols, mixers)
  drinks = []

  alcohols.length.times do
    drinks << [alcohols.pop, mixers.pop]
  end

  drinks
end
```

This destroys the caller's arrays. Did they expect this? If modification of the
argument is essential to what you're doing, fine, but otherwise don't do
something potentially unexpected and dangerous like this.

Instead do something like:

```ruby
def combine_ingredients(alcohols, mixers)
  drinks = []

  alcohols.each_index do |i|
    drinks << [alcohols[i], mixers[i]]
  end

  drinks
end
```

## Resources

- [Wikipedia: Side effect][wiki-side-effects]
- [Destructuring with Ruby][destructuring]

[wiki-side-effects]: http://en.wikipedia.org/wiki/Side_effect_(computer_science)
[destructuring]:
https://jsarbada.wordpress.com/2019/02/05/destructuring-with-ruby/
