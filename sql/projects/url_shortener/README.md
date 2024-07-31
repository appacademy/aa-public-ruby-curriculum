# URL Shortener: Part SQL

In this project, you'll build a tool that will take an arbitrarily long URL and
will shorten it for the user. Subsequent users can then give the short URL back
to your tool and be redirected to the original URL. You'll also track
click-throughs since these can be really helpful for business analytics.

URL-shortening apps like this are useful for embedding long URLs in
space-constrained messages like tweets. You can play around with [this
one][short-url] if you'd like to get a feel for how this works.

Unfortunately, you don't know how to build things in the browser yet, so you'll
have to be content with a simple [CLI][what-is-cli] tool, though you can use the
`launchy` gem to pop open the original URL in a browser.

Throughout this project you're going to be navigating through many files. Using
the file tree to navigate will take a long time. To find files quickly, press ⌘P
(Mac) / Ctrl+P (Win) and then type the file name.

[short-url]: https://www.shorturl.at/
[what-is-cli]: https://www.techopedia.com/definition/3337/command-line-interface-cli

## Learning goals

By the end of this project, you should be able to

- Create a new Rails project
- Navigate a Rails project using the keyboard
- Change the database using migrations
- Write both database constraints and model-level validations
- Write associations
- Understand the purpose of adding an index to columns in your database

## Phase 0: Setup

Go ahead and create a new Rails project...

```sh
rails new URLShortener -G -T --database=postgresql --minimal
```

You can grab __.gitattributes__ and __.gitignore__ files from the starter repo
at the `Download Project` button below. Copy them into the root directory of
your project.

In your __Gemfile__, change the `debug` gem to `byebug`. Then add `annotate` and
`pry-rails` to the `:development` section and `bundle install` again.

Create the database with the following command...

```sh
rails db:create
```

You now have a working Rails app with database! You can now run migrations to
add tables to your database.

## Phase I: `User`

In this initial phase of the project you are going to create a User table and
model in your app. You want your users to each have an email associated with
their account. You also want to make sure that when you create a new user, they
always supply an email. Finally, you don't want multiple users registering with
the same email--that wouldn't make sense!--so you should ensure that each user's
email is unique.

The naming of your files is going to be essential. When you refer to an Active
Record model, Rails looks in the __app/models__ folder for a file that is the
`snake_case`-ified version of your model's name. Also, it will, by default,
infer that the name of the table is the pluralized, snake-cased version of your
model. For example, if you had a `GoodStudent` model, Rails would look in the
__app/models__ folder for a file called __good_student.rb__. Upon finding and
loading this file, it would create an instance of the class with data from a
table it assumes to be `good_students`. **If your naming doesn't EXACTLY follow
convention, you're gonna have a bad time.**

### Instructions

Use the Rails migration generator to create a new migration file...

```sh
rails generate migration CreateUsers
```

This will automatically generate a migration that creates the `users` table.
This table needs only one column in addition to the ever-present `t.timestamps`,
and that is `email`. Remember to add a constraint ensuring that it is present.

You will also create an index for the email column in the `users` table. This
will allow you to look up rows in the table much more quickly. In addition to
improving lookup performance, an index will also enable you to enforce the
uniqueness of each value in a column at the database level. You can simply add
`index: { unique: true }` to the options hash passed to your `email` column
creator. (For the alternative `add_index` syntax, see [these
docs][add-index-docs].)

Double check that your migration file syntax is correct and then set up your
database by running your migrations with `rails db:migrate`. When it finishes,
check your __db/schema.rb__. Your `users` table should look like this:

```rb
create_table "users", force: :cascade do |t|
  t.string "email", null: false
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false
  t.index ["email"], name: "index_users_on_email", unique: true
end
```

Next, create a `User` model. No magic to this, just create a __user.rb__ file in
your __app/models__ folder and define the `User` class. Remember that `User`
should inherit from `ApplicationRecord`. Once you have the class skeleton in
place, you can run `bundle exec annotate --models` to import the schema
information to the top of the file.

Add `uniqueness` and `presence` validations for `email`. Without these, people
might go about creating user accounts without emails. Such misbehavior cannot be
tolerated.

[add-index-docs]:
  https://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-add_index

