# PostgreSQL Setup

## Installing Postgres

You should have already installed Postgres while setting up your machine. Run
`which psql` in your terminal to confirm. If nothing prints out, revisit the
installation instructions in the "Setting Up Your Computer Environment" reading
of the "Software Engineering Foundations" module. (Look under
"Introduction->Computer Setup".)

## Creating the DB

Make sure Postgres is running.

- **Mac**: You should see an elephant icon in your menu bar; if you don't, start
  Postgres.app. (It's in Applications.) Click the icon. If you see a green
  checkmark in the dropdown menu, you're good; if not, click the `Start` button.
- **Windows (WSL) / Ubuntu**: Run `sudo service postgresql start` in your
  terminal.

First, we need to create the database. Postgres can support multiple
applications, each of which might be storing different kinds of data in their
own **database**. Applications shouldn't have access to each other's databases,
even though they are all managed by a single **database server**. (Postgres is
the database server.)

Let's create a blank database named `bank`:

```sh
~$ psql
psql (9.2.2)
Type "help" for help.

ruggeri=# CREATE DATABASE bank;
CREATE DATABASE
ruggeri=# \q
```

To connect to your bank DB, run the `psql` program and give it the name of the
DB you want to connect to:

```sh
~$ psql bank
psql (9.2.2)
Type "help" for help.

bank=# \d
No relations found.
```

## Importing the data

There's no data imported yet, so your db is a lonely place. (`\d` is a special
Postgres command to list the tables.) Let's run the import script, which will
set up the tables and add the initial records. Download the
[LearningSQLExample.sql][learning-sql-example] script (or the [legacy
version][learning-sql-example-legacy] for the 1st Edition); it's been modified
to work with Postgres.

The `learning_sql_example_postgres.sql` file contains SQL commands. To run them,
you need to "pipe them in" to `psql bank`. This is what the shell's `|`
operation does: `cat learning_sql_example_postgres.sql | psql bank` takes the
*output* of the first command (`cat learning_sql_example_postgres.sql`, which
just outputs the contents of the file) and uses it as the *input* of the command
on the right (`psql bank`, which runs SQL commands).

There will probably be some notices about creating implicit sequences and
indexes; you may ignore these.

[learning-sql-example]: https://assets.aaonline.io/fullstack/sql/demos/learning_sql_example_postgres.sql
[learning-sql-example-legacy]: https://assets.aaonline.io/fullstack/sql/demos/learning_sql_example_postgres_1st_ed.sql

## Making your first query

Let's check on the data:

```sh
~$ psql bank
psql (9.2.2)
Type "help" for help.

bank=# \d
                  List of relations
 Schema |          Name          |   Type   |  Owner
--------+------------------------+----------+---------
 public | account                | table    | ruggeri
 public | account_account_id_seq | sequence | ruggeri
 public | branch                 | table    | ruggeri
 public | branch_branch_id_seq   | sequence | ruggeri
 public | business               | table    | ruggeri
 public | customer               | table    | ruggeri
 public | customer_cust_id_seq   | sequence | ruggeri
 public | department             | table    | ruggeri
 public | department_dept_id_seq | sequence | ruggeri
 public | employee               | table    | ruggeri
 public | employee_emp_id_seq    | sequence | ruggeri
 public | individual             | table    | ruggeri
 public | officer                | table    | ruggeri
 public | officer_officer_id_seq | sequence | ruggeri
 public | product                | table    | ruggeri
 public | product_type           | table    | ruggeri
 public | transaction            | table    | ruggeri
 public | transaction_txn_id_seq | sequence | ruggeri
(18 rows)

bank=# SELECT * FROM customer LIMIT 2;
 cust_id |   fed_id    | cust_type_cd |       address       |   city    | state | postal_code
---------+-------------+--------------+---------------------+-----------+-------+-------------
       1 | 111-11-1111 | I            | 47 Mockingbird Ln   | Lynnfield | MA    | 01940
       2 | 222-22-2222 | I            | 372 Clearwater Blvd | Woburn    | MA    | 01801
(2 rows)
```

Yay! You're good to go!

## Potential Pitfalls

### `DYLD_LIBRARY_PATH`

**First, check with a TA or instructor**.

In order to access Postgres from your Rails application, you may need to add
this line:

  `export DYLD_LIBRARY_PATH="/Applications/Postgres.app/Contents/MacOS/lib:$DYLD_LIBRARY_PATH"`

Please do not add it unless (a) you have problems connecting from a Rails app,
(b) you made sure that running `psql` in the command line **did work**
(otherwise something else is the problem), and (c) your TA gives you the okay.

This is usually a result of installing an old version of Postgres.app; more
recent versions shouldn't suffer this problem. You should first try reinstalling
Postgres.app.

### Shared Memory Problem

**First, check with a TA or instructor**.

There is another problem where Postgres may fail to launch properly; you won't
be able to connect with `psql` (much less from Rails). To diagnose the error,
invoke Postgres manually:

```sh
$ postgres -D ~/Library/Application\ Support/Postgres/var/ -p5432
7/7/12 8:24:23.017 PM com.heroku.postgres-service: server starting
7/7/12 8:24:23.018 PM Postgres: 75469 /Applications/Postgres.app/Contents/MacOS/bin/pg_ctl: Status 0
7/7/12 8:24:23.117 PM com.heroku.postgres-service: FATAL:  could not create shared memory segment: Invalid argument
7/7/12 8:24:23.117 PM com.heroku.postgres-service: DETAIL:  Failed system call was shmget(key=5432001, size=14499840, 03600).
7/7/12 8:24:23.117 PM com.heroku.postgres-service: HINT:  This error usually means that PostgreSQL's request for a shared memory segment exceeded your kernel's SHMMAX parameter.  You can either reduce the request size or reconfigure the kernel with larger SHMMAX.  To reduce the request size (currently 14499840 bytes), reduce PostgreSQL's shared memory usage, perhaps by reducing shared_buffers or max_connections.
7/7/12 8:24:23.117 PM com.heroku.postgres-service: 	If the request size is already small, it's possible that it is less than your kernel's SHMMIN parameter, in which case raising the request size or reconfiguring SHMMIN is called for.
7/7/12 8:24:23.117 PM com.heroku.postgres-service: 	The PostgreSQL documentation contains more information about shared memory configuration.
```

If you have the SHM error messages, first see if this solution fixes things:

```sh
sudo sysctl -w kern.sysv.shmall=65536
sudo sysctl -w kern.sysv.shmmax=16777216
```

This is only a temporary fix; these settings will be lost when you restart. For
this reason, you want to edit the __/etc/sysctl.conf__ system file. Add these
lines:

```sh
kern.sysv.shmall=65536
kern.sysv.shmmax=16777216
```

Now Postgres should work in the future.
