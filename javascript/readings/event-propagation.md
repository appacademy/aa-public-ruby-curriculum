# Event Propagation

Previously, we learned about event handling. Let's go a little more in-depth and
take a look at how events propagate.

## The Bubbling Principle

Consider the following:

```html
<div id='table'>
  <div id='plate'>
    <div id='omelette'>I am an omelette!</div>
  </div>
</div>

<script>
  const table = document.getElementById('table');
  table.addEventListener('click', () => console.log('clicked table')));
</script>
```

In the above code, we set a click handler on the outermost `div#table`. This
click handler still gets triggered, though, when we click on the innermost
`div#omelette`.

Why does this happen? The answer is that DOM events bubble.

**The Bubbling Principle:** After an event triggers on the deepest possible
element (the event target), it then triggers on the event target's ancestor
elements in nesting order.

By this principle, a `click` event on `div#omelette`:

* first triggers any `div#omelette` click handlers, 
* then triggers any `div#plate` click handlers, and 
* finally triggers any `div#table` click handlers

## Multiple Listeners

Let's alter the above code slightly to add multiple listeners.

```html
<div id='table'>
  <div id='plate'>
    <div id='omelette'>I am an omelette!</div>
  </div>
</div>

<script>
  const table = document.getElementById('table');
  const plate = document.getElementById('plate');
  const omelette = document.getElementById('omelette');

  table.addEventListener('click', () => console.log('clicked table')));
  plate.addEventListener('click', () => console.log('clicked plate')));
  omelette.addEventListener('click', () => console.log('clicked omelette')));
</script>
```

What gets logged when we click on `div#omelette`? The click event bubbles up
from the innermost element to the outermost, so we first see 'clicked omelette',
then 'clicked plate', and finally 'clicked table'.

## Stopping Propagation

What if we *don't* want an event to bubble? We can use
[`Event.stopPropogation()`][stop-propagation]:

```html
<div id='table'>
  <div id='plate'>
    <div id='omelette'>I am an omelette!</div>
  </div>
</div>

<script>
  const table = document.getElementById('table');
  const omelette = document.getElementById('omelette');

  table.addEventListener('click', () => console.log('clicked table')));
  omelette.addEventListener('click', event => event.stopPropagation());
</script>
```

Now, whenever we click on `div#table`, 'clicked table' gets logged, *except*
when we click on `div#omelette`. In that case, we stop propagation of the event,
preventing it from bubbling up and triggering the click handler on `div#table`.

## `target` and `currentTarget`

When we first learned about events, we learned about [`Event.target`][target],
which is the element that the event was triggered *on* or *from*.

What would be logged, then, if we clicked on `div#omelette` with the following
event listeners?

```js
  table.addEventListener('click', event => console.log(event.target)));
  plate.addEventListener('click', event => console.log(event.target)));
  omelette.addEventListener('click', event => console.log(event.target)));
```

The answer is that `div#omelette` would get logged each time. No matter where we
attached it, each click handler is being triggered by the same click event,
which occurred on the same element, and so has the same `event.target`.

Then what if we want to do the following?

```js
  document.getElementById('table').addEventListener( event => {
    // log the element we attached the listener to (div#table)
  });
```

Of course we *could* save the element to a variable `table`, which our event
handler would *close over*, letting us `console.log(table)`. But that's not
always feasible; maybe our event handler is a named function defined somewhere
else, where `table` is not defined.

What we can do instead is `console.log(event.currentTarget)`.
[`Event.currentTarget`][current-target] is a *dynamic* property that points to
whatever element the currently executing event handler is attached to. So if we
clicked on `div#omelette`, the following would get logged:

```js
  document.getElementById('omelette').addEventListener( event => {
    console.log(event.target); // div#omelette
    console.log(event.currentTarget); // div#omelette
    console.log(event.target === event.currentTarget); // true
  });

  document.getElementById('table').addEventListener( event => {
    console.log(event.target); // div#omelette
    console.log(event.currentTarget); // div#table
    console.log(event.target === event.currentTarget); // false
  });
```

To recap:

`event.target`: the innermost element which triggered the event. `target`
remains constant throughout the bubbling process.

`event.currentTarget`: the element on which the handler is registered.
`currentTarget` changes throughout the bubbling process.


## Event Delegation

Suppose our table doesn't have just one plate, but a whole `ul` of plates, each
of which might have an omelette on it. Whenever we click on any omelette, we
want that omelette to turn green.

We could add a bunch of event listeners, one for each omelette. If we add a new
omelette, we attach a new listener. If we remove an omelette, we remove the
listener. This approach is inefficient and error-prone.

Instead, we could add a single event listener to the common ancestor of all the
omelettes: the table. Then, whenever we click anywhere on the table, we can
check to see if the `target` of the event is an omelette, and if so, turn it
green:


```html
<ul id='table'>
  <li class='plate'>
    <div class='omelette'>I am a spinach & feta omelette!</div>
  </li>
  <li class='plate'>
    <div class='omelette'>I am a ham & cheddar omelette!</div>
  </li>
</ul>

<script>
  document.getElementById('table').addEventListener('click', event => {
    if (event.target.classList.contains('omelette')) {
      event.target.classList.add('green');
    }
  });
</script>
```

This pattern is called **Event Delegation**; it's quite powerful and convenient.
You can use it whenever you find yourself adding the same event listener to
multiple similar elements that all have the same ancestor. It's especially
useful when those elements might get dynamically added to or removed from the
page.

[stop-propagation]:
https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
[target]: https://developer.mozilla.org/en-US/docs/Web/API/Event/target
[current-target]:
https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget
