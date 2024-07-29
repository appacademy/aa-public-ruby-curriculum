# Authentication I: Creating Users

The Auth Demo project shows you how to set up basic authentication for your
Rails apps. This reading, Part I, covers the creation of users. The next
reading, Part II, covers the creation of a session. Feel free to code along. You
can also download the full solution for this demo at the `Download Project`
button below.

Here is a diagram of what signing up a user looks like.
![Sign Up Diagram][sign-up-diagram]

## Phase I: BCrypt

### Don't store passwords in the database

**Never store passwords in the database.** Storing passwords is bad because if
someone hacks your server and gains access to the database, they will be able to
steal all of your users' passwords. Since your users probably use the same
password across multiple services, the hacker will likely be able to log in to a
user's Gmail, Facebook, etc.

### What is a hash function?

The solution to this problem is to use a **hash function**. A hash function is a
"one-way" function; it is easy to compute in one direction, but difficult to
revert. Meaning that given a password, you can easily calculate the hash value
of the password, but there is no easy way to go back and recover the password
from the hash.

Basically, a hash is sort of like scrambling an egg: scrambling is easy,
unscrambling, not so much. The fancy mathematical trick--leave this step to
the mathematicians!--is to design a function where:

* You scramble things the same way every time: the same password will hash to
  the same value every time.
* That means the scrambling isn't really random; if the scrambling were totally
  random, you'd calculate a new, different hash every time.
* Even though the scrambling isn't truly random, it should still be difficult
  (that is, near impossible) to "unscramble".

### Using a library

In this course, you will use a library called `bcrypt` to do the hashing for
you. First `gem install bcrypt`. Now you can play in the console:

```ruby
require 'bcrypt'
# => true
password_hash = BCrypt::Password.create('my_secret_password')
# => "$2a$10$sl.3R32Paf64TqYRU3DBduNJkZMNBsbjyr8WIOdUi/s9TM4VmHNHO"
password_hash.is_password?('my_secret_password')
# => true
password_hash.is_password?('not_my_secret_password')
# => false
```

The example above uses the `BCrypt::Password` class; the `::create` factory
method takes a password and hashes it. You store the resulting
`BCrypt::Password` object in `password_hash`.

The `BCrypt::Password` class has an instance method, `#is_password?`. The method
takes a string, hashes the string, and compares it with the `BCrypt::Password`
contents.

If the argument is the same string as before, the two hashes will be equal and
`#is_password?` returns true; otherwise it returns false.

### Requiring `bcrypt`

Edit your __Gemfile__ to include `gem "bcrypt"` at the top level.

> **Note:** Rails will include a commented-out version of the `bcrypt` gem in
> the __Gemfile__ unless you use the `--minimal` flag when creating your
> project. If you use `--minimal`, Rails will skip `bcrypt` altogether.

## Phase II: `User` model

### Initial columns and indexes

Start with `rails g model User`. Add string columns to the `users` table for
`username` and `password_digest`. _Digest_ is just another name for a hash. Toss
an index on `username` too (make it `unique`). Add `null: false` to both columns
and migrate.

Note that you **will not** store the password itself in the DB; you're going to
store the hashed version. So you should **NOT** have a `password` column in your
table.

### Storing/Verifying a password

Go ahead and create a `User` object in the console:

```ruby
[1] pry(man)> u = User.new
=> #<User id: nil, username: nil, password_digest: nil, created_at: nil, updated_at: nil>
[2] pry(man)> u.username = 'earl'
=> "earl"
[3] pry(man)> u.password_digest = BCrypt::Password.create('i_love_breakfast')
=> "$2a$12$mIE28F3HgEFZE35GOEqon.Jp3oISzOhHeBDYZS76sovVUqu5DdLzK"
[4] pry(man)> u.save
TRANSACTION (0.3ms)  BEGIN
  User Exists? (42.4ms)  SELECT 1 AS one FROM "users" WHERE "users"."username" = $1 LIMIT $2  [["username", "earl"], ["LIMIT", 1]]
  User Create (0.8ms)  INSERT INTO "users" ("username", "password_digest", "created_at", "updated_at") VALUES ($1, $2, $3, $4) RETURNING "id"  [["username", "earl"], ["password_digest", "[FILTERED]"], ["created_at", "2022-06-06 21:53:01.274889"], ["updated_at", "2022-06-06 21:53:01.274889"]]
  TRANSACTION (43.9ms)  COMMIT
=> true
[5] pry(man)> u.password_digest
=> "$2a$12$mIE28F3HgEFZE35GOEqon.Jp3oISzOhHeBDYZS76sovVUqu5DdLzK"
```

Here's how to verify that password later:

