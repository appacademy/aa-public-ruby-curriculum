# Goal App Refactor

In the Goal App that you created a few days ago, you implemented comments by
using two different tables, `UserComment` and `GoalComment`. Now that you have
learned about polymorphism and concerns, you can refactor your comment code to
DRY it up considerably. The best part about this refactor? The tests that you
wrote the other day will ensure that you do it correctly!

You can use your code from that assignment or download a solution to the Goal
App project from the repo accessed through the `Download Project` button at the
bottom of this page. If you download the Goal App solution, don't forget to
create your database, run the migrations, seed the database, and load the schema
into test:

```sh
rails db:create db:migrate db:seed db:test:load
```

(You will probably want to load the schema into test every time you migrate.)

Run `bundle exec rspec` to make sure all of your specs start out green!

## Adding a polymorphic association

First, use a polymorphic association so that `User`s and `Goal`s will both refer
to the same `Comment` model. Think through what you will need to to make this
happen. Think about which associations you will need. Each `User` and `Goal`
should have many `comments`, and comments will need to be associated with a
commenting user and a user or goal being commented on.

Go ahead and create this new model and migration. Remember that you'll need to
remove the old comment tables when you create the new one. See if you can
migrate the data from the old tables without losing it. (Remember that you can
use regular Ruby / Active Record code in your migration files!)

> **Tip:** If you are moving data from your old tables to your new table in the
> migration, you will probably want to use `up` and `down` methods instead of
> `change` so you can make the migration reversible. Note that you will need all
> of the models that you are accessing to be defined in __app/models__ for such
> a transfer to work.

Run `bundle exec rspec` again. Now you should see lots of red.

Next, write the associations to link all of your classes together
polymorphically. You'll also need to add a `CommentsController`--use one of the
project's old comment controllers as a guide--update your routes, and update
__shared/\_comments_form.html.erb__.

When you finish, run `bundle exec rspec` again. If everything is done correctly,
you should see all green. Isn't this better than that lousy two-table solution?

## DRYing up your code with concerns

"Now wait just one minute!" you say. "I've removed an unneeded table and made
my comment model more extensible, but my code still isn't very _DRY_ if I'm
writing identical code for both `User` comments and `Goal` comments."

Well, funny you should mention that. **Concerns** are a great way to factor out
your association logic and DRY out your code. Go ahead and create a
`Commentable` concern to do just that. (Refer back to the "Concerns" reading if
you need help.)

When the tests stay green you can pat yourself on the back for successfully
solving a problem using two different strategies. RSpec and Capybara give you
the comfort and security of knowing that although things have changed beneath
the hood, the presentation is identical because **the tests are still green**.
Isn't this a nice feeling?

## Resources

* [Polymorphic associations][poly-reading]
* [Concerns]

[poly-reading]: https://guides.rubyonrails.org/association_basics.html#polymorphic-associations
[Concerns]: https://signalvnoise.com/posts/3372-put-chubby-models-on-a-diet-with-concerns

## What you've learned

In this hw, you learned how to DRY out your code using polymorphic associations
and concerns. Along the way, you also discovered the benefits of having
established tests that test behavior rather than implementation details.