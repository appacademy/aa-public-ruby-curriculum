# Common User Auth Questions

This reading contains answers to the following questions:

1. When do you use `before_action`?
2. What is the difference between `before_validation` and `after_initialize`?
3. Where do you put the logout button in Rails views?
4. What is a session?
5. Why do you need both database constraints and model-level validations?
6. What is the request-response cycle?
7. How do all of the MVC components connect?
8. How do you systematically set up the controllers and views? What is the best
   way to build out logic in views vs. controllers?
9. Params vs. Session vs. Flash vs. Flash.now
10. Why would you nest a resource? How do you pass a foreign key into params if
    the resource is not nested?
11. What is up with `password=`, and why do you need a reader on your password?
12. Why should you allow your password to be nil?
13. How does your application know if you are logged in?
14. Why don’t you have a table for session? What does it mean to have one
    session versus multiple sessions?

## When do you use `before_action`?

`before_action` is a _filter_ in Rails ([Action Controller Overview — Ruby on
Rails Guides][actioncontroller-overview]). It is a method that is run before a
controller action (e.g., index, create, update, etc.) in the controller in which
it is called. One common example of this is to pass `before_action` a method
that ensures a user is signed in before being able to update or create something
(e.g., post, comment, etc.). In the code below, the `before_action` is calling a
method that ensures no user is currently logged in when you make a request to
create a new user. If a current user exists, the `require_no_user` method
(defined in __application_controller.rb__) will redirect to a different page and
will not allow a request for a new user to be completed.

```ruby
class UsersController < ApplicationController
  before_action :require_no_user

  def create
    @user = User.new(user_params)

    if @user.save
      login_user!(@user)
      redirect_to cats_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def new
    @user = User.new
    render :new
  end

  private

  def user_params
    params.require(:user).permit(:password, :username)
  end
end
```

### But what if you don't want the `require_no_user` method to run before every action? What if you want any user (logged in or not) to be able to view users' profile pages?

Good news! Much like you can restrict the routes you generate in __routes.rb__
by doing something like `resources :users, only: [:new, :create, :show]`, you
can pass a hash with the key `:only` and an array of symbols (actions) as the
value (`:except` also works)!

```ruby
class UsersController < ApplicationController
  before_action :require_no_user, only: [:create, :new]

  def create
    @user = User.new(user_params)

    if @user.save
      login_user!(@user)
      redirect_to cats_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def new
    @user = User.new
    render :new
  end

  # require_no_user will NOT be run before this method
  def show
    @user = User.find_by(id: params[:id])
    if @user
      render :show
    else
      redirect_to cats_url
    end
  end

  private

  def user_params
    params.require(:user).permit(:password, :username)
  end
end
```

## What is the difference between `before_validation` and `after_initialize`?

`before_validation` is a method that will invoke another method right before any
model validations are run (in response to calling `.save` or `.valid?`).
`after_initialize` is a method that will invoke another method after an instance
of a model is initialized (by calling `.new` or loading from a database).

```ruby
def User < ApplicationRecord
  after_initialize :some_custom_method
  before_validation :some_other_custom_method

  # Runs right after a User is initialized
  def some_custom_method
    # important code
  end

  # Runs right before a User instance is validated
  def some_other_custom_method
    # important code
  end

end

# This line of code initializes a new instance of a user by calling .new
# Once the user is initialized, `after_initialize` will run the
# `some_custom_method` method
user1 = User.new(username: 'Liz', password: 'password')

# This line of code will run the method registered by `before_validation` (in 
# this case, `some_other_custom_method`) and then all model validations.
# Model validations are run when you call `.save` or `.valid?`
user1.save
```

**N.B.** Most of the time it does not matter whether you use `before_validation`
or `after_initialize`.

## Where do you put the logout button in Rails views?

You typically want the user to be able to see this on every page when navigating
around the application. Thus, you put it in the __application.html.erb__ file,
which will always show this logout button at the top of the page if the user is
logged in. You can think of the __application.html.erb__ file as a root file for
the rest of your views. Whatever is in this file will display, and then the view
you are rendering will display below it, i.e., where you see the line `<%= yield
%>`.

