# Programming Paradigms

At this point, you may be wondering to yourself: what in the world does
"programming paradigm" even mean? **You're in luck.** You're not the only one.
**Programming paradigms** are just ways to classify programming languages
according to their style.

There are a lot of different styles of programming, and a programming language
isn't necessarily bound to one specific style. For now, let's talk about two
opposite styles in Ruby, imperative and declarative.

### Imperative Programming

The original style of high-level languages, imperative programming just feeds
step-by-step instructions for the computer to execute.

```ruby
def imperative_odds(array)
  idx = 0
  odds = []
  while (idx < array.length)
    if array[idx].odd?
      odds << array[idx]
    end
    i += 1
  end
  odds
end
```

### Declarative Programming

In contrast, declarative programming describes what you want to achieve, without
going into too much detail about how you're going to do it.

```ruby
def declarative_odds(array)
  odds = array.select { |el| el.odd? }
end
```

The given examples are functionally the same, but are fundamentally different in
style. Keep in mind, although programming languages like Ruby allow for
different styles, certain languages restrict themselves to the guidelines of a
specific programming paradigm. In the next reading, you'll find **SQL** is an
example of declarative programming.

### Additional Resources

* [LMU overview of programming paradigms][reading]
* [First part of Stanford lecture series][video]

[reading]: http://cs.lmu.edu/~ray/notes/paradigms/
[video]: https://www.youtube.com/watch?v=Ps8jOj7diA0
