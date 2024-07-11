# Partner B: White Boarding

Ask your partner the below questions! **Don't spend longer than 20 minutes per
coding question.** Start a timer once the question has finished being read (or
the relevant information has been presented).

## Question One

What are the disadvantages of adding an index to a table column in a database?

**Answer**: Indices do have a cost. They make writes (`INSERT`s, `DELETE`s, and
`UPDATE`s) a little more taxing because the index table must also be updated.

## Question Two

Given the following table write all the `belongs_to` and `has_many` associations
for models based on the below table (`User`, `Enrollment`, and `Course`)

```ruby

# == Schema Information
#
# Table name: users
#
#  id   :integer                not null, primary key
#  name :string                 not null


# Table name: enrollments
#
#  id   :integer                not null, primary key
#  course_id :integer           not null
#  student_id :integer          not null


# Table name: courses
#
#  id   :integer                not null, primary key
#  course_name :string          not null
#  professor_id :integer        not null
#  prereq_course_id :integer    not null
```

### Solutions

Below are all the `belongs_to` and `has_many` associations:

```ruby
class Enrollment < ApplicationRecord
  belongs_to :user,
    class_name: 'User',
    foreign_key: :student_id,
    primary_key: :id

  belongs_to :course,
    class_name: 'Course',
    foreign_key: :course_id,
    primary_key: :id
end

class User < ApplicationRecord
  has_many :enrollments,
    class_name: 'Enrollment',
    foreign_key: :student_id,
    primary_key: :id

  has_many :courses_taught,
    class_name: 'Course',
    foreign_key: :professor_id,
    primary_key: :id,
    optional: true
end

class Course < ApplicationRecord
  has_many :enrollments,
    class_name: 'Enrollment',
    foreign_key: :course_id,
    primary_key: :id

  belongs_to :prerequisite,
    class_name: 'Course',
    foreign_key: :prereq_course_id,
    primary_key: :id,
    optional: true

  belongs_to :professor,
    class_name: 'User',
    foreign_key: :professor_id,
    primary_key: :id
end
```

## Question Three

Given all possible SQL commands order by order of query execution. (SELECT,
DISTINCT, FROM, JOIN, WHERE, GROUP BY, HAVING, LIMIT/OFFSET, ORDER).

**Answer**:

1. FROM and JOINs
2. WHERE
3. GROUP BY
4. HAVING
5. SELECT
6. DISTINCT
7. ORDER BY
8. LIMIT / OFFSET

## Question Four

Given the following table:

```ruby
# == Schema Information
#
# Table name: nobels
#
#  yr          :integer
#  subject     :string
#  winner      :string

```

Write the following SQL Query:

1.  In which years was the Physics prize awarded, but no Chemistry prize?

#### Solution

```sql
SELECT DISTINCT
    yr
FROM
    nobels
WHERE
    (subject = 'Physics' AND yr NOT IN (
    SELECT
        yr
    FROM
        nobels
    WHERE
        subject = 'Chemistry'
    ))


```

## Question Five

What is the purpose of a database migration?

**Answer**: A migration is a file containing Ruby code that describes a set of
changes to be applied to a database. It may create or drop tables as well as add
or remove columns from a table.

## Question Six

What is the difference between Database Constraints and Active Record
Validations?

**Answer**: **Validations** are defined inside **models**. Model-level
validations live in the Rails world. Since we write them in Ruby, they are very
flexible, database agnostic, and convenient to test, maintain and reuse.
Validations are run whenever we `save` or `update` a model. **Constraints** are
defined inside **migrations** and operate on the database. Constraints throw
hard nasty errors whenever something that shouldn't be inputted into our
database tries to get in there.

## Question Seven

Given the following table write all the `belongs_to` and `has_many` associations
for models based on the below table (`User`, `Game`, and `Score`)

```ruby
# == Schema Information
#
# Table name: user
#
#  id   :integer          not null, primary key
#  name :string           not null


# Table name: score
#
#  id   :integer           not null, primary key
#  number :integer         not null
#  user_id :integer        not null
#  game_id :integer        not null


# Table name: game
#
#  id   :integer           not null, primary key
#  name :string            not null
#  game_maker_id :integer  not null
```

#### Solution

```ruby
class Score < ApplicationRecord
  belongs_to :user,
    class_name: 'User',
    foreign_key: :user_id,
    primary_key: :id

  belongs_to :game,
    class_name: 'Game',
    foreign_key: :game_id,
    primary_key: :id
end

class User < ApplicationRecord
  has_many :games_made,
    class_name: 'Game',
    foreign_key: :game_maker_id,
    primary_key: :id,
    optional: true

  has_many :scores,
    class_name: 'Score',
    foreign_key: :user_id,
    primary_key: :id

end

class Game < ApplicationRecord
  belongs_to :game_maker,
    class_name: 'User',
    foreign_key: :game_maker_id,
    primary_key: :id

  has_many :scores,
    class_name: 'Score',
    foreign_key: :game_id,
    primary_key: :id
end

```
