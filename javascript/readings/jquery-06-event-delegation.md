# jQuery Phase VI: Event Delegation

## The Problem

Let's see a more complicated version of our cool things example:

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

<ul class="cool-things">
  <li>Racecars</li>
  <li>Lasers</li>
  <li>Aeroplanes</li>
</ul>

<form id="cool-thing-form">
  <label>
    Cool Thing
    <input type="text" id="cool_thing">
  </label>

  <input type="submit" value="Create Cool Thing">
</form>

<script>
  const $form = $("#cool-thing-form");
  $form.on("submit", event => {
    event.preventDefault();

    const $input = $("#cool_thing");
    const coolThing = $input.val();
    $input.val("");

    $("ul.cool-things").append($("<li></li>").text(coolThing));
  });

  const $listItems = $("li");
  $listItems.on("mouseover", event => {
    const currentTarget = event.currentTarget;
    const $currentTarget = $(currentTarget);
    alert($currentTarget.text());
  });
</script>
```

The problem with this code is that, at startup, it attaches event
listeners to all the `li` elements. When we fill out and submit the
form, a new `li` element is created; however, there is no event
listener attached. Hovering over the new element **will not call the
callback**.

We can hack a solution:

```js
const $form = $("#cool-thing-form");
$form.on("submit", event => {
  event.preventDefault();

  const $input = $("#cool_thing");
  const coolThing = $input.val();
  $input.val("");

  const $li = $("<li></li>").text(coolThing);
  $li.on("mouseover", mouseoverCallback);
  $("ul.cool-things").append($li);
});

const $listItems = $("li");
$listItems.on("mouseover", mouseoverCallback);

mouseoverCallback = event => {
  const currentTarget = event.currentTarget;
  const $currentTarget = $(currentTarget);
  alert($currentTarget.text());
}
```

We are now being extra careful to add a callback each time we create a
new li.

There are three problems with this:

* It is not DRY, and is easy to forget to install the event listener.
* It adds more and more event listeners, each of which incrementally
  slows down the page.
* The code that inserts the element may not even know that some other
  code wants an event handler to be called each time a mouseover event
  happens to the list items. This hurts the separation of concerns.


## Event Delegation: `target` vs `currentTarget`

Let's write a new solution:


```html
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

<ul class="cool-things">
  <li>Racecars</li>
  <li>Lasers</li>
  <li>Aeroplanes</li>

  <div>What is a div doing inside here?? I don't alert when you hover.</div>
</ul>

<form id="cool-thing-form">
  <label>
    Cool Thing
    <input type="text" id="cool_thing">
  </label>

  <input type="submit" value="Create Cool Thing">
</form>

<script>
  const $form = $("#cool-thing-form");
  $form.on("submit", event => {
    event.preventDefault();

    const $input = $("#cool_thing");
    const coolThing = $input.val();
    $input.val("");

    const $li = $("<li></li>").text(coolThing);
    $("ul.cool-things").append($li);
  });

  $("ul.cool-things").on("mouseover", event => {
    // currentTarget is the thing the event handler is installed on.
    const $ul = $(event.currentTarget);

    // target is the thing that the event happened to. This line sees
    // if the thing we mousedover is an `li` in the `$ul`.
    if ($ul.find("li").is(event.target)) {
      alert($(event.target).text());
    };
  });
</script>
```

Look what we did here. We installed the `mouseover` event handler on
the `ul`. We take advantage of the fact that DOM events typically
**bubble**: if an event fires on element `X` which lives inside
element `Y`, then after being fired on `X` the event will **bubble
up** and be fired on `Y`.

In this case, when we mouseover an `li` inside the `ul`, the
`mouseover` event will first fire on the `li`, and then **bubble up**
and fire again on the `ul`.

The event handler is installed on the `ul`, so the `currentTarget`
will be the `ul`. However, the `target` is the thing we actually
moused over. It could be anything inside the `ul`. The element that
**generated** the event is stored in `target`.

In our function, we see if the `target` is an `li`. If it is, we
trigger the alert. We also use `target` to read the appropriate text.

**Note**:

* As we add new list items to the ul, they will automatically be
  covered by this event handler; it is on the ul, not individual list
  items, so we don't need to keep adding more and more event handlers.
* We can choose to match only contained list items, and not divs.
  Mousing over the div will have no effect.

This pattern of installing a single event handler on a parent to catch
events on its children is called **event delegation**. It can be much
more performant and flexible than installing many event handlers.

## Event Delegation: With a Little Help From jQuery

Writing event delegation like this can be tricky and cause bugs,
especially if there are other elements nested within of your intended
`event.target` that could usurp its coveted `event.target` status.
jQuery helps us out by giving us the three-argument version of
`jQuery#on(event, selector, callback)`:

```js
  const $form = $("#cool-thing-form");
  $form.on("submit", event => {
    event.preventDefault();

    const $input = $("#cool_thing");
    const coolThing = $input.val();
    $input.val("");

    const $li = $("<li></li>").text(coolThing);
    $("ul.cool-things").append($li);
  });

  // the handler will be called whenever we mouseover any `li` in
  // `ul.cool-things`.
  $("ul.cool-things").on("mouseover", "li", event => {
    alert($(event.currentTarget).text());
  });
```

The three-argument version sets up the delegation for us: it says that
the event handler should be called whenever we mouseover any `li` in
`ul.cool-things`. This will install an event handler on
`ul.cool-things`; this internal event handler will ignore events on
non-li items, but call our event handler for list items.

Note that we use `event.currentTarget` here. When we use event
delegation, jQuery will reset `event.currentTarget` to be the
`li` item. jQuery will set `event.delegateTarget` to be
`ul.cool-things`. `event.target` will be the item that triggered the
mouseover event: it could be an `li`, or it could be an item
further nested in the `li`. For instance:

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

<ul class="cool-things">
  <li>
    A cool thing
    <span>This gets moused over</span>
  </li>
</ul>

<script>
$("ul").on("mouseover", "li", event => {
  console.log(event.target);
  console.log(event.currentTarget);
  console.log(event.delegateTarget);
});
</script>
```

If we mouseover the `span`, then `event.delegateTarget` is the `ul`,
`event.currentTarget` is the `li`, and `event.target` is the `span`.

**99% of the time, we want to use `event.currentTarget`.**
