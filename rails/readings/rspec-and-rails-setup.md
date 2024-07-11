# Setting Up RSpec With Ruby On Rails

RSpec is a tool for testing Ruby applications that is often used to test Rails
apps. Setup includes the following steps:

- Add the Rails-specific RSpec gem to your Gemfile; install with Bundler
- Set up a test database, if necessary
- Configure RSpec

## Adding the RSpec gem

Add the following to the Gemfile of your Ruby on Rails application:

```ruby
# my_app/Gemfile

group :development, :test do
  gem 'rspec-rails'
end
```

(Including `rspec-rails` under `:development` as well as `:test` enables
generators and rake tasks to run from your development environment without
further specification.)

Run `bundle install` from the command line to install the gem.

## The test database

Open up __config/database.yml__. assuming you set the database to PostgreSQL, it
should look something like this:

```rb
# my_app/config/database.yml

# PostgreSQL. Versions 9.3 and up are supported.
# ...
# Configure Using Gemfile
# gem "pg"
#
default: &default
  adapter: postgresql
  encoding: unicode
  # For details on connection pooling, see Rails configuration guide
  # https://guides.rubyonrails.org/configuring.html#database-pooling
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>

development:
  <<: *default
  database: goal_app_long_practice_development

  # ...
# Warning: The database defined as "test" will be erased and
# re-generated from your development database when you run "rake".
# Do not set this db to the same as development or production.
test:
  <<: *default
  database: goal_app_long_practice_test

# ...
# Read https://guides.rubyonrails.org/configuring.html#configuring-a-database
# for a full overview on how database connection configuration can be specified.
#
production:
  <<: *default
  database: goal_app_long_practice_production
  username: goal_app_long_practice
  password: <%= ENV["GOAL_APP_LONG_PRACTICE_DATABASE_PASSWORD"] %>
```

Notice there are three sets of configuration data: one for `development`, one
for `test`, and one for `production`. When you run a server on localhost, Rails
uses the `development` database. For running tests, it will use a separate
`test` database. The default configuration will work just fine for testing with
RSpec.

Run `rails db:create` on the command line to create your development and test
databases.

## Configure RSpec

Next, install RSpec by running the following from the command line:

```sh
rails g rspec:install
```

A successful install will output the following message:

```sh
create  .rspec
create  spec
create  spec/spec_helper.rb
create  spec/rails_helper.rb
```

Once those files have been created, tweak the default RSpec configuration so
that it will format its output in a readable way. To do this, make your
__.rspec__ configuration file look like this:

```text
--require spec_helper
--color
--format documentation
```

If you are interested in customizing RSpec further, check out the documentation
[here][rspec-doc] (see the sidebar items under `Command Line` on the left).

That's it! Appropriate spec files will now be automatically generated in the
__spec__ directory when you run `rails g model ...` or `rails g controller ...`.

## Preview of coming attractions

Haven't had enough fun with setting things up yet? Not to worry. You might want
to check out the Guard and Spring setup reading to set up these gems and make
your TDD flow a lot smoother. The FactoryBot, Faker, and Shoulda Matchers gems
are also commonly used with RSpec in Rails; subsequent readings will show you
how to set up and use these gems as well.

## Resources

- [RSpec homepage][rspec-home]
- [RSpec documentation][rspec-doc]  
  (In what is a rather unintuitive UI, you **click the version number in the
  dropdown menu** under `RDoc` to go the documentation for the specified
  gem/version and the version number under `Examples (Relish / Gherkin)` to see
  examples.)
- [`rspec-rails` overview][rspec-rails]
- [`rspec-rails` documentation][rspec-rails-doc]

[rspec-doc]: https://rspec.info/features/3-12/rspec-core/command-line/
[rspec-home]: https://rspec.info/
[rspec-rails]: https://rspec.info/features/6-0/rspec-rails/
[rspec-rails-doc]: https://rspec.info/documentation/6.0/rspec-rails/
