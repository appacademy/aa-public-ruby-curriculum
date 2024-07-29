# Music App (Bonus)

**[Live Demo!][live-demo]**

[live-demo]: https://aa-music-app.herokuapp.com

## Bonus time!

Great work! Here are some bonus features to add to your music inventory
application.

### Bonus I: Additional authentication features

Spam-bots keep signing up for your inventory management application. Defeat them
by sending out an activation email. You'll ask users to click a link to activate
their account when they sign up.

#### Adding activation columns

To enable account activation, you need to add two columns to your `users` table:
an `activated` boolean field to track the status of user accounts and an
`activation_token` column that you will use to activate accounts. Accounts
should start out deactivated. You should also add a check to see if a user is
active before logging them in.

#### Setting up Action Mailer

Whenever a user signs up on your site, use [Action Mailer] to send them an
email. If you used the `--minimal` flag when creating your app, then Action
Mailer is not installed. To enable its features, open __config/application.rb__
and uncomment the `require "action_mailer/railtie"` line. That's it! Now Action
Mailer is ready to go.

Run `rails g mailer User`. This will create the following files:

- __app/mailers/user_mailer.rb__
- __app/mailers/application_mailer.rb__
- __app/views/user_mailer__
- __app/views/layouts/mailer.text.erb__
- __app/views/layouts/mailer.html.erb__

(If you included tests in your app, it will also produce
__test/mailers/user_mailer_test.rb__ and
__test/mailers/previews/user_mailer_preview.rb__.)

__application_mailer.rb__ and the two layouts would already have been among your
app's files if Action Mailbox had been included when generating your app. The
generator only creates these three files if they do not already exist.

Like controllers, mailers have actions that correspond to views. In
__user_mailer.rb__, define an `activation_email` action that takes in a user.
Save the user as an instance variable, then call `mail` with an options hash
containing values for `to` and `subject`. It should look something like this:

```ruby
class UserMailer < ApplicationMailer
  def activation_email(user)
    @user = user
    mail(to: user.email, subject: "Welcome to Music App! Please activate your account.")
  end
end
```

Next, set up your emails/views. Inside the __app/views/user_mailer/__ folder,
create a corresponding __activation_email.html.erb__ file. This file contains
the HTML that will be sent in your email. As with normal views and controllers,
you can access any instance variables that were set in the mailer:

```html
<!-- app/views/user_mailer/activation_email.html.erb -->

<!DOCTYPE html>
<html>
  <head>
    <meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
  </head>
  <body>
    <h1>Welcome <%= @user.email %>, </h1>
    <!-- ... -->
  </body>
</html>
```

The email should contain a link to activate the new account. Add a custom route
for a new action such as `UsersController#activate`. (You can use the
[`collection`] method to add additional routes to the `users` resources.) Then
in the email, add a URL to `/users/activate?activation_token=...`.

When you have finished your HTML template, repeat the process in
__app/views/user_mailer/activation_email.text.erb__ using only text. Since not
all email readers support HTML, it is best practice always to send both HTML and
plain-text versions of your email.

> Note: When generating a new mailer, you can specify actions to create like
> this:

  ```sh
  rails g mailer User activation_email
  ```

> This will include a basic skeleton for `activation_email` in
> __app/mailers/user_mailer.rb__ and generate the
> __app/views/user_mailer/activation_email.text.erb__ and
> __app/views/user_mailer/activation_email.html.erb__ files.

The custom `activate` controller action should verify that the user clicked the
link in their email. If the token in the query string matches with the token in
the database, it should activate the account and flip the boolean. **Hint:** You
can use [Active Record's toggle method][ar-toggle] to flip the value of a
boolean attribute.

Finally, change what happens on a successful `save` in your `UsersController`
`create` action. You no longer want to activate the user instantly and log them
in. Now you want to send them an email, which you do like this:

```rb
UserMailer.activation_email(@user).deliver_now
```

Add a `flash` notice announcing the account's successful creation and
instructing the user to check their email. Redirect back to the new session
page.

[Action Mailer]: https://guides.rubyonrails.org/action_mailer_basics.html
[`collection`]: https://guides.rubyonrails.org/routing.html#adding-collection-routes
[ar-toggle]: http://api.rubyonrails.org/classes/ActiveRecord/Persistence.html#method-i-toggle

#### Testing your Action Mailer

To test your mailer setup, do the following:

- Run `brew install mailhog`.
- Run `mailhog`.
- Open `localhost:8025` in your browser; this will be your inbox.
- Put the following code in your __config/application.rb__:

```ruby
config.action_mailer.default_url_options = { host: 'localhost:3000' }
config.action_mailer.delivery_method = :smtp
config.action_mailer.smtp_settings = { address: '0.0.0.0', port: 1025 }
config.action_mailer.raise_delivery_errors = false
```

> Note: Putting these lines in __application.rb__ will apply them in all three
> environments (`test`, `development`, and `production`). If you need to
> differentiate the configuration for the different environments--e.g., the
> `host` will not be `localhost:3000` in `production`--move the lines to the
> appropriate file(s) in __config/environments/__.

Restart your rails server, sign up for your site, and check your MailHog inbox!

### Bonus II: Admin Accounts

Let's add admin accounts for people from your record label. This way your PR
department can remove notes that don't reflect well on your properties.

- Add an `admin` boolean to the `users` table.
  - Only admin users should be allowed to create/update/destroy inventory
    objects.
    - Hide the links from regular users, and make sure to check if someone is an
      admin using a before filter on admin-only controller actions.
- Add a `users` index visible only to admin users.
  - Put a button next to each user which, when clicked, makes that user an
    admin.

### Bonus III: Styling

Style your app!

- Change the colors and font sizes for different elements.
- Put your content in tables and play around with the positioning.
- See if you can make your sign-up and log-in forms look nicer. Try centering
  them or adding a border.