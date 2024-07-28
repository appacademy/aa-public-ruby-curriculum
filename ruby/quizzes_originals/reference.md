# Reference Quiz

```ruby
  arr = Array.new(3, [])
  arr[0] << "Foo"
  arr
```
<quiz>
  <question>
    <p>What will be the output of the above code?</p>
    <answer correct>`[["Foo"] ,["Foo"], ["Foo"]]`</answer>
    <answer>`[[], [], []]`</answer>
    <answer>`[["Foo"], [], []]`</answer>
    <answer>`["Foo", [], []]`</answer>
    <answer>`["Foo", "Foo", "Foo"]`</answer>
    <answer>None of the above</answer>
    <explanation>The three empty arrays in `arr` are all the same array in memory (same object id).  When we shovel something into the first array, all three get modified because each element in our parent array has a memory pointer to the same array.</explanation>
  </question>
</quiz>



```ruby
  arr = Array.new(3) { [] }
  arr[0] << "Foo"
  arr
```

<quiz>
  <question>
    <p>What will be the output of the above code?</p>
    <answer>`[[], [], []]`</answer>
    <answer correct>`[["Foo"], [], []]`</answer>
    <answer>`["Foo", [], []]`</answer>
    <answer>`["Foo", "Foo", "Foo"]`</answer>
    <answer>`[["Foo"] ,["Foo"], ["Foo"]]`</answer>
    <answer>None of the above</answer>
    <explanation>Passing a block to `Array.new` creates a new array with a different object id for every element in `arr`.</explanation>
  </question>
</quiz>



```ruby
  x = 15
  def foo(x)
    x = 10
  end
  foo(x)
  p x
```

<quiz>
  <question>
    <p>What will be the output of the above code?</p>
    <answer>`42`</answer>
    <answer correct>`15`</answer>
    <answer>`"x"`</answer>
    <answer>`10`</answer>
    <answer>`nil`</answer>
    <answer>None of the above</answer>
    <explanation>When printing `x`, ruby will check the current scope for a variable named `x`.  In this case, x is set to 15.  When you define a function `def` you are creating a new scope that is fully contained by the method definition.  Ruby will not look into that scope for a variable named `x`.</explanation>
  </question>
</quiz>



```ruby
  x = []
  def foo(x)
    x << "Fancy Feast"
  end
  foo(x)
  p x
```

<quiz>
  <question>
    <p>What will be the output of the above code?</p>
    <answer correct>`["Fancy Feast"]`</answer>
    <answer>`"Fancy Feast"`</answer>
    <answer>`[]`</answer>
    <answer>`nil`</answer>
    <answer>`["Fancy", "Feast"]`</answer>
    <answer>None of the above</answer>
    <explanation>Since we are passing the array, `x`, into the invocation of `foo`, the local variable `x` inside the scope of the `foo` method has a pointer to the same array in the outter scope.</explanation>
  </question>
</quiz>



```ruby
  game.board[pos].revealed = true if !guess && game.board[pos] && game.board[pos].revealed == false
```

<quiz>
  <question multiple>
    <p>What's wrong with the above line of code?</p>
    <answer correct>Long method chain suggests Law of Demeter violation</answer>
    <answer correct>`if !condition` is not stylistic ruby</answer>
    <answer correct>Objects are tightly coupled</answer>
    <answer correct>Code is not DRY</answer>
    <explanation>We are chaining too many methods.  The `!if` should be changed to `unless` when possible. We are relying on the `board` information on the `game` for every call instead of being able to call a method directly on the game. And the `game.board[pos]` is repeated many times making it complicated to understand right off the bat.</explanation>
  </question>
</quiz>