```html
<body>
    <nav class="main-nav">
    <h1><a href="<%= cats_url %>">99 Cats</a></h1>
    <div>
    <% if current_user.nil? %>
      <a href="<%= new_session_url %>">Sign in</a>
      <a href="<%= new_user_url %>">Sign up</a>
    <% else %>
      <%= current_user.username %>

      <%# This is the logout button and it will always be at the top of the page %>
      <%# if the user is logged in %>
      <form action="<%= session_url %>" method="post">
        <input
          type="hidden"
          name="authenticity_token"
          value="<%= form_authenticity_token %>">
        <input type="hidden" name="_method" value="delete">
        <input type="submit" value="Logout">
      </form>
    <% end %>
    </div>
    </nav>
    <main>
      <%= yield %>
    </main>
  </body>
```

## What is a session?

_Session_ refers to the process of logging in to and logging out of an
application. Creating a new session is the same as logging in; destroying a
session is the same as logging out. Calling the `new` method in a session
controller renders the __new.html.erb__ view, which is the login page. In order
to achieve this functionality in your applications, you must have RESTful routes
to create and destroy your session and to render a login page. This means
defining your session routes in __routes.rb__ like this:

`resource :session, only: [:new, :create, :destroy]`

At this point in time, you use `resource` instead of `resources` because you are
only allowing the user to have one session at a time. This means several things:

1. A user can only be logged in on one device at a time.
2. You do not need a table for session.
3. When you create and destroy a session, you do not need to provide an id.
4. The routes will look like this:

```
GET      /session/new   sessions#new
POST     /session       sessions#create
DELETE   /session       sessions#destroy
```

### But what about the Rails session...

When you make a `POST` request to `/session` and call the `create` method in the
__sessions_controller.rb__ file, you want to attempt to log in the user whose
information was entered in the login form. To log in a user, you must use the
`session` that Rails gives you. **This session is a place to store data during
one request that can be read during later requests.** You tell your application
to compare the `session[:session_token]` value to your user's `session_token`
value (saved in the user database) to determine whether or not a user is logged
in. If `session[:session_token] == user.session_token`, then the user is logged
in; otherwise, the user is logged out.

__A session is both (1) a general term representing the process of logging
in/logging out AND (2) an object that rails gives us to store data that will
persist across many request-response cycles.__

## Why do you need both database constraints and model-level validations?

Database-level _constraints_ are truly the only thing protecting you from someone
inserting unwanted information into the database. This is because a person could
bypass your application and attempt to insert something directly into the
database. However, if a database constraint fails, it throws a nasty 500-level
error. Thus, model-level _validations_ are primarily for UI. If a user attempts
to sign up, you want to be able to display a nice error message and have them try
again, rather than going directly to the database, attempting to save a user,
and getting a 500 error that disrupts the application. Model validations are run
whenever you call `.save` or `.update` on the instance of our model. If these
calls fail, you say that they _fail softly_. If you used `.save!` instead, then
that would throw the database errors instead, and you would say that it _fails
loudly_.

Consider the following code:

```ruby
def create
    @user = User.new(user_params)

    if @user.save
      login_user!(@user)
      redirect_to cats_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end
```

If you used `@user.save!` instead of `@user.save`, you would never go into the
else statement where you render errors. Instead, the database error would
disrupt your application. Using `@user.save` allows you to go into the else
statement if a model-level validation fails. Then you can show your user some
nice error messages.

## What is the request-response cycle?

