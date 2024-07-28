# OOP Quiz 2

```ruby
  class Municipality
    attr_reader :state

    def initialize(state = "California")
      @state = state
    end
  end

  class City < Municipality
    def initialize(name, state)
      @name = name
      super(state)
    end
  end

  class Town < Municipality
    def initialize(population)
      @population = population
      super
    end
  end

  class County < Municipality
    def change_state(new_state)
      self.state = new_state
    end
  end

  nyc = City.new("New York City", "New York")
  oaktown = Town.new(500000)
  marin = County.new
```

#### Consider the above code. What are the respective return values from calling `nyc.state`, `oaktown.state`, and `marin.state`?</p>
- [ ] `"New York"`, `"California"`, `"California"`
- [ ] `"New York City"`, `"California"`, `"Marin"`
- [ ] `"New York"`, `500000`, `"California"`
- [ ] `"New York City"`, `"California"`, `NoMethodError`
- [ ] `"California"`, `"California"`, `"California"`

<details><summary>Answer:</summary>

`"New York"`, `500000`, `"California"`</details>
<details><summary>Explanation:</summary>

`City#initialize` explicitly passes its `state` parameter (here, `"New York"`) to `super`. `Town#initialize`, in contrast, just calls `super`, which passes along all of `Town#initialize`'s incoming arguments (here, `500000`) to `Municipality#initialize`. (To avoid passing along its arguments and have `super` apply the default argument of `"California"`, `Town#initialize` would need to indicate explicitly that it was calling `super` without any arguments, i.e., `super()`.) Finally, since the `County` class does not have a defined initialize method, calling `new`  on `County` will run the parent class's `initialize` method, thereby setting `state` to the default value of `"California"`. 
    </details>



```ruby
class Board
  def initialize
    @grid = Array.new(8) { Array.new(8) { NullPiece.instance }}
  end

  def [](pos)
    row, col = pos
    @grid[row][col]
  end

  def []=(pos, val)
    row, col = pos
    @grid[row][col] = val
  end

  def add_piece(pos, piece)
    @grid[pos] = piece
  end
end

board = Board.new
board.add_piece([0,0], Pawn.new)
```

#### Why will the code above not add the pawn to `0, 0` as expected?</p>
- [ ] The `*` splat operator should be used in `#add_piece` when indexing into the grid: `@grid[*pos] = piece`
- [ ] `#add_piece` should call `self[pos]` rather than `@grid[pos]`
- [ ] There should be an `attr_reader` for the `@grid` instance variable.
- [ ] Nothing is wrong with the above code.

<details><summary>Answer:</summary>

`#add_piece` should call `self[pos]` rather than `@grid[pos]`</details>
<details><summary>Explanation:</summary>

It will not add the pawn because `@grid[pos]` in `#add_piece` resolves to `@grid[[0,0]]`, which will produce `TypeError: no implicit conversion of Array into Integer`. It produces this error because `@grid` is an `Array`, and the `Array#[]` method expects an integer as an argument, not an array (i.e., not `[0,0]`). To avoid this problem, note that the `Board#[]` and `Board#[]=` methods both expect an array as an argument (`pos`) and use that array to access `@grid` for you. `#add_piece` will accordingly add the pawn successfully if it instead calls `self[pos] = piece`.</details>



```ruby
class Pawn
  attr_accessor :position
  
  def initialize(position)
    @position = position
  end
end

pawn = Pawn.new([0, 1])
pawn_copy = pawn.dup

pawn_copy.position[1] = "CHANGED"
pawn.position
```

#### Consider the above code, which uses Ruby's native `#dup` method. What will `pawn` and `pawn_copy`'s positions be? </p>
- [ ] `[0, "CHANGED"]`, `[0, "CHANGED"]`
- [ ] `[0, 1]`, `[0, "CHANGED"]`
- [ ] `[0, 1]`, `[0, 1]`
- [ ] `[0, "CHANGED"]`, `[0, 1]`

<details><summary>Answer:</summary>

`[0, "CHANGED"]`, `[0, "CHANGED"]`</details>
<details><summary>Explanation:</summary>

Remember that Ruby's native `#dup` method only makes a shallow copy. This means that it copies the references stored in instance variables instead of creating new copies of the objects they reference. `pawn` and `pawn_copy` will accordingly both reference the same array, but if they both reference the same array, then changing that array in one instance will also change it in the other! To avoid this problem, you would need to create a new position array when making your second pawn.</details>



```ruby
class Piece
  include Singleton
  # ...

end
```

#### Consider the above code. How would you create and refer to this `Piece` object?</p>
- [ ] `Piece.new`
- [ ] `Piece.create`
- [ ] `Piece.instance`
- [ ] `Singleton.instance`

<details><summary>Answer:</summary>

`Piece.instance`</details>
<details><summary>Explanation:</summary>

The `Singleton` module allows you to have only one instance of a class. You would invoke that singular instance using `Piece.instance`. </details>