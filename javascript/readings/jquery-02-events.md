# jQuery Part II: Events

We saw how to use `EventTarget#addEventListener`. Now we'll see the
jQuery way: `jQuery#on(eventName, callback)`:

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

<ul id="cool-things"></ul>

<h4>New Cool Thing</h4>
<form id="cool-thing-form">
  <label>
    Cool Thing
    <input type="text" name="cool_thing" id="cool_thing">
  </label>

  <input type="submit" value="Create Cool Thing!">
</form>

<script>
$("#cool-thing-form").on("submit", event => {
  event.preventDefault();

  const $input = $("#cool_thing");
  const coolThingVal = $input.val();
  // clear input
  $input.val("");

  const $li = $("<li></li>");
  $li.text(coolThingVal);

  $("#cool-things").append($li);
});
</script>
```

`jQuery#on` works a lot like `EventTarget#addEventListener`.

## Stop Listening

You can use jQuery to stop listening:

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

<button>Toggle Annoying Handler</button>

<p>Try to hover over me!</p>

<script>
  let enabled = false;

  function annoy() {
    alert("YOU ARE HOVERING OVER ME!");
  }

  $("button").on("click", () => {
    if (!enabled) {
      $("p").on("mouseover", annoy);
      enabled = true;
    } else {
      // remove listener
      $("p").off("mouseover", annoy);
      enabled = false;
    }
  });
</script>
```

You can call `jQuery#off(eventName)` to remove all callbacks for that
event, but it is more common to use `jQuery#off(eventName, callback)`
to remove just one callback for the event. This is because you may not
know what other code has registered a callback for an event, and you
want to not indiscriminately remove those handlers.

## The `Event` object: `currentTarget` and `preventDefault`

We have seen that your event handler will be passed an
[`Event`][event] object. The most important property of the `Event` is
`currentTarget`:

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

<ul>
  <li>Racecars</li>
  <li>Lasers</li>
  <li>Aeroplanes</li>
</ul>

<script>
  var $listItems = $("li");
  $listItems.on("mouseover", event => {
    const currentTarget = event.currentTarget;
    const $currentTarget = $(currentTarget);
    alert($currentTarget.text());
  })
</script>
```

Note that we install the same event handler on all three `li`
elements. The only way the event handler knows which list item is
being moused over is through `event.currentTarget`.
`event.currentTarget` is always an `HTMLElement`, it is common to
create a jQuery object wrapping `event.currentTarget` so we can use
jQuery methods.

We have also discussed previously the need to `preventDefault`.
This stops the event from triggering any built-in actions. This is most
important for form submit events, since if the event is not canceled
by your JavaScript code, the browser will perform the default action,
which is to make an HTTP request submitting a form.

[event]: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
