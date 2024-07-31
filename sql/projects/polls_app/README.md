# Polls

In the spirit of enfranchisement, you're going to build a polling app today!

## Learning goals

- Be able to write migrations with indexes and constraints
  - Know how to fix the effects of incorrect migrations
- Be able to write associations
- Know how to seed a project's database
- Be able to write custom validations in the model
- Be able to solve the N+1 query problem

Make sure to refer to the [ActiveRecord documentation][ar-docs] and this
[ActiveRecord query guide][ar-guide] for help with writing your queries.

Generate a new Rails project called `polls_app`. Remember the flags:

- `--minimal` prevents Rails from installing many features that this app will
  not need
- `-d=<database>` allows you to specify PostgreSQL as your `d`atabase
- `-T` prevents Rails from adding `T`esting frameworks that this project will
  not use
- `-G` prevents Rails from initializing the project as a `G`it repository

```sh
rails new polls_app -G -T -d=postgresql --minimal
```

The `-G` flag is important because you'll be pushing this project inside your
repository for today's work, and you want to avoid creating nested repos. It
also, however, keeps Rails from adding __.gitignore__ and __.gitattributes__
files to your project. Grab those two files from the starter repo at the
`Download Project` button below and copy them into the root directory of your
project.

If you would prefer to use `byebug` instead of `debug` as your debugger, then
replace `debug` with `byebug` in your Gemfile. Add any other gems you want to
install, e.g., `annotate` and `pry-rails`. (Remember to add gems to the correct
`group`!) If you make any changes to your Gemfile, run `bundle install` to
incorporate them into your project.

## Schema

Implement the following schema. Try drawing it out first to visualize how the
models interact with each other. Ask an instructor if you have any questions at
this point. Then go ahead and create your migrations. Don't forget to add
appropriate indexes and constraints (including foreign keys)!

- `User`
  - Store a `username`; make sure it is unique.
- `Poll`
  - A `Poll` belongs to an author (`User`).
  - Store a `title`.
- `Question`
  - A `Poll` has many `Question`s.
  - Store the `text`.
- `AnswerChoice`
  - A `Question` has many `AnswerChoice`s. These are the options that a `User`
    can choose from when responding to the question.
  - Store the `text`.
- `Response`
  - A `User` answers a `Question` by choosing an `AnswerChoice`. What pair of
    foreign keys will you need?

## Associations

Now go ahead and create your models. Write the following associations:

- `User`
  - `authored_polls`
  - `responses`
- `Poll`
  - `author`
  - `questions`
- `Question`
  - `answer_choices`
  - `poll`
- `AnswerChoice`
  - `question`
  - `responses`
- `Response`
  - `answer_choice`
  - `respondent`

Don't forget to add `dependent: :destroy` where appropriate!

## Seeding the database

At this point, it might be nice to have some data to play around with so you can
test easily. Open `db/seeds.rb` and use normal Active Record methods to create
some seed data, e.g.:

```rb
u1 = User.create!(username: 'Markov')
p1 = Poll.create!(title: 'Cats Poll', author: u1)
```

(Notice that you can use a `Poll`'s `author` association to set the
`author_id`!)

As you make your seed file, remember the good seeding practices from the
"Seeding 101" reading. You probably want to empty your tables and reset each
table's primary key before you load your seed data. Wrapping your code in a
`transaction` is also a good idea. Review the reading if you need help
remembering how to do these things.

Finally, don't waste time creating an extensive seed file. Create enough entries
to test all your code and move on!

## Model-level validations

Add `presence` and `uniqueness` validations where warranted.

**N.B.:** Remember, Rails automatically validates the presence of `belongs_to`
associations.

### Prevent user from creating multiple responses to the same question

Write a [custom validation method][custom-validation], `not_duplicate_response`,
to check that the `respondent` has not previously answered this question. This
is a deceptively hard thing to do and will require several steps:

#### Step 1: Response#sibling_responses

Write a method `Response#sibling_responses`. This should return all the
other `Response` objects for the same `Question`. To do this, first add the
following associations:

##### Response#question

This is a `has_one through:` association. `has_one through:` works exactly like
`has_many :through` (it has `through` and `source` options). The only difference
is that it returns a single object (or `nil`) instead of an array-like
`Relation`.

##### Question#responses

This is a `has_many :through` association. You've got this :-).

##### Singling yourself out

Having written these associations, you should be able to write
`Response#sibling_responses` by (1) calling `#question` and then (2) calling
`#responses` on the question.

But wait... won't the current response be included in
`response.question.responses`? I'm not my own sibling, and neither should a
response be its own sibling.

The answer is yes _and_ no. Since `#responses` is issuing a query, if the
original response has not been saved to the DB, `#sibling_responses` will not
contain it. However, once it's persisted to the DB, the query _will_ return it.
**Test this out** by building a new (unsaved) record and calling
`sibling_responses` and then saving it and calling `sibling_responses` again.

This be not good. How can we fix this?

Remember how `has_many` associations return lazy-loading `Relation` objects on
which you can chain additional query methods? Go ahead and chain a `where`
clause on here to filter out responses with the same id as `self.id`.

**N.B.:** Don't forget that you need to use `where.not` here because of SQL
ternary logic.

#### Step 2: `not_duplicate_response`

Next use `Response#sibling_responses` to write
`Response#respondent_already_answered?`. This is a predicate method that checks
to see if any sibling [`exists?`][exists?-docs] with the same `respondent_id`.

