# Promises

A [`Promise`][documentation] is an object that represents or wraps an
**asynchronous operation** and its eventual **result**.

Unlike classic asynchronous functions, Promise-based asynchronous functions do
not take a completion callback as an argument. Instead, they return a `Promise`,
a special object on which you can invoke the method [`then()`] with a success
callback as well as an optional failure callback.

```js
// Callback-based (`completionCallback` handles both success and failure)
asyncFunction(completionCallback);

// Promise-based
const promise = asyncFunction();
promise.then(successCallback, failureCallback);

// Promise-based, without saving the Promise to an intermediate variable
asyncFunction().then(successCallback, failureCallback);
```

Promises exist in one of three states:

- *pending*: The asynchronous operation has not yet completed.
- *fulfilled*: The asynchronous operation has succeeded.
- *rejected*: The asynchronous operation has failed.

A Promise is considered *settled* when it has either been fulfilled or
rejected. Once settled, it will contain a result value, and the relevant
completion callback(s) you've supplied via `then()` will be invoked with that
result value--success callback(s) if the Promise is fulfilled, failure
callback(s) if the Promise is rejected.

> **Note:** If you invoke `then()` on a Promise after it has settled, the
> provided success / failure callback will be invoked immediately.

## Example: Readline's callback-based vs Promise-based `question()`

The [Readline] module's `question()` function is an example of an asynchronous
function that takes a completion callback:

```js
const readline = require("readline");
const { stdin, stdout } = require("process");
const rl = readline.createInterface({ input: stdin, output: stdout });

rl.question("What's your name? ", (name) => console.log(`Hi, ${name}!`));
```

In the above code, `rl.question()` triggers an asynchronous operation: waiting
for user input in the terminal. When the operation completes--i.e., the user
hits `Enter`--the callback provided as a second argument is invoked, with the
input as an argument.

As of Node 17, there is also a Promise-based version of Readline. Here's how you
would implement the above functionality using the Promise-based Readline:

```js
const readlinePromises = require('readline/promises');
const { stdin, stdout } = require("process");
const rl = readlinePromises.createInterface({ input: stdin, output: stdout });

const questionPromise = rl.question("What's your name? ");
questionPromise.then((name) => console.log(`Hi, ${name}!`));
```

`questionPromise` is an object that represents the asynchronous operation of
waiting for user input. When the operation successfully completes, the resulting
user input will be stored in `questionPromise` and passed to the success
callback provided to `then()`.

## Why Promises?

In the Readline example above, the Promise-based approach does not substantially
differ from the callback-based approach, apart from syntax. However, there are
numerous benefits to Promises that arise in more complex cases; let's look at a
couple of them.

### Separation of concerns

When using callback-based asynchronous functions, you must invoke the
asynchronous function and define the callback handling its result at the same
time. With Promises, you can separate these concerns, allowing you to write more
modular and reusable code.

In the example below, `meet` and `greet` both perform the same asynchronous
operation of asking for the user's name. However, they differ in how they handle
the result value (the user input). Because Promise-based asynchronous functions
don't require you to provide a completion callback immediately, the shared
asynchronous operation can be extracted into its own helper method, `askName`:

```js
// ... imports
const rl = readlinePromises.createInterface({ input: stdin, output: stdout });

function askName() {
  return rl.question("What's your name? ");
}

function meet() {
  askName().then((name) => console.log(`Good to meet you, ${name}!`));
}

function greet() {
  askName().then((name) => console.log(`Hey ${name}!`));
}
```

### Chaining Promises

`then()` itself returns a Promise, upon which you can chain an additional call
to `then()` (and then an additional call, and so on).

The status and (eventual) result of the Promise returned by `then()` depends on
what happens in the invoked completion callback.

|     | If `then()` callback...     | Returned Promise status           | Returned Promise value            |
| --- | --------------------------- | --------------------------------- | --------------------------------- |
| 1   | Returns a non-Promise value | `fulfilled`                       | Callback's return value           |
| 2   | Returns a Promise           | Same as returned Promise          | Same as returned Promise          |
| 3   | Is not supplied             | Same as previous Promise in chain | Same as previous Promise in chain |
| 4   | Throws an Error             | `rejected`                        | The Error object                  |

Let's look at these different cases in more detail.

