# Breaking Confusing Methods Into Parts

Consider this line of code:

```ruby
exp(b, n) = b * exp(b, n - 1)

```

It's math, so it's sort of readable. But `exp`, `b` and `n` are still terrible
names for variables. They're too short.

Copy this line of code into a new text file. Starting with the first code that
runs on the line, name each part of the line as descriptively as you can on a
separate line.  Then try walking through what's happening.


Start by rewriting it as:

```ruby
exponent(base, power) = base * exponent(base, power - 1)

```

Then, `power - 1` runs first. So rewrite as:

```ruby
smaller_exponent = power - 1
exponent(base, power) = base * exponent(base, smaller_exponent)

```

Then:

```ruby
smaller_exponent = power - 1
base_to_the_smaller_exponent = exponent(base, smaller_exponent)

exponent(base, power) = base * base_to_the_smaller_exponent

```

Resulting in:

```ruby
exponent(base, power) = base * base_to_the_smaller_exponent

```

See how much clearer that last line is?  Your code should read like Hemingway.

### Two important takeaways

1. We named the variables as descriptively as possible.
2. We broke complicated lines down into parts.

Hold yourself to these standards almost every time you write code.

### A Counterargument

You might ask: doesn't naming variables slow me down?

There are four major reasons that long variable names are much faster for you in
the long run.

1. Over the coming weeks, you're about to get a lot better at typing quickly.
2. Your text editor (i.e., VS Code, Atom, Sublime Text) will autocomplete long
   variable names.
3. It's easier for someone else to read your code.
4. You reduce the amount of data in your [working memory][working memory],
   because you don't have to remember what abbrevations stand for what concepts.
   Less data in your working memory gives you more space to tackle new problems.

[working memory]: https://en.wikipedia.org/wiki/Working_memory

## Short Exercise

The method below estimates how much money your child will have when they retire,
based on your age.

```ruby
    def return_number(a)
      ((a / 2)**2) * (65 - (a / 2))
    end

```

Sample Inputs and Outputs:
- An input of 30 should output 11250
- An input of 50 should output 25000

You know the algorithm involves these steps in some order:

- Calculate how much money they'll have by multiplying by the number of years
  they have left until retirement.
- Estimate your child's current bank account by squaring their age.
- Estimate your child's age by dividing your age by two.
- Calculate how many years your child has left until they retire at age 65

The method is written so poorly, it may as well be the script for Home Alone 4.
There are one-letter variables and there's too much happening on one line.

Rewrite the method by identifying the first operations that run (HINT: find the
innermost parentheses). Then copy these operations onto separate lines (like the
"exponent" example above) and use descriptive variable names.

DO NOT try to write the algorithm from scratch. That is NOT the point of the
exercise.

Finally, rewrite the name of the method itself. Methods that have a side-effect
(modify state) should be named with verbs, e.g. `#activate_account` or
`#reveal_card`. Methods that return a useful value should be named with nouns
describing their output, e.g. `#full_name` or `#days_since_last_login`.

Test that the method still returns the right output by running the code in pry.

Then check with a TA and see if the naming makes sense to them.  The code should
almost look like english once you're done with it.
