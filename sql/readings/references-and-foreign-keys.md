# `references` And Foreign Keys

So far, you have set up foreign keys in your databases simply by declaring a
column of type `bigint` with a name that ends in `_id`. (You should also set up
an index for any foreign key.) That will always work, but Rails also provides
some syntactic sugar for declaring foreign keys: `references`.

## Learning goals

In this reading you will learn how to use the `references` type to

* Set up an `_id` column of type `bigint`
* Index that column (or not)
* Set a `foreign_key` constraint on that column that links to the correct table
* Set up `belongs_to` associations in the model

## `references`

For any column that you want to use as a foreign key, you should designate the
type as `references`. For example, using `references` in a model generator looks
like this:

```sh
rails g model Course name:string instructor:references
```

This command will produce the following migration and model files:

```rb
# db/migrate/20220518192247_create_courses.rb

class CreateCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :courses do |t|
      t.string :name
      t.references :instructor, null: false, foreign_key: true

      t.timestamps
    end
  end
end
```

```rb
# app/models/course.rb

class Course < ApplicationRecord
  belongs_to :instructor
end
```

Look at all that `references` does for you! It automatically adds `null: false`
and `foreign_key` modifiers. (More on the `foreign_key` designation below.) A
column of type `references` also takes an `index` option that defaults to
`true`, meaning that this migration will create an index on `instructor`. And it
adds `belongs_to` associations to the model file it creates! (You will still
have to add the `has_many`--and any other--associations.)

### Running the migration

Running the above migration will produce the following schema:

```rb
create_table "courses", force: :cascade do |t|
  t.string "name"
  t.bigint "instructor_id", null: false
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false
  t.index ["instructor_id"], name: "index_courses_on_instructor_id"
end

# ...

add_foreign_key "courses", "instructors"
```

Several points are worth noting:

1. `references` appears nowhere in the schema; it is strictly syntactic sugar
   for your migration. The columns indicated as `references` in the migration
   will be type `bigint` in the schema / database.

2. The `references` columns in the migration have no `_id` after their names.
   `_id` is automatically appended, however, in the schema / database. It is
   important to get this naming right. **NEVER append `_id` to the name of any
   column in your migration whose type is `references`.**

3. Since the column in the database **will** have the `_id` at the end of its
   name, if you need to reference that column in the migration--e.g., as an
   argument for `add_index`--you **should** append the `_id`.

4. Rails assumes that your migration uses conventional naming. It accordingly
   assumes that `instructor_id` points to an `instructors` table. (See, e.g.,
   the `add_foreign_key` statement.) That is probably not what you want in this
   case.

5. Because of the `foreign_key` constraints, this migration will not run
   successfully unless you have already created an `instructors` table in your
   database.

You will read more about `foreign_key` constraints (#5) below, but first it will
be helpful to address the issue with unconventional names (#4) and an additional
potential issue with indexes.

### `to_table`

To have a reference point to a table with an unconventional name, you simply
tell Active Record which table to use by setting the `to_table` option on
`foreign_key`. For example, if `instructor` actually points to a `users` table,
you would adjust your base migration like this:

```rb
# db/migrate/20220518192247_create_courses.rb

class CreateCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :courses do |t|
      t.string :name
      t.references :instructor, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
```

Running this migration will change the `add_foreign_key` method in the schema
above to

```rb
add_foreign_key "courses", "users", column: "instructor_id"
```

**N.B.:** You will need to manually supply the appropriate fields for the
`belongs_to` associations in your model file to enable those associations
to find the correct tables.

#### Important note on the `foreign_key` modifier

Significantly, the `foreign_key` modifier is only recognized on columns of type
`references` in a migration. If, for example, you instead declare a column
inside your `create_table` method like this:

```rb
t.bigint :instructor_id, null: false, foreign_key: { to_table: :users }
```

the migration will appear to run successfully, but it will actually ignore the
`foreign_key` modifier. You can verify by checking the schema: it will not have
an `add_foreign_key "courses", "users", column: "instructor_id"` line at the
bottom.

In short, if a column's type is not `references`, then you must use the
[`add_foreign_key`] method in your migration to set a `foreign_key` constraint.

### Avoiding unnecessary indexes

What if you wanted to make sure that no instructor was added to a course with
the same name more than once? You could do this by adding a composite index with
`unique: true`:

```rb
add_index :courses [:instructor_id, :name], unique: true
```

Now you have another problem. Because `instructor_id` is the first column listed
in the composite index, you don't want a separate index on `instructor_id`.
Columns of type `references`, however, will automatically include an index on
that column.

To solve the problem, just use the `index: false` modifier to tell Rails not to
add an index on the `instructor`-reference column:

```rb
# db/migrate/20220518192247_create_courses.rb

class CreateCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :courses do |t|
      t.string :name
      t.references :instructor, null: false, foreign_key: true, index: false

      t.timestamps
    end
  end
  add_index :courses [:instructor_id, :name], unique: true
end
```

When you run this migration, the only index added will be

```rb
  t.index ["instructor_id", "name"], name: "index_courses_on_instructor_id_and_name", unique: true
```

## `foreign_key` constraints

[`foreign_key` constraints] in your database ensure _referential integrity_. In
other words, a `foreign_key` constraint ensures that the foreign keys in that
column all link to actual records in the associated table. There can be no
broken links (`NULL` is allowed, however). This is good for your data, and it is
a best practice to apply a `foreign_key` constraint to all of your foreign keys.
Nevertheless, this constraint also has some important implications that may not
be obvious at first.

### Order matters

For starters, `foreign_key` constraints explain why your migration will crash if
you have `references` designated as `foreign_key`s to tables that have not yet
been created. As this example shows, `foreign_key` constraints mean that **the
order in which you create and delete tables and records matters**. You therefore
have to be careful how you set up your migrations, ensuring that you don't set
up references to tables that have not yet been created/migrated.

Destroying tables--e.g., in a seed file--can also run into trouble. Consider the
database schema above. A course `belongs_to` an instructor, which means that an
instructor `has_many` courses. You've already seen that you must accordingly
create the `users` table before you create the `courses` table. But what will
happen if you try to destroy the `users` table before you destroy the `courses`
table? The operation will produce an error like this:

```sh
ActiveRecord::InvalidForeignKey: PG::ForeignKeyViolation: ERROR:  update or delete on table "users" violates foreign key constraint "fk_rails_69fe0cadf9" on table "courses"
```

What's the issue? If you destroy the `users` table, then every `Course` will
have an invalid `instructor_id`. The `foreign_key` constraint on `instructor_id`
in `courses` will not allow this, so PostgreSQL throws an error on the first
deletion that would violate the constraint and rolls back the operation. You
must first destroy the `courses` table; then there will be no objection to
destroying the `users` table.

(A subsequent reading on `dependent: :destroy` will show how you can
automate this destruction process.)

## What you've learned

In this reading, you've learned how to use the `references` column type in a
migration to set up a `bigint` `xxxx_id` column in your database with an index
and a `foreign_key` constraint. With a model generator, `references` will also
supply the appropriate `belongs_to` associations in the model file. You also
learned how to customize the various `references` modifiers to produce your
desired schema. Finally, you learned about database-level `foreign_key`
constraints: what they do, how and why to implement them, and what potential
pitfalls to avoid when you use them.

[`add_foreign_key`]: https://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-add_foreign_key
[`foreign_key` constraints]: https://guides.rubyonrails.org/active_record_migrations.html#foreign-keys