### Recap

You should now have a `users` table and corresponding `User` model. Both your
database and model should require that a user has provided your app with a
unique email. To test that everything is working, try to create a user without
an email in the console (`rails c`). You shouldn't be able to persist that user
to the database! Now create a user with an email and try to persist it again.
This time it should work. Try creating another user with the same email to test
your uniqueness validation.

## Phase II: `ShortenedUrl`

Now it's time to create the table and model that will handle the long URL the
user provides as well as the shortened URLs your app will create. You'll
eventually want to be able to find URLs for a particular user. This means you'll
need to define an Active Record association to manage that relationship. You'll
also want users to be able to type in the short URL and get back the long
version, although your app won't have this functionality right away.

### Instructions

Create a `shortened_urls` table and write a `ShortenedUrl` model. For which
columns in `ShortenedUrl` should you add indexes? Which index should be unique?
Store both the `long_url` and `short_url` as string columns. Also store the id
of the user who submitted the URL.

**N.B.:** `ShortenedUrl` is a model, `shortened_urls` is the table it _models_,
and `short_url` is the string column in the `shortened_urls` table that contains
the actual shortened URL string. Confusing, yes, but this illustrates why good
naming is so important. One bad name will confuse every poor dev who tries to
maintain the code after you.

Along with adding these database level constraints, remember to add `uniqueness`
and `presence` validations on the model level as well.

Once you have written your migration and model, run your migrations and test out
`ShortenedUrl` in the Rails console.

Now it's time to actually shorten a URL for the users. You do this by generating
a random, easy-to-remember code and storing it as the `short_url` in your table.
Then you can search for this record by the `short_url` and get the `long_url`.

You will be generating a random string with `SecureRandom::urlsafe_base64`. In
[Base64 encoding][wiki-base64], a random number with a given byte-length is
generated and returned as a string.

Write a method, `ShortenedUrl::random_code` that uses
`SecureRandom::urlsafe_base64` to generate a random 16-byte string. (**NOTE**:
16 bytes != 16 characters. Eight bits make up one byte, but depending on the
encoding, one character might take up more than one byte).
`SecureRandom::urlsafe_base64` will return a 22 character long string and you'll
use this string for your `short_url` purposes. Handle the vanishingly small
possibility that a code has already been taken: keep generating codes until you
find one that isn't the same as one already stored as the `short_url` of any
record in our table. Return the first unused random code. You may wish to use
the Active Record `exists?` method; look it up :-).

Write an [`after_initialize` callback][after-initialize] that calls
`generate_short_url`, a method you will soon write. `after_initialize` will run
whenever a new instance of `ShortenedUrl` is created or loaded from the
database. You only need to generate a short URL for newly created
`ShortenedUrl`s, however, so make this a [conditional callback]. You may find
[this method][new-record?] helpful.

Once you have set up your callback, write `generate_short_url` as a `private`
method that uses your `random_code` method to assign a `short_url` if the
instance does not yet have one.

Finally, write `submitter` and `submitted_urls` associations on `ShortenedUrl`
and `User`. Remember that Rails will automatically validate the presence of a
`belongs_to` association; once you have written `submitter`, you no longer need
to validate the presence of `submitter_id`.

[wiki-base64]: http://en.wikipedia.org/wiki/Base64
[after-initialize]: https://guides.rubyonrails.org/active_record_callbacks.html#after-initialize-and-after-find
[conditional callback]: https://guides.rubyonrails.org/active_record_callbacks.html#conditional-callbacks
[new-record?]: https://api.rubyonrails.org/classes/ActiveRecord/Persistence.html#method-i-new_record-3F

### Recap

At this point you should have a `shortened_urls` table and a `ShortenedUrl`
model. You also wrote an `after_initialize` callback to generate a unique and
random shortened URL using the `ShortenedUrl::random_code` method.

Go ahead and use the Rails console to create some more `User`s and some
`ShortenedUrl`s. Make sure that each `ShortenedUrl` has a unique and random
`short_url` code. Check that the associations you wrote are working. Calling
`submitter` on a shortened URL should return the submitter for that URL. Calling
`submitted_urls` on a user should return the URLs submitted by that user.

