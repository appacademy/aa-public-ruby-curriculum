# Art Share API, Part 1

You're going to continue building on the API you built in the First Routes
project. Your goal is to build an application to store, share, and comment on
artwork, as well as search for users.

Each user has a set of artworks that they own/control. These artworks can also
be shared with other users. An artwork that has been shared with one or more
other users will be visible to those users, but the artwork still 'belongs to'
the original user.

Although you will maintain this conceptual distinction between a user's own
artworks vs. the artworks that have been shared with that user, you will
eventually write an index method that will combine both types of a user's
viewable artworks together so that you can see any art made by or shared with
that user.

## Learning goals

By the end of this practice, you should be able to

- Write Active Record models quickly
- Write a private `xxxx_params` helper method
- Write the five API RESTful controller actions
- Test your API endpoints with Postman
- Create and destroy join table records via controller actions
- Create and use a nested route

## Phase I: Data layer

You almost always start with the data layer when you're thinking about adding
functionality. Questions to consider include the following: What pieces of data
are necessary to implement the functionality you need? What changes need to be
made to the database schema? What models do you need? What associations and
validations?

In this first phase you're going to add the tables for users, artworks, and
artwork shares. You are also going to write validations and associations linking
them.

### Instructions

#### User

For the `users` table you should have `name` and `email` columns from the First
Routes project. Change your `User` model so that you have only one column:
`username`. Write new migrations to accomplish this change. Enforce presence and
uniqueness of `username` at both Active Record and DB levels.

After you create each table and model below, make sure to test that your
associations and validations are working before moving on to the next step. You
want to be **_absolutely sure_** your code is working before you leave a phase;
otherwise building your API endpoints will be needlessly complicated.

#### Artwork

For your `artworks` table you should have the following columns: `title`,
`image_url`, and `artist_id`. All of these should be present, and you should
ensure that the `image_url` is unique. Add the appropriate Active Record
validations and DB constraints. Also add an index on `artist_id` so that you can
quickly get all the artworks for a given artist.

Ensure that a **single user** cannot have two artworks with the same title. Two
different users, however, can have artworks with the same title. In other words,
two separate artists could both have artworks of their own named "Untitled", but
a single artist should not be able to have two pieces with that same title.

This means that the `artist_id` and `title` **combination** must be unique.
Enforce this at the DB and model levels. Here's some help for the [model
validation][scoped-uniqueness]. To add the DB constraint, consider using a
`unique` constraint on a composite index. (Make sure that you don't add
unnecessary indexes. You should be able to accomplish everything in these
instructions using only two indexes total on your `artworks` table.)

Finally, add associations between `User` and `Artwork`. The association from
`Artwork` to `User` should be called `artist`. Note that your column in the
`artworks` table does not have to be `user_id` despite being a foreign key to
the `users` table. In this case, `artist_id` is much more descriptive and
therefore preferable.

[scoped-uniqueness]:
  http://guides.rubyonrails.org/active_record_validations.html#uniqueness

#### ArtworkShare

The `artwork_shares` table is a join table. Its whole purpose is to link a
`User` (the person viewing the artwork) with an `Artwork`.

You'll need `artwork_id` and `viewer_id` columns. Again, whenever possible,
prefer columns names that are more semantic (i.e., more descriptive of the
relationship).

Ensure that both columns are present. Add the necessary validations /
constraints. Ensure that a user cannot have a single artwork shared with them
more than once. Also, add indexes to `ArtworkShare`'s foreign key columns for
fast lookup, again making sure not to duplicate any indexes.

**N.B.**: You almost always want to create indexes for foreign keys,
particularly if those foreign keys will be used in a `has_many` or a `has_one`
relationship. This is why the `references` column type includes an index by
default.

Add an association connecting an `ArtworkShare` to an `Artwork`. Add another
association that will connect an `ArtworkShare` to a `User` (name this
association `viewer`).

Next, utilize the `ArtworkShare` join table to connect an `Artwork` to the
`User`s that it has been shared with. The `shared_viewers` association on
`Artwork` should connect to `User`s `through` the `ArtworkShare` model.
`Artwork#shared_viewers` should return the set of users with whom an artwork has
been shared.

Finally, create a similar association that will connect a `User` to the
`Artwork`s that have been shared with them. The `shared_artworks` association on
the `User` should connect to `Artwork`s `through` the `ArtworkShare` model. This
`User#shared_artworks` association should return the set of artworks that have
been shared with that user, **not** the set of artworks that a user has shared
with others.

### Recap

You should now have tables and models for `User`, `Artwork`, and `ArtworkShare`,
as well as the relevant validations and associations.

If you haven't already, now would be a good time to create some seed data in
your __seeds.rb__ file. This is easier than creating seed data in the Rails
console and, should you ever drop your database, will provide an easy way to
re-populate your tables with testable data.

## Phase II: Users and Artworks API

You'll handle the API layer next. The API describes how you will **expose** your
data and specifies how the outside world can interact with it. Today you'll be
using the Postman web app to test your API endpoints. When debugging make sure
to reference your Rails server log. It will provide you will valuable insight if
anything goes wrong.

### Instructions

First, make sure the `User` controller actions you created in the previous
project are all working. They should do the following:

- `user_params` helper method  
  This method should be private. It requires the key `:user` in params and
  permits each of the user attributes as keys in the nested hash.

  - Update the permitted attributes to reflect the changes you made to the
    `User` model.  

