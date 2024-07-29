# Helpers, Layouts, And Mailers Homework

For this homework assignment, you will be building on the solution for 99 Cats
II: Auth. Find the solution in the repo accessed through the `Download Project`
button at the bottom of this page. Clone the repo, `cd` inside your local copy,
then run `bundle install` and `bundle exec rails db:setup` to set it up.

## Topic 1: View Helpers

Isn't it pesky to have to rewrite the code for the `form_authenticity_token`
field over and over? Let's abstract it into a simple helper method that you can
use across your views.

Open __app/helpers/application_helper.rb__ and write a new method called
`auth_token`. As a refresher, your auth token code in your views should look
something like this:

```html
<input
  type="hidden"
  name="authenticity_token"
  value="<%= form_authenticity_token %>"
/>
```

Put this code in your new `auth_token` method, but with a few changes. First,
you need to wrap the input tag in a string and call `#html_safe` on it.
Otherwise, your `auth_token` method will output the string literal for your
input tag. Secondly, now that your input tag is little more than a string in
Ruby-land, you shouldn't interpolate the actual `form_authenticity_token` using
erb tags. Instead, just interpolate `form_authenticity_token` using the string
interpolation syntax you know and love (`#{}`).

Sweet! Looking good? Now go through your app and replace all of the
`form_authenticity_token` input fields with calls to your snazzy new method,
`<%= auth_token %>`, to dry up your code and simplify your life.

## Topic 2: Layouts

You've been using layouts in Rails every day without even knowing it! Check
out your __application.html.erb__ file. In particular, notice the `<%= yield %>`
tag in the middle of the layout. This will yield in the content for whatever
page you're on, whether that's the cats index or the new user form.

Now, suppose you wanted to add a footer on your __application.html.erb__ layout.
You want your footer to display a paragraph describing your site on every page
of your site. In addition, you want it to display a line describing the
particular page the user is on. This is a perfect time to use Rails's
`content_for` method.

First, create a footer section in your __application.html.erb__ at the end of
the `body` tag and write a short blurb describing your site. Verify that this
shows up on every page as you navigate around in `localhost`.

Next, add a second `yield` tag to insert the custom footer content within
the new footer section. It should look something like this:

```erb
<footer>
  This is our 99 Cats site. Please feel free to browse!

  <%= yield :footer %>
</footer>
```

Now, time to add some page specific content. Go through each of your views, and
add a line specific to that page. It should look something like this:

```erb
<p>Other content for the cats index goes here</p>

<% content_for :footer do %>
  <p>This is the cats index page.</p>
<% end %>
```

Finished? Navigate around your site in localhost. Make sure that the main body
of each page appears in the main `yield` section of the layout and that your
footer-specific content appears in the footer.

## Topic 3: Action Mailer

1. Activate Action Mailer by uncommenting `require "action_mailer/railtie"` in
   __config/application.rb__.

2. Create a user mailer to welcome new users to your account. The `rails g
   mailer User` command will create a new mailer class file in
   __app/mailers/user_mailer.rb__.

   ```ruby
   # app/mailers/user_mailer.rb

   class UserMailer < ApplicationMailer
   end
   ```

3. Implement a `#welcome_email` method that will email a user from
   `99catsadmin@appacademy.io`. (You don't actually have an email address stored
   for the user; for now, just pretend that their username will be an email
   address.)

   Need a hint? Refer back to the Action Mailer reading.

   ```ruby
   # app/mailers/user_mailer.rb

   class UserMailer < ApplicationMailer
     def welcome_email(user)
       # your code here
     end
   end
   ```

4. Next, write the content for the email welcoming the user to the site. Create
   a __welcome_email.html.erb__ file in __app/views/user_mailer/__ and fill it
   in. Inform the user of their successfully created username and provide them
   with a link to the sign-in page.

   In addition to the __.html.erb__ file, make a text-only version in
   __welcome_email.txt.erb__. Remember: omitting a text version of your email
   could cause many filters interpret your email as spam!

5. When a user signs up for your app, send them the welcome email. Where should
   that code live within your existing `UsersController`? Implement the code.

   Remember, you need a few things. You must call your new `welcome_email`
   method, which returns a message, and call `deliver_now` on that message to
   actually send it:

   ```ruby
   msg = UserMailer.welcome_email(@user)
   msg.deliver_now
   ```

6. Test it out! Set up the `letter_opener` gem so that you can try out your code
   on `localhost:3000`:

   ```ruby
   # Gemfile
   gem 'letter_opener', group: :development

   # config/environments/development.rb
   config.action_mailer.delivery_method = :letter_opener
   ```

   The sent message should pop up in the browser if all went according to plan.
   Congrats! You've Action Mailed!