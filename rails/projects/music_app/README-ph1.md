# Music App (Phase I)

**[Live Demo!][live-demo]**

[live-demo]: https://aa-music-app.herokuapp.com

## Phase I: Band/Album/Track

Put aside the `user` features for a moment; you're going to build out your
inventory system.

You want to build out a feature/resource at a time. Follow this order per
resource:

- Migrations
- Model definition (validations, associations, helper methods)
- Routes
- Controller + controller actions
- Views (should coincide with the actions that render them)

Here's what you need for each resource:

### Bands

- Create a `bands` table with a unique `name` column (required).
- Create a `Band` model with a validation to ensure that `name` is unique and
  not null.
- Create the following RESTful routes:

```sh
bands     GET    /bands(.:format)                       bands#index
          POST   /bands(.:format)                       bands#create
new_band  GET    /bands/new(.:format)                   bands#new
edit_band GET    /bands/:id/edit(.:format)              bands#edit
band      GET    /bands/:id(.:format)                   bands#show
          PATCH  /bands/:id(.:format)                   bands#update
          PUT    /bands/:id(.:format)                   bands#update
          DELETE /bands/:id(.:format)                   bands#destroy
```

- Create `BandsController` and actions/views to handle each of the routes.
  - You may have noticed that your four member actions--`show`, `edit`,
    `update`, and `destroy`--always begin by finding the specified member.
    Create a `before_action` filter, `set_band`, that finds the specified band
    and assigns it to `@band` before those four actions. (Make sure it only runs
    before those 4 actions!) This is a common Rails pattern.
  - Create each view after finishing the controller action that would render it
  - Test as you go! Remember, you can use Postman to test `POST`, `PATCH`, and
    `DELETE` actions prior to building your form views.
  - To test with Postman, you will need to disable CSRF protection. Add the line
    `config.action_controller.default_protect_from_forgery = false` right
    underneath the line `config.load_defaults X.X` in __config/application.rb__.
    Remember, this should only be done while you are working in development.

### CSRF time!

- Re-enable CSRF protection. Remove the line
  `config.action_controller.default_protect_from_forgery = false` from
  __config/application.rb__. The default value of
  `config.action_controller.default_protect_from_forgery` is `true`.
- Any form that does not upload the `form_authenticity_token` will cause Rails
  to throw an error because it won't know whether ot not the `POST` request is
  coming "cross-site".
- Fix your forms, friend!

### Albums

Follow the same pattern for a new resource, `Albums`.

An `Album` should:

- Not be called `Record`, as Active Record uses `record_id` internally
- Belong to a `band` (don't forget to add the association to `Band` as well)
- Have a `title` and `year`
- Make sure the `title` is unique among the band's albums
- Designate whether it is a `live` or `studio` album
  - HINT: use a boolean paired with a reasonable default value
- Have the following routes:
  
  ```sh
  new_band_album GET    /bands/:band_id/albums/new(.:format)   albums#new
          albums POST   /albums(.:format)                      albums#create
      edit_album GET    /albums/:id/edit(.:format)             albums#edit
           album GET    /albums/:id(.:format)                  albums#show
                 PATCH  /albums/:id(.:format)                  albums#update
                 PUT    /albums/:id(.:format)                  albums#update
                 DELETE /albums/:id(.:format)                  albums#destroy
  ```

  > **Note:** This is the first time that you'll be using nested routes in a
  > project. **Please make sure your routes for albums exactly match the ones
  > above.** Check out the nested routes reading that you may have missed if the
  > motivation and syntax for creating nested routes is still unclear. Don't
  > hesitate to ask a TA for assistance!

- Once you have implemented band creation using the route configuration laid out
  above, think for a while about what code in your app (specifically, in your
  controllers and views) would need to change to accommodate a `create` route
  that was also nested.

- For the views:
  - Have a drop-down to select which `Band` recorded the `Album`. Use `selected`
    to default-select the appropriate `Band` in the drop-down.
  - Use radio buttons to select whether the album is a live or studio album.
    Don't use a column named `type`, since Rails uses this for a special purpose
    and everything will break. Use `checked` to default select the appropriate
    value.
  - Make sure to provide links back to the album's band and make edit/delete
    buttons visible from the album's `show` page.
  - Update the `Band` `show` page to list/link to all of the band's albums and
    create a new one.

**When you reach this point, request a code review from an instructor.**

### Tracks

Yet again, follow the same pattern for a new resource, `Tracks`.

A `Track` should:

- Belong to an `album` (make sure to also add associations to `Band` and
  `Album`)
- Have a `title`, `ord` (track number), and optional `lyrics`
- Ensure that track numbers are unique within an album
- Designate whether it is a `regular` or `bonus` track
- Have the following routes:

  ```sh
  new_album_track GET    /albums/:album_id/tracks/new(.:format) tracks#new
           tracks POST   /tracks(.:format)                      tracks#create
       edit_track GET    /tracks/:id/edit(.:format)             tracks#edit
            track GET    /tracks/:id(.:format)                  tracks#show
                  PATCH  /tracks/:id(.:format)                  tracks#update
                  PUT    /tracks/:id(.:format)                  tracks#update
                  DELETE /tracks/:id(.:format)                  tracks#destroy
  ```

  **Once again, please make sure the routes you make look exactly like the ones
  above.**

- For the views:
  - You need a drop down to select the `Album`. Again, default select the
    appropriate `Album` in the drop down.
  - Use radio buttons to mark a track as a "bonus" or "regular" track. Again,
    default select the appropriate value.
  - Use a `textarea` to allow the user to enter lyrics.
  - Again, provide links to the track's album and make edit/delete buttons
    visible from the track's `show` page.
  - Update the `Album` `show` page to list/link to all of the album's tracks and
    create a new one.

Add `dependent: :destroy` to applicable associations. Remember that this option
causes associated objects to be destroyed on `destroy`.

### Requiring login

Make sure a user cannot view any of the `Band`, `Album`, or `Track` data without
first logging in. If they are not logged in, bounce them to the sign-in url with
a `before_action`. Since you want to cover almost every action, put the
`before_action` in your `ApplicationController`. It will then be inherited by
all of your other controllers.

There are a couple of actions, however, where you **don't** want the user to be
logged in. More specifically, you don't want to require that someone is logged
in when they are trying to sign up or log in. To except certain actions from an
inherited `before_action`, use `skip_before_action` in the appropriate
controller. For example, in this case you should add the following to your
`SessionsController`:

```rb
class SessionsController < ApplicationController
  skip_before_action :require_logged_in, only: %i(new create)
  # ...
end
```

This will skip the `require_logged_in` filter before running your
`SessionsController`'s`new` and `create` actions.

Similarly, in your `UsersController`, skip the login requirement for every
action `except` `show`.

### Style it

Spend no more than 20 minutes adding some CSS to your views. Some ideas:

- Improve spacing/alignment of form elements
- Improve upon default list styling with a fancy flexbox grid
- Add page headers

Once you finish styling, head on to [Phase II.](README-ph2-4.md)