> **Note:** There will be annotations above some Promises--returned either by an
> asynchronous function or `then()`--in the following examples. These
> annotations show each Promise's status and result, using the format `<status>:
> <result>`. If a Promise begins as `pending`, then the annotation will use the
> format: `pending => (<asynchronous operation>) => <status>: <result>`.

#### Case 1: Callback returns a non-Promise value

This case gives you the ability to easily access the return value of a `then()`
callback:

```js
function getName() {
  // pending => (user enters 'sennacy') => fulfilled: 'sennacy'
  return rl.question("What's your name? ") 
    // fulfilled: 'SENNACY'
    .then((name) => name.toUpperCase());
}

// 'SENNACY' is logged
getName().then((upperCaseName) => console.log(upperCaseName));
```

#### Case 2: Callback returns a Promise

This is one of the most useful cases, allowing you to chain multiple
asynchronous operations, each operation beginning only after the previous has
completed.

Instead of creating a nested call to `then`:

```js
// pending => (user enters 'sennacy') => fulfilled: 'sennacy'
rl.question("What's your name? ") 
  .then((name) => {
    // pending => (user enters 'turquoise') => fulfilled: 'turquoise'
    rl.question(`Hi, ${name}! What's your favorite color?`)) 
      .then((color) => console.log(`I love ${color}!`));
  });
```

You can instead add a chained call to `then()`:

```js
// pending => (user enters 'sennacy') => fulfilled: 'sennacy'
rl.question("What's your name? ") 
  // pending => (user enters 'turquoise') => fulfilled: 'turquoise'
  .then((name) => rl.question(`Hi, ${name}! What's your favorite color?`)) 
  .then((color) => console.log(`I love ${color}!`));
```

This provides a huge advantage over callback-based asynchronous functions. If
you wanted to create a sequence of asynchronous operations before, you'd need to
create ever more nested callbacks. Consider this survey of 5 questions, where
each question must be answered before the next is asked, implemented with the
callback-based Readline library:

```js
// ... imports
const rl = readline.createInterface({ input: stdin, output: stdout });
let responses = [];

rl.question("What is the answer to **1**? ", (answer1) => {
  responses.push(answer1);
  rl.question("What is the answer to **2**? ", (answer2) => {
    responses.push(answer2);
    rl.question("What is the answer to **3**? ", (answer3) => {
      responses.push(answer3);
      rl.question("What is the answer to **4**? ", (answer4) => {
        responses.push(answer4);
        rl.question("What is the answer to **5**? ", (answer5) => {
          responses.push(answer5);
        });
      });
    });
  });
});
```

Now, compare that to the same survey implemented with the Promise-based Readline
library:

```js
// ... imports
const rl = readlinePromises.createInterface({ input: stdin, output: stdout });
let responses = [];

rl.question("What is the answer to **1**? ") 
  .then((answer1) => {
    responses.push(answer1);
    return rl.question("What is the answer to **2**? ");
  })
  .then((answer2) => {
    responses.push(answer2);
    return rl.question("What is the answer to **3**? ");
  })
  .then((answer3) => {
    responses.push(answer3);
    return rl.question("What is the answer to **4**? ");
  })
  .then((answer4) => {
    responses.push(answer4);
    return rl.question("What is the answer to **5**? ");
  })
  .then((answer5) => {
    responses.push(answer5);
  });
```

While the Promise-based version has a few more lines of code, it is much easier
to format and read!

#### Case 3: Callback is not supplied

This would occur, for example, if you call `then()` on a rejected Promise but
only provide a success callback and not a failure callback.

In that case, `then()` returns an identical Promise to the (rejected) one it was
called on.

This allows you to create a chain of `then()` calls that are only provided
success callbacks. If at any point in the chain, one of the Promises is
rejected, each subsequent `then()` returns that same rejected Promise until you
reach a `then()` that has a failure callback.

You can thus handle an error at any point in a Promise chain with a single
failure callback at the end of the chain:

```js
// pending => (network failure while loading image) => rejected: Network Error
loadImage("sennacy") 
  // rejected: Network Error (processImage is not invoked)
  .then(processImage)
  // rejected: Network Error (resizeImage is not invoked)
  .then(resizeImage)
  // rejected: Network Error (addImageToDOM is not invoked)
  .then(addImageToDOM)
  .then(null, (error) => console.log(error)); // will log the Network Error
