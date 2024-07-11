# Partner A: White Boarding

Ask your partner the below questions! **Don't spend longer than 20 minutes per
coding question.** Start a timer once the question has finished being read (or
the relevant information has been presented).

## Question One: Employees Query

You are given a PostgreSQL database with two tables: the first is an `employees`
table and the second is a `departments` table. Employees can belong to a single
department.

1.  Write a SQL query that, given a department name, finds all the employees
    `name`s that are in that department.

2.  Next find the name of the employees that don't belong to any department

#### Solution

```sql

--  1.
SELECT
  employees.name
FROM
  employees
JOIN
  departments ON employees.department_id = departments.id
WHERE
  departments.name = ?


--  2.
SELECT
  employees.name
FROM
  employees
WHERE
  employees.department_id IS NULL;

```

## Question Two:

Describe the differences between a primary key and a foreign key.

**Answer**: A primary key uniquely identifies a record in the relational
database table, whereas a foreign key refers to the `id` column which is the
primary key of **another** table.

## Question Three:

Given the following table write all the `belongs_to` and `has_many` **and**
`has_many through` associations for models based on the below table
(`Physician`, `Appointment`, and `Patient`)

```ruby
# == Schema Information
#
# Table name: physicians
#
#  id   :integer          not null, primary key
#  name :string           not null


# Table name: appointments
#
#  id   :integer           not null, primary key
#  physician_id :integer   not null
#  patient_id :integer     not null


# Table name: patients
#
#  id   :integer           not null, primary key
#  name :string            not null
#  primary_physician_id :integer

```

#### Solution

```ruby
class Physician < ApplicationRecord
  has_many :appointments,
    class_name: 'Appointment',
    foreign_key: :physician_id,
    primary_key: :id

  has_many :primary_patients,
    class_name: 'Patient',
    foreign_key: :primary_physician_id,
    primary_key: :id

  has_many :general_patients,
    through: :appointments,
    source: :patient

  has_many :primary_patient_appointments,
    through: :primary_patients,
    source: :appointments

end

class Appointment < ApplicationRecord
  belongs_to :physician,
    class_name: 'Physician',
    foreign_key: :physician_id,
    primary_key: :id

  belongs_to :patient,
    class_name: 'Patient',
    foreign_key: :patient_id,
    primary_key: :id
end

class Patient < ApplicationRecord
  has_many :appointments
    class_name: 'Appointment',
    foreign_key: :patient_id,
    primary_key: :id

  belongs_to :primary_care_physician
    class_name: 'Physician',
    foreign_key: :primary_physician_id,
    primary_key: :id
end
```

## Question Four:

Paraphrase the advantages of using an ORM (like ActiveRecord).

**Answer**: Using an ORM (Object Relational Model) allows you to interact with
database information in an OOP way. An ORM like ActiveRecord will translate rows
from your SQL tables into Ruby objects on fetch, and translates your Ruby
objects back to rows on save resulting in less overall database access code.

## Question Five:

When are model validations run?

**Answer**: Whenever a model instance is _updated_ or _saved_ to the database.

## Question Six:

Given the following Schema:

```ruby

# == Schema Information
#
# Table name: actors
#
#  id          :integer      not null, primary key
#  name        :string
#
# Table name: movies
#
#  id          :integer      not null, primary key
#  title       :string
#
# Table name: castings
#
#  movie_id    :integer      not null, primary key
#  actor_id    :integer      not null, primary key
#  ord         :integer
```

Write two SQL Queries:

1.  List the films where 'Harrison Ford' has appeared - but not in the star
    role.
    - **Note:** the `ord` field of casting gives the position of the actor. If
      `ord=1` then this actor is in the starring role
2.  Obtain a list in alphabetical order of actors who've had at least 15
    starring roles.

### Solution

```sql
-- 1. List the films where 'Harrison Ford' has appeared - but not in the star role.
SELECT
    movies.title
FROM
    movies
JOIN
    castings ON castings.movie_id = movies.id
JOIN
    actors ON actors.id = castings.actor_id
WHERE
    (actors.name = 'Harrison Ford' AND castings.ord != 1);

-- 2 -   Obtain a list in alphabetical order of actors who've had at least 15 starring roles.
SELECT
    actors.name
FROM
    actors
JOIN
    castings ON castings.actor_id = actors.id
WHERE
    castings.ord = 1
GROUP BY
    actors.name
HAVING
    COUNT(*) >= 15
ORDER BY
    actors.name;
```

## Question Seven:

Identify the difference between a `has_many through` and a `has_one`
association?

**Answer**: We use `has_many` when a record holds a column (the primary key)
that is referred to by a foreign key in the associated records. `has_one` is a
`has_many` association where at most one associated record will exist so we will
only return a single instance of the model.
