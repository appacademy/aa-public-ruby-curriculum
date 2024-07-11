# React Widgets

[**Live Demo!**](https://appacademy.github.io/curriculum/widgets/)

As an introduction to React, we are going to build four simple widgets. We will
be building a clock, interactive tabs, a weather widget, and a simple search
component.

## Learning Goals

- Know how to set up a new React project
- Be able to create simple React components
- Know how to incorporate an API into your app
- Be able to add basic styling to React components

## Phase 1: Setup

Build a new React NPM project from scratch like you did in the Getting Started
with NPM homework, but change your Webpack entry point to be `widgets.jsx`.

Your `widgets.jsx` should have a `DOMContentLoaded` listener that calls
`ReactDOM.render()` with a `Root` component and a `main` DOM element as the
hook.

The `Root` component should be a functional component because it won't use
internal state or any lifecycle methods. For now, have your `Root` return an
empty `<div>`. We will fill this in with our widget components as we create
them.

Note: avoid using vanilla DOM manipulation for this project (`addEventListener`,
`classList`, etc.); rely on React instead. There are rare exceptions, of course,
such as the `DOMContentLoaded` callback in your entry file. If you're not sure
how to do something using just React, or if it's OK to use vanilla DOM methods
instead, use Google as a resource and ask an instructor if needed.

## Phase 2: Clock Widget

### Overview

The clock component should display the current date and time, updating every
second.

### Instructions

- Start by creating a new file `clock.jsx` in your `frontend` folder and
  defining your `Clock` class there. Remember to export. You will require this
  class from `widgets.jsx` and incorporate it into the return value of your
  `Root`. This is the pattern you will follow for all the widgets.
- Create a render method. Give your clock a title in an `<h1>` and check that
  this renders correctly on the page.
- In the constructor, set the initial state for the time of your clock using
  `new Date()`.
- Write a method, `tick` that uses `setState` to set the time to a `new Date()`
- You'll use `setInterval` to call `tick` every second, but you should wait
  until the component is actually on the page. For this, you can define a
  [`componentDidMount`][componentdidmount] function.
- You'll also want to [store that interval's id][clearinterval] so you can
  cancel it in [`componentWillUnmount`][componentwillunmount], which gets called
  just before the component is removed. Don't store this in the component's
  `state` since it doesn't affect the UI. Instead, just store it directly on
  `this`.
- In your render method, display the current hours, minutes, and seconds. Check
  out all of the [methods][date-object] you can use to display the date and time
  in a human-readable string.

#### Styling

- Create an `index.css` file and add it to the head of your `index.html` file.
  Remember to include your CSS resets.

- Go to [Google Fonts][google-fonts] and select a nice font for your clock. Take
  the font embed code and paste it into the `<head>` of your HTML page. Your
  `<head>` should look something like this right now:

```html
<head>
  <title>React Widgets</title>
  <link rel="stylesheet" href="index.css" />
  <link
    href="https://fonts.googleapis.com/css?family=Open+Sans"
    rel="stylesheet"
    type="text/css"
  />
  <script src="bundle.js"></script>
</head>
```

- To use the font, set the `font-family` of your element to the font name in
  your `index.css` file.

- Set the time and date headers to be on one side and the actual time and date
  to the other. Refer to the live demo to see what your end goal is. You can
  achieve this easily with a flexbox. Take a look at the
  [`justify-content`][justify-content] property. Which one do you want to use?
  Try all of them to understand what they do.

- Add a background. Use the `background-image` or `background-color` property to
  change the background. Feel free to do this for every widget.

[justify-content]: https://css-tricks.com/almanac/properties/j/justify-content/
[google-fonts]: https://fonts.google.com/
[date-object]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

### Recap

You should now have a clock that displays the current time date. We used
`setInterval` to make sure that the clock updates every second, and
`clearInterval` to clear the timer that `setInterval` set. Once you have
sufficiently styled your clock, move on to the next widget.

## Phase 3: Tabs Widget

### Overview

We are going to add a tabs widget that the user can interact with. The tabs
should each be labeled with their own title. The selected tab should be in
**bold** font. Below the tabs, display the contents of the selected tab. The
content pane should update when the user selects different tabs.

### Instructions

- Make a `Tabs` component. `Root` should pass the `Tabs` component an array of
  Javascript objects that each have `title` and `content` as keys.
- Keep track of the selected tab's index in your `Tabs` component's state. Set
  it initially to zero.
- In the render method of `Tabs`, render a collection of `<h1>`s (with titles)
  in a `<ul>` and the content of the selected tab in an `<article>`.
  - Consider creating a `Header` subcomponent for the tabs.
- Add a click handler to each header that updates the selected index in the
  `Tabs` component.
