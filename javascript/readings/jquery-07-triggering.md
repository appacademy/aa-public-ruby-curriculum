# jQuery Part VII: Triggering

We saw that we could add event listeners using
`EventTarget.addEventListener` or `jQuery#on`. Usually, events are
triggered by the browser when the user takes some action. For
instance, a `click` event is fired when the user clicks an element.

We can also trigger events manually. Let's see a silly example:

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

<style>
.hover-submit-outer {
  display: inline-block;
  width: 40px;
  height: 40px;

  /* perfect circle. */
  border-radius: 50%;

  border: 2px solid blue;
}

.hover-submit-inner {
  width: 100%;
  height: 100%;

  background-color: blue;
  border-radius: 50%;

  /* diameter = 1/4 of container width/height */
  transform: scale(0.25);
  transition: transform 0.5s linear;
}

.hover-submit-inner:hover {
  /* expand button to take full size of the container */
  transform: scale(1);
  transition: transform 2s linear;
}
</style>

<form>
  <label>
    Cool Thing
    <input type="text" name="cool_thing">
  </label>
  <br>

  <strong>Create</strong>
  <div class="hover-submit-outer">
    <div class="hover-submit-inner"></div>
  </div>
</form>

<script>
  $("div.hover-submit-inner").on("mouseenter", event => {
    console.log("mouseenter");
    const $div = $(event.currentTarget);

    const timerId = window.setTimeout( () => {
      $div.closest("form").trigger("submit");
    }, 2000);
    $div.data("timer-id", timerId);
  });
  $("div.hover-submit-inner").on("mouseleave", () => {
    console.log("mouseleave");
    const $div = $(event.currentTarget);

    window.clearTimeout($div.data("timer-id"));
    $div.data("timer-id", null);
  });
</script>
```

You hover over the submit button for two seconds, and then the form is
submitted. Paste this into a text file and open it in your browser.

This code fires a `submit` event on the `form` by using
`jQuery#trigger`. This is an example of triggering a DOM event from
JavaScript. The browser will then do its normal thing: it will see if
anyone is listening for this event (no one is listening for submit in
this example), and then it will take the default action (for a form
submit, the browser makes an HTTP request sending the form data).
