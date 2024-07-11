# jQuery Part I: Selection and Manipulation

We've seen that we can use the DOM to both (1) modify the content of
the web page from JavaScript and (2) ask the browser to call our
JavaScript code when events occur. This is the foundation of all
interactive browser web applications.

However, even though the DOM is standardized by the W3C, it is not
implemented identically across browsers. Some browsers support some
parts of the DOM, but not others. The same methods sometimes do
slightly different things. This is worst in old versions of IE, which
did not try very hard to be faithful to specifications.

jQuery is a JavaScript library that builds on top of the DOM's
functionality. jQuery doesn't allow you to do anything you couldn't do
with the low-level DOM methods, and there are things you can do
directly with the DOM and not with jQuery.

However, jQuery is useful because it papers over the differences
between browsers. jQuery methods are intended to work the same across
all browsers. This makes it (slightly) easier to develop an
application that will work even in old versions of Internet Explorer.

jQuery is also a nicer interface to the DOM. Manipulating the DOM
yourself can often involve repetitive, boilerplate code. jQuery tries
to make this easier.

Think of jQuery as a **wrapper library** that does low-level DOM
manipulation for you; the jQuery interface presents a standard and
simpler interface and takes care of things for you.

## jQuery Selection and Explicit and Implicit Iteration

The jQuery library exports two global variables: `jQuery` and `$`,
both of which are assigned the same function. `jQuery === $`; the
dollar sign is just a shorter name for the same thing.

The most common use of `$` is to **select elements using CSS
selectors**. `$("li")` returns a **jQuery object**; a jQuery object is
fundamentally an array of `HTMLElements`:

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

<ul>
  <li>Racecars</li>
  <li>Lasers</li>
  <li>Aeroplanes</li>
</ul>

<script>
  // Two ways of doing the same thing:

  console.log("DOM WAY");
  const listItems = document.querySelectorAll("li");
  for (let i = 0; i < listItems.length; i++) {
    console.log(listItems[i].textContent);
  }

  console.log("JQUERY WAY");
  // returns a jQuery object; the leading dollar-sign in front of
  // $listItems is conventional; it is just part of the variable name.
  const $listItems = $("li");
  for (let i = 0; i < $listItems.length; i++) {
    console.log($listItems[i].textContent);
  }
</script>
```

Whereas `document.querySelectorAll("li")` returns a `NodeList`,
`$("li")` returns a jQuery object. A jQuery object, like a `NodeList`,
is array like; you can ask for its length, and you can lookup a value
by index. Like a `NodeList`, the items in a jQuery object are
regular DOM `HTMLElement`s.

jQuery objects are better than `NodeList`s, because the jQuery class
has all sorts of useful methods:

```html
<style>
  li.green {
    background-color: green;
  }
</style>

<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

<ul>
  <li>Racecars</li>
  <li>Lasers</li>
  <li>Aeroplanes</li>
</ul>

<script>
  const $listItems = $("li");

  // you can iterate with the each method
  $listItems.each(function (index) {
  // The function is called for each `HTMLElement` in `$listItems`;
  // each time it sets `this` to the next `HTMLElement` in the set.
    console.log([index, this.textContent].join(" "));
  });


  // after one second, make the list green
  window.setTimeout( () => {
    // $listItems.each( (_, obj) => {
    //   // in the low-level DOM API, `element.classList` returns a
    //   // `ClassList` object; calling `ClassList#add` adds the class to
    //   // the element.
    //   obj.classList.add("green");
    // });

    // more convenient; uses **implicit iteration**
    $listItems.addClass("green");
  }, 1000);
</script>
```

Here we see `jQuery#each`, which iterates through the list of
`HTMLElement`s. We see how we can use `each` and the low-level DOM API
to add a class to every element in the list.

We also see that we can use `jQuery#addClass`, which adds the class to
all the elements. `#addClass` does the work of iterating through and
adding a class to each element; we say that it **implicitly iterates**
through the elements of the jQuery object.

