# Event Loop Quiz

```javascript
const cat = {
  age: 5,

  ageOneYear () {
    this.age += 1;
  }
};

const catAging = cat.ageOneYear;
catAging();
```

<quiz>
  <question multiple>
    <p>Consider the above code. Assuming we run the code in the browser, what is the value of `this` when we call `catAging`?</p>
    <answer correct>`window`</answer>
    <answer>`cat`</answer>
    <answer>`undefined`</answer>
    <answer>`catAging` will throw an error - you cannot save a function as a constant.</answer>
    <explanation>We are creating a POJO on the window assigned to the variable named `cat`. Our POJO has an attribute called `ageOneYear`.  Because the context of `this` inside of the POJO will be the window, the conext of `this` will also be the window inside of the `ageOneYear` function. </explanation>
  </question>
</quiz>



```javascript

reader.question("What is your name?", function (answer) {
  console.log(`Hello ${ answer }!`);
});

console.log("Last program line");
```

<quiz>
  <question multiple>
    <p>Consider the above code. `reader.question` is an asynchronous function. In what order are the above statements logged?</p>
    <answer>"What is your name?", `Hello ${ answer }!`, "Last program line"</answer>
    <answer>`Hello ${ answer }!`, "Last program line", "What is your name?"</answer>
    <answer>"Last program line", "What is your name?", `Hello ${ answer }!`</answer>
    <answer correct>"What is your name?", "Last program line", `Hello ${ answer }!`</answer>
    <explanation>Because `reader.question` will not invoke the callback given to it (which console logs `Hello ${answer}!`) until the user enters an answer.  Because `reader.question` is asynchronous, JS doesn't wait around for that answer before continuing to execute the rest of the code.  Therefore, `"Last program line"` will be printed before the answer the user types in will be logged.</explanation>
  </question>
</quiz>



<quiz>
  <question multiple>
    <p>Which of the following is NOT executed asynchronously?</p>
    <answer>`reader.question`</answer>
    <answer correct>`Array.prototype.forEach`</answer>
    <answer>`window.setInterval`</answer>
    <answer>`window.setTimeout`</answer>
    <explanation>`forEach` will go ahead and start iterating and JS will not move on to other code until the `forEach` is complete.</explanation>
  </question>
</quiz>



```javascript
// ./dog.js
function Dog () {
  // ...
};

// ./animals.js
const Dog = require('./dog.js');

const dog = new Dog();
```

<quiz>
  <question multiple>
    <p>Why will the above code throw an error?</p>
    <answer correct>`dog.js` fails to export the `Dog` constructor function. </answer>
    <answer>`animals.js` should import an instance of `Dog` rather than the `Dog` constructor function.</answer>
    <answer>`animals.js` should save `Dog` to a variable.</answer>
    <answer>The above code will work as expected.</answer>
    <explanation>If we don't export the `Dog` function, JS will not know what to assign to `Dog` inside of our `animals.js` file. </explanation>
  </question>
</quiz>



```javascript
// ./dog.js
function Dog () {
  // ...
};

module.exports = Dog;

// ./animals.js
require("./dog");

const dog = new Dog();
```

<quiz>
  <question multiple>
    <p>Why will the above code throw an error?</p>
    <answer>`dog.js` should export the object `{ Dog: Dog }`.</answer>
    <answer>`dog.js` should export an instance of Dog rather than the Dog constructor function.</answer>
    <answer correct>`animals.js` should save `require("./dog")` as the constant `Dog`. </answer>
    <answer>The above code will work as expected.</answer>
    <explanation>Simply requiring the `dog.js` file will not make the `Dog` constructor function available to us.  We need to assign the code that we are importing to a constant `Dog` to be able to invoke the constructor function.</explanation>
  </question>
</quiz>



```javascript
const RyanHall = {
  name: "Ryan Hall",

  greet () {
    console.log(`Hi, I'm ${this.name}, how can I help you?`)
  }
};

const Dumbo = {
  name: "Dumbo",

  greet () {
    console.log(`phHRRRRRRR my name is ${this.name}.`);
  }
};

Dumbo.greet.call(RyanHall);
```

<quiz>
  <question multiple>
    <p>Consider the above code. What is logged to the console?</p>
    <answer correct>"phHRRRRRRR my name is Ryan Hall" </answer>
    <answer>"phHRRRRRRR my name is Dumbo"</answer>
    <answer>"Hi, I'm Dumbo, how can I help you?"</answer>
    <answer>"Hi, I'm Ryan Hall, how can I help you?"</answer>
    <explanation>`call` is being invoked on the `Dumbo` `greet` method.  `greet` gets invoked, but with the new context of `RyanHall`.  Therefore `"phHRRRRRRR my name is Ryan Hall"` will get logged to the console because we are invoking `Dumbo`'s `greet` method but `RyanHall` is the new context of `this`.</explanation>
  </question>
</quiz>