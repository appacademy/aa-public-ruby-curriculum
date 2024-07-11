# Using Rails as an API

So far, we've used Rails to handle all the different parts of our web
application stack:

* Database management (ActiveRecord )
* Request routing (router and controllers)
* User interface rendering (views).

While Rails certainly excels at all these things, we're now moving into the next
iteration of our web application stack: client-side rendering. Going forward,
we'll be applying more and more Javascript when rendering our pages to create
dynamic content. This means that we'll be relying on Rails HTML views less and
less. Eventually, our Rails **endpoints** (controller actions) will stop serving
HTML and only serve database information (as `json`) to be used by our client-side
rendering scripts. When a web server provides non-UI formatted information
like this, we call it a **web API**.

## What is an API?

From [Wikipedia][wiki]:  

`A **server-side web API** is a programmatic interface consisting of one or
more publicly exposed endpoints to a defined request-response message system,
typically expressed in JSON or XML, which is exposed via the web—most
commonly by means of an HTTP-based web server.`

The Rails projects we've done so far haven't been APIs, because they've tightly
coupled database information to a pre-defined set of fixed UI-templates (our
views). To make Rails an API, we're going to rewrite those views so that they
serve up raw JSON information instead of HTML; we'll call these views
**endpoints**.

This setup will let us write client-side Javascript that utilizes our endpoints
to render our UI dynamically by requesting, posting, and displaying server
information as it executes.

## Example

### Static HTML Implementation (The Old Way)

Take a look at this `CatsController`:

```ruby
# app/controllers/cats_controller.rb

class CatsController < ApplicationController
  def index
    @cats = Cat.all
    render :index
  end
end
```

It should render the following template whenever we visit `localhost:3000/cats`:

```erb
<!-- app/views/cats/index.html.erb -->
<h1> Cats </h1>

<ul>
<% @cats.each do |cat| %>
  <li><%= cat.name %>: <%= cat.color %></li>
<% end %>
</ul>
```

Let's go ahead and change this around to be an API. We want
`localhost:3000/cats` to no longer give us a static HTML page, but rather a
text-based representation of said cats that our client-side Javascript can use
to render a dynamic view.

### API Implementation (The New Way)

Our application needs to be able to respond to client-side requests for JSON.
Lucky for us, Rails is smart enough to route HTTP requests for different data
types to the corresponding views for that type. If a request with a header for
[`Accept: application/json`][http-accept] comes in, `CatsController#index` will
automatically try to render `app/views/cats/index.json.jbuilder` instead of the
`app/views/cats/index.html.erb` view we wrote earlier. All we have to do is
write that view:

```ruby
# app/views/cats/index.json.jbuilder

json.array! @cats
```

The code above renders a JSON array of cat objects by simply passing `@cats` to
the Jbuilder's `json.array!` method.

Don't worry if you've never heard of [Jbuilder][jbuilder]. It's just a gem that
lets us write Ruby code to create JSON objects, much like how ERB is used to
create HTML. We'll be learning more about it soon!

If you're interested in how Rails resolves the response type, check out
[this blog post][blog].

[http-accept]: https://github.com/rails/rails/blob/master/actionpack/lib/action_controller/metal/mime_responds.rb#L35
[blog]: http://blog.bigbinary.com/2010/11/23/mime-type-resolution-in-rails.html
[jbuilder]: https://github.com/rails/jbuilder

## Using the API

If we now use our client-side rendering scripts to make an AJAX `GET` request, AJAX will try to make an intelligent guess and set the `Accept` header in our request to XML, JSON, script, text or html.

> The [`Accept` header][accept-header] advises which content types, expressed as MIME types, the client is able to understand.

Let's take a look at the following request:

```js
$.get({
  url: '/cats'
})
```
The generated request will set the `Accept: '*/*'`, and effectively **advises** our Rails server that any type of response will be OK. In this particular case, Rails will decide which response to return based on our controller's `respond_to` ordered values (see below for an example). 


If we **try** (and we say try because the server will **try to accommodate our request**) to get a JSON response rather than an HTML one, we need to specifically set the `dataType`.

```js
$.get({
  url: '/cats',
  dataType: 'json'
})
```
The above will set our `Accept` header...

```ruby
  application/json, text/javascript, */*; q=0.01
```

...to successfully letting the server know that we prefer `JSON` responses. 

```json
[
  {"id": 1, "name": "Amitabh", "color": "Gray"},
  {"id": 2, "name": "Fabio", "color": "Calico"}
]
```

Our client-side JS can then parse and use the information easily to present our
information dynamically (i.e. according to our instructions).

**NB:** We can still get our old HTML view by making an `Accept: text/html`
request to `localhost:3000/cats`, but at this point, who'd want to?


## respond_to

Fortunately, controllers are versatile. A single controller can handle both JSON
and HTML requests. By looking at the requested `Accept` header or the format of the
URI (i.e., going to `/cats.html` vs `/cats.json`), the controller can determine
which format our response should be populated in and then act accordingly.

```ruby
# app/controllers/cats_controller.rb

class CatsController < ApplicationController
  def index
    @cats = Cat.all
    
    respond_to do |format|
      format.html { render :index }
      format.json { render :index }
    end
  end
end
```

Any request for HTML will hit the `index.html.erb` view and any request for JSON
will hit the `index.json.jbuilder` view. The controller knows where to go based on
the format.

[wiki]: https://en.wikipedia.org/wiki/Web_API
[accept-header]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept
