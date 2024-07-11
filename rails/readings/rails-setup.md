# Rails Setup

By this point, you should already have Rails 7 installed on your computer. You
can confirm this by running `rails -v`, which will show you the version of Rails
that you are currently using. To see a list of all the Rails versions you have
installed, run `gem list ^rails$`.

> Note: to install a particular version of Rails, just specify the desired
> version number after the install command. For example, to install Rails 7.0.3,
> run `gem install rails -v 7.0.3`.

As you already know, you start a new Rails project with the `rails new` command:

```sh
rails new my_project_name -G -T --minimal -d=postgresql
```

> Note: if you want to create a Rails project with a different **installed**
> version, specify the version immediately after the `rails` command like this:

```sh
rails _7.0.2.2_ new my_project_name -G -T --minimal -d=postgresql
```

> You do not need to continue specifying the version number after this initial
> command: subsequent calls to `rails` in this project directory will
> automatically use the bundled version (here, `7.0.2.2`).

By way of reminder, the recommended flags to use when creating a new Rails
app--at least for now--are as follows:

* `-G`  
  Prevents Rails from initializing your new project as a git repository (helpful
  for avoiding nested git repos). If you do want to automatically set up a
  repository for your project, just omit this flag.

* `-T`  
  Prevents Rails from installing `Test::Unit` files. Testing is good, of course,
  but in this course you will use RSpec for unit tests, so these Rails files
  will not be needed. (More on setting up RSpec tests to come!)

* `--minimal`  
  Instructs Rails to set up a barebones application. As a result, it will not
  install Action Cable, Action Mailbox, Action Mailer, Action Text, Active Job,
  Active Storage, Bootsnap, Web Console, JavaScript, Jbuilder, System Tests, or
  Hotwire (i.e., Turbo and Stimulus).

* `-d=postgresql`  
  Sets the database to PostgreSQL.

To see a list and brief explanation of all possible flags, run `rails new` with
no other arguments.

When using PostgreSQL, you should also run the command `rails db:create` in the
terminal before trying to run migrations. This creates the database for your
application. (You only need to run this once per project.)

## Add Common Debugging Gems

In previous projects, you learned to change `debug` to `byebug` and add
`annotate` and `pry-rails` to your **Gemfile**. (Remember to add
__.byebug_history__ to your __.gitignore__ file if you opt to use `byebug`.) Now
you also want to start adding `better_errors` and `binding_of_caller`. These two
gems work together to provide you with a nice error page that includes a REPL
and the ability to inspect variable values at the time of a crash. Add them to
the `development` group:

```ruby
# Gemfile

group :development do
  gem "annotate"
  gem "pry-rails"
  gem "better_errors"
  gem "binding_of_caller"
end
```

Don't forget to `bundle install`!

**N.B.:** Always place these gems in the `development` group. Rails supports
three environments by default: `development`, `test`, and `production`.
`development` runs locally (`localhost:3000`). `test` typically runs when
executing RSpec (or other) tests. `production` runs on sites where you have
deployed your app (e.g., Heroku) and which are available remotely.

**You never want gems like `better_errors` or `binding_of_caller` running in
production.** In addition to loading unnecessary code, these gems will
constitute a huge security hole if their features are exposed to the Internet.
You also don't want them running in test, as they could affect the outcome of
the tests. So whenever you install a new gem, think carefully about the
environment(s) to which you add it.
