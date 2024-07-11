# History & Location

## History

`History` is a web API that allows us to manipulate the browser's session history. We can think of the session history as the stack of URLs that a user has visited within a given tab. In client-side javascript, we can access the `History` object by calling `window.history`.

The history interface provides us with a number of methods for manipulating the session history. A few useful methods are `window.history.back()` and `window.history.forward()`. These methods pop and push items onto the session history stack respectively (the equivalent of pushing the back and forward buttons in your browser). Test them out in a browser window!

For more methods, see the [MDN History Documentation][mdn-history].

## Location

`Location` is another web API that allows us to access and manipulate the current URL. In client-side javascript, we can access the `Location` object via `window.location`.

A few useful properties of the `Location` object (test these out in a browser window to see what they return):

* `window.location.href`: this returns a string containing the entire URL. Try setting this to the URL of another site. It should make another `GET` request and navigate the URL.
* `window.location.hash`: this returns a string containing a "#" followed by the "fragment identifier" (the portion of the URL following the #). Try setting `window.location.hash` to any string. This should append a fragment identifier to the URL in the search bar but will not make another `GET` request.

**Note:** With both changes, altering the `locations` will push to the `History` object.

For more methods, check out the [MDN Location Documentation][mdn-location].

### The `hashchange` event

When we alter `window.location.hash`, we fire a special `hashchange` event. We can add a handler for this event and trigger a callback function whenever the hash changes.

Try out the following in your browser's console:

```javascript

> window.addEventListener('hashchange', function () {
  console.log(`The hash is now: ${window.location.hash}`);
});

> window.location.hash = "new-hash";

```

The `hashchange` callback should be triggered!
We aren't doing anything useful on `hashchange` just yet, but soon we'll use it to render different content to our page based on the hash fragment. Cool!

[mdn-history]: https://developer.mozilla.org/en-US/docs/Web/API/History
[mdn-location]: https://developer.mozilla.org/en-US/docs/Web/API/Location
