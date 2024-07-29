# Rails Auth Homework

This evening, you will be building a User model for a Rails auth system. This
project won't end in an app with login/logout functionality, but this is a
concept that you will use over and over again.

**Refer to the Auth I and Auth II readings if you get stuck.**

## Phase 0: Creating a new rails project

* `rails new <app_name> -G -T --minimal --database=postgresql`
* `rails db:create`
* Grab the __.gitattributes__ and __.gitignore__ files from the repo at the
  `Download Project` button below (or from one of your previous projects).
* Add `gem "bcrypt"` to the top level of your __Gemfile__. Change `debug` to
  `byebug` if you wish and add any other gems you want included. Then `bundle
  install`.

## Phase 1: Create a User model and migration

* Create a `User` model with the following columns and types:

  ```sh
  username:string password_digest:string session_token:string
  ```

* Add the appropriate constraints and indexes to the migration.
* Run `rails db:migrate` and check __schema.rb__ to make sure it worked.

## Phase 2: Add validations to the User model

* Validate the presence of `username` and `session_token`
* Validate the presence of `password_digest` and set the error message to
  `Password can't be blank`
* Validate the length of `password` and set `allow_nil` to `true`
* Make sure that `ensure_session_token` gets called before validations

## Phase 3: Add helper methods to the User model

* Write `::find_by_credentials`
  * This method takes in a `username` and a `password` and returns the user that
    matches (or `nil` if no match)
  * This method should use `#is_password?` (see below).
* Write `#generate_unique_session_token`
  * This method uses `SecureRandom::urlsafe_base64` to return a unique 16-digit
    pseudorandom string
* Write `#password=`
  * This method sets `@password` equal to the argument given so that the
    appropriate validation can happen
  * This method also encrypts the argument given and saves it as this user's
    `password_digest`
  * Remember: you have to add an `attr_reader` for `password` for the validation
    to occur!
* Write `#is_password?`
  * This method takes a `password` and checks it against the `password_digest`
    to determine whether or not `password` is, in fact, the user's password.
* Write `#reset_session_token!`
  * This method resets the user's `session_token` and saves the user
* Write `#ensure_session_token`
  * This method makes sure that the user has a `session_token` set, setting one
    if none exists

## Phase 4: Check your work

* Check your model against the solutions.
* Try creating a user in the Rails console
  * Make sure your validations work, and also make sure that you're storing
    `password_digest` as an encrypted string

Example testing code below:

```ruby
User.all # shows no users
empty_gage = User.new
empty_gage.save # rollback because of failed validations
password_too_short_gage = User.new(username: 'gage', password: 'test')
password_too_short_gage.save # rollback because of failed validations
gage = User.new(username: 'gage', password: 'testing')
gage.save # inserted into Users
User.all #<ActiveRecord::Relation [#<User id: 1, username: "gage"...
User.first.password_digest # shows a string of gibberish that you can't hack
User.find_by_credentials('gage', 'testing') #<User:0x0000000112faf240 id: 1, username: "gage" ...
```

## Phase 5: Celebrate

Congratulations! You have just written an important part of a Rails auth system.