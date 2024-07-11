# Callbacks, Asynchronous Functions, and Function Calls

Let's walk through writing some asynchronous functions!

## Simple Timeout

Let's write a simple `setTimeout` function!

First, set a simple timeout for `5000` ms (use `window.setTimeout`). Pass in a
callback function that calls `alert('HAMMERTIME')`.

Open up Chrome Devtools and copy your code into the console to test it. (Open a
chrome window then press `cmd + option + i`. Press `esc` to show the console.)

Note: while we're waiting for our timeout, we can still scroll around the
website and interact with it normally. Is `setTimeout` synchronous or
asynchronous?

## Timeout Plus Closure

Next, we are going to write a function `hammerTime` that takes in one argument:
`time`. When the function is run, it should set a timeout on the `window`. Pass
a callback to the timeout that creates an alert `${time} is hammertime!`.

Notice that the callback function closed over the `time` variable in the outer
scope of `hammerTime`.

## Some tea? Some biscuits?

Now let's move over to the node environment. Create a new javascript file to run
in node.

We are going to write a simple function that asks a user if they'd like tea and
biscuits. Chronologically, your function should:

1. Ask the user if they'd like tea.
2. `console.log` their response.
3. Ask the user if they'd like biscuits.
4. `console.log` their complete response: `So you ${firstAns} want tea and you ${secondAns} want coffee.`
5. Close the reader.

How do we achieve this? First off, require the `readline` library.

```javascript
const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

```

Next, write out your function. You should use the `reader.question` method to
prompt the reader if they'd like some tea. `reader.question` takes two
arguments: a string (this is where you ask your question) and a callback
function. The callback function takes one argument: the user's response. This is
passed in when the user responds to the prompt and hits enter.

Test that your first question works. Next, we'll need another `reader.question`
to ask the reader if they'd like some biscuits. The function below won't work
with our outlined chronology - try to run it:

```javascript
function teaAndBiscuits () {
  let first, second;

  reader.question('Would you like some tea?', (res) => {
    first = res;
    console.log(`You replied ${res}.`);
  });

  reader.question('Would you like some biscuits?', (res) => {
    second = res;
    console.log(`You replied ${res}.`);
  });

  const firstRes = (first === 'yes') ? 'do' : 'don\'t';
  const secondRes = (second === 'yes') ? 'do' : 'don\'t';
  console.log(`So you ${firstRes} want tea and you ${secondRes} want biscuits.`);
  reader.close();
}
```

Why doesn't the above function work? Reorganize it so that it follows the
outlined chronology. (Hint: we don't want to ask the user if they want biscuits
until we know whether or not they want tea. Where can we situate the second
`reader.question`? Should we log their final response and close the reader?)

Make sure to check out the solutions to review the correct answer.

## Ways to Call a Function

Create a new file and paste in the following code, which creates `Dog` and `Cat`
classes.

```javascript
function Cat () {
  this.name = 'Markov';
  this.age = 3;
}

function Dog () {
  this.name = 'Noodles';
  this.age = 4;
}

Dog.prototype.chase = function (cat) {
  console.log(`My name is ${this.name} and I'm chasing ${cat.name}! Woof!`)
};

const Markov = new Cat ();
const Noodles = new Dog ();
```

Let's test out various ways to call `Dog.prototype.chase`.

Start by calling `chase` method-style on Noodles, passing in Markov (don't
worry, Markov escapes, it's all in fun). Note that when we call `chase`
method-style, `this` is automatically set to Noodles.

Now, let's make things a little bit crazier and use `call` and `apply`.

We can use `call` and `apply` to change the identity of `this`. Test out
`Noodles.chase.call(Markov, Noodles)`. `Noodles.chase` just returns a regular
function, and when we use `call` with Markov as our first argument, `this` is
set to Markov! Whoa, cats chasing dogs! `apply` is similar, but we need to pass
it an array of arguments. Try using `apply` to change the context of
`Noodles.chase` to Markov.

After you finish the homework, or if you get stuck on one of the problems, feel
free to take a look at the solutions.
