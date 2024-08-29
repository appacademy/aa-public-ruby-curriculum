# RSpec and TDD Quiz

```ruby
# Directory Structure:

  # my_cool_project
  #   lib/
  #     hello_world.rb
  #   hello_world_spec.rb

# Spec File:

  # hello_world_spec.rb

  require 'rspec'
  require 'hello_world'

  describe '#hello_world' do

  end
```

#### What is wrong with the above setup for testing with RSpec?</p>
- [ ] Spec file should say `require_relative './lib/hello_world'` instead of `require 'hello_world'`.
- [ ] `hello_world_spec.rb` should live in a `spec` directory adjacent to the `lib` directory.
- [ ] `hello_world_spec` should be a `.rspec` file instead of `.rb`.

<details><summary>Answer:</summary>

- `hello_world_spec.rb` should live in a `spec` directory adjacent to the `lib` directory.</details>
<details><summary>Explanation:</summary>

Your spec files should live in a `spec` directory adjacent to your `lib` directory that contains what is being tested.</details>


```ruby
  describe '#hello' do
    context 'with an odd number' do
      expect(hello(5)).to eq('hi')
    end
  end
```

#### What is wrong with the above spec's syntax?</p>
- [ ] An `expect` statement must be nested within an `it` block.
- [ ] A `context` block cannot be nested within a `describe` block.
- [ ] `to eq('hi')` should read `to_eq('hi')`.
- [ ] Nothing is wrong with the spec's syntax.

<details><summary>Answer:</summary>

- An `expect` statement must be nested within an `it` block.</details>

<details><summary>Explanation:</summary>

Remember that RSpec proper syntax!</details>



```ruby
  describe Robot do
    describe '#valid_walk?' do
      context 'when valid' do
        it 'should return true' do
          robot = Robot.new
          expect(robot.valid_walk?("NS")).to be true
        end
      end
    end
  end
```

#### What is wrong with the above spec's syntax?</p>
- [ ] `Robot` should be a string.
- [ ] A `describe` block cannot be nested within a `describe` block.
- [ ] `to be true` should be `to_be true`.
- [ ] Nothing is wrong with the spec's syntax.

<details><summary>Answer:</summary>

- Nothing is wrong with the spec's syntax.</details>

<details><summary>Explanation:</summary>

This spec looks good!</details>



```ruby
describe '#error_raiser' do
  it 'has a pending spec'

  it 'should raise an error' do
    expect(error_raiser('raise')).to raise_error(ArgumentError)
  end
end
```

#### What is wrong with the above spec's syntax?</p>
- [ ] The pending spec is invalid.
- [ ] `expect(error_raiser('raise'))` should be `expect {error_raiser('raise')}`.
- [ ] `ArgumentError` should be a string.
- [ ] Nothing is wrong with the spec's syntax.

<details><summary>Answer:</summary>

- `expect(error_raiser('raise'))` should be `expect {error_raiser('raise')}`.</details>

<details><summary>Explanation:</summary>

Remember to wrap any spec expected to raise an error in curly braces. This will effectively create a `begin` & `rescue` block for you.</details>



```ruby
class Dog
  attr_accessor :name

  def initialize(name)
    @name = name
  end
end

describe Dog do
  let(:dog) { Dog.new("Bear") }

  describe "name property" do
    it "allows us to manipulate name" do
      dog.name = "Rocky"
      expect(dog.name).to eq("Rocky")
    end

    it "allows us to read the name" do
      expect(dog.name).to eq("Rocky")
    end
  end
end
```

#### Consider the above code. Will both the above specs pass?</p>
- [ ] Yes
- [ ] No

<details><summary>Answer:</summary>

- No</details>
<details><summary>Explanation:</summary>

Remember that any state created with `let` will reset for each new `it` block. Resetting the state before each individual test can help make the test code easier to understand and use. If you needed to get around this limitation, however, you could replace the `let` with a `before(:all)` / `before(:context)`, which would run only once: `before(:all) {@dog = Dog.new("Bear")}`. (You would need to change the variables in the tests to `@dog` as well.)</details>