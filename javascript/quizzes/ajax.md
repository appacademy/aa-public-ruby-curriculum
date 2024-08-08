# AJAX Quiz

What is the response data type of an AJAX request?
- [ ] XML
- [ ] JSON
- [ ] YAML
- [ ] text
- [ ] The type specified by the request
    
<details><summary>Answer:</summary>

The type specified by the request</details>
<details><summary>Explanation:</summary>

You can specify what type of response you want!</details>

What is the default request type in an AJAX request?
- [ ] GET
- [ ] POST
- [ ] PATCH
- [ ] PUT
- [ ] DELETE

<details><summary>Answer:</summary>

GET</details>
<details><summary>Explanation:</summary>

Yep, it's GET!</details>

```js
const fetchSuccess = kittens => {
  /* ... */
};
const fetchKittens = () => fetch("/kittens");

fetchKittens().then(fetchSuccess);
```

After making the above AJAX request, when will `fetchSuccess` be called?
- [ ] Whenever the request receives a response
- [ ] After the request is made, but before a response is received
- [ ] When the request receives a response with a 300-level status code
- [ ] When the request receives a response with a 200-level status code
- [ ] Never

<details><summary>Answer:</summary>

When the request receives a response with a 200-level status code</details>
<details><summary>Explanation:</summary>

`fetchSuccess` will be invoked when the AJAX call has resolved (returned a response with a 200-level status code).</details>

True or False: An AJAX request is an HTTP request.
- [ ] False
- [ ] True

<details><summary>Answer:</summary>

True</details>
<details><summary>Explanation:</summary>

Yep! An AJAX request dispatches an HTTP request.</details>

```js
1. promise.then(firstFulfilled).then(secondFulfilled).catch(rejected)

2. promise.then(firstFulfilled, rejected).then(secondFulfilled)

3. promise.then(firstFulfilled, rejected).catch(error)
```

In what cases will `rejected` run?
- [ ] `rejected` will run in 2 and 3 if `promise` fails but not in 1.
- [ ] `rejected` will run in 1 and 2 if `secondFulfilled` fails.
- [ ] All three will run `rejected` if either `promise` or `firstFulfilled` fail.
- [ ] All three will run `rejected` if `promise` fails.

<details><summary>Answer:</summary>

All three will run `rejected` if `promise` fails.</details>
<details><summary>Explanation:</summary>

In all three of the above scenarios the rejected callback will run if the promise fails! In Case 1, `catch` will run the callback given to it if any of the promise objects are rejected. In Case 2, after `promise` is complete, `firstFulfilled` will get invoked if the `promise` returned a status of resolved.  `rejected` will get invoked if the `promise` returned a status of `rejected`.  Case 3 is the same explanation as Case 2!  In Cases 2 and 3, `rejected` will run ONLY if `promise` fails. Once `promise` succeeds, `firstFulfilled` (passed as the "Success Callback", i.e., the first argument to the `.then`) will run and `rejected` (passed as the "Rejected Callback", i.e., the second argument to the `.then`) will not. There has to be an error callback (second argument) in the next `.then` to catch `firstFulfilled` failing or a `.catch` anywhere later in the chain. So in Case 2 if `firstFulfilled` fails nothing will catch it, but in Case 3, `error` would catch it.</details>

```js
function getAnswers(questions) {
  count = 0
  responses = []
  while (count < questions.length) {
    answer = await rl.question(questions[count++]);
    responses.push(answer);
  }
  responses
}
```

Consider the above function that takes in an array of questions and returns an array of corresponding answers. If `rl.question` is an asynchronous function that waits for user input, what is the problem with the code above?
- [ ] `rl.question` needs to be inside a `.then`.
- [ ] Nothing: it will run without error.
- [ ] `answer` will always be a Promise instead of the actual answer.
- [ ] It will produce a `Syntax Error` because `await` is an `Unexpected reserved word`.

<details><summary>Answer:</summary>

It will produce a `Syntax Error` because `await` is an `Unexpected reserved word`.</details>
<details><summary>Explanation:</summary>

It will produce a `Syntax Error` because `getAnswers` is not designated as an `async` function. `await` can only be used inside `async` functions (and in a few top-level situations).</details>

```js
async function asyncPrint() {
  await setTimeout(() => console.log("Second!"), 0);
}

function printThings() {
  console.log("First!");
  asyncPrint();
  console.log("Third!");
}

printThings();
```

If you run the code above, in what order will the `console.log`s appear?
- [ ] First! Second! Third!
- [ ] First! Third! Second!
- [ ] Second! First! Third!
- [ ] It will produce an error because `asyncPrint` is not designated as an `async` function when it is invoked inside `printThings`.

<details><summary>Answer:</summary>

First! Third! Second!</details>
<details><summary>Explanation:</summary>

`await` only pauses the internal execution of the function in which it is invoked, so the use of `await` in `asyncPrint` will NOT effectively turn `printThings` into a synchronous function. When `asyncPrint` hits the `await`, it will pause its internal execution and cede control back to `printThings` while its Promise resolves. Once the Promise resolves, then `asyncPrint` will resume executing any subsequent code, although there's nothing left to execute after the `await` in `asyncPrint`. In other words, the `await` isn't really doing anything useful here.</details>
