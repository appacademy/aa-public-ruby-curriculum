# Simon

Today's assignment is writing a terminal version of Simon. If you've never
played this color sequence memory game, check out [this version][simon].

The goal for today's homework is to give you more practice writing code driven
by specs. With that in mind, make sure to read the tests and their error
messages carefully.

Download the project skeleton by clicking on the `Download Project` button at
the bottom of this page. On the ensuing GitHub page, click the green `<> Code`
button and select `Download ZIP`. Move the downloaded __.zip__ file to your
desired folder and unzip.

Check out the method names outlined for you. You should be able to write a
working version of the game with the existing methods.

The specs should guide you as to what each method does. One important thing to
note is that it is generally impractical to test console user input, so the
specs don't test `require_sequence`. The goal of `require_sequence` is to prompt
the user to repeat back the new sequence that was just shown to them, one color
at a time. If they give an incorrect color, it should immediately set
`@game_over` to be true.

Now go run those specs!

[simon]: http://www.freesimon.org/