# Routing I: Basics

The Rails router recognizes URLs and chooses the controller action to which it
will dispatch the request for processing. The router is the part of Rails which
receives a `GET` request for `/patients/17` and realizes that
`PatientsController#show` should be called for Patient \#17. Note that the
router matches on both HTTP method and path.

The router defines the structure of your application's API. The router defines
what the valid paths are and decides what code to run to construct the response.

## Resource routing: The Rails default

Say that you have a `Photo` model, and you would like to begin building a
`PhotosController` to display photos, create new ones, edit existing ones,
delete old ones...

**Resource routing** will generate a mapping from a set of conventional URL
paths to a set of conventional controller actions. Accordingly, you can create
your first resource routing like so:

```ruby
# config/routes.rb
FlickrClone::Application.routes.draw do
  resources :photos
end
```

This single line in __config/routes.rb__ will generate a map of the following
requests for URLs to a set of controller actions in the `PhotosController`.

| HTTP Verb          | Path             | action  | used for                                     |
| ------------------ | ---------------- | ------- | -------------------------------------------- |
| GET                | /photos          | index   | display a list of all photos                 |
| GET                | /photos/new      | new     | return an HTML form for creating a new photo |
| POST               | /photos          | create  | upload and create a new photo                |
| GET                | /photos/:id      | show    | display a specific photo                     |
| GET                | /photos/:id/edit | edit    | return an HTML form for editing a photo      |
| PATCH or PUT       | /photos/:id      | update  | update a specific photo                      |
| DELETE             | /photos/:id      | destroy | delete a specific photo                      |

The areas in the path that start with a `:` (i.e., `:id`) are called _dynamic
segments_; `:id` can match any string not containing a `/`. `GET /photos/5` and
`GET /photos/203` both map to the same controller action (`show`). The
controller will be able to access the value of `:id`, which will be either 5 or
203, respectively.

Typically, `:id` will be the primary key of the model to
`show`/`edit`/`update`/`destroy`.

Your routes are now set up; you can begin writing your controller actions to
implement these actions!

### Follow the conventions

Controllers are **always** named in the plural: `PhotosController`,
`UsersController`, etc. When defining a plural resource (`resources`), use the
plural name of the model/controller (`:photos`).

As you will see later, you can also declare singular resources, but don't worry
about that yet. Even with a singular `resource`, you will continue to name your
controllers in the plural.

### What does RESTful mean?

You will learn later about what REST means and what it means to define RESTful
routes. For now, simply note that the structure of the URLs and HTTP methods all
specify creating/reading/updating/destroying a **resource**, which is a `Photo`.

The REST philosophy is that even more complicated actions, like "liking a
photo", should be thought of in terms of _CRUD_
(**C**reate/**R**ead/**U**pdate/**D**estroy) actions on resources. For instance,
instead of creating a custom, non-RESTful controller action to "like" a photo,
you might create a new resource, a `Like` object, which you could then create
and destroy in the normal way.

This part doesn't need to make a lot of sense right now; you kind of have to
live the experience before you can buy into the philosophy. But keep in the back
of your mind the idea that in REST, URLs refer either to collections of
resources or to single instances of resources. The different HTTP methods
specify the limited number of things you can do to a collection/instance
(create, read, update, destroy).

## Paths and routing helpers

Specifying a resource route will also create a number of **routing helper
methods** that your controllers and views can use to build URLs. In the case of
`resources :photos`:

| method                   | url                                                    |
| ------------------------ | ------------------------------------------------------ |
| `photos_url`             | `http://www.example-site.com/photos`                   |
| `new_photo_url`          | `http://www.example-site.com/photos/new`               |
| `photo_url(@photo)`      | `http://www.example-site.com/photos/#{@photo.id}`      |
| `edit_photo_url(@photo)` | `http://www.example-site.com/photos/#{@photo.id}/edit` |

Always prefer the routing helpers to building your own URLs through string
interpolation. The routing helpers are less error prone and tedious. They are
also clearer semantically and more easily changed. If you build URLs by hand
in Rails, **you're doing it wrong**.

Because the router also looks at the HTTP verb when routing a request for a
path, these four URLs actually map to seven different actions. The helpers
correspond to the RESTful actions as follows:

* `photos_url`: index (`GET`), create (`POST`)
* `new_photo_url`: new (`GET`)
* `photo_url(@photo)`: show (`GET`), update (`PATCH`, `PUT`), destroy (`DELETE`)
* `edit_photo_url(@photo)`: edit (`GET`)

Finally, note that you can easily embed query-string options into the
routing helpers:

```rb
photos_url(recent: true) == http://www.example-site.com/photos?recent=true
```

On the streets, you will see a `_path` version of these helpers; the `_path`
version just gives you the path component, not the full URL (`/photo`,
`/photo/:id/edit`). Make life easy and never use `_path`; just be consistent and
use `_url` all the time.

| HTTP Verb | Controller#action  | Path             | URL                                       |
| ----------| ------------------ | ---------------- | ----------------------------------------- |
| `GET`     | `Photos#index`     | `/photos`        | `http://www.example-site.com/photos`        |
| `GET`     | `Photos#edit`      | `/photos/1/edit` | `http://www.example-site.com/photos/1/edit` |

## Inspecting and testing routes

To get a complete list of the available routes in your application, execute the
`rails routes` command in your terminal. This will list all of your routes, in
the same order that they appear in `routes.rb`. For each route, you'll see:

* The route name; you can tack `_url` after this to get the routing
  helper,
* The HTTP verb used,
* The URL pattern to match,
* The `controller#action` to route to

For example, here's a small section of the `rails routes` output for a RESTful
route:

```sh
    users GET    /users(.:format)          users#index
          POST   /users(.:format)          users#create
 new_user GET    /users/new(.:format)      users#new
edit_user GET    /users/:id/edit(.:format) users#edit
```

Notice that the create route--listed second above--does not repeat the URL name
`users`. Rails does this to reduce redundancy, since the create route has the
same URL structure as the index action.

Distinct routes can have the same URL structure because the router matches for
HTTP method as well as path. For instance, notice that there is no `create_user`
URL name. That's because the `create` action corresponds to a `POST` request to
`/users`. `/users` already has a URL helper: `users_url`. We do not have
different URL helpers for `index` and `create` actions because they are both
activated by different request methods (`GET`/`POST`) to the same URL
(`/users`).

**TIP**: You'll find that the output from `rails routes` is much more readable
if you widen your terminal window until the output lines don't wrap. Enlarge
your terminal appropriately. Alternatively, you can run `rails routes
--expanded`, or just `rails routes -E`, which will show the route information
like this:

```sh
% rails routes --expanded
--[ Route 1 ]-------------------------------------------------------------------
Prefix            | users
Verb              | GET
URI               | /users(.:format)
Controller#Action | users#index
--[ Route 2 ]-------------------------------------------------------------------
Prefix            | 
Verb              | POST
URI               | /users(.:format)
Controller#Action | users#create
--[ Route 3 ]-------------------------------------------------------------------
Prefix            | new_user
Verb              | GET
URI               | /users/new(.:format)
Controller#Action | users#new
```

## Using `root`

You can specify the controller action that Rails should run for `GET /` by using
the `root` method:

```ruby
root 'posts#index'
```

This invokes the `PostsController`'s `index` method when the root URL is
requested.

## Additional resources

* [Rails Guide on Routing][rails-routing]

[rails-routing]: http://guides.rubyonrails.org/routing.html
