# Associations Exercise

To get started, clone the repo found by clicking the `Download Project` link at
the bottom of this page. `cd` into that repo and run `bundle install`.

You are going to write Active Record associations to connect some models. A
Rails project has been created with the database migrations already set up for
your convenience.

Run `rails db:setup` to create, load, and seed your database.

In this project there are three models: `User`, `Course`, and `Enrollment`. It
is your duty to connect them using Active Record associations.

Be sure to check out __db/schema.rb__ to see what the database contains. Run
`bundle exec annotate --models` to put the schema information at the top of each
model file.

## Learning goals

By the end of this project, you should

* Understand what an Active Record association represents
* Know when to use `has_many` vs. `belongs_to`
* Be able to write `has_many` and `belongs_to` associations
* Know what values to set as `primary_key`, `foreign_key`, and `class_name`
* Know how to use Active Record associations to return associated objects

## `Enrollment`

Open the `Enrollment` model in __app/models/enrollment.rb__. Add associations
for `student` and `course` inside the currently empty class. Do you want to use
`belongs_to` or `has_many`? How do you know?

After you are done adding the associations, you should be able to execute
`Enrollment.first.student` and `Enrollment.first.course` in the `rails console`.
(Remember to `reload!` in the `rails console` whenever you update your source
files!) These commands should return the associated user and course,
respectively, for the first enrollment.

## `User`

Add associations for `enrollments` and `enrolled_courses`. This might take a
little bit of thinking. (**HINT:** Go through the first association to complete
the second.)

You will know you have succeeded when you can execute `User.first.enrollments`
and `User.first.enrolled_courses` in the `rails console`. These commands should
return the user's enrollments and enrolled courses, respectively.

## `Course`

Add `enrollments` and `enrolled_students` associations. You can infer how to
test these based on your previous work.

Now, things get tricky. Add an association for `prerequisite`. This should
return a course's prereq (if it has one). You should get `nil` for
`Course.first.prerequisite` and the "Ruby 101" `Course` for
`Course.second.prerequisite`.

That didn't seem too tricky, did it? Ah, but now try to create a course without
a prerequisite:

```rb
Course.create!(name: 'Ruby for Beginners', instructor: User.second)
```

(Notice that this command is using your `instructor` association to assign
`instructor_id`!)

This command should work--kudos if it did!!!--but you likely got this error
message instead:

```sh
ActiveRecord::RecordInvalid: Validation failed: Prerequisite must exist
```

Why does this error occur? By default, Rails will automatically validate the
`presence` of a `belongs_to` association. Since some courses will not have a
prerequisite, you need to turn off that default behavior when you define your
`prerequisite` association. You can do this by passing `optional: true` as part
of the options hash. Add that line, `reload!` in your Rails console, and try the
command above again. It should now work!

Finally, add an `instructor` association to `Course`. This will point to a
`User` object. Note that `Course` is now related to `User` in two ways: through
`instructor` and through `enrolled_students`.

**Call over an Instructor** and show them your associations code.
