# Word Chains

Word Chains present a map for transforming one word into another word by
changing one letter a time. The challenge? Each intermediate step must itself be
a valid word. So, e.g., the following represents a valid word chain going from
"PHONE" to "TRICK":

```plaintext
PHONE -> SHONE -> SHINE -> THINE -> THINK -> THICK -> TRICK
```

Your task is to create a program that, given two valid words, will produce a
valid word chain.

**Note:** You shouldn't have to use recursion for this one.
**Note 2:** Review the entire outline before beginning.

## Phase I: Adjacent words

Let's write a class `WordChainer`.

Begin writing the `#initialize(dictionary_file_name)` method. Read in the
[dictionary file][dictionary]. Store the array of dictionary words in an
instance variable (e.g., `@dictionary`).

Next, write a helper method `adjacent_words(word)`. This should return all words
in the dictionary one letter different than the current word. "One letter
different" means that both words have the same length and only differ at one
position. For example, "mat" and "cat" count as adjacent words, but "cat" and
"cats" do not, nor do "cola" and "cool."

Verify that your `adjacent_words` method is working.

**Hint**: To speed up your search greatly, store your dictionary as a
[`Set`][ruby-set]. The `Set#include?` method is much faster than
`Array#include?`, since the `Array` version needs to iterate through all the
elements of the array, whereas `Set` uses a cool trick you'll learn about when
you get to the algorithms curriculum.

## Phase IIa: Exploring all words

Next, let's begin writing a method `#run(source, target)`. Our strategy is:

* Keep a list of `@current_words`. Start this with just `[source]`.

* Also keep a list of `@all_seen_words`. Start this with just `[source]`.

* Begin an outer loop which will run as long as `@current_words` is not empty.
  This will halt our exploration when all words adjacent to `@current_word` have
  been discovered.

* Inside this loop, create a new, empty list of `new_current_words`. You're
  going to fill this up with new words (that aren't in `@all_seen_words`) that
  are adjacent (one step away) from a word in `@current_words`.

* To fill up `new_current_words`, begin a second, inner loop through
  `@current_words`.

* For each `current_word`, begin a third loop, iterating through all
  `adjacent_words(current_word)`. This is a triply nested loop.

* For each `adjacent_word`, skip it if it's already in `@all_seen_words`; you
  don't need to reconsider a word you've seen before.

* Otherwise, if it's a new word, add it to both `new_current_words`, and
  `@all_seen_words` so you don't repeat it.

* After you finish looping through all the `@current_words`, print out
  `new_current_words`, and reset `@current_words` to `new_current_words`.

Make sure your `run` method eventually terminates: it should eventually
enumerate all the words that are reachable from `source`, at which point
`new_current_words` will come out empty. After setting `@current_words =
new_current_words` the outermost loop should terminate.

After executing `#run`, `@all_seen_words` will contain a list of all the words
encountered in our 'exploration.'

Test your word chainer to make sure it outputs (1) first the words that are one
letter away from `source`, (2) next words that are one letter away from words
one letter away from `source` (i.e., two letters away from source), etc. This is
a **breadth first** enumeration of words that you can reach from the `source`.

**Call your Instructor over to check your work.**

## Phase IIb: Refactor

Your code will contain a triply nested loop. Break out the inner loop that
iterates through `@current_words` and builds and assigns the `new_current_words`
to its own method: `#explore_current_words`.

## Phase III: Keep track of prior words

So far you've written your program to build a set of `@all_seen_words`, adding
new words in breadth-first order. However, you don't record enough information
to construct a path of words from the `source` to the `target`.

Let's change your program. For every new word you encounter, record which
previous word you modified to get to the new word. To do this, instead of
keeping an array of `@all_seen_words`, let's make it a hash, where the keys are
new words and the value is the word you modified to get to the new word.

Let's start `@all_seen_words` out as `{ source => nil }`, since `source` didn't
come from anywhere. Modify `explore_current_words` so that instead of merely
adding an `adjacent_word` to the array, you record it as the key, where the
value is the `current_word` you came from.

Modify `explore_current_words` to print not just the new words, but where they
came from. At the end of `explore_current_words`, iterate through
`new_current_words`, and print out the new word and the word it came from (i.e.,
the value in the `@all_seen_words` hash). Make sure this output makes sense. You
may want to use a longer word like `"market"` to reduce the verbosity of the
output.

## Phase IV: Backtracking

Okay! Right now `#run` builds `@all_seen_words`, but it never constructs the
path from the source to the target. Let's use `@all_seen_words` to do this.

Write a method named `#build_path(target)`. It should look up the target in
`@all_seen_words`. This is the word you were at before the final step to
`target`. Then you need to look up the word you used to get the second to last
word. Then the word before that.

Keep looking back and back from `target` in `@all_seen_words`. Each time, add
the prior word to an array named `path`. Eventually you will reach `nil`, which
means you've reached the end of the path back to `source`.

Have `#run` call `build_path` and return the array.

**Request a code review from your Instructor once you can find adjacent words.**

## Bonus Phase: Stop early

Your `run` method will build the entire set of reachable words. This is wasteful
if the source is close to the target. You can stop early in that case. Modify
`run` to stop looping when `@all_seen_words` contains the target.

## Resources

For further discussion of this problem and alternative solutions, see the [Word
Chains Ruby Quiz][quiz-wayback].

[quiz-wayback]: http://web.archive.org/web/20130215052516/http://rubyquiz.com/quiz44.html
[dictionary]: https://assets.aaonline.io/fullstack/ruby/projects/word_chains/dictionary.txt
[ruby-set]: http://ruby-doc.org/stdlib-2.3.1/libdoc/set/rdoc/Set.html