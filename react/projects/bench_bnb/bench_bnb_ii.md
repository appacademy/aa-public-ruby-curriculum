# BenchBnB Part 2 - Benches!

Check out the live demo [here][live-demo]!

[live-demo]: http://aa-benchbnb.herokuapp.com
[maps-sf]: https://www.google.com/maps/place/San+Francisco,+CA/

## Phase 4: `Bench` Backend

- Create a `Bench` model with required `description` (string) , `lat` (float)
  and `lng` (float) attributes.
- Make a `BenchesController` to handle your API requests. It will need `index`
  and `create` actions to start.
- Add routes for your `BenchesController` actions.
  - These should be namespace-d under `api/benches` and return JSON by default.
- Populate `seeds.rb` with bench seed data using [real coordinates in
  SF][maps-sf] (click around to get coordinates).
- **Test your benches API in the Dev Tools console using `$.ajax` calls**.

[maps-sf]: https://www.google.com/maps/place/San+Francisco,+CA/

## Phase 5: `Bench` Redux Cycle

In this phase, you will build the pieces necessary to display a basic index of
benches.

### BenchApiUtil

To start, let's create an API utility for our thunks to use that will request
data via AJAX from our Rails server.

- Create a file, `/util/bench_api_util.js`, that exports a function,
  `fetchBenches`.

It should dispatch an `$.ajax` request and return a promise. As usual, the
success function will be chained onto this promise in the thunk action creator.
You may choose to define an error callback for debugging.

Your function should look something like this:

```javascript
// frontend/util/bench_api_util.js

export const fetchBenches = () => {
  return $.ajax({
    method: // ,
    url: //,
    error: (err) => console.log(err)
  })
}
```

As before, put this function on the window for testing, and make sure it works
before moving on!

### Bench State Shape

We want to build a bench state that has the following shape:

```js
entities: {
  benches: {
    1: {
      id: 1,
      description: "...",
      lat: 0.0,
      lng: 0.0
    },
    2: {
      id: 2,
      description: "...",
      lat: 0.0,
      lng: 0.0
    },
    3: {
      id: 3,
      description: "...",
      lat: 0.0,
      lng: 0.0
    }
  }
}
```

Note that our benches object use each bench's id as a primary key. The `benches`
key is also nested under the `entities` key, where we keep all of our relational
data.

### Action Creators

Before we move on to the fun stuff -- populating a Google map with benches from
our database -- we need to write an `actions` file that helps our other major
pieces function.

We need two `actions`: one to go fetch all the benches from our Rails API, and
one that tells our `store` to change our application state to represent the
bench data in our `action`.

- Create an `actions` file: `actions/bench_actions`.

* Write `receiveBenches`. It should accept a single argument, `benches`, and
  produce an `action` with type `"RECEIVE_BENCHES"` and a `benches` property
  that represents all of our bench data.
* Write `fetchBenches`. It doesn't need to accept any arguments. It should just
  return a thunk which calls the `APIUtil` and `then` dispatches
  `receiveBenches`.
* Don't forget to define the corresponding action types.
* Export `fetchBenches` and your constants.

Before continuing, _test that they return the correct objects_. For example, add
`fetchBenches` to the `window` for testing later!

```js
// frontend/bench_bnb.jsx
window.dispatch = store.dispatch;
window.getState = store.dispatch;
window.fetchBenches = fetchBenches;

// now we can test our code from the console
dispatch(fetchBenches()).then(console.log); //=> { "1": { id: 1, description: ... } }
```

Remember to import `fetchBenches` for testing.

### Benches Reducer

In this step, we're going to create a reducer that manages the `benches` section
of our application state.

- Create a file, `reducers/benches_reducer.js` that exports a `benchesReducer`
  function.

Let's start by just setting up our `benchesReducer` to return its default state:
Remember to use `Object.freeze` to prevent the state from being mutated.

Have your `benchesReducer` update the `benches` in your state when it receives
the `RECEIVE_BENCHES` action. Your reducer should look like this:

```js
// frontend/reducers/benches_reducer.js

import { RECEIVE_BENCHES } from "../actions/bench_actions";

const benchesReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_BENCHES:
      return action.benches;
    default:
      return state;
  }
};
```

### Entities Reducer

Be sure to add your `benchesReducer` to your `entitiesReducer`.