When users interact with a browser, they do things such as click a button or
type in a url and hit enter, which will initiate a request-response cycle. For
example, if a user types `www.google.com` into a browser and presses enter, it
will initiate an HTTP request that is sent to Google's server. Google's server
will then decide what to do and how to respond to the request. The response will
be sent back to the client (i.e., the user's browser) and will update the
browser accordingly.

__HTTP Requests__ - contain three major components
__Method__ (e.g., POST, GET, PATCH, DELETE)
__Path__ (e.g., /users)
__Body__ (e.g., username=lizbot)

__HTTP Responses__ - contain two major components
__Status Code__ (e.g., 200 - Success, 300 - Redirection, 400 - Client Error, 500 - Server Error)
__Body__ lots of information; typically contains HTML to be rendered on a page

Below is a diagram of a request-response cycle.

![request-response][req-res-link]

Rails comes with its own server. When this server receives an HTTP request, it
sends it to the Rails router. This router takes in the request and decides where
to send it: which controller and which method inside of that controller. For
example, a `GET /users` request would typically prompt a call to the `index`
method inside of __users_controller.rb__. **A new instance of a controller is
instantiated for every single request-response cycle. Once a cycle is complete,
the instance is destroyed.** Side note: naming conventions are extremely
important for Rails to figure out where to send requests. Below is a diagram of
a request-response cycle in Rails.

![request-response-rails][reqres-rails]

## How do all of the MVC components connect?

1. _Migrations_  
   These define the structure of your database. This is where you tell your
   application which tables and columns you want in your database and any
   database-level constraints (uniqueness, null, etc.). All table names are
   plural (e.g. `users`).
2. _Models_ (M of MVC)  
   Every table in your database is represented by a model, and an instance of a
   model represents a single row in a table. The purpose of a model is to create
   Ruby objects from information in your database so that you can interact with it
   in your application and perform basic CRUD operations. All model file and
   class names are singular (e.g., __user.rb__ and `class User`).
3. _Routes_ (__routes.rb__)  
   These define the connection between an HTTP verb, url, and controller action.
   You often try to create RESTful routes.
4. _Controllers_ (C of MVC)  
   These take in HTTP requests, decide what to do with them, and determine how
   to respond. Each API endpoint (a.k.a., a resource you have defined in your
   __routes.rb__ file) has its own controller, and the methods inside of a
   controller should allow you to perform basic CRUD (create, read, update,
   delete) operations. The operation that is performed is determined by the
   method that is called. For example, an HTTP request of `POST /users` should
   call the `create` method in the `UsersController`, which will create a new
   user and save it to the database. Every method in a controller must either
   `redirect_to` a url (e.g., `redirect_to users_url`) OR `render` a view (e.g.,
   `render :new`).
5. _Views_ (V of MVC)  
   This is the HTML that a client sees in their browser. They use instance
   variables defined in the associated controller method (e.g.,
   __index.html.erb__ would have access to instance variables defined in the
   `index` method in the controller) to render information dynamically.

The diagram below illustrates the connections between the MVC components. The
next question also provides details with respect to creating each of these
components.

![mvc_connection][mvc-connect-link]

## How do you systematically set up the controllers and views? What is the best way to build out logic in views vs. controllers?

You want to keep your controllers as slim as possible. This means you want to
abstract a lot of code away from controllers into your models and application
controller.

1. __Migrate__  
   Make a migration to create a table in your database (e.g., Posts). This
   requires deciding upon necessary columns and constraints.

   Running `rails g migration CreateCats` will create a timestamped file in
   __db/migrate__, e.g., __db/migrate/20220714033817_create_cats.rb__. You can
   then fill in the migration file with the required columns, options, and
   constraints like this:

   ```ruby
   # db/migrate/20220714033817_create_cats.rb

   class CreateCats < ActiveRecord::Migration[7.0]
     def change
       create_table :cats do |t|
         t.date :birth_date, null: false
         t.string :color, null: false
         t.string :name, null: false
         t.string :sex, limit: 1, null: false
         t.references :owner, null: false, foreign_key: { to_table: :users }
         t.text :description

         t.timestamps
       end
     end
   end
   ```

2. __Create a Model__  
   Create a model to represent the table from your migration (here, `class Cat`
   in __app/models/cat.rb__). This involves writing validations, associations,
   and any custom methods. An instance of a model is created every time you call
   `Cat.new`.

   ```ruby
   # app/models/cat.rb

   class Cat < ApplicationRecord
     # freeze ensures that constants are immutable
     CAT_COLORS = %w(black white orange brown).freeze

     # Remember, Rails automatically validates the presence of
     # belongs_to associations, so you can omit the validation of owner here.
     validates :birth_date, :color, :name, :sex, :owner, presence: true
     validates :color, inclusion: CAT_COLORS, unless: -> { color.blank? }
     validates :sex, inclusion: %w(M F), if: -> { sex }
     validate :birth_date_in_the_past, if: -> { birth_date }

     has_many :rental_requests,
       class_name: :CatRentalRequest,
       dependent: :destroy

     belongs_to :owner,
       class_name: 'User',
       foreign_key: :user_id
   end
   ```

3. __Define Routes__  
   Determine which routes you want for your resource. For instance, if you
   don't need to delete a cat, then you don't need a `destroy` route.

   ```ruby
   # config/routes.rb

   Rails.application.routes.draw do
     resources :cats, except: :destroy
   end
   ```

4. __Create a Controller__  
   Create a controller with only the methods you need to match your existing
   routes. Each one of these methods will likely perform one of the basic CRUD
   operations. An instance of a model is often instantiated, manipulated, and
   then saved (or deleted) in the database in these controller methods. An
   instance of a controller is created and destroyed for every request-response
   cycle (HTTP request).

   ```ruby
   class CatsController < ApplicationController
     # Allow unlogged in users to browse cats.
     before_action :require_user, only: %i(new create edit update)

     def index
       @cats = Cat.all
       render :index # this line is not necessary
     end

     def show
       @cat = Cat.find(params[:id])
       render :show # this line is not necessary
     end

     def new
       @cat = Cat.new
       render :new # this line is not necessary
     end

     def create
       @cat = current_user.cats.new(cat_params)
       if @cat.save
         redirect_to cat_url(@cat)
       else
         flash.now[:errors] = @cat.errors.full_messages
         render :new # this line IS necessary because it is not rendering the `create` view
       end
     end

     def edit
       @cat = current_user.cats.find(params[:id])
       render :edit  # this line is not necessary
     end

     def update
       @cat = current_user.cats.find(params[:id])
       if @cat.update(cat_params)
         redirect_to cat_url(@cat)
       else
         flash.now[:errors] = @cat.errors.full_messages
         render :edit # this line IS necessary because it is not rendering the `update` view
       end
     end

     private

     def cat_params
       params.require(:cat)
         .permit(:age, :birth_date, :color, :description, :name, :sex)
     end
   end
   ```

5. __Create a View__  
   You only need to create views for pages that you want to render for your
   application. Perhaps you want a page where a user can see all of the cats
   that exist in the database. This would likely be rendered from the `index`
   method in the `CatsController`, which means you would create a view in
   __app/views/cats/index.html.erb__. Inside of this view, you would have access
   to the `@cats` instance variable defined above in the `index` method in the
   `CatsController`. Use `<% %>` tags to write Ruby code in your view files. If
   you want to actually render the value of a Ruby variable to the screen, you
   can use the `<%= %>` tags. You could create a view that looks like the
   following:

   ```html
   <!-- app/views/cats/index.html.erb -->

   <section class="cat-index-holder">
     <nav>
       <h1>ALL OF THE CATS IN THE WORLD</h1>
     </nav>
     <section class="cat-index">
       <%# This is the same @cats as the @cats in the index method in the CatsController %>
       <% @cats.each do |cat| %>
         <div class="cat-index-item">
           <div>
             <img src="http://placekitten.com/g/231/231" >
             <br /><a href="<%= cat_url(cat) %>">Rent <%= cat.name %></a>
           </div>
         </div>
       <% end %>
     </section>
   </section>
   ```

   Perhaps you also want a page where a user can edit their cat in the cat
   database. This would likely be rendered from the `edit` method in the
   `CatsController`, which means you would create a view in
   __app/views/cats/edit.html.erb__. Inside of this view, you would likely want
   a form where you can change your cat's information. Once you press the form's
   `Submit` button, you will make an HTTP request with a method and path defined
   in the form and a body that includes all of the data input in the form (here,
   `name`, `birthdate`, `color`, and `sex`). The form below has some important
   components to note:

     - `action="<%= cat_url(@cat) %>"`, which defines the HTTP path
       (`/cats/:id`).
     - `method="post"`, which defines the HTTP verb (`POST`).
     - `<input type="hidden" name="_method" value="patch">` which overwrites the
       `POST` verb to be a `PATCH`. HTML forms are not allowed to have any other
       method besides `POST` or `GET`. You must accordingly provide a hidden
       input to overwrite the method with the one you actually want. If you look
       at the params in your controller once this form is submitted, the params
       will have the key-value pair of `{"_method"="patch"}`.
     - `authenticity_token` input, which puts a key-value pair of
       `{"authenticity_token"="somerandomstring"}` in your params. This pair
       protects against CSRF attacks by telling Rails the request is safe.
     - The `name=` in all of the inputs merely designates under which key/keys
       that information will be defined in your params. For example,
       `name=cat[name]` will create the following in your params: `{ "cat": {
       "name": "mycatsname" } }`.

   ```html
   <form action="<%= cats_url %>" method="post">
     <input type="hidden" name="_method" value="patch">
     <input
       type="hidden"
       name="authenticity_token"
       value="<%= form_authenticity_token %>">

     <label for="cat_name">Name</label>
     <input
       type="text"
       name="cat[name]"
       id="cat_name"
       value="<%= cat.name %>">

     <br>

     <label for="cat_birth_date">Birth date</label>
     <input
       type="date"
       name="cat[birth_date]"
       id="cat_birth_date"
       value="<%= cat.birth_date %>">
     <br>

     <label for="cat_color">Color</label>
     <select name="cat[color]" id="cat_color">
       <option disabled selected>-- select a color --</option>
       <% Cat::CAT_COLORS.each do |color| %>
         <option
           <%= cat.color == color ? "selected" : "" %>
           value="<%= color %>"
         >
           <%= color.upcase %>
         </option>
       <% end %>
     </select>
     <br>

     <input
       type="radio"
       name="cat[sex]"
       value="M"
       id="cat_sex_male"
       <%= cat.sex == "M" ? "checked" : "" %>
     >
     <label for="cat_sex_male">Male</label>
     <input
       type="radio"
       name="cat[sex]"
       value="F"
       id="cat_sex_female"
       <%= cat.sex == "F" ? "checked" : "" %>
     >
     <label for="cat_sex_female">Female</label>
     <br>
     <label>
       Description
       <textarea name="cat[description]"><%= cat.description %></textarea>
     </label>

     <br>
     <% submit_text = (cat.persisted? ? 'Update' : 'Create') + ' cat!' %>
     <input type="submit" value="<%= submit_text %>">
   </form>
   ```

## Params vs. Session vs. Flash vs. Flash.now

`params`, `session`, `flash`, and `flash.now` are all places to store
information in a Rails application. What you store and how long that information
is stored differs among these different storage options.

`params` carries data from the browser to the application. They can come from
three places:

1. Form data
2. A wildcard in an HTTP request url
3. A query string

You access data from `params` in your controllers to complete the HTTP request.

The other three storage options all carry data from the application to the
browser:

- `session`: The information stored in `session` persists for as long as you
  allow it. You use this to store cookie and `session_token` information to
  determine whether users are logged in or logged out.
- `flash`: The information stored in `flash` persists for one additional cycle
  after the current request-response cycle. You would use this, e.g., to display
  a success notification after a `redirect`.
- `flash.now`: The information stored in `flash.now` persists only throughout
  the duration of the current request-response cycle. You typically use this to
  store error messages when re-`render`ing a form after an error.

This diagram illustrates how each of these storage options work within Rails.

![rails_info_storage][info-storage]

## Why would you nest a resource? How do you pass a foreign key into params if the resource is not nested?

It's common to have resources that are "children" of other resources. Consider
an application with these models:

```ruby
# app/models/post.rb
class Post < ApplicationRecord
  has_many :comments
end

# app/models/comment.rb
class Comment < ApplicationRecord
  belongs_to :post
end
```

Nested routes allow you to capture this relationship in your routing. In this
case, you could include this route declaration:

```ruby
# config/routes.rb
Bluebird::Application.routes.draw do
  resources :posts do
    # provides a route to create a comment for a given post.
    resources :comments, only: :post
  end
end
```

This generates a `/posts/:post_id/comments` route. Requests for this route will
be sent to the CommentsController#create action. Let's take a look at the
corresponding view and controller you could use to complete a `POST` request to
`/posts/:post_id/comments`.

```html
<!-- app/views/comments/new.html.erb -->

<h1>New Comment</h1>
<form class='form' action="<%= post_comments_url %>" method="post">
  <input
    type="hidden"
    name="authenticity_token"
    value="<%= form_authenticity_token %>">

  <label for='new-comment'>Comment</label>
  <input id='new-comment' type="text" name="comment[body]">

  <input type="submit" value="Submit">
</form>
```

```ruby
class CommentsController

  # When you make your POST request to /posts/:post_id/comments,
  # Rails extracts the wildcard `:post_id` from the path and
  # puts that information in your params under a top-level key.
  # The rest of your information should come from your 'Add Comment'
  # form. Your params will have the following structure
  # params: { post_id: 1, post: {body: 'this is my post'}}

  def create
    @comment = Comment.new(comment_params)
    @comment.post_id = params[:post_id]
    if @comment.save
      redirect_to post_url(@comment.post_id)
    else
      flash.now[:errors] = @comment.errors.full_messages
      render :new
    end
  end

  def comment_params
    params.require(:comment).permit(:body)
  end
end
```

If you don't want to nest your resources, how else could you get a foreign key
into your params? You could put the `Add Comment` form in the __show.html.erb__
view for a `Post`. When you do this, you can include a _hidden input_ in the
`Add Comment` form! Let's take a look at how you can accomplish this with a
`POST` request to `/comments`.

```html
<!-- app/views/posts/show.html.erb -->

<h1>This is my post!</h1>
  <h2>@post.text</h2>

  <h1>New Comment</h1>
  <form class='form' action="<%= comments_url %>" method="post">
    <input
      type="hidden"
      name="authenticity_token"
      value="<%= form_authenticity_token %>">

    <%# This hidden input passes your post_id into your params! %>
    <input type="hidden" name="comment[post_id]" value="<%= @post.id %>">

    <label for='new-comment'>Comment</label>
    <input id='new-comment' type="text" name="comment[body]">

    <input type="submit" value="Submit">
  </form>
```

```ruby
class CommentsController

  # When you make your POST request to /comments all of the information 
  # is now coming from the 'Add Comment' form, which is on the post show 
  # page. Your params will have the following structure
  # params: { comment: {body: 'this is my post', post_id: 1}}

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      redirect_to post_url(@comment.post_id)
    else
      flash.now[:errors] = @comment.errors.full_messages
      render :new
    end
  end

  def comment_params
    params.require(:comment).permit(:body, :post_id)
  end
end
```

## What is up with password=, and why do you need a reader on your password?

When you sign up or log in a user, you get a username and a password in your
params. You do not actually save the password in your database's `users` table,
however, for security reasons. As a result, you need a way to convert your
password into a `password_digest` (this is what you save in the database). You
also want to still be able to validate a password (e.g., check its length) even
though it is not being saved in the database. To accomplish these two tasks--1)
convert password to `password_digest` and 2) validate your password--you write
some additional methods in your `User` model.

