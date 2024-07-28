# Tic-Tac-Toe AI

You're going to write a computer AI that can't be beaten at TicTacToe. 

## Learning goals

By the end of the practice, you should be able to

* Use your knowledge of polytrees to build a tree of all possible outcomes
* Write an AI that uses your nodes to always win at TicTacToe

## Phase 0: Setup

To get started, download the skeleton by clicking on the `Download Project`
button at the bottom of this page. On the ensuing GitHub page, click the green
`<> Code` button and select `Download ZIP`.  

In the skeleton is a __tic_tac_toe.rb__ file which contains an improved version
of the TTT solution from W2D3 in the Foundations module. Today, you will be
writing a `TicTacToeNode` class which utilizes the `Board` class from the TTT
solution. You will also be writing a `SuperComputerPlayer` class which builds on
the `ComputerPlayer` class from the TTT solution.

Once you've downloaded the files from the repo, check that you can run the
specs:

```sh
bundle exec rspec spec/tic_tac_toe_node_spec.rb
bundle exec rspec spec/super_computer_player_spec.rb
```

Of course, they should be failing right now. Call your Instructor over if you
have problems.

## Phase I: `TicTacToeNode`

Create a `TicTacToeNode` class. This will represent a TTT game-state: it
will store the current state of the `board` plus the `next_mover_mark` of the
player who will move next.  Also, if given, store the `prev_move_pos` (this will
come in handy later).

This doesn't use the `TreeNode` you made earlier. You are making a completely
new class independent of the `TreeNode`.

Write a method `children` that returns nodes representing all the potential game
states one move after the current node. To create this method, it will be
necessary to iterate through all positions that are `empty?` on the board
object. For each empty position, create a node by duping the board and putting a
`next_mover_mark` in the position. You'll want to alternate `next_mover_mark` so
that next time the other player gets to move. Also, set `prev_move_pos` to the
position you just marked, for reasons that will make sense when you use it
later.

Next, you want to characterize a node as either a winner or a loser for a
particular mark (evaluator). You will write two methods:
`#losing_node?(evaluator)` or `#winning_node?(evaluator)`. These methods are
*not* optional, you will need them both.

A `#losing_node?` is described in the following cases:

* Base case: **The board is over** AND
  * If `winner` is the opponent, this is a losing node.
  * If `winner` is `nil` or the player, this is not a losing node.
* Recursive case:
  * It is the player's turn, and all the children nodes are losers
    for the player (anywhere they move they still lose), OR
  * It is the opponent's turn, and one of the children nodes is a
    losing node for the player (assumes your opponent plays
    perfectly; they'll force you to lose if they can).

**N.B.:** A draw (`Board#tied?`) is NOT a loss. If a node is a draw,
`#losing_node?` should return false.

Likewise, a winning node means either:

* Base case: **The board is over** AND
  * If `winner` is the player, this is a winning node.
  * If `winner` is `nil` or the opponent, this is not a winning node.
* Recursive case:
  * It is the player's turn, and one of the children nodes is a winning node for
    the player (we'll be smart and take that move), OR
  * It is the opponent's turn, and all of the children nodes are winning nodes
    for the player (even TicTacToeKasparov can't beat you from here).

Notice that `winning_node?` and `losing_node?` are both defined recursively.
This is what makes them look at all the ways the game can play out. For
instance, a node can be a winning node even though you won't win on the very
next turn; it just requires that, assuming you play perfectly, eventually you'll
beat the opponent no matter what they do.

## Phase II: `SuperComputerPlayer`

Write a subclass of `ComputerPlayer`; you'll override the `#move` method to use
your `TicTacToeNode`.

In the `#move` method, build a `TicTacToeNode` from the board stored in the
`game` passed in as an argument. Next, iterate through the `children` of the
node you just created. If any of the children is a `winning_node?` for the mark
passed in to the `#move` method, return that node's `prev_move_pos` because that
is the position that causes a certain victory! See, that did come in handy!

If none of the `children` of the node you created are `winning_node?`s, that's
ok. Just pick one that isn't a `losing_node?` and return its `prev_move_pos`.
That will prevent the opponent from ever winning, and that's almost as good. To
make that even clearer: if a winner isn't found, pick one of the children of
your node that returns `false` for `losing_node?`.

Finally, `raise` an error if there are no non-losing nodes. In TTT, if you play
perfectly, you should always be able to force a draw.

Run your TTT game with the `SuperComputerPlayer` and weep tears of shame because
you can't beat a robot at Tic-Tac-Toe.