# `subject` And `let`

## `subject` and `it`

To test a class, you will often want to instantiate an instance of the object to
test it out. In this case, you may want to define a `subject` for your tests.

```ruby
describe Robot do
  subject { Robot.new }

  it "satisfies some expectation" do
    expect(subject).to # ...
  end
end
```

You can also declare a `subject` with a name:

```ruby
describe Robot do
  subject(:robot) { Robot.new }

  it "should start at position [0, 0]" do
    expect(robot.position).to eq([0, 0])
  end

  describe "move methods" do
    it "moves left" do
      robot.move_left
      expect(robot.position).to eq([-1, 0])
    end
  end
end
```

In addition to the name, `subject` also accepts a block that constructs the
subject. You can do any necessary setup inside the block.

The `it` block is a test. It runs the code, and the test fails if the `expect`
fails. The first test `expect`s that the position is `[0, 0]`. The second test
moves the robot and then `expect`s the position to have changed.

## let

`subject` lets you define the subject of your tests. Sometimes you also want to
create other objects to interact with the subject. To do this, you use `let`.
`let` works just like `subject`, but whereas `subject` is the focus of the test,
`let` defines helper objects. Another difference is that there can be only one
(unnamed) `subject`. (If you declare a second `subject`, the value of `subject`
inside of your `it` blocks will be the more recent definition.) On the other
hand, you can define many helper objects through `let`.

```ruby
describe Robot do
  subject(:robot) { Robot.new }
  let(:light_item) { double("light_item", :weight => 1) }
  let(:max_weight_item) { double("max_weight_item", :weight => 250) }

  describe "#pick_up" do
    it "does not add item past maximum weight of 250" do
      robot.pick_up(max_weight_item)

      expect do
        robot.pick_up(light_item)
      end.to raise_error(ArgumentError)
    end
  end
end
```

> **Note:** `double` is a special RSpec test function that essentially creates a
> dummy object, i.e., a 'double'. Don't worry about it now: it will be explained
> in a subsequent reading!

`let` defines a method (e.g., `light_item`, `max_weight_item`) that runs the
block provided once for each spec in which it is called.

You may see that you have the option of using instance variables in a `before`
block to declare objects accessible to specs, but you should avoid defining
instance variables in specs. Always prefer `let`. Here's a [SO
post][stack-overflow-let] that clearly describes why that is.

Here's a [blog post][dry-up-rspec] with some nice examples using `let` - note
how the author uses it in conjunction with `subject` (some fancy and clean
stuff).

[stack-overflow-let]: http://stackoverflow.com/questions/5359558/when-to-use-rspec-let
[dry-up-rspec]: http://benscheirman.com/2011/05/dry-up-your-rspec-files-with-subject-let-blocks/

### `let` does not persist state

You might read that `let` _memoizes_ its return value. Memoization means that
the first time the method is invoked, the return value is cached and that same
value is returned every subsequent time the method is invoked within the same
scope. Since every `it` is a different scope, `let` does not persist state
between those specs.

An example:

```ruby
class Cat
  attr_accessor :name

  def initialize(name)
    @name = name
  end
end

describe "Cat" do
  let(:cat) { Cat.new("Sennacy") }

  describe "name property" do
    it "returns something we can manipulate" do
      cat.name = "Rocky"
      expect(cat.name).to eq("Rocky")
    end

    it "does not persist state" do
      expect(cat.name).to eq("Sennacy")
    end
  end
end

# => All specs pass
```

## Lazy evaluation

One final point is worth mentioning with regard to `subject` and `let`: they are
both _lazy-evaluated_. Lazy evaluation, or lazy loading, means that they do not
run / create their object until they are invoked. If you have an `it` block,
e.g., that never invokes the method defined in a `let`, then the method won't
run during that particular test. If you would prefer to have `subject` or `let`
invoked before each block regardless, use `subject!` and `let!`.

## References

* [`let` and `let!`]
* [`subject` and `subject!`]

[`let` and `let!`]: https://rspec.info/features/3-12/rspec-core/helper-methods/let/
[`subject` and `subject!`]: https://rspec.info/features/3-12/rspec-core/subject/explicit-subject/