```javascript
// frontend/reducers/entities_reducer.js

import { combineReducers } from "redux";

import benchesReducer from "./benches_reducer";
import usersReducer from "./users_reducer";

const entitiesReducer = combineReducers({
  users: usersReducer,
  benches: benchesReducer
});

export default entitiesReducer;
```

At this point, our default application state should look like this.

```js
{
  session: {
    id: null,
  },
  errors: {
    session: []
  },
  entities: {
    benches: {},
    users: {}
  }
}
```

## Phase 6: `BenchIndex` Components

Let's create a component that shows our benches.

- First we'll start by making two files: `components/bench_index.jsx` and
  `components/bench_index_container.js`

After we've made both of these components, we'll add the container to our `App`
component with the rest of our routes so it's rendered when users visit our
site.

### The Container Component

Inside your container component, `connect` your `BenchIndex` as outlined below.
Don't worry that we haven't constructed `BenchIndex` yet; but we'll fix that in
the next step!

#### mapStateToProps

Our `BenchIndex` component needs `state` information about the `benches` in
order to render.

#### mapDispatchToProps

The `BenchIndex` also needs a way to trigger a request for benches once it has
mounted. Let's give it a `fetchBenches` prop that it can use to call a dispatch
with the `fetchBenches()` action creator.

#### Export it!

Finally, let's use the `connect` function to export a new component that is
connected to our `store`.

```javascript
// frontend/components/bench_index_container.jsx

import BenchIndex from "./bench_index.jsx";

//...

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BenchIndex);
```

### The Presentational Component

Let's create the `BenchIndex` presentational component. It should render a list
of benches, showing the description of each bench.

```js
// frontend/components/bench_index.jsx

class BenchIndex extends React.Component {
  componentDidMount() {
    // request benches from your API here
  }

  render() {
    // ...
  }
}
```

Create another `BenchIndexItem`, to clean up your `BenchIndex` component's
`render()` function.

### Render Time!

Let's make sure that our `BenchIndexContainer` renders only at the root path
`"/"`. To do so, we'll use the [`exact`][exact-docs] prop.

[exact-docs]: https://v5.reactrouter.com/web/api/Route/exact-bool

```jsx
const App = () => (
  <div>
    <header>
      <h1>Bench BnB</h1>
      <GreetingContainer />
    </header>

    <AuthRoute exact path="/login" component={SessionFormContainer} />
    <AuthRoute exact path="/signup" component={SessionFormContainer} />
    <Route exact path="/" component={BenchIndexContainer} />
  </div>
);
```

Your app should now be populated with benches! **Confirm with a TA.**

---

## Phase 7: The Map

Now we're going to add a map alongside our index to visually convey our bench
information. When it's done, we'll replace `BenchIndexContainer` with a new
`SearchContainer` in the `Route` we just defined in the router. This will allow
us to search and display benches.

### Create a `BenchMap` component.

- Create a new React component class `BenchMap`.
- Its `render` function should return a `div` with `id='map-container'` and
  `ref='map'`.
- In the `application.css` file, make sure to set the `width` and `height` of
  the `#map-container` to `500px`.
- We'll return to this component in a bit.

### Create a React component: `Search`

- Create a new React component, `Search`.
- `Search` should render a `div` containing a `BenchMap` and `BenchIndex`.
- Remove your `BenchIndexContainer` and instead, create a `SearchContainer`.
- `Search` should then pass the appropriate props to `BenchIndex`.
- **You shouldn't have to change `BenchIndex`**.

Since our `Search` component only needs a render method, we can make it a
[functional component][functional-comp] with an implicit return! Make sure to
deconstruct your props for cleaner syntax.

[functional-comp]:
  https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc

### Render your `SearchContainer`

- In your `<Route exact path="/" .../>`, render the `SearchContainer` component
  instead of `BenchIndexContainer`. This should cause both the `BenchMap` and
  the `BenchIndex` to be rendered on the page.
- Verify your work before moving on.

### Attach a Google Map to `BenchMap`

For homework last night, you should have created and added the Maps API Key to
your project. If you haven't done so, please go back and complete that reading.

- When the `Map` component mounts, instantiate the map as follows:

