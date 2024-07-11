# Namespaces

Although you can rely on Rails content-type routing to delineate what type of
HTTP responses your web app generates, a better pattern is to nest your API
endpoints under a _namespace_.

Namespaces provide a way of encapsulating items--i.e., a way of grouping them
together--often to prevent name collisions. In routing, a namespace is just a
subset of controllers that live under a specific (prefixed) URL. So, e.g., to
access the cats `index` under an `api` namespace, you would go to `/api/cats`
instead of just `/cats`.

## Namespace examples

`admin` and `api` are two commonly used routing namespaces. For instance, in the
initial scenario envisioned above, you could use an `api` namespace to
differentiate `index` routes that return JSON (`/api/cats`) from those that
return HTML (`/cats`). You would then send requests to the appropriate route for
your desired response format.

Or again, you could use an `admin` namespace to create a user `show` page
(`/admin/users/:user_id`) that includes extra information and/or editing
capabilities that do not appear on the publicly accessible page
(`/users/:user_id`). Restricting the entire namespace to admin-level users would
provide a simpler way of securing the enhanced information and functionality
than trying to implement a series of conditional checks in a single controller.

## Setting up namespaces

Creating and using a namespace is easy. Begin by creating a new controller:
`rails g controller api/cats`. Notice that you include your namespace in the
controller name! This command will create a __cats_controller.rb__ file in the
__app/controllers/api/__ directory. (You could, of course, also set up these
files manually.) The controller inside __cats_controller.rb__ will be named
`Api::CatsController`.

Next, tell your router about the new controller:

```rb
# config/routes.rb

namespace :api do
  resources :cats, only: [:index]
end
```

Running `rails routes` will then produce

```sh
  Prefix Verb URI Pattern         Controller#Action
api_cats GET  /api/cats(.:format) api/cats#index
```

While that will work, there is one other tweak that will help improve
efficiency. You know that your `api` namespace will always want to return JSON,
so you might as well set `:json` as the default content-type for responses in
the `api` namespace:

```rb
# config/routes.rb

namespace :api, defaults: { format: :json } do
  resources :cats, only: [:index]
end
```

Now when you run `rails routes`, you should see

```sh
  Prefix Verb URI Pattern         Controller#Action
api_cats GET  /api/cats(.:format) api/cats#index {:format=>:json}
```

The `defaults: { format: :json }` tells Rails to prefer JSON-based file
extensions like __.json.jbuilder__ over __.html.erb__ extensions when rendering
views in this namespace. This means that Rails will resort to an __.html.erb__
view only if it can't find any corresponding JSON view.

Finally, provide the appropriate JSON view by putting an __index.json.jbuilder__
view in the __app/views/api/cats/__ directory so your new `Api::CatsController`
can find it. Now you can access your API endpoint on `localhost:3000/api/cats`.

## Additional resources

For more information on namespaces in routing, see the [Rails Guide to
Routing][namespaces].

[namespaces]: https://guides.rubyonrails.org/routing.html#controller-namespaces-and-routing
