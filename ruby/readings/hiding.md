# Information hiding

## Private Methods

In Ruby, we can mark specific methods in our classes as
**private**. When we do so, the only way to access those methods is
from within the class itself. Here's an example of what that looks
like:

```ruby
class Airplane
  def fly
    start_engine
    ...
  end

  private
  def start_engine
    ...
  end
end
```

All methods after the [`private`][private-keyword] keyword are private
to the class.

What kind of methods should be `private`? Ones which users of the
class should not call, either for safety reasons (a user doesn't know
when they should `start_engine`) or because they're low-level details
that don't concern users (a user just wants to `fly`, doesn't want to
know how that happens).

Instance variables are always "private" in the sense that they are not
even methods. You can expose instance variables to the outside world
by making public getter/setter methods using
[`attr_accessor`][attr-accessor] and the like.

## Shy Code

We mentioned safety and a simple interface as reasons that you might
want to create private methods. Also, you want to make it easy to
change and extend your code. The more details you expose to users of the class
(whether people or other code), the more users will rely on those
details. Whatever you expose will be that much harder to change later
once others depend on it.

The point of object orientation is to present a simple interface,
abstracting away the details inside the method implementations. Code
that is too permissive breaks those abstractions, leaking internal
concerns to the outside world. For instance, if we let a user call
`start_engines`, now they need to remember to later call
`stop_engines`. This makes it harder to use our class.

A good guiding principle of OO design is: minimize the interfaces
between your classes. Expose the least possible amount of state and
behavior, and have a good reason for every piece of information that
you expose.

That said, if you miss a method that should be private but is instead
public, it won't be a disaster. Myself, I focus on catching cases
where a method is obviously internal to the workings of the
class. Robust code ready to release to the outside world should
eventually be checked for proper use of `private`, though.

[private-keyword]: http://ruby-doc.org/core/Module.html#method-i-private
[attr-accessor]: http://ruby-doc.org/core/Module.html#method-i-attr_accessor
