CREATE TABLE departments (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Notice that tables are always named lowercase and plural. This is a
-- convention.
CREATE TABLE professors (
  -- SQLite3 will automatically populate an integer primary key
  -- (unless it is specifically provided). The conventional primary
  -- key name is 'id'.
  id INTEGER PRIMARY KEY,
  -- NOT NULL specifies that the column must be provided. This is a
  -- useful check of the integrity of the data.
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  department_id INTEGER NOT NULL,

  -- Not strictly necessary, but informs the DB not to
  --  (1) create a professor with an invalid department_id,
  --  (2) delete a department (or change its id) if professors
  --      reference it.
  -- Either event would leave the database in an invalid state, with a
  -- foreign key that doesn't point to a valid record. Older versions
  -- of SQLite3 may not enforce this, and will just ignore the foreign
  -- key constraint.
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- In addition to creating tables, we can seed our database with some
-- starting data.
INSERT INTO
  departments (name)
VALUES
  ('mathematics'), ('physics');

INSERT INTO
  professors (first_name, last_name, department_id)
VALUES
  ('Albert', 'Einstein', (SELECT id FROM departments WHERE name = 'physics')),
  ('Kurt', 'Godel', (SELECT id FROM departments WHERE name = 'mathematics'));
