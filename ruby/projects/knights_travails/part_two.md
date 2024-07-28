# Knight's Travails Continued (Part 2)

**Finish Phases I & II before continuing!**

## Phase III: `#find_path`

Now that you have created your internal data structure (the move tree stored in
`self.root_node`), you can traverse it to find the shortest path to any position
on the board from your original `@start_pos`.

Create an instance method `#find_path(end_pos)` to search for `end_pos` in the
move tree. You can use either `dfs` or `bfs` search methods from the
`PolyTreeNode` exercises; it doesn't matter. This should return the tree node
instance containing `end_pos`.

This gives you a node, but not a path. Lastly, add a method `#trace_path_back`
to `KnightPathFinder`. This should trace back from the node to the root using
`PolyTreeNode#parent`. As it goes up-and-up toward the root, it should add each
value to an array. `#trace_path_back` should **return** the values in order from
the start position to the end position.

Use `#trace_path_back` to finish up `#find_path`.

Here are some example paths that you can use for testing purposes. (Your
sequences might differ but should be the same number of steps.)

```ruby
kpf = KnightPathFinder.new([0, 0])
kpf.find_path([7, 6]) # => [[0, 0], [1, 2], [2, 4], [3, 6], [5, 5], [7, 6]]
kpf.find_path([6, 2]) # => [[0, 0], [1, 2], [2, 0], [4, 1], [6, 2]]
```