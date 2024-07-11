# Checkboxes And ID Setters Reference

You use checkboxes when you want to mark multiple options on a form.

This tutorial will discuss a hypothetical app with `Post` and `Tag` models. When
users create a `Post` via the new post form, you want them to be able to tag
their posts with existing tags. You can accomplish this with a checkbox input
field on your post form where users can check all of the tags that they want a
post to be associated with.

This reading will look at:

* The Rails associations involved.
* Rails ID setters.
* What to add to your controller.
* How to structure your form.

## Associations

First, let's look at the associations involved in your example app.

`Post`s and `Tag`s have a many to many relationship through `Tagging`.
`taggings` is simply the join table between `Post` and `Tag`. You would write
your associations as such:

```ruby
class Post < ApplicationRecord
  has_many :taggings, dependent: :destroy 
  has_many :tags, through: :taggings
end

class Tagging < ApplicationRecord
  validates :tag_id, uniqueness: { scope: :post_id }

  belongs_to :post, inverse_of: :taggings
  belongs_to :tag, inverse_of: :taggings
end

class Tag < ApplicationRecord
  has_many :taggings, dependent: :destroy
  has_many :posts, through: :taggings
end
```

Remember that Rails automatically validates the presence of `belongs_to`
associations. But say you were working in an older codebase using Rails 4,
which doesn't share this behavior. When validating the presence of `Tagging`
fields, **you would have to validate the presence of `post` and `tag` rather than
`post_id` and `tag_id`**. Why? Ultimately, you want to be able to create a
`Tagging` at the same time you create a new `Post`. Since your post won't be saved
to the database yet, it won't have an `id` and validating `post_id` would fail.
Accordingly, validate the existence of a `post` instead.

Also, notice that **the associations for taggings use `dependent:
:destroy` and `inverse_of`**. The `dependent: :destroy` assures that you destroy
taggings when you destroy their associated `Post`. The `inverse_of` allows you to
find the associated `Tag` or `Post` for a tagging in memory, even if it has not
yet been saved to the database. (Otherwise, it would search in the database for
a post where `tagging.post_id == post.id`, but the tagging doesn't have an id assigned
yet!)

## Tagging posts with `Post#tag_ids=`

What if you wanted to tag a `Post` with several `Tags`? You would need to
create a `Tagging` for each unique `Post`/`Tag` combo.

When you define your `has_many :taggings` and `has_many :tags, through :taggings`
on `Post`, Rails provides you with a `Post#tag_ids=` method that takes in an
array of `tag_id`s.

This method does a lot more than meets the eye. It:
  * a.  Creates a new `Tagging` for the post for each new `tag_id`.
  * b.  Destroys existing taggings for that post that are not in the `tag_id`s
        array.

You would call it as such:

```ruby
post = Post.first
post.tag_ids = [1,2,3,4]
```

This creates new `Tagging` objects linking the post to tags with IDs 1, 2, 3,
and 4 and deletes any `Tagging`s for `Tag`s whose ids are not in the array.

You could also pass in an array of tag ids when you create a new post like this:

```ruby
Post.create(text: 'new post', tag_ids: [1,2,3,4])
```

This will simultaneously create a new post along with its associated taggings in
a transaction: If any record fails to save to the database, the entire
transaction will be rolled back.

## Controller

Now that you have your model set up, this is how you would handle a `POST #create`
request to the `PostsController`.

```ruby
class PostsController < ApplicationController
  def create
    @post = Post.new(post_params)

    if @post.save
      redirect_to post_url(@post)
    else
      render :new
    end
  end

  # ...

  private

  def post_params
    params.require(:post).permit(:text, tag_ids: [])
  end
end
```

Looks familiar, with one key difference: `post_params` includes `tag_ids` as a
permitted param, since you'll be passing an array of `tag_ids` from your form.
You also must specify that `tag_ids` permits an array; otherwise, Rails will
assume that you should only permit simple params like strings.

## View

Now for the actual checkboxes! In your new posts form, iterate through each of
the tags and create a checkbox input field with the tag's id as a value.

Your new posts form might look a little like this:

```html
<h1>New Post</h1>

<form action="<%= posts_url %>" method="POST">
  <%= auth_token_helper %>

  <label>Text
    <input type="text" value="<%= @post.text %>" name="post[text]">
  </label>

  <label>Tags</label>

  <input type="hidden" name="post[tag_ids][]" value="">

  <% Tag.all.each do |tag| %>
    <label><%= tag.name %>
      <input
        type="checkbox"
        value="<%= tag.id %>"
        name="post[tag_ids][]"
        <%= "checked" if @post.tag_ids.include?(tag.id) %>
      />
    </label>
  <% end %>

  <input type="submit" value="Create Post!">
</form>
```

Again, pretty familiar. The only thing to note is that the name of the checkbox
input is `post[tag_ids][]`. This tells your form that when you submit, all the
boxes you've checked will end up in the `tag_ids` array in your params.

In addition, note the hidden input with an empty string for `post[tag_ids][]`.
This just makes sure that, even if you uncheck every box, a param is sent
through for `post[tag_ids]`. You can think of it as a harmless placeholder.