Now you can (finally) implement your validation. Use
`#respondent_already_answered?` to write a custom validation method that will
ensure that the respondent has not already answered it.

### Prevent authors from responding to their own polls

Enforce that the creator of the poll must not answer their own questions: don't
let the creator rig the results!

The simplest way is to create another `has_one through:` association, this time
for `poll`. (What can you go `through` to reach `Poll`?) You can then verify
whether the poll's author is the same as the `respondent_id`.

## Poll results

Write a method `Question#results` that returns a hash of choices and counts like
so:

```ruby
q = Question.first
q.title
# => "Who is your favorite cat?"
q.results
# => { "Earl" => 3, "Breakfast" => 3, "Maru" => 300 }
```

**First**, do this with an N+1 query. Get all the `answer_choices` for the
question, then call `responses.count` for each.

**Second**, use `includes` to pre-fetch all the responses at the same time you
fetch the `answer_choices`. **Test this** to see that it makes two queries and
not N+1. (Since you've already fetched the records, use `responses.length`
instead of `responses.count` so you don't fire off another SQL query.)

This way is not ideal; it causes all responses to be transferred to the client
even though you only want to count them. This is wasteful. **Improve your
solution**. First, write out the SQL that would return answer choice rows,
augmented with a column that counts the number of responses to that answer
choice. Hints:

- Use `SELECT answer_choices.*, COUNT(...)`.
- You'll need to combine data from both the `answer_choices` and `responses`
  tables.
- You'll want to keep only those `answer_choices` for the relevant question.
- If you want to count rows for each answer choices, you'll want a `GROUP BY`
  somehow.
- Be careful not to filter out `answer_choices` merely because there are no
  `responses` choosing it. These should have a count of zero.
- `COUNT(*)` counts the number of rows in a group; `COUNT(col_name)` counts the
  number of rows where `col_name IS NOT NULL`.

**Show an instructor your SQL code.** Having done this, write the query in
Active Record. Hints:

- You'll want your `self.answer_choices` association.
- You'll want to use `select`, `left_outer_joins`, and `group`.

## Bonus 1: Automatic deletions with relational callbacks

Allow deletion of `Question`s; clean up all related records using [relational
callbacks][relational-callback]. In other words, make sure that deleting a
question also deletes the associated answer choices and responses. Test your
code in the console.

## Bonus 2: `:counter_cache`

Write a new version of `Question#results` that uses the Active Record
[`counter_cache`] option for a `belongs_to` association. With your pair, discuss
the tradeoffs--both positive and negative--associated with using this option to
calculate results instead of your previous implementation.

## Bonus 3: More methods

Write a `User#completed_polls` method: it should return polls where the user has
answered all of the questions in the poll.

As before, **write the SQL first**. Start by counting the questions per poll:

- You want data from `polls` and `questions`.
- You want the number of questions per poll, so what do you `GROUP BY`?
- How do you `SELECT` all `polls` columns plus count the number of questions?

Next, extend your query to count the number of responses from this user:

- You need `responses` data, so continue the JOINs.
- You don't want to discard a question if no one responded to it (an unanswered
  question still counts to the total # of questions). What kind of JOIN is
  appropriate?
- Joining against all the `responses` is unnecessary; you only care about the
  user's responses. JOIN with a subquery on responses.
- Why would a `WHERE responses.respondent_id = ?` not work at the top level?
- Lastly, use a `HAVING` to eliminate those polls where the number of questions
  is not equal to the number of responses.

**Verify this SQL** with `Poll::find_by_sql` to run raw SQL returning `Poll`
objects. Ask Google if you don't know how. Then write it in Active Record.

You can write an `incomplete_polls` method too; it should return polls where the
user has answered at least one question, but not all of them. Can you do this
simply by changing the `HAVING` clause?

## Bonus 4: Playing with custom validations

`Response#sibling_responses` makes two queries: first it runs a query to return
the `Question` for the `Response`, then it performs a second query to return the
`#responses` for the `Question`. Can you get this done in a single query? It
likely involves joining `answer_choices` to `questions`; you should select the
`answer_choice` the response is for, this will give you the one `questions`
record you need. Next, you could join back to `answer_choices` again and onward
to `responses`.

By the way: this "improvement" is likely not worth the tears future readers of
your code will shed, but it's a good brain-twister.

## What you've learned

Congratulations, you just built a Rails app from scratch! You created the
project, wrote the migrations--with proper indexes and constraints!--and added
the necessary associations. You then constructed a seed file, loaded it, and
tested your code in the console. You added model-level validations, including
some custom validations that you wrote yourself. Finally, you experimented with
different ways of querying the database so as to avoid N+1 queries and, if you
made it through the bonuses, learned to use relational callbacks.

[ar-docs]: http://api.rubyonrails.org/v7.0.0/classes/ActiveRecord/QueryMethods.html
[ar-guide]: http://guides.rubyonrails.org/v7.0.0/active_record_querying.html
[`transaction`]: https://api.rubyonrails.org/v7.0.0/classes/ActiveRecord/Transactions/ClassMethods.html
[custom-validation]: https://guides.rubyonrails.org/v7.0.0/active_record_validations.html#custom-methods
[exists?-docs]: https://api.rubyonrails.org/v7.0.0/classes/ActiveRecord/FinderMethods.html#method-i-exists-3F
[relational-callback]:http://guides.rubyonrails.org/v7.0.0/active_record_callbacks.html#relational-callbacks
[`counter_cache`]: https://guides.rubyonrails.org/v7.0.0/association_basics.html#options-for-belongs-to-counter-cache
