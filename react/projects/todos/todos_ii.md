# React-Redux Todos Part 2 - React

## Overview

[Live Demo!][demo]

Today you will build React components on top of the Redux structure you built 
yesterday. By the end of today's project, users will be able to create and 
delete todos as well as create, toggle, and delete todo steps, all through an 
interactive UI.

Today's agenda:

* Set up React to replace your static HTML page
* Configure a Root component to provide your other components with access to the
  Redux store
* Build presentational and container components to render todos and their steps
* Build controlled components to render forms for creating todos and their steps

## Phase 0

If you haven't already, finish Part 1 of this project through Phase 2 (up to, 
but not including, deleting todos). You will not need to have update/delete 
functionality to work on most of today's project.

## Phase 1: React App Structure

### App

This component will hold all of the top-level concerns/components of your app. A
top-level concern is a feature of the app that functions on its own and as such
is not nested under any other features. In this case, that will only be the
`TodoList`, but nonetheless it's a good design pattern to get used to. You
should define `App` in `frontend/components/app.jsx`.

Your `App` component can also be functional, because it doesn't need to use any
of React's lifecycle hooks. Because it doesn't rely on any of its props, the
component doesn't need to receive any arguments.

To test your component, make your `App` component return a `h1` tag with the
name of your app and temporarily render it in your entry file.

```js
ReactDOM.render(<App />, rootElement);
```

Make sure it works before continuing!

### Root

The `Root` component serves to wrap your `App` component with a `react-redux`
`Provider`. Remember that the `Provider` gives all of your components the 
potential to access your Redux `store`, allowing them to read the application 
state and dispatch actions.

- Create a file `components/root.jsx`.
- Import React and the `react-redux`'s `Provider`.
- Import your `App` component from `./app`.
- Export `Root` as functional component that receives props as an argument and
  returns a block of `jsx` code.
  - It receives your `store` as a prop.
  - Consider de-structuring `props`.

Your `Root` should look something like this:

```jsx
const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Root;
```

- Update your entry file to render your `Root` component instead of `App` into
  `#content` in `index.html`!

---

# Phase 2: Todos Components

In this phase, you will create React components to display your todo list and
its items.

### Selectors

You're ready to start creating your components! **BUT WAIT!** Your components
will be taking in some data from the store, but that data should in a specific
format for your components to use easily. That's where selectors come in!
Selectors are "getter" methods for the application state. They receive the state
as an argument and return a subset of the state data formatted in a specific
way. You will explore them in more detail later, but for now all you need is a
function to transform an object filled with todos into an array for easy
consumption by your components.

- Create a file `reducers/selectors.js`.
- Export a function named `allTodos` that receives the entire state as an
  argument.
  - Use `Object.values(state.todos)` to extract an array of todos from
    `state.todos`.
  - Return your new array.

**Test your selector** - Put your selector on the `window` and pass it the
default state. Does it format the data into an array of `todos`? Once your
selector is working great, it's time to put it to use on your `TodoList`!

### TodoList

This component will display the items in your todo list. To state, you will 
implement this component without steps; we'll guide you through refactoring for 
steps later.

**NB**: In accordance with the React/Redux design principle of separating
container and presentational components, this will actually be two components!

### TodoListContainer

The goal of a container component is to allow the presentational component to be
as simple and lightweight as possible. To this end, you will map the application 
state and the Store's `dispatch` function to a set of props that get passed to 
the presentational component.

Refer to the `Component` and `Connect` readings if you need a refresher on
container components.

#### Create the file structure

- Create a new sub-directory in `components`, `todos`, to store all todo related
  components.
- Create a file to house the container component:
  `components/todos/todo_list_container.jsx`.
- Create a file to house the presentational component:
  `components/todos/todo_list.jsx`.
- Stub in a simple React component in `todo_list.jsx` (ex.
  `export default () => <h3>Todo List goes here!</h3>`).

#### Build it!

- Import both the `connect` function and the `TodoList` presentational
  component.
- Create a `mapStateToProps` function.
  - Create a prop called `todos` set to the return value of your `allTodos`
    selector passed the `state`.
- Create a `mapDispatchToProps` function.
  - Create a prop called `receiveTodo` that accepts a `todo` and invokes a call
    to `dispatch` with the action returned from the `receiveTodo` action
    creator.