- Remember that JSX interpolation is just syntactic sugar for passing an
  argument to a function, which means that it only supports _expressions_, so
  you can't use `if`/`else` inside `{ }`. (This is also why you can't end with a
  semicolon.)

#### Styling

- Add a border around each tab header and the whole section. Use `border-radius`
  to add nicely curved corners to the top of your tabs.
- Use a flexbox to ensure that the tabs all take up the same amount of space.
  Add `display: flex` to your CSS for your tab headers.
- Center the tab content, both horizontally and vertically.
- Add a hover effect to change the background color of the tab that's being
  moused over.
- Change the `cursor` to be a `pointer` when you're mousing over the tabs to
  make it clear that the tabs are interactive.

### Recap

At this point, you should have a widget that displays the content of a selected
tab. The selected tab's label should be bold and the content pane should update
when a different tab is selected. Move on to the next phase. 😸

## Phase 4: Weather Widget

### Overview

In this phase, we will create a weather widget to display the current weather
based on the user's location. We will be using the `navigator.geolocation` API
to get the user's current location, and the [open weather API][weather] to get
the current weather.

### Instructions

- Make a `Weather` component, which again, will be incorporated into your `Root`
  component.

- Review the [open weather API][weather] documentation. We'll use this API to
  get the weather based on our current location (we recommend fetching the
  weather by geographic coordinates).

- In order to get the API to accept your HTTP requests, you'll need an API key.
  [Read up on how to use the API key and sign up for one here.][api-key] After
  signing up, click on the API keys tab to get your key. You may need to open
  their welcome email before the API key will work.

**NB:** In the real world, you should be very careful about placing API keys in
frontend JavaScript or anywhere else they are publicly available and can be
scraped (this includes public Git repos). Stolen keys can cost you. _You have
been warned._

