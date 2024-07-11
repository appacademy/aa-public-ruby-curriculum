# Plays-Playwrights ORM

In tonight's videos, we saw how to implement an ORM for the `plays` database.
Your homework is to expand this ORM!  

## Setup

Let's start with the code from the video lectures. Download the skeleton
[here][skeleton].

Next, let's create our database. In SQLite, our databases are just files that
store all our data. They are updated by executing SQL commands
(creating/updating tables and rows). Our `import_db.sql` has all the code to
create our tables and some seed data. We can create our database with the
following command:

```sh
cat import_db.sql | sqlite3 plays.db
```

This will apply all the SQL commands in `import_db.sql` to `plays.db` from the
`sqlite3` console. You should now see a `plays.db` file in your project
directory. Let's get started.

## Enhancing Functionality

Let's add the following methods to our ORM:

  * `Play::find_by_title(title)`
  * `Play::find_by_playwright(name)` (returns all plays written by playwright)

In addition, create a Playwright class and add the following methods to our ORM.

  * `Playwright::all`
  * `Playwright::find_by_name(name)`
  * `Playwright#new` (this is the initialize method)
  * `Playwright#create`
  * `Playwright#update`
  * `Playwright#get_plays` (returns all plays written by playwright)

Remember, our `PlayDBConnection` class accesses the database stored in
`plays.db`, which includes both the `plays` and `playwrights` tables.

## Testing your ORM

* Open up pry and load the plays.rb file
* Initialize an instance of the Playwright class by calling `Playwright#new` and
  passing it the necessary arguments.
  * Call `Playwright#create` on the instance that you just initialized. Then
    call `Playwright::all` to see that it was added to the database correctly.
* Similarly, test `Playwright#update` and `Playwright#get_plays` by calling them
  on instances of the Playwright class.

For a more detailed look at how to test your ORM, refer to the [ORM
Demo][orm-demo-video] (jump to 18m25s).
  

[skeleton]: https://assets.aaonline.io/fullstack/sql/homeworks/plays/skeleton.zip?raw=true
[orm-demo-video]: https://vimeo.com/167672029#t=18m24s
