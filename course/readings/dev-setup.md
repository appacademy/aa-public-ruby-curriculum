# Setting up a Development Environment

Being a developer isn't just hacking away into the wee hours of the morning or
debugging a new feature. In order to become a well-rounded developer we should
also understand what tools we need and a minimum understanding of how they work.
This includes setting up our computers for development.

Here at App Academy we work with a Ruby on Rails, JavaScript, React, Redux, and
PostgresSQL stack. A [stack][stack-defn] is simply a collection of software and
hardware used in development of an application. For our specific purposes we are
using Ruby on Rails on the backend/server, PostgresSQL to house our database,
and JavaScript + React + Redux for frontend rendering and logic.

As we progress through the course you will be prompted to complete a few
installation and configuration steps to get your personal machine ready for the
next phase.

## Phase 0: Preparing your machine

Here we will install basic developer tools, such as [homebrew][homebrew] (a 3rd
party package manager for MacOS), Xcode (a library of developer tools provided
by Apple), git (a version control system we will be using throughout the
course), and VS Code (a full-featured text-editor).

### Chrome
Here at App Academy, our browser of choice is Google Chrome. This isn't super
important at the beginning of the course, but once we get into frontend
development the Chrome Devtools (think frontend debugging) are going to play a
very important role.

To install, download from the [Google Chrome][chrome-dl] and install.

#### Optional for In Person Students App Academy Chrome Tab
We have a custom Chrome Extension for new tabs that provides a dashboard with
links to the curriculum, relevant documentation, and, once your cohort starts,
links to the day's projects, readings, and homework.

This is not required, but feel free to give it a try. To install, follow the
installation instructions on the [App Academy Chrome Tab Repo][aa-chrome-tab].

### Xcode

Let's start with Xcode. The Xcode command line tools are a requirement for
installing the homebrew package manager in the next step. 

**NOTE: If you are using a Linux machine you will not be able to install Xcode
or homebrew. Instead please follow [these git installation
directions][linux-git] and then [these rbenv installation
directions][linux-rbenv] (up to and including "Installing Ruby versions") to
download rbenv using git. Once you are finished, skip to the section on Git and
ignore all commands involving homebrew.**

Install the Xcode command line tools by running the following from the console.

```sh
$ xcode-select --install
```

To conclude the installation you will need to agree to the Xcode license. Start
the Xcode app, click "Agree", and allow the installation to finish. Then you can
go ahead and quit the Xcode app.

### Homebrew
Homebrew is kind of like a low-tech App Store. It allows us access to and the
ability to install a wide variety of software and command line tools from the
console. These are distinct from those hosted on the App Store and will need to
be managed by Homebrew.

Enter the following in your terminal to download and install Homebrew:

```sh
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

You will be given a list of dependencies that will be installed and prompted to
continue or abort. Press `RETURN` to continue.

Let's break this command down a bit. `curl`, a command-line tool commonly used
for downloading files from the internet, is used to download the Homebrew
installation file. The `"$(...)"` transforms the file content into a string.
Finally, the string is passed to our Ruby executable (`/usr/bin/ruby` is where
this the system Ruby executable file is stored on our machine) with the `-e`
flag to tell Ruby to run the argument as code. 

Check out the [Homebrew website][homebrew] to learn the basic commands.

### Git
Git is a version control system that allows us to track, commit and revert
changes to files within a directory. Here we will install it and add global user
info.

```sh
# install git
brew install git

# makes git terminal output pretty
git config --global color.ui true

# this will mark you as the 'author' of each committed change
git config --global user.name "your name here"

