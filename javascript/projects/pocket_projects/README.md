# Pocket Projects: Vanilla JS Edition

### Learning Goals

- Know how to traverse and manipulate the DOM using vanilla JavaScript
- Practice using event listeners using vanilla JavaScript
- Learn to Implement extra Functionality using vanilla JavaScript
- Understand an HTML page as a tree of DOM nodes
- Understand Event Bubbling and Delegation
- Learn How Debouncing Works

## Introduction

**Live [Demo][demo]!**

Vanilla JavaScript is an incredibly important skill to have in both interviews
and as a developer. Vanilla JS is also super fun and gives you amazing
flexibility with what can be done on a webpage. So, today you and your partner
will be getting comfortable with using vanilla JavaScript (no jQuery, etc.) to
manipulate the DOM (document object model) and make things work on the page.
Each of the phases of this project is a small 'pocket project' in that they can
each stand on their own, but together you'll have a website with a lot of
functionality!

[demo]: https://appacademy.github.io/curriculum/pocket_projects/

### Webpack

Download the skeleton [here][skeleton].

You'll see two folders in the project directory, `/dist` and `/src`. The `/dist`
folder will hold all of our 'distribution' code, including `index.html`, all our
CSS files and our bundle, `main.js`. The `src` folder is where you will find all
the files you will be working with today. Before you start changing things make
sure to boot up webpack by running `webpack --watch --mode=development`.

[skeleton]:
  https://assets.aaonline.io/fullstack/javascript/projects/pocket_projects/skeleton.zip

## Phase 0: HTML Strings to DOM Elements

Start by looking at the `index.html` - there you will see a `script` tag in
your header linking to your bundle with the attribute `defer`. The HTML
attribute `defer` means “wait for the parser to finish to execute this”. It’s
roughly equivalent to binding your script to the DOMContentLoaded event. When
your code does run, everything in the DOM will be available for you to use.

As you start each phase you'll be importing each of your javascript files into
`index.js`, and uncommenting the HTML for the phase you are working on. All of
the JavaScript files you import into `src/index.js` will then also be read and
bundled up by webpack into `dist/main.js`.

In this project, we use the [ES6 style of importing][es6-import], an elegant and
clear syntax that makes it very easy to import modules from files. We'll learn
more about this syntax later, but for now, follow the pattern we have established
in the provided skeleton.

We'll warm up with something simple. Head to `src/warmup.js`. Once here you'll
see a function named `htmlGenerator`. The `htmlGenerator` function will take
two arguments: a string, and a [`HTML Element`][html-dom]. The desired behavior
of this function is the input string will be [converted into a `<p>`
tag][create-element] and then [appended][append] to the input `HTML Element`.
Never be afraid to look up the documentation for how to interact with
`HTML Element`s if you need a reminder.

Since the [DOM][dom] is a traversable tree you can add to - use your
`htmlGenerator` to add a fun phrase like "I <3 Vanilla DOM manipulation." to
your `h1` tag. Now, whenever you reload the page your `htmlGenerator` will append
a `p` tag below your `h1` tag. Neat! Let's move on to the next phase.

[dom]:
  https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
[html-dom]: https://www.w3schools.com/jsref/dom_obj_all.asp
[create-element]:
  https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
[append]: https://www.w3schools.com/jsref/met_node_appendchild.asp
[es6-import]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

## Phase 1: Clock

Now it's time to flex your Vanilla DOM muscles. We'll start by building a clock!
Take a look at `index.html` and un-comment the HTML for `Phase 1: Clock` there
you'll see a `div` with the id of "clock". This is the element you'll be
building your clock upon. Before you start remember to import your clock file
into `src/index.js` or your code won't be included by webpack.

For this phase, we'll be using the Clock class you previously wrote in the
[functions exercises][clock]. A key idea in web development is making sure that
every time the state changes, the UI also updates. You've previously done using
jQuery for games like Tic Tac Toe and Hanoi. Let's now implement that concept
in the Clock class you previously wrote.

