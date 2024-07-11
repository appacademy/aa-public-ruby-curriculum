# `has_secure_password`

[`has_secure_password`] is an Active Record macro method that automatically
generates many of the password-related authentication methods you've written by
hand in the past.

## Adding `has_secure_password`

Typically, you'd include a call to this macro in your `User` model, like so:

```rb
# app/models/user.rb

class User < ApplicationRecord
  has_secure_password
end
```

There are two criteria, however, that you must satisfy to use this macro:

1. You must have a `password_digest` string or text column defined in the table
   for whichever model uses `has_secure_password`--the `users` table, typically.

   ```rb
   # db/migrations/<UTC timestamp>_create_users.rb

   class CreateUsers < ActiveRecord::Migration[7.0]
     def change
       create_table :users do |t|
         # ... other columns ...
         t.string :password_digest, null: false
       end
     end
   end
   ```

2. You must include `bcrypt` in your Gemfile at the top level--don't forget to
   `bundle install`!

   ```rb
   # Gemfile
   
   # ... 
   gem "bcrypt"
   # ... 
   ```

## What `has_secure_password` defines

Specifically, `has_secure_password` defines:

1. A `#password=` setter, which gets called when you pass a key of `password` to
   `User.new` or `User.create`. It takes in a plaintext password, hashes it
   using `bcrypt`, stores the hashed version in `password_digest` to be saved to
   the database, and stores the plaintext version in-memory in `@password` for
   use in validations.
2. A `#password` getter, which is used by `password` validations.
3. `#authenticate`, which takes in a plaintext password and uses `bcrypt` to
   check if it matches the user's `password_digest`. It returns the `User`
   instance itself when the password is correct, `false` otherwise.
4. A `presence: true` validation for `password_digest`. Note that if you fail
   this validation, Rails will list the failing attribute as `password`, but
   rest assured: it is in fact the `password_digest` attribute that is checked
   for presence.

So, just by including `has_secure_password` in your `User` model, you can do the
following:

```rb
# Uses the `#password=` setter to create `@password` and `password_digest`
u = User.new(password: "starwars")

p u.password                 # => "starwars"
p u.password_digest          # => "<hashed password>"

p u.authenticate("startrek") # => false
p u.authenticate("starwars") # => `u` User instance

p u.valid?                   # => true (assuming no other validations fail)
p User.new.valid?            # => false ('Password can't be blank')
```

> _Note:_ `has_secure_password` _doesn't_ include a `length` validation for
> `password`, nor does it include anything related to `session_token`. While a
> convenience, do not assume using this macro means you've covered all of your
> user authentication bases!

[`has_secure_password`]: https://api.rubyonrails.org/classes/ActiveModel/SecurePassword/ClassMethods.html 