- Pass your `mapStateToProps` and `mapDispatchToProps` functions to `connect`.
- Call the result of this `connect` function with your `TodoList` presentational
  component as an argument.
- Export the result of this function call.

Your prop mapping functions should look like this:

```js
const mapStateToProps = state => ({
  todos: allTodos(state)
});

const mapDispatchToProps = dispatch => ({
  receiveTodo: todo => dispatch(receiveTodo(todo))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
```

**Test your code** - Add `TodoListContainer` to your `App` component. Reload
your app and see `Todo List goes here!`.

#### TodoList and TodoListItem

Build out your `TodoList` presentational component.

If the container component is written correctly, all this presentational
component will have to do is render the titles of its `todos` prop as list items
inside of a `<ul>`.

**Test your code** - Add `TodoListContainer` to your `App` component. Reload
your app and see your list of `todos`!

Now, refactor this `<ul>`/`<li>` structure so that each list item is a (soon to
be implemented) `TodoListItem` component that receives the appropriate item as a
prop. Each `TodoListItem` will render the title of its item inside an `<li>`.

- Create a file `components/todo_list/todo_list_item.jsx`.
- Create a React Component called a `TodoListItem` that returns an `<li>` with
  `props.todo.title` inside it.
- The `TodoList` component should render `TodoListItem`s and give them the
  necessary props.

**Test your code** - Refresh your page - everything should look the same!

---

## Phase 3: TodoForm

In this phase, you will create a form that allows users to create new todo
items.

- Create a new component (`components/todo_list/todo_form.jsx`).
  - This component will use controlled inputs to keep track of its form data,
    thus it will have a local state.
    - If you don't remember how to set up controlled inputs in a React
      component, refer back to the Props and State reading linked in the
      sidebar.
  - Render this component in your `TodoList` component.
- Update your `TodoList` to pass `receiveTodo` down to your `TodoForm`.

Before you create your todos by calling `receiveTodo` on submission of the form,
you need to give your todos unique ids. Usually, your database would take care
of this. For now, an easy way to get unique sequential numbers is to use the
current unix timestamp. Make a util file to export the following function (or
something similar).

```javascript
function uniqueId() {
  return new Date().getTime();
}
```

**Test your code** - Try creating a new todo list item using your form. Does it
appear on your page? Call over a TA for a code review.

---

## Phase 4: Updating And Deleting Todos

In this phase, you will add new buttons so that you can mark `todo`s
as `done` or `undone` as well as delete them.

- Update your components so that you can dispatch and view the effects of the
  `removeTodo` action creator that you wrote yesterday.
  - Add `removeTodo` to the `MapDispatchToProps` in your `TodoListContainer`.
  - Pass the `removeTodo` and `receiveTodo` functions as props to your
    `TodoListItem` components.
  - Render a 'delete' button that will call `removeTodo` with the current
    `todo`'s id `onClick`.
  - Render a 'done' button that will call `receiveTodo` with the current `todo`
    and it's status flipped.
    - The `Done` or `Undo` button should display the current state of the
      `todo`.
      - Hint: Write a helper method to update the todo item's `done` attribute
        when the button is clicked.

**Test your code** - You should now be able to create, toggle, and delete the
todo items in your list.

---

## Phase 5: Steps Components

### Refactoring and Setup

In this phase you will update your app with `steps` components that make use of 
the Redux structure you implemented yesterday.

Start by getting your `TodoListItem`s ready for their own sub-lists by
refactoring their display into multiple parts. You will wrap a `TodoDetailView`
in a container component so that it can dispatch functions and receive
information from the `store`. Follow these steps:

- Create a container for your `TodoDetailView` component.
  - Create a `MapDispatchToProps` function that passes `removeTodo` as a prop to
    `TodoDetailView`.
  - Export `connect(null, mapDispatchToProps)(TodoDetailView);` (null because
    the first argument to connect must always be mapStateToProps).
- Create a file `components/todo_list/todo_detail_view.jsx` to hold the
  presentational component `TodoDetailView`.
  - Refactor your `TodoListItem` so that it only renders the item's title and a
    button to change its status.
  - Fill out your `TodoDetailView` so that it renders all of the todo item's
    other information.
  - Conditionally render the `TodoDetailView` so that a user can show or hide a
    todo's details.
    - Add a boolean value `detail` to the internal state of your `TodoListItem`.
    - Initially, set that value to false.
    - Allow users to change that value to true by clicking on the item's title.
    - Render the `TodoDetailView` only if `detail` is true.

