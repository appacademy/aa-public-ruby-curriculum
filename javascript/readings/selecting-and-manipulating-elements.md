# DOM Manipulation

You've seen that the DOM is represented by a tree of JavaScript objects. You can
use properties and functions defined on these objects to make changes to your
DOM with JavaScript alone!

## Selecting elements

There are a few ways to select an element:

- `document.getElementById(selector)`
  - Returns a single [`HTMLElement`][html-element] matching the id.
- `document.getElementsByClassName(selector)`
  - Returns a **live** Array-like object of type
    [`HTMLCollection`][html-collection] that contains all `HTMLElement`s
    matching the class name.
- `document.querySelector(selector)`
  - Returns a single `HTMLElement` that is the first to match the CSS selector.
- `document.querySelectorAll(selector)`
  - Returns a *static* Array-like object of type [`NodeList`][node-list] of
    `HTMLElement`s matching the CSS selector.

## Traversal

The DOM is a tree of [`Node`][node] objects, each with a parent and any number
of children. Sound familiar? Yes, the Polytree Node project! You can find the
parent and children of a particular `Node` with the following methods:

- `Node#parentNode` / `Node#parentElement`
  - These can usually be used interchangeably to return the parent of the
    specified `Node`.
- `Node#childNodes`
  - Returns a `NodeList` of all children of the current `Node`, including `Text`
    and `Comment` Nodes.
- `Element#children`
  - Returns an `HTMLCollection` of all child `Element`s of the current
    `Element`, not including other types of `Node` like `Text` or `Comment`
    nodes.

## Inserting and removing elements and content

Navigating the DOM through selected `Node`s can be somewhat useful, but becomes more powerful when you can
actually affect those `Node`s with your JavaScript. With Vanilla JavaScript
alone, you can add content (including other elements) to a selected `Node`.

```html
<div>
  <ul id="play-list">
    <li>The Importance of Being Earnest</li>
    <li>Hamilton</li>
    <li>As You Like It</li>
  </ul>
  <li>My Fair Lady</li>
  <ol id="delete-me"></ol>
</div>

<script>
  // `querySelector` returns the FIRST element to match the css selector.
  const ul = document.querySelector("ul");
  // This is the first element that is a child of the ul (the first li).
  const firstLi = ul.children[0];
  // `querySelector` and `querySelectorAll` can utilize complex CSS selectors.
  const lastPlay = document.querySelector("div > li");

  // Adds this text after the current contents of the li.
  firstLi.append(" - Oscar Wilde")

  // Append the lastPlay li to the end of the ul.
  // Append moves elements that are already on the page rather than duplicating 
  // them.
  ul.append(lastPlay)

  // Find the element with the id "ordered" and remove it from the DOM
  document.getElementById("delete-me").remove()
</script>
```

At the end of the execution of this script, the first `li` on the page will
contain the text "The Importance of Being Earnest - Oscar Wilde", the ordered
list will not be present, and the `li` of "My Fair Lady" will be the final
element inside the `ul` instead of in its original location.

[`Node#appendChild`][append-child] works similarly to
[`Element#append`][append]. `appendChild` will only accept an argument that is a type of
`Node`, however, whereas you can `append` with a string as well. `appendChild`
can also only take one argument, whereas `append` can append multiple `Node`s
or strings at once.

There are other functions that also append to elements or alter the HTML of
elements. Make sure to check out the [`Element`][element] docs to look for more options!

## Changing attributes

```html
<button id="importance">The Importance of Being Earnest</button>

<script>
  const el = document.getElementById("importance")

  // Set the 'name' attribute of the element to the button's text.
  el.setAttribute("name", el.innerText)

  // Setting the title sets the text that appears when you hover over the
  // element.
  el.title = "Oscar Wilde - 1895"
  el.style.border = "3px dashed red"

  // prints "importance" to the console
  console.log(el.id)
</script>
```

In addition to changing the content of elements, JavaScript also lets you view
and change [attributes][attributes] for those elements. Generically, that can be
done with `Element#getAttribute` and `Element#setAttribute`.

You'll commonly use JavaScript to change the class of an object at some point
after initially rendering the DOM, allowing you to make easy CSS changes.
Because class changes are so frequent, JavaScript has the
[`Element#classList`][class-list] available to use and modify, giving you access
to methods for common interactions with classes like `#add`, `#remove`, and
`#toggle`. The `classList` separates out the space-separated classes into
individual items, so using these methods will allow you to target a single class
regardless of the other classes the `Element` may have.

`HTMLElements` also have properties that can be viewed or set more semantically
and conveniently than `setAttribute`. The example above uses `title` and
`style`, but there are many more. The ones available to a particular element
depend on the type of tag you are using. Look to the [`Element`][element] and
[`HTMLElement`][html-element] docs, as well as those of the specific [tag
type][button] you want to use to see what is available.

## Building DOM elements

The previous examples used `Element#append` to move existing elements around the
DOM. New DOM elements can also be created fully in JavaScript! Create a new DOM
element with [`document.createElement`][create-element], passing in a string of
the type of tag that you want to create.

```html
<div>
  <ul>
  </ul>
</div>

<script>
  const ul = document.querySelector("ul");
  const newItems = [
    "The Importance of Being Earnest",
    "Hamilton",
    "As You Like It"
  ]
  newItems.forEach( (play) => {
    const li = document.createElement("li");
    li.append(play);
    if (play === "Hamilton") {
      li.classList.add("modern");
    }
    ul.appendChild(li);
  })
</script>

```

While iterating over an array of strings you want to make into list items, you
first create a new element with no attributes or content. Then you append
content (in this case, text) to these empty elements. If the play is "Hamilton",
you also give the new element the class "modern". Finally, you add the newly
created `li` to the `ul`.

[html-element]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
[html-collection]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection
[node-list]: https://developer.mozilla.org/en-US/docs/Web/API/NodeList
[node]: https://developer.mozilla.org/en-US/docs/Web/API/Node
[append]: https://developer.mozilla.org/en-US/docs/Web/API/Element/append
[append-child]: https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
[element]: https://developer.mozilla.org/en-US/docs/Web/API/Element
[attributes]: https://www.w3schools.com/tags/ref_attributes.asp
[class-list]: https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
[button]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement
[create-element]: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