Common methods similar to `jQuery#addClass` are `jQuery#removeClass`
(removes the class from each of the elements) and `jQuery#toggleClass`
(removes the class from each element that has it, adds it to any that
don't).

## Traversal

Just like `HTMLElement`s have `parentElement` and `children`
attributes, there are `jQuery#parent`, `jQuery#children`, and
`jQuery#siblings` methods.

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

<div>
  <ul>
    <li>Racecars</li>
    <li>Lasers</li>
    <li>Aeroplanes</li>
  </ul>

  <p>Something else</p>
</div>

<script>
  const $ul = $("ul");
  $ul.children().attr("style", "background-color: red");
  $ul.parent().attr("style", "background-color: green");
  $ul.siblings().attr("style", "color: blue");
</script>
```

jQuery methods typically return jQuery objects: `#parent`,
`#children`, and `#siblings` all return jQuery objects. This allows
you to **chain** jQuery methods. If methods returned a `NodeList` we
would need to drop back down to the DOM API.

This is what lets us use the `jQuery#attr` method in the above
example.

## Inserting and Removing Elements

Just like the DOM, we can insert/remove elements into/from the DOM:

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

<div>
  <ul></ul>
</div>

<script>
  const coolThings = [
    "racecars",
    "lasers",
    "aeroplanes"
  ];

  let i = 0;
  window.setInterval( () => {
    const $ul = $("ul");
    if ($ul.children().length == 10) {
      // $ul.children() returns a jQuery object containing all the
      // children; we then call `#remove`, which implicitly iterates
      // over the set, removing each of them.
      $ul.children().remove();
    }

    const li = document.createElement("li");
    li.textContent = coolThings[i];
    // jQuery#append is just like HTMLElement#appendChild
    $ul.append(li);

    i = (i + 1) % 3;
  }, 1000);
</script>
```

## Building DOM Elements

In our prior example we used `document.createElement`. This is another
appearance of the low-level DOM API, and jQuery is here to help.
Instead, we could write:

  ```js
    const $li = $("<li></li>");
    // sets the textContent property
    $li.text(coolThings[i]);
    $li.attr("style", "background-color: green");
    $ul.append($li)
  ```

**Note that we are using the same jQuery function a new way**. jQuery
is weird in that the same function, if passed different types of
arguments, will do different things. When we pass `$` a CSS selector,
it searches for elements matching the selector.

When we pass `$` HTML code, somewhere deep down it calls
`document.createElement` for us. It will then build a jQuery object,
and the one item of this set will be the newly created, uninserted
element. Later, this will be appended by `$ul.append($li)`.

This way of building elements is a little shorter to write; it also
allows us to do further manipulation with jQuery as we do above with
the `#text` and `#attr` methods.

## jQuery Getters and Setters

We've seen the `jQuery#attr(name, value)` and `jQuery#text(value)`
setter methods. There is a corresponding `jQuery#val(value)` method to
set the value of an input tag.

A common jQuery idiom is to provide corresponding getters:
`jQuery#attr(name)`, `jQuery#text()` and `jQuery#val()` each return
the current attr/text/val value. Here's an example:

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

<input type="text" id="cool-input">

<script>
  window.setInterval( () => {
    const $coolInput = $("#cool-input");

    if ($coolInput.val() == "racecars") {
      // Reset the input on them!
      $coolInput.val("lasers");
    }
  }, 100);
</script>
```

And another, zanier one:

```html
<script type="text/javascript" src="https://code.jquery.com/jquery-2.1.1.js"></script>

<label>
  <input type="radio" name="duck[favorite_toy]" value="racecars">
  Racecars
</label>

<label>
  <input type="radio" name="duck[favorite_toy]" value="lasers">
  Lasers
</label>

<label>
  <input type="radio" name="duck[favorite_toy]" value="aeroplanes">
  Aeroplanes
</label>


<script>
  window.setInterval( () => {
    const $coolInputs = $("input");

    // unselect any item.
    $coolInputs.prop("checked", false);

    // randomly samples a number 0...3.
    const i = Math.floor(3 * Math.random());

    // Indexing takes us out of jQuery world!
    const coolInput = $coolInputs[i];
    // We can **wrap** an HTMLElement to create a jQuery object with one
    // item; the wrapped element.
    const $coolInput = $(coolInput);
    $coolInput.prop("checked", true);
  }, 200);
</script>
```

Note that we see our **third way to call `$`**: you can pass it an
HTMLElement, and it will create a jQuery object wrapping that one
element. Likewise, we could call `$(nodeList)` to create a jQuery
object wrapping all the elements in the list. We often do this when we
are taken out of the jQuery world and want to get back in.
