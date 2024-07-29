# Art Share API Part 2

**Make sure to finish Phases I - III before continuing!**

Before starting Phase IV, go through and add an `inverse_of` option to any
associations where it is needed:

* any `has_many` that involves a `foreign_key` option on either side of the
  association
* any `belongs_to` on a join model that is used in a `has_many :through`
  association

Be sure to continue adding `inverse_of` to any new associations that you write
today when it is appropriate!

## Phase IV: Comments

Now it's time to add commenting functionality to your application so your users
can comment on a piece of artwork. By the time you're done, you want to be able
to retrieve both a specific user's comments as well as comments left on a
specific artwork. To do this, you'll have your `CommentsController#index` method
return comments based on the params provided by the request.

### Instructions

First create a `comments` table that has a foreign key for both author and
artwork. You'll also want a `body` column that contains the text of the
comment. On what columns should you add an index?

Your users and artworks will both `have_many` comments. A comment should
`belong_to` an author (the user who left that comment) and artwork. Write
these associations now. Remember to include `dependent: :destroy` when
necessary. For instance, when an artwork or user is removed from the
database, you don't want their associated comments to persist.

Before moving on test that these associations work.

Once you know that your table and model have been set up correctly, it's time
to make your controller. The `CommentsController` should have `create`,
`destroy`, and `index` actions.

In order to retrieve comments for an artwork or a user, you want your `index`
action to handle some additional params. In particular, you want to be able to
pass in a `user_id` or an `artwork_id`. By checking if either is present, you
can then retrieve the comments just for that user or artwork. Update your
`comment_params` accordingly.

### Recap

It should now be possible to make `GET` requests to `CommentsController#index`
and, depending on the params provided, return either comments made by a
particular user or comments made on a particular piece of artwork.

## Phase V: Search

Next add search functionality to your application so users can search for other
users by name. To do this, you won't need to change any routes. You can just
edit the `index` action in your `User` controller.

In `UsersController#index` check if a `query` is present in the request params.
If it is, use that query to filter the users returned by the `index` action. If
there is no query, just return all users as usual.

Discuss with your partner the best way to write your query method. Here's a
[good place to start][postgres-search].

## Bonus Phase I: Likes

In this phase you'll implement likes using polymorphic associations. Users
should be able to like both comments and artworks. Read these [Rails
docs][polymorphic-associations] on polymorphic associations to get started.

Then discuss with your partner how you plan to approach this feature. You'd like
to be able to call associations on a user and return their liked comments and
artworks. You also want to be able to call an association on comments and
artworks to get the users who have liked them.

Hint: You can declare a column of type `references` to be polymorphic from a
model generator like this:

```sh
rails g model Like liker:references likeable:references{polymorphic}
```

You'll notice that the generator does not add a `foreign_key` constraint to the
polymorphic reference. A polymorphic reference's ability to point to more than
one table means that you cannot assign it a `foreign_key` constraint.

## Bonus Phase II: Favorite Artworks

Allow users to "favorite" artworks. This will require additional columns to
artworks (for favoriting of artworks by their owner) and shared artworks (for
favoriting of artworks shared to a user). Use a semantic custom route to
accomplish this. [Hint.][more-restful-actions]

## Bonus Phase III: Artwork Collections

Finally, users should be able to add artworks to artwork collections. Allow
each user to have many collections. Artworks can also belong to more than one
collection. What sort of table will you need to make this work?

[postgres-search]: https://www.postgresql.org/docs/current/functions-matching.html
[polymorphic-associations]: http://guides.rubyonrails.org/association_basics.html#polymorphic-associations
[more-restful-actions]: http://guides.rubyonrails.org/v7.0.3/routing.html#adding-more-restful-actions
