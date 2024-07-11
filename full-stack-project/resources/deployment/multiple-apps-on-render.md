# Hosting Multiple Apps Using One Database

One limitation of Render.com's free tier is that you can have only one free
PostgreSQL database active at any time. Accordingly, if you need to host more
than one Postgres-based app, they will need to share a single database.
Fortunately, this is not too difficult to set up.

This reading will show you how to configure a Rails app to operate on a shared
database. (For the more general steps needed to deploy an app to Render--which
this reading assumes and does not cover--see the "Deploying to Render" reading
in the left-hand sidebar.)

## The basic strategy: Namespacing through different schemas

Having multiple apps use the same database can create issues at a couple of
different points. First--and most obviously--you can run into trouble if two or
more apps each want to create and use tables with the same name, say, `users`.
Also, because Rails determines which migrations to run based on a timestamped
table of the migrations that have already run, using a single table to record
the migrations from every app can create awkward situations where some
migrations for one app might not run because of timestamps on a migration from
another app.

The solution to issues like these essentially is to namespace the tables for
each app. So, e.g., instead of having your Auth Me and your BenchBnB apps both
trying to access the same `users` table, the former would use `auth_me.users`
and the latter, `benchbnb.users`. So simple!

The question then becomes how to achieve this effect. You could go through and
modify all of your migrations for every app to create tables with an expanded
name. That would quickly become a major pain, however, especially for apps with
more than a couple tables. Instead, you will use schemas to namespace entire
apps.

## Implementing schemas in Rails

Here's how to namespace your Rails app using schemas.

### Create a global `SCHEMA` variable

Your strategy will be to set up a global variable `SCHEMA` that you will use to
name your schema. Using a global variable will enable you to create
staging/testing versions of your app simply by changing the schema name.

To create this global variable in development, open
__config/environments/development.rb__ and simply add the following line after
the `require` statement:

```rb
ENV['SCHEMA'] = "your_app_name"
```

Of course, you should replace `your_app_name` with the actual **snake_case**
name of your app (or whatever else you want to name your schema). Note that this
name is not something you need to keep secret, so there is no problem with
including it in a file that you will push to GitHub.

If you have a __render.yaml__ file, add a `SCHEMA` entry under `envVars` and set
it to `value: your_app_name` like so:

```yml
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: your_db_name
          property: connectionString
      - key: RAILS_MASTER_KEY
        sync: false
      - key: SCHEMA
        value: your_app_name
```

(It is okay to hardcode the value in your __yaml__ file since you can only
create one instance of the app from a Blueprint. You can still create a separate
staging/testing version, you will just need to configure it manually using the
GUI on Render.)

If you are not generating your app from a Blueprint, make sure to add a `SCHEMA`
environment variable with appropriate value when configuring your app. (To add
an environment variable to an already-configured app, go the `Environment` tab
in your app's left-hand menu and click `Add Environment Variable`.)

### Create the schema

First, generate a migration to create your schema:

```rb
rails g migration CreateSchema
```

As you know by now, this will create a file in __db/migrate__ of the form
__<timestamp>_create_schema.rb__. You want Render to run this migration first,
so adjust the timestamp portion of the filename--in VS Code, right-click and
select `Rename...`--so that it appears as the earliest migration. (It should
move to the top of the __db/migrate__ folder list in VS Code.)

Next, replace the generated code inside the migration file with this code, which
includes the `SCHEMA` environment variable:

```rb
class CreateSchema < ActiveRecord::Migration[7.0]
  def change
    ApplicationRecord.connection.create_schema(ENV["SCHEMA"])
    ActiveRecord::Base.table_name_prefix = "#{ENV["SCHEMA"]}."
    ActiveRecord::SchemaMigration.create_table
    ActiveRecord::InternalMetadata.create_table
  end
end
```

The first line inside `change` creates the schema with the name of your app. The
second sets the `table_name_prefix` so that the schema name (and a period) will
be added to basic table names. The last two lines then create the two tables
that Rails uses to track migrations (`schema_migrations`) and protect against
inadvertently overwriting production data (`ar_internal_metadata`). Because you
previously set the `table_name_prefix`, these will now be created as
`your_app_name.schema_migrations` and `your_app_name.ar_internal_metadata`),
respectively. By namespacing these two tables within your schema, you keep each
app and its migration records separate.

The final step is to configure your app so that when it searches for database
tables, it first looks for matches inside your new schema. To do this, open
__config/database.yml__ and add `schema_search_path: <%= "#{ENV['SCHEMA']},public" %>` to
the bottom of the `default` key. (Don't add a space after the comma!) The
`default` listing should now look like this:

```yml
default: &default
  adapter: postgresql
  encoding: unicode
  # For details on connection pooling, see Rails configuration guide
  # https://guides.rubyonrails.org/configuring.html#database-pooling
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  schema_search_path: <%= "#{ENV['SCHEMA']},public" %>
```

> Including the search path as part of `default` will ensure that it is included
> in `test`, `development`, and `production` environments. If you for some
> reason want to limit its applicability, remove the line from `default` and
> include it instead under the particular environment(s) in which you want it to
> be active.

Now when your app requests something from, e.g., table `users`, the database
will first look for a `users` table inside the `SCHEMA` schema. If it
doesn't find one there, then it will check inside the `public` schema.

That's it! Now your app will carve out its own database space, insulated from
all the other apps that might be using the db. Don't forget to **commit and push
your changes.**

## Troubleshooting

The lack of a Command-Line Interface (CLI) in Render can make it a challenge to
troubleshoot and debug your database setup. Nevertheless, you do have some
debugging options.

First, check your app's deployment log to 1) make sure that your migrations
actually ran and 2) see if any errors appear. If your migrations did not
run--i.e., they do not appear in the log--it might be because they have already
run. (Remember that Rails will not re-run migrations just because they change;
migrations have to be rolled back before they will run again.) In that case, you
are probably better off just deleting the whole schema--see below for how to do
this--and (manually) deploying again.

You can also examine the contents of your PostgreSQL database as long as you
have [PostgreSQL] installed locally on your computer. To access your Render
PostgreSQL database, copy the `PSQL Command` value from the database's
information page on Render. The value should start with `PGPASSWORD=` and should
include information about your database.

Paste this value into your terminal. This will open Postgres with a connection
to your remote database. At this point, you can use Postgres commands locally to
examine the contents of your database. You might find the following commands
helpful:

- `\dn` - list all of the schemas in the database
  - Does your database show the correct schema for your project? If you did not
    set up a custom schema for your project, the tables should be within the
    default `public` schema.

- `\dt <schema_name>.*` - list all tables within the `<schema_name>` schema
  - Do you see all of your tables within your app's schema? You should see all
    of the tables as well as the `schema_migrations` and `ar_internal_metadata`
    tables. (Running `\dt` by itself will list all the tables in the `public`
    schema.)

- `SELECT * FROM <schema_name>.<table_name>;` - list all entries in a specific
  table
  - Do your tables show the appropriate data?

If there are any problems with the way the database or schema is set up, or if
you just want to run all of your migrations again, you can drop the schema for
your application--and all tables within it--using the following command:

```sql
DROP SCHEMA <schema_name> CASCADE;
```

**Note:** It can sometimes be easier to track down issues on your local database
where you have command line access to do things like rollback migrations. To
inspect your local development database and make sure that your setup configures
it correctly, run `rails dbconsole`. All of the above commands will also work in
this local console.

## What you've learned

In this reading, you have learned how to configure a Rails app to use a shared
database by namespacing its tables with a schema.
