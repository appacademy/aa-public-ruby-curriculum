# Intro to Callbacks: File I/O

## What is a callback?

A callback is a function that is passed to another function and intended to be
called at a later time. The most common use of callbacks is when executing
asynchronous requests such as getting user input or requesting data over a
network.


Consider this example that uses the `setTimeout` method:

```javascript
// wait 2000 milliseconds and then print 'hello':
window.setTimeout(function () {
  console.log('hello');
}, 2000);
```

`setTimeout` receives two arguments: the callback and the interval. Here the
callback prints 'hello'. The `setTimeout` method holds on to the function, and
calls it after 2000 milliseconds. The callback is essential here, because
`setTimeout` needs to know what do at the end of the timeout.


## Callbacks and closures
The above function passes a **callback** to `setTimeout`. In this case, the
callback is not a **closure**, since it uses no outside variables. That's
because we've hard-coded the string 'hello'. Let's see an example that
illustrates why closures are so commonly used as callbacks:

```javascript
function scheduleGreatMovieReminder(movie) {
  // remind in one min
  window.setTimeout(function () {
    console.log(`Remember to watch: ${movie}`);
  }, 60 * 1000);
  console.log(`Timer set for ${movie}`);
}

scheduleGreatMovieReminder("Citizen Kane");
scheduleGreatMovieReminder("Touch of Evil");
scheduleGreatMovieReminder("The Third Man");
```

Run the above code in your browser console and observe the timing of the
outputs.

## JavaScript is Asynchronous

In Ruby programming, most of the methods we wrote are **not** like `setTimeout`.
`setTimeout` sets a timer in the background and then immediately returns, long
before the callback is actually invoked.

`setTimeout` is called **asynchronous**. An asynchronous function does not wait
for work to be completed. It schedules work to be done in the background.
Asynchronous functions tend to be used when work may take a variable amount of
time. Though newer asynchronous functions often use ES6 [`Promise`]s (you'll
learn more about those later), many other asynchronous functions, including
`setTimeout`, take in callbacks which will be executed after the background work
is completed. Examples include:

* Timers
    * Waits a specified amount of time.
* Background web requests (AJAX)
    * Makes a possibly slow connection to a server that may live far
      away.
    * Will pass the fetched data to the callback when the response
      eventually comes in.
* Events
    * Example: there's a button on the page. We want to run a function
      when the user clicks it.
    * This is called a **click event**.
    * We **install** a **click handler**. A click handler is a
      callback that is invoked when a click occurs.
    * We don't know how long it will be before the click happens, but
      if and when a click actually occurs, the callback will have been
      stored and will be run.

The opposite of asynchronous is **synchronous**. For example, a synchronous
analogue to `setTimeout` would be Ruby's `sleep` method. `sleep` pauses
execution for a specified period of time. Likewise, if AJAX requests were
synchronous, your code would pause and wait for an HTTP response before
continuing execution.

## Node I/O is Async

Ruby has the methods `puts` and `gets`. JavaScript has `console.log` as an
analogue to `puts`, but it doesn't have an exact analogue for `gets`.

In a web browser, you may use the `prompt` method to pop up a message box to ask
for input from the user. When running server-side code in the Node.js
environment, `prompt` is not available (because node is not a graphical
environment).

Instead, you must use the `readline` library when writing server-side Node.js
programs. Here's the [documentation][readline-doc].

Here's a simple example:

```javascript
// readline_demo.js

const readline = require('readline');

const reader = readline.createInterface({
  // it's okay if this part is magic; it just says that we want to
  // 1. output the prompt to the standard output (console)
  // 2. read input from the standard input (again, console)

  input: process.stdin,
  output: process.stdout
});

reader.question("What is your name?", function (answer) {
  console.log(`Hello ${answer}!`);
});

console.log("Last program line");
```

**NB:** Do not try to execute this code in the Node REPL. Just copy it into a
file and run it with `node readline_demo.js`.

The `question` method takes a prompt (`"What is your name?"`) and a callback. It
will print the prompt, and then ask Node.js to read a line from stdin.
`question` is asynchronous; it will not wait for the input to be read, it
returns immediately. When Node.js has received the input from the user, it will
call the callback we passed to `reader.question`.

Let's see this in action:

```
$ node readline_demo.js
What is your name?
Last program line
Ned
Hello Ned!
```

