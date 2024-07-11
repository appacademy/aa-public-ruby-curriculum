# Ruby Library Management

Many of our projects have been contained in a single file, but
in real projects, programs are spread out across many files and
folders.

Ruby gives us three means by which to manage dependencies among
those files:

* `require`
* `require_relative`
* `load`

## A simple example

```ruby
# lib/board.rb
class Board
  def initialize
    @grid = Array.new(10)
  end
end

# lib/game.rb
class Game
  def initialize
    @board = Board.new
  end
end

game = Game.new
```

```
$ ruby lib/game.rb
lib/game.rb:3:in `initialize': uninitialized constant Game::Board (NameError)
```

Ruby doesn't know what `Board` is (because it's defined in another
file that is never loaded). Therefore, Ruby throws an error when it
sees the name `Board` and doesn't know what that means. We need to
instruct `lib/game.rb` to load `lib/board.rb`:

Well, we know how to deal with this:

```ruby
# lib/game.rb
require 'board'

class Game
  def initialize
    @board = Board.new
  end
end

game = Game.new
```

A simple `require 'board'` statement at the top of `game.rb` should do
the trick:

```
$ ruby lib/game.rb
.../lib/ruby/site_ruby/2.1.2/rubygems/custom_require.rb:36:in `require':
cannot load such file -- board (LoadError)
```

Huh? I thought we knew how to solve this problem. Why did we receive a
`LoadError`?

A `LoadError` is basically telling you that Ruby did not find the file
that you told it to load. Why not? `board.rb` is in the same directory
as `game.rb`, after all...

This is not enough. The problem is Ruby's **load path**.

## `require`, `$LOAD_PATH` and `Gem.path`

Whenever you use a `require` statement, Ruby tries to find the
specified file in its **load path**, which is a list of
directories. Its specific purpose is to maintain the list of
directories through which Ruby will search when a `require` or `load`
statement is run by the interpreter.

The load path typically includes the directories that contain the
source files for Ruby's default library. You can access it through the
global variable `$LOAD_PATH`.

If something is not found in the `$LOAD_PATH`, then Ruby next tries to
see if we are requiring a gem. To do this, it looks at `Gem.path`,
which contains the directories in which gems and their source code
live.

The directory `'.'` (i.e., the current directory) is not part of the
`$LOAD_PATH`. Funnily enough, it used to be, but in Ruby 1.9.2, the
current directory was removed from the load path for security
reasons. Oh well.

So, what can we do?

We have three options:

1. Use an explicit path (like `./board`),
2. Use `require_relative`, or
3. Add a folder to the load path with the `-I` flag

## Explicit paths

Even if a file is not in a `$LOAD_PATH` directory, you can still load
it if you give an explicit path to the file. This will direct Ruby not
to look around in the `$LOAD_PATH` or the `Gem.path`, but to go
directly to the file named instead.

For instance, you can write `require './board.rb'`, which will look
for `board.rb` in the current directory (`.`).

There is one problem: the current directory is **the directory you are
running ruby from**. So if you run:

    ruby lib/game.rb

`require './board.rb'` will look inside the current directory for
`board.rb`, which is outside `lib`.

For that reason, it is often wrong to `require` an explicit path like
this. The typical solution is to use `require_relative` instead.

## `require_relative`

`require_relative` is `require`'s more helpful sibling. `require_relative`
expects an explicit path; it will not look in `$LOAD_PATH` or `Gem.spec` like
`require` does. Moreover, it will use the directory of the current source file
as the starting point, rather than the current directory (sometimes called
`$PWD`; present working directory) of the Ruby interpreter.

```ruby
# lib/game.rb
require_relative `board`

class Game
  def initialize
    @board = Board.new
  end
end

game = Game.new
```

Now we can successfully write:

```
$ ruby lib/game.rb
```

Ah, wonderful. Everything worked without a hitch this time. Even
though we launched Ruby outside `lib`, since `game.rb` lives in `lib`,
it looked in `lib` for `board.rb`.

Note that it is superfluous to add `./` with `require_relative`. Also
note that neither `require` nor `require_relative` will force you to
use the standard `.rb`; they'll add it for you.

## Add a folder to the load path `-I`

Another option we have is to add the current directory to the load
path using the `-I` flag when we call the `ruby` or `irb` or `pry`
commands in the terminal. Let's see a slightly different example:

```ruby
# animal-kit/lib/animal.rb

class Animal
  def initialize(name, species)
    @name, @species = name, species
  end

  # ...
end

# animal-kit/lib/animal-kit.rb

# a "meta file" that pulls in other `animal-kit` source files; the
# user only needs to include this file to pull in everything else.
require_relative "animal"
require_relative "herbivore"
require_relative "marsupial"

# cat-tracker/lib/cat.rb

# requires the Animal class from my animal-kit project
require 'animal-kit' 

class Cat < Animal
  def initialize(name)
    super(name, "Cattus Cattus")
  end
end
```

In this example, I have two separate projects. One is called
`animal-kit`, and it is a framework that allows me to easily write
`Animal` subclasses. I have another project, `cat-tracker`, which
wants to use my `animal-kit` project.

Note that the `animal-kit` project is not part of `cat-tracker`, nor is
`cat-tracker` part of `animal-kit`. In particular, the code for the two projects
is not likely to be packaged and shipped to the user together. We shouldn't use
`require_relative` in `cat.rb` because we don't know where the files of
`animal-kit` may be.

A reasonable solution to this problem would be to write an
`animal-kit` gem and post it to the internet. (Gems are typically
stored on the site `http://rubygems.org/`.) The user of the
`cat-tracker` program could then `gem install animal-kit`. Then the
`require 'animal-kit'` line will find the gem.

When just starting out, we may not want to do this. Another way is to
add `animal-kit/lib` to the `$LOAD_PATH`. Then, when we require
`animal-kit`, Ruby will look in the `animal-kit/lib` directory.

We can add a directory to the `$LOAD_PATH` using the `-I` flag to
Ruby/IRB/Pry:

```
$ ruby -I animal-kit/lib cat-tracker/lib/animal.rb
```

A convention with the `-I` flag is actually to leave no space between
the flag and the folder, so you may see the flag used like this:

```
$ ruby -I./animal-kit/lib cat-tracker/lib/animal.rb
```

This was a special case, but it shows us another way to require code.

## `load`

Finally, we come to `load`.

What's the difference between `load` and `require`?

With `require`, Ruby keeps a list of the files that have already
been required, so if you require a file twice (for example,
in pry or irb), the second call to `require` will do nothing.
The Ruby interpreter will check to see if that file has previously
been required, see that it has, and do nothing.

`load` will read in the file every time, no matter what. This can be useful
especially when working with a file in pry or irb. You interact with a file in
pry, then go and change something in the file. If you use `require` in pry each
time, you won't actually see the changes in your file reflected: the interpreter
will see that the file has previously been required and do nothing. But if you
use `load`, the updated file will be read in.

**Never use `load` in source files**. `load` should only be used in the context
of a REPL like pry or irb. You should never need to use `load` in a source file
since source files will not be dynamically modified and re-loaded during the
duration of a running, production program. `load` is there for convenience when
developing and debugging in the REPL.
