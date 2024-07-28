# Big O-ctopus And Biggest Fish

A Very Hungry Octopus wants to eat the longest fish in an array of fish.

```sh
['fish', 'fiiish', 'fiiiiish', 'fiiiish', 'fffish', 'ffiiiiisshh', 'fsh', 
 'fiiiissshhhhhh']
=> "fiiiissshhhhhh"
```

## Sluggish Octopus

Find the longest fish in O(n^2) time. Do this by comparing all fish lengths to
all other fish lengths

## Dominant Octopus

Find the longest fish in O(n log n) time. **Hint:** You saw a sorting algorithm
that runs in O(n log n) in the [sorting complexity demo][sorting-demo] from the
Sorting Complexity reading. Remember that Big O is classified by the dominant
term.

## Clever Octopus

Find the longest fish in O(n) time. The octopus can hold on to the longest fish
that you have found so far while stepping through the array only once.

## Dancing Octopus

Full of fish, the Octopus attempts [Dance Dance Revolution][ddr]. The game has
tiles in the following directions:

```ruby
tiles_array = ["up", "right-up", "right", "right-down", "down", "left-down", 
               "left",  "left-up"]
```

To play the game, the octopus must step on a tile with her corresponding
tentacle. You can assume that the octopus's eight tentacles are numbered and
correspond to the tile direction indices.

## Slow Dance

Given a tile direction, iterate through a tiles array to return the tentacle
number (tile index) the octopus must move. This should take O(n) time.

```sh
slow_dance("up", tiles_array)
> 0

slow_dance("right-down", tiles_array)
> 3
```

## Fast Dance!

Now that the octopus is warmed up, let's help her dance faster. Use a different
data structure and write a new function so that you can access the tentacle
number in O(1) time.

```sh
fast_dance("up", new_tiles_data_structure)
> 0

fast_dance("right-down", new_tiles_data_structure)
> 3
```

[ddr]: https://en.wikipedia.org/wiki/Dance_Dance_Revolution
[sorting-demo]: https://assets.aaonline.io/fullstack/ruby/homeworks/sorting_demo/sorting_demo.rb