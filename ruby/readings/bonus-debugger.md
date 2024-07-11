## Where you are in the code: `list=`

When you pause on a line of code in byebug, byebug prints out that line (with a
`=>` next to it) and a few lines above and below to show you where you are in
the code. But if you then run a number of commands while you are paused on a
given line, then the listing of where you are in the source code might get
pushed off the top of the screen. Instead of scrolling back up to remind
yourself precisely which line you are paused at, just type `list=` to re-display
where you are paused in the source code.

## Watching a variable

Suppose that you've figured out that a certain variable is causing your program
to misbehave. Good! Now you need to figure out when and why that variable is
taking on unexpected values. Byebug's `display some_variable` command can help
you with that.

The following program does not have a purpose (and therefore does not have any
meaningful bugs), but it will serve as a simple example of how to use the
`display` command in byebug. The program simply loops through the numbers 1-100
and calculates their squares and halves:

```ruby
# display_demo.rb
(1..100).each do |num|
  square = num ** 2
  half = num / 2.0
  debugger
end
```

Run the program, requiring byebug at the command line. We'll be dropped in just
after our `debugger`.

```ruby
david ~/Dropbox/TA/debugging $ ruby -r byebug display_demo.rb

[1, 5] in display.rb
   1: (1..100).each do |num|
   2:   square = num ** 2
   3:   half = num / 2.0
   4:   debugger
=> 5: end
```

Let's watch the value of the `square` variable using `display`. Now, byebug will
automatically print the value of `square` each time it pauses somewhere in our
code (such as after we type `n`, or we arrive at a `debugger` or a breakpoint
after `c`ontinuing.)

```ruby
(byebug) display square
1: square = 1
(byebug) c
1: square = 4

[1, 5] in display.rb
   1: (1..100).each do |num|
   2:   square = num ** 2
   3:   half = num / 2.0
   4:   debugger
=> 5: end
(byebug) c
1: square = 9

[1, 5] in display.rb
   1: (1..100).each do |num|
   2:   square = num ** 2
   3:   half = num / 2.0
   4:   debugger
=> 5: end
(byebug)
```

You can add additional variables at any time. By entering `display half`, we
will now also see the value of the `half` variable each time we pause in our
code.

```ruby
(byebug) display half
2: half = 1.5
(byebug) c
1: square = 16
2: half = 2.0

[1, 5] in display.rb
   1: (1..100).each do |num|
   2:   square = num ** 2
   3:   half = num / 2.0
   4:   debugger
=> 5: end
(byebug) c
1: square = 25
2: half = 2.5

[1, 5] in display.rb
   1: (1..100).each do |num|
   2:   square = num ** 2
   3:   half = num / 2.0
   4:   debugger
=> 5: end
(byebug)
```

## Looking at the call stack: `where`

You have seen stack traces when an error is raised in your program. The `where`
command allows you to view the stack trace without having to raise an error.
This can be handy.


Suppose that you have a method that is called from different parts of your
program. Usually the method works as expected, but every once in a while your
method raises an error or produces an unexpected result. The method itself might
be fine, but maybe it's being called with bad parameters. However, you don't
want to go to all of the different places in your program where the method is
called and put a `debugger` statement at each one to diagnose the problem,
especially if the method calls are spread across different classes and files.

It would be much easier if we could put a single debugger within the method in
question, and then *look back* to see where that method was actually called in
the code. Then, once you know where the problem originated, you can fix it. With
byebug, you can do just this, using the `where` command.

Consider this program:

```ruby
# building.rb
class Building
  def initialize
    @temperature = 70
  end

  def set_thermostat(temp)
    @temperature = temp
  end
end

house = Building.new

# imagine this is called in one part of your program
house.set_thermostat(50 * 4 - 2 - 100 + -30)

# and here set_thermostat is set within some other distant class
house.set_thermostat(200 * 0.5 - 40 + 30 / 2)

# and who knows where this call to set_thermostat could be coming from
house.set_thermostat(100 / 3 + 80 - -30 + 3)
```

You notice that sometimes the house is getting too hot, but which part of your
program is causing this problem?

We can set up a *conditional debugger* (line 7 below) that will be triggered
when the thermostat is being set too high. Then we can look back and see who was
calling `set_thermostat` with an inappropriately high value.

```ruby
david ~/Dropbox/TA $ ruby -r byebug building.rb

[3, 12] in building.rb
    3:     @temperature = 70
    4:   end
    5:
    6:   def set_thermostat(temp)
    7:     debugger if temp > 90
=>  8:     @temperature = temp
    9:   end
   10: end
   11:
   12: house = Building.new
(byebug) where

--> #0  Building.set_thermostat(temp#Integer) at building.rb:8
    #1  <main> at building.rb:21
(byebug)
```

Ah ha! We entered the debugger because we met the condition `temp > 90`. Then
`where` shows us the call stack. The top of the call stack shows where we are
now (#0). Moving down, we move through the previous method calls. In this case,
there is just one previous method call, originating at line 21 of `building.rb`
(the third call to `set_thermostat`). How easily we have found the culprit!