When you call `.new` on a user and pass in params, your model must have
`attr_writer`s defined on the params that you pass.

```rb
user = User.new(username: 'Liz', password: 'password')
```

Since password is not a column in your table, Active Record does not
automatically create an `attr_reader` and `attr_writer` on password like it does
for all of the columns in your table. Consequently, you need to write your own
`attr_writer` (`password=(password)`) for password in order to initialize a new
instance of password with a password attribute. Inside of this method, you do
two things: (1) set your user's `password_digest`, which will be saved in the
database, and (2) set an instance variable `@password = password`. The only
reason you need to set this instance variable is so that you can create a reader
on the password (`attr_reader :password`), which is used in the password
validation (`validates :password, length: { minimum: 6, allow_nil: true }`).

In summary, the only reason you create an instance variable and `attr_reader`
for password is to validate the password. Additionally, the `attr_writer`
(`password=(password)`) is used to set the `password_digest` attribute from the
password.

```ruby
# app/models/user.rb

class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true
  # If a password was set, you validate it meets the requirements.
  # Note the `allow_nil`.
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :password_digest, presence: true
  validates :session_token, presence: true, uniqueness: true

  attr_reader :password

  has_many :cats

  before_validation :ensure_session_token

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return user&.is_password?(password) ? user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def owns_cat?(cat)
    cat.user_id == self.id
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
```

