# Goal App (Phases II-III, Bonus)

[Live Demo]

[Live Demo]: https://aa-goal-app.herokuapp.com/

## Phase II: Goals

You are now ready to implement the 'goals' feature. Users should be able to CRUD
(create, read, update, and delete) their goals. Goals can also be private or
public - other users should not see 'private' goals, but a user should see all
of their own goals. Finally, think of a way for users to track which goals are
completed.

Create model, request (covering routes, controller, and views), and Capybara
system specs to ensure your 'goals' feature is fully tested. Write the tests
first: red to green!

Write the system specs first because they will force you to think about what
your app should do at a high level. Remember that system tests especially should
focus on behavior rather than implementation details. For example, your
completion test should work as long as users can track their goal completion,
regardless of how the code behind that feature works. Use a separate spec file
for each feature mentioned above: one for CRUD, one for privacy, and one for
completion.  

As you think about what tests to write and how to implement them, keep the
following in mind:

1. You've already set up your FactoryBot factory to generate users; when you
   need a user instance, you might as well use it!
2. Consider setting up a basic `Goal` factory.
3. Many features work differently depending on whether or not a user is logged
   in. With such features, your specs need to cover both cases. Same valid and
   invalid parameters.
4. Don't forget about your `log_in_as` and `sign_up_as` helper methods when
   writing your system tests.
5. Capybara methods like `log_in_as` will not work in request specs, but you
   will still need to have a logged-in user for some request specs. That's okay!
   You already know how to write a `log_in_as` method. Repeat what you did for
   the Capybara version. In this version, however, you don't have to worry about
   filling in forms and clicking buttons. Just send a request to the correct url
   with appropriate `params`.
6. Keep your spec files clean by creating other methods in your helper modules.
7. If you want to see what the webpage looks like during one of your Capybara
   tests, call `save_and_open_page`. (This requires that you have installed the
   `launchy` gem.)

## Phase III: Comment ALL the things

You need to let a user add comments. Imagine all the helpful words of
encouragement that other users could add to a goal. Ok, now here's the crazy
part. You **also** want to be able to comment on users. This way a user's show
page will have comments, and each goal will also have comments.

For now, you will implement the comments using two different tables,
`UserComment` and `GoalComment`. In a few days, when you have learned about
polymorphic associations and concerns, you will then return to this project and
refactor your comment code DRYing it up significantly.

The best part about this refactor? The tests that you write today will ensure
that you do it correctly! That's the great benefit of testing behavior instead
of implementation details.

### The two-table approach

As you implement this, write some high-level system tests to make sure your
comments work as expected. (Put all comment-related tests in a single file,
__comment_spec.rb__.) Use the Red-Green-Refactor approach. Remember, one test at
a time!

Your tests will need to cover comments on both users and goals at a minimum. You
can likely use the same tests in each context. For a situation like this, you
can use [shared examples] to keep your code DRY. Start by defining the shared
code:

```ruby
shared_examples "comment" do
  it "should have a form for adding a new comment" do
    # ...
  end
  # ...
end
```

To invoke this example in a specific context, you then use `it_behaves_like`:

```rb
describe "user profile comment" do
  visit user_url(user_hello_world)
  it_behaves_like "comment"
end
```

> **NOTE:** The `shared_examples` must be defined before a context invokes them.

Also bear in mind that you're about to replace the feature code, so it's super
important to test **behavior**, not **implementation**.

## Bonus

- Cheers: Users can give cheers for the goals of other users. Set a limit on the
  total number of cheers they can award--say, 12--so they have to be selective.
- Write unit tests for your other models using
  [shoulda-matchers][shoulda-matchers] and
  [factory_bot_rails][factory-bot-rails].
- Style your app.

## What you've learned

In this practice, you learned how to do Test Driven Development:
Red-Green-Refactor! Along the way, you also learned how to write unit tests (for
your models), request tests (for your routes, controllers, and views), and
system tests (for the user experience) using a variety of testing-related
packages: Spring, Guard, RSpec, Shoulda Matchers, FactoryBot, Faker, and
Capybara. Finally, you learned the importance of implementing one feature at a
time and testing behavior rather than implementation.

[shared examples]: https://relishapp.com/rspec/rspec-core/docs/example-groups/shared-examples
[shoulda-matchers]: https://github.com/thoughtbot/shoulda-matchers
[factory-bot-rails]: https://github.com/thoughtbot/factory_bot_rails