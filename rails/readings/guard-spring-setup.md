# Fast And Easy Testing With `spring` And `guard`

This reading shows you how to install and configure the `spring` and `guard`
gems to speed up your testing process.

## Gems

Make sure that your Gemfile includes these entries (and `bundle install`):

```rb
group :development do
  gem 'spring'
  gem 'spring-commands-rspec'
  gem 'guard-rspec'
end
```

* `spring` is a Rails application pre-loader. It speeds up development by
  keeping your application running in the background so you don't need to boot
  it every time you run a test, rake task, or migration. Loading your Rails
  application usually takes several seconds (that's distinct from the time to
  actually run the specs), which is pretty annoying when you might be running
  your test suite several times per minute.

* `spring-commands-rspec` allows you to leverage Spring's preloading when
  running your RSpec tests.

* `guard` is a gem that monitors for changes to files whose paths match regular
  expressions that you can set up. The `guard-rspec` plugin will install the
  main `guard` gem as a dependency and allow you to trigger the execution of
  RSpec tests in response to changes to your app's files.

## Guard setup

Run:

```sh
bundle exec guard init
```

This will create a __Guardfile__ for you. This is where you set up regexes to
match file paths that you want to monitor. Since you have `guard-rspec`
installed, the generated __Guardfile__ will include a bunch of comments and a
default Guard set up for running RSpec tests for a Rails app. That's fine, and
it might be a good starting point for a large app where you only want to run
certain specs when certain files are changed. But without proper tweaking, Guard
probably won't guess quite correctly which specs you want to run and when.

For simplicity's sake, you can start with a brute-force approach and simply run
all of the specs whenever any file changes in the __app__ or __spec__
directories (or __config/routes.rb__, for good measure). To do this, replace
everything in your __Guardfile__ with these five lines:

```rb
guard :rspec, cmd: 'spring rspec' do
  watch(%r{^app/}) { 'spec' }
  watch(%r{^spec/}) { 'spec' }
  watch('config/routes.rb') { 'spec' }
end
```

The ability to call `guard :rspec` here comes from the `guard-rspec` plugin gem
that you installed. Also, note that you are passing `cmd: 'spring rspec'`. This
will leverage `spring`'s application preloading to run your specs quickly.

As your test suite grows larger, you can change the catch-all `'spec'` command
to name a specific spec directory (such as `'spec/models'` or `'spec/features'`)
or a specific spec file (such as `'spec/features/auth_spec.rb'`) to only trigger
the execution of whichever specs you are focusing on at the moment.

## Spring Setup

First, go to __config/environments/test.rb__. Around lines 11-12, you should
see these lines:

```rb
# Turn false under Spring and add config.action_view.cache_template_loading = true.
config.cache_classes = true
```

Do what the comment says. Set `config.cache_classes` to `false` and then add the
following line beneath it:

```rb
config.action_view.cache_template_loading = true
```

Back on the command line, run

```sh
spring binstub --all
```

This will create and/or modify some files in your `bin` directory so that
certain commands (`rspec`, `rake`, and `rails`) can be run via the Spring
runner.

## Testing, testing, testing

You are ready to roll! Run

```sh
bundle exec guard
```

to fire up a Guard console. Now whenever you save a file, Guard should run all
of your specs for you! They will run as slowly as ever the first time around,
because Spring hasn't loaded your application's environment yet. But the second
time that you save a file and your specs run--and every time thereafter--they
should run noticeably more quickly. That's pretty convenient!

## Problems?

You might see a version error like this: `You have already activated spring
1.3.3, but your Gemfile requires spring 1.3.2`. This is easily fixed with
`bundle update spring`.

If you run into any problems that you suspect are `spring`-related, the command
`spring stop` (at the command line) will shut down the Spring server. In
particular, if you find that `rails g rspec:install` is hanging, try stopping
Spring and running `rails g rspec:install` again.

After stopping Spring, it will automatically boot back up again (with your
latest application environment) when you next run a test, rake task, or
migration.
