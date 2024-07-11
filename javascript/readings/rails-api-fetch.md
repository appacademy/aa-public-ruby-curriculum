# Using Rails As An API

So far, you've used Rails to handle all the different parts of the web
application stack:

* Database management (Active Record models)
* Request routing (routes and controllers)
* User interface (views)

When you get to the React portion of the curriculum, however, you will shift
responsibility for creating the user interface from the Rails backend to the
React frontend. This reading introduces you to this shift. By the end, you 
should be able to describe

* The potential benefits of shifting from server-side rendering to client-side
* The changes that such a shift require on the frontend
* The changes that such a shift require on the backend

## Overview: Server-side rendering vs. client-side rendering

The Rails apps you have created thus far have all responded to browser requests
by constructing HTML pages that display the requested information/results. This
approach of rendering the user interface on the backend is known as *server-side
rendering*.

In the upcoming React unit, you'll learn a different approach: *client-side
rendering*.

No longer will you render your application's user interface on the server using
ERB templates. Instead, you will render your user interface on the
frontend--i.e., on the *client*--using JavaScript.

When you load or refresh a page in your application, your backend will serve up
a minimal HTML document with an empty `body`. Your JavaScript will then
construct the page's contents via the DOM API. Any data it needs to render the
page it will request with AJAX. Your backend will then respond with the
requisite data as [JSON].

> **Note**: It is also possible to set up your Rails backend so that it serves
> up nothing but JSON responses to AJAX requests, i.e., so that it serves up
> **no** HTML at all. You will learn to implement this pattern as well once you
> get to the React curriculum.

After this initial page load, every subsequent user interaction that would
normally trigger an HTTP request--clicking an internal link, submitting a form,
pressing a delete button, etc.--you'll prevent from doing so, instead making the
request with AJAX.

Since AJAX requests are asynchronous, the DOM will remain intact and interactive
while you wait for the server's response. Upon receiving a JSON response, your
JavaScript code can then update the DOM as needed. This means no more full page
reloads on every navigation or form submission!

As you might have noted, your backend serves a very different role in an
application that uses client-side rendering: it is now a service to be consumed
by your frontend for retrieving and updating persistent data. A backend that
serves this role is commonly known as an `API`.

Routes in a backend API no longer correspond to pages in your application's user
interface but instead simply to CRUD operations; as such, they are commonly
referred to as `endpoints`.

Let's see an example comparing server-side rendering with client-side rendering.

## Server-side rendering

Suppose this is your `CatsController`:

```ruby
# app/controllers/cats_controller.rb

class CatsController < ApplicationController
  def index
    @cats = Cat.all
    render :index
  end
end
```

And this is the `index` ERB template:

```html
<!-- app/views/cats/index.html.erb -->

<h1> Cats </h1>

<ul>
  <% @cats.each do |cat| %>
    <li><%= cat.name %>: <%= cat.color %></li>
  <% end %>
</ul>
```

Now imagine you click a link that goes to `/cats`. The following series of
events would unfold:

1. The browser generates a `GET` request to `/cats`
2. `cats#index` handles the request; it retrieves cat data from the database and
   calls `render: index`
3. Rails generates an HTML document from the __index.html.erb__ template and
   sends this HTML back to the frontend
4. The frontend discards the previous page and replaces it with the new HTML--a
   full page refresh

## Client-side rendering

Now consider an application that uses client-side rendering. Since HTTP requests
are instead made using AJAX in such an application, the differences begin on the
frontend when you click the `cats` link.

### Differences on the frontend

When you click a link that goes to `/cats`, your JavaScript cancels the default
browser `GET` request and instead makes a request to `GET /cats` via AJAX,
expecting a JSON response.

If the link looks like so:

```html
<a id="cats-link" href="/cats">Go the Cats Index Page!</a>
```

The JavaScript might look like so:

```js
document.getElementById("cats-link").addEventListener("click", (event) => {
  event.preventDefault(); // Prevent browser-generated GET request
  history.pushState({}, "", "/cats"); // Change URL without reloading the page
  
  fetch("/cats") // AJAX request
    .then(response => response.json()) // parse response as JSON
    .then(catData => renderCatPage(catData)); // Render cats index page
});
```

