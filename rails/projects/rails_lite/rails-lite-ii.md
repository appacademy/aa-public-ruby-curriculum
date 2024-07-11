# Rails Lite II

## Learning Goals

+ Know how ActiveRecord Lite works
+ Know how the Flash and Flash.now work
+ Be able to explain the Rack Middleware chain
+ Know how Rack Middleware can catch server errors and display error pages
+ Be able to explain CSRF protection and how it fits into the `ControllerBase` class
+ Be able to incorporate ActiveRecord Lite into your Rails Lite

## Phase VII: Finish ActiveRecord Lite!

If you have not completed up to and including `has_one_through` in the
ActiveRecord Lite project, do so now. This project is crucial to your
understanding of Ruby, Rails, and SQL. Challenge yourself to finish this
amazing and difficult project!

## Phase VIII: Flash

The `flash`, like `params` and `session`, is a method that will return a
hash-like object when it is called. Like the others it will build this hash-like
object from the request. The behavior of the flash is unique, however. When you
set a value in the `flash`, it should be available for the current *and next*
request cycle. A value set in `flash.now`, however, should only be available for
the current request cycle. Here's a [link to the docs][flash-docs] if you need
to refresh yourself on its exact behavior.

Fill out the skeleton for the `Flash` class. It will receive the request. Like
the `session` the `flash` should retrieve its contents from a cookie. You
should implement `flash` as well as `flash.now`. You can test out your
flash using the flash server in the `bin` folder.

Hints:
- Keep in mind that items stored in `Flash` exhibit two different types of
  behaviors; some persist to the next request, while others disappear with the
  controller. It might be a good idea to store these items differently.
- Cookies store not only a given name and domain, but also the specific path of
  the request. Make sure the cookie's path is set to `/` like the `session`
  cookie. This will ensure that you're always dealing with the same cookie when
  inspecting and resetting the flash store.

You won't get any more detailed instructions at this stage as this is a bonus
problem! You can do it!

[flash-docs]: http://guides.rubyonrails.org/action_controller_overview.html#the-flash

## Phase IX: Rack Middleware - Exceptions

Now add some middleware to your application to make it even more powerful!
Currently, if your application encounters a Runtime exception, the server just
returns `Internal Server Error`. This is a pretty scary and unhelpful error.
Make a middleware that returns a nicely formatted error page just like
Rails does! Your middleware should minimally render the following:
- The stack trace
- A preview of the source code where the exception was raised
- The exception message

Fill in the `ShowExceptions` skeleton in the lib folder. Your middleware should
take in an app and respond to the `#call` method. You can test out your
exceptions middleware using the exception server, which uses `Rack::Builder` to
add your middleware to the stack.

Hints:
- Make a template called `lib/templates/rescue.html.erb` to build a template
  that will be rendered when an exception is rescued.
- Your middleware should wrap the call to the next application in the stack in a
  `begin` `rescue` block so that it can handle an exception created by the
  application.
- Note: when your middleware catches an error and issues a response, you can
  craft your response using a `Rack::Response` object and convert it to an array
  using the `#finish` method or, as we did in phase 1, simply return an array
  with a status code, headers, and the body of your response (example: `['200',
  {'Content-Type' => 'text/html'}, ['hello world']]`). The included specs test
  for the simple array version.

[exception-docs]: http://ruby-doc.org/core-2.1.2/Exception.html

## Phase X: Rack Middleware - Static Assets

Now make another middleware. This time, your middleware will make static assets
such as images, Javascript, and CSS files available client-side. Your app should
be able to find resources in a specific directory (ex.
`/lib/public/yourAsset.jpg`) and serve them up via HTTP, (ex.
`localhost:3000/public/yourAsset.jpg`).

Like your last middleware, your `Static` middleware should take in an app and
respond to the `#call` method. You can test it out using the middleware server
and the included specs.

Make sure to set up your middleware so that all of the assets are served out of
the`/lib/public` folder. That way you don't have to worry about users accessing
other, sensitive files in your app.

Make sure to set the [mime-type][mime] in the
headers using the `Content-type` header. Modern browsers are smart enough to
figure out what to do with the file for some types based upon information like
the file extension, but your middleware should comply with the HTTP standards
and set the header.

Hints:
- Match a `/public/*` path in your router and use it to serve your assets.
- Reading a file using `File::read` and writing all of it to the response will actually serve the file to the browser.

## Phase XI: CSRF Protection

Remember `authenticity_token` and `protect_from_forgery`? In this bonus problem
you will recreate this functionality to protect your web application from
nefarious hackers. Read [this guide][rails_csrf_guide] to learn more about
`protect_from_forgery`. Implement it yourself! This phase should also use the
cookies!

Start by adding the methods `#form_authenticity_token`,
`#check_authenticity_token` and `::protect_from_forgery` to your
`ControllerBase` class.

CSRF is used to determine if a form is valid. Just like in Rails, when you call
`::protect_from_forgery` within the class definition of a class that inherits
from `ControllerBase`, it should validate the authenticity token for all
requests other than `GET` requests to that controller. Your
`#form_authenticity_token` method will provide your developer with a way to
include the CSRF token in their form. What will you compare the form's CSRF
token to? Keep in mind that you don't have a database. Your
`#check_authenticity_token` method is what will actually be used to validate the
auth token. It should be called from within `#invoke_action`.

Specs and a server for testing your CSRF protection await.

## Phase XII: Super Bonus: Rails Lite + ActiveRecord Lite

You are here which means you crushed ActiveRecord Lite as well as the Rails Lite
project. Time to take it to the next level and combine them into an actual
living breathing Rails machine!

First, refactor your ActiveRecord Lite project. Get rid of all the phase crap.
That will only make your life more difficult. Don't worry about the specs, you
won't need those where you're going!

Next, combine Rails Lite and Active Record Lite! You should be able to write a
working web application with these two projects together.

Double extra credit if you make an app with this framework.

[go-live]: http://restful-cats.com/go_live

Triple extra credit if you implement `rails new`.

## Phase XII: Bonus

Time to become a rails guru! Some more awesome `rails_lite` features:
- Right now your app can't handle "PATCH" or "DELETE" requests. Fix this!
- Implement [link_to][link_to_doc] and [button_to][button_to_doc]
- Strong params (e.g `require`, `permit`)
- URL route helpers (e.g. `users_url` instead of `"/users'`)

[rails_csrf_guide]: http://guides.rubyonrails.org/security.html#cross-site-request-forgery-csrf
[link_to_doc]: https://apidock.com/rails/ActionView/Helpers/UrlHelper/link_to
[button_to_doc]: https://apidock.com/rails/ActionView/Helpers/UrlHelper/button_to
[mime]: https://en.wikipedia.org/wiki/MIME