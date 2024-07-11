# Action Mailer Basics

Action Mailer allows you to send emails from your application. There are two
parts:

* An `ApplicationMailer` class extending
  [`ActionMailer::Base`][action-mailer-base-docs]. This works similarly to
  `ApplicationController` extending `ActionController::Base`. Mailers live in
  __app/mailers__.
* Views, which live in __app/views/<mailer_name>__.

## Your first mailer

To set up a mailer, you first need to have Action Mailer installed. By default,
Rails will include Action Mailer in any new project. If you create a project
using the `--minimal` flag, however, Action Mailer is one of the packages that
will be skipped. In this latter case, you can enable its features by
uncommenting `require "action_mailer/railtie"` in __config/application.rb__.
That's it! Now Action Mailer is ready to go.

### Generate the mailer

You can generate mailers with a Rails generator, just like you generate a model.
The generator will create the mailer, the view, and--if you have tests
activated--tests:

```zsh
% rails g mailer User
create  app/mailers/user_mailer.rb
invoke  erb
create    app/views/user_mailer
invoke  test_unit
create    test/functional/user_mailer_test.rb
create    test/mailers/previews/user_mailer_preview.rb
```

If you created your app with the `--minimal` flag and only activated Action
Mailer later, then generating your first mailer will also create the base
`ApplicationMailer` class in __app/mailers/application_mailer.rb__ and some
basic HTML and text email layout templates
(__app/views/layouts/mailer.text.erb__ and
__app/views/layouts/mailer.html.erb__).

### Edit the mailer

The `ApplicationMailer` from which your `UserMailer` inherits contains a default
`from` address:

```ruby
# app/mailers/application_mailer.rb

class ApplicationMailer < ActionMailer::Base
  default from: 'from@example.com'
  # layout 'mailer'
end
```

Meanwhile, __app/mailers/user_mailer.rb__ contains a completely empty mailer:

```ruby
# app/mailers/user_mailer.rb

class UserMailer < ActionMailer::Base
end
```

To send a welcome email to a user's registered email address, you can add a
method called `welcome_email` like this:

```ruby
# app/mailers/user_mailer.rb

class UserMailer < ApplicationMailer
  def welcome_email(user)
    @user = user
    @url  = 'http://example.com/login'
    mail(to: user.email, subject: 'Welcome to My Awesome Site')
  end

  def reminder_email(user)
    # ...
  end

  # other emails...
end
```

Somewhat like a controller, this adds a mailer action that will send a
`welcome_email` to the passed user. You set the `to` and the `subject` (as well
as `from`, which here is set from the inherited default). The content of the
email lives in a view (more in a sec) which will be rendered.

You can also set `cc` and `bcc` attributes. In order to send to multiple emails,
use an array of email strings.

You can put the name of the recipient in the email address like so: `"Ned
Ruggeri <ned@appacademy.io>"`. This is a nice way of personalizing your email.
Likewise you should personalize the sender: `"App Academy
<contact@appacademy.io>"`.

The `mail` method returns an email object (of type
[`Mail::Message`][mail-message-github]). It doesn't mail the email, however.
Instead, the caller of `UserMailer#welcome_email` will call `#deliver_now` on
the `Message` object:

```ruby
# app/controllers/users_controller.rb

  def create
    u = User.create(user_params)

    msg = UserMailer.welcome_email(u)
    msg.deliver_now

    render :root
  end
```

### Create a mailer view

Wait. What about the content? Create a file called __welcome_email.html.erb__ in
__app/views/user_mailer/__. This will be the template used for the email,
formatted in HTML:

```html
<!-- app/views/user_mailer/welcome_email.html.erb -->

<!DOCTYPE html>
<html>
  <head>
    <meta content='text/html; charset=UTF-8' http-equiv='Content-Type' />
  </head>
  <body>
    <h1>Welcome to example.com, <%= @user.name %>!</h1>
    <p>
      You have successfully signed up to example.com.
      Your username is: <%= @user.login %>.<br />
    </p>
    <p>
      To log in to the site, just follow this link: <%= @url %>.
    </p>
    <p>Thanks for joining and have a great day!</p>
  </body>
</html>
```

