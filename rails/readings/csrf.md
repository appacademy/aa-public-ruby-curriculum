# Cross-site Request Forgery

You've been learning how to write forms. Here's a tricky form:

```erb
<!-- this is a form on my www.appacademy.io -->
<form action="https://www.facebook.com/pages/appacademy/like"
      method="post">
  <input type="submit" value="Click to win a puppy!">
</form>
```

This form on `appacademy.io` advertises a chance to win a free puppy. However,
when the user clicks the button, it instead issues a request to `facebook.com`
to like App Academy.

Now, Facebook processes likes only for logged in users; that's how it enforces
that a user can only like a page once. If Facebook didn't require users to be
logged in, the you wouldn't need to bother tricking users to like App Academy;
you could just click the button yourself a lot.

Because I can only like a page once, I want to try to trick other Facebook users
to like my page for me. For that reason, I publish a deceptive form on my site,
which then POSTs a like request to Facebook's site. This is called a
**cross-site** (originates on my site but attacks Facebook) **request forgery**
(issues an unintended request to like my page).

Note that the forgery only succeeds if the target is signed into Facebook. If
they are not, a request to like my page will not succeed: Facebook will return
an error saying the like request is not authorized for an anonymous user.
However, since many, many browsers are likely to be logged into Facebook, this
attack will work fairly often.

## CSRF authenticity token

Rails, by default, tries to protect your forms from being attacked like this.
Here's how:

On each request, Rails will set an *authenticity token* in your session. The
authenticity token is just a random number; it has no special meaning. Like
everything in the session, it will be uploaded with each subsequent request.

When you make any non-GET request to Rails (POST, PUT, DELETE), Rails will
expect the client to **also upload the authenticity token in the params**. If
you were a Facebook engineer writing Rails (oh no! they use PHP!), you could do
this:

```erb
<!-- this is a form on www.facebook.com -->
<form action="pages/appacademy/like" method="post">
  <input type="hidden"
         name="authenticity_token"
         value="<%= form_authenticity_token %>">

  <input type="submit" value="Like App Academy!">
</form>
```

The `form_authenticity_token` helper just looks at the user session, takes the
authenticity token stored in there, and puts it in the form. When the form is
uploaded, Rails will check that the uploaded token in the params equals the
token stored in the session. If they are equal, Rails knows that the user
submitting the form was the one who requested it in the first place.

## How the authenticity token check helps

On any non-GET request, if the authenticity token in the uploaded form data does
not match the token in the session, **Rails will raise the
`ActionController::InvalidAuthenticityToken` exception**. This is because the
default strategy is set to `:exception`. Optionally, you can change the strategy
in `ApplicationController`, setting to `:null_session`--in which case Rails will
blank out the session for the duration of the request instead of raising an
exception--or `:reset_session`, in which case Rails will completely reset the
session, effectively logging the user out. For example:

```rb
# app/controllers/application_controller.rb

class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
end
```

Any of these strategies will protect you from CSRF.

Previous versions of Rails defaulted to nullifying the session. That strategy
would work for the previous example: Facebook would presumably reject the
submission because it would look like it had come from an anonymous user.

While nullifying the session is very effective at protecting your application,
the lack of an explicit exception also makes it difficult to debug any problems
with the authenticity token. The app simply keeps running as if the user had
logged out, which can obscure that a problem has occurred with the CSRF
protection.

## Use the authenticity token!

For every form you write, you should make sure to upload the authenticity token.
Otherwise, if the action you are POSTing (or PUTing, etc.) to requires session
data, it will not have access to it. Some actions may not really require the
session anyway, but keep things simple: include the boilerplate code above
(i.e., the hidden input tag) as part of every form and you will be fine.