## Why should you allow your password to be nil?

You do not save a password for a user in the database. Thus, when you query the
database for a user's information and create an instance of a user from that
returned information, the user instance will not have a password. If you try to
update that user, you need to ensure that when you call `.save`, the password
validation will not return an error because the user will not have a password.
As a result, you must allow the password to be nil.

## How does your application know if you are logged in?

You are logged in if `session[:session_token] == user.session_token`. The code
below has a method, `login_user!`. This method sets the
`session[:session_token]` equal to the user's session token, which is returned
from the method called `reset_session_token!`. There is also a method called
`logged_in?`, which you call in __app/views/application.html.erb__ to determine
if a user is logged in. If a user is logged in, then it renders a logout button
and the user's username. If a user is not logged in, then it renders `Sign Up`
and `Log In` links. You have access to `logged_in?` in
__app/views/application.html.erb__ because you designate it as a helper method
(`helper_method :logged_in?`) in __app/controllers/application_controller.rb__.

```ruby
# app/controllers/application_controller.rb

class ApplicationController < ActionController::Base
  # Expose current_user and logged_in? methods to the views
  helper_method :current_user, :logged_in?

  private
  def require_no_user
    redirect_to cats_url if current_user
  end

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def login_user!(user)
    session[:session_token] = user.reset_session_token!
  end

  def logout_user!
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def require_user
    redirect_to new_session_url unless current_user
  end
end
```

