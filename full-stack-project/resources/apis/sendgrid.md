# Sendgrid

Sendgrid is a free service that sends email for your application.

## Instructions

This is based on the [Heroku Sendgrid docs][sendgrid-docs].

First, run `heroku addons:add sendgrid:starter` from the command line.
Sendgrid requires you to check some default boxes before it starts
working. Run `heroku addons:open sendgrid` to **activate** your new
sendgrid account.

When the sendgrid addon portal is first opened:

  **I. Click the "here" link.**

<img src="https://assets.aaonline.io/fullstack/full-stack-project/old/assets/sendgrid_3.png" height="150px">

  **II. Click the "Configure Account Settings" tab here**

<img src="https://assets.aaonline.io/fullstack/full-stack-project/old/assets/sendgrid_4.png" height="350px">

  **III. Click the "here" link in the**

<img src="https://assets.aaonline.io/fullstack/full-stack-project/old/assets/sendgrid_5.png" height="250px">

  **IV. Click the "Update settings" button**

<img src="https://assets.aaonline.io/fullstack/full-stack-project/old/assets/sendgrid_6.png" height="350px">

**NB**: You might have to verify your heroku account with CC information,
but starter is free; they won't charge you, they just want to tempt
you to pay for more.

Next, check to make sure you have a username and password
automatically setup by running `heroku config:get SENDGRID_USERNAME`
and `heroku config:get SENDGRID_PASSWORD`.

Next, put the following in your `config/environment.rb` file:

```ruby
if Rails.env.production?
  # only send real emails in production; use Sengrid
  ActionMailer::Base.smtp_settings = {
    :address        => 'smtp.sendgrid.net',
    :port           => '587',
    :authentication => :plain,
    :user_name      => ENV['SENDGRID_USERNAME'],
    :password       => ENV['SENDGRID_PASSWORD'],
    :domain         => 'heroku.com',
    :enable_starttls_auto => true
  }
  ActionMailer::Base.delivery_method ||= :smtp
elsif Rails.env.development?
  # Remember the letter_opener gem? It won't send real emails; it
  # just opens them in another tab. (Remember to add the letter_opener
  # gem to your development group in the Gemfile)
  ActionMailer::Base.delivery_method = :letter_opener
end
```

## ActionMailer Quick Reference

Run `rails g mailer AuthMailer` and add the following code:

```ruby
# app/mailers/auth_mailer.rb

class AuthMailer < ActionMailer::Base
  default :from => 'admin@example.com'

  # send a signup email to the user, pass in the user object that
  # contains the user's email address
  def signup_email(user)
    mail(
      to: user.email,
      subject: 'Thanks for signing up'
    )
  end
end
```

Finally, it's time to write the emails themselves. You'll need
templates for the email:

* `app/views/auth_mailer/signup_email.html.erb`
* `app/views/auth_mailer/signup_email.text.erb`

We need both templates because users want a choice about whether to
read emails in text or HTML formats. Text format is especially
important because spam services will flag your email if you don't
provide a text version.

Where appropriate (often a controller), you can now send emails by
writing:

```ruby
AuthMailer.signup_email(@user).deliver_now
```

Good work, you!

[sendgrid-docs]: https://devcenter.heroku.com/articles/sendgrid
[image-1]: https://assets.aaonline.io/fullstack/full-stack-project/old/assets/sendgrid_1.png
[image-2]: https://assets.aaonline.io/fullstack/full-stack-project/old/assets/sendgrid_2.png
[image-3]: https://assets.aaonline.io/fullstack/full-stack-project/old/assets/sendgrid_3.png
[image-4]: https://assets.aaonline.io/fullstack/full-stack-project/old/assets/sendgrid_4.png
[image-5]: https://assets.aaonline.io/fullstack/full-stack-project/old/assets/sendgrid_5.png
[image-6]: https://assets.aaonline.io/fullstack/full-stack-project/old/assets/sendgrid_6.png

## Additional resources

* https://devcenter.heroku.com/articles/sendgrid
* http://sendgrid.com/docs/Integrate/Frameworks/rubyonrails.html
* http://api.rubyonrails.org/classes/ActionMailer/Base.html