```

Since this is such a common pattern, the Promise API provides a convenience
method, [`catch(failureCallback)`][catch], which is the same as calling
`then(null, failureCallback)`.

The above example could thus be rewritten as so:

```js
// pending => (network failure while loading image) => rejected: Network Error
loadImage("sennacy") 
  .then(processImage) // processImage is not invoked
  .then(resizeImage) // resizeImage is not invoked
  .then(addImageToDOM) // addImageToDOM is not invoked
  .catch((error) => console.error(error)); // will log the Network Error
```

#### Case 4: Callback throws an Error

You can break from a Promise chain by throwing an Error in a `then()` callback.
This will cause `then()` to return a rejected Promise, allowing you to utilize
the pattern shown in Case 3 to essentially skip to the next failure callback.

```js
// pending => (user enters 'fake_image') => fulfilled: 'fake_image'
rl.question("Which image would you like to load? ") 
  // rejected: Error('Fake image!')
  .then((imageName) => {
    if (isRealImage(imageName)) { // returns false
      return loadImage(imageName);
    } else {
      throw new Error("Fake image!");
    }
  })
  .then(processImage) // processImage is not invoked
  .then(resizeImage) // resizeImage is not invoked
  .then(addImageToDOM) // addImageToDOM is not invoked
  .catch((error) => console.error(error)); // will log Error('Fake image!')
```

### Handling concurrent Promises with `Promise.all`

The Promise API also provides class methods to handle concurrent Promises--i.e.,
Promises that are initialized at the same time and whose asynchronous operations
thus run in parallel.

One of the most useful is [`Promise.all`], which accepts an Array (or other
iterable) of Promises, and returns a single Promise that:

- fulfills once **every** input Promise resolves, with the result being an Array
  of the input Promises' result values
- rejects once **any** input Promise rejects, with the result being the rejected
  Promise's result

One use case for `Promise.all` is to fetch multiple resources at the same time
and then do something once all of them have loaded:

```js
let loadA = loadImage('a');
let loadB = loadImage('b');

Promise.all([loadA, loadB])
  .then(
    ([imageA, imageB]) => renderImages(imageA, imageB), // once both images load
    (error) => console.log(error) // once either image fails to load
  );
```

## Manually creating a Promise

Usually, you'll interact with Promises returned by Promise-based asynchronous
functions. However, you can also create a Promise manually by using the [Promise
constructor][constructor]:

```js
const customPromise = new Promise((resolve, reject) => {
  // perform asynchronous operation
  // call resolve(result) after the operation completes successfully 
  // call reject(result) if the operation fails at any point
});
```

The constructor function accepts a single `executor` argument, which is a
function that takes two callbacks as arguments: `resolve` and `reject`. When you
create a new Promise, the `executor` is invoked **immediately**.

Typically, the executor will perform some asynchronous task(s). When the
asynchronous task completes successfully, the `executor` will invoke `resolve`.
This will change the status of the Promise to `fulfilled`. If the task fails,
the executor will invoke `reject`. This will change the status of the Promise to
`rejected`. The argument provided to `resolve` or `reject` becomes the Promise's
result value.

> **Note:** Once a Promise resolves or rejects, its status cannot change. Thus,
> if the executor invokes `reject` after already invoking `resolve`, or vice
> versa, this second invocation will be ignored.

Creating custom Promises is most useful when you would like to create a
Promise-based version of a callback-based asynchronous function.

Here is an example for how to create a Promise-based version of `setTimeout`:

```js
function setPromiseTimeout(delay) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), delay);
  })
}

const oneSecondTimeout = setPromiseTimeout(1000);
oneSecondTimeout.then(() => console.log("It's been 1 second!"));
```

## Conclusion

While Promises can be confusing at first, you will become much more comfortable
with them the more you use them. Then it will be hard to go back to
old-fashioned asynchronous functions!

While this reading covers the fundamentals of Promises, check out the MDN
[documentation] on Promises to learn about more instance and class methods, and
read the [MDN guide][guide] for a more in-depth discussion.

[documentation]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[Readline]: https://nodejs.org/api/readline.html
[`then()`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
[catch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
[constructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise
[`Promise.all`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
[guide]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises
