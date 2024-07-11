# Rack middleware

Building our framework on Rack does more for us than simply providing a
convenient API for parsing HTTP requests and building responses. It also gives
us the ability to easily add additional middleware to our framework using the
`Rack::Builder` DSL, allowing our program to do something with the request
before it is processed by the final application.

Middleware can do many different things. Some will return a response
immediately, some will alter the headers of the request and then pass the
request along, and some will result in a side effect like setting an instance
variable in the application. There is no rule for what a middleware must do to
be considered a middleware.

Let's take a look at some of the middlewares that Rails uses. Go into an old
Rails project (or just make a new one) and run `rails middleware`. This will
output the list of middleware used by Rails. As you can see many of Rails'
features are actually implemented as middlewares.

## Middleware stack

When we have an application with more than one middleware (as Rails does), we
refer the group of middlewares as a stack. In particular, this representation
reinforces the fact that each middleware will be run one at time, in the order
specified. To see how this works, let's analyze what happens in a typical Rails
application. Start by looking back at the results of `rails middleware`. The first
middleware listed is `Rack::Sendfile`. This means that this middleware processes
the request before any other part of Rails ever sees it. This particular
middleware is responsible for efficiently serving files.

After this middleware runs, whether it has any effects or not, it will pass the
request on to the next middleware in the stack. The following middleware may
then either return a response and halt the execution of the middleware stack, or
perform some other operation and then continue to pass the request to the next
middleware in the stack.

If none of the middlewares returns a response early, then eventually all of the
middlewares will have been used and Rack will run the application. We can see
what the application being run is by looking at the last line of `rails
middleware`. In our Rails example, this is `run Rails.application.routes`, which
starts the Rails application itself.

## Writing a middleware

A Rack middleware functions very similarly to a Rack application. When a
middleware is next in the stack, it is initialized and passed the next item in
the middleware stack (which will either be another middleware or the final app
itself). Once it is initialized, Rack will send the middleware object the `call`
method, passing the `env` just as if it were a normal Rack application. The
middleware can then do whatever it is supposed to do and, barring an early
return, will `call` the next application. We don't need to pass each middleware
ourselves – a module called `Rack::Builder` (more on this shortly) will manage the
process of passing each application.

As an example, let's make a very simple authentication middleware. This
middleware will check if the path of the request begins with `/admin` and if it
is, it will make sure that the request parameters include the admin username and
password. If it matches, it will run the next item in the middleware stack. If
it doesn't, it will render an error response using the standardized Rack
response format.

**Note:** We're using a regular expression here to match the route. If it looks
foreign, look up the characters you're not sure about!

```ruby
class AdminAuth
  attr_reader :app
  def initialize(app)
    @app = app
  end

  def call(env)
    req = Rack::Request.new(env)

    # here we are deciding whether to bypass the middleware
    if req.path.match(/^\/admin/)
      # uses methods defined in middleware to verify request
      authenticate_admin(req)
    else
      # skips any middleware functionality
      app.call(env)
    end
  end

  private

  def authenticate_admin(req)
    if valid_admin?(req)
      # passes request on to next middleware
      app.call(req.env)
    else
      # stops progress in the stack and immediately returns a '401' response
      ['401', {}, ["Unauthorized"]]
    end
  end

  def valid_admin?(req)
    req.params['username'] == 'admin' && req.params['password'] == 'password123'
  end
end
```

When this middleware is called, it will check if the request is for an admin
path and simply call the next application in the stack if it isn't. If the path
matches, then it checks if the request parameters have the right credentials
before calling the next application, returning an error if not. A real world
authentication middleware would be more secure and robust than this, but you can
see that with just a few lines of code, we can get some pretty exciting
functionality.

## Rack::Builder

Rack provides a DSL for adding middleware to an application called
`Rack::Builder`. The DSL looks very similar to how you write rails routes. Call `Rack::Builder.new` and pass a block with the middlewares you want to
include. Add a middleware with `use NameOfMiddleWare`. The order in which the
middlewares are listed will be the order in which they will be called. Finally,
add `run NameOfApp` at the end of the block to run your application.

`Rack::Builder.new` will return a new `Rack::Builder` object. Calling `#to_app`
on this object will convert it the type of object we need to pass it into
`Rack::Server#start`.

```ruby
hello_app = Proc.new { |env| ['200', {}, ["Hello world"]] }

app = Rack::Builder.new do
  use AdminAuth
  use OtherMiddleware1
  use OtherMiddleware2
  use OtherMiddleware3
  run hello_app
end.to_app

Rack::Server.start(
  app: app,
  port: 3000
)
```
