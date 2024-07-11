# Sending Form Data With AJAX

This reading shows two ways of submitting form data using AJAX and `fetch`:

1. Manually extracting data from a `form` using basic DOM methods, then sending
   this data as JSON.
2. Extracting data from a `form` using the [`FormData`] API, then sending this
   data in the `multipart/form-data` format.

You will use a variant of the first strategy for most of the React curriculum.
The second strategy is most useful when a `form` contains inputs whose values
cannot be (easily) serialized into a JSON string, e.g., `<input type="file">`.

## Example: New cat form

Suppose you have the following form for creating a new cat:

```html
<form id="cat-form">
  <label for="name-input">Name: </label>
  <input id="name-input" type="text" name="cat[name]">

  <label for="color-input">Color: </label>
  <input id="color-input" type="text" name="cat[color]">

  <button>Create Cat!</button>
</form>
```

Note that the above form does *not* have `action` or `method` attributes. These
are only necessary if you are relying on the browser to generate a request upon
form submission; in this case, you will be creating the request yourself with
`fetch` and preventing the default browser-generated request.

Next, suppose you've added the following `submit` handler, where you intend to
send a `POST /cats` request using `fetch`:

```js
document.getElementById("cat-form").addEventListener("submit", event => {
  event.preventDefault(); // Prevent browser from triggering HTTP request

  // Insert code here to extract cat data from form
 
  fetch("/cats", {
    method: "POST",
    body: /* Insert request body here */,
    headers: {
      "Content-Type": /* Insert content type here */
    }
  });
});
```

## Extract with DOM methods, send as JSON

Let's look at how you could fill in the rest of the `submit` handler if you want
to send a JSON request body:

```js
document.getElementById("cat-form").addEventListener("submit", event => {
  event.preventDefault(); // Prevent browser from triggering HTTP request

  const catData = {
    name: document.getElementById("name-input").value,
    color: document.getElementById("color-input").value
  };
 
  fetch("/cats", {
    method: "POST",
    body: JSON.stringify({ cat: catData }),
    headers: {
      "Content-Type": "application/json"
    }
  });
});
```

Everything here should be familiar by now: you are extracting the values of the
`name` and `color` inputs using DOM methods, creating a plain JavaScript object
containing this data under a top-level key of `cat`, then converting this object
into a JSON string using `JSON.stringify`.

## Extract with the `FormData` API, send as `multipart/form-data`

Let's see how this compares with how you'd implement the rest of the `submit`
handler if you wanted to send a `multipart/form-data` request body:

```js
document.getElementById("cat-form").addEventListener("submit", event => {
  event.preventDefault(); // Prevent browser from triggering HTTP request

  const catData = new FormData(event.target); // the `form` is the event target
 
  fetch("/cats", {
    method: "POST",
    body: catData,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
});
```

Notice that you don't have to manually nest any data under a top-level key of
`cat`. When creating a `FormData` object from a `form` element, the keys in the
request body come from the `name` attributes of each input contained in the
`form`--as with browser-generated requests for form submissions--and these
`name`s provide an outer key of `cat`.

## What you've learned

In this reading, you learned how to grab form data--either manually or by using
the `FormData` API--and submit it using AJAX and `fetch`.

[`FormData`]: https://developer.mozilla.org/en-US/docs/Web/API/FormData