So instead of the clock publishing the time via the console, use the string
generated in the `.printTime` function to render your clock on the DOM using the
`div` with the id of "clock". To accomplish this goal we'll use the
`htmlGenerator` you just created!

The first thing we'll need to do is make sure our clock is set up correctly.
Outside of your Clock class create a variable named `clockElement` to get the
DOM element with the id of "clock". Below that variable, create another variable 
named `clock` with a new instance of a `Clock`. Next, we'll focus on altering our
Clock class to make sure it renders the time on the DOM.

Import and use the `htmlGenerator` function inside the Clock class to take the
string generated by `printTime()` and append it to the `clockElement`. You'll
also want to make sure that whenever a new clock is constructed the
`htmlGenerator` is also run to make sure that as soon as the page loads the
clock is visible. Test it out!

At this point, you probably realized your `htmlGenerator` generates HTML a little
too well. In order to make sure only one `<p>` tag is ever appended to your
Clock you'll have to add a little logic to the `htmlGenerator` function. You can
do this by checking if the incoming htmlElement has any `children`, and it does,
removing those children before appending any other elements.

**Hint**: Remember that the `.children` will not return an array! For easier
iteration you can use `Array.from` to convert the `HTMLCollection` into an
array.

Well, won't you look at the time? It's about time to head to the next phase!

[clock]:
  https://assets.aaonline.io/fullstack/javascript/projects/functions_exercises/solution.zip

## Phase 2: Drop Down Menu

You've probably implemented a dropdown using HTML and CSS before but let's build
a fancier dropdown using JavaScript! Head to `src/drop_down.js` and you'll see
a POJO with a list of dog names and links to information about each dog on the
top of the file. Your final goal will be to dynamically convert the dog POJO
into a dropdown with a list of dog names that you can click on for more
information about that dog.

Start off by creating a function called `dogLinkCreator`. This function will be
responsible for iterating through the `dogs` POJO and returning an array of `li`
tags that represent each dog. Start off by iterating through the POJO, for each
dog you'll need to:

1. Create an `a` tag
1. Set the `a` tag's `innerHTML` to be the dog's name
1. Set the `a` tag's `href` to be the dog's information link
1. Create a `li` tag
1. Give the `li` tag the class of 'dog-link'
1. Append the `a` tag to the `li` tag
1. Push the completed `li` into an array of the dog links completed so far.

Now write a second function called `attachDogLinks`. In this function invoke the
`dogLinkCreator` and assign the result to a variable named `dogLinks`. Now that
you have your `dogLinks` array iterate through it and attach each `li` to the
`ul` element with the class of `.drop-down-dog-list`. Then call your function at
the bottom of your file and you will see your dogs appear!

Nice, your dogs are on the page! Time to add a dropdown effect. We need to make
sure that the dogs won't appear unless the user's mouse has entered the "Here
Are Some Dogs!" message. We can do this by utilizing `eventListeners`!

Here is where the `dog-link` class you added to all your `li` links will come in
handy. By default use CSS to hide all of your `li`s when the page is loaded.
Then write two functions `handleEnter` and `handleLeave` to make your dogs links
appear and disappear. **Remember you can add and remove CSS classes using
javascript!**

Next you'll add your two new eventHandlers to an element on the page so that on
[`mouseenter`][mouse-enter] the dog's links will appear and on
[`mouseleave`][mouse-leave] the links will disappear. Think carefully on where
you want to attach your two [event listeners][event-listener]. Keep in mind
[event delegation][event-delegation] - you want to be able to hover on and click
the dogs links without the dropdown disappearing.

[event-listener]:
  https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
[event-delegation]: https://davidwalsh.name/event-delegate
[mouse-enter]:
  https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event
[mouse-leave]:
  https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseleave_event

### Style Break!

Take no more than 30 minutes and try styling what you've done so far. Add some
[colors] or some [fonts] for extra fun!

[fonts]: https://fonts.google.com/
[colors]: https://coolors.co/app

## Phase 3: Todo List

By now you've read about how to use localStorage to store data in a client's
browsers for later use. For the next phase, we'll be creating a todo list that
will use localStorage to persist todos through page refreshes. Let's get to it!

