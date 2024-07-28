# Knight's Travails

**Read through all the instructions before beginning!**

## Learning goals

By the end of the practice, you should

- Be able to implement your PolyTreeNode to build a path from start to finish
- Know how to store and traverse a tree
- Know when and why to use BFS vs. DFS

## Phase 0: Description

In this project you will create a class that will find the shortest path for a
chess knight from a starting position to an end position. Both the start and end
positions should be on a standard 8x8 chess board.

**N.B.:** This problem is a lot like word chains!

Write a `KnightPathFinder` class. Initialize your `KnightPathFinder` with a
starting position. For instance:

```ruby
kpf = KnightPathFinder.new([0, 0])
```

Ultimately, you want to be able to find paths to end positions:

```ruby
kpf.find_path([2, 1]) # => [[0, 0], [2, 1]]
kpf.find_path([3, 3]) # => [[0, 0], [2, 1], [3, 3]]
```

To help find paths, you will build a **move tree**. The values in the tree
will be positions. A node is a child of another node if you can move from the
parent position directly to the child position. The root node of the tree should
be the knight's starting position. **You will want to build on your
`PolyTreeNode` work, using `PolyTreeNode` instances to represent each
position.**

Start by creating an instance variable, `self.root_node` that stores the
knight's initial position in an instance of your `PolyTreeNode` class.

You will write an instance method `KnightPathFinder#build_move_tree` to build
the move tree, beginning with `self.root_node`. Call this method in
`initialize`; you will traverse the move tree whenever `#find_path` is called.
**Don't write this yet though.**

## Phase I: `#new_move_positions`

Before you start `#build_move_tree`, you'll want to be able to find new
positions you can move to from a given position. Write a **class** method
`KnightPathFinder::valid_moves(pos)`. There are up to eight possible moves.

You'll also want to avoid repeating positions in the move tree. For instance,
you don't want to infinitely explore moving between the same two positions. Add
an instance variable, `@considered_positions`, to keep track of the positions
you have considered; initialize it to the array containing just the starting
pos. Write an **instance** method `#new_move_positions(pos)`; this should call
the `::valid_moves` class method, but filter out any positions that are already
in `@considered_positions`. It should then add the remaining new positions to
`@considered_positions` and **return** these new positions.

## Phase II: `#build_move_tree`

Let's return to `#build_move_tree`. You'll use your `#new_move_positions`
instance method.

To ensure that your tree represents only the shortest path to a given position,
build your tree in a **breadth-first** manner. Take inspiration from your BFS
algorithm: use a queue to process nodes in FIFO order. Start with a root node
representing the `start_pos` and explore moves from one position at a time.

Next build nodes representing positions one move away, add these to the queue.
Then take the next node from the queue... until the queue is empty.

When you have completed--and tested!--`#build_move_tree` **get a code review
from your Instructor.**

## Head to Part 2!

Once you are finished with Phases 1 & 2, head over to Part Two.