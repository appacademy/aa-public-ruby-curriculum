# RSpec Order Of Operations

RSpec is particular about the order in which you invoke its various methods.
Look at this code:

```ruby
RSpec.describe Deck do
  describe '#initialize' do
    it 'initializes with 52 cards' do
      subject(:deck) { Deck.new } # nope
      expect(deck.count).to eq(52)
    end
  end
end
```

Seems reasonable enough, right? But this won't run, and it doesn't give
you a very helpful error message, either:

```sh
1) Deck#initialize initializes with 52 cards
     Failure/Error: subject(:deck) { Deck.new }
     ArgumentError:
       wrong number of arguments (1 for 0)
```

The problem is that you are trying to declare your `subject` at the top of
your `it` block; RSpec requires that the `subject` be declared outside of
your `it` blocks. This test will run successfully:

```ruby
RSpec.describe Deck do
  describe '#initialize' do
    subject(:deck) { Deck.new } # yup

    it 'initializes with 52 cards' do
      expect(deck.count).to eq(52)
    end
  end
end
```

This sort of ordering requirement applies to all of RSpec's methods; you
can't just toss in a `describe`, `it`, `expect`, `subject`, `let`, or
`before` block wherever you might naturally want to put it. RSpec
enforces a hierarchy/ordering of its methods, and you need to arrange
your blocks within the context of that structure. If you simply keep
this in mind and emulate the patterns illustrated in previous readings,
you will be fine.

Below is an example of RSpec written with the correct order of operations

```ruby
RSpec.describe Sloth do
  subject(:sloth) { Sloth.new("Herald") }

  describe "#run" do
    context "when a valid direction is given" do
      it "returns a string that includes the direction" do
        expect(sloth.run("north")).to include("north")
      end
    end

    context "when an incorrect direction is given" do
      it "raises ArgumentError" do
        expect { sloth.run("somewhere") }.to raise_error(ArgumentError)
      end
    end

  end
end
```