```ruby
[6] pry(man)> u = User.first
User Load (0.3ms)  SELECT "users".* FROM "users" ORDER BY "users"."id" ASC LIMIT $1  [["LIMIT", 1]]
=> #<User:0x00000001103f2d78
 id: 1,
 username: "earl",
 password_digest: "[FILTERED]",
 created_at: Mon, 06 Jun 2022 21:53:01.274889000 UTC +00:00,
 updated_at: Mon, 06 Jun 2022 21:53:01.274889000 UTC +00:00>
[7] pry(man)> BCrypt::Password.new(u.password_digest).is_password?('i_love_breakfast')
=> true
```

Okay, cool. Notice that when you pull down the `User`, `password_digest` is set
to a string, since that is what the DB stores. You want to get a
`BCrypt::Password` object back from the digest. Because the digest is **already
hashed**, you use the `new` constructor rather than the `create` factory method;
`create` creates a `Password` object by hashing the input, while `new` builds a
`Password` object from an existing, string-ified hash.

This code is not very convenient. Let's add some helper methods to `User`.

### Write `User#password=` and `User#is_password?`

First write a method that will make it easier to set the `password_digest`
column. Right now, the programmer is required to hash the password themselves.
Let's do it for them:

```ruby
class User < ApplicationRecord
  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end
end
```

The fact that you don't have a `password` column in the DB does not prevent you
from writing a setter method named `password=`. This is totally cool. In this
case, instead of saving the actual password to your database, you're going to
use BCrypt to hash it and then save it to the `password_digest` column.

Let's also save the programmer from having to do the hard work of verifying a
password:

```ruby
class User < ApplicationRecord
  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password)
  end
end
```

Note that your `is_password?` is calling BCrypt's `is_password?`. Don't confuse
these two methods. The former is called on a `User` instance; the latter is
called on a `BCrypt::Password` instance.

Now test it out!

```ruby
[1] pry(main)> u = User.new
=> #<User id: nil, username: nil, password_digest: nil, created_at: nil, updated_at: nil>
[2] pry(main)> u.username = 'Houdini'
=> "Houdini"
[3] pry(main)> u.password = 'i_remember_kiki'
=> "i_remember_kiki"
[4] pry(main)> u.save
  TRANSACTION (0.2ms)  BEGIN
  User Exists? (0.4ms)  SELECT 1 AS one FROM "users" WHERE "users"."username" = $1 LIMIT $2  [["username", "Houdini"], ["LIMIT", 1]]
  User Create (1.5ms)  INSERT INTO "users" ("username", "password_digest", "created_at", "updated_at") VALUES ($1, $2, $3, $4) RETURNING "id"  [["username", "Houdini"], ["password_digest", "[FILTERED]"], ["created_at", "2022-06-06 22:10:10.324819"], ["updated_at", "2022-06-06 22:10:10.324819"]]
  TRANSACTION (40.1ms)  COMMIT
=> true
[5] pry(main)> u = User.last
  User Load (0.3ms)  SELECT "users".* FROM "users" ORDER BY "users"."id" DESC LIMIT $1  [["LIMIT", 1]]
=> #<User:0x00000001105ba1b0
 id: 2,
 username: "Houdini",
 password_digest: "[FILTERED]",
 created_at: Mon, 06 Jun 2022 22:10:10.324819000 UTC +00:00,
 updated_at: Mon, 06 Jun 2022 22:10:10.324819000 UTC +00:00>
[6] pry(main)> u.is_password?('i_remember_kiki')
=> true
[7] pry(main)> u.is_password?('random_password_guess')
=> false
```

Whoa, object orientation for the win! Hey, did you know it's totally cool to
write methods on your model objects? You have permission: Go forth and multiply
methods!

## Phase III: Creating new users

Now add `users` resources for `create`, `new`, and `show` actions--you'll add
`show` functionality in Part II--and a `UsersController`:

```ruby
# config/routes.rb
Rails.application.routes.draw do
  root "users#new"
  resources :users, only: %i(create new show)
end

# app/controllers/users_controller.rb
class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      render json: @user
    else
      render json: @user.errors.full_messages
    end
  end

  def new
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
```

Notice that this code calls `#permit` with `:password`, **not** with
`password_digest`.  Is this ok?  **Yes**: Just like in your Active Record Lite
project, mass-assignment will call the setter method `password=`. It's okay that
this doesn't set a password column.

Add a `new` view, too, so that users can sign up for the site.