## Phase III: Tracking `Visit`s

In this phase of the project, you want to code the functionality to track how
many times a shortened URL has been visited. You also want to be able to fetch
all of the shortened URLs a user has visited.

To accomplish this, you'll need a `Visit` join table model. You'll use this join
table to link user visits to certain URLs. You'll also add associations
connecting `Visit`, `User`, and `ShortenedUrl`.

### Instructions

First, you'll need to create a `visits` join table in your database. Make a new
migration to create the `visits` table and determine the columns needed. Add
appropriate indexes and constraints. You'll need them later.

Next write the `Visit` join table model with the appropriate validations and
associations.

Now write `visitors` and `visited_urls` associations on `ShortenedUrl` and
`User`. These associations will have to traverse associations in `Visit`. What
kind of association can traverse other associations?

**Important Note**: Because a `User` can visit a `ShortenedUrl` many times,
there are potentially many `Visit` records connecting the same user to the same
shortened URL. Thus, your `ShortenedUrl#visitors` association may repeat the
same user several times, and your `User#visited_urls` association may repeat the
same shortened URL several times. You'll address this soon!

Add the three following methods to the `ShortenedUrl` class:

- `#num_clicks`
- `#num_uniques`
- `#num_recent_uniques`

`ShortenedUrl#num_clicks` should count the number of clicks on a `ShortenedUrl`.

`ShortenedUrl#num_uniques` should determine the number of **distinct** users who
have clicked a link.

How do you do this in Active Record? In addition to your `visits` association,
you will want to:

- Use the [select] method to select just the `user_id` column
- Use the [distinct] method to de-duplicate the `user_id`s so that each user
  counts only once.
- Use the `count` method to count the unique users.

The SQL you want looks like this:

```sql
SELECT
  COUNT(DISTINCT user_id)
FROM
  visits
WHERE
  visits.shortened_url_id = ?
```

Lastly, write `ShortenedUrl#num_recent_uniques`, which should only collect
unique clicks in a recent time period (say, `10.minutes.ago`). This involves
throwing a [where] clause onto your `num_uniques` code.

You probably wrote a `has_many` association that looked like this:

```ruby
class ShortenedUrl < ApplicationRecord
  has_many :visitors,
    through: :visits,
    source: :visitor
end
```

To get this association to return each visitor exactly once, you can add a magic
"scope block" to ask Rails to remove duplicates:

```ruby
class ShortenedUrl < ApplicationRecord
  has_many :visitors,
    Proc.new { distinct }, #<<<
    through: :visits,
    source: :visitor
end
```

This will call `#distinct` on the visitors, returning only unique visitors. (It
is common to write a _lambda_ literal like so `-> { distinct }` rather than
`Proc.new { distinct }` because it is a little shorter.)

Use a `distinct`-ified version of `visitors` to rewrite `num_uniques` simply.
Also, write a `distinct`-ified version of `visited_urls`.

### Recap

Congrats! You should now have a join table and model for visits, linking users
to URLs. With this join table you should have been able to do the following
things:

- Write `visitors` and `visited_urls` Active Record associations connecting
  users to URLs and vice-versa.
- Retrieve the recent unique visits for a particular URL.

Create some entries in your `Visit` join table using `create!`, e.g.,

```rb
user = User.create!(email: 'sennacy@cats.com')
s_url = ShortenedUrl.create!(submitter: user, long_url: 'www.meowmix.com')
Visit.create!(visitor: user, shortened_url: s_url)
```

(Notice the use of your associations!) After checking that your method is
working--make sure a new entry in the `visits` table is created with the correct
information--test out your Active Record associations. Everything should be
working before you move on.

[select]: http://api.rubyonrails.org/classes/ActiveRecord/QueryMethods.html#method-i-select
[distinct]: http://api.rubyonrails.org/classes/ActiveRecord/QueryMethods.html#method-i-distinct
[where]: http://api.rubyonrails.org/classes/ActiveRecord/QueryMethods.html#method-i-where

## Phase IV: A simple CLI