# use the email associated with your GitHub account
git config --global user.email your_email_here
```

### VS Code
This one is pretty easy. Go to
[code.visualstudio.com][vsc], then download and
install VS Code.

To verify that the shell commands were installed correctly, run `which code` in
your terminal. If `code` is not a recognized command, open the VS Code editor,
open the Command Palette (`Cmd+Shift+P` on macOS ,`Ctrl+Shift+P` on Linux) and
type `shell command` to find the `Shell Command: Install 'code' command in PATH`
command. Then restart the terminal. This allows you to easily open files in VS
Code from the terminal using the `code` command followed by a file or directory.

Next, we'll want to install a few useful VS Code extensions and configure VS
Code to play nice with these extensions. Download [this zip
file][vscode-scripts], which contains a scripts that will do the work for you.
Unzip the file and open the `setup_vscode` directory. Then open that directory
in the terminal (drag and drop it over the terminal icon on macOS or right click
in the directory and select `Open in Terminal` on most Linux distributions). To
run the script, type `./setup_vscode.sh`. The script will do the rest. Simply
restart VS Code and you'll be good to go. (Note that there's a second script,
called `setup_vscode_linter.sh`. We can't run this script yet but will do so in
due time.)

## Phase 1: Ruby

Here we will be setting up Ruby with the help of [rbenv][rbenv], a Ruby
environment manager. We like rbenv because it allows us to switch between
versions of Ruby easily and setup default versions to use within project
directories. This will install instances of Ruby in addition to the system
version, which comes pre-installed.

### Rbenv + Ruby
First we will install rbenv, then use it to install our desired version of Ruby.

```sh
# install rbenv
brew install rbenv

# add to the PATH (rbenv commands are now available from terminal)
# .bashrc is the file that contains all of our terminal settings
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc

# initialize rbenv everytime you open a new console window (otherwise our system
# ruby version will take over when we start a new terminal session)
echo 'eval "$(rbenv init -)"' >> ~/.bashrc

# update current console window with new settings
source ~/.bashrc

# source .bashrc from .bash_profile (necessary on some machines)
echo 'source ~/.bashrc' >> ~/.bash_profile

# install Ruby version 2.5.1
rbenv install 2.5.1

# set version 2.5.1 to be our global default
rbenv global 2.5.1

# the 'rehash' command updates the environment to your configuration
rbenv rehash

# and let's verify everything is correct
# check the version
ruby -v # => 2.5.1

# check that we are using rbenv (this tells you where the version of ruby you 
# are using is installed)
which ruby # => /Users/your-username/.rbenv/shims/ruby
```

### Gems
There are a few gems we will want to access globally.

- Bundler allows us to define project dependencies inside a `Gemfile` and gives
  us a bunch of commands to update, remove and install them. Check out the
  [Bundler docs][bundler-docs] for more info.
- Pry is an alternative to the Irb (the default Ruby REPL). It is not only more
  powerful, but also easier to use than Irb and should be your go-to for running
  and debugging Ruby code. Check out the [Pry website][pry-repl] for more info
  and a super useful tutorial.
- Byebug is feature-rich debugging tool for Ruby. With Byebug you can halt the
  execution of your code and inspect/track variables and the flow of execution.
  Lots of cool features in here, so check out the [Byebug docs][byebug-docs]!

Let's install them.

```sh
gem install bundler pry byebug
```

## Phase 2: Backend Development
For backend development we will need a database application, a server, and a
web-application framework.

For the purposes of this course, we will be using two database applications:
PostgreSQL and SQLite.

### PostgreSQL
PostgreSQL is a fast, feature-rich, open-source database application. It is a
scalable application that we can use for development and production apps. We
will be using PostgreSQL for most of our web-apps.

#### MacOS X

Fortunately for MacOS X, we can use [Postgres.app][postgres-app], which provides
the database application and a command line interface (CLI) so we can interact
with it. To install Postgres.app, download and follow the installation
instructions from the website.

**Though the instructions say it is optional, it is highly recommended to
configure your system `$PATH` so that you can use the command line tools.** We
will make extensive use of them in the course.

Paste these commands into the terminal:

```sh
sudo mkdir -p /etc/paths.d &&
echo /Applications/Postgres.app/Contents/Versions/latest/bin | sudo tee /etc/paths.d/postgresapp
```

#### Linux

The [Ubuntu wiki][pg-linux] can help. See especially "Alternative Server Setup".

### After installation

Close and reopen your terminal to gain access to the `psql` command. Let's try
it out.

```
# open the PostgreSQL CLI
psql

