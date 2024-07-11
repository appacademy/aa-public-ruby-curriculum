# Promises

Promises are a tool for simplifying callbacks to asynchronous functions. Since
the introduction of ES6, they have been included natively in Javascript.

[API Documentation][documentation]

## The Problem

Sometimes we need to chain several asynchronous functions. For example, maybe we
want to get our user's geolocation, then hit an API to `GET` the user's nearest
surf spot, then hit a third API to get the surf conditions for that spot.

```javascript
function getForecastForLocation(){
  locationRequest({
    success: spotRequest({
      success: forecastRequest({
        success: handleSuccess,
        error: handleError
      }),
      error: handleError
    }),
    error: handleError
  });
}
```

We would have to define the success callback of one function to invoke the next,
and each would have to handle its own errors. Nesting callbacks like this can
only lead us to :fire: callback hell :fire: .

## The Solution

With promises, we can write:

```javascript
function getForecastForLocation(){
  locationRequest()
    .then(spotRequest)
    .then(forecastRequest)
    .then(handleSuccess)
    .catch(handleError)
}
```

Let's learn how to do this.

## Functionality and Vocabulary

First, let's define a couple of terms:

  * _action_: the primary function of a promise (i.e., fetch data from an API)

Promises can exist in one of three states:

  * _pending_: The promise has been neither fulfilled nor rejected.
  * _fulfilled_: The promise's action has succeeded.
  * _rejected_: The promise's action has failed.

A promise is considered **settled** when it has either been fulfilled or rejected.

A few notes about functionality before moving on:

  * A promise can only succeed or fail once -- callbacks will not be invoked
  multiple times.
  * A promise cannot change its state from fulfilled to rejected or vice-versa.
  * If a promise has already been settled and a callback is added that matches
  the promise's state, that callback will be invoked immediately.

## Creating a Promise

We can create a new promise using the promise constructor function:

```javascript
const p = new Promise(executor);
```

The constructor function accepts a single `executor` argument, which is a
function that takes two optional parameters: `resolve` and `reject`. Let's
see an example:

```javascript
const p = new Promise((resolve, reject) => {
  if (/* success condition */){
    resolve(/* any args */);
  } else {
    reject(/* any args */);
  }
});
```

## `resolve` and `reject`

`resolve` and `reject` are responsible for telling the promise what arguments to
pass on once the promise has been settled.

```javascript
const request = new Promise(resolve => {  
  setTimeout((msg) => resolve(msg), 1000);
});

const receiveResponse = msg => console.log(msg);

request.then(receiveResponse);
```

`receiveResponse` is the resolve callback, and will be invoked once `setTimeout`
successfully goes off after one second. It receives an argument that will get
passed to the resolve callback, which in this case prints it out.

## then

Promise objects have two important pre-defined methods: `then` and `catch`. Both
`then` and `catch` return **a new promise object**, making them chainable.

`then` accepts two parameters:
  * `onFulfilled`: the function to invoke if the promise is _fulfilled_
  * `onRejected`: the function to invoke if the promise is _rejected_

Essentially, `onFulfilled` is the `resolve` function and `onRejected` is the
`reject` function.

```javascript
p.then(onFulfilled) // onFulfilled *might* run
p.then(onFulfilled, onRejected) // either onFulfilled or onRejected *will* run
```

## catch

`catch` only accepts an `onRejected` parameter. `catch` acts exactly like calling 
`then(null, onRejected)` on a promise.

Consider this:

```javascript
p.then(onFulfilled, onRejected).catch(error)
```

If `p` is rejected, `onRejected` will run. `error` will run if either
`onFulfilled` or `onRejected` are rejected.

Note: `onRejected` simply logging an error message would not trigger `error`, but
it would if it explicitly threw an error. In other words:

```js
const onRejected = err => console.log(err); // fulfilled; would not trigger error

const onRejected = err => throw err; // rejected; would trigger error
```

## Using Promises

While promises can be a little tricky to understand, they are extremely easy to
use. The jQuery `ajax` method allows the use of success callbacks and also returns a
`jqXHR` object, which can be used like a promise. We can avoid passing a callback
to `ajax` by calling `then` on the return value and passing the callback to `then`.

```js
// Passing a callback

const fetchSuccess = cat => console.log(cat);
const fetchError = err => console.log(err);

const fetchCat = (catId, success, error) => (
  $.ajax({
    url: `/cats/${catId}`,
    success,
    error
  })
);

fetchCat(1, fetchSuccess, fetchError);
```

```js
// Using a promise.

const fetchSuccess = cat => console.log(cat);
const fetchError = err => console.log(err);

const fetchCat = catId => $.ajax({ url: `/cats/${catId}` });
// Note the implicit return!

fetchCat(1).then(fetchSuccess).fail(fetchError);
```

Note how we use `fail` instead of `catch`! That's because the `jqXHR` object has a
slightly different set of methods than a standard promise. `then` behaves like
we'd expect, but we use `fail` to handle errors. We also have access to `done`,
which only takes a success callback, and `always`, which runs its callback upon
the promise being settled, no matter what.

Promises really excel at error handling and separating concerns. In the second
example, the `fetchCat` function no longer needs to be involved with or know
about the expected outcome.

## Advanced Topics

We have only covered the very basics of what promises are and how they work. Here
are a few more advanced topics and links for more info:

* [Implicit rejection][so]: promises can be implicitly rejected if the
constructor function throws an error.
* [Promise.all][all]: Accepts an array of promises, and creates a single promise
that only gets fulfilled if every promise in the array fulfilled.
* A [polyfill][polyfill] is required for consistent functionality across older
browsers.

Also, check out this [really well-written article][rwwa].

[callback-hell]: http://callbackhell.com
[documentation]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[so]: http://stackoverflow.com/questions/28703241/promise-constructor-with-reject-call-vs-throwing-error
[all]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
[polyfill]: https://github.com/stefanpenner/es6-promise
[rwwa]: http://www.html5rocks.com/en/tutorials/es6/promises/
