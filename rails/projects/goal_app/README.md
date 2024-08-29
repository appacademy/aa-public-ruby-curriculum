# Goal App

[Live Demo]

Today you're going to create an app to help people keep track of goals they set
for themselves. You'll also add a social element where people can view and
comment on each other's goals, harnessing the power of **social** to motivate
your users toward their hopes and dreams.

[Live Demo]: https://aa-goal-app.herokuapp.com/

## Learning goals

By the end of this practice, you should be able to

- Write model and request tests using RSpec
- Write system tests using Capybara and RSpec
- Determine what and when to test
- Test **behavior** rather than **implementation**
- Develop one feature at a time (the 'slices' approach)

## Setup

You will begin by creating a new Rails app, but this time you will create the
app a bit differently because you want the System Test components installed.
Pick a name for your app that is not "goal", "goals", or anything else that will
conflict with a model class name, something like `goal-app`. Make a directory
with that name and `cd` into it.

In this new directory, create a file __options.rc__ (or whatever you want; the
name doesn't matter). List the following options inside:

```sh
--skip-action-cable
--skip-action-mailer
--skip-action-mailbox
--skip-action-text
--skip-active-job
--skip-active-storage
--skip-bootsnap
--skip-dev-gems
--skip-javascript
--skip-jbuilder
--skip-hotwire
```

This includes all the normal options (minus `--skip-system-test`) that are
included under the hood when you create an app with the `--minimal` flag. Now
create your app using the `--rc` flag:

```sh
rails new . --rc=options.rc -G -d=postgresql
```

Using the `.` in place of an app's name tells Rails to create the new app in the
current directory instead of making a new one. Rails will accordingly use the
name of the current directory for the app's name.

Remember **NOT** to include the `-T` flag as it would affect the System Test
installation. Also, skip the `-G` flag if you are not creating this app inside
a pre-existing git repository. Assuming that you do use `-G`, you can grab
__.gitattributes__ and __.gitignore__ files from the starter repo accessed
through the `Download Project` button below.

You will need authentication in this project, so uncomment `gem "bcrypt"` in
your __Gemfile__. Then follow the steps in the "Testing Setup Summary" reading
to set up the various testing-related packages that you read about last night:

- RSpec
- FactoryBot
- Faker
- Shoulda Matchers
- Capybara
- Spring
- Guard

Finally, create your database.

## Phase I: User creation and login

Today's main focus will be Capybara system tests, but you will write some
model and controller/request specs as an RSpec warm up. In this phase, you will
build the models and controllers needed for user creation and authentication.
But don't write out your `User` model just yet: you are going to write this app
TDD style!

### Model and controller tests

Begin by generating and migrating an appropriate `User` model. (Keep it simple:
only have a user give a `username` and `password`.) Then write your specs before
you start to fill in the model.

Your model specs should test your model's validations, associations, and public
methods (e.g., `User::find_by_credentials`). (Typically, you only test public
methods; you test private methods by making sure the public ones work.)

Use [Shoulda Matchers] to write tests for each of the validations in your `User`
model. Remember to have your Matchers account for any additional options that
your validations check (e.g., minimum length).

> **Note:** If you implement `session_token` so that it never returns `nil`,
> Should Matchers will not be able to validate its presence. Depending on how
> you implement `password_digest`, Should Matchers could also have trouble
> validating its presence. You'll likely need to find other ways to test these
> two attributes.

You initially won't have any associations written on your user model; go back
and fill these in as you create other relevant models. Refer to the "Testing
Models With RSpec" reading as needed.

> **Tip:** `bundle exec annotate --models` will annotate your model files in
> __app/models__, __spec/models__, and __spec/factories__.

Next, write request tests for each action you will need in your
`UsersController`. (Don't worry about editing or deleting a user.) Refer to the
"Testing Requests With RSpec" reading as needed.

> **Tip:** `rails g rspec:request User` will generate the appropriate request
> spec file.

Run your specs and watch them fail. Now, implement `User` and `UsersController`
and experience the joy of turning your specs green! (Remember that request specs
also involve the routes and the rendered views!) Running `bundle exec guard`
will cause your tests to run automatically as you edit your files.

> **Note:** If you `expect(response.body)` to include a string that contains an
> apostrophe (e.g., `"Username can't be blank"`), it will always fail, even if
> that exact text **seems** to appear on the page. The problem has to do with
> how HTML handles the apostrophe. You can solve the problem by `unescape`ing
> the HTML like this:

  ```rb
  expect(CGI.unescapeHTML(response.body)).to include("Username can't be blank")
  ```

Skip the other model and controller specs. Go ahead and finish building out your
authentication functionality so you can move on to new material: writing
Capybara system tests!

[Shoulda Matchers]: https://matchers.shoulda.io/docs/v5.1.0/#activemodel-matchers

### System tests

For the remainder of the day, you'll be writing [system tests] utilizing the
joyous creature that is Capybara!

Start by writing system tests for authentication. Write only one test at a time
before implementing the corresponding feature logic. (Tests should fail at the
beginning.) Don't move on to another feature until you are confident that
your current feature is working well.

If you generate the spec file with the Rails generator--`rails g rspec:system
auth`--it will produce the following skeleton:

```rb
# spec/system/auths_spec.rb

require 'rails_helper'

RSpec.describe "Auths", type: :system do
  before do
    driven_by(:rack_test)
  end

  pending "add some scenarios (or delete) #{__FILE__}"
end
```

Note that the generator pluralizes the argument you pass for the name of your
test, so you end up with an __auths_spec.rb__ and `RSpec.describe "Auths"`.
While that is great if you are testing something like `goals`, `auths` is a
little awkward; feel free to make it singular again in both the filename and the
test description.

You can also just create the spec file yourself. If you do, however, note these
elements in the skeleton above:

1. You need to include `require 'rails_helper'` at the top.

2. Specifying that these tests are of `type: :system` is good practice, but it
   is not strictly necessary as long as this file is in the __spec/system__
   folder and `config.infer_spec_type_from_file_location!` appears in your RSpec
   configuration in __spec/rails_helper.rb__. (It appears by default; go ahead
   and check, it's there!)

3. You do need to include

   ```rb
   before do
    driven_by(:rack_test)
   end
   ```

   This changes the driver from the default `:selenium` to `:rack_test`.
   Selenium will open a browser to run every test. This is helpful if your tests
   need to run some JavaScript in the browser, but tests for this app won't need
   that functionality.

4. The `pending` line is just a placeholder that will show up when you run your
   tests as a reminder that you still need to write tests. It is not required
   and, if included, should be deleted once you have actually written some
   tests.

Now that your file is set up, here is a basic outline to get you started on
authorization specs:

```ruby
# spec/system/auth_spec.rb

RSpec.describe "Auth", type: :system do
  before do
    driven_by(:rack_test)
  end

  describe "the sign up process" do
    it "has a new user page"
    it "shows username on the homepage after signup"
  end

  describe "logging in" do
    it "shows username on the homepage after login"
  end

  describe "logging out" do
    it "begins with a logged out state"
    it "doesn't show username on the homepage after logout"
  end
end
```

Fill in the missing test logic, one test at a time. Remember to think like a
user: what page do you need to visit, what form fields need to be filled in,
what buttons clicked, what should you see on the page, and so on. Refer to the
[Capybara docs] for a list of methods you can use. To help with creating users
to manipulate, consider using FactoryBot and Faker.

[system tests]: https://relishapp.com/rspec/rspec-rails/docs/system-specs/system-spec
[Capybara docs]: https://rubydoc.info/github/teamcapybara/capybara/master#the-dsl

### FactoryBot and Faker

At some point in your authorization tests, you are going to need to create a
user. You could do this manually in your test file, but this can get cumbersome,
especially if 1) your models have many attributes and 2) you need multiple
instances. Your `User` model is not so large here, but try using FactoryBot
anyway just for the practice.

To build a user factory, go to the __spec/factories__ folder. If you used the
Rails model generator to generate your `User` model, then you should already
have a __users.rb__ file in there. (If not, just create one.) The generator also
supplies a basic skeleton for a `User` factory that will probably look something
like this:

```ruby
FactoryBot.define do
  factory :user do
    username { "MyString" }
    session_token { "MyString" }
    password_digest { "MyString" }
  end
end
```

Your `User` takes a `password` rather than a `password_digest`, and you don't
need to pass in a `session_token`, so you can replace those lines with one for
`password`. `MyString` is also not a very apt `username`; grab a `user_name`
from Faker's `Internet` generator instead:

```ruby
FactoryBot.define do
  factory :user do
    username { Faker::Internet.unique.user_name }
    password { "password" }
  end
end
```

> **Note:** You need to add `unique` to the Faker call to ensure that the users
> produced by this factory will not violate the `uniqueness` validation on
> `username`. If uniqueness did not matter, you could omit it:
> `Faker::Internet.user_name`.

This factory will create a random user, but it also might be helpful to have a
factory that would produce a user whose details were known. For example, you
could create a `hello_world` user like this:

```rb
FactoryBot.define do
  factory :user do
    username { Faker::Internet.unique.user_name }
    password { "password" }

    factory :user_hw do
      username { "hello_world" }
    end
  end
end
```

By nesting the `:user_hw` factory inside the `:user` factory, you enable it to
inherit any characteristics that are not overwritten. Building a `:user_hw`
would accordingly produce a `User` whose `username` is `hello_world` and whose
`password` is `password`.

To use these factories, just call `FactoryBot.build(:user_hw)` (will not save
the resulting user to the database) or `FactoryBot.create(:user_hw)` (will save
the resulting user to the database) in your spec file. Alternatively, if you add

```rb
config.include FactoryBot::Syntax::Methods
```

to `RSpec.configure` in __rails_helper.rb__, you can omit the `FactoryBot` and
just use `build(:user_hw)` / `create(:user_hw)`.

### Finishing up authorization

After you fill in each test, implement enough of the application logic to make
the test pass. Then go back and write the next test.

Once you finish all your tests and implementation, refactor any obvious bugs,
flaws, or inefficiencies that remain.

This is the _Red, Green, Refactor_ approach.

### Refactoring tips

You may notice that some tests require you to perform several setup actions
before you get to the actual test. For example, to log in, you have to visit the
new session url, fill in the username, fill in the password, and click the "Log
In" button. To keep your spec file clean and easy-to-read, consider moving
sequences of actions like this into helper methods in a support module.

Support files typically go in the __spec/support__ directory. Add a __system__
directory inside __spec/support__ and create a file __auth_system_helper__. Open
the file and create a `log_in_as` method:

```rb
module AuthSystemHelper
  def log_in_as(user)
    visit new_session_url
    fill_in "Username", with: user.username
    fill_in "Password", with: "password"
    click_button "Log In"
  end
end
```

Now you just need to give your tests in **auth_spec.rb** access to this module.
You could do this manually by adding

```rb
require_relative '../support/system/auth_system_helper.rb'
```

 to the top of __spec/system/auth_spec.rb__. Then inside `RSpec.describe
 "Auth"`, include the module:

 ```rb
 include AuthSystemHelper
 ```

This has the advantage of only loading the files that you need for this
particular test. There is, however, an alternative way to achieve this result.
In __rails_helper.rb__, uncomment this line at the end of the first major
comment block:

```rb
Dir[Rails.root.join('spec', 'support', '**', '*.rb')].sort.each { |f| require f }
```

As noted by the comment that precedes this line in the file, this command
effectively loads **every** __.rb__ file in the entire __support__ directory and
subdirectories for each test run. In other words, it will not selectively load
the files needed for your particular test, which could significantly increase
boot up time if you have many and/or long support files. (You should be okay in
this case, however.)

There is one more step in this alternative option. Still in __rails_helper.rb__,
add the following line inside `RSpec.configure`:

```rb
config.include AuthSystemHelper, type: :system
```

This will include `AuthSystemHelper` in every system spec file. This approach
thus has the advantage of making `log_in_as` automatically available to use in
all the system spec files.

Now that you know how to create helper methods and modules, go ahead and add a
`sign_up_as(username)` method to your `AuthSystemHelper` as well. Run your tests
again using these new helper methods to make sure everything is still green!

Now that auth is done, you are ready to move on to [Phase II!](README-ph2-3.md)