## Rack

Rails does many things for us, but as a server-side framework its
purpose can be summed up as receiving and parsing HTTP requests and
generating HTTP responses to send back to the client. When we build
RailsLite, we will build up some of this functionality for ourselves,
but we won't have to start from scratch.

There are many different Web application frameworks for each language (Ruby has
Rails, Sinatra, Hanami and others). Everyone has different opinions about
what is important and how things should be done. There are also many different
web servers. This is great because it
gives application developers a ton of freedom to choose servers and frameworks
that they like and that suit their application.

However, it does mean that every framework needs to be able to integrate with
every server. As an enterprising framework developer who wants your framework to
work with every single server you might be worried about writing a different
handler for each server.

### Middleware to the rescue

Fortunately there is something called *middleware* to make this much easier.
Middleware is software that sits between the web server and the web framework
and provides a standardized interface. This way as long as your framework is
built on middleware that knows how to integrate with all the web servers, any
web server will work out of the box.

The middleware used by ruby developers is called Rack. Rack has a lot of cool
utilities and functions, but at its core it is very simple and allows you to
make Web application frameworks without knowing the nitty gritty of how each and
every web server functions under the hood.

To create a very simple Rack server, we only need to follow a few basic steps:
* Require the 'rack' library
* Create an object that responds to a `#call` method
* The `#call` method should take one argument, conventionally called `env`, that
  bundles all the data about the request
* The `#call` method should return an array with three elements:
  * An HTTP status code (like '200' or '404')
  * A hash of headers
  * A response body
* Pass the object to `Rack::Server#start`

```ruby
require('rack')

class App
  def call(env)
    http_status = '200'
    headers = { 'Content-Type' => 'text/html' }
    body = ['hello world']

    [http_status, headers, body]
  end
end

Rack::Server.start(
  app: App.new
)
```

Try running this in pry or another REPL. This should start a process that looks
similar to what happens when we run `rails server`. Now navigate to
`localhost:8080` (this is the default port, but we can change that by passing an
option to `Rack::Server#start`). You should now see the response body 'hello
world' in the browser!

### Rack as a simple web framework

Now recall that HTTP requests and responses are basically just specially
formatted strings. We don't want to parse or construct these
strings directly ourselves; that would be error-prone and laborious . Instead the
`Rack::Request` and `Rack::Response` classes abstract
HTTP request and response strings into Ruby objects. We can then
examine and manipulate these request and response objects using
methods, and leave the actual parsing and creation of raw HTTP strings
to Rack. Check it out:

```ruby
app = Proc.new do |env|
  req = Rack::Request.new(env)
  res = Rack::Response.new
  MyController.new(req, res).go
  res.finish
end

Rack::Server.start(
  app: app,
  Port: 3000
)
```
In this case, we use a `Proc` object instead of creating a new class, since a
`Proc` object in Ruby already responds to the `#call` method.

We then give the `app` to Rack and tell it to start the server on port 3000. It
will then take incoming requests from the server and parse and package up the
request string into an env object.

Our `app` then takes that `env` object, generates a `Request` object from it, and also creates a blank `Rack::Response` object so
we don't have to worry about properly serializing and formatting the response
ourselves. The `req` and `res` objects are then given to `MyController` which we call
the `go` method on to build up the response object.

We then call `Rack::Response#finish` to tell Rack we're done
building the response. Our `app` can return it to Rack where it will be
serialized, turned into a response string and given to the web server to hand
back to the client.
