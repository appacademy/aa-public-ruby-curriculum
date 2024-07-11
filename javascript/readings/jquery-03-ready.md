# jQuery Part III: `$(document).ready`

Because `script` tags are immediately executed, even before the rest
of the document is parsed, we have to be careful when querying
elements in the DOM:

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

<script>
  // does nothing; no such ul exists yet.
  $("ul.cool-things > li").attr("style", "background-color: red");
</script>

<ul class="cool-things">
  <li>Racecars</li>
  <li>Lasers</li>
  <li>Aeroplanes</li>
</ul>
```

**Note this very common problem**: `$("ul.cool-things > li")` returns
an empty jQuery object. However, this is a valid jQuery object, and we
can call methods like `#attr` on it. However, these methods will not
do anything. **No error will be raised**.

When your jQuery code mysteriously seems like it doesn't run, it's
often helpful to add a `console.log` to print the jQuery object to
make sure you selected some elements and that the jQuery collection is
not empty.

**This is extremely common**, because writing CSS selectors is hard.

We can fix this by moving JavaScript to the bottom of the page:

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

<ul class="cool-things">
  <li>Racecars</li>
  <li>Lasers</li>
  <li>Aeroplanes</li>
</ul>

<script>
  // this will work, now. the <ul> and <li>s have been defined.
  $("ul.cool-things > li").attr("style", "background-color: red");
</script>
```

The browser will evaluate the HTML document from top to bottom. If
JavaScript files or scripts precede HTML body content, the browser
will not render any of the body until the JavaScript has been
evaluated. The result of this is that a user might have to wait for an
unacceptable amount of time for their content to show. For this reason,
it is preferred to put JavaScript of all kinds below the HTML body content
whenever possible. However, we can use jQuery to ensure that JavaScript code
will be executed only after the page is loaded, even if the JavaScript
is placed at the head:

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

<script>
  // jQuery will call the function only after the DOM is fully loaded.
  // The anonymous function **is not** called right at this point.
  $( () => {
    $("ul.cool-things > li").attr("style", "background-color: red");
  });
</script>


<ul class="cool-things">
  <li>Racecars</li>
  <li>Lasers</li>
  <li>Aeroplanes</li>
</ul>
```

**Behold**: another way to call `$`: pass it a function, and it will
call it after the DOM is fully loaded. Another way to say the same
thing is: `$(document).ready(function () { ... })`. This is merely
more verbose, so it is not preferred.

Ideally, you could put all your JavaScript just before the `</body>`
tag; this would eliminate the need for `$(function () { ... })`. It is
also generally advisable from a performance standpoint: script tags at
the top of the page will block the rendering of the rest of the content
until they are fetched and downloaded. This can be especially painful
for JavaScript hosted by third parties.

However, it is not always easy to put all JavaScript at the bottom of
the page. Rails, for instance, puts JavaScript in the head. Therefore,
to keep things simple, it is typical to use jQuery to only run a
function after the DOM loads.
