# `async` & `await`

To this point, you have used a series of `.then` clauses whenever you needed to
handle the Promises returned from asynchronous function calls in a sequential
manner. In this reading, you will learn a cleaner syntax for handling Promises
that was introduced in ES2017: `async` and `await`.

## Handling Promises with `.then`

Recall this code from the reading on Promises:

```js
import * as readlinePromises from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const rl = readlinePromises.createInterface({ input, output });
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
  })
  .then(() => {
    rl.close();
    console.log(responses);
  });
```

> Note: This Promise-based version of the `readline` library requires Node 17 or
> later.

This code uses the `question` function from the `readline` library to get a
user's responses to five questions. Because `question` is necessarily
asynchronous--it has to wait for user input--each subsequent question had to be
wrapped in a `.then` so that it would not be asked before the previous
question had been answered.

For reasons detailed in the Promises reading, this Promised-based approach
represents a definite improvement on the callback-based version of the same
code. Nevertheless, while Promises do enable a nice, parallel structure, having
to wrap everything in a `.then` is still a bit clunky and significantly
lengthens the code. Is there a cleaner way to achieve the same goal? There is:
`async` and `await`.

## `async` and `await`

`async` and `await` are essentially syntactic sugar that enable you to write
more readable Promise-based code. In short, the keyword `async` designates a
function as asynchronous and Promise-returning; `await` is then used within
`async`-designated functions to pause internal execution until a Promise
resolves.

An `async` designated function will proceed synchronously until it hits an
`await`, at which point it will return a Promise with a state of `pending` and
cede control back to the code that called it. Once the statement that was being
`await`ed resolves, the `async` function will resume executing code in a
synchronous manner until it either hits another `await` (and cedes control
again) or arrives at its final return value, in which case it will resolve the
Promise it initially returned.

`await` thus serves the same purpose as a `.then` clause, assuring the
sequential execution of asynchronous calls. For instance, you could rewrite the
`.then` clauses in the question code above using `await` like so:

```js
// imports

const rl = readlinePromises.createInterface({ input, output });
let answer, responses = [];

answer = await rl.question("What is the answer to **1**? "); 
responses.push(answer);
answer = await rl.question("What is the answer to **2**? ");
responses.push(answer);
// and so on...
```

The line

```js
answer = await rl.question("What is the answer to **1**? ");
```

essentially tells the code to stop executing (i.e., `await`) until the Promise
`rl.question` returns is resolved. Once that Promise resolves, the returned
value--not the Promise--will be assigned to `answer` and the code will resume
synchronous execution, pushing `answer` into `responses` and then calling
`rl.question` a second time. At this point, the `await` causes execution to
pause again until the answer from question 2 resolves. And so on.

This cleaner, more concise syntax of `await` is also more flexible than the
`.then` syntax. Notice how repetitious the code has become; with `await`, you
can clean that up like this:

```js
// imports

const rl = readlinePromises.createInterface({ input, output });
let answer, count = 1, responses = [];

while (count <= 5) {
  answer = await rl.question(`What is the answer to **${count++}**? `);
  responses.push(answer);
}

rl.close();
console.log(responses);
```

Much DRYer! Now, what if you wanted to make this into a function so you could
call it whenever you needed to ask a series of questions? If you just wrap the
code in a function declaration like this:

```js
function getAnswers(questions) {
  // ...
  while (count < questions.length) {
    answer = await rl.question(questions[count++]);
    responses.push(answer);
  }
  // ...
}
```

and try to run it, you will get a `SyntaxError` because `await` is an
`Unexpected reserved word`. The problem is that `await` only works in functions
designated as `async` (and in a few top-level situations like the initial code
above; more on that in a minute). To make this function work, you would
accordingly need to declare it with the `async` keyword:

```js
async function getAnswers(questions) {
  // ...
  while (count < questions.length) {
    answer = await rl.question(questions[count++]);
    responses.push(answer);
  }
  // ...
}
```

Now it will work! You can also use `async` with fat-arrow functions like this:

```js
const getAnswers = async questions => {
  // code with `await`
};
```

But wait, why will `await` work in the initial code above? It will work because
top-level `await`--i.e., an `await` outside an `async` (or other) function--has
actually been implemented, but only for modules and for REPLs like Node.js and
your Chrome DevTools (which can help with debugging in the console!). `await`
will work in the case above because that code is set up as a module. (For more
information on top-level `await`, its motivations, its uses, and its dangers,
see this [article][top-level-await].)

Note that top-level `await` is really more of a special case. In general, you
will want to make sure that you only use `await` inside of `async`-designated
functions.

## When to use `async`/`await`

Should you always use `async` and `await` when writing asynchronous functions?
Not necessarily. Assume you have a function to grab the posts from a backend:

```js
async function getPosts() {
  return await fetch("/posts");
}
```

This use of `async`/`await` is fine syntactically--i.e., it won't throw any
errors--but it is also not doing anything useful. In particular, it is **NOT**
effectively turning this code into a synchronous function that will block
execution in the larger application until the `fetch` returns. Why does it not
do that?

Remember how Promises work. **Without `async`/`await`,** `getPosts` will
immediately return whatever `fetch` returns. What `fetch` will initially return,
however, is a Promise with a state of `pending`, so `getPosts` will also return
this Promise. **With `async` and `await`,** `getPosts` will proceed
synchronously (as before) until it hits the `await`, at which point it will
similarly return a Promise with a state of `pending`.

Although there are some subtle differences in these two cases, both essentially
result in `getPosts` returning a Promise that will be `pending` until the
`fetch` Promise resolves. Accordingly, both cases return control to the code
that called `getPosts` while waiting for the posts to arrive. In other words,
given the following code:

```js
getPosts().then((posts) => {
  console.log("Posts received!");
  dispatch(receivePosts(posts));
});
console.log("After getPosts");
```

both cases will produce the same output:

```sh
After getPosts
Posts received!
```

To summarize, `await`ing the result of the `fetch` in `getPosts` will not
keep `getPosts` from returning. Rather, it will cause `getPosts` to return a
Promise with the state set to `pending`, but this is what `getPosts` would
return anyway. There is therefore no need to use `await` in this case.

`await` is useful, however, whenever you need to pause the **internal**
execution of an `async` function. This need commonly arises in at least two
cases:

1. When subsequent code in the `async` function depends upon a value returned
   from an asynchronous function call
2. When asynchronous function calls need to be executed in sequence rather than
   in parallel

You will see an example of these use cases below, but first a word about using
`async`. For the most part, you will only need to designate a function as
`async` if you are using an `await` inside it. Remember, though, that `async`
also ensures that the function will return a Promise. This means that an `async`
function will convert any synchronous errors into a rejected Promise, which can
simplify error handling by reducing the number of cases that must be checked.
Programmers will sometimes designate a function as `async` without an `await`
because of this error-handling benefit.

## Converting functions to `async`/`await`

Consider how you might convert the following implementation of `getPost` to use
`async`/`await`:

```js
function getPost(id) {
  fetch(`/posts/${id}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw response;
      }
    })
    .then(post => console.log(post))
    .catch(errorResponse => console.error(errorResponse));
}
```

The first thing to note is that there are two `.then` clauses, one for each
function call that returns a Promise: `fetch` and `json`. `await` basically does
the work of a `.then`, so you will likely want to add two `await`s. Furthermore,
each `.then` callback takes an argument--`response` and `post`,
respectively--that represents the returned value from the previous asynchronous
function call. Convert these to variables and set them equal to the return
values of the `await`ed functions. As for the `.catch` clause, it can be
converted to a `try`...`catch` block.

These observations combine to produce the following converted function:

```js
async function getPost(id) {
  try {
     const response = await fetch(`/posts/${id}`);
     if (response.ok) {
       const post = await response.json();
       console.log(post);
     } else {
       throw response;
     }
  } catch (errorResponse) {
      console.error(errorResponse);
  }
}
```

## What you've learned

In this reading, you've learned how to simplify your Promise-based code using
`async` and `await`. You learned what these keywords do, when to use them (and
when not to use them), and how to convert Promises chained with `.then` and
`.catch` to `async`/`await` syntax.

[top-level-await]: https://v8.dev/features/top-level-await
