
# SQL and RDBMS

<quiz>
  <question multiple>
  <p>Which of the following is an example of an RDBMS? (Select all that apply.)</p>
    <answer correct>SQLite</answer>
    <answer correct>Oracle Database</answer>
    <answer correct>MySQL</answer>
    <answer correct>PostgreSQL</answer>
    <explanation>Each of the above uses SQL and is accordingly an example of a Relational Database Management System (RDBMS).</explanation>
  </question>
</quiz>


<quiz>
  <question>
  <p>`SELECT`, `UPDATE`, and `INSERT` are keywords used in which of the following?</p>
    <answer>Data Definition Language</answer>
    <answer>Data Interpolation Language</answer>
    <answer correct>Data Manipulation Language</answer>
    <answer>Data Classification Language</answer>
    <explanation>`SELECT`, `UPDATE`, and `INSERT` (as well as `DELETE`) are the Data Manipulation operations that SQL provides.</explanation>
  </question>
</quiz>

<quiz>
  <question>
  <p>Suppose we have a `create_tables.sql` file that we want to use to construct a database using `SQLite3` in a `pokemon.db` file. What is the correct way to do this from the command line?</p>
    <answer>`cat pokemon.db | sqlite3 create_tables.sql`</answer>
    <answer>`sqlite3 cat create_tables.sql | pokemon.db`</answer>
    <answer>`cat pokemon.db sqlite3 | create_tables.sql`</answer>
    <answer>`sqlite3 create_tables.sql`</answer>
    <answer correct>`cat create_tables.sql | sqlite3 pokemon.db`</answer>
    <explanation>First you want to read the file using `cat`. Then you want to take the output of that command and funnel it into `sqlite3` using the `|` operator. Finally, you need to specify the database file you want to create: `pokemon.db`.</explanation>
  </question>
</quiz>

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

<quiz>
  <question multiple>
  <p>What is wrong with the above schema? (Select all that apply.)</p>
    <answer>The states tables needs foreign keys pointing to the cities and counties tables</answer>
    <answer correct>The cities and counties table have mandatory foreign keys pointing to each other</answer>
    <answer correct>The name column on the states table has the wrong data type</answer>
    <answer>Syntax errors on the counties table</answer>
    <answer>None of the above</answer>
    <explanation>First, your `names` will probably never be `INTEGERS`. Second, you should never have two tables with foreign keys referencing each other; one table with a foreign key referencing the other table suffices to establish the relationship.</explanation>
  </question>
</quiz>

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
<quiz>
  <question>
  <p>Fill in the blanks:</p>
    <answer>`SELECT`, `FROM`, `WHERE`</answer>
    <answer correct>`UPDATE`, `SET`, `WHERE`</answer>
    <answer>`INSERT INTO`, `VALUES`, `WHERE`</answer>
    <answer>`UPDATE`, `WHERE`, `SET`</answer>
    <explanation>When updating SQL tables, you want to specify the table to `UPDATE`, then the columns to `SET`, and finally the conditions determining `WHERE` the update should occur.</explanation>
  </question>
</quiz>
