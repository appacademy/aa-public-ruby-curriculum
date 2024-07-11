# Basic AJAX

*Asynchronous JavaScript And XML*, or AJAX, refers to the technique of
generating background HTTP requests using JavaScript, to which the server
responds with data rather than presentational content like HTML; this data is
then used to update the DOM without ever blocking page interactivity or causing
the page to reload.

The *XML* in the name is a bit antiquated; XML was the most popular format for
data responses when AJAX [first gained popularity][ajax-origins] in the
mid-2000s. Today, however, data responses are typically formatted as
[JSON][json].

By the end of this reading, you should be able to explain, not only what AJAX is
(see above), but also

* Why AJAX is useful
* How to implement it using `fetch`
* How to handle the Promises that `fetch` returns

## Motivation

As you know, submitting a form sends an HTTP request to the server. A successful
response typically redirects the browser to another page. For example, if you're
on `/posts/new` and submit a form to create a new post, you might be redirected
to the new post's show page, `/posts/123`. The browser then makes a `GET` request
for this new page, receives an HTML document back from the server, and
reconstructs the DOM for this new HTML.

At times, though, you might not need to redirect to a new page after submitting
a form. Suppose you are on a post's show page, `/posts/123`, and on this page
there is a button to `favorite` the post. Suppose this button is contained in a
`form` which triggers a `POST /posts/123/favorites` request.

Rather than redirect you to a new page, the server would likely re-render the
post show page. The newly rendered page would be nearly identical to the
previous page; perhaps the `Favorite` button would now be greyed out or replaced
with an `Unfavorite` button. Yet the browser would still fully reload the page,
which is inefficient and disruptive to the user experience.

With AJAX, this is unnecessary. Rather than put the `Favorite` button in a
`form`, you could instead attach a JavaScript click handler to the button. When
the button was clicked, the handler would trigger a `POST /posts/123/favorites`
request in the background using AJAX.

The server could then respond with JSON data containing the post's updated
`favorite` status. Your JavaScript could finally update the `Favorite` button to
be greyed out using DOM manipulation, all without ever interrupting the user
experience or causing the page to reload.

## `fetch`

AJAX functionality is built-in to the browser via the [Fetch API][fetch]. To
trigger an AJAX request, simply call the `fetch()` function. The first argument
`fetch()` expects is a URL path; this is required. The optional second argument
is an object that enables you to configure the details of the request, such as
the HTTP verb to use, headers to include, and data to attach as the request
body. If you don't specify an HTTP verb, `fetch()` will default to using `GET`.

This is how you can trigger a `GET /posts/123` request with `fetch()`:

```js
fetch("/posts/123");
```

Let's consider a more complicated example: you want to trigger a `POST /posts`
request to create a new post. This request should contain data for the new post.

Regardless of the complexity of a request, the first argument to `fetch` is
always the request path--in this case, `/posts`:

```js
const newPost = { content: "What a pleasant day!" };
fetch("/posts");
```

You'll configure everything else about the request, including providing a
request body, in the options argument to `fetch`.

First, you'll want to set the HTTP method to `POST`, instead of the default
`GET`. You can do so by setting the `method` property of the options argument:

```js
const newPost = { content: "What a pleasant day!" };
fetch("/posts", {
  method: "POST"
});
```

Second, you'll want to provide the `newPost` in the request body under a
top-level key of `post`. You can provide this data under the key of `body` in
the options argument. Typically, you'll provide a JSON string as a request body
in AJAX requests. To convert a JavaScript object to a JSON string, use
[`JSON.stringify`][stringify]:

```js
const newPost = { content: "What a pleasant day!" };
fetch("/posts", {
  method: "POST",
  body: JSON.stringify({ post: newPost })
});
```

Finally, you'll want to give a heads up to your backend that the request body is
formatted as JSON. To do so, you must set the `Content-Type` header to
`application/json`. You can set headers by providing an object to the `headers`
key of the options argument:

```js
const newPost = { content: "What a pleasant day!" };
fetch("/posts", {
  method: "POST",
  body: JSON.stringify(newPost),
  headers: {
    "Content-Type": "application/json"
  }
});
```

## Responses to `fetch` requests

`fetch()` returns a Promise which resolves with a [`Response`] object. This
object contains a lot of information about the response. Usually, you'll want to
retrieve the response body.

To parse the response body as JSON, use the [`json()`] method. This also returns
a Promise, the result of which is a JavaScript object parsed from the JSON
response.

Suppose that your backend provides the following JSON response to `GET
/posts/123`:

```js
{
  "id": 123,
  "content": "Hello world!"
}
```

`fetch` will return this response body wrapped in a Promise. To access the
actual response, you will accordingly need to process the returned Promise by
chaining some `.then`s onto it, e.g.:

```js
fetch("/posts/123")
  .then(response => response.json())
  .then(post => console.log(post)); // => { id: 123, content: "Hello world!" }
```

This of course assumes that your backend response was successful, i.e., that the
response had a 200-level status code.

Before calling `json()` on a Response, especially if you anticipate a potential
400-level status, you should check the status of the Response. You can do so
by checking the boolean [`Response.ok`], which returns `true` if the Response
has a 200-level status code and `false` otherwise:

```js
fetch("/posts/123")
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw response;
    }
  })
  .then(post => console.log(post))
  .catch(errorResponse => console.error(errorResponse));
```

## What you've learned

In this reading, you learned that AJAX is a technique for acquiring data from a
server through background HTTP requests to create a better user experience on
the frontend. You then learned how to make AJAX calls by using `fetch` and
handling the resulting Promises appropriately.

[ajax-origins]: https://immagic.com/eLibrary/ARCHIVES/GENERAL/ADTVPATH/A050218G.pdf
[json]: https://developer.mozilla.org/en-US/docs/Glossary/JSON
[fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[`Response`]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[`json()`]: https://developer.mozilla.org/en-US/docs/Web/API/Response/json
[stringify]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
[`Response.ok`]: https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