Notice that because `reader.question` returns immediately and does not wait, it
prints `"Last program line"` before you get a chance to write anything. Notice
also that the code doesn't try to save or use the return value of
`reader.question`: that's because this method does not return anything.
`reader.question` cannot return the input, because the function returns before I
have actually typed in any input. **Asynchronous functions do not return
meaningful values: we give them a callback so that the result of the async
operation can be communicated back to us**.

One final note: note that our program didn't end when it hit the end of the
code. It patiently waited for our input. That's because Node understands that
there is an outstanding request for user input. Node knows that the program may
not be done yet: anything could happen in response to that input. So for that
reason, Node doesn't terminate the program just because we hit the end of the
source file.  If we want to stop accepting input, we have to explicitly call
`reader.close()`:

```javascript
const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

reader.question("What is your name?", function (answer) {
  console.log(`Hello ${answer}!`);

  // Close the reader, which will allow the program to end because it
  // is no longer waiting for any events.
  reader.close();
});

console.log("Last program line");
```

## Example #1

Let's see a more developed example:

```javascript
const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addTwoNumbers(callback) {
  // Notice how nowhere do I return anything here! You never return in
  // async code. Since the caller will not wait for the result, you
  // can't return anything to them.

  reader.question("Enter #1: ", function (numString1) {
    reader.question("Enter #2: ", function (numString2) {
      const num1 = parseInt(numString1);
      const num2 = parseInt(numString2);

      callback(num1 + num2);
    });
  });
}

addTwoNumbers(function (result) {
  console.log(`The result is: ${result}`);
  reader.close();
});
```

Notice the use of closures and callbacks:

1. `function (numString1) { ...`'s closure scope includes the
   `callback` variable. `numString1` is a regular argument.
2. `function (numString2) { ...`'s closure scope includes the
   `numString1` variable, as well as `callback`
   recursively. `numString2` is a regular argument.
3. `function (result) { ...`'s closure scope includes
   `reader`. `result` is a regular argument.

Note: `callback` is not a Javascript keyword. It is simply the name of the
function we are passing to `addTwoNumbers` as a callback.

## Example #2

Let's write a silly method, called `absurdTimes`:

```javascript
function absurdTimes(numTimes, fn) {
  let i = 0;

  function loopStep() {
    if (i == numTimes) {
      // we're done, stop looping
      return;
    }

    fn();

    i++;
    // recursively call loopStep
    loopStep();
  }

  loopStep();
}
```

Notice how this loops in a weird way. Of course, this is an absurd way to
implement `times`, and you wouldn't do this normally. But we're going to build
on this in a moment...

## Example #3

When we need to do a loop in code that is asynchronous, we can modify the trick
from above:

```javascript
const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function absurdTimesAsync (numTimes, fnAsync, completionFn) {
  let i = 0;

  function loopStep () {
    if (i == numTimes) {
      // we're done, stop looping
      completionFn();
      return;
    }

    i++;

    // fnAsync is an asynchronous function that takes a callback (in this case loopStep)
    fnAsync(loopStep);
  }

  loopStep();
}

function addTwoNumbersAsync(callback) {
  reader.question("Enter #1: ", function (numString1) {
    reader.question("Enter #2: ", function (numString2) {
      const num1 = parseInt(numString1);
      const num2 = parseInt(numString2);

      callback(num1 + num2);
    });
  });
}

let totalSum = 0;

function addTwoNumbersAndIncrementAsync(callback) {
  addTwoNumbersAsync(function (result) {
    totalSum += result;

    console.log(`Sum: ${result}`);
    console.log(`Total Sum: ${totalSum}`);

    callback();
  });
}

function outputResultAndCloseReader () {
  console.log(`All done! Total Sum: ${totalSum}`);
  reader.close();
}

absurdTimesAsync(3, addTwoNumbersAndIncrementAsync, outputResultAndCloseReader);
```

A normal times method like so would not work:

```javascript
function times(times, fn) {
  for (let i = 0; i < times; i++) {
    fn();
  }
}
```

If `fn` is asynchronous, it will return immediately, even though its work is not
done. By passing a callback (`loopStep`) as the callback to `fn` (as we do in
`absurdTimes`), `fn` can call `loopStep` **after `fn`'s work is completed**.

We also added an argument, `completionFn` so that we could call code when all
the iterations are completed. We use this to print the total sum a final time
and close the reader so the program can end.

[`Promise`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[readline-doc]: http://nodejs.org/api/readline.html
