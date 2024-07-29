# Reference Quiz

```ruby
  arr = Array.new(3, [])
  arr[0] << "Foo"
  arr
```
#### What will be the output of the above code?</p>
- [ ] `[["Foo"] ,["Foo"], ["Foo"]]`
- [ ] `[[], [], []]`
- [ ] `[["Foo"], [], []]`
- [ ] `["Foo", [], []]`
- [ ] `["Foo", "Foo", "Foo"]`
- [ ] None of the above
<details><summary>Answer:</summary>

- `[["Foo"] ,["Foo"], ["Foo"]]`</details>
<details><summary>Explanation:</summary>

The three empty arrays in `arr` are all the same array in memory (same object id).  When we shovel something into the first array, all three get modified because each element in our parent array has a memory pointer to the same array.</details>



```ruby
  arr = Array.new(3) { [] }
  arr[0] << "Foo"
  arr
```

#### What will be the output of the above code?</p>
- [ ] `[[], [], []]`
- [ ] `[["Foo"], [], []]`
- [ ] `["Foo", [], []]`
- [ ] `["Foo", "Foo", "Foo"]`
- [ ] `[["Foo"] ,["Foo"], ["Foo"]]`
- [ ] None of the above
<details><summary>Answer:</summary>

- `[["Foo"], [], []]`</details>
<details><summary>Explanation:</summary>

Passing a block to `Array.new` creates a new array with a different object id for every element in `arr`.</details>



```ruby
  x = 15
  def foo(x)
    x = 10
  end
  foo(x)
  p x
```

#### What will be the output of the above code?</p>
- [ ] `42`
- [ ] `15`
- [ ] `"x"`
- [ ] `10`
- [ ] `nil`
- [ ] None of the above

<details><summary>Answer:</summary>

- `15`</details>
<details><summary>Explanation:</summary>

When printing `x`, ruby will check the current scope for a variable named `x`.  In this case, x is set to 15.  When you define a function `def` you are creating a new scope that is fully contained by the method definition.  Ruby will not look into that scope for a variable named `x`.</details>



```ruby
  x = []
  def foo(x)
    x << "Fancy Feast"
  end
  foo(x)
  p x
```

#### What will be the output of the above code?</p>
- [ ] `["Fancy Feast"]`
- [ ] `"Fancy Feast"`
- [ ] `[]`
- [ ] `nil`
- [ ] `["Fancy", "Feast"]`
- [ ] None of the above

<details><summary>Answer:</summary>

- `["Fancy Feast"]`</details>
<details><summary>Explanation:</summary>

Since we are passing the array, `x`, into the invocation of `foo`, the local variable `x` inside the scope of the `foo` method has a pointer to the same array in the outter scope.</details>


```ruby
  game.board[pos].revealed = true if !guess && game.board[pos] && game.board[pos].revealed == false
```

#### What's wrong with the above line of code?</p>
- [ ] Long method chain suggests Law of Demeter violation
- [ ] `if !condition` is not stylistic ruby
- [ ] Objects are tightly coupled
- [ ] Code is not DRY

<details><summary>Answer:</summary>

- Long method chain suggests Law of Demeter violation
- `if !condition` is not stylistic ruby
- Objects are tightly coupled
- Code is not DRY</details>
<details><summary>Explanation:</summary>

We are chaining too many methods.  The `!if` should be changed to `unless` when possible. We are relying on the `board` information on the `game` for every call instead of being able to call a method directly on the game. And the `game.board[pos]` is repeated many times making it complicated to understand right off the bat.</details>