In `index.html` you'll see a form to add new todos. The expected behavior is
that you will enter text into the input box, click the `+ Add Todo` button, and
a new todo will populate the `todos` ul. You'll also want an indication if that
todo is done or not, so you'll want to add a checkbox next to each todo. First
thing we'll do is create an empty array and set it to the variable `todos` that
will live outside the functions we'll be writing. This will be where all your
`todos` will live.

Next you'll want to set variables for two DOM elements, the `ul` with the class
of `todos` and the form element with the class of `add-todo-form`. These will be
the two elements we'll be adding our eventListeners to. Next we'll write our
event listeners.

Create a function called `addTodo` that will be in charge of listening for the
`submit` event on the form. The `addTodo` function will:

1. Find the input with the name `add-todo` and set's it's value to a variable
2. Create a new todo object with the value from `add-todo` and a `done` key set
   to false
3. Push the `todo` object into the `todos` array.
4. Reset the `add-todo` input to be empty so that the user can easily enter
   another `todo`

Now that we have the `todos` in an array we'll pass that array into another
function we will create called `populateList`. `populateList` will be in charge
of taking each of the todos in the array and mapping them into `label` tag, with
a checkbox next to each of them. Then you'll wrap the `label` tag and the
checkbox `input` into an outer `li` tag. Once each todo is wrapped in an `li`
append them all onto the `ul` with the class of `todos`. Make sure to call
`populateList(todos)` inside your `addTodo` function to make sure that the list
properly populates when the user submits their todo. Now set up your new
`addTodo` `eventListener` to listen for the "submit" event on your form element.

Now that you've got your list showing up it's time to set it up in
[localStorage][localstorage]. Our goal is that whenever a user refreshes the
page all the todos we'd previously stored will be saved and then can be
displayed to the user. In the `addTodo` function you'll want to use
`localStorage.setItem` to store the entire `todos` array whenever a new todo is
added. However, remember that localStorage can only store strings. You can use
JSON's [`parse`][parse] and [`stringify`][stringify] to get your todos array in
and out of localStorage intact. Now, you can set up your `todos` array so that it
will be empty unless `localStorage.getItem` returns something. Now when you
reload the page you can fetch the user's todos out of localStorage to then
display them to the user.

The final thing you'll need to tackle is making sure your todo items stay done!
Write a new event listener that will trigger every time a checkbox is clicked.
You'll probably need to know which checkbox is being clicked - and you can store
that information on the checkbox element itself by utilizing the [data
attribute][data]. Keep in mind [event delegation][event-delegation] - make sure
whatever is listening for the click will always be on the page.

[localstorage]:
  https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
[parse]: https://www.w3schools.com/js/js_json_parse.asp
[stringify]: https://www.w3schools.com/js/js_json_stringify.asp
[data]:
  https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes

## Phase 4: Slide-In On Scroll

Time to explore an issue that can heavily impact performance. For this phase,
you'll be implementing a "scroll down and slide in" effect for a couple of
pictures. In `index.html` you'll see some `img` tags that are currently
invisible on the page. The desired end goal is to be able to scroll down the
page and those images will **magically** slide in when you scroll to a certain
point.

In `src/slide_scroll.js` the first thing you'll want to do is set up an event
listener on the `window` for the scroll event. Try `console.log`ing inside that
function to see how many times the event happens as you scroll down the page.
You'll probably notice you are logging about 10+ events before you even get to
the bottom of the page. That might not seem like a lot, but imagine this page
was hundreds of paragraphs long (like a law document or something) - the scroll
event could trigger hundreds of times. That's a performance hit. That is also
where **debouncing** comes in. To read more about this idea see
[here][debounce], and view the demo from last night [here][debounce-demo].
You'll see that you've been provided a debouncing function, so utilize that
function to make your event listener more efficient.

Next, it's time to make those images actually show up when you scroll down. If
you look in `styles.css` and you'll see you've been provided with all the
classes you need for this effect.

