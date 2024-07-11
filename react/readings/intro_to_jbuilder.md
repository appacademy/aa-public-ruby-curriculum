# Sending Customized JSON Responses With Jbuilder

[Jbuilder][jbuilder-docs] is a tool you will use to customize the JSON responses
you send back from your rails server.

When you make a request for data in your Rails controllers, by default, you get
all attributes back from the database. You've been using this default behavior
so far by writing things like `render json: @users` at the end of your
controller actions. This has some unfortunate side effects, not the least of
which is that you'll send down everything--including potentially sensitive
information--to the client. Consider the following example:

`users` schema:

```rb
# db/schema.rb
create_table "users", force: :cascade do |t|
  t.string "username", null: false
  t.string "password_digest", null: false
  t.string "session_token", null: false
  t.datetime "created_at", null: false
  t.datetime "updated_at", null: false
  t.index ["session_token"], name: "index_users_on_session_token", unique: true
  t.index ["username"], name: "index_users_on_username", unique: true
end
```

```rb
# Api::UsersController
def show
  @user = User.find(params[:id])
  render json: @user
end
```

By default, if you send the `@user` as a JSON response, you'll end up sending
something like this:

```js
{
  "id": 1
  "username": "howardmohr93",
  "password_digest": "$2a$10$qFkvLzrkjk/Hw3fAPAd6..3OXaCUnQMKQR4xIKb/ypsGx/eRJrwV2",
  "session_token": "RMZ7Ox8xnHQbLid6FRMKBg",
  "created_at": "2019-02-20 12:20:29 -0800",
  "updated_at": "2019-02-20 12:20:29 -0800"
}
```

This is bad. Not only are you sending information that the client doesn't need
to know, you're also sending the `password_digest` and `session_token`, which is
a potential security vulnerability. Maybe you could try something like this:

 ```rb
# Api::UsersController
def show
  @user = User.find(params[:id])
  response = {}
  response[:id] = @user.id
  response[:username] = @user.username
  
  render json: response
end
```

In this solution, you construct a hash that contains only the data you want to
send, and you render it as JSON. Not terrible, but suppose you also want to
fetch a list of comments associated with this user?

 ```rb
# Api::UsersController
def show
  @user = User.find(params[:id])
  response = {}
  response[:id] = @user.id
  response[:username] = @user.username
  response[:comments] = {}
  @user.comments.each do |comment|
    comment_response = {}
    comment_response[:id] = comment.id
    comment_response[:author_id] = comment.author_id
    comment_response[:body] = comment.body
    comment_response[:created_at] = comment.created_at
    response[:comments][comment.id] = comment_response
  end

  render json: response
end
 ```

This might work, but now you're stuffing a lot of logic into your controller. As
the responses you send become more complicated, things will get pretty messy.

You can do better. Enter Jbuilder.

With Jbuilder, Rails allows you to use your __views__ folder to create JSON
templates for your responses. Rather than building HTML views, you can instead
create JSON "views" using Jbuilder and Ruby code.

When making a Jbuilder template, you'll simply place a file with the extension
__.json.jbuilder__ where you've previously been putting your ERB files. In the
same way that Rails compiles ERB files into HTML, it will compile Jbuilder
templates into JSON.

Using a Jbuilder view, the above monstrosity can be written simply as:

```rb
# Api::UsersController
def show
  @user = User.find(params[:id])
  render :show
end
```

```rb
# /app/views/api/users/show.json.jbuilder
json.extract! @user, :id, :username
json.comments do
  @user.comments.each do |comment|
    json.set! comment.id do
      json.extract! comment, :id, :author_id, :body, :created_at
    end
  end
end
```

Using the above view, the JSON response will look like this:

```js
{
  "id": 1
  "username": "howardmohr93",
  "comments": {
    "1": {
      "id": "1",
      "author_id": "1",
      "body": "Can't complain",
      "created_at": "2019-02-20 13:33:06 -0800"
    },
    "2": {
      "id": "2",
      "author_id": "1",
      "body": "Not too bad, pass the butter please",
      "created_at": "2019-02-20 13:35:58 -0800"
    },
    "3": {
      "id": "3",
      "author_id": "1",
      "body": "You might as well have another sandwich and watch Johnny Carson",
      "created_at": "2019-02-20 13:38:36 -0800"
    }
  }
}
```

Not too bad!

Since Rails evaluates Jbuilder views similarly to how it handles HTML templates,
you can access instance variables (like `@user`) defined in the controller that
renders the view, as well as any of their associations. Jbuilder views can use
regular Ruby code, but they also use special methods defined by Jbuilder. The
[Jbuilder docs][jbuilder-docs] have detailed information about each of these
methods. The following section describes a few of the most common.

## Common Jbuilder methods

Let's take a look at some commonly used Jbuilder methods.

### `json.<some_key>`

To specify a key in the response, you can use the syntax: `json.some_key
some_value`. The value can be either 1) any valid data type or 2) a block that
defines a nested scope.

```rb
# jbuilder:
json.username "Bob"

# response:
{ "username": "Bob" }
```

```rb
# jbuilder:
json.title "The first post"
json.author do
  json.username "Bob"
end

# response:
{
  "title": "The first post",
  "author": {
    "username": "Bob"
  }
}
```

### json.extract!

`json.extract!` lets you extract attributes from an instance directly:

```rb
#  jbuilder:
json.extract! @user, :fullname, :company, :email

# response:
{
  "fullname": "Howard Mohr",
  "company": "Minnesota, inc.",
  "email": "cantcomplain@pbs.org"
}
```

### json.set!

You can use `json.set!` to set keys that you first need to evaluate as
variables:

```rb
# jbuilder: 
json.set! @user.id do
    json.extract! @user, :fullname, :company, :email
end

# response:
{
  1: {
    "fullname": "Howard Mohr",
    "company": "Minnesota, inc.",
    "email": "cantcomplain@pbs.org"
  }
}
```

## Configuring Rails to look for Jbuilder views

You also want to set the default format of resources to `:json` in the
__config/routes.rb__ file. Then Rails will automatically look for a __.json__
file when you pass a template name to `#render` (`render :index`, for example).

```rb
# routes.rb

Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :pokemon, only: [:index, :show, :create, :destroy]
  end
end
```

As shown in the directory structure below, you can also use partials with
Jbuilder just as you have with ERB.

```plaintext
instagram_clone
  └─ app
      └─ ...
      └─ views
          └─ photos
              └─ index.json.jbuilder
              └─ show.json.jbuilder
              └─ _photo.json.jbuilder
```

[jbuilder-docs]: https://github.com/rails/jbuilder
