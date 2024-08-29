# Reddit On Rails

* [Project Demo]
* [Actual Reddit]

[Project Demo]: https://aa-reddit-app.herokuapp.com/
[Actual Reddit]: https://www.reddit.com

## Learning goals

* Be able to write auth from scratch without looking at previous solutions
* Know how to use a `before_action` to manage user access to resources
* Be able to write Rails models, controllers, and views quickly
* Know when to use regular associations and when to use join tables
* Know how to avoid N+1 queries

## Quick review

This is the last Rails project before building Rails Lite yourself tomorrow.
Take a few minutes to talk through the whole request/response cycle with your
partner before getting started. Feel free to reference this diagram as needed.

[Rails Diagram](https://assets.aaonline.io/fullstack/rails/assets/rails_diagram.png)

## Phase I: Auth

Write a basic Auth implementation (`User`, `UsersController`,
`SessionsController`).

**Do not look at previous days' solutions.  Write Auth from scratch!**  It is
important that you understand how each method works, and how to debug any errors
you may encounter.  

## Phase II: `Sub` and `Post`

A `Sub` is a topic-specific sub-forum to which users submit a `Post`. Start by
writing a `Sub` model and `SubsController`. The `Sub` should have `title` and
(optional) `description` attributes and a `moderator` association. The creator
of the `Sub` is the `moderator`.

Write all the standard seven routes for `SubsController`. You can leave out
`destroy` if you'd like.

Write an `edit` route where the moderator is allowed to update the `title` and
`description`. Use a `before_action` to prohibit non-moderators from editing or
updating the `Sub`.

The point of a `Sub` is for users to share posts. A `Post` should consist of:

* A `title` attribute (required)
* A `url` attribute (optional)
* A `content` attribute for content text (optional)
* A `sub` association to the `Sub` the `Post` is submitted to (required)
* An `author` association

Again, write all the standard `PostsController` actions, except for `index` (the
`subs#show` can list `posts`). (Again, you can skip `destroy`.)

Write `posts#edit` and `posts#update` controller actions (and routes) that only
the `Post` author can use.

## Phase III: Cross-posting to multiple `Sub`s

Allow a `Post` to be posted to multiple subs. This will involve a `PostSub` join
table to describe the many-to-many relationship. Add appropriate DB constraints
and model validations to `PostSub`. Require that a `Post` has at least one
associated sub. Create appropriate associations between `Post`, `PostSub`, and
`Sub`.

Edit your `Post` `new`/`edit` views to allow the user to select multiple subs
via checkboxes.

* Structure your HTML form to upload an array of `sub_ids` nested under `post`
* Update the `PostsController#post_params` to accept an array of `sub_ids`

You should now be able to associate a post with the subs that you select. This
works because the `Post#subs` association gives you a method, `Post#sub_ids=`,
that will automatically create/destroy the necessary entries in the `PostSub`
join table. Recall that Rails will call a setter method for each attribute that
you assign in `Post.new` or `Post#update`, so if one of the keys in your
attributes hash is `sub_ids`, Rails will automatically call `Post#sub_ids=`.

Lastly, make sure your form can be edited. Use the boolean `checked` HTML
attribute.

When you finish, head on to [Phase IV!](README-ph4-6.md)
