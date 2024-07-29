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

<quiz>
  <question>
    <p>What is wrong with the above setup for testing with RSpec?</p>
    <answer>Spec file should say `require_relative './lib/hello_world'` instead of `require 'hello_world'`.</answer>
    <answer correct>`hello_world_spec.rb` should live in a `spec` directory adjacent to the `lib` directory.</answer>
    <answer>`hello_world_spec` should be a `.rspec` file instead of `.rb`.</answer>
    <explanation>Your spec files should live in a `spec` directory adjacent to your `lib` directory that contains what is being tested.</explanation>
  </question>
</quiz>


```ruby
  describe '#hello' do
    context 'with an odd number' do
      expect(hello(5)).to eq('hi')
    end
  end
```

<quiz>
  <question>
    <p>What is wrong with the above spec's syntax?</p>
    <answer correct>An `expect` statement must be nested within an `it` block.</answer>
    <answer>A `context` block cannot be nested within a `describe` block.</answer>
    <answer>`to eq('hi')` should read `to_eq('hi')`.</answer>
    <answer>Nothing is wrong with the spec's syntax.</answer>
    <explanation>Remember that RSpec proper syntax!</explanation>
  </question>
</quiz>



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

<quiz>
  <question>
    <p>What is wrong with the above spec's syntax?</p>
    <answer>`Robot` should be a string.</answer>
    <answer>A `describe` block cannot be nested within a `describe` block.</answer>
    <answer>`to be true` should be `to_be true`.</answer>
    <answer correct>Nothing is wrong with the spec's syntax.</answer>
    <explanation>This spec looks good!</explanation>
  </question>
</quiz>



```ruby
describe '#error_raiser' do
  it 'has a pending spec'

  it 'should raise an error' do
    expect(error_raiser('raise')).to raise_error(ArgumentError)
  end
end
```

<quiz>
  <question>
    <p>What is wrong with the above spec's syntax?</p>
    <answer>The pending spec is invalid.</answer>
    <answer correct>`expect(error_raiser('raise'))` should be `expect {error_raiser('raise')}`.</answer>
    <answer>`ArgumentError` should be a string.</answer>
    <answer>Nothing is wrong with the spec's syntax.</answer>
    <explanation>Remember to wrap any spec expected to raise an error in curly braces. This will effectively create a `begin` & `rescue` block for you.</explanation>
  </question>
</quiz>



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

<quiz>
  <question>
    <p>Consider the above code. Will both the above specs pass?</p>
    <answer>Yes</answer>
    <answer correct>No</answer>
    <explanation>Remember that any state created with `let` will reset for each new `it` block. Resetting the state before each individual test can help make the test code easier to understand and use. If you needed to get around this limitation, however, you could replace the `let` with a `before(:all)` / `before(:context)`, which would run only once: `before(:all) {@dog = Dog.new("Bear")}`. (You would need to change the variables in the tests to `@dog` as well.)</explanation>
  </question>
</quiz>