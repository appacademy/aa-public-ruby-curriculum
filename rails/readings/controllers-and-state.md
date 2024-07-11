# Controllers And State

## [Session][rails-guide-session]

HTTP is **stateless**. That means requests are handled independently from one
another; your Rails controller dies at the end of every request (i.e., each
request is handled by a new instance of the controller) and carries no data
forward to the next request. But oftentimes you need to track information across
requests.

You can hang onto data across requests by having the Rails application store it
in the database. For instance, when a user signs up for your service, you
`create` a new `User` object and store their **credentials** (username/password)
in the `users` table.

Sometimes the **client** needs to store data across requests. For instance,
think about login functionality. Let's break this down for the example of
Facebook:

* Facebook presents a login page when you go to `facebook.com` and are not
  logged in.
* A user fills out the web form and presses `Submit`. The web browser makes an
  HTTP request to POST credentials to the Facebook's server (perhaps to
  `/session`).
* The Facebook server verifies the username/password. It then sends a redirect
  to the browser instructing it to GET `/feed`.
* The client makes a GET request for `/feed`.

The problem is in the last step. From the point of view of Facebook's server,
the GET for `/feed` is entirely unrelated to the POST to `/session`. Not being
able to connect these two requests means that the GET for `/feed` looks like
it's coming from an un-logged-in user.

How would Rails connect these two requests? They hit different controllers. Even
if they hit the same controller class, however, the controller is thrown away at
the end of the request; you'll be working with different instances. Either way,
Rails won't remember the previous request.

To fix this problem, you need to have the client web browser store some data for
you. Check it out:

* Facebook presents a login page when you go to `facebook.com` and are not
  logged in.
* A user fills out the web form, presses `Submit`. The web browser makes an HTTP
  request to POST credentials to the Facebook's server (perhaps to `/session`).
* The Facebook server verifies username/password. Sends a redirect to the
  browser instructing it to GET `/feed`.
  * **Also, Facebook generates a temporary *login token* for the user.**
  * **In an HTTP header, Facebook sets a cookie with the token when it issues
    the redirect response.**
* The client makes a GET request for `/feed`.
  * **The client uploads the login token cookie.**
  * **Facebook looks up the user associated with the login token and shows their
      feed**.

You know all this from the Cookies reading. Let's talk about how you set cookies
in Rails.

Rails does much of the work of implementing the session for you. Because your
controllers inherit from `ApplicationController`, which in turn inherits from
`ActionController::Base`, you can use the `ActionController::Base#session` method
in your controllers to get a hash-like object where you can retrieve and set state
(e.g., `session[:user_id] = @user.id`). When you call `render` or `redirect`,
Rails will take the contents of the `session` hash and store it in the cookie.

Here's a barebones, simple demo:

```ruby
# config/routes.rb
SecretApp::Application.routes.draw do
  resource :feed
  resource :session
end

# app/controllers/sessions_controller.rb
class SessionsController < ApplicationController
  def create
    username = params[:user_name]
    password = params[:password]

    user = User.where(
      username: username,
      password: password
    ).first

    # generate a 16-digit random token
    user.session_token = SecureRandom::urlsafe_base64(16)
    user.save!

    # put the generated token in the client's cookies
    session[:session_token] = user.session_token
    redirect_to feed_url
  end
end

# app/controllers/feeds_controller.rb
class FeedsController < ApplicationController
  def show
    # pull the session token out of the client's cookies
    # it will be right where you left it in session[:session_token]

    session_token = session[:session_token]
    @user = User.find_by(session_token: session_token)

    # render feed for user...
  end
end
```

Please note that the above is not very well-written Rails code; it's just trying
to be simple. In particular, you should probably write helper methods in
`ApplicationController` for `login!(username, password)` and `current_user`.

Anything you set in `session` will be stored in the cookie. On subsequent
requests, Rails will read the cookie and deserialize the session. So, `session`
will contain the values you had set in previous requests.

Note that, like `params`, `session` is actually a call to
`ActionController::Base#session`, which returns a hash-like object.

To remove something from the `session`, set it to `nil`:

```ruby
class SessionsController < ApplicationController
  def destroy
    # logout
    session_token = session[:session_token]
    user = User.find_by(session_token: session_token)

    user.session_token = SecureRandom::urlsafe_base64(16)
    user.save!
    session[:session_token] = nil

    redirect_to root_url
  end
end
```

## The flash

When you store data in the session, it will keep coming back on subsequent
requests. Oftentimes you'll find that you want to store some data only for the
current request or until the next request.

The flash is a special part of the session that stores values for only the
current and next request, which is particularly useful for passing error
messages or other success/failure messages.

It is accessed in much the same way as the session, as a hash (it's a
[FlashHash][flash-hash-doc] instance).

Let's use the act of confirming an object was destroyed. The controller can set
a message which will be displayed to the user on the next request:

```ruby
class SessionsController < ApplicationController
  def destroy
    # logout
    session_token = session[:session_token]
    user = User.find_by(session_token: session_token)

    user.session_token = SecureRandom::urlsafe_base64(16)
    user.save!
    session[:session_token] = nil

    flash[:notices] ||= []
    flash[:notices] << "You logged out. See you soon!"

    redirect_to root_url
  end
end
```

This flash notice is available for the current **and** next controller and view
to use. Let's modify __views/layouts/application.html.erb__ (the template that
every template is rendered in) to display notices.

```erb
<!-- in views/layouts/application.html.erb -->
<!-- `Object#try` is a Rails addition which will try to call the
      method if the object isn't `nil`.  -->

<!-- ... -->
<% flash[:notices].try(:each) do |msg| %>
  <%= msg %>
<% end %>

<!-- ... -->
```

This way, if an action sets a notice message, the layout will display it
automatically.

Storing messages in flash is particularly useful for **redirecting**. When you
`redirect_to` in Rails, it tells the client to make an entirely separate request
from the original request. Therefore, if you want values to persist to that
second request, you use flash. There are times, however, when you want some
values to be stored only for the lifecycle of the current request...

### flash.now

By default, adding values to the flash will make them available for the current
and next request, but sometimes you may want to store values only for the
current request. In particular, if the `create` action fails to save a resource
and you **render** (NOT redirect to) the `new` template directly, that's not
going to result in a new request, but you may still want to display a message
using the flash. To do this, you can use `flash.now` in the same way you use the
normal `flash`:

```ruby
class SessionsController < ApplicationRecord
  def create
    username = params[:user_name]
    password = params[:password]

    user = User.where(
      username: username,
      password: password
    ).first

    if user.nil?
      # uh-oh, bad password
      flash.now[:notices] ||= []
      flash.now[:notices] << "Username/password combo was bad"

      render :new
      return
    end

    # ...
  end
end
```

This is useful because you are `render`-ing the __new.html.erb__ view as the
response to the **current** request, so you only need to store the error message
for the current request. You wouldn't want the error message to persist through
to a second request; otherwise, you might re-submit the form with correct
credentials and upon that second request still see the error message from your
original bad login attempt.

In summary:

* `redirect_to` --> makes second, separate request --> `flash` --> values stored
  for current AND next request
* `render` --> responds to current request --> `flash.now` --> values stored for
  current request only

## Cookies vs. Session

If you're asking Rails to store data in an HTTP cookie, why is it called
`session`? The reason is that "session" is a more abstract concept: the
**session** is the accumulated context for an HTTP request. You can store (and
remove) data from the session, which will be available in future requests.

There are different ways to implement a session:

* Store the data in an HTTP cookie; this is the default.
* Store all session data in the server's DB. Instead of setting the cookie with
  the data, only send the database key (the id of the session data in the DB) to
  the client. On subsequent requests the client ships the key. Rails looks up
  this key in the DB when session data is requested.

Rails lets you choose between these (I won't tell you how): the default is to
store all session data in the cookie. Cookies are limited in size: 4kB. If you
want to store lots more data as part of the session, you may want to store it
server-side and just store a small key with the user. You might also do that if
you wanted to store private data in the session and didn't want to send it to
the client. But storing private data in the session is atypical anyway...

You can also get/set data to an HTTP cookie directly using
`ActionController::Base#cookies`. You won't want to do this often (don't fixate
too much on it right now), but it does give you a little more power:

```ruby
session_token = SecureRandom::urlsafe_base64(16)
cookies[:session_token] = {
  value: session_token,
  expires: 20.years.from_now
}
```

Cookies will typically expire at the end of a browser session (argh! _session_
used in yet another way!). When the user closes the browser, cookies are cleared
by default. But by using the low-level `cookies` method, you can set the cookie
to live for up to 20 years (this is the max allowed by the HTTP cookie
specifications).

You may keep in mind that the commercial internet is not very old. Cookies were
introduced in 1997. Twenty years is close to forever in internet terms.

You can abbreviate this by writing `cookies.permanent[:session_token] =
session_token`. This is the primary reason (maybe 90% of the cases) for using
`cookies` in preference to `session`. Use `session` for everything else.

One limitation: A cookie's value can only be a string. You're responsible for
any serialization (usually to JSON) or deserialization that needs to happen.
With `session`, Rails will do that extra work for you so that you can store
other data types like arrays and hashes.

## Resources

* [Session Rails Guide][rails-guide-session]
* [Flash Rails Guide][rails-guide-flash]
* [FlashHash API][flash-hash-doc]

[rails-guide-session]: http://guides.rubyonrails.org/action_controller_overview.html#session
[rails-guide-flash]: http://guides.rubyonrails.org/action_controller_overview.html#the-flash
[flash-hash-doc]: http://api.rubyonrails.org/classes/ActionDispatch/Flash/FlashHash.html