- Now let's get your current location! When the component mounts, call
  `navigator.geolocation.getCurrentPosition` to get it. Read through the
  [documentation][navigator] to figure out how to use this function properly.
  (Make sure you have [location services enabled][location-services] in your
  browser, or this won't work.)

- When the current location is received, use a callback to query the weather API
  using a raw, "vanilla" JavaScript `XMLHttpRequest`.
  - See [here][vanilla-ajax] and [here][nojquery] for help with the
    XMLHttpRequest.
  - For more in-depth details, look at the [XMLHttpRequest Docs][xmlhttpdocs]
  - Hint: pass a callback to your location query that takes a `location`
    argument. `console.log` that argument to figure out how to extract the
    information you need, then build your `XMLHttpRequest`.
  - Hint: You should build out the URI of your API request piece by piece, using
    the coordinates in the location argument and your API key.
  - Common pitfall: You need to include `http://` in your request URI
  - If you're spending more than 25 minutes setting up your request, ask a TA
    for help!
- Render the current city and temperature on the page.
  - **NB**: By default, the OpenWeatherMap API will return the temperature in
    Standard units (Kelvin). Convert to Fahrenheit **OR** peruse the API docs
    for a way to request the weather in Imperial units (Fahrenheit)!
- Give the weather box a nice border and make sure the elements inside are
  spaced evenly.

[api-key]: http://openweathermap.org/appid
[clearinterval]:
  http://stackoverflow.com/questions/5978519/setinterval-and-how-to-use-clearinterval#answer-5978560
[componentdidmount]:
  https://reactjs.org/docs/react-component.html#componentdidmount
[componentwillunmount]:
  https://reactjs.org/docs/react-component.html#componentwillunmount
[nojquery]: http://youmightnotneedjquery.com/#request
[xmlhttpdocs]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
[navigator]:
  https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
[location-services]: https://support.google.com/chrome/answer/142065?hl=en
[weather]: http://openweathermap.org/current
[vanilla-ajax]:
  http://stackoverflow.com/questions/8567114/how-to-make-an-ajax-call-without-jquery

### Recap

Great work! Now we have two widgets. One that displays the time, and another
that displays the weather. We used the `navigator.geolocation` API to get our
current location, which we then passed to our `XMLHttpRequest` to get the
weather from the Open Weather Map API.

## Phase 5: Autocomplete Widget

### Overview

Make an `Autocomplete` component that filters a list of names by the user's
input. Match only names that start with the search input. When a user clicks on
a name, the input field should autocomplete to that name.

### Instructions

- Create a new file `autocomplete.jsx` and define your `Autocomplete` class
  there. Incorporate it into `Root`.
- Because your `Autocomplete` widget should be reusable, it mustn't define its
  own list of names. Instead, create a list of names in `widgets.jsx` and pass
  them into `Autocomplete` as a prop.
- Set your initial state for inputVal as an empty string.
- Build your widget in the `render` method.
  - It should contain an input field and an unordered list.
  - Create an `<li>` inside the `<ul>` for every name that begins with the value
    in the input box.
  - You'll need to pass a [unique `key` property][react-keys] to each `<li>` or
    React will grumble to all your console-reading users about its unfair
    working conditions. "How is one supposed to efficiently diff the DOM when
    one doesn't even know which list items match up with which!?"
- When a user types something into the input, use an event handler to update the
  widget's state. Remember, no vanilla DOM manipulation!
- Add a click handler to the `<li>`s you've created for each name using onClick.
  In the click handler, use `setState` to update the widget's search string. You
  will need to turn your `<input>` into a [controlled
  component][controlled-component-docs] for this to work.

#### Styling

- Give your component a border and make sure all the `<li>`s are nicely padded
  inside the box.
- Change the `cursor` property to display a pointer when hovering over one of
  the `<li>`s.
- Center all your widgets using flexboxes. Which `justify-content` property
  would you use for this?

### Recap

Great job! The Autocomplete Widget uses an event handler to update the state of
the component when letters are typed into the input field. Once the autocomplete
widget is sufficiently styled, move on to the bonus phase to make your widgets
even better.

### Bonus phase 1: React-Transitions

Right now, the matched names instantly appear on the screen and the filtered
names instantly disappear. This is abrupt and ugly. We want the names to fade
out or in when they are entering or leaving the page. How can we achieve that
with React? With the [ReactCSSTransitionGroup][react-transitions]!

- First we need to import the `ReactCSSTransitionGroup` module into our project.
  In the console, run `npm install react-addons-css-transition-group`.
- Then you need to require the module in the file. At the top of
  `autocomplete.jsx`, write
  `import ReactCSSTransitionGroup from 'react-addons-css-transition-group';`.
- In your `render` method, you will need to wrap the group of elements that will
  be entering and leaving the screen with the `<ReactCSSTransitionGroup>`
  element. In the case of the autocomplete widget, those are the `<li>`. **You
  are not wrapping each individual `li`, but rather the entire group.**
- `<ReactCSSTransitionGroup>` has three necessary attributes. Read what they are
  below and make sure to include them:
  - `transitionName`: This is the name that's used to create all of the
    transition classes. I set this equal to `"auto"`, but you can pick any name
    you like.
  - `transitionEnterTimeout`: Specifies how long (in ms) the transition should
    last when the element enters the page. This needs to be a number, so you'll
    have to interpolate the javascript number; otherwise, it'll be read as a
    string. (i.e `{500}` instead of `500`).
  - `transitionLeaveTimeout`: Same as above, except for when an element is
    leaving the page.
- Finally the CSS. Create a new CSS file and paste in the code below.
  - Be sure to make a `link` tag in your `index.html` page so the transitions
    are applied.
  - The CSS below assumes you've given the `transitionName` attribute to `auto`.
    If you gave it a different name, just replace every `auto` with the name you
    gave.

```css
/* AutoComplete */

.auto-enter {
  opacity: 0.01;
  transform: translateY(500%);
}

.auto-enter.auto-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 500ms, transform 500ms;
}

.auto-leave {
  opacity: 1;
  transform: translateY(0);
}

.auto-leave.auto-leave-active {
  opacity: 0.01;
  transform: translateY(500%);
  transition: opacity 500ms, transform 500ms;
}
```

- Go play with the widget. You'll notice that when names appear, they fade in
  from the bottom. When they leave, they fade out and fall to the bottom. Let's
  break down the CSS file:
  - `.[transitionName]-enter`: Specifies the initial state of an element that is
    entering the page. Since I want the names to start invisible and at the
    bottom, I've given it the `opacity` and `transform` properties the
    appropriate values.
  - `.[transitionName]-enter.[transitionName]-enter-active`: Specifies the final
    state of an element that has entered the screen. Looking at the CSS, we can
    see that I expect the element to be completely opaque and in it's original
    y-position when it is done entering. This is where you also specify the
    `transition` property.
  - `.[transitionName]-leave`: Specifies the initial state of an element that is
    leaving the page. In almost all cases, the values of this class with match
    the values in the `[transitionName]-enter.[transitionName]-enter-active`
    class.
  - `.[transitionName]-leave.[transitionName]-leave-active`: Specifies the final
    state of an element that has left the screen. This is where you also specify
    the `transition` property.
- Now play around with the CSS file. What kind of interesting transitions can
  you create?

[react-transitions]: https://reactjs.org/docs/animation.html
[react-keys]: https://reactjs.org/docs/lists-and-keys.html
[controlled-component-docs]:
  https://reactjs.org/docs/forms.html#controlled-components
