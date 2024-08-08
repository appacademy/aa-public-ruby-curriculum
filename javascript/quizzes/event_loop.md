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

Consider the above code. Assuming we run the code in the browser, what is the value of `this` when we call `catAging`?
- [ ] `window`
- [ ] `cat`
- [ ] `undefined`
- [ ] `catAging` will throw an error - you cannot save a function as a constant.

<details><summary>Answer:</summary>

`window`</details>
<details><summary>Explanation:</summary>

We are creating a POJO on the window assigned to the variable named `cat`. Our POJO has an attribute called `ageOneYear`.  Because the context of `this` inside of the POJO will be the window, the conext of `this` will also be the window inside of the `ageOneYear` function.</details>



```javascript

reader.question("What is your name?", function (answer) {
  console.log(`Hello ${ answer }!`);
});

console.log("Last program line");
```

Consider the above code. `reader.question` is an asynchronous function. In what order are the above statements logged?
- [ ] "What is your name?", `Hello ${ answer }!`, "Last program line"
- [ ] `Hello ${ answer }!`, "Last program line", "What is your name?"
- [ ] "Last program line", "What is your name?", `Hello ${ answer }!`
- [ ] "What is your name?", "Last program line", `Hello ${ answer }!`

<details><summary>Answer:</summary>

"What is your name?", "Last program line", `Hello ${ answer }!`</details>
<details><summary>Explanation:</summary>

Because `reader.question` will not invoke the callback given to it (which console logs `Hello ${answer}!`) until the user enters an answer.  Because `reader.question` is asynchronous, JS doesn't wait around for that answer before continuing to execute the rest of the code.  Therefore, `"Last program line"` will be printed before the answer the user types in will be logged.</details>


Which of the following is NOT executed asynchronously?
- [ ] `reader.question`
- [ ] `Array.prototype.forEach`
- [ ] `window.setInterval`
- [ ] `window.setTimeout`

<details><summary>Answer:</summary>

`Array.prototype.forEach`</details>
<details><summary>Explanation:</summary>

`forEach` will go ahead and start iterating and JS will not move on to other code until the `forEach` is complete.</details>


```javascript
// ./dog.js
function Dog () {
  // ...
};

// ./animals.js
const Dog = require('./dog.js');

const dog = new Dog();
```

Why will the above code throw an error?
- [ ] `dog.js` fails to export the `Dog` constructor function. 
- [ ] `animals.js` should import an instance of `Dog` rather than the `Dog` constructor function.
- [ ] `animals.js` should save `Dog` to a variable.
- [ ] The above code will work as expected.

<details><summary>Answer:</summary>

dog.js` fails to export the `Dog` constructor function.</details>
<details><summary>Explanation:</summary>

If we don't export the `Dog` function, JS will not know what to assign to `Dog` inside of our `animals.js` file.</details>



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

Why will the above code throw an error?
- [ ] `dog.js` should export the object `{ Dog: Dog }`.
- [ ] `dog.js` should export an instance of Dog rather than the Dog constructor function.
- [ ] `animals.js` should save `require("./dog")` as the constant `Dog`. 
- [ ] The above code will work as expected.

<details><summary>Answer:</summary>

`animals.js` should save `require("./dog")` as the constant `Dog`.</details>
<details><summary>Explanation:</summary>

Simply requiring the `dog.js` file will not make the `Dog` constructor function available to us.  We need to assign the code that we are importing to a constant `Dog` to be able to invoke the constructor function.</details>


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

Consider the above code. What is logged to the console?
- [ ] "phHRRRRRRR my name is Ryan Hall" 
- [ ] "phHRRRRRRR my name is Dumbo"
- [ ] "Hi, I'm Dumbo, how can I help you?"
- [ ] "Hi, I'm Ryan Hall, how can I help you?"

<details><summary>Answer:</summary>

"phHRRRRRRR my name is Ryan Hall"</details>
<details><summary>Explanation:</summary>

`call` is being invoked on the `Dumbo` `greet` method.  `greet` gets invoked, but with the new context of `RyanHall`.  Therefore `"phHRRRRRRR my name is Ryan Hall"` will get logged to the console because we are invoking `Dumbo`'s `greet` method but `RyanHall` is the new context of `this`.</details>