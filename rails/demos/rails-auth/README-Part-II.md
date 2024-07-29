# Authentication II: Creating a Session

The Auth Demo project shows you how to set up basic authentication for your
Rails apps. The previous reading, Part I, covers the creation of users. This
reading, Part II, covers the creation of a session. Feel free to code along. To
download the full solution for this demo, see Part I.

Here is a visualization of the login process.
![Login](https://assets.aaonline.io/fullstack/rails/assets/login_diagram.png)

## Overview

You are now successfully creating users. Now you just need to let them log in!

You're going to create a (singular) resource named `session`. When a user logs
in, they'll go to `/session/new` to fill in their credentials. `POST`ing to
`/session` (i.e., to the `SessionsController#create` action) will sign the user
in; you'll store a _session token_ in the cookie so that subsequent requests
will know which user is logged in. Lastly, to log out, the client can issue a
`DELETE` request to `/session`.

A couple notes:

* There is no `Session` model class, nor a `sessions` table. You can still
  create a `session` resource, however: a `session` resource just requires that
  you have a `SessionsController` (see below).
* The `session` resource is **singular** because the user will use at
  most one session: their own.
* You'll write a `SessionsController`; even when using a singular
  resource, controllers are **always** pluralized.

## Phase IV: Logging in: Verifying credentials

On to implementation!

### Adding a `session` resource, `SessionsController`

First, add a `session` resource to the routes file and generate a
`SessionsController`.

Next, write a `new` form that allows a user to submit their username and
password. Take advantage of the shared form that you created in Part I:

```erb
<!-- app/views/sessions/new.html.erb -->

<h1>Log in!</h1>

<%= render "shared/form", task: "login" %>
```

Okay, but what about the `create` action?

### Adding `::find_by_credentials`

You need to write `SessionsController#create` so that it verifies the
username/password and then sets a session token.

To verify the username and password, add a `find_by_credentials` method to your
`User` model:

```ruby
class User < ApplicationRecord
  # ...

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  # ...
end
```

This will return a user only if the username and password are correct.

In your controller, add the following definitions for the `create` and `new`
actions:

```ruby
class SessionsController < ApplicationController
  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user.nil?
      render json: "Invalid credentials".to_json
    else
      render json: "Welcome back #{user.username}!".to_json
    end
  end

  def new
  end
end
```

> **Note:** While it is true that `render json:` normally calls `to_json` on any
> non-JSON-ified object, you have to call it explicitly for strings. Why?
> Because JSON essentially is a string, Rails assumes that any string passed to
> `render json:` is already a JSON-ified string.

Cool! But this is useless, because the sessions controller currently doesn't set
a cookie to remember the logged-in user.

## Phase V: Logging in: Setting the session token

You now have the `SessionsController` properly verifying a user's credentials,
but it doesn't actually do anything with the successful login. Let's fix that.

### Add a `UsersController#show` page

Make a very simple `show` view for your `UsersController`.

```erb
<!-- app/views/users/show.html.erb -->
<h1><%= @user.username %></h1>

<p>Hello, dear user!</p>
```

Edit the `create` method in `UsersController` and `SessionsController` to
redirect to this page on successful form submission.

Let's make the show page private: a user should be the only one allowed to look
at their own `users#show` page. To enable this functionality, you need to know
which user is logged in and trying to view the page. To know which user is
logged in, you need to set a session token...

### Adding `session_token` to `user`

You need to introduce a `session_token` so that after login you can remember the
current user. Begin by writing a migration:

```ruby
class AddSessionTokenToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :session_token, :string, null: false
    add_index :users, :session_token, unique: true
  end
end
```

Next, make sure that when you create a `User` it has a unique `session_token`:

```ruby
class User < ApplicationRecord
  # ...

  validates :session_token, presence: true, uniqueness: true
  before_validation :ensure_session_token

  # ...

  def reset_session_token!
    self.session_token = generate_unique_session_token
    self.save!
    self.session_token
  end

  private

  def generate_unique_session_token
    # `SecureRandom::urlsafe_base64` does not guarantee uniqueness. Wrapping
    # this call in a loop ensures that no other user has the generated token.
    loop do
      session_token = SecureRandom::urlsafe_base64(16)
      return session_token unless User.exists?(session_token: session_token)
    end
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end
end
```

`User` now validates the presence (and uniqueness) of the `session_token`. Note,
though, that if a `User` instance does not already have a `session_token`, this
code will conveniently generate a session token before the validations
run; that's the `before_validation` callback bit. In other words, this presence
validation should never fail.

> Note: You can achieve a similar effect by using an `after_initialize
> :ensure_session_token` callback instead of the `before_validation`.
> `after_initialize`, however, will run every time a `User` instance is created,
> **including whenever you find a user in the database!** `before_validation`,
> in contrast, runs **before every validation**, which is when you actually need
> to make sure you have a `session_token`.

### Setting The Session

You're now storing the session token in the `User` instance, but you also need
to store it in the `session`. Write some helper methods in the
`ApplicationController` to take care of this:

```ruby
class ApplicationController < ActionController::Base
  def login!(user)
    @current_user = user
    session[:session_token] = user.session_token
  end

  def current_user
    return nil if session[:session_token].nil?
    @current_user ||= User.find_by(session_token: session[:session_token])
  end
end
```

To enable your views to access this `current_user` method, use `helper_method`:

```ruby
class ApplicationController < ActionController::Base
  helper_method :current_user
  # ...
end
```

This will make `current_user` available in all views.

Finally, update your `SessionsController` and `UsersController` `create`
methods:

```ruby
class SessionsController < ApplicationController
  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user.nil?
      render json: "Invalid credentials".to_json
    else
      login!(user)
      redirect_to user_url(user)
    end
  end

  # ...
end

class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      redirect_to user_url(@user)
    else
      render json: @user.errors.full_messages
    end
  end

  # ...
end
```

## Phase VI: Adding a `Logout` button

You haven't written any logout functionality, nor do you ever tell the user who
they are logged in as. Fix that by editing the application's layout:

```erb
<!-- app/views/layouts/application.html.erb -->

<html>
<!-- ... -->
  <body>

    <% if !current_user.nil? %>
      <ul>
        <li>Logged in as: <%= current_user.username %></li>
        <li>
          <form action="<%= session_url %>" method="POST">
            <input type="hidden"
                   name="authenticity_token"
                   value="<%= form_authenticity_token %>">
            <input type="hidden" value="delete" name="_method" />
            <input type="submit" value="Logout" />
          </form>
        </li>
      </ul>
    <% end %>

    <%= yield %>
  </body>
</html>
```

Now, after you log in, you should be able to see the `Logout` button. But
you don't have a destroy action yet. Go ahead and write one:

```ruby
class ApplicationController < ActionController::Base
  # ...

  def logout!
    current_user.try(:reset_session_token!)
    session[:session_token] = nil
  end
end

class SessionsController < ApplicationController
  # ...

  def destroy
    logout!
    redirect_to new_session_url
  end

  # ...
end
```

Now sign out should be working. Notice that in `logout!`
you reset the session token. This will invalidate the old session
token. You want to do that in case anyone has managed to steal the
token; this will deny the thieves further access to the account.

### Adding a `before_action` callback

Finally, go ahead and finish what you started: protect the `users#show`
page so that only the user themselves can view their own `show` page.

To do that, write a `require_current_user!` helper:

```ruby
class ApplicationController < ActionController::Base
  # ...

  def require_current_user!
    redirect_to new_session_url if current_user.nil?
  end
end
```

You can then add this as a `before_action` callback in your `UsersController`:

```ruby
class UsersController < ApplicationController
  before_action :require_current_user!, except: %i(create new)

  # ...
end
```

By default, a `before_action` callback will run the specified method--here,
`require_current_user!`--before running any of the actions in the file. Note,
however, that the `create` and `new` actions are excepted in the code above:
those actions are needed before a user signs up, so there's no way for the user
to be logged in at that point.

A rule of `before_action` is that, if running the filter causes a `redirect_to`,
the action method will not be called. For instance, if a user tries to visit the
`users#show` page without having logged in first, the callback will issue a
redirect, and Rails will forgo calling the `UsersController#show` method.

### Wait just one second...

The callback you defined requires that a user be logged in to look at a
`users#show` page. It does not, however, enforce that user A may not look at
user B's show page. Write a new `before_action` filter in the `UsersController`
to do this.