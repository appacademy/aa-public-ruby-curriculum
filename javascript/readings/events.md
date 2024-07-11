# Events

JavaScript is used to enhance web applications in a lot of ways these days, but
its original pitch was simple: it lets you add interactivity to an otherwise
static page. What does interactivity mean? In plain English: stuff happens in
response to user interaction. User interaction boils down to DOM `events`: every
click, scroll, keypress, form submission etc. fires off an event. 

We can use the `EventTarget#addEventListener(type, handler)` method to run code
in response to events that occur. [EventTarget][event-target] is the parent
class of `Node` (the best example of an `EventTarget` that is not a `Node` is
the [window][window] object).

`addEventListener` takes in 2 arguments: the event type you're listening for,
and a callback that should be run when a matching event is fired. This callback
is commonly called an **event handler**. 

## Simple Example

```html
<button id='count-btn'>Count sheep!</button>

<p>You've counted to <span id='click-count'>0</span> sheep!</p>

<script>
  const button = document.getElementById('count-btn');
  const countSpan = document.getElementById('click-count');

  button.addEventListener('click', event => {
    console.log(event.target) // button#count-btn
    let curCount = parseInt(countSpan.innerText); // get current count from span
    countSpan.innerText = curCount + 1; // increment count by 1
  });
</script>
```

In this example, the `button` with `id` of `count-btn` is the event target, the
event type is `click`, and the event handler is the arrow function passed as the
second argument to `addEventListener`. 

What's considered the target of an event differs by event type, but it's usually
pretty intuitive; for `click` events, it's just whatever element you clicked on.

The event handler runs any time you click the button. It receives a single
argument, an [Event][event] object. This object contains information about the
event, with properties like `type`, `target`, and `timeStamp` (when the event
fired). It also includes helpful methods: `Event.preventDefault()`, for
instance, prevents default browser behavior for an event, such as a checkbox
toggling when you click it.

## More Complex Example

The above example was pretty straightforward; let's look at another:

```html
<ul id='sheep'></ul>

<form id='sheep-form'>
  <label for='sheep-name'>Name</label>
  <input type='text' name='sheep[name]' id='sheep-name'>

  <button>'Create sheep!'</button>
</form>

<script>
  const sheepForm = document.getElementById('sheep-form');

  sheepForm.addEventListener('submit', event => {
    // *cancel default behavior for this event*
    // if we don't include this line, the browser will do what it normally does
    // when you submit a form: make an HTTP request, causing a full page refresh
    event.preventDefault();

    // Get the name input element, get the value, and clear it.
    const sheepNameInput = document.getElementById('sheep-name')
    const sheepName = sheepNameInput.value;
    sheepNameInput.value = '';

    // Add a new li with the sheep's name to the sheep ul.
    const ul = document.getElementById('sheep');
    const li = document.createElement('li');
    li.textContent = sheepName;
    ul.appendChild(li);
  });
</script>
```

When the user clicks on the submit button in the form, the browser will trigger
a `submit` event on the `form` element.

In the event handler, we call `event.preventDefault()` to stop the form from
*really* submitting (ie sending off an HTTP request and forcing a full page
refresh). Then, we do some DOM manipulation to take whatever sheep name the user
typed into the form input and add it as another list item to our `ul`.

So far we've seen `click` and `submit` events. Here's a list of common events:

* `click`, `dblclick`
* `input`, `change`, `submit`
* `keydown`, `keyup`
* `mouseover`, `mousemove`, `mouseout`
* `scroll`, `resize`

MDN, as ever, has a full list of [DOM Events][dom-events].

## Removing Event Listeners

Sometimes, you want to remove an event listener you had added before; maybe the
user changed a setting or navigated to a different section of your app. For
that, we can use `EventTarget.removeEventListener(type, handler)`. The arguments
for this method must exactly match the arguments you supplied to
`addEventListener`. Because you want to supply the *same* function as the event
handler, you'll want to save the event handler function to a variable, or make
it a named function, so you can pass it to both `addEventListener` and
`removeEventListener`.

```html
<button id='count-btn'>Count sheep!</button>
<button id='toggle-count-btn'>Stop counting sheep!</button>

<p>You've counted to <span id='click-count'>0</span> sheep!</p>

<script>
  const countButton = document.getElementById('count-btn');
  const toggleCountButton = document.getElementById('toggle-count-btn');
  const countSpan = document.getElementById('click-count');

  const clickHandler = event => {
    let curCount = parseInt(countSpan.innerText); // get current count from span
    countSpan.innerText = curCount + 1; // increment count by 1
  }

  let stopped = false; // whether counting is currently stopped
  countButton.addEventListener('click', clickHandler);
  toggleCountButton.addEventListener('click', event => {
    if (stopped) { // we're currently stopped; add listener to start counting
      countButton.addEventListener('click', clickHandler);
      toggleCountButton.innerText = 'Stop counting sheep!';
    } else { // otherwise stop counting by removing event listener
      countButton.removeEventListener('click', clickHandler);
      toggleCountButton.innerText = 'Resume counting sheep!';
    }
    stopped = !stopped;
  });
</script>
```

[event-target]: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget
[event]: https://developer.mozilla.org/en-US/docs/Web/API/Event
[dom-events]: https://developer.mozilla.org/en-US/docs/Web/Events
[window]: https://developer.mozilla.org/en-US/docs/Web/API/Window