# Metaprogramming


```ruby
# Let's take a look at `define_method`. Consider the following:

class Corgi
  attr_reader :name

  def self.name
    "Corgi"
  end

  def initialize(name)
    @name = name
  end

  define_method(:output_name) do
    puts name
  end
end

corgi1 = Corgi.new("doofus")
```

What is the scope inside the `define_method` block? Additionally, what happens when we call `corgi1.output_name`?
- [ ] The instance of `Corgi`, it prints out `doofus`
- [ ] The `Corgi` class, it raises a `NoMethodError`
- [ ] The `Corgi` class, it prints out "Corgi"
- [ ] The instance of `Corgi`, it prints out "Corgi"

<details><summary>Answer:</summary>

The instance of `Corgi`, it prints out `doofus`</details>
<details><summary>Explanation:</summary>

When `corgi1` is instantiated the `define_method` block will run and will print out the `self.name`.</details>



```ruby
# Consider the following code:

corgi1.send("mystery_method")

# Assume that `corgi1` is an instance of the `Corgi` class, and that `mystery_method` is not a defined `Corgi` instance method.
```

What happens when the code is run?
- [ ] The code tries to look up `mystery_method` on `corgi1` but cannot find the method. It then calls `method_missing`, which raises a `NoMethodError`. 
- [ ] The code creates `mystery_method` as a `Corgi` instance method.
- [ ] `mystery_method` is called with `corgi1` as an argument.
- [ ] `corgi1` is reinitialized with `mystery_method` as an argument.
- [ ] The code tries to call `mystery_method` on `corgi1` but cannot find the method and returns `nil`.

<details><summary>Answer:</summary>

The code tries to look up `mystery_method` on `corgi1` but cannot find the method. It then calls `method_missing`, which raises a `NoMethodError`.</details>
<details><summary>Explanation:</summary>

The code tries to look up `mystery_method` on `corgi1` but cannot find the method. It then calls `method_missing`, which raises a `NoMethodError`.</details>

Consider the following code:

```ruby
class Dog
  def self.all
    @dogs ||= []
  end
  
  def initialize(name)
    @name = name
    
    self.class.all << self
  end
end

class Husky < Dog
  def self.all_huskies
    @@huskies ||= []
  end
  
  def initialize(name)
    @name = name
    
    self.class.all << self
    self.class.all_huskies << self
   end
end
  
  
class HuskyPup < Husky
end

Husky.new("Jane")
HuskyPup.new("Ernest")
```

What happens when the code is run?
- [ ] `Dog.all => [<Husky @name="Jane" />]` 
      and `Husky.all_huskies => [<Husky @name="Jane" />, <HuskyPup @name="Ernest" />]`
    
- [ ] `Dog.all => [<Husky @name="Jane" />, <HuskyPup @name="Ernest" />]` and 
      `Husky.all_huskies => [<Husky @name="Jane" />, <HuskyPup @name="Ernest" />]`
    
- [ ] `Dog.all => []` and 
      `Husky.all_huskies => [<Husky @name="Jane" />]`
    
- [ ] `Dog.all => []` and 
      `Husky.all_huskies => [<Husky @name="Jane" />, <HuskyPup @name="Ernest" />]`
    

<details><summary>Answer:</summary>

`Dog.all => []` and 
      `Husky.all_huskies => [<Husky @name="Jane" />, <HuskyPup @name="Ernest" />]`
    </details>
<details><summary>Explanation:</summary>

In order to make class variables you need to use the `@@` syntax. Meaning that all the Huskies and Husky pups both get added to the class variable of `@@huskies` but no huskies get added to the *instance variable* of `@dogs`.</details>
