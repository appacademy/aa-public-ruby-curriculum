## Phase IV: Using models

By this point you know how to set up routes, how to set up matching controller
actions, how to send and process incoming data through parameters, and how to
render something back to the requester. Now you will mix in some models.

Build a `User` model with name and email. Write a migration to add columns for
`name` and `email` with `null: false` constraints. Migrate your database and add
validations for presence of name and email. Add a couple users through the
console. (Make sure you save them to the database!)

In your `UsersController#index`, fetch all the users from the database and
render them as JSON. Remember that when you hand `render json:` anything, it
automatically calls `to_json` on it for you.

Make the request in Postman and make sure you're getting the right JSON back.
Check your server log and note that the SQL that ran is logged there for you.
All SQL queries your app makes will show up in the server log - yet another
useful piece of information that the log contains.

```text
Started GET "/users" for ::1 at 2022-02-22 14:19:58 -0500
Processing by UsersController#index as */*
  User Load (0.3ms)  SELECT "users".* FROM "users"
  ↳ app/controllers/users_controller.rb:6:in `index'
Completed 200 OK in 5ms (Views: 4.6ms | ActiveRecord: 0.3ms | Allocations: 992)
```

Congrats! Applications, and especially web APIs, are all about connecting data
in your database with the outside world. You've just done that.

### Creating a `User` through the API

Now you can provide a way to create a new user through the API. Below is a start
for a `create` action. Note that you are not using an instance variable for
`user`: you will see why instance variables are very useful when you start
working with views, but they aren't strictly necessary for the controller to
work with models or to interact with the database.

```ruby
# app/controller/users_controller.rb

def create
  user = User.new(params.require(:user).permit(:user_attributes_here))
  # replace the `user_attributes_here` with the actual attribute keys
  user.save!
  render json: user
end
```

Go ahead and make a `POST` request to create a new user with Postman. Make sure
to nest your params correctly! By calling `.require(:user)` on `params`, the
`UsersController#create` method is requiring that all user params be nested
under the key of `user` in `params`.

This _namespacing_ of all user params under `user` leverages mass assignment to
set all the uploaded attributes at once. This is an extremely common Rails
pattern: pretty much every time your request body includes attributes for
creating or updating a resource, you will nest them within an inner hash to use
for mass assignment.

### Handling submission errors

What if the user doesn't upload valid parameters for a new `User`? Try making
the same request as before but with no `email` param, only a `name`.

This doesn't upload the required email attribute. The controller will create a
`User` object, but when it calls `save!` the validation will fail and an error
will be raised.

To inform the user of what went wrong, it is typical to send back error
messages. Modify your controller code to send back the errors as JSON in
the event of a failure:

```ruby
# app/controller/users_controller.rb

def create
  user = User.new(params.require(:user).permit(:name, :email))
  if user.save
    render json: user
  else
    render json: user.errors.full_messages, status: :unprocessable_entity
  end
end
```

Note that if the save of the user fails, you send the errors back to the client.
You also set the status code. By default, the status code will be 200 (OK); if
something has gone wrong, use a non-200 code to indicate this. In this case, you
should return a status code of 422. Rails gives us names for these various
status codes so that the code is a bit more semantic. Here is a list of the
[Rails status code names][rails-codes].

Make the request again. You should see the error message displayed in Postman.

Now build some other controller actions:

- `show`
- `update` (you'll want to use `ActiveRecord::Base#update`)
- `destroy`

Think about what each action's purpose is, what data is coming in (params), what
your controller needs to do with the model, and what it ultimately should
render. Test each of them out in Postman as you go!

While you're at it, try refactoring the `params[...].permit(...)` stuff into its
own (private) method. If you need an example, check out the controllers
reading.

## What you've learned

In this project, you learned how to create the RESTful routes, both by using the
`resources` helper and by writing out the route-matching syntax. You then built
out the corresponding actions in your controller, using requests from Postman
and the browser to test your code. You also learned about the three different
ways that parameters can be passed into your application (i.e., query string,
body, and route). Finally, you learned how to nest your params under an
appropriate namespace, how to use that namespace in mass assignments, and how to
respond to a request by rendering data or errors in JSON.  

[rails-codes]: http://guides.rubyonrails.org/layouts_and_rendering.html#the-status-option
