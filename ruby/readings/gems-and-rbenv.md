# RubyGems

Sometimes, developers writing code notice that they've written something that
might be useful to others. If they are nice people, they package that code up
into a _gem_ (also often called a _library_ outside Ruby contexts) and share
it with the world. This can be anything from a few short methods to a web
framework as large as Rails.

Let's see how to find, install, and use a gem.

## Finding gems

The single best place to find useful gems is GitHub. It is often sufficient just
to Google what you want to do, read StackOverflow for suggestions, and
then look at the gem's GitHub repo to see if it's what you want.

On GitHub you can see how many people have followed the repository and how
recently it has been updated. Gems that have >1k follows are mainstream and can
be relied upon to be pretty much rock-solid. They also typically have great
documentation. Gems with more than 500 follows are fairly popular, but it may be
harder to find answers to problems by searching around. Gems with less than 500
follows are not as popular (obviously) and might not be as well maintained.
Using a gem with <100 follows means that you might very well have to do some
gem debugging yourself.

## Installing gems

Let's check out [Awesome Print][awesome-print], a library that "pretty prints"
Ruby output (**N.B.**: pry already prettifies output, so awesome_print won't
seem as awesome as if we were using plain irb).

The Awesome Print GitHub shows us how to install the gem: `gem install
awesome_print`. That's it!

[awesome-print]: https://github.com/awesome-print/awesome_print

## `sudo gem install` and rbenv

> **This section is OS X and Linux specific**. Windows users cannot install
> rbenv: it's only for Unix systems. However, Windows users who have installed
> Ruby through RubyInstaller can already install gems without using `sudo` and
> are already using an up-to-date Ruby.

If you aren't using rbenv, you will run into an error like this:

```sh
~$ gem install awesome_print
Fetching: awesome_print-1.1.0.gem (100%)
ERROR:  While executing gem ... (Gem::FilePermissionError)
    You don't have write permissions into the /Library/Ruby/Gems/1.8 directory.
```

This is because the built-in Ruby that comes with OS X installs gems in a system
directory where you need superuser permissions to create files. You'll read in
some places that you should use `sudo gem install awesome_print`; **DO NOT DO
THIS!**

Instead, set up rbenv. (For more details, revisit the "Setting Up Your Computer
Environment" reading under "Introduction->Computer Setup" in your "Software
Engineering Foundations" module.) Once rbenv is installed, there will be no
need to use `sudo` and you should no longer get this error. However, you must
**never** use `sudo gem install` with rbenv or you'll wind up with [permission
issues again][sudo-with-rbenv].

[sudo-with-rbenv]: http://stackoverflow.com/questions/28846165/permission-error-when-trying-to-install-rails-osx

## Using gems

You should now be able to require source files provided by the gem:

```ruby
[1] pry(main)> require 'awesome_print'
=> true
[2] pry(main)> ap({:this => "is totally awesome!"})
{
    :this => "is totally awesome!"
}
=> nil
```

You'll need to read up on how to use your newly installed gem. GitHub often has
examples that show you the most common methods and how they are used. Well
documented libraries like RSpec have whole websites of
[documentation][rspec-docs]. The GitHub page usually contains links to
documentation; if not, do a quick Google search.

Documentation can often be spotty and incomplete. In that case, you may have to
explore the code itself on GitHub to try to figure out how things work.

[rspec-docs]: https://rspec.info/documentation/