```erb
<!-- app/views/users/new.html.erb -->
<h1>Sign Up!</h1>

<%= render "shared/form", task: "signup" %>

<!-- app/views/shared/_form.html.erb -->
<% action = (task == "signup" ? users_url : session_url) %>
<% message = (task == "signup" ? "Sign Up!" : "Log In!") %>

<form action="<%= action %>" method="POST">
  <input
    type="hidden"
    name="authenticity_token"
    value="<%= form_authenticity_token %>"
  >
  
  <label for="user_username">Username</label>
  <input
    type="text"
    name="user[username]"
    id="user_username"
  >
  <br>

  <label for="user_password">Password</label>
  <input 
    type="password"
    name="user[password]"
    id="user_password"
  >
  <br>

  <input type="submit" value="<%= message %>">
</form>
```

(Note that this form partial anticipates being used for "Login" as well,
although you won't build out that functionality until Part II.)

### Validating `User`

Okay, you can now create users through the form. You probably want to toss some
validations on your `User` model:

```ruby
class User < ActiveRecord::Base
  validates :username, presence: true, uniqueness: true
  validates :password_digest, presence: { message: 'Password can\'t be blank' }

  # ...
end
```

Notice that you can set your own message to use if the `password_digest` is
blank. The default is "Password digest can't be blank", but the user won't know
what a password digest is.

What if you want to validate the length of the password? Right now, you never
store the password in the `User` object; for that reason, the password will no
longer be around to check when you eventually validate the `User`. Does it make
sense why you can't just slap on `validates :password, length: { minimum: 6 }`?

Here's one way to accomplish your goal: store the password in an instance
variable, but never save this to the DB. First, modify `#password=`:

```ruby
  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end
```

This saves the password in an instance variable. Active Record **will not** try
to save the password to the DB, however. Instead, the `@password` instance
variable will be ignored.

You can now validate the password:

```ruby
class User < ApplicationRecord
  attr_reader :password

  validates :username, presence: true
  validates :password_digest, presence: { message: 'Password can\'t be blank' }
  validates :password, length: { minimum: 6, allow_nil: true }

  # ...
end
```

A couple of notes:

1. The code above adds the `#password` reader method; the validation will call
   this to check the attribute. Again, validations can check more than just
   database columns; you can apply a validation to any attribute.

2. It also adds `allow_nil: true`. This means the validation will pass if
   `@password` is `nil`. This is desirable because the `@password` attribute is
  set **only if you change the password with `#password=`.** Observe:

   ```ruby
   [1] pry(main)> User.create!(username: 'houdini', password: 'password')
     TRANSACTION (0.9ms)  BEGIN
     User Exists? (0.9ms)  SELECT 1 AS one FROM "users" WHERE "users"."username" = $1 LIMIT $2  [["username", "houdini"], ["LIMIT", 1]]
     User Create (41.5ms)  INSERT INTO "users" ("username", "password_digest", "created_at", "updated_at") VALUES ($1, $2, $3, $4) RETURNING "id"  [["username", "houdini"], ["password_digest", "[FILTERED]"], ["created_at", "2022-06-07 00:15:08.828165"], ["updated_at", "2022-06-07 00:15:08.828165"]]
     TRANSACTION (3.1ms)  COMMIT
   => #<User:0x000000011067f5a0
    id: 4,
    username: "houdini",
    password_digest: "[FILTERED]",
    created_at: Tue, 07 Jun 2022 00:15:08.828165000 UTC +00:00,
    updated_at: Tue, 07 Jun 2022 00:15:08.828165000 UTC +00:00>
   [2] pry(main)> u = User.last
     User Load (40.3ms)  SELECT "users".* FROM "users" ORDER BY "users"."id" DESC LIMIT $1  [["LIMIT", 1]]
   => #<User:0x00000001106e4a68
    id: 4,
    username: "houdini",
    password_digest: "[FILTERED]",
    created_at: Tue, 07 Jun 2022 00:15:08.828165000 UTC +00:00,
    updated_at: Tue, 07 Jun 2022 00:15:08.828165000 UTC +00:00>
   [3] pry(main)> u.password
   => nil
   [4] pry(main)> u.password_digest
   => "$2a$12$rHkbhXIZvqeDVZGhu0y0kebflLpRKlVulETTDTXg3p/WRXzUx.Aly"
   ```

   Notice that the password is no longer set when you fetch `houdini` back from
   the DB. That's because this attribute only lived in an instance variable that
   was never going to get persisted to the DB.

   Let's try one more thing:

   ```ruby
   [5] pry(main)> u.valid?
   => true
   ```

   If you didn't `allow_nil: true`, then `houdini` would be marked as invalid
   because a `password` attribute with a value of `nil` would not meet the
   length requirement. In reality, you only need to validate the password when
   it has been changed, which is exactly when `@password` is not `nil`.

[sign-up-diagram]: https://assets.aaonline.io/fullstack/rails/assets/signup_diagram.png