# you should be greeted with a prompt that looks like this
psql (10.X)
Type "help" for help.

yourname=#

# type '/q' to quit
yourname=# \q

```

**NB: You do not need a graphical client for this course. We encourage you to
use the CLI as it teaches you the hard way and is the most common way to
interact with a database directly.**

### SQLite
[SQLite][sqlite] is a small, lightweight database application that requires no
configuration and stores the database as a stand-alone file. For this reason, we
will be using SQLite for a few of our in-class projects.

Install using the Brew package manager:
```sh
brew install sqlite
```

Again, verify that installation was successful by opening the SQLite CLI.

```sh
# open SQLite CLI with this command
sqlite3

#  you should see this output
# SQLite version 3.16.0 2016-11-04 19:09:39
# Enter ".help" for usage hints.
# Connected to a transient in-memory database.
# Use ".open FILENAME" to reopen on a persistent database.

# .q to quit
sqlite> .q
```

### Rails
[Ruby on Rails][rails] will serve as our application framework for this course.
Rails is a very full-featured, opinionated framework that provides all the tools
we need to create a complete web-app. These include an ORM (Object Relational
Mapper - essentially we can continue to use Object Oriented Programming with
respect to resources in our database), routing, a development server, and a
templating engine.

Fortunately for us, Rails is available as a gem in the Ruby ecosystem. Let's
install it, specifying the version so that we're all working in sync:

```sh
# install rails
gem install rails --version 5.2.3
rbenv rehash
# verify installation
which rails # => /Users/username/.rbenv/shims/rails
```

## Phase 3: Frontend Development

### Node.js & NPM
[Node.js][node] will be our local JavaScript engine. This is used to run
JavaScript code and run associated node commands.

Again, we want to use a version manager with Node to help us manage potential
conflicts between versions and dependencies. In this case we will be using
[NVM][nvm] (Node Version Manager) to install/manage Node.js.

```sh
# download and run the official install script
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash

# update your terminal config (you will now have access to the nvm command)
source ~/.bashrc

# install the latest stable version of node
nvm install 14

# set version 14 as default version
nvm use 14

# verify install/config
which node # => /Users/username/.nvm/versions/node/v14.17.1/bin/node
```

Node, like Ruby, comes with a package manager called [NPM][npm], which provides
access to a whole ecosystem of libraries and tools we can use. NPM comes
pre-bundled with Node, so there is no additional work for us to do. By default
we don't need any additional packages installed and will be installing them on a
per-project basis.

[stack-defn]: https://en.wikipedia.org/wiki/Solution_stack
[xcode]: https://itunes.apple.com/us/app/xcode/id497799835 
[homebrew]: https://brew.sh/ 
[chrome-dl]: https://www.google.com/chrome/browser/desktop/index.html 
[aa-chrome-tab]: https://github.com/appacademy/app-academy-chrome-tab 
[linux-git]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git 
[linux-rbenv]: https://github.com/rbenv/rbenv#basic-github-checkout
[vsc]: https://code.visualstudio.com/
[rbenv]: https://github.com/rbenv/rbenv 
[bundler-docs]: http://bundler.io/docs.html 
[pry-repl]: http://pryrepl.org/ 
[byebug-docs]: https://github.com/deivid-rodriguez/byebug
[postgres-app]: https://postgresapp.com/ 
[pg-linux]: https://help.ubuntu.com/community/PostgreSQL
[sqlite]: https://www.sqlite.org/about.html 
[rails]: http://rubyonrails.org/
[node]: https://nodejs.org/en/ 
[nvm]: https://github.com/creationix/nvm 
[npm]: https://docs.npmjs.com/ 
[vscode-scripts]: https://assets.aaonline.io/fullstack/setup_vscode_master.zip
