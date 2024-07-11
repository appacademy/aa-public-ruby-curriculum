# AJAX Quiz

<quiz>
  <question>
    <p>What is the response data type of an AJAX request?</p>
    <answer>XML</answer>
    <answer>JSON</answer>
    <answer>YAML</answer>
    <answer>text</answer>
    <answer correct>The type specified by the request</answer>
    <explanation>You can specify what type of response you want!</explanation>
  </question>
</quiz>

<quiz>
  <question>
    <p>What is the default request type in an AJAX request?</p>
    <answer correct>GET</answer>
    <answer>POST</answer>
    <answer>PATCH</answer>
    <answer>PUT</answer>
    <answer>DELETE</answer>
    <explanation>Yep, it's GET!</explanation>
  </question>
</quiz>

```js
const fetchSuccess = kittens => {
  /* ... */
};
const fetchKittens = () => fetch("/kittens");

fetchKittens().then(fetchSuccess);
```

<quiz>
  <question>
    <p>After making the above AJAX request, when will `fetchSuccess` be called?</p>
    <answer>Whenever the request receives a response</answer>
    <answer>After the request is made, but before a response is received</answer>
    <answer>When the request receives a response with a 300-level status code</answer>
    <answer correct>When the request receives a response with a 200-level status code</answer>
    <answer>Never</answer>
    <explanation>`fetchSuccess` will be invoked when the AJAX call has resolved (returned a response with a 200-level status code).</explanation>
  </question>
</quiz>

<quiz>
  <question>
    <p>True or False: An AJAX request is an HTTP request.</p>
    <answer>False</answer>
    <answer correct>True</answer>
    <explanation>Yep! An AJAX request dispatches an HTTP request.</explanation>
  </question>
</quiz>

```js
1. promise.then(firstFulfilled).then(secondFulfilled).catch(rejected)

2. promise.then(firstFulfilled, rejected).then(secondFulfilled)

3. promise.then(firstFulfilled, rejected).catch(error)
```

<quiz>
  <question>
    <p>In what cases will `rejected` run?</p>
    <answer>`rejected` will run in 2 and 3 if `promise` fails but not in 1.</answer>
    <answer>`rejected` will run in 1 and 2 if `secondFulfilled` fails.</answer>
    <answer>All three will run `rejected` if either `promise` or `firstFulfilled` fail.</answer>
    <answer correct>All three will run `rejected` if `promise` fails.</answer>
    <explanation>In all three of the above scenarios the rejected callback will run if the promise fails! In Case 1, `catch` will run the callback given to it if any of the promise objects are rejected. In Case 2, after `promise` is complete, `firstFulfilled` will get invoked if the `promise` returned a status of resolved.  `rejected` will get invoked if the `promise` returned a status of `rejected`.  Case 3 is the same explanation as Case 2!  In Cases 2 and 3, `rejected` will run ONLY if `promise` fails. Once `promise` succeeds, `firstFulfilled` (passed as the "Success Callback", i.e., the first argument to the `.then`) will run and `rejected` (passed as the "Rejected Callback", i.e., the second argument to the `.then`) will not. There has to be an error callback (second argument) in the next `.then` to catch `firstFulfilled` failing or a `.catch` anywhere later in the chain. So in Case 2 if `firstFulfilled` fails nothing will catch it, but in Case 3, `error` would catch it.</explanation>
  </question>
</quiz>

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

<quiz>
  <question>
    <p>Consider the above function that takes in an array of questions and returns an array of corresponding answers. If `rl.question` is an asynchronous function that waits for user input, what is the problem with the code above?</p>
    <answer>`rl.question` needs to be inside a `.then`.</answer>
    <answer>Nothing: it will run without error.</answer>
    <answer>`answer` will always be a Promise instead of the actual answer.</answer>
    <answer correct>It will produce a `Syntax Error` because `await` is an `Unexpected reserved word`.</answer>
    <explanation>It will produce a `Syntax Error` because `getAnswers` is not designated as an `async` function. `await` can only be used inside `async` functions (and in a few top-level situations).</explanation>
  </question>
</quiz>

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

<quiz>
  <question>
    <p>If you run the code above, in what order will the `console.log`s appear?</p>
    <answer>First! Second! Third!</answer>
    <answer correct>First! Third! Second!</answer>
    <answer>Second! First! Third!</answer>
    <answer>It will produce an error because `asyncPrint` is not designated as an `async` function when it is invoked inside `printThings`.</answer>
    <explanation>`await` only pauses the internal execution of the function in which it is invoked, so the use of `await` in `asyncPrint` will NOT effectively turn `printThings` into a synchronous function. When `asyncPrint` hits the `await`, it will pause its internal execution and cede control back to `printThings` while its Promise resolves. Once the Promise resolves, then `asyncPrint` will resume executing any subsequent code, although there's nothing left to execute after the `await` in `asyncPrint`. In other words, the `await` isn't really doing anything useful here.</explanation>
  </question>
</quiz>
