# Testing Rails With RSpec And Capybara

Tonight you'll be testing the Music App that you created. You can use your code
from that assignment or download a solution to the Music App project from the
repo accessed through the `Download Project` button at the bottom of this page.
(If you download the Music App solution, don't forget to create your database!)

## Setup

If you created the Music App with the `--minimal` flag, then Rails did not
install Capybara / System Tests. You will want to use Capybara for this
homework, however, so add the following gems to your __Gemfile__:

```rb
group :test do
  gem "capybara"
  gem "selenium-webdriver"
  gem "webdrivers"
end
```

Then follow the instructions in the readings for setting up RSpec-Rails, Shoulda
Matchers, and Capybara. Hint: you'll need to add a couple more gems. (Don't
worry about setting up FactoryBot, Faker, Spring, or Guard for this assignment;
you'll get the chance to use those packages tomorrow.)

## Model tests

Run `rails g rspec:model User` to generate a spec file for the `User` model.

First write some simple tests for the `User` model. Your test files should live
in __spec/models/user_spec.rb__. Use Shoulda Matchers to test all of the user's
validations using the following as a blueprint:

```ruby
# validations
it { should validate_presence_of(:email) }
```

You should validate:

- Presence of `email`
- Presence of `password_digest`
- Length of `password` > 6

Refer to the Shoulda Matchers reading as needed.

Next, it's time for a review of plain old RSpec! Write methods to test
`#is_password?`, `#reset_session_token`, and `::find_by_credentials`.

Make sure to run your specs (`bundle exec rspec spec/models`) and review the
solutions for the users model before moving on.

## Request tests

Run `rails g rspec:request Users` to generate a spec file for the
`UsersController`.

Use the following skeleton. Fill in the pending specs to test each action in
your `UsersController`. The first spec has been filled in for you.

```ruby
RSpec.describe "Users", type: :request do

  describe "GET /users/new (#new)" do
    it "renders the new template" do
      get new_user_url
      expect(response.body).to include("Sign Up!")
    end
  end

  describe "POST /users (#create)" do
    context "with invalid params" do
      it "validates the presence of the user's email" do
        # Your code here
      end

      it "validates that the password is at least 6 characters long" do
        # Your code here
      end
    end

    context "with valid params" do
      it "redirects user to root page on success" do
        # Your code here
      end
    end
  end
end
```

## System tests

Finally, it's time to practice writing a system test.

Your system tests should live in the __spec/system/__ folder. Run `rails g
rspec:system Auth` to create __spec/system/auths_spec.rb__. (Feel free to change
the name to the singular: __auth_spec.rb__.)

Copy in the following skeleton and implement the pending specs to test your auth
pattern. Once again, the first one is done for you. Refer to the Capybara
reading as needed.

**Note:** Capybara is a very picky creature. Make sure that the text on your
labels, forms, and headers exactly matches what Capybara expects.

```ruby
RSpec.describe "Auth", type: :system do
  before do
    driven_by(:rack_test)
  end

  describe "the signup process" do
    it "has a new user page" do
      visit new_user_url
      expect(page).to have_content "New User"
    end

    it "redirects to the root page after signup" do
      visit new_user_url
      fill_in "Email", with: "bill@gmail.com"
      fill_in "Password", with: "password"
      click_on "Sign Up"
      # Your code here
    end

    it "re-renders the sign-up page after a failed sign-up attempt" do
      # Your code here
    end
  end
end
```

Congrats! You are well on your way to becoming a Capybara master! Make sure to
review the solutions.