# Jbuilder Exercises

To get started, download this [skeleton][jbuilder-zip]. Run `bundle install`,
then run `bundle exec rails db:setup`. To get the test database setup correctly,
run `bundle exec rails db:seed RAILS_ENV=test --trace`.

Once you're set up, run the specs using `bundle exec rspec spec`. These are
testing whether our API is sending the correct information. We're going to be
writing some Jbuilder templates to make them pass.

The first thing we need to do is set up our routes. All of our controllers are
defined under the `Api` namespace (have a look through the controllers, noting
the class name), so we need to specify that in our routes as well. We're only
testing `show` and `index` today. For gifts, nest the `index` route under the
guests resource. Use the below as a guide for the formatting:

```ruby
namespace :api, defaults: { format: :json } do
  # Your routes here
end
```

Run `rails routes` to ensure this is working as intended.

Keep open and use the [Jbuilder docs][docs-link] for reference as you work
through this.

A few notes before we begin:

- First, we can run any ruby code we want in a Jbuilder template, including
  conditionals. This ends up being really helpful when, for example, we only
  want to send certain user data if the user requesting it is logged in.

- Second, we can build Jbuilder partials as we did with HTML and ERB and render
  them using `json.partial!` in our templates.

- Last, we can nest our data by opening blocks for a given key in our object.
  For example,

```ruby
json.author do
  json.name @message.creator.name.familiar
  json.email_address @message.creator.email_address_with_name
  json.url url_for(@message.creator, format: :json)
end
```

yields:

```json
 "author": {
    "name": "David H.",
    "email_address": "'David Heinemeier Hansson' <david@heinemeierhansson.com>",
    "url": "http://example.com/users/1-david.json"
  }
```

Note the nested object, and the use of associations (`@message.creator`) and
view helpers (`url_for`).

Let's make some templates! Start by making a `show.json.jbuilder` view for your
guest resource. Use `json.extract!` to include the guest's name, age, and
favorite color. Make sure you don't include `created_at` or `updated_at`. Test
by running the specs but also by visiting the url directly (e,g.
'api/guests/1'). If you don't have a JSON formatter installed, I recommend [this
one][formatter-link].

Once you have it working, go ahead and create an index view. For this, use
`json.array!` and pass @guests. Use a block to specify what you want to render
for each guest. This time, don't use `json.extract!` --- instead, specify each
component individually. For example:

```ruby
#...
  json.name guest.name
  json.age ...
#...
```

It's good to get familiar with both methods. Since our two templates do very
similar things, let's go ahead and refactor the single guest details into a
partial. The naming convention for the partial itself is the same as for HTML
views, e,g. `_guest.json.jbuilder`. Make sure to include 'api/' in your partial
path.

Next, let's add some associated data. We want to see gifts for individual
guests, but not when we're looking at all guests (this may be too much data). In
your show view, render a guest's gifts. Only include the title and description.
**NB:** Using `json.array!` at the top level here will cause our other guest
information to break. Nest your data by passing it as an argument to
`json.gifts`.

Time to do some on your own. Make both a gift show and guest gift index view.
Get the specs to pass.

Next, make the party show and index views. In the index view, show all parties,
and include all of their guests. In the show view, include not only all guests,
but all of the guests' gifts as well.

In writing these views, you've probably generated some gnarly N+1 queries. Are
you calling `.gifts` for every guest in the parties show view? That's a query
for every guest! To fix this, remember back to our Active Record skills.
`.includes` pre-fetches whatever data we tell it. For example, in the
`PartiesController#show`, we could call `.includes(guests: [:gifts])`; then,
when we call `.gifts` on each guest in our Jbuilder template, we will use that
pre-fetched data and don't actually have to hit the database again.

Find any other N+1 queries you've made throughout and defeat them. _Hint:_ play
around with your API in development and watch your server logs. Look for a query
followed by many repetitive queries. E.g., with the parties show view, before we
fixed the N+1 query, our server logs would have looked something like this:

```shell
Started GET "/api/parties/1" for 127.0.0.1 at 2017-07-15 15:44:05 -0700
Processing by Api::PartiesController#show as JSON
  Parameters: {"id"=>"1"}
  Party Load (0.6ms)  SELECT  "parties".* FROM "parties" WHERE "parties"."id" = $1 LIMIT $2  [["id", 1], ["LIMIT", 1]]
  Rendering api/parties/show.json.jbuilder
  Guest Load (1.1ms)  SELECT "guests".* FROM "guests" INNER JOIN "invitations" ON "guests"."id" = "invitations"."guest_id" WHERE "invitations"."party_id" = $1  [["party_id", 1]]
  Gift Load (0.5ms)  SELECT "gifts".* FROM "gifts" WHERE "gifts"."guest_id" = $1  [["guest_id", 1]]
  Gift Load (0.6ms)  SELECT "gifts".* FROM "gifts" WHERE "gifts"."guest_id" = $1  [["guest_id", 2]]
  Gift Load (0.6ms)  SELECT "gifts".* FROM "gifts" WHERE "gifts"."guest_id" = $1  [["guest_id", 3]]
  Gift Load (0.8ms)  SELECT "gifts".* FROM "gifts" WHERE "gifts"."guest_id" = $1  [["guest_id", 4]]
  Gift Load (0.9ms)  SELECT "gifts".* FROM "gifts" WHERE "gifts"."guest_id" = $1  [["guest_id", 5]]
  Rendered api/parties/show.json.jbuilder (105.9ms)
Completed 200 OK in 140ms (Views: 113.5ms | ActiveRecord: 5.0ms)
```

See all those Gift Loads? Those are the N queries to accompany our 1 query for
the party and 1 query for the guests.

When it's fixed, it should look more like this:

```sh
Started GET "/api/parties/1" for 127.0.0.1 at 2017-07-15 15:41:25 -0700
   (1.7ms)  SELECT "schema_migrations"."version" FROM "schema_migrations" ORDER BY "schema_migrations"."version" ASC
Processing by Api::PartiesController#show as JSON
  Parameters: {"id"=>"1"}
  Party Load (1.7ms)  SELECT  "parties".* FROM "parties" WHERE "parties"."id" = $1 LIMIT $2  [["id", 1], ["LIMIT", 1]]
  Invitation Load (1.3ms)  SELECT "invitations".* FROM "invitations" WHERE "invitations"."party_id" = 1
  Guest Load (1.5ms)  SELECT "guests".* FROM "guests" WHERE "guests"."id" IN (1, 2, 3, 4, 5)
  Gift Load (1.0ms)  SELECT "gifts".* FROM "gifts" WHERE "gifts"."guest_id" IN (1, 2, 3, 4, 5)
  Rendering api/parties/show.json.jbuilder
  Rendered api/parties/show.json.jbuilder (9.2ms)
Completed 200 OK in 233ms (Views: 28.4ms | ActiveRecord: 47.0ms)
```

Only one query per table! That's what we want to see.

## Bonus!

To run the bonus specs, simply go to the bonus spec file and remove the line
`before { pending('Bonus') }`.

Change your guest index view to only show guests who are between 40 and 50 years
old. Normally we would always do this kind of selection using Active Record, but
this gives us an opportunity to practice using Ruby in Jbuilder.

[jbuilder-zip]:
  https://assets.aaonline.io/fullstack/react/projects/jbuilder/skeleton.zip?
[formatter-link]:
  https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en
[docs-link]: https://github.com/rails/jbuilder
