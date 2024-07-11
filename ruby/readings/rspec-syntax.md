# RSpec Syntax & Mechanics

RSpec is distributed in a gem called `rspec`, which is actually a meta-gem that
packages three other gems: `rspec-core`, `rspec-expectations`, and
`rspec-mocks`. This reading will spend most of its time on `rspec-core` and
`rspec-expectations`.

## File organization

By convention, tests are kept in the __spec__ folder and your application code
will be kept in a __lib__ folder. Tests for __hello.rb__ will be written in a
file called __hello_spec.rb__. Your directory structure should look like this:

```sh
my_cool_project
  ├──lib/
  │   └──hello.rb
  └──spec/
      └──hello_spec.rb
```

## Requiring dependencies

Each spec will usually be limited to testing a single file and so will `require`
the file to test at the top of the spec file. It is also a good idea to
`require` the `rspec` gem, although behind-the-scenes configuration will often
make this unnecessary.

```ruby
# hello_spec.rb

require 'rspec'
require 'hello'

RSpec.describe '#hello_world' do

end
```

Note that RSpec will by default include the __lib/__ folder in the require path
so that you can use `require` instead of `require_relative`. This is another
reason to follow the convention of using __lib/__ and __spec/__ for your code
and your tests, respectively.

## Organization and syntax

Here's what a simple 'Hello, World!' spec might look like.

```ruby
# hello_spec.rb

require 'rspec'
require 'hello'

RSpec.describe "#hello_world" do
  it "returns 'Hello, World!'" do
    expect(hello_world).to eq("Hello, World!")
  end
end
```

And the code that would make it pass:

```ruby
# hello.rb

def hello_world
  "Hello, World!"
end
```

### `describe` and `it`

`it` is RSpec's most basic test unit. All of your actual individual tests will
go inside of an `it` block.

`describe` is RSpec's unit of organization. It gathers together several `it`
blocks into a single unit, and, as you'll see, allows you to set up some context
for blocks of tests.

> **Note:** By default RSpec installs `describe` in the global namespace,
> meaning that you can simply call `describe` and it will work. As of RSpec 3,
> however, RSpec gives users the ability to turn off the global namespacing. If
> the global namespacing has been turned off, then you must access a top-level
> `describe` through the RSpec namespace: `RSpec.describe`. App Academy will
> typically use `RSpec.describe` because it will always work. Nevertheless, you
> should know that a simple `describe` will work also work in most cases.

Both `describe` and `it` take strings as arguments. For `describe`, use the name
of the method you're testing (use "#method" for instance methods, and "::method"
for class methods). For `it`, you should describe the behavior that you're
testing inside that `it` block.

`describe` can also take a constant that should be the name of the class or
module you're testing (i.e. `describe Student do`).

You can nest `describe` blocks arbitrarily deep. When nesting, also consider the
use of `context`, which is an alias for `describe` that can be a bit more
descriptive. Prefer `context` when it makes sense.

```ruby
RSpec.describe Student do
  context 'when a current student' do
    ...
  end

  context 'when graduated' do
    ...
  end
end
```

### `expect`

`describe` and `it` organize your tests and give them descriptive labels.
`expect` will actually be doing the work of testing your code.

Its task is to **match** between a value your code generates and an expected
value. You can specify the way in which it will match.

There are negative and positive constructions:

```ruby
expect(test_value).to ...
expect(test_value).to_not ...
```

You can call `expect` with either an argument or a block. You should prefer the
argument construction except when the block construction is necessary.

```ruby
RSpec.describe Integer do
  describe '#to_s' do
    it 'returns string representations of integers' do
      # argument construction
      expect(5.to_s).to eq('5')
    end
  end
end
```

The block construction is necessary when you want to test that a certain method
call will throw an error:

```ruby
RSpec.describe '#sqrt' do
  it 'throws an error if given a negative number' do
    # block construction
    expect { sqrt(-3) }.to raise_error(ArgumentError)
  end
end
```