Now you're going to write a very simple command-line interface in __bin/cli__.
You'll write this as a command-line script, so omit the `.rb` extension.
Instead, write `#!/usr/bin/env ruby` on the first line of the file to tell the
command-line interpreter that this is a ruby file. This is known as a
[Shebang][shebang]. You already know how to construct a CLI: you have written
programs that had CLIs using functions like `puts` and `gets.chomp` (Chess,
Minesweeper, etc.).

[shebang]: https://en.wikipedia.org/wiki/Shebang_(Unix)

### Instructions

Your CLI should have the following features:

- Ask the user for their email; find the `User` with this email. (You don't have
  to support users signing up through the CLI.)
- Give the user the option of visiting a shortened URL or creating one.
- When they opt to create a new short URL, create one and show it to them.
- When visiting a shortened URL, use the `launchy` gem to open a URL in the browser; record a visit. (You'll
  need to add `launchy` to your __Gemfile__ and run `bundle install`.)

Remember not to pollute your models with UI code. You should keep all of that in
your CLI script. Suppose you want to write a web version of this program soon.
The CLI interaction logic can't be reused in the web version, but if you
embedded that in your models, this might cause some mysterious behavior in your
web app.

Inside __bin/cli__, construct a `CLI` class that will hold all the methods your
CLI needs. At the bottom of the file (after the class definition), include the
line `CLI.new.run`, where `run` is the main method in your `CLI` class. In
addition to `run`, you will probably want a separate method to log in a user and
one for each of the potential commands the CLI could run, i.e., create a
shortened URL and visit a shortened URL. To open a URL with `launchy`, use the
following syntax:

```rb
Launchy.open(<url_to_open>)
```

Run your script using the `rails runner` command: `rails runner bin/cli`. This
will load the **Rails environment** for you, so you'll be able to use your
classes without requiring them explicitly. Importantly, `rails runner` will also
connect to the DB so you can query tables.

### Recap

In addition to a working web app, you should now have a CLI script that allows
users to interact seamlessly with your app.

Your script should behave something like this:

```sh
~/repos/appacademy/URLShortener$ rails runner bin/cli

Input your email:
> ned@appacademy.io

What do you want to do?
0. Create shortened URL
1. Visit shortened URL
> 0

Type in your long URL
> http://www.appacademy.io

Short URL is: Pm6T7vWIhTWfMzLaT02YHQ
Goodbye!

~/repos/appacademy/URLShortener$ rails runner bin/cli

Input your email:
> ned@appacademy.io

What do you want to do?
0. Create shortened URL
1. Visit shortened URL
> 1

Type in the shortened URL
> Pm6T7vWIhTWfMzLaT02YHQ

Launching http://www.appacademy.io ...
Goodbye!

~/repos/appacademy/URLShortener$ rails c
Loading development environment (Rails 3.2.11)
1.9.3-p448 :001 > ShortenedUrl.find_by(short_url: "Pm6T7vWIhTWfMzLaT02YHQ").visits
  ShortenedUrl Load (0.1ms)  SELECT "shortened_urls".* FROM "shortened_urls" WHERE "shortened_urls"."short_url" = 'Pm6T7vWIhTWfMzLaT02YHQ' LIMIT 1
  Visit Load (0.1ms)  SELECT "visits".* FROM "visits" WHERE "visits"."shortened_url_id" = 1
 => [#<Visit id: 1, user_id: 1, shortened_url_id: 1, created_at: "2013-08-18 19:15:55", updated_at: "2013-08-18 19:15:55">]
```

Test that your CLI works! You should be able to log in as well as create and
visit shortened URLs. (Make sure you create the users in the Rails console
before trying to log in!)

## Phase V: `TagTopic` and `Tagging`

In this phase you'll allow users to choose a set of predefined `TagTopic`s for
links (news, music, sports, etc.). Since the relationship between `TagTopic`s
and `ShortenedUrl`s is many-to-many, you'll also need to create a join table and
model, `Tagging`s.

### Instructions

Before starting, think over with your pair what columns should be indexed. In
particular, think about how you can make sure that no tag can be applied to a
given shortened URL more than once. Create the tables and models with the
appropriate nullity and uniqueness constraints/validations. Seed your database
with some `TagTopic`s and `Tagging`s.

Once you have your table and model set up, define a `tag_topics` association on
the `ShortenedUrl` model. `tag_topics` should return all of the tag topics for a
given URL.

