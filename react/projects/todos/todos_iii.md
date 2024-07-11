# React-Redux Todos Part 3 - All Together Now

## Overview

[Live Demo!][demo]

Today you will continue building from the frontend only todo app you built over 
the last two days and incorporate Rails so that your todos can be persisted on 
the backend and users can be authenticated. You will also learn to use and 
implement thunk middleware to handle asynchronous actions.

The agenda for today includes:

* Create a Rails API that stores todos and serves JSON via HTTP responses
* Write AJAX requests to communicate between the front and back end
* Write thunk middleware and action creators to asynchronously dispatch actions
* Implement error handling to deal with rejected HTTP requests
* Add tags to todos
* Authenticate users

## Phase 0

If you haven't already, finish Part 2 of this project through Phase 3. You will 
not need update/delete functionality or steps components to work on most of 
today's project, but you will need a working todo form.

## Phase 1: Rails API

In this phase you will create a Rails API that stores todos in a database
and serves JSON in response to HTTP requests.

**NB**: You first saw use of a Rails API in AJAX Twitter! Today, you will create
a Rails API that will have controllers and models but will not have HTML
views. Instead of being a full-stack app, its purpose will be to serve
information between your Postgres database and your React/Redux front-end. It 
will respond to HTTP requests using `Controller#Actions`, the same way as before.
Its responses, however, will be JSON instead of HTML. On the client side, you 
will make requests for these JSON views, and will parse and display them via 
your React components. User interactions with React components will dispatch 
actions to your Redux store that either fire AJAX requests or render the newest 
application state.

Let's get started!

* Create a new rails project using `--database=postgresql` and `--skip-turbolinks`
  * N.B.: You need to skip turbolinks because it prevents full page reloads, which can lead to bugs in your JavaScript frontend
* Update your `Gemfile` with `pry-rails`, `binding_of_caller`, `better_errors` and `annotate`.
* As of `Rails 5.1.2`, Rails no longer includes jQuery by default. To allow the use of `$.ajax`, include the following:
  * `gem 'jquery-rails'` in your `Gemfile`
  * `//= require jquery` and `//= require jquery_ujs` in `application.js` above `//= require_tree .`

### Todos

* Create a `Todo` migration and model with a `title` string (required), a `body` string (required), and a `done` boolean (required).
  * Add the necessary validations to the database and model.
    * NB: Validating boolean fields at the model level can create interesting bugs. `presence: true` will
    fail because Rails checks for presence by calling `blank?` on the validated attribute.
    Since `false` is considered `blank` it will fail the validation. Instead, use
    `validates :boolean_field_name, inclusion: { in: [true, false] }`
    at the model level to validate boolean fields.
* Make sure Postgres is running on your machine.
  * Run `bundle exec rails db:create`.
  * Run `bundle exec rails db:migrate`.

**Test your setup** - Try creating a couple of todos in your database using the
Rails console (`rails c`).

* Create an `Api::TodosController` to handle your API requests for todos.
  * It should create `app/controller/api/todos_controller.rb`.
* Define `show`, `index`, `create`, `update`, and `destroy` actions in your controller.
* Make your controller actions serve JSON-formatted responses.
* Define a private helper method for `todo_params`.

For example, your `show` and `create` actions should look like this:

```rb
# app/controller/api/todos_controller.rb
def show
  render json: Todo.find(params[:id])
end

def create
  @todo = Todo.new(todo_params)
  if @todo.save
    render json: @todo
  else
    render json: @todo.errors.full_messages, status: 422
  end
end
```

### Routes

* Create routes for `:index`, `:show`, `:create`, `:destroy`, and `:update`.
* Nest your routes under [namespace][namespace-docs] `api`.
* In `config/routes.rb`, set `defaults: {format: :json}` for your `api` namespace.

**Test your routes** - You should get the following when you run `rails routes`.

```
api_todos GET    /api/todos(.:format)     api/todos#index {format: :json}
          POST   /api/todos(.:format)     api/todos#create {format: :json}
 api_todo GET    /api/todos/:id(.:format) api/todos#show {format: :json}
          PATCH  /api/todos/:id(.:format) api/todos#update {format: :json}
          PUT    /api/todos/:id(.:format) api/todos#update {format: :json}
          DELETE /api/todos/:id(.:format) api/todos#destroy {format: :json}
```

### StaticPages