RSpec comes with a variety of matchers that come after `expect().to` or
`expect().to_not`. The most common and straightforward matchers are straight
equality matchers.

`expect(test_value).to eq(expected_value)` will see if
`test_value == expected_value`.  
`expect(test_value).to be(expected_value)` will
test if `test_value` is the same object as `expected_value`.

```rb
expect('hello').to eq('hello') # => passes ('hello' == 'hello')
expect('hello').to be('hello') # => fails (strings are different objects)
```

At this point, you know the absolute basics of RSpec's syntax. Head on over to
the GitHub pages and read both of the READMEs. This is required reading.

- [rspec-core][rspec-core]
- [rspec-expectations][rspec-expectations] (note the variety of expectation
  matchers available to you)

Head back here once you're done.

### `before`

Welcome back! Hope you've learned a lot more about what RSpec allows you to do.

One thing that you will often want to do is set up the context in which your
specs will run. You will usually do this in a `before` block.

```ruby
RSpec.describe Chess do
  let(:board) { Board.new }

  describe '#checkmate?' do
    context 'when in checkmate' do
      before(:each) do
        board.make_move([3, 4], [2, 3])
        board.make_move([1, 2], [4, 5])
        board.make_move([5, 3], [5, 1])
        board.make_move([6, 3], [2, 4])
      end

      it 'should return true' do
        expect(board.checkmate?(:black)).to be true
      end
    end
  end
end
```

`before` can be used as either `before(:each)` or `before(:all)`. You'll almost
always use `before(:each)`. `before(:each)` will execute the block of code
before each spec in that `describe` block. The nice thing about it is that state
is not shared: you start fresh on every spec, even if inside your spec (i.e., in
your `it` block) you manipulate some object that the `before` block set up for
you.

`before(:all)`, on the other hand, does share state across specs and for that
reason, you should avoid using it. It makes your tests a bit brittle by making
specs dependent on one another (and dependent on the order in which specs are
run).

> **Note:** `before` defaults to `before(:each)`, so `before do` and
> `before(:each) do` are equivalent.

There are also `after(:each)` and `after(:all)` counterparts.

### Pending specs

Sometimes, you may want to write out a bunch of descriptions for specs without
actually writing the bodies of those specs. If you simply leave the test bodies
empty, it'll look like they're all passing. If you fail them, then it'll look
like you actually have test code written that is currently failing.

What to do? Make the specs pending.

How?

Leave off the `do...end` from the `it`.

```ruby
RSpec.describe '#valid_move?' do
  it 'should return false for wrong colored pieces'
  it 'should return false for moves that are off the board'
  it 'should return false for moves that put you in check'
end
```

## Additional notes

Don't use `!=`. RSpec does not support `expect(actual) != expected`. Instead use
`expect(actual).to eq expected` or `expect(actual).to_not eq expected`.

On predicate syntatic sugar: With all predicates, you can strip off the ? and
tack on a "be\_" to make an expectation. For example,
`expect(Array.empty?).to be true` is equivalent to `expect(Array).to be_empty`.

Note that RSpec can even conjugate verbs when necessary. For instance, to test
that a Hash `has_key?`, you can simplify

```rb
expect(my_hash.has_key?(my_key)).to eq(true)
```

to

```rb
expect(my_hash).to have_key(my_key)
```

## Previous assessment spec

Go back to the specs from the previous assessments. Read the spec files and make
sure everything makes sense to you.

## Additional Resources

- The [RSpec docs][rspec-docs] are a good resource. (In what is a rather
  unintuitive UI, you __click the version number in the dropdown menu__ under
  `RDoc` to go the documentation for the specified RSpec gem/version and the
  version number under `Examples (Relish / Gherkin)` to see examples.)

[rspec-docs]: https://rspec.info/documentation/
[rspec-core]: https://github.com/rspec/rspec-core
[rspec-expectations]: https://github.com/rspec/rspec-expectations