**NB**: Soon, your `TodoDetailView` will hold a `StepList` component that will
hold all of the `Steps` for a given `TodoListItem`. You will also update the
`TodoDetailView` container to request `Steps`.

### Step by Step

First, add another selector to your `reducers/selectors.js` file that will allow 
components to get the steps as an array.

- Write a function `stepsByTodoId(state, todoId)`.
- You will need to loop through all the steps searching for the ones with the
  correct `todoId`.

**Test your code**

Next, you will create React components to display the steps for a given
todo list item, as well as a form that allows users to create new steps. These
components will be rendered inside your `TodoDetailView` component.

Follow these steps, **testing your code as you go** :

- Add `receiveSteps` to the `mapDispatchToProps` in your
  `TodoDetailViewContainer` (you'll use this later).
- Create a pair of files, `components/step_list/step_list.jsx` and
  `components/step_list/step_list_container.jsx`.
  - Create `mapDispatchToProps` and `mapStateToProps` functions in the container
    file.
    - `mapDispatchToProps` will pass `receiveStep` as a prop.
    - `mapStateToProps` will pass `steps` and `todo_id` as props.
  - The presentational component should render:
    - a `<ul>` of `StepListItemContainers`
    - a `StepForm` (to be created later)
- Create a pair of files `components/step_list/step_list_item_container.jsx` and
  `components/step_list/step_list_item.jsx`.
  - Create a `MapDispatchToProps` function in the container file.
    - `MapDispatchToProps` will pass `removeStep` and `receiveStep` functions as
      props.
  - The presentational component should render:
    - the step's `title`
    - the step's `body`
    - buttons to toggle and remove the step
- Create a file `components/step_list/step_form.jsx`
  - The `StepForm` component should render:
    - a form with a labeled input and a button that creates a new step
  - The `StepForm` component should control the input by
    - storing its value in state
    - updating its state when the input triggers `onChange`
  - The `StepForm` should have a `handleSubmit` function that will:
    - create a local `step` object
    - pass that object to `this.props.receiveStep`
    - clear the form fields

**Test your code: You should be able to create, toggle, and delete steps.**

## Bonus

### Persist State with localStorage

One major flaw with this app is that all the todo data is lost between page
refreshes. You will store this data in a database with Rails tomorrow, but you
can accomplish a similar effect for the end-user by storing the data directly in
their browser. Users can't share information this way (it is all local to their
computer) but updates will persist through page refreshes.

Before beginning, [read up on `localStorage`][local-storage].

#### Saving state in localStorage

The store should save to `localStorage` after every dispatch, (that is, every
time Redux state has changed). There are a few ways to go about implementing
this behavior, the simplest of which is subscribing to the store as soon as it's
created.

- Inside `configureStore`, once the store is created, call `store.subscribe` and
  pass it a callback.
- Inside the callback, call `store.getState` and save the results in
  localStorage.

Before moving on, verify that if you change your state through actions, the
value stored in localStorage reflects those changes.

#### Loading from localStorage

Now you need to populate your store with the value saved in
localStorage. You'll also do this inside of configureStore. First, check if you
have a value saved in localStorage. If you do not, create your store without an
initialState. If there is a value, pass that is as the 2nd argument to
`createStore`.

That's it! Try making some todos or steps and then refreshing the page. Do the
changes you made persist?

### Make it Beautiful

- Style your site so that it looks presentable to investors!
  - Make a styles folder in your root directory, and include any CSS files you
    write in `index.html`.
  - Potential inspiration: [trello][trello], [todoist][todoist], [google
    keep][google-keep], [any.do][anydo]
- Add additional features:
- Allow users to update todo title & body.
  - Sort by priority.
  - Add a time when a 'todo' is due.
    - Sort by due date.

[demo]: https://aa-todos.herokuapp.com/
[local-storage]: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[trello]: https://trello.com/
[todoist]: https://todoist.com/
[google-keep]: https://keep.google.com/
[anydo]: http://www.any.do/anydo/

