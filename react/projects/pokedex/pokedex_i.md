# Pokedex: Part 1 - Jbuilder, React, Redux

In this project, we'll write a React/Redux/Rails app to manage `Pokemon` and their `Items`!
Check out the live demo [here](http://aa-pokedex.herokuapp.com/)!

NB: The singular and plural forms of the word "pokemon" do not
differ.

## Phase 0: Rails API Setup
We've already set up a Rails backend with migrations and models in the
[skeleton][skeleton-zip].

* Download the [skeleton][skeleton-zip].
* Run `bundle install`.
* Make sure Postgres is running, then run `rails db:setup` (short for `rails db:create db:schema:load db:seed`).

Get yourself oriented.

* Take a look at the `schema`, `routes`, and `StaticPagesController`.
* Also look at the `Pokemon`, `Move`, `PokeMove`, and `Item` models.
* Open up the rails console (`rails c`) to see what's in the database.
* Start the rails server (`rails s`) and visit the root URL.

[skeleton-zip]: https://assets.aaonline.io/fullstack/react/projects/pokedex/skeleton.zip

### API Namespace

Let's build routes for our pokemon! We want these routes to be nested under an `api` namespace.
Like so:

```ruby
namespace :api, defaults: {format: :json} do
  resources :pokemon, only: [:create, :index, :show]
end
```

The `defaults: { format: :json }` option tells the controller to first look for 
a `.json.jbuilder` view rather than an `html.erb` view.

Edit your `routes.rb`. Your routes table should look like the following:

```
           Prefix Verb   URI Pattern                     Controller#Action
             root GET    /                               static_pages#root
api_pokemon_index GET    /api/pokemon(.:format)          api/pokemon#index {:format=>:json}
                  POST   /api/pokemon(.:format)          api/pokemon#create {:format=>:json}
      api_pokemon GET    /api/pokemon/:id(.:format)      api/pokemon#show {:format=>:json}
```

### Pokemon Controller

Build a controller to handle our pokemon `resources`.

* Generate an `Api::PokemonController`. A quick way to do it is by running `rails g controller api::pokemon`. That would create an `api` folder inside of your controllers that will hold `pokemon_controller.rb`.
* Define `#index` and `#show` actions.

Remember, we want these actions to **render json responses**.
To make the job easier for our frontend, you should format your index action to 
serve up json responses that look something like this:

```javascript
{
  1: {
    id: 1,
    name: /*...*/,
    image_url: /*...*/
  },
  2: {
    id: 2,
    name: /*...*/,
    image_url: /*...*/
  },
  //..
}
```

Here, the keys in your JSON response are the primary keys of the pokemon.
The values are the pokemon objects themselves.
Let's use Jbuilder here!

* Create a `views/api/pokemon/index.json.jbuilder` file.
* Iterate over each pokemon.
* Use `json.set!` to explicitly set the key to the pokemon's id.
* Use `json.extract!` to grab the pokemon's `id`, `name`, and
`image_url`.

Like so:

```ruby
@pokemon.each do |poke|
  json.set! poke.id do
    json.extract! poke, :id, :name
    json.image_url asset_path("pokemon_snaps/#{poke.image_url}")
  end
end
```

**NB** Notice that we use the `asset_path` helper to find the correct
path to the image.
Asset locations can be different in production so you should always use 
`asset_path` rather than a literal path. For more detail 
[check out the guides](http://guides.rubyonrails.org/asset_pipeline.html).

We don't need to return any more information than this for our index route!
Remember, Jbuilder allows us to *curate* our data, retrieving only the 
attributes we are interested in.

* Next create a Jbuilder view for `PokemonController#show`.
We want the action to render all the information about a single pokemon, 
including its items and moves. In this case, we are listing the pokemon, items, 
and moves separately, since they represent separate resources.
The reasoning behind this will become more clear, when we normalize our state on 
Day 2.

A GET request to `localhost:3000/api/pokemon/5` should render this:

```javascript
{
  "pokemon": {
            "1": {
              "id": 1,
              "name": "Bulbasaur",
              "attack": 49,
              "defense": 49,
              "poke_type": "grass",
              "image_url": "/pokemon_snaps/1.svg"
            }
          },
 "moves": {
            "1": {
              "id": 1,
              "name": "tackle"
              },
            /*...*/
            },

  "items": {
          "1": {
            "id": 1,
            "pokemon_id": 2419,
            "name": "Sleek Marble Bench",
            "price": 38,
            "happiness": 43,
            "image_url": "/assets/pokemon_potion.svg"
          },
          /*...*/

    }
}
```

**Test your routes, controller actions and Jbuilder view**: Make GET requests to 
(i.e. visit) `localhost:3000/api/pokemon` and `localhost:3000/api/pokemon/:id`.
Show a TA before moving on.

## Phase 1: Frontend Setup

### Node Package Manager

As with previous projects, you will need to set up a `package.json` and a 
`webpack.config.js` file to configure your application to use NPM and Webpack.

* Run `npm init -y` to initialize your app's `package.json` with the default boilerplate settings.
* `npm install` the following packages:
  * `webpack`
  * `webpack-cli`
  * `react`
  * `react-dom`
  * `react-router-dom`
  * `redux`
  * `react-redux`
  * `redux-logger`
  * `@babel/core`
  * `@babel/preset-env`
  * `@babel/preset-react`
  * `babel-loader`

* Make sure that the `webpack` version you installed is under 5 (You can install version `4.29.3` for example).
* Add a `"webpack"` script to your `package.json` that runs `webpack --watch --mode=development`.

### Webpack

Next, we need to configure Webpack to compile our `bundle.js` file.

* Create a new file called `webpack.config.js` in the root of your project.
* Copy and paste the following configuration:

  ```javascript
  const path = require('path');

  module.exports = {
    context: __dirname,
    entry: './frontend/pokedex.jsx',
    output: {
      path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
      filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '*']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/react']
            }
          },
        }
      ]
    },
    devtool: 'source-map'
  };
  ```
💡
> #### 💡 Aside: How does Rails get `bundle.js`?
>
> Take a look in `app/assets/application.js`.
> You should see a few `require` statements.

```javascript
//= require jquery
//= require rails-ujs
//= require_tree .
```

> Though these lines appear to be commented out, they are actually embedding the content of these files/libraries into our `application.js` file.
> They are embedded in the order in which they appear.
> In this case we are requiring `jquery`, then `rails_ujs` (which, among other things, provides automatic CSRF protection in AJAX requests) libraries before including our own local files.
> `require_tree .` includes all the files in the same directory (hence the `.` of relativity), which will include our `bundle.js` file once it has been webpacked.
> If including local files in a certain order is required for your app, you will need to `require` them individually as `require_tree` does not guarantee ordering.

Notice that the `entry` key in `webpack.config.js` expects a file called `./frontend/pokedex.jsx` to exist.

* Create a `frontend` folder in the root directory of your project.
* Add an entry file called `pokedex.jsx`.
* `import` both the `react` and `react-dom` packages.
* Add an event listener for `DOMContentLoaded`.
* In the callback to this listener, try rendering a simple stateless React component to test everything we've written so far.
* Don't forget to run `npm run webpack` to generate your `bundle.js`. If that does not run, make sure that you added a script tag to your `package.json` to set up the command line.

Your entry file might look like the following:

```javascript
// frontend/pokedex.jsx

import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');
  ReactDOM.render(<h1>Pokedex</h1>, rootEl);
});
```

**Test your frontend setup**: Make sure that your test component renders on the root.

### Frontend Structure
Finish your frontend setup by defining the structure of your `frontend` folder.
Nest folders called `actions`, `components`, `reducers`, `store`, `middleware` 
and `util` within `frontend`.

## Phase 2: `Pokemon` Redux Cycle

### Designing the State Shape

Before we actually build anything, we need to talk about the shape of our 
application state.
**This is an important first step!**
Don't ever skip it.
For now, we just want to be able to render all of our pokemon.
In preparation for our fullstack projects, we will be normalizing our state.
Right now we don't have much, so let's start with an `entities` slice which will 
contain separate sub-slices for each of our resources (just `pokemon` for now).
This will hold _all_ the pokemon, for both our index item and detail views.

**Hint**: in order to have reducers nested in other reducers we can use 
`combineReducers` inside of the `entities` reducer.

Sample state shape:

```javascript
{
  entities: {
    pokemon: {
      1: {
        id: 1,
        name: /*...*/,
        imageUrl: /*...*/
      },
      2: {
        id: 2,
        name: /*...*/,
        imageUrl: /*...*/
      },
      // ...
    }
  }
}
```

We recommend using an object to store collections of objects in an app's state.
* While this may impose a few more obstacles for iterating over the collection to render, an object will prove far superior for updating or deleting individual pokemon in our collection (re: time complexity of objects vs array methods). Note the current sample state looks a lot like the JSON response returned by the `PokemonController#index` action. 
* However, `snake_case` keys are now `camelCase` because our state lives in the frontend. In order to automatically convert these keys, add this line on your `environment.rb` file.
      ```rb
      Jbuilder.key_format camelize: :lower
      ```
* Don't forget to restart your server to implement changes made in that file.
* Please note that this line allows you to convert `snake_case` to `camelCase` automatically but does not work the other way around. That means that you want to send your data `snake_case` every time you are sending information to your backend.


### API Util and Action Creators

We'd like to render all of our pokemon. Let's start by setting up a way to fetch them from the back end.

* Create an `api_util.js` file inside your `frontend/util` folder.
  * Inside this file, we'll define functions that make ajax requests, fetching information from our rails API.
* Export a function called `fetchAllPokemon` that returns a promise.
  * The function should make an AJAX request that will make an HTTP request to our `PokemonController#index` endpoint.
  * Run `rails routes` to determine the appropriate URL for this request.
* Test as you go! Paste your AJAX call on your console and check if you are getting the right response from your backend.


Next, define an action creator to be called on the success of
`APIUtil#fetchAllPokemon`.

* Create a `pokemon_actions.js` file within your `frontend/actions` folder.
* Export a constant called `RECEIVE_ALL_POKEMON` with the value
`"RECEIVE_ALL_POKEMON"`
* Export a function called `receiveAllPokemon(pokemon)` that returns an
action object.
  * This action object should have two keys: `type` of
`RECEIVE_ALL_POKEMON` and another for the received `pokemon` data.

Your code should look like the following:

```javascript
// frontend/actions/pokemon_actions.js

export const RECEIVE_ALL_POKEMON = 'RECEIVE_ALL_POKEMON';

export const receiveAllPokemon = pokemon => ({
  type: RECEIVE_ALL_POKEMON,
  pokemon
})
```

**Test that your pokemon action creator works in the browser before moving on!**

* Import the action and api_util functions into your entry file.
* Assign them to the `window` to test that in the browser's console.
* You should be able to run:

  ```javascript
  const getSuccess = pokemon => console.log(receiveAllPokemon(pokemon));
  fetchAllPokemon().then(getSuccess);
  ```

* Great! You are now able to populate all of the pokemon received from `pokemon_controller#index` in the action object that `receiveAllPokemon(pokemon)` return.

### `pokemonReducer`

Let's define our `pokemonReducer`.
Remember that the reducer is only concerned with describing how the state 
changes as a result of a dispatched action. It takes two parameters: the 
previous `state` and the `action` dispatched.
It should return the new state, without mutating the previous `state`.
If the reducer doesn't care about the action being dispatched, it should return 
`state`.

* Create a `frontend/reducers/pokemon_reducer.js` file.
* Import our `RECEIVE_ALL_POKEMON` constant.

  ```javascript
  import { RECEIVE_ALL_POKEMON } from '../actions/pokemon_actions';
  ```

* Define and `export default` a `pokemonReducer` that has a default state of an empty object.
* Add a `switch(action.type)` statement.
* Create `RECEIVE_ALL_POKEMON` and default cases.
Remember not to mutate `state`!

### entitiesReducer

We want to separate our app's data and presentational states.
To do this we can create nested reducers, such that eventually our redux state 
might look something like this:

Note how we are using `entities.pokemon` to manage _all_ the pokemon. We also 
have other slices of state inside of the entities slice of state.
Usually, you want to have a slice of state for every table that you have on your 
schema. We'll be building these as you we progress throughout the project.

```javascript
{
  entities: {
    pokemon: {
      1: {
        name: Bulbasaur,
        imageUrl: "/assets/pokemon_snaps/110.png",
      },
     
      // ... more pokemon
    },
    moves: {

    },

    items: {
      
    }
  },
  ui: {
    errors: [],
    loading: {},
  }
}
```

Create a new reducer, `entitiesReducer`, that will be in charge of combining 
each of our entity sub-reducers (`pokemonReducer` and later `itemsReducer`).

* Create a new file: `/frontend/reducers/entities_reducer.js`
* Import `combineReducers` from `redux` and our `pokemonReducer`
* Call `combineReducers` so that our `pokemonReducer` is responsible for
the `pokemon` slice. Like so:

```javascript
const entitiesReducer = combineReducers({
  pokemon: pokemonReducer,
})
```

### The rootReducer

Before we can use our `entities`, let's create a `rootReducer` using Redux's 
`combineReducers` function. We'll use `combineReducers` to generate our 
application state and assign each slice of the state to a different reducer.
This will make it easier to grow our application state.

* Create a new file: `/frontend/reducers/root_reducer.js`
* Import `combineReducers` from `redux` and our `entitiesReducer`
* Call `combineReducers` so that our `entitiesReducer` is responsible for
the `entities` slice of the app state. Like so:

```javascript
const rootReducer = combineReducers({
  entities: entitiesReducer
});
export default rootReducer
```

### Store

Before we can test our app's reducer we need a Redux store to dispatch from.
Let's create our app's store.

* Create a `store.js` file within the `frontend/store` folder.
* Import `createStore` and `applyMiddleware` from the `redux` package.
* Import our `rootReducer`
* Import `logger` the default export of `redux-logger` middleware

Redux's `createStore` function accepts the following parameters: the
reducer, an optional `preloadedState`, and any enhancers like as
middleware.

* For now, call `createStore` and pass it our imported `rootReducer` and `logger` as our only middleware.
Remember, middlewares need to be wrapped in a call to `applyMiddleware` when passed to `createStore`.
Don't forget to `npm install redux-logger` if you did not do it already. We will come back to the other arguments later.
* Wrap the creation of the store in a `configureStore` function. Like so:

  ```javascript
  // frontend/store/store.js

  const configureStore = () => createStore(rootReducer, applyMiddleware(logger));
  ```

  > #### 💡 Aside: `configureStore` Pattern
  > This is a great pattern to continue using - instead of just exporting the store, we are exporting a function that creates and returns a `store`.
  > This can be used in the future to swap out reducers, `preloadedState`, or enhancers depending on different conditions (e.g. development vs production environments).

* In your `pokedex.jsx` entry file, import your `configureStore`
function.
* Inside the `DOMContentLoaded` callback, declare a `store`.
* Call `configureStore` and assign its return value to `store`.
* For **testing purposes only**, make `getState` and `dispatch` available on the `window` (i.e. `window.getState = store.getState; window.dispatch = store.dispatch`).


**Test your store and reducer.** You should be able to run the following
code snippet in the browser's console:

```javascript
getState(); // should return initial app state

const getSuccess = pokemon => dispatch(receiveAllPokemon(pokemon));
fetchAllPokemon().then(getSuccess);

getState(); // should return the app state populated with pokemon
```

### Thunk Middleware

Create a new file `frontend/middleware/thunk.js` and export your thunk
middleware. It should check the typeof incoming actions and either
return `action(dispatch)` if they are functions or `next(action)` if
they are not. Reference yesterday's solutions if you need more guidance.

* Refactor your `configureStore` function to incorporate your `thunk
middleware`.

  ```javascript
  // frontend/store/store.js
  import thunk from '../middleware/thunk';

  const configureStore = () => (
    createStore(
      rootReducer,
      applyMiddleware(thunk, logger)
    )
  );
  ```

#### Connecting the Dots

Let's add a new thunk action creator `requestAllPokemon`, dispatching a 
`RECEIVE_ALL_POKEMON` action if successful. It should not receive any arguments 
and should call the `APIUtil`, and then on resolution of the promise, dispatch 
`receiveAllPokemon`.

This one's free!

```javascript
export const requestAllPokemon = () => (dispatch) => (
  APIUtil.fetchAllPokemon()
    .then(pokemon => dispatch(receiveAllPokemon(pokemon)))
)
```

**Test your redux cycle**. In the browser console try:

```javascript
getState(); // should return initial app state
dispatch(requestAllPokemon());
getState(); // should return the app state populated with pokemon
```

You've done it! You have successfully built out an api endpoint, and setup a 
Redux cycle for your pokemon! :tada:

### Selectors

We're going to add one final piece to our redux structure: selectors.
Selectors are functions that are used to "select" complex pieces of the state.
Define them in a `selectors.js` file in your app's `frontend/reducers` folder.

* Create a `frontend/reducers/selectors.js` file.
* Define and export a function, `selectAllPokemon(state)`, which accepts the application state as an argument and exports an array of all the pokemon objects.
Hint: You can use the `Object.values` method.

**Test your selector in the browser**. You should be able to do the following:

```javascript
const initialState = getState();
selectAllPokemon(initialState); //=> []

dispatch(requestAllPokemon());

const populatedState = getState();
selectAllPokemon(populatedState); //=> array of pokemon objects!
```

We'll use this selector later in our pokemon components.
**Show a TA your bug-free pokemon redux cycle before moving on!**
Make sure you can explain how the different pieces of Redux fit together 
(i.e. state shape, actions, reducer, store, middleware and selector).

## Phase 3: `Pokemon` React Components

### The `Root` Component

* Create a `Root` component that will be responsible for rendering all of the app's React components.
    * `Root` should be a *stateless* component (i.e. a *functional component*).
    * It will be passed the app's  Redux`store` as a prop.
    * It should wrap all of our app's components with the `Provider` from `react-redux`.

Your `Root` component should look like this:

```javascript
import React from 'react';
import { Provider } from 'react-redux';

const Root = ({ store }) => (
  <Provider store={store}>
    <div>Hello, world!</div>
  </Provider>
);

export default Root;
```

**NB**: Remember that anywhere we use JSX, we *must* import React.

* Update your doc-ready callback in the entry file `pokedex.jsx` to:
  * Import your newly defined `Root` component;
  * and render it, passing is the `store` as a prop.

Like so:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root);
});
```

**Test that your `Root` component is properly rendered before moving on.**

### PokemonIndex

Remember that there are two types of React components: presentational components 
and container components. **Container components** (i.e. containers) are 
concerned with subscribing to the store, reading from state, and passing down 
necessary props to presentational components. Our **presentational components** 
are concerned with rendering JSX and defining the user interface.

#### PokemonIndexContainer

* Create a `frontend/components/pokemon` folder.
  * This will house all of the React components concerning the `pokemon` slice of the state.
* With this folder, create a `pokemon_index_container.js` file.
* As with all container components, import the `connect` function from the `react-redux` package.

The `connect` function accepts two functions as arguments: `mapStateToProps` and `mapDispatchToProps`.
Both functions are invoked when our redux store updates.
They are responsible for determining and constructing the props that are passed to presentational component.

* Define `mapStateToProps`.

  ```javascript
  const mapStateToProps = state => ({
    // piece of state that container subscribes to
  });
  ```

* Define `mapDispatchToProps`.

  ```javascript
  const mapDispatchToProps = dispatch => ({
    requestAllPokemon: // dispatch requestAllPokemon action.
  });
  ```

* Import your `selectAllPokemon` selector.
* Use it to pass a `pokemon` prop to the connected presentational component `PokemonIndex`. `this.props.pokemon` in `PokemonIndex` will return an array of all the pokemon objects in the app state.
* In the next phase we'll actually define our `PokemonIndex` component in `frontend/components/pokemon/pokemon_index.jsx`. Assume it already exists, and import it.
* `connect` `PokemonIndex` and export the returned component. Like so:

  ```javascript
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PokemonIndex);
  ```

#### PokemonIndex

Now let's write the `PokemonIndex` presentational component, which should render 
an unordered list of pokemon names next to corresponding images.

* Create a `frontend/components/pokemon/pokemon_index.jsx` file.
* Define and export a *class* component that renders a `<li>` for each pokemon object in the `this.props.pokemon` array.
  * Display the pokemon's name and a *small* image.
* Inside of `componentDidMount`, call `this.props.requestAllPokemon`
* Import the container component to `root.jsx`.
* Nest and render a `<PokemonIndexContainer />` within your `<Root />` component.

**Test your `PokemonIndex` components**: To start, your app should render an 
empty `ul` reflecting your app's initial state, after the request to 
`requestAllPokemon` succeeds the ul should be populated with pokemon.
Look for webpack and console errors when debugging.

Now you should see your list of pokemon whenever you refresh the page.
Go ahead and remove all other extraneous action creators, constants, and code 
snippets used for testing from our entry point if you haven't already.
**Show a TA that your pokemon React components render before moving on!**

Before continuing with the second part of Pokedex, complete the steps:

* Return to and complete the Bonus phase of the Jbuilder project. 

* Complete the React Router Router readings.

### Now Continue to Part 2!