Don't worry about the exact implementation details here, such as
`history.pushState`; in the future, you'll use libraries like React and React
Router to handle these implementation details for you.

The key takeaway: the standard HTTP request is replaced by an AJAX request,
which receives JSON data from the backend. Your JavaScript code is then
responsible for rendering a cats index page with the provided data.

### Differences on the backend

So what does this mean for the backend?

`GET /cats` is now an endpoint in your backend API that must render JSON data.
To respond with JSON, you could simply `render json: @cats` instead of `render
:index` in your `CatsController`:

```ruby
# app/controllers/cats_controller.rb

class CatsController < ApplicationController
  def index
    @cats = Cat.all
    render json: @cats
  end
end
```

Alternatively, you could continue to use an index template--i.e., you could
still use `render :index`--but define the template in an __index.json.jbuilder__
[Jbuilder][jbuilder] view instead of in an __index.html.erb__ view. You will get
lots of practice using Jbuilder later. For now, just know that Jbuilder is a
library that lets you structure JSON responses using view templates.

Your `index` Jbuilder template might look like so:

```ruby
# app/views/cats/index.json.jbuilder

json.array! @cats
```

This template simply generates a JSON array of `@cats` (equivalent to `render
json: @cats`).

If `render :index` can refer to an ERB file or a Jbuilder file, how does Rails
know which to look for? By default Rails will look for an ERB file, but you can
override this in a few ways:

1. You can configure a route or set of routes to have a default response format
   of JSON using the [`defaults` option][defaults]. This is the easiest
   approach, and one you will frequently use later in the course. To set the
   default for a single route, just include the `defaults` option in the route
   declaration:

   ```rb
   # config/routes.rb

   get 'cats/', to: 'cats#index', defaults: { format: 'json' }
   ```

   To set the default response format to JSON for all your cat routes, simply
   wrap the route declarations in a `defaults` block:

   ```rb
   # config/routes.rb

   defaults format: :json do
     resources :cats
   end
   ```

2. You can also explicitly specify the type of response that you want in the
   request, either in the request's [`Accept` header][accept-header] or in the
   URI itself (e.g., going to `/cats.html` or `/cats.json`). Accordingly, if you
   want to request a JSON response, you can set the `Accept` header to
   `application/json` like this:

   ```js
   fetch("/cats", { headers: { 'Accept': 'application/json' }}) 
      .then(response => response.json());
   ```

   To specify an HTML response, you would set `Accept` to `text/html`.

   By default, your Rails controller will try to match whatever format the
   request specifies. If you have not set up a view template for the requested
   format, Rails will report `No template found` and render `head: no content`
   with `204 No Content` status.

   You can, however, generate a more appropriate error response by using
   [`respond_to`] to explicitly set the format types in which your action can
   respond. For instance, to enable your cats `index` action to respond with
   either HTML or JSON, you could add the following to your controller:

   ```rb
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

   This block format for `respond_to` works well if you want to specify
   non-standard return values inside the `{}`s. Here, however, each option
   simply renders the default `index` template for each format. Because this is
   Rails, there is syntactic sugar for this case: `respond_to :html, :json`,
   which will generate the default response for each format.

   Now your index action will respond only to requests for responses formatted
   in HTML or JSON. Requesting any other response format will produce a `406 Not
   Acceptable` error response. (If the request does not specify a response
   format, the action will just respond in its default format.)

## What you've learned

In this reading, you learned how to configure a Rails app so that the backend
functions primarily as an API server and the frontend handles the rendering. By
eliminating the need for many full-page refreshes, this type of client-side
rendering helps create a speedier and more responsive user experience. Towards
implementing this model, you learned how to intercept and replace frontend
browser requests with AJAX calls that request JSON responses by setting an
`Accept` header. You then learned how to configure the backend to respond to
requests with JSON rather than HTML by using such Rails features as a `defaults`
option and the `respond_to` method.

[JSON]: https://developer.mozilla.org/en-US/docs/Glossary/JSON
[defaults]: https://guides.rubyonrails.org/routing.html#defining-defaults
[accept-header]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept
[jbuilder]: https://github.com/rails/jbuilder
[`respond_to`]: https://api.rubyonrails.org/classes/ActionController/MimeResponds.html#method-i-respond_to
