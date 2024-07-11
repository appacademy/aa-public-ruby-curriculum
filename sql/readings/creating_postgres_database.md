# Creating a SQL Database in PostgreSQL

In this guide, you will learn how to create a database in Postgresql. 

You will then write a SQL file and import it to your new database to add tables, and populate them with data.

If you have not installed PostgreSQL on your machine, please refer to our reading on [setting up PostgreSQL][postgres] before moving on with this demo.

[postgres]: postgresql-setup

## Creating a database in PostgreSQL

Before you can create your tables and populate them with data, you will first need to create your database.

In terminal:

```
~$ psql
<!-- Your Version Might be Newer Than Mine -->
psql (11.3)
Type "help" for help.

andy=# CREATE DATABASE my_first_db;
CREATE DATABASE
andy=# \q
```

- `psql` is the command to open PostgreSQL
- `CREATE DATABASE my_first_db;` creates a database, where `my_first_db` represents your database name
- `\q` exits PostgreSQL

Congratulations, you've created your first database!

Now that your DB is up and running, create a new SQL file and open it in VSCode:

```
~$ touch my_tables.sql
~$ code my_tables.sql
```

This file is what you will use to add tables to your newly created DB, and populate it with data.

When creating your tables, we recommend having the [SQL documentation][sql-docs] open for reference.

[sql-docs]: https://www.w3schools.com/sql/sql_create_table.asp


## CREATE TABLE

For the purposes of this reading, you will be creating 2 tables - countries, and animals. 

Countries will have columns for name and population. 

Each animal will also store a name, along with a `country_id` that refers to a country in our countries table. This is known as a foreign key.

Let's start by creating your country table:

```SQL
CREATE TABLE countries(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    population INTEGER NOT NULL
);
```

Columns are separated by commas when passed in, with a required datatype followed by any optional restraints.

Please note that the datatype for id `SERIAL PRIMARY KEY`. This is specific to PostgreSQL, and will automatically increment the id for each new row added to the table.

Next, create your animals table:

```SQL
CREATE TABLE animals(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country_id INTEGER NOT NULL,

    FOREIGN KEY (country_id) REFERENCES countries(id)
);
```

Whenever creating a table with a foreign key, you must specify which table's primary key is being referenced.

Adding a FOREIGN KEY constraint prevents actions that would destroy links between tables, and also stops invalid data from being inserted into the foreign key column e.g. you cannot not insert a `country_id` in `animals` that does not match an existing `id` in `countries`.


# INSERT INTO

Now that you have created your tables, insert some data into them.

First, insert a country:

```SQL
INSERT INTO
    countries
    (name, population)
VALUES
    ('United States', 327000000)
;
```

Next, add some entries to your `animals` table.

Below we are using a SQL query to find the id of an existing row in our `countries` table to populate the `country_id`:

```SQL
INSERT INTO
    animals
    (name, country_id)
VALUES
    ('Racoon',
    (SELECT id 
     FROM countries 
     WHERE name = 'United States')),
    ('Black Bear',
    (SELECT id 
     FROM countries 
     WHERE name = 'United States')),
    ('Bald Eagle',
    (SELECT id 
     FROM countries 
     WHERE name = 'United States'))
;
```

## DROP TABLE

Your file is almost ready for importing, however there is one final and important step.

In order to prevent duplicate data being inserted whenever you import this file, you must first drop your tables to destroy any data stored in them.

Order is important when dropping tables. The database constraints we have in place will prevent a single country from being deleted if any animal has a foreign key referencing that country. These same restraints will also prevent a table being dropped should it be referenced by any other table in our database.

For this reason, you must drop any tables with foreign key restraints first:

```SQL
DROP TABLE animals;
DROP TABLE countries;
```

Now, we are ready to import!

## Importing your file

`cat <your_sql_file> | psql <your_db_name>` is the syntax for importing a file into PostgreSQL using terminal:

```
~$ cat my_tables.sql | psql my_first_db
CREATE TABLE
CREATE TABLE
INSERT 0 1
INSERT 0 3
~$
```

If your import completes successfully, you should see similar messaging as above.

Upon completion, our last step is to step into our database using postgreSQL, and confirming the newly created tables and inserted data is there:

```
~$ psql my_first_db
psql (11.3)
Type "help" for help.

my_first_db=# SELECT * FROM countries;
 id |     name      | population 
----+---------------+------------
  1 | United States |  327000000
(1 row)

my_first_db=# SELECT * FROM animals;
 id |    name    | country_id 
----+------------+------------
  1 | Racoon     |          1
  2 | Black Bear |          1
  3 | Bald Eagle |          1
(3 rows)

my_first_db=# \q
```


Congratulations! 

You have successfully created your first PostgreSQL database, set up some tables, and populated them with some data.