- `create` (POST `/users`)  
  This action should use `user_params` to create a new `User` and `if user.save`
  to check if validations passed. On error, it should render validation errors
  using `user.errors.full_messages` and set the status code to
  `unprocessable_entity` (or `422`).  

  - (Optional) You could add a status of `:created` when rendering the new user.

- `destroy` (DELETE `/users/:id`)  
  This action should use the id in `params[:id]` to find the user and delete it
  from the database by calling the [`destroy`] method on the user instance. Best
  practice is then to render the destroyed user.

  - Add `dependent: :destroy` to the `artworks` and `artwork_shares`
    associations on `User` to ensure that the associated records will also be
    destroyed.  
  
    **N.B.**: There is another Active Record method that removes objects from
    your database, `delete`. This method, however, does not run callbacks such
    as `dependent: :destroy` and is therefore **not** the method you want to
    use.

- `index` (GET `/users`)  
  This action should render all the users in the database.

- `show` (GET `/users/:id`)  
  This action should render a single user, using the id in `params[:id]`.

- `update` (PATCH `/users/:id`)  
  This action should find the requested user, then use `update` with
  `user_params` to do a mass-assignment update and save. It should render
  validation errors using `user.errors.full_messages`. _Don't forget the status
  code!_

Now move to the __routes.rb__ file. You should already have routes for the
`users` controller from the previous project. Do the following:

- Comment out the individually-specified `users` routes.
- Use `resources` with the `only:` option to restrict the available `users`
  routes to the five actions listed above.

Check your work by running `rails routes` in the terminal. You should see six
routes in total. (Remember that Rails will generate both `patch` and `put`
routes for the `update` action.)

Next, create the `ArtworksController`. Build the same five actions and params
helper method. Your code will look very similar, but practice this a second
time.

> **Hint**: For this project, do not write any authentication or authorization
> logic. When creating a new `Artwork`, require that the uploader submits their
> `artist_id`. This isn't secure because anyone could always take your
> `artist_id` and upload new artworks in your name. For now, however, assume the
> users of your service aren't malicious. :-)

When you finish with the controller, go back to the __routes.rb__ file and add
routes for those five `artworks` actions, just like you did for `users`.

### Recap

Congratulations! You should now have tables, models, controllers, and routes for
users and artworks. Before moving on, test that your API endpoints are working
with Postman. Then call over an instructor and explain your code.

## Phase III: Sharing `Artworks`

Now you're going to add routes and controllers for your `ArtworkShares`. The
`artwork_shares` table is a join table, so while RESTful design patterns still
apply, your `ArtworkShares` controller will look a little different from the
controllers you just wrote. All you need to be able to do is share and unshare
artworks. What controller actions do you think you'll need?

Once you have sharing working, you'll refactor `ArtworksController#index` so
that it returns artworks either belonging to or shared with a particular user.
In order to make this work you'll need to pass in the `user_id` to your `index`
action so you can filter for the appropriate works.

### Instructions

Add new `resources` routes and a controller for `ArtworkShare`. Include the
following actions and associated routes.

- `create` (POST `/artwork_shares`)  
  You'll want to pass the `artwork_id` and the `viewer_id`. Use strong
  parameters to access these values by writing an `artwork_share_params` helper
  method that will filter out any parameter that is not an appropriate
  `ArtworkShare` attribute.

- `destroy` (DELETE `/artwork_shares/:id`)  
  This un-shares an `Artwork` with a `User`. To delete a share, the user should
  issue a DELETE to `/artwork_shares/123`, where `123` is the `id` of the
  `ArtworkShare` to destroy.

After you create an `ArtworkShare` record, you will want to return the record to
the client. Do the same thing upon deletion of an `ArtworkShare` record. In
other words, both of these routes should conventionally render the
created/destroyed `ArtworkShare` as the response.

You won't need any other `artwork_shares` routes, so use `only:` to restrict
them.

Use Postman to make sure that your controller's `create` and `destroy` actions
work properly. Remember, your validations should prevent us from sharing the
same artwork with the same user more than once.

#### User's Artworks: Nested routes

You want to be able to fetch the artworks of a particular user. Right now,
however, a GET to `/artworks` returns all of the artworks in the system.

Add a new, nested resource, `/users/:user_id/artworks`, so that you can get the
artworks for a given user. You'll only need the `index` action for this. (If you
need help setting up a nested route, see the [Rails guides][nested-routes].)

You may remove the `index` action from the top-level `artworks` resource. This
will modify your API so that users can't download all the artworks in the system
at one time; they will be able to download artworks only on a per-user basis.
For example, they could get user 1's artworks through `GET /users/1/artworks`,
user 2's through `GET /users/2/artworks`, and so on.

The nested resource will still hit `ArtworksController#index`. Rewrite this
`index` action to return:

- The artworks owned by a user  
**AND**  
- The artworks shared with the user

Implementing this functionality requires a more complex database query, but you
want to keep your controllers lean; the logic required for complex queries
belongs more with the model. Accordingly, to implement this query, write an
`artworks_for_user_id` class method in your `Artwork` model that you can then
call from your controller, passing in the specified user's id. (You can access
the specified user's id in the controller through `params[:user_id]` because
`:user_id` is part of the nested route.)

Use Postman to make sure your modified `index` action in the
`ArtworksController` returns all artworks owned by or shared with a user.

### Recap

At this point in the project you should be able to create `ArtworkShares` with
Postman. Artworks shared with a particular user should also be included in data
returned by a `GET` request to `ArtworksController#index`.

## Head to Part 2!

[`destroy`]: https://guides.rubyonrails.org/active_record_basics.html#delete
[nested-routes]: https://guides.rubyonrails.org/routing.html#nested-resources