You only want the image to slide in when the user has scrolled down to the exact
middle of the picture. You also want the image to disappear once the user has
scrolled past the image (so if the user scrolls up from the bottom the image
slides in again). Math time - you'll need to find out:

1. Where the image should slide in.
2. Where the bottom of the image is.
3. Whether the picture is being half shown on the page currently.
4. If the image has been scrolled past.

**Hint:** Look at the properties on the window API and on the image tags to get
the information you need. Don't be afraid to `console.log` values to make sure
you understand the properties you are using!

Then add your 'css' classes and you are good to go!

[debounce]:
  https://levelup.gitconnected.com/debounce-in-javascript-improve-your-applications-performance-5b01855e086
[debounce-demo]:
  https://css-tricks.com/debouncing-throttling-explained-examples/
[scroll-y]: https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY

### Style Break!

Take no more than 20 minutes and try styling what you've done so far. Take a
look at some [colors] or [fonts] if you'd like to.

[fonts]: https://fonts.google.com/
[colors]: https://coolors.co/app

## Bonus: Filtered Search

### Overview

For the next phase, you'll be creating a Pokemon search that will filter based on
what the user types in. Sounds neat right?

Head over to `src/search.js`. We'll be using the browser's built-in [fetch
API][fetch-api] to make a new HTTP request to fetch the data we'll be using in
order to filter. So start off by using the provided `pokemonAPI` variable to
fetch data, and then take the `response` you received and store it in an array.

Now you have the data, let's write the next function which will `findMatches`.
The `findMatches` function should receive a word it'll be looking to match, and
the pokemon array to search through in order to find the match. In order to find
a match you'll need to filter through the pokemon array using [Regular
Expression][regex] and the [`match`][match] function to see if any of your
accrued pokemon names match the word passed in.

From there the final step will be to display the found matches to the user. The
next function you write `displayMatches` will not only display matches to the
user, but will also be our `eventListener` for when a user enters information
into the input with the class of `search`.

The `displayMatches` function will be responsible for:

1. Calling the `findMatches` function with the fetched pokemon and the word to
   match, and then setting that to a variable `matchArray`
1. Iterate through the `matchArray` and create an `li` for each pokemon returned
1. Append the `li`s with the matching pokemon to the `ul` with the class of
   `suggestions`

Finally add an eventListener for `displayMatches` on to the "keyup" and "change"
events on the `input` with a class of `search`.

Great job! You are officially the cool kid with the pokemon search. 😎

[fetch-api]:
  https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
[match]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match
[regex]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

## Bonus: Show Them The Weather!

So as the name of this phase suggest we will be showing the user the current
weather for their location. To find a user's location you can use the handy
dandy [geolocation API][geo]. For getting the current weather we'll be using the
[open weather API][weather].

- Review the [open weather API][weather] documentation. We'll use this API to
  get the weather based on our current location (we recommend fetching the
  weather by geographic coordinates).

- In order to get the API to accept your HTTP requests, you'll need an API key.
  (Read up on how to use the API key and sign up for one [here][api-key].) After
  signing up, click on the API keys tab to get your key. You may need to open
  their welcome email before the API key will work.

**NB:** In the real world, you should be very careful about placing API keys in
frontend JavaScript or anywhere else they are publicly available and can be
scraped (this includes public Git repos). Stolen keys can cost you. **You have
been warned.**

- Now let's get your current location! Write a function that will call
  `navigator.geolocation.getCurrentPosition` to get it. Read through the
  [documentation][geo] to figure out how to use this function properly. (Make
  sure you have [location services enabled][location-services] in your browser,
  or this won't work.)

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

Congrats! You've completed five pocket projects that look great on any resume!
Pat yourself on the back and take some time to style everything fabulously.

[geo]: https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API
[weather]: http://openweathermap.org/current
[api-key]: https://openweathermap.org/appid
[location-services]: https://support.google.com/chrome/answer/142065?hl=en
[vanilla-ajax]:
  http://stackoverflow.com/questions/8567114/how-to-make-an-ajax-call-without-jquery
[nojquery]: http://youmightnotneedjquery.com/#request
[xmlhttpdocs]: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
