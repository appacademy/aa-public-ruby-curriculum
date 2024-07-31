
# SQL and RDBMS

Which of the following is an example of an RDBMS? (Select all that apply.)
- [ ] SQLite
- [ ] Oracle Database
- [ ] MySQL
- [ ] PostgreSQL

<details><summary>Answer:</summary>

- SQLite
- Oracle Database
- MySQL
- PostgreSQL</details>
<details><summary>Explanation:</summary>

Each of the above uses SQL and is accordingly an example of a Relational Database Management System (RDBMS).</details>


`SELECT`, `UPDATE`, and `INSERT` are keywords used in which of the following?
- [ ] Data Definition Language
- [ ] Data Interpolation Language
- [ ] Data Manipulation Language
- [ ] Data Classification Language

<details><summary>Answer:</summary>

Data Manipulation Language</details>
<details><summary>Explanation:</summary>

`SELECT`, `UPDATE`, and `INSERT` (as well as `DELETE`) are the Data Manipulation operations that SQL provides.</details>

Suppose we have a `create_tables.sql` file that we want to use to construct a database using `SQLite3` in a `pokemon.db` file. What is the correct way to do this from the command line?
- [ ] `cat pokemon.db | sqlite3 create_tables.sql`
- [ ] `sqlite3 cat create_tables.sql | pokemon.db`
- [ ] `cat pokemon.db sqlite3 | create_tables.sql`
- [ ] `sqlite3 create_tables.sql`
- [ ] `cat create_tables.sql | sqlite3 pokemon.db`

<details><summary>Answer:</summary>

`cat create_tables.sql | sqlite3 pokemon.db`</details>
<details><summary>Explanation:</summary>

First you want to read the file using `cat`. Then you want to take the output of that command and funnel it into `sqlite3` using the `|` operator. Finally, you need to specify the database file you want to create: `pokemon.db`.</details>

```ruby
CREATE TABLE cities (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    state_id INTEGER NOT NULL,
    county_id INTEGER NOT NULL,
  
    FOREIGN_KEY (state_id) REFERENCES states(id),
    FOREIGN_KEY (county_id) REFERENCES counties(id)
  );
  
  CREATE TABLE counties (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    state_id INTEGER NOT NULL,
    city_id INTEGER NOT NULL,
  
    FOREIGN_KEY (state_id) REFERENCES states(id),
    FOREIGN_KEY (city_id) REFERENCES cities(id)
  );
  
  CREATE TABLE states(
    id INTEGER PRIMARY KEY,
    name INTEGER NOT NULL
  );
```

What is wrong with the above schema? (Select all that apply.)
- [ ] The states tables needs foreign keys pointing to the cities and counties tables
- [ ] The cities and counties table have mandatory foreign keys pointing to each other
- [ ] The name column on the states table has the wrong data type
- [ ] Syntax errors on the counties table
- [ ] None of the above

<details><summary>Answer:</summary>

- The cities and counties table have mandatory foreign keys pointing to each other
- The name column on the states table has the wrong data type</details>
<details><summary>Explanation:</summary>

First, your `names` will probably never be `INTEGERS`. Second, you should never have two tables with foreign keys referencing each other; one table with a foreign key referencing the other table suffices to establish the relationship.</details>

```ruby
# Suppose we create an ORM for accessing a students database, and we want to add 
# an update method. Assume each student has the following instance variables 
# defined: @id, @name, @cohort, @graduation_date.

  def update
    students_db.execute(<<-SQL, @name, @cohort, @graduation_date, @id)
      _______
        students
      _______
        name = ?, cohort = ?, graduation_date = ?
      _______
        id = ?

    SQL
  end
```
Fill in the blanks:
- [ ] `SELECT`, `FROM`, `WHERE`
- [ ] `UPDATE`, `SET`, `WHERE`
- [ ] `INSERT INTO`, `VALUES`, `WHERE`
- [ ] `UPDATE`, `WHERE`, `SET`

<details><summary>Answer:</summary>

`UPDATE`, `SET`, `WHERE`</details>
<details><summary>Explanation:</summary>

When updating SQL tables, you want to specify the table to `UPDATE`, then the columns to `SET`, and finally the conditions determining `WHERE` the update should occur.</details>
