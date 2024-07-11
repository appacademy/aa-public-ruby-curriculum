# Initializing A Rails Project With PostgreSQL

This unit begins your foray into Active Record, a component of Rails that
provides a way for your Ruby code to interact with a SQL database. Active Record
is a key component of Rails; after you master it, you will probably find the
rest of Rails pretty straightforward.

Here are the steps for starting a new Rails project.

1. Make sure that Rails is installed.

  ```sh
  gem install rails
  ```

  (You can skip this step if you are sure that you have previously installed
  Rails.)

2. Generate a new Rails **project**.

   ```sh
   rails new demo_project -G -T -d=postgresql --minimal
   ```

   This will create a folder, __demo_project__, with a bunch of Rails
   directories in it.

   By default, Rails will also initialize your new project as a git repository.
   Adding the `-G` flag will instruct Rails to create a project **without**
   making a new repository. This will be useful since you'll frequently be
   creating Rails projects inside of the repository for the day's projects, and
   you want to avoid nesting git repositories inside of other git repositories.
   If you're making a repository for a single project, however, you can leave
   this flag off and Rails will automatically set one up for you.

   The `-T` flag tells Rails to skip setting up its internal `Test::Unit` files.
   If you do not include this flag, Rails will configure your app to follow its
   testing protocols. This includes adding an additional __test__ folder (with 8
   sub-folders) that it will then populate with skeleton tests whenever you
   generate a model, controller, etc. Since you won't be using these tests,
   including the `-T` flag will help keep your codebase clean and eliminate some
   developmental overhead.

   The `-d` flag (or `--database`) allows you to specify the database for your
   project. It will add the correct gem and set up sensible defaults in
   __config/database.yml__ for the specified database. Rails defaults to
   `sqlite3`, but you will usually want to use `postgresql` in this course.
   Accordingly, unless a practice's instructions explicitly tell you to do
   otherwise, always add this flag to switch the database to PostgreSQL.

   Finally, `--minimal` instructs Rails to build a minimalist application. As a
   result, it will not install Action Cable, Action Mailbox, Action Mailer,
   Action Text, Active Job, Active Storage, Bootsnap, Web Console, JavaScript,
   Jbuilder, System Tests, or Hotwire (i.e., Turbo and Stimulus). Those names
   probably don't mean much to you now. Rails includes them all by default to
   help make your programming life easier, but they are not features that your
   applications will need right now. While in App Academy, default to using
   `--minimal` unless the instructions tell you otherwise. (If you omit the
   `--minimal` flag, everything will still work, you will just have **many**
   more files and directories to sort through.)

3. Add helpful gems to your __Gemfile__ (located in your new __demo_project__
   folder).

   Rails sets you up with a bunch of gems by default, but there are a
   few other gems that will make your life **much** easier. You should get in
   the habit of adding the following:

   - For now, change the default `debug` gem listed under `group :development,
     :test` to trusty `byebug` instead:

     ```ruby
     group :development, :test do
       gem "byebug", platforms: %i[ mri mingw x64_mingw ]
     end
     ```

     (Always make sure that __.byebug_history__ is included in your
     __.gitignore__ file whenever you use `byebug`. Since Rails defaults to
     `debug`, it does not include __.byebug_history__ in the default
     __.gitignore__ that it produces.)

   - Next, add the following gems under `group :development`:

     ```ruby
     group :development do
       # Run `bundle exec annotate --models` in Terminal to add helpful comments
       # to models.
       gem "annotate"
       
       # Enable `rails console` to open with pry (pry > irb)
       gem "pry-rails"
     end
     ```

   (When you move to the Rails module, you will want to add two more gems to the
   `development` group: `better_errors` and `binding_of_caller`.)

   When you have made those changes, make sure you are in the __demo_project__
   directory and run `bundle install`. This will look for a __Gemfile__ and then
   install the gems listed in it. **Remember to run `bundle install` whenever
   you make changes to your Gemfile.**

## PostgreSQL

As noted above, you can initialize a new Rails app with a PostgreSQL database by
using the `--database=postgresql` option. You can also **switch** an existing
Rails app from SQLite to Postgres. This is convenient because differences
between your development and production databases can be frustrating.

- If you have already created your SQLite database by running `db:create`, then
  delete the __.sqlite3__ files in __db/__.

- Replace the `gem 'sqlite3'` line in the __Gemfile__ with `gem 'pg'`. Don't
  forget to `bundle install` after.

- Edit __config/database.yml__ to use PostgreSQL.
  - Change the `default` environment:
  
    ```yaml
    default: &default
      adapter: postgresql
      pool: 5
      timeout: 5000
    ```

  - Create a database with the given project name. Name your development, test,
    and production databases as shown below, substituting appropriately for
    `<project_name>`:
  
    ```yaml
    development:
      <<: *default
      database: <project_name>_development
    ```

    For production, also add the `username` and `password`:

    ```yaml
    production:
      <<: *default
      database: <project_name>_production
      username: <project_name>
      password: <%= ENV["<PROJECT_NAME>_DATABASE_PASSWORD"] %>
    ```

- Create your new Postgres database
  - Run `rails db:create`
  - If you have migrations, run `rails db:migrate`
  - If you have seeds, run `rails db:seed`
