# Music App

**[Live Demo!][live-demo]**

Today you're going to build an inventory system for record labels. This app will
let the labels track their `Band`s, `Album`s, and `Track`s. Additionally, you'll
offer user accounts so users can comment on the inventory.

[live-demo]: https://aa-music-app.herokuapp.com

## Learning goals

By the end of this project, you should be able to

- Build User Auth without looking at old code or demos
- Nest routes
- Link between different views using `a` tags and Rails URL helpers
- Trigger controller actions from views using forms and links
- Check that a current user exists before displaying content

**Throughout this project, do not use `form_with`.**

## Warm up: Authentication

Create a new Rails application and do any initial setup needed to get it ready
to go. (If you have forgotten the basic steps for setting up a Rails app, look
at the instructions for one of your past projects.) Use `postgresql` for your
database. You can grab __.gitattributes__ and __.gitignore__ files from one of
your past projects or the repo at the `Download Project` button below.

Create a `User` model and bake in the prerequisites of authentication. Use email
addresses in lieu of usernames; in a bonus phase, you'll use the email addresses
to send confirmation emails and other spam.

See if you can build auth without looking back at any old code or demos. Here's
a rough guide if you get stuck:

In the `users` table, you'll want to store an `email`, `password_digest`, and
`session_token`. Make sure to add database constraints (require all fields) and
indexes to ensure uniqueness of `email`s and speed up the lookup by
`session_token`.

- Write methods to deal with the session token:
  `User#generate_unique_session_token`, `User#reset_session_token!` and
  `User#ensure_session_token`.
- Write a `User#password=(password)` method which actually sets the
  `password_digest` attribute using [BCrypt][bcrypt-documentation], and a
  `User#is_password?(password)` method to check the users' password when they
  log in.

  > **N.B.**: Be careful setting instance variables in Active Record. You can't
  > just set `@password_digest`. Instead, use `self.password_digest =` in
  > `#password=`. (`self.___ =` calls an Active Record setter method that
  > updates the state saved by `self.save`; `@___ =` makes a new instance
  > variable unrelated to `self.save`.)

- Remember that in the `User` model, you'll want to use a `before_validation`
  [callback] to set the `session_token` before validation if it's not present.
- Write a `User::find_by_credentials(email, password)` method.

Next write a `UsersController` and `SessionsController`.

- Write methods on the `UsersController` to allow new users to sign up.
  - Users should be logged in immediately after they sign up.
- Create a `SessionsController` but no `Session` model.
  - Write controller methods and the accompanying routes so that users can log
    in and log out. Should session be a singular resource?
  - `SessionsController#create` should reset the appropriate user's
    `session_token` and `session[:session_token]`.
  - For now just redirect them to a `UsersController#show` page which simply
    displays that user's email.

Finally, take some time to refactor out shared code and add some convenience
methods to `ApplicationController`. Make sure to include the appropriate methods
in your views as helper methods (e.g., `helper_method :current_user`). At a
minimum, you'll probably want to define the following methods:

- `#current_user` to return the current user.
- `#logged_in?` to return a boolean indicating whether anyone is signed in.
- `#login!(user)` reset the `user`s session token and cookie

### Routes summary

Your app should have routes for:

```sh
    session POST   /session(.:format)                     sessions#create
            DELETE /session(.:format)                     sessions#destroy
new_session GET    /session/new(.:format)                 sessions#new
      users POST   /users(.:format)                       users#create
   new_user GET    /users/new(.:format)                   users#new
       user GET    /users/:id(.:format)                   users#show
```

Create log-in/sign-up views and edit the __application.html.erb__ layout so that
a logged-in user is shown a "sign-out" button and a logged-out user is shown
links to sign-up or sign-in pages.

### Styling

Spend a few minutes adding some styling to your session forms.

- Add a `Music App` header with a snazzy font to `application.html.erb`.
- Use `flex` to display your logged-in or logged-out info on the right-hand side
  of your `Music App` header.
- Default link styling is pretty ugly. While keeping your `<a>` tags, make your
  links look more like buttons by using `background-color` and `border-radius`.
- Improve your session forms by changing the spacing and alignment of their
  elements.

Great job setting up authentication! Now on to [Phase I](README-ph1.md), where you will start
implementing elements specific to your music inventory app.

[bcrypt-documentation]: https://github.com/codahale/bcrypt-ruby
[callback]: https://guides.rubyonrails.org/active_record_callbacks.html#available-callbacks