# Reddit On Rails (Phases IV-VI)

* [Project Demo]
* [Actual Reddit]

[Project Demo]: https://aa-reddit-app.herokuapp.com/
[Actual Reddit]: https://www.reddit.com

## Phase IV: `Comment`

Users should be allowed to write a `Comment`. There are two kinds of comments:

* Top-level comments that are in direct response to the `Post`
* Nested comments that respond to a `Comment`

Start by focusing on top-level comments. Write a `Comment` model with:

* A `body` attribute
* An `author` association
* A `post` association

Create `CommentsController` and a top-level `create` route. Also create a `new`
route nested under `posts` (should look like: `/posts/:post_id/comments/new`).
These are the only two comment routes you need so far.

Edit your `PostsController#show` view to provide a link to a comment form and to
display top-level comments.

### Nested comments

Start allowing nested comments. To do this, add a self-referencing foreign
key `parent_comment_id` to `Comment`. Top-level comments will have a `NULL`
`parent_comment_id`, but nested comments should store a reference to their
parent. **Nested-comments should still store a `post_id`, even though this may
seem redundant**; you'll see why later. Write a `Comment#child_comments`
association. Write a `Post#comments` association.

Note that Rails automatically validates `belongs_to` associations, so
you'll need to pass `optional: true` when you want to allow for `nil` foreign
keys.

On your `PostsController#show` page, for each top level comment, add a link to
the `show` page of the comment (e.g., to `/comments/123`). You can find top
level comments like so: `@post.comments.where(parent_comment_id: nil)`.

Even though the comment is visible on the `Post` `show` page, add a link to a
`Comment` `show` page at `/comments/123`. This page will give you a good place
to show not only the specific comment, but also a form to reply to this comment.
To repeat, this is how you're going to support nested replies: the user clicks a
link to the comment show page, which has a form to write the nested reply.

On the `Comment` show page, have a form that, when posted, will create the
**nested** comment. This is in addition to your comment form on the `Post`
`show` page at `/posts/456`, which makes new **top-level** comments. Both forms
should post to `/comments`.

Update your `PostsController#show` to display nested comments too. Use nested
`ul` tags to make the parent-child relationship obvious.

Build a `_comment` partial to display a `comment` and have the partial
iterate through the `#child_comments`, recursively rendering the partial for
each nested comment.

**This is an N+1 query approach**. This approach will first query all top-level
comments with `Post#top_level_comments`. Then, for each top-level `Comment`, the
partial will call `child_comments` to get the second-level comments. For each
second-level comment, the recursive partial call will call `child_comments`
again to get the third-level comments...

`Comment#child_comments` gets called once per comment, so this is N+1.

**You'll fix this soon**, but get the N+1 way working first!

## Phase V: Comments Without N+1 Queries

Instead of fetching comments over-and-over again, you can fetch **all** the
comments you'll need at once by writing a plain `Post#comments` association.
This includes both top-level comments and all the nested comments.

Fetching all the comments this way creates some difficulty because it doesn't
organize the comments in an easy-to-access parent-child relationship. Have the
`PostsController#show` fetch all the comments for a post and store them in an
instance variable `@all_comments`. In the view, iterate through `@all_comments`
and skip those where `parent_comment_id IS NOT NULL`; render the `_comment`
partial only for the top-level comments.

The `_comment` partial renders a comment (let's call it `c1`). It should display
the `c1.body`, `c1.author.username`, and `c1.created_at`. As before, it needs
to display the comments that are replying to `c1`. Previously, you wrote
`c1.comments` to get these second-level comments. However, that would trigger a
second query.

You've already fetched the second-level comments (along with many others) and
stored them in `@all_comments`. So instead of calling `c1.comments`, do an
`@all_comments.each do |c2|` and recursively render the `_comment` partial
**only** when `c2.parent_comment_id == c1.id`. Because `@all_comments` contains
all the comments for the `Post` at every level, you won't miss any of
`c1#child_comments`.

One quick note: calling `comment#author` repeatedly will also trigger an N+1
query, so use `includes(:author)` when fetching `@all_comments`.

## Phase VI: Even Faster Comments

For each comment, to find all child comments, our approach iterates through the
entire `@all_comments` array. This approach is slow:

* Say there are 1000 comments overall.
* For each of the 1000 comments `c1`, you'll iterate through all 1000 comments,
  checking `c1.id == c2.parent_comment_id` each time.
* This is a total of `1000 * 1000 == 1MM` comparisons.

This is an `O(n**2)` algorithm. The time it takes to render the comments will
grow proportional to the square of the number of comments. You can change the
approach to an `O(n)` algorithm where the time to render comments grows linearly
with the total number of comments.

The obvious waste of the former approach is that you iterate through
`@all_comments` repeatedly to find child comments. Instead, after fetching all
the comments for a post, write a method `Post#comments_by_parent_id` which
returns a **hash** of comments, where the keys are parent comment ids, and the
values are children comments:

```ruby
post.comments
# => [
#   { id: 1, parent_comment_id: nil, body: "top-level-1" },
#   { id: 2, parent_comment_id: nil, body: "top-level-2" },
#   { id: 3, parent_comment_id: 1, body: "nested-1" },
#   { id: 4, parent_comment_id: 3, body: "nested-2" },
#   { id: 5, parent_comment_id: 3, body: "nested-3" }
# ]

@comments_by_parent_id = post.comments_by_parent_id
# => {
#   nil => [
#     { id: 1, parent_comment_id: nil, body: "top-level-1" },
#     { id: 2, parent_comment_id: nil, body: "top-level-2" }
#   ],
#
#   1 => [
#     { id: 3, parent_comment_id: 1, body: "nested-1" }
#   ],
#
#   3 => [
#     { id: 4, parent_comment_id: 3, body: "nested-2" },
#     { id: 5, parent_comment_id: 3, body: "nested-3" }
#   ]
# }
```

If you have a hash like this, it becomes very fast to find child comments of
`c1`: `@comments_by_parent_id[c1.id]`. It turns out that hash lookup is
insensitive to the size of the hash (it is `O(1)`).

Write `Post#comments_by_parent_id`, call it in the controller and set an
instance variable, then use it in your `_comment` partial.

Next up: [Bonuses](README-bonus.md) for setting up votes and using association scopes!
