## Phase III: Playing with parameters

Now you're going to focus on how data comes into your controllers from the
outside world.

The key method here is `#params`. `#params` is a method provided by
`ActionController::Base` that returns a Hash-like object of all the parameters
available. The parameters are compiled by the router and are sourced from three
places:

1. Route parameters (e.g., the `:id` from `/users/:id`)
2. A query string (i.e., the part of the URL after the `?`: `?key=value`)
3. `POST`/`PATCH`/`PUT` request data (i.e., the body of an HTTP request)

Make some `GET` requests to `/users` that include some key/value pairs in the
query string, e.g., `/users?fav_food=pizza` or `/users?admin=true`.

Check out the server log and notice that it logs how the parameters are coming
in:

```text
Started GET "/users?fav_food=pizza" for ::1 at 2022-02-21 12:32:02 -0500
Processing by UsersController#index as */*
  Parameters: {"fav_food"=>"pizza"}
  Rendering text template
  Rendered text template (Duration: 0.5ms | Allocations: 3)
Completed 200 OK in 3ms (Views: 2.4ms | Allocations: 192)
```

Now make some `POST` requests to `/users` playing around with `POST` data and
see how the parameters come in. This means putting the data in the request body
instead of in the query string. Click on the 'Body' tab in Postman and enter the
key/value pairs there. Make sure to change the HTTP verb to `POST`.

Think about what controller action you will hit when you make a `POST` request
to `/users` (check your routes again). Once again, you'll get the error that
this action is not defined on your `UsersController`:

```text
Started POST "/users" for ::1 at 2022-02-21 12:36:07 -0500
  
AbstractController::ActionNotFound (The action 'create' could not be found for UsersController):
...
```

Go ahead and add that method to the controller. Again, if you don't explicitly
render or redirect, Rails is going to try to render the template with the same
name; it's going to look for __create.html.erb__ in your __app/views/users__
folder, which you don't have. To prevent this, you need to explicitly render
something simple back. In this case, render the params that came in with the
request. You can `render json:`, which will automatically call `to_json` on the
object you're rendering (here, your `params`) and package it up for you so that
it can be sent back with the response:

```ruby
# app/controllers/users_controller.rb

class UsersController < ApplicationController
  def create
    render json: params
  end
end
```

Try making the request in Postman again. You should see the right response now!

```json
{
  "fav_food": "pizza",
  "controller": "users",
  "action": "create"
}
```

Okay, you've seen params come from the query string and the request body. Now
you will send them from the third and final place they can come from: the route
params.

When you include `show`, `delete`, and `update` routes in your `resources`,
Rails constructs _Uniform Resource Identifier (URI) patterns_ for these that
include a _dynamic segment_ matcher. A URL path is split into _segments_ by
`/`s. A _dynamic segment_ is any segment of the URI pattern that begins with a
`:`. If you look at your routes, you can see these wherever the URI pattern is
`users/:id(format)`. The `:id` indicates that the router will match anything put
into that segment of the URL and save it in `params` under the key `id`.

Try making a `GET` request to `/users/:id`. In Postman, this means setting
the URL to something like '/users/2', where 2 is the `id` of the `User` you want
to see.

Once again, you get the same error. You are matching the `UsersController#show`
route, but you don't have that action defined on the controller. Go ahead and
add it, and once again `render json: params`. Now try the request again. You see
the `:id` matcher saved the `2` from your URL in the params!

```json
{
  "controller": "users",
  "action": "show",
  "id": "2"
}
```

> Note: If you forget to change your verb back to `GET` in Postman, you will get
> an error because there is no `POST` route with the URI pattern `users/:id`:

```text
Started POST "/users/2" for ::1 at 2022-02-22 11:53:43 -0500
  
ActionController::RoutingError (No route matches [POST] "/users/2"):
```

> Just change the verb to `GET` and you should be good to go!

### Nesting parameters

Notice how all of your parameters come in at the top level of `params`. What if
you want to structure it a bit differently so that certain parameters come in
nested under others (i.e., a hash within a hash), like so:

```json
{
  "id": 5,
  "some_category": {
    "a_key": "another value",
    "a_second_key": "yet another value",
    "inner_inner_hash": {
      "key": "value"
    }
  },
  "something_else": "aaahhhhh"
}
```

Here's how you would accomplish this:

```html
<!-- in Postman's "Body" tab -->
some_category[a_key]: another value
some_category[a_second_key]: yet another value
some_category[inner_inner_hash][key]: value
something_else: aaahhhhh

<!-- in the query string -->
'/users?some_category[a_key]=another+value&some_category[a_second_key]=yet+another+value&some_category[inner_inner_hash][key]=value&something_else=aaahhhhh'
```

If you follow this bracket notation, Rails will nest the parameters for you. The
rule is that the keys in brackets get nested deeper in `params`.

Try it out a few times with both `GET` and `POST` requests. Make sure you're
looking at the parameters that come in with the request, either through your
controller action's rendering them back as JSON to Postman or in the server
logs.

In the [fourth and final phase](README-pt4.md), you will add models to the mix.
