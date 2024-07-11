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

<quiz>
  <question>
  <p> What is the scope inside the `define_method` block? Additionally, what happens when we call `corgi1.output_name`?</p>
    <answer correct>The instance of `Corgi`, it prints out `doofus`</answer>
    <answer>The `Corgi` class, it raises a `NoMethodError`</answer>
    <answer>The `Corgi` class, it prints out "Corgi"</answer>
    <answer>The instance of `Corgi`, it prints out "Corgi"</answer>
    <explanation>When `corgi1` is instantiated the `define_method` block will run and will print out the `self.name`.</explanation>
  </question>
</quiz>



```ruby
# Consider the following code:

corgi1.send("mystery_method")

# Assume that `corgi1` is an instance of the `Corgi` class, and that `mystery_method` is not a defined `Corgi` instance method.
```

<quiz>
  <question>
  <p> What happens when the code is run?</p>
    <answer correct>The code tries to look up `mystery_method` on `corgi1` but cannot find the method. It then calls `method_missing`, which raises a `NoMethodError`. </answer>
    <answer>The code creates `mystery_method` as a `Corgi` instance method.</answer>
    <answer>`mystery_method` is called with `corgi1` as an argument.</answer>
    <answer>`corgi1` is reinitialized with `mystery_method` as an argument.</answer>
    <answer>The code tries to call `mystery_method` on `corgi1` but cannot find the method and returns `nil`.</answer>
    <explanation>The code tries to look up `mystery_method` on `corgi1` but cannot find the method. It then calls `method_missing`, which raises a `NoMethodError`.</explanation>
  </question>
</quiz>

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

<quiz>
  <question>
  <p> What happens when the code is run?</p>
    <answer>`Dog.all => [<Husky @name="Jane" />]` 
      and `Husky.all_huskies => [<Husky @name="Jane" />, <HuskyPup @name="Ernest" />]`
    </answer>
    <answer>`Dog.all => [<Husky @name="Jane" />, <HuskyPup @name="Ernest" />]` and 
      `Husky.all_huskies => [<Husky @name="Jane" />, <HuskyPup @name="Ernest" />]`
    </answer>
    <answer>`Dog.all => []` and 
      `Husky.all_huskies => [<Husky @name="Jane" />]`
    </answer>
    <answer correct>`Dog.all => []` and 
      `Husky.all_huskies => [<Husky @name="Jane" />, <HuskyPup @name="Ernest" />]`
    </answer>
    <explanation>In order to make class variables you need to use the `@@` syntax. Meaning that all the Huskies and Husky pups both get added to the class variable of `@@huskies` but no huskies get added to the *instance variable* of `@dogs`.</explanation>
  </question>
</quiz>
