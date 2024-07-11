```ruby
# Notice the redundant implementations of moo/bark/meow.
module Wet
  class Animal
  end

  class Cow < Animal
    def moo
      puts "moo!"
    end
  end

  class Dog < Animal
    def bark
      puts "bark!"
    end
  end

  class Cat < Animal
    def meow
      puts "meow!"
    end
  end
end

# Let's DRY it up!
module Dry
  class Animal
    private
    # define a `makes_noise` class method; a method that defines other
    # methods is called a *macro*
    def self.makes_noise(name)
      # When an Animal subclass calls `makes_noise`, we will
      # *dynamically* define a new method on the
      # subclass. `Class#define_method` is an instance method of the
      # `Class` class.
      define_method(name) do
        puts "#{name}!"
      end

      nil
    end
  end

  class Cow < Animal
    makes_noise :moo
  end

  class Dog < Animal
    makes_noise :bark
  end

  class Cat < Animal
    makes_noise :meow
  end
end
```