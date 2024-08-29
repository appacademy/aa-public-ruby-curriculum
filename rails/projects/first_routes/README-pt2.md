## Phase II: First request

In this phase, you will build your first controller, launch your server, and
make your first request.

### First controller

The router defines API endpoints (i.e., URL path/HTTP verb combinations) and
records which controller and action to invoke for each one. Each API endpoint
has a conventional meaning: **C**reate, **R**ead, **U**pdate, or **D**estroy a
resource. (These actions are collectively known as _CRUD_.) The
controllers and their actions are the ones actually doing the **CRUD**ing.

Create your first controller by navigating to __app/controllers__ and creating
a new file called __users_controller.rb__ containing the following skeleton:

```rb
# app/controllers/users_controller.rb

class UsersController < ApplicationController

end
```

Note that **controllers are always plural**; a controller manages requests that
pertain to a collection of _resources_. A resource is generally anything that
has a table in your database. In other words, it is anything in your application
that you will be CRUDing.

Controllers inherit from `ApplicationController`, which is a controller itself,
but one that never actually handles any requests directly.
`ApplicationController` is where you'd put helper methods that you want to share
across all controllers. If you look in
__controllers/application_controller.rb__, you will see that
`ApplicationController` inherits from `ActionController::Base`.
`ActionController::Base` provides all of the bells & whistles that Rails
controllers have; it's a lot like `ActiveRecord::Base` in that respect. All of
your controllers will inherit the features it provides since it is in the
inheritance chain:

```rb
UsersController < ApplicationController < ActionController::Base
```

Now that you have some routes and a matching controller, you have everything you
need to start handling requests.

### First launch

You have your API endpoints set up and they map to a controller that you've
created. How do you actually start taking requests?

```text
% rails server
=> Booting Puma
=> Rails 7.0.2.2 application starting in development 
=> Run `bin/rails server --help` for more startup options
Puma starting in single mode...
* Puma version: 5.6.2 (ruby 3.1.0-p0) ("Birdie's Version")
*  Min threads: 5
*  Max threads: 5
*  Environment: development
*          PID: 54618
* Listening on http://127.0.0.1:3000
* Listening on http://[::1]:3000
Use Ctrl-C to stop
```

Rails ships with a web server called Puma.

As you can see, it loads your application in _development_ mode (you'll learn
about the other two modes--_production_ and _testing_--later) and listens for
requests at `http://0.0.0.0:3000`. The last part, `:3000`, specifies the port it
is listening on. Rails defaults to port 3000 in development. The domain
`http://0.0.0.0` can be accessed from your browser simply as `http://localhost`.

In your browser, navigate to `http://localhost:3000`. Voilà! A running Rails app
with what will become a very familiar index page.

### First request

Postman should already be installed, but if not, go ahead and [install
it][postman].

Try to get a list of all your users, i.e., your _users index_. This means you
need to make a request that matches the HTTP verb and URL path that routes to
`UsersController#index`. If you run `rails routes`, you can see this is a
`GET` request to `/users`. Go ahead and make that request with Postman. (Make
sure to keep your rails server running in a terminal tab!)

Okay, that didn't work. Why not?

The server log will be where you'll go to see what's going on in your
application. All the `puts` and `p` statements in your application will also go
to the server log. **Always look at the server log**; this is an essential
debugging technique. You'll see what some of the most important information is
in just a second. Here's what you see in the log:

```text
Started GET "/users" for ::1 at 2022-02-21 12:17:40 -0500
  ActiveRecord::SchemaMigration Pluck (1.3ms)  SELECT "schema_migrations"."version" FROM "schema_migrations" ORDER BY "schema_migrations"."version" ASC
  
AbstractController::ActionNotFound (The action 'index' could not be found for UsersController):
...
```

> Note: The `ActiveRecord::SchemaMigration` line will appear only for the first
> request to the server; if it's not there, don't worry about it!

Looks like a request came in; what's the error? It seems like it's complaining
that you don't actually have an `index` action setup in your `UsersController`.
Note that your application looked for an `index` action because the router
specified that a `GET` request to `/users` maps to `users#index`, which is the
Rails shorthand for `UsersController#index`.

Fix the problem by adding an empty `index` action to your `UsersController`:

```ruby
# app/controllers/users_controller.rb

class UsersController < ApplicationController
  def index
  end
end
```

Make the request in Postman again. It fails again, so look at the log:

```text
Started GET "/users" for ::1 at 2022-02-21 12:22:35 -0500
Processing by UsersController#index as */*
No template found for UsersController#index, rendering head :no_content
Completed 204 No Content in 0ms (ActiveRecord: 0.0ms | Allocations: 85)
...
```

> Note: If you make a `GET` request through a browser at this point--i.e., if
> you go to `http://localhost:3000/users`--you will get a `406 Not Acceptable`
> status code.

This time, it's complaining that there's a missing template. Wait a minute; you
never called `render`. Why is it trying to look for a template at all? Because
in the absence of an explicit `render` statement, your controller will by
default try to render a template with the same name as the controller action.
In this case, it was looking for a template called __index.html.erb__ in
__app/views/users__.

You're not going to deal with views and templates just yet. To get rid of this
error, just add a simple render:

```ruby
# app/controllers/users_controller.rb

class UsersController < ApplicationController
  def index
    render plain: "I'm in the index action!"
  end
end
```

Try again. It should work! Now take a look at the server log.

```text
Started GET "/users" for ::1 at 2022-02-21 12:28:24 -0500
Processing by UsersController#index as */*
  Rendering text template
  Rendered text template (Duration: 0.0ms | Allocations: 9)
Completed 200 OK in 3ms (Views: 2.8ms | Allocations: 684)
```

For every request, the server will tell you which controller and action is
processing it. In this case, it was the `UsersController`'s `index` action.

Woohoo! Your Postman request should have returned the string, "I'm in the index
action!" Victory is yours. Congratulations on successfully setting up, making,
and processing your first Rails request!

Now head to [Phase III](README-pt3.md), where you will get familiar with the various types of
parameters.

[postman]: https://www.getpostman.com/
