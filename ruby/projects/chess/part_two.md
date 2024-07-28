# Chess (Part 2)

**Make Sure To Finish Phases I & II Before Proceeding!**

## Phase III: [`Display UML Diagram`][phase_3_uml]

Write a `Display` class to handle your rendering logic. Your `Display` class
should access the board. Require the [`colorize`][colorize-gem] gem so you can
render in color.

Download this __cursor.rb__ [file][cursor]. An instance of `Cursor` initializes
with a `cursor_pos` and an instance of `Board`. The cursor manages user input,
according to which it updates its `@cursor_pos`. The display will render the
square at `@cursor_pos` in a different color. Within __display.rb__ require
__cursor.rb__ and set the instance variable `@cursor` to `Cursor.new([0,0],
board)`.

**N.B.: If you're stuck on making a cursor for more than _30 minutes_, please
call an Instructor for help.** Fancy cursors are cool, but the purpose of today
is to become more familiar with Object-Oriented Programming.

__cursor.rb__ provides a `KEYMAP` that translates keypresses into actions and
movements. The `MOVES` hash maps possible movement differentials. You can use
the `#get_input` method as is. `#read_char` handles console input. Skim over
`#read_char` to gain a general understanding of how the method works. It's all
right if the `STDIN` methods are unfamiliar. Don't fret the details.

Fill in the `#handle_key(key)` method. Use a [case statement][case statements]
that switches on the value of `key`. Depending on the `key`, `#handle_key(key)`
will a) return the `@cursor_pos` (in case of `:return` or `:space`), b) call
`#update_pos` with the appropriate movement difference from `MOVES` and return
`nil` (in case of `:left`, `:right`, `:up`, and `:down`), or c) exit from the
terminal process (in case of `:ctrl_c`). Later we will use our `Player` and
`Game` classes to handle the movement of pieces.

**N.B.:** To exit a terminal process, use the `Process.exit` method. Pass it the
status code `0` as an argument. You can read more about `exit`
[here][process-exit].

Fill in the `#update_pos(diff)` method. It should use the `diff` to reassign
`@cursor_pos` to a new position. You may wish to write a `Board#valid_pos?`
method to ensure you update `@cursor_pos` only when the new position is on the
board.

Render the square at the `@cursor_pos` display in a different color. Test that
you can move your cursor around the board by creating and calling a method that
loops through `Display#render` and `Cursor#get_input` (much as
`Player#make_move` will function later!).

A nice but optional addition to your cursor class is a boolean instance variable
`selected` that will allow you to display the cursor in a different color when
it has selected a piece. To implement this you will need to `#toggle_selected`
every time `:return` or `:space` is hit.

**Time to test!** This time you should run `ruby display.rb`. Does your board
render as you would expect? Make sure that as you move your cursor the display
updates accordingly. Test the cursor's behavior when you try and move it off the
board (the edge cases if you will). Does it do what you expect?

**Code Review Time:** Before moving on to `piece` logic, get a code review from
an Instructor!

## Phase IV: [`Board#in_check?(color)` and `Board#checkmate?(color)` `UML Diagram`][phase_4_uml]

The `Board` class should have a method `#in_check?(color)` that returns whether
or not a player is in check. You can implement this by (1) finding the position
of the King on the board then (2) seeing if any of the opposing pieces can move
to that position.

Then write a `#checkmate?(color)` method. If the player is in check, and if none
of the player's pieces have any `#valid_moves` (to be implemented in a moment),
then the player is in checkmate.

**N.B.:** Here's a four-move sequence to get to checkmate from a starting board
for your checkmate testing:

- f2, f3
- e7, e5
- g2, g4
- d8, h4

## Head to Part 3!

Once you are finished with Phase IV, head over to Part Three.

[colorize-gem]: https://github.com/fazibear/colorize
[cursor]: https://assets.aaonline.io/fullstack/ruby/projects/chess/cursor.rb
[process-exit]: http://ruby-doc.org/core-2.2.0/Process.html#method-c-exit
[case statements]: http://ruby-doc.org/docs/keywords/1.9/Object.html#method-i-case
[phase_3_uml]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/fullstack/ruby/assets/Chess_Diagram_edited_Phase_3.png
[phase_4_uml]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/fullstack/ruby/assets/Chess_Diagram_edited_Phase_4.png