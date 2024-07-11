# Privacy: `public`, `private`, `protected`

You may have seen the keywords `public`, `private`, and `protected` in
class definitions:

```ruby
class Cat
  public
  def meow
    puts "meow"
  end

  # The access control setting remains in place until another access control 
  # statement resets it.
  def other_public_method
  end

  private
  def thoughts
    ...
  end

  protected
  def clean
    ...
  end
end
```

## `public`

From [Ruby-Doc][ruby-doc-protected] (on Access Control):

> *Public methods* can be called by anyone---there is no access control. Methods
> are public by default (except for initialize, which is always private).

Note that since `public` is the default access level for methods, you didn't
have to specify that `#meow` was public in the example from the last section.

## `private`

> *Private methods* cannot be called with an explicit receiver (other than a
> literal `self`). Because you cannot specify an object when using them, private
> methods can be called only in the defining class.

Say you have some class with a private method `#private_thing`:

```ruby
class MyClass
  private
  def private_thing
    puts "Hello World"
  end

  public
  def explicit_receiver
    x = self
    x.private_thing
  end

  def explicit_receiver_with_self
    self.private_thing
  end

  def implicit_receiver
    private_thing
  end
end
```

What do you expect `#explicit_receiver`, `#explicit_receiver_with_self`, and
`#implicit_receiver` to do?

```rb
> thing = MyClass.new
=> #<MyClass:0x007fe2612ccae0>

> thing.implicit_receiver
Hello World
=> nil

> thing.explicit_receiver_with_self
Hello World
=> nil

> thing.explicit_receiver
NoMethodError: private method `private_thing' called for #<MyClass:0x007fe2612ccae0>
```

So not even a variable assigned to `self` is okay as the explicit receiver!

Private methods are inherited as private. So if you say:

```rb
class MyOtherClass < MyClass
  def implicitly_inherited
    private_thing
  end
end
```

Then, in pry:

```rb
> thing2 = MyOtherClass.new
> thing2.implicitly_inherited
Hello World
=> nil
```

This differs somewhat from languages like C++ and Java where private methods are
inaccessible to subclasses.

## `protected`

> *Protected methods* can be invoked only by objects of the defining class and
> its subclasses. Access is kept within the family.

Protected methods can be called with an explicit receiver as long
as the caller is of the same class.

```ruby
class Dog
  def initialize
    # dominance score is not explicitly observable
    @secret_dominance_score = rand
  end

  def dominates?(other_dog)
    self.secret_dominance_score > other_dog.secret_dominance_score
  end

  protected
  attr_reader :secret_dominance_score
end
```

This way members of the `Dog` class can access other dominance scores, but the
scores are secret to everyone outside the `Dog` class.

### Access controls are not about security

Note that these access modifiers are **NOT** for security. In fact, they're
super easy to subvert. Check it out:

```ruby
class Cat
  private
  def meow
    puts "meow"
  end
end

cat = Cat.new
cat.send(:meow) # => prints meow!
```

You'll cover `#send` another day; for now, just know that it allows you to pass
in a symbol (or string) and call a method with that name. Of note, it ignores
privacy levels.

Instead of security, use access controls to convey to other programmers reading
your code:

1. Which methods are the "interface" that they'll want to use and which ones are
   underlying details they may wish to ignore.
2. Which methods are "supported" and public and which ones are liable to change.
   Private methods, because they usually are focused on internal details, often
   are removed or changed as the code grows. There is typically a greater effort
   to continue to support and not break the existing public interface.

[ruby-doc-protected]: http://www.ruby-doc.com/docs/ProgrammingRuby/html/tut_classes.html#S4