```jsx
// frontend/components/bench_map/bench_map.jsx

class BenchMap extends React.Component {
  //...

  componentDidMount() {
    // set the map to show SF
    const mapOptions = {
      center: { lat: 37.7758, lng: -122.435 }, // this is SF
      zoom: 13
    };

    // wrap this.mapNode in a Google Map
    this.map = new google.maps.Map(this.mapNode, mapOptions);
  }

  render() {
    return (
      // ...
      <div ref={ map => this.mapNode = map }> // this ref gives us access to the map dom node
      // ...
    )
  }

  //...
}
```

**Test:** This should cause a Google Map to be rendered to the page. **Note:**
If you haven't added billing info to your Google account yet, this map will have
limited functionality.

## Phase 8: Markers on the Map

We're now going to implement map markers for our benches.

- Update the `Search` component to pass a 'benches' prop to `BenchMap`

Managing the markers is going to require quite a bit of code, so we're going to
create a helper class, `MarkerManager`.

### MarkerManager

This `MarkerManager` class will handle syncing the benches we maintain in state
with the markers we display on our map. By maintaining references to our
markers, we can add/remove them from the map more easily.

- Create a new file `marker_manager.js`; it should live in your `util` folder.
- In this file, create and export a new class, `MarkerManager`.
- Define the constructor method to accept a map, and then create `map` and
  `markers` instance variables.

```js
// frontend/util/marker_manager.js

export default class MarkerManager {
  constructor(map) {
    this.map = map;
    this.markers = {};
  }
  //...
}
```

Next, we're going to define an instance method `updateMarkers()`. Start with
just a simple `console.log`

```js
// frontend/util/marker_manager.js

export default class MarkerManager {
  //...
  updateMarkers(benches) {
    console.log("time to update");
  }
  //...
}
```

Let's put `MarkerManager` on the back-burner for now. We'll come back later.

### Connect `BenchMap` to `MarkerManager`

Let's see how the `BenchMap` is going to interact with our `MarkerManager`.

- Import the `MarkerManager` class.
- Update the `BenchMap#componentDidMount` lifecycle method to create a new
  `MarkerManager`.

```jsx
//frontend/components/bench_map/bench_map.jsx

//...
componentDidMount() {
  //...
  this.map = new google.maps.Map(mapDOMNode, mapOptions);
  this.MarkerManager = new MarkerManager(this.map);
}
//...
```

We need to invoke `updateMarkers()` both when the `BenchMap` component first
mounts **and** whenever the benches in the application state change.

Use the appropriate `React` [lifecycle methods][lifecycle-methods].

Confirm that the `MarkerManager` utility works by checking the console for our
`console.log` **both before and after** running the following code.

```javascript
window.dispatch(fetchBenches());
```

Make sure this works before moving on!

[lifecycle-methods]: https://reactjs.org/docs/state-and-lifecycle.html#adding-lifecycle-methods-to-a-class

### updateMarkers()

Read the documentation on [map markers][map-markers] before continuing.

To accomplish the goal of adding markers appropriately, we will want to expand
upon our `updateMarkers` method. We will need to do the following:

- For each `bench`, if the `id` is not a key in `this.markers`, create a new
  marker from it and add it to the map and this.markers

Add the following helper methods:

- `createMarkerFromBench(bench)`: accepts a bench object as an argument; adds a
  marker to the map and to the markers object

## Phase 9: Filtering by Map Location

When the map idles, we are going to use its current bounds to request only
benches within the boundaries of the map. First, let's prepare the back end to
search by bounds.

### Back End Prep

- On your `Bench` model, Write a `Bench.in_bounds` method that returns all the
  benches that are within the boundaries specified by the argument. See the
  example below for what arguments to expect.

```ruby
# /app/models/bench.rb

#...
  def self.in_bounds(bounds)
  # google map bounds will be in the following format:
  # {
  #   "northEast"=> {"lat"=>"37.80971", "lng"=>"-122.39208"},
  #   "southWest"=> {"lat"=>"37.74187", "lng"=>"-122.47791"}
  # }
  #... query logic goes here
  end
#...
```

- In the controller, we can expect that these boundaries will be passed in as a
  query string and therefore available in the `params` hash
- Instead of rendering `Bench.all` in our `index` action, we can instead use
  `Bench.in_bounds(params[:bounds])`

### Update `BenchApiUtil`

Update our `fetchBenches` function in `bench_api_util.js` to accept an argument
called filters.