* Create a `StaticPagesController` that will serve a `root` view with `<div id="root">React is not working</div>`.
* Update `routes.rb` to `root to: 'static_pages#root'`.

You're almost ready to go!

* Seed your database with a few todos for testing.
* Start your server (`bundle exec rails s`) so that it can respond to HTTP requests.
* Visit [http://localhost:3000/](http://localhost:3000/). It should render your root page.
  * Inspect the page and double check that `<div id="root">React is not working</div>` is present.

**Test your API** - Try out your API endpoints using `$.ajax`. You should be able
to send `POST`, `GET`, `PATCH`, and `DELETE` requests and receive the appropriate
responses in the console.

For example, try:

```js
$.ajax({
  method: 'GET',
  url: '/api/todos'
}).then(
  todos => console.log(todos),
  error => console.log(error)
);
```

[namespace-docs]: http://guides.rubyonrails.org/routing.html#controller-namespaces-and-routing

## Phase 2: Putting it all together

Your entire todos project from the last two days will function as the frontend 
folder for your Rails app with some slight modifications.
You will still need your `package.json` and `webpack.config.js`, but you do not 
need `index.html`. Put your frontend folder, `package.json`, and 
`webpack.config.js` in the root folder of your Rails app (i.e. at the same level 
as `app`, `bin`, `config`, etc).

Modify the output path in your webpack config to create bundle in 
`app/assets/javascripts` rather than the root directory. Take a look at 
`application.js`: because it includes the line `//= require_tree .` and the 
bundled file is in `app/assets/javascripts`, the bundled file will be required 
for you.

```json
"scripts": {
  "postinstall": "webpack",
  "webpack": "webpack --watch --mode=development"
}
```

The `postinstall` script will run whenever you run `npm install`. This makes it
easier to setup your project on another machine, since you won't have to 
remember to `webpack`. During development, you can run `npm run webpack` to keep 
your bundle up to date.

**Test your setup** - You should be able to visit `localhost:3000` and confirm
that you have your entire work from yesterday working on `localhost:3000` before 
continuing.

Time to expand your Redux loop to include the entire internet!
That is, make requests to your Rails app and bring back todos from the database.
For this you will use an `APIUtil` and thunk action creators.

### API Utils

Your API utilities are what actually make the `$.ajax` requests that will hit
your backend and fetch your data. These utility functions should return a 
promise so that the caller of the function can handle success and failure 
however they see fit.

Write our Todo API Util:

* Create a file `util/todo_api_util.js`.
* Write a function that takes no arguments, makes a request to `api/todos` with a method of `GET`, and returns a promise. Store this function in `const fetchTodos` and export it.

**Test your code** - Put this function on the window. Then try running it in the 
console to make sure that you can resolve the promise by passing a function to 
`then`.

### Thunk Middleware

Now that you have a functioning AJAX request, you'll need to write action 
creators that can deal with their asynchronicity. Thunk action creators will 
send requests for resources and then dispatch the response to your store when it 
eventually gets back.

However, before you can start writing thunk action creators, you need a 
middleware to handle the actions that they will create. Recall that rather than 
returning a plain object like a regular action creator, a thunk action creator 
returns a function. This function, when called with an argument of dispatch, can 
then dispatch additional actions. Your reducers as they are will not be able to 
respond to actions that are functions. The thunk middleware will intercept any 
action that is a function so that it doesn't break your reducers.

Make a new file `frontend/middleware/thunk.js`. From this, export a single 
middleware function. This function should check the type of each incoming action 
and see if it is of type `function`. If so, return `action(dispatch, getState)`. 
If not, return `next(action)`. Refer to the Middleware reading and Thunk 
readings if you need more guidance.

Now modify your store to use your shiny new middleware. Inside `store.js`,
import `applyMiddleware` from `redux`, and the thunk middleware. As the last
argument to `createStore`, pass `applyMiddleware(thunk)`.

You can test that your thunk middleware is working by dispatching a function.
If the function is called, it's working!

```js
store.dispatch((dispatch) => {
  console.log('If this prints out, the thunk middleware is working!')
});
```

### Thunk Action Creators

#### Fetching Todos

Write an action creator to fetch todos from the server. Inside
`frontend/actions/todo_actions`, import `*` from your `APIUtil`, and export a 
function `fetchTodos` which returns another function. The returned function 
should take dispatch as an argument, and when invoked, call `APIUtil.fetchTodos` 
to fetch all todos. Resolve the promise by dispatching
your synchronous `receiveTodos()` action.

**NB: Return the resolved promise from the action creator for future flexibility; this allows you to continue chaining calls to `then` in the event that you would like to dispatch further actions from the component.**

Test it out! With your store and thunk action creator attached to the window you
should be able to populate your Redux store with todos from the database like so:

```js
store.dispatch(fetchTodos());
```

Once it's working, inside `todo_list_container.js`, include `fetchTodos` in 
`mapDispatchToProps`.
Inside the `componentDidMount` of `todo_list.jsx`, call `this.props.fetchTodos`. 
Test that when you load the page the todo list is populated from the database.

#### Creating Todos

Now that you can fetch todos from the database, add the ability to save todos to 
the database. First add a new function to your `APIUtil` which takes a todo and 
posts it to the server. Inside `frontend/actions/todo_actions`, add a new thunk 
action creator `createTodo`, which takes a todo as an argument. The returned 
function, when invoked, should call the `APIUtil` to create a todo and resolve 
the promise by dispatching your synchronous `receiveTodo(todo)` action.

* Inside the `mapDispatchToProps` of `todo_list_container.js`, pass in `createTodo` and pass it through to `TodoForm`.
* Leave `receiveTodo` there for now (the `todoListItem` component still depends on it!)
* Inside the `TodoForm` component, instead of `receiveTodo`, call `createTodo`.

Since you'll only want to clear the form if the post to the server is 
successful, clear the form after the promise resolves. Since your thunk 
middleware returns the promise back to the caller, you can tack on another 
`.then` to clear the form like so:

```js
// inside of handleSubmit
this.props.createTodo({todo}).then(
  () => this.setState({title: '', body: ''})
);
```

### Error Handling

Now you'll have to deal with the unfortunate possibility that an AJAX request 
may fail. When you attempt to create a todo with invalid params, the server will 
render a JSON array of errors. You'll need a place in your Redux store to house 
these errors. Time for a new reducer! Create `frontend/reducers/error_reducer`. 
Its initial state should be an empty array. Now write some actions to modify 
this portion of state:

* Create `frontend/actions/error_actions`. You only need two sync actions here, `receiveErrors(errors)` and `clearErrors`.
* Create the necessary constants for each action, `RECEIVE_ERRORS` and `CLEAR_ERRORS`.
* Back in your reducer, handle these actions by either returning `action.errors`, or an empty array.

Now that you have somewhere to store errors, when todo creation fails, dispatch 
those errors. You will need to update your `createTodo` action like this.

```js
const createTodo = todo => {
  return dispatch => {
    return APIUtil.createTodo(todo)
      .then(
        todo => dispatch(receiveTodo(todo)),
        err => dispatch(receiveErrors(err.responseJSON))
      )
  }
};
```

Recall that we'll prefer to use explicit returns for debugging purposes. While 
the above and below methods are functionally identical, debugger statements can 
be easily inserted into the first but not the second.

```javascript
const receiveTodos = (todos) => ({
  type: RECEIVE_TODOS,
  todos,
});
```

Although the code looks shorter and cleaner, note that you are unable to use a 
debugger statement to debug a function when it is implicitly returning. You can 
use the VS Code debugger to set a breakpoint, but you won't be able to set a 
breakpoint with a debugger statement.

When working on your React-Redux projects in the future, it'll be helpful to 
keep the return statement so you can easily place a breakpoint with the debugger 
statement to debug the action creator function and make sure a specific action 
is actually being dispatched.

Verify that your error state is populated if you try to create a todo with 
invalid params. Then, inside your todo form component, display the errors. You 
will need to pass the errors through `mapStateToProps` of the top level 
component. Make sure to clear the errors when the todo is successfully created!

#### Updating Todos

**NB:** If you did not finish Phase 2 from Part 1 and Phase 4 from Part 2 
(updating and deleting todos), please complete it now. You will need the actions 
and reducer logic before proceeding.

Updating todos will be very similar to creating todos, (the resulting action 
will still be `receiveTodo`) but you need a different thunk action creator 
because you will hit a different route on the back end.
Add `APIUtil.updateTodo(todo)` and a new thunk action creator `updateTodo(todo)`
which dispatches `receiveTodo` upon success and `receiveError` on failure.
Update `toggleTodo` in `TodoListItem` to use your new action instead of calling 
`receiveTodo` directly.

Once you have that working, remove `receiveTodo` from `todo_list_container`- you 
won't be needing it anymore.

#### Deleting Todos

You know the drill! Make your `APIUtil` function, and thunk action creator 
`deleteTodo` (it should dispatch `removeTodo` on success). Update your 
components to use the new action.

## Phase 3: Steps

Once your todos have all their original functionality back and persisting to the 
database, go through the same process with steps! You will have to write:

* The migration
* The model
* The controller
* The API Util
* The async actions

## Phase 4: Tags

Let's add tags to our todos.

* Create a Tag model with a `name` attribute.
* Create a taggings model. Taggings is a join table between todos and tags. 
Todos will `have_many` tags through taggings. * Our users should be able to 
define their own tags rather than selecting from a predetermined list, so rather 
than an array of tag ids, tags will be sent to the back end as an array of tag 
names. Write a model method to take care of setting the tags for a specific 
todo. It should create the tag names sent up that do not already exist and find 
the ones that do. It should remove old taggings and create new ones where 
appropriate. Active record allows you to do this by calling `collection=` and 
passing it a new collection. Your method should look something like this:

```ruby
def tag_names=(tag_names)
  self.tags = tag_names.map do |tag_name|
    Tag.find_or_create_by(name: tag_name)
  end
end
```

* Inside your todos controller, add `tag_names` to the `todo_params`.
Remember the alternate syntax to allow the `tag_names` param to be an array.
When you create/update a todo, Rails will automatically call `tag_names=` for you.
This is similar to writing a custom `password=` method for auth.
* Todos should be rendered with their associated tags. You can tell Rails to
render associated items with the syntax `render json: @todos, include: :tags`. This approach can get messy
when including multiple associations. You will use Jbuilder in future projects to solve this problem.
* In your todo form, add a `tag_names` array to your component state and display `this.state.tag_names` in a `ul` inside the form.
You will also need input to add new tags and a button to submit the new tag. However, you must be careful that this button
does not accidentally submit the form. To avoid this, make sure to use `<button type="button">`. Explicitly setting a type of
`button` overrides the default type of `submit`. On click of this button, add the input value to the current list of tags and clear the input.

## Phase 5: Authentication

Right now all users of your todo app share the same todos. Improve your app by 
authenticating users and only showing them their own todos. You will not need 
Redux (or JavaScript at all) for authentication today. You are going to 
authenticate your app the same way you have up to this point. Frontend 
authentication is a topic that will be explored later this week.

* Create a user model with a `username` and all other columns needed for authentication.
* Create a users and session controller with `new` and `create` actions for both and `destroy` for session.
* Make Rails views for `users/new` and `sessions/new` (they can probably share a form partial).
* On successful account creation or log in, redirect users to `static_pages#root`.
* Use `before_action` callbacks to ensure logged in users get redirected from sign in routes to `static_pages#root`
and logged-out users are redirected from `root` to `sessions/new`.
* Render a log-out button inside of `static_pages#root` outside of your React content.
* Once you can sign up and sign in and out, associate todos with a user! Make a new migration to
add a `user_id` column to the `todos` table.
* In the todos controller, associate created todos with the `current_user` like:
  ```ruby
  def create
    @todo = current_user.todos.new(todo_params)
    # ... etc
  ```
  * Do the same for update and destroy actions, searching only the current users todos.
  ```ruby
    @todo = current_user.todos.find(params[:id])
  ```
  * Lastly, modify the `index` action to only render the current user's todos.

  You now have a fully authenticated todo app! Celebrate!

## Bonus

* Disable your update and delete buttons while the dispatch is pending. Add a spinner!
Consider adding a `fetching` boolean to state and new sync actions like
`requestTodos` to tell the reducer to set `fetching` to true.
* Expand tags:
  * Allow updating of tags from todo detail view.
  * Filter todos by tag (filter on the frontend, or send tags in a query string on `fetchTodos`).
  * Tag suggestions (tag search on the back end) when inputting a new tag.
  * Steps can have tags (make taggings polymorphic, consider using a concern).
* Steps can have sub-steps (polymorphic associations).
* Allow markdown or text styling in todos ([quill.js](https://quilljs.com/)).
* Allow users to update todo title & body.
* Sort by priority.
* Add a due date.
  * Sort by due date
  * Items pop up when they are due.

[demo]: https://aa-todos.herokuapp.com/
