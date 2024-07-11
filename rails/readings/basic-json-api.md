# Building a JSON API

A browser issues HTTP requests to a web server. For instance, a
browser issues a `GET` request when you click a link (`<a>` tag), or a
`POST` may be issued when you submit an HTML form. A typical Rails
application will reply with HTML that will then be displayed by the
browser.

Browsers aren't the only program that can make HTTP requests. When a
non-browser client makes an API request, the requestor probably
prefers a raw representation of the data rather than an HTML document
that includes a lot of extraneous formatting information and is
difficult to parse. JSON is typically a better format for non-browser
clients.

Consumers of a web API can be third-party developers, but you can also consume
your own API. Your web app may contain JavaScript code that the user's browser
runs; this JS code may make background requests to the API to dynamically update
content. You'll learn more about this when you get to the JavaScript module; the
point here is that even if you don't support third-party partners, you may find
yourself using your own API.

APIs are big, friend.

## JSON and Rails

The key to building a Rails API is to get your controllers to convert model
objects into JSON, and then return the JSON. This requires support at two
layers: the model layer (convert a model to JSON) and the controller layer
(return the JSON to the user).

### Models and `to_json`

Let's take a look at the model layer:

```ruby
$ rails console
> Wizard.first
=> #<Wizard id: 1, fname: "Harry", lname: "Potter", house_id: 1,
school_id: 1, created_at: "2013-06-04 00:31:04",
updated_at: "2013-06-04 00:31:04">

> Wizard.first.to_json
=> "{\"created_at\":\"2013-06-04T00:31:04Z\",\"fname\":\"Harry\",
\"house_id\":1,\"id\":1,\"lname\":\"Potter\",
\"school_id\":1,\"updated_at\":\"2013-06-04T00:31:04Z\"}"
```

Note that the `to_json` method actually produces a JSON string.

### Controllers and `render json:`

Controllers, too, support responding to a request with JSON.

Remember that all controller actions must end in some response back to the
requestor. That response in Rails is built by calling either `render` (places
something in the response body) or `redirect_to` (sends a response that asks the
requestor to make a whole new request to a different URL).

Usually, when you call `render`, you'll specify an **HTML template**. An HTML
template consists of HTML code, with annotations where data can be inserted.
You'll learn more about them soon.

Today you just want to send a JSON representation of a certain object. Easy
enough:

```ruby
class UsersController < ApplicationController
  def index
    users = User.all
    render json: users
  end

  def show
    user = User.find(params[:id])
    render json: user
  end
end
```

A few things to note:

* The controller specifies that it is rendering JSON with `render json:`.
* Under the hood, the object you pass will automatically have `to_json` called
  on it, so there is no need to explicitly call it on the object.
* `to_json` works on both collections (arrays) and individual objects.

And now you know everything about JSON!

## Resources

* [`to_json` or `as_json`?][to-json-as-json]

[to-json-as-json]: http://jonathanjulian.com/2010/04/rails-to_json-or-as_json