Now write a method `TagTopic#popular_links` that returns the 5 most visited
links for that `TagTopic` along with the number of times each link has been
clicked.

Don't worry about updating your CLI so users can add a `TagTopic` to a new URL.
Just make sure that you can create working `TagTopic` objects and view the most
popular links for a tag in the console.

### Recap

At this point you should have added a table and model for `TagTopic` and
`Tagging` with the appropriate associations. Test that your new associations and
`TagTopic#popular_links` method are working in the console.

## Phase VI: Custom validations

Now you're going to write a series of [custom validations][custom-validations]
to manage how your users submit URLs to your application. First, you're going to
prevent users from submitting more than 5 URLs in a single minute. Then you're
going to monetize your app by limiting the number of total URLs non-premium
users can submit to 5.

### Instructions

First, write a custom validation method `ShortenedUrl#no_spamming` that prevents
users from submitting more than 5 URLs in a single minute. Remember to provide
an informative error message if the validation fails.

Now add a custom validation method `ShortenedUrl#nonpremium_max`. To do this,
you'll first have to add a `premium` boolean column to your `users` table. This
column should default to `false` unless a boolean is given.

### Recap

You've now written two custom validations. To test your anti-spamming
validation, try to create more than 5 URLs in the console for one user in under
a minute. If your method is working correctly you shouldn't be able to! Now test
that non-premium users cannot create more than 5 total URLs. Once everything is
working move on to the next step!

[custom-validations]: https://guides.rubyonrails.org/active_record_validations.html#custom-methods

## Phase VII: Pruning stale URLs

You don't want your app to store URLs indefinitely, so in this phase you're
going to remove URLs from the database that haven't been visited for a given
period of time.

### Instructions

Write a `ShortenedUrl::prune` method that deletes any shortened URLs that have
not been created or visited in the last (n) minutes. (Note that shortened URLs
created in the last n minutes should be preserved **even if they have not yet
been visited**.) Make sure `ShortenedUrl::prune` fires only a single query. Use
the following code snippet in `rails console` to make sure your `prune` method
is working as hoped.

```ruby
u1 = User.create!(email: 'jefferson@cats.com', premium: true)
u2 = User.create!(email: 'muenster@cats.com')

su1 = ShortenedUrl.create!(submitter: u1, long_url: 'www.boxes.com')
su2 = ShortenedUrl.create!(submitter: u2, long_url: 'www.meowmix.com')
su3 = ShortenedUrl.create!(submitter: u2, long_url: 'www.smallrodents.com')
su4 = ShortenedUrl.create!(submitter: u1, long_url: 'www.catnip.com')

# Note: You can assign the ids explicitly (`v1`) or you can assign them
# implicitly by assigning the associations (`v2`).
v1 = Visit.create!(user_id: u1.id, shortened_url_id: su1.id)
v2 = Visit.create!(visitor: u1, shortened_url: su2)

ShortenedUrl.all # should return su1, su2, su3, and su4
ShortenedUrl.prune(10)
ShortenedUrl.all # should return su1, su2, su3, and su4

# wait at least one minute
v3 = Visit.create!(visitor: u2, shortened_url: su3)
ShortenedUrl.prune(1)
ShortenedUrl.all # should return only su3
```

Once you have `ShortenedUrl::prune` working, check out Active Record's
[dependent: :destroy][destroy] for associations and use it to destroy the visits
and taggings that belong to old shortened URLs. Once you have tested that your
taggings and visits are being deleted, write a [rake task][rake-tutorial] to
automate this process. Finally, adjust `ShortenedUrl::prune` so that URLs
submitted by premium users are not pruned.

### Recap

You should now have an automated prune method that removes URLs submitted by
non-premium users after a given period of time. To test this create a number of
URLs as a non-premium user. Are these URLs eventually removed from the database?
They should be!

[destroy]: http://guides.rubyonrails.org/association_basics.html#has-many-association-reference
[count-distinct-docs]: http://api.rubyonrails.org/classes/ActiveRecord/Calculations.html#method-i-count
[rake-tutorial]: http://tutorials.jumpstartlab.com/topics/systems/automation.html