# SQLite3

## What is SQLite3?

SQL is a language, but there are many different *implementations* of SQL. An
implementation of SQL is the software that actually processess your SQL
commands. A synonymous term is RDBMS (**relational database management
system**): this is the software that stores the data and later figures out how
to fetch it back when queried.

Each implementation is different. They all speak SQL, so there is a mostly
common interface to all the systems, although each system has its own quirks
with regard to SQL syntax. The various implementations, however, can also differ
significantly under the hood. Each has its own specialties and pitfalls.

Postgres (open source), Oracle, MySQL (open source but now owned by Oracle), and
SQLServer (Microsoft) are some RDBMS implementations.

[SQLite3][sqlite-homepage] is another SQL implementation; it is a very simple,
public-domain implementation. Whereas most database *servers* require a lot of
setup and configuration, SQLite3 is *serverless*. There is no separate server
process that waits to receive queries from your application. Instead, sqlite3 is
a library loaded by your program, which then directly interacts with the
underlying database data. This makes it easy to configure sqlite3--there is no
configuration!--and to start using it quickly.

Because there is no central SQLite3 server, it does not handle multiple
simultaneous query requests very well. For that reason, SQLite3 is seldom used
as a database for a production web application. It also does not have a very
sophisticated *query planner* to figure out how to execute your query in the
best way. This can result in poor performance when working with larger sets of
data. However, the simplicity of setting up SQLite3 makes it very common as a
*development database* used while developers are building an app or as an
*embedded* database distributed as part of another program.

SQLite3 is the most widely deployed database. Every copy of Firefox embeds a
SQLite3 database (your user preferences are stored in it). It is also behind
every iOS app.

## A Superquick Demo

First we write a SQL source file to generate our data. Check it out
[here][first-sql-demo]. **Read this demo and the comments!**

Then we can use SQLite3 to run the sql source, generating the tables.

    ~/sql-demo$ cat create_tables.sql | sqlite3 school.db


This tells sqlite3 to read/store data in `school.db`; since this doesn't
exist yet, sqlite3 will create it. The `|` (pipe) connects the output of the
command on the left (`cat create_tables.sql`) to the input of the command on
the right (`sqlite3 school.db`). We say that `create_tables.sql` is "piped
into" the sqlite3 interpreter.

It is common to write such SQL scripts for either (a) scripts that configure
the setup of the database, like creating the tables or (b) "offline" scripts
that do not modify the database but run a series of queries to generate a
report. For interactive SQL use--i.e., making queries and updates in response to
user interaction--we either use the SQLite3 client, or, if the changes
should be made by a program and not a person, the sqlite3 Ruby gem.

Let's interactively use the SQLite3 client to create some data. 

SQLite has two special "meta" commands, `.tables` and `.schema`, which list the
existing tables and their schemas, respectively. Here I insert a new department
into the table, and then select it back out:

```
~/sql-demo$ sqlite3 school.db
SQLite version 3.7.14.1 2012-10-04 19:37:12
Enter ".help" for instructions
Enter SQL statements terminated with a ";"
sqlite> .tables
departments  professors
sqlite> .schema departments
CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255)
);
sqlite> INSERT INTO departments ("name") VALUES ("russian literature");
sqlite> SELECT * FROM departments;
1|mathematics
2|physics
3|russian literature
```

Notice that I didn't set the `departments.id` field; because this is an `INTEGER
PRIMARY KEY`, SQLite3 will populate it [automatically for me][autoincrement].

I can also add a new professor:

```
sqlite> INSERT INTO professors ("department_id", "first_name", "last_name") 
VALUES (3, "Vladimir", "Nabokov");
```

You can even run SQL commands from the command line:

```
~/sql-demo$ sqlite3 school.db "SELECT * FROM departments"
1|mathematics
2|physics
3|russian literature
```

## The SQLite gem

To interact with SQLite3 from your Ruby programs, use the gem
[sqlite3-ruby][sqlite-ruby-github]. I've written a [demo][sqlite-ruby-demo] to
show you how to use the gem. It is a very simple, thin wrapper over SQL. You may
need to install the sqlite3 gem:

    gem install sqlite3

Later we'll learn about a more object-oriented interface to SQL called
ActiveRecord. For now, I want you to get experience working directly with SQL.

There's a good [FAQ][sqlite-faq] to check out.


## SQLite3 is not full featured

SQLite3 is not a full featured database. It is meant to be minimalist and
simple, but there are some features that would have been nice to include:

* Older versions don't enforce foreign key constraints; they will
  ignore them.
    * Newer versions (i.e., newer than is default on OS X) enforce foreign key
      constraints.
* Dropping columns is a pain; you need to rebuild the whole table.
    * [How to drop columns][sqlite-add-drop] (hint: it's ugly).
* SQLite3 is overly permissive; it lets you assign, for instance, strings to
  non-varchar columns (it will apply an "implicit conversion").

For reasons like these, pretty much everyone running a web app will use a more
complete database in production (Postgres and MySQL are common choices).

None of these should bother you very much if you are using SQLite3 as a
development database which doesn't hold any mission-critical production data.

## Note to Ubuntu/Linux Users

Some students have had issues with the version of sqlite3 available from running
`sudo apt-get install sqlite3`. If you experience issues, you may want to
download the sqlite3 binary from [sqlite.org][sqlite-download]. Be sure to click
the "sqlite-shell-linux" link under **Precompiled Binaries for Linux**. If you
already installed SQLite via apt-get, run `sudo apt-get remove sqlite3`.

You can extract the binary executable to your `~/bin` directory (which you can
create if it doesn't already exist). Oftentimes, this will be in your PATH
already. Test by restarting your terminal and running `which sqlite3`. It should
return something like `/home/your_username/bin/sqlite3`. If it doesn't, you may
need to add `~/bin` to your path in your `~/.bashrc`.

## Additional References

* [The SQLite3 guide][sqlite-guide]; a real quick intro.
* [SQLite FAQ][sqlite-faq]; a few helpful questions
* [The SQLite Language][sqlite-lang]; all the gory details (use this only as a
      reference, if necessary)

[sqlite-homepage]: http://www.sqlite.org/ 
[first-sql-demo]: https://assets.aaonline.io/fullstack/sql/demos/create_tables.sql
[autoincrement]: http://www.sqlite.org/faq.html#q1
[sqlite-ruby-github]: https://github.com/luislavena/sqlite3-ruby
[sqlite-ruby-demo]: https://assets.aaonline.io/fullstack/sql/demos/school.rb
[sqlite-download]: http://sqlite.org/download.html
[sqlite-add-drop]: http://www.sqlite.org/faq.html#q11
[sqlite-guide]: http://www.sqlite.org/sqlite.html
[sqlite-faq]: http://www.sqlite.org/faq.html
[sqlite-lang]: http://www.sqlite.org/lang.html