Eventually, we want to be able to filter our benches by multiple parameters, but
for now we'll just use the lat/lng `bounds`.

Test your updated `fetchBenches` methods to see that it applies the filters!

### Updated State Shape

We want a default state that looks something like this. In addition to our
benches and session, we'll also add a new slice of state to keep track of our
filters.

```js
{
  entities: {
    benches: {
      1: {
        id: 1,
        description: "...",
        lat: 0.0,
        lng: 0.0
      }
    },
    users: {
      1: {
        id: 1,
        username: 'breakfast'
      }
    }
  },
  filters: {
    bounds: {}
  },
  errors: {
    session: []
  }
  session: { id: 1 }
}
```

### Filter Actions

- Create a new file, `actions/filter_actions`
- Create and export an action type `UPDATE_BOUNDS`
- Make and export an action creator, `updateBounds`; this should accept a single
  argument: `bounds`

#### SearchContainer

Update your `SearchContainer`'s `mapDispatchToProps` function to use the newly
constructed `updateBounds` action creator.

#### Search

Update your `Search` presentational component to pass the `updateBounds` prop to
the `BenchMap` component

#### BenchMap

- In the `BenchMap` component, add a listener to the map's idle event when
  `componentDidMount` is called.
- [Read this documentation][event-doc] to learn about Google Map events.
- Call `getBounds` on the map instance to get a `LatLngBounds` instance. Call
  `getNorthEast` and `getSouthWest` to get these coordinate pairs. Get their
  latitude and longitude and format these coordinates into exactly the format
  your API is expecting. Check [this documentation][lat-lng-docs] for more info.
- Package these coordinates into a `bounds` object.
- Invoke `this.props.updateBounds()`, and pass your newly constructed bounds
  object

### filterReducer

We need to build out our application state to reflect the map's `bounds`.

- Create a new file, `reducers/filter_reducer.js`
- Build and export a `filterReducer`
  - Your reducer should update the application state when an `UPDATE_BOUNDS`
    action is dispatched

### uiReducer

The `uiReducer` will be used to combine any reducers in charge of managing
information that influences our user's interactions, but is not relational data
from our backend. For this project, it will just contain the `filterReducer`,
but there are many other uses of this slice of state, for instance toggling a
loading screen while waiting for an ajax request. Let's continue to follow our
conventions.

- Create a new file, `reducers/ui_reducer.js`
- Use `combineReducers` to combine just the `filterReducer` and export it
- Update your `rootReducer` to contain the `uiReducer`

**Test** that the application is being successfully updated by moving the map
around and then calling `window.getState()` in the console.

### MarkerManager

Now that we've handled our state, we need to beef up
`MarkerManager/updateMarkers()` to handle removing markers for benches that have
been moved outside our bounds.

- Convert the `benches` array that was received as an argument into an object
  (we want constant time lookup by `id`)
- For each `marker` in `this.markers`, if the marker does not have a
  corresponding `bench` in our constant time `bench` lookup object, then remove
  the marker from the map and `this.markers`

Add the following helper methods to your class:

- `removeMarker()`: accepts a marker as an argument; removes marker from map and
  from `markers`

Call these methods in `updateMarkers()` to ensure that benches that leave our
store have their markers removed from the map. RIP, benches.

### Fetching Benches when the filters change

Before moving on, remove the call to `fetchBenches()` from the `BenchIndex`
component's `componentDidMount`. **We no longer need to dispatch this action
from our view.** Instead, we'll rely on `updateBounds` to `fetchBenches` after
it dispatches the `UPDATE_BOUNDS` action.

Turn your `updateBounds` action creator into a thunk

- Immediately dispatch the filter change
- import your `fetchBenches` action creator from Bench Actions
- Then, call fetchBenches passing in the current filters from `getState`
- Call the returned function with dispatch.

This is a little tricky, try follow this example and think about the flow of
data.

```javascript
export function updateFilter(filter, value) {
  return (dispatch, getState) => {
    dispatch(changeFilter(filter, value));
    return fetchBenches(getState().filters)(dispatch);
    // delicious curry!
  };
}
```

That's it! The markers and bench index should now only display for benches that
are within the bounds of the map. Move the map around to prove this! **Show your
TA!**

[google-map-doc]:
  https://developers.google.com/maps/documentation/javascript/tutorial
[event-doc]:
  https://developers.google.com/maps/documentation/javascript/events#MarkerEvents
[map-markers]:
  https://developers.google.com/maps/documentation/javascript/markers
[lat-lng-docs]:
  https://developers.google.com/maps/documentation/javascript/reference#LatLngBounds

## Phase 10: Creating Benches

### Adding a `BenchForm`

- Create a new React component & container, `BenchForm` & `BenchFormContainer`.
  This should render a simple form with 4 fields: _ Description _ Number of
  seats _ Latitude _ Longitude
- Add a new `seating` column to the `benches` table.
  - This new column will store how many people can sit together on the bench at
    the same time.
- Create a new `<Route>`, `/benches/new`, for your `BenchFormContainer`
  component.
  - Test the route by navigating to `/#/benches/new`; the map should disappear.
- Write a `create` method on your `BenchesController` and give it a
  corresponding route in `routes.rb`.

### Navigating to the `BenchForm`

Filling in coordinates manually is a major pain; Let's make things a little
easier by bringing up a new bench form when a user clicks on the map and
pre-filling it with latitude and longitude based on where they clicked.

Because `BenchMapContainer` and `BenchFormContainer` live under different
routes, we can't simply pass props between them to convey our click information.
We will need to encode our parameters in a client-side query string.

#### withRouter

Since our `BenchMap` will need access to the `Router`, import the `withRouter`
function from `react-router-dom`. Change the export statement in `bench_map.jsx`
so that we are exporting a wrapped component.

```js
export default withRouter(BenchMap);
```

Our `BenchMap` component will now have a `history` (router) prop.

#### Redirecting with coordinates

Add a `"click"` handler to the map. It should:

- Grab the coordinates from the click event.
- Use the router to redirect to the `BenchForm` URL, providing the `lat` and
  `lng` as query params.

To pass `lat` and `lng` as query params:

- Use `this.props.history.push` to send data along with the new `pathname`.

```js
// frontend/components/bench_map/bench_map.jsx

//...
 _handleClick(coords){
    this.props.history.push({
      pathname: "benches/new",
      search: `lat=${coords.lat}&lng=${coords.lng}`
    });
  }
//...
```

Test this before moving on. You should be able to click the map and make the
browser redirect to a URL that looks something like:

`/#/benches/new?lat=37.79153217974085&lng=-122.40194320678711`

### Pre-filling the form

Inside of the `BenchFormContainer`...

- Define a `mapStateToProps` function that accepts `state` and `ownProps` as
  arguments
- pass `lat` and `lng` props to the `BenchForm` component by deconstructing
  `ownProps.location.search`
- use [`URLSearchParams`][urlsearchparams-docs] to pull the `lat` and `lng` from
  the query string

```js
// frontend/components/bench_form/bench_form_container.jsx

//...
const mapStateToProps = (state, { location }) => ({
  lat: new URLSearchParams(location.search).get("lat"),
  lng: new URLSearchParams(location.search).get("lng")
});
//...
```

Restructure your `BenchForm` component to accept `lat` and `lng` as props. Use
these values to pre-fill the fields on your form. Make the input tags disabled
so that our users don't try to edit them!

**Call a TA over and show them your form in action!!**

### Api Util and Action Creators

- Add a `createBench` function to `bench_api_util.js`. It should make a `POST`
  request to your API.
- Create a `RECEIVE_BENCH` action type.
- Add the following action creators to `bench_actions.js`:
  - `receiveBench` (regular action creator)
  - `createBench` (thunk action creator)
- Add a `mapDispatchToProps` function to your `BenchFormContainer`; this should
  pass a `createBench` prop to `BenchForm`

### benchesReducer

Now, update your `benchesReducer` to respond to the `RECEIVE_BENCH` action.

#### BenchMap

Finally, update your `BenchMap` to redirect to the search page after a new bench
is created.

Create a few benches!

### Protect your front-end bench routes!

Let's make sure users can't get to our `"/#/benches/new"` route on the front-end
unless they're logged in.

- Define a `<ProtectedRoute>` helper method in your `route_util.js`. It should:
  - Check to see if the application state has a `currentUser` property. You can
    use the `loggedIn` boolean like we did in our `AuthRoute` component.
  - If true, render the component.
  - Otherwise, `Redirect` to `"/login"`.
- Add the route to our `App` component like so:

```html
<ProtectedRoute exact path="benches/new" component="{BenchFormContainer}" />
```

**Test that your routes are protected before moving on!**. You should be
re-directed from logging in and signing up to the root if you are already logged
in. In addition, you should be re-directed to logging in if you try to create a
bench and aren't logged in.

## Phase 11: Filtering By Seating

In this section, we want to build the functionality that will allow our users to
filter benches by both their geographic bounds and their number of seats.

### Update your API

- Update your `BenchesController#index` :
  - Modify `bench_params` to accept `:max_seating` and `:min_seating`.
  - Filter your `@benches` by `params[:max_seating]` and `params[:min_seating]`,
    if present.

### Filter Actions

Next, let's write a new action creator. We're going to define a single action
creator, `updateFilter`, that will be invoked whenever we update one of the
following:

- bounds
- min seating
- max seating

It should look like this:

```js
// frontend/actions/bench_actions.js

//...
export const updateFilter = (filter, value) => ({
  type: UPDATE_FILTER,
  filter,
  value
});
//...
```

The first parameter, `filter`, will tell our `filterReducer` which property to
update, and the second parameter, `value`, will specify the value of that
filter.

Start by refactoring the `filterReducer` and `SearchContainer` to use this new
action creator instead of `updateBounds`. Your `filterReducer` should have a
default state that looks like:

```
{
  bounds:{},
  minSeating: 1,
  maxSeating: 10
}
```

Also be sure to refactor your action types if necessary.

### FilterForm

Create a new component, `FilterForm`. It should be a sub-component of `Search`.
`FilterForm` should render two inputs, one for `minSeating` and one for
`maxSeating`.

Update your `SearchContainer` to pull `minSeating` and `maxSeating` from the
state to pass as props. `SearchContainer` should also pass an `updateFilter`
prop to `Search`, which should then pass it on to `BenchMap` and `FilterForm`.
`updateFilter` should be the `onChange` handler of the `input` tags.

You should be able to see the markers change on the screen as you toggle the
values in the form!

## Phase 12: Show Page

Create a `BenchShow` component. It should be a full-page component displaying a
single bench's information and a map showing the bench. Your `BenchShow` page
should mount whenever someone clicks on an item in your `BenchIndex` or a marker
in your `BenchMap`.

- Create a new `Route` for your `BenchShowContainer` that takes a `benchId`
  param.
- Nest a `BenchMap` in your `BenchShow`, passing the bench as a prop.
- Center the map on the single bench and prevent the map from being dragged.

## Phase 13: Reviews

Show reviews of a bench on `BenchShow`. Reviews for a bench should comprise:

- A rating from 1 to 5.
- A comment field.

Add a `ReviewIndex` and `ReviewForm`. `ReviewIndex` should show the average
score for a bench and also list the reviews for that bench. Modify and add the
appropriate API endpoints, actions, reducers, utils, and components.

## Phase 14: Pictures!

When you create a new bench, allow a user to also add a photo. We'll do this in
two steps.

1. Set up a bucket on Amazon Web Services S3 (AWS S3) so that each time the user
   adds an image, we can store our own copy of that image in the cloud.

2. Set up ActiveStorage on our local machine to link up with AWS. Add an
   add-image button in the bench form to allow the user to upload an image.
   Display these pictures on both the show page and the index.

Your database should point to the copy stored in AWS, rather than the original.
We don't want to store the image in our database; that would take up too much
space.

Check out our Active Storage and AWS S3 Hosting Demo, linked in the sidebar, for
details on how to create your own Amazon Web Services account and integrate its
functionality with your app.

Test that everything works by adding a new bench with an image.

## Head to Part 3!

Once you are finished with Phase 14 head over to Part Three.

[google-map-doc]:
  https://developers.google.com/maps/documentation/javascript/tutorial
[event-doc]:
  https://developers.google.com/maps/documentation/javascript/events#MarkerEvents
[map-markers]:
  https://developers.google.com/maps/documentation/javascript/markers
[lat-lng-docs]:
  https://developers.google.com/maps/documentation/javascript/reference#LatLngBounds
[react-history]:
  https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/history.md
[urlsearchparams-docs]:
  https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
[jquery-ajax]: http://api.jquery.com/jquery.ajax/#jQuery-ajax-settings