```html
<!-- views/application.html.erb -->

<% if current_user.nil? %>
  <a href="<%= new_session_url %>">Sign in</a>
  <a href="<%= new_user_url %>">Sign up</a>
<% else %>
  <%= current_user.username %>
  <%# This is the logout button. It will always be at the top of the page %>
  <%# if the user is logged in. %>
  <form action="<%= session_url %>" method="post">
    <input
      type="hidden"
      name="authenticity_token"
      value="<%= form_authenticity_token %>">
    <input type="hidden" name="_method" value="delete">
    <input type="submit" value="Logout">
  </form>
<% end %>
```

## Why don’t you have a table for session? What does it mean to have one session versus multiple sessions?

At this point, you are only allowing a user to have a single session, which
means a user can only be logged in on a single device. Since you only have one
session, you do not need to specify routes with a session id, and when you
create or destroy a session, you do not need to provide an id. If you want to
allow your users to be logged in on multiple devices, you would need a table
that stores multiple session tokens per user.

[actioncontroller-overview]: https://guides.rubyonrails.org/action_controller_overview.html#filters

[req-res-link]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/fullstack/rails/assets/request_response.jpg

[reqres-rails]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/fullstack/rails/assets/request_response_rails.jpg

[info-storage]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/fullstack/rails/assets/rails_info_storage.jpg

[mvc-connect-link]: https://appacademy-open-assets.s3-us-west-1.amazonaws.com/fullstack/rails/assets/mvc_connection_updated.jpg