Just like controllers, any instance variables you define in the method become
available for use in the views.

It is also a good idea to make a text version for this email. People who don't
like HTML emails should have a text version to view. Also, spam filters will
ding you if you don't have a text version; a lot of email gets flagged as spam,
so this is a problem.

To do this, create a file called __welcome_email.text.erb__ in
__app/views/user_mailer/__:

```erb
<%# app/views/user_mailer/welcome_email.text.erb %>

Welcome to example.com, <%= @user.name %>!
===============================================

You have successfully signed up to example.com.
Your username is: <%= @user.login %>.

To log in to the site, just follow this link: <%= @url %>.

Thanks for joining and have a great day!
```

When you call the `mail` method now, Action Mailer will detect the two templates
(text and HTML) and automatically generate a `multipart/alternative` email. The
user's email client will be able to choose between the two formats.

### Warning: Mailing is slow

Sending out an email often takes up to 1 sec. This is kind of slow. In
particular, if your Rails app is sending mail as part of a controller action,
the user will have to wait an extra second for the HTTP response to be sent.

You'll eventually learn how to "batch up" and send emails offline, but for now
just know that if you try to send 100 emails in a controller action, you're
going to have trouble responding to requests promptly.

## Mailing Details

### Adding Attachments

Adding attachments is pretty simple: just add new key/value pairs to the
hash-like `attachments` variable. This is provided in each instance of
`ActionMailer::Base`, which comes through `ApplicationMailer`.

```ruby
# app/mailers/user_mailer.rb

  def welcome_email
    attachments['filename.jpg'] = File.read('/path/to/filename.jpg')
    # ...
  end
```

### Generating URLs in Action Mailer views

You will probably want to embed URLs into your mailer views just like in your
controller views. Somewhat oddly, you must set an option in
`config/environments/production.rb` (and `config/environments/development.rb`
for development) so that the mailer knows the base url of the website:

```ruby
# config/environments/development.rb
config.action_mailer.default_url_options = { host: 'localhost:3000' }

# config/environments/production.rb
config.action_mailer.default_url_options = { host: 'www.production-domain.com' }
```

(If you do not need to differentiate between development and production
environments, you can instead include the default url option in
__config/application.rb__.)

You would think that the Rails app would know the hostname. After all, you don't
have to set this option to use `*_url` methods in controller views.
Nevertheless, as the [Rails Guides - Action Mailer
Basics][action-mailer-host-parameter] inform,

> "Unlike controllers, the mailer instance doesn't have any context about the
> incoming request so you'll need to provide the :host parameter yourself."

Make sure to (continue to) use the `*_url` form of the url helpers and not the
`*_path` form. When a user opens their email, the email needs to contain the
full hostname of the site to know what host to send the request to. This is
because the email is being opened by a mail client that isn't on the same domain
as your site (e.g., the email is opened on `gmail.com` but the link needs to
point to `appacademy.io`).

### Letter opener gem

Testing email sending in development can be a pain. Use the wonderful
[letter_opener][letter-opener-github] gem. When running the development
environment (your local machine), instead of sending an email out to the real
world, letter\_opener will instead pop open the "sent" email in the browser.

Setup is two lines:

```ruby
# Gemfile
gem 'letter_opener', group: :development

# config/environments/development.rb
config.action_mailer.delivery_method = :letter_opener
```

## Resources

* [ActionMailer::Base][action-mailer-base-docs]

[action-mailer-base-docs]: http://api.rubyonrails.org/classes/ActionMailer/Base.html
[action-mailer-host-parameter]: http://guides.rubyonrails.org/action_mailer_basics.html#generating-urls-in-action-mailer-views
[mail-message-github]: https://github.com/mikel/mail/blob/master/lib/mail/message.rb
[letter-opener-github]: https://github.com/ryanb/letter_opener
