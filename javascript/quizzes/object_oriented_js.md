# Object Oriented Javascript Quiz


```js
  function colors(color1, color2, ...moreColors) {
    moreColors.forEach(color => {
      console.log(color);
    });
  }

  colors("red", "orange", "yellow", "green", "blue", "purple");
```

What will the above code output?
- [ ] "red", "orange", "yellow", "green", "blue", "purple"</answer>
- [ ] "yellow", "green", "blue", "purple"</answer>
- [ ] "red", "orange"</answer>

<details><summary>Answer:</summary>

"yellow", "green", "blue", "purple"</details>
<details><summary>Explanation:</summary>

`...moreColors` will grab the "rest" of the arguments given to the function invokation.  In this case, `color1` will be "red", `color2` will be "orange", and `moreColors` will be an array of `["yellow", "green", "blue", "purple"]`</details>



```js
  function bunnies(bunny1, bunny2, bunny3) {
    console.log(`${bunny1} likes carrots`);
    console.log(`${bunny2} likes hopping`);
    console.log(`${bunny3} likes burrowing`);
  }

  const bunnyNames = ["Peter", "Bancroft", "Hopper"];
```

Consider the above code. What is a correct way to pass `bunnyNames` to the `bunnies` function?
- [ ] `bunnies(...bunnyNames);`</answer>
- [ ] `bunnyNames.bunnies();`</answer>
- [ ] `bunnies().bind(bunnyNames);`</answer>
- [ ] `bunnies(*bunnyNames);`</answer>
- [ ] `bunnies(bunnyNames.join(", "));`</answer>

<details><summary>Answer:</summary>

`bunnies(...bunnyNames);`</details>
<details><summary>Explanation:</summary>

Since `bunnies` takes three separate arguments and `bunnyNames` is an array, we need to get all of the items in the array to be passed indivually into `bunnies`.  For this, we can use the Spread Operator to "spread" out the array.</details>



```js
    Function.prototype.inherits = function(Parent) {
      function Surrogate() {}
      Surrogate.prototype = Parent.prototype;
      // what goes here???
      this.prototype.constructor = this;
    };
```

Which of the above lines of code will complete the `inherits` function?
- [ ] `this.__proto__ = Surrogate.prototype;`</answer>
- [ ] `Parent.prototype = new Surrogate();`</answer>
- [ ] `this.prototype = new Surrogate();`</answer>
- [ ] `parent.__proto__ = this.prototype;`</answer>
- [ ] Nothing, the function works as-is</answer>

<details><summary>Answer:</summary>

`this.prototype = new Surrogate();`</details>
<details><summary>Explanation:</summary>

We need to set the prototype of `this` based on the inheritance we have created with Surrogate. We assign `this.prototype` to a an instance of Surrogate so that *A)* we don't have create an instance of the Parent in case that constructor is an expensive one or there are specific arguments required that we would have to worry about and *B)* so that we are able to write fuctions on our own class and not have them also added to the Parent class (which would happen if we were to just set `self.prototype = Parent.prototype`).</details>



```html
  <canvas id="canvas"></canvas>
```

```js
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // your code here
  ctx.fillRect(10, 10, 100, 100);
```

What is the correct way set the rectangle's fill color to yellow?
- [ ] `ctx.color = "yellow";`</answer>
- [ ] `ctx.color = yellow;`</answer>
- [ ] `ctx.fillStyle = "yellow";`</answer>
- [ ] `ctx.fillStyle = yellow;`</answer>
- [ ] `ctx.fillColor = "yellow";`</answer>
- [ ] `ctx.fillColor = yellow;`</answer>

<details><summary>Answer:</summary>

`ctx.fillStyle = "yellow";`</details>
<details><summary>Explanation:</summary>

`fillStyle` is the attribute we need to set and it accepts strings for the colors.</details>




What is webpack?
- [ ] a module bundler</answer>
- [ ] a transpiler</answer>
- [ ] Chrome devtools extension</answer>
- [ ] a lightweight JavaScript server</answer>
- [ ] an asynchronous function</answer>

<details><summary>Answer:</summary>

a module bundler</details>
<details><summary>Explanation:</summary>

Yep! It's a bundler to allow us to use different files for our code but get it all bundled up into one file that the browser is able to handle.</details>



```js
// I.

function Dog (name, breed) {
  this.name = name;
  this.breed = breed;

  this.bark = function() {
    console.log(`${this.name} says woof!`);
  };
};


// II.

function Dog (name, breed) {
  this.name = name;
  this.breed = breed;
};

Dog.prototype.bark = function() {
  console.log(`${this.name} says woof!`);
};
```

When defining a method that can be called on any instance of the `Dog` class, which of these two options is preferable and why?
- [ ] `I` is preferable because it encapsulates all Dog methods within the Dog object.</answer>
- [ ] `II` is preferable because it does not create a new version of the `bark` function for each dog instance that is created.</answer>
- [ ] `I` is preferable because it can be called directly on a dog (e.g. `fido.bark()`), whereas `II` must be called on the dog's prototype (e.g. `dog.prototype.bark()`).</answer>
- [ ] They are both equally good.</answer>

<details><summary>Answer:</summary>

`II` is preferable because it does not create a new version of the `bark` function for each dog instance that is created.</details>
<details><summary>Explanation:</summary>

`I` would create a whole new version of the `bark` method every time we create a new instance of a Dog. </details>



```js
let ernest = new Dog("ernest", "corgi mix");
```

Consider the above. What does `ernest.__proto__` point to?
- [ ] `dog.proto`</answer>
- [ ] `Dog.proto`</answer>
- [ ] `Dog.__proto__`</answer>
- [ ] `Dog.prototype`</answer>

<details><summary>Answer:</summary>

`Dog.prototype`</details>
<details><summary>Explanation:</summary>

`__proto__` is a property that points to the object used in the lookup chain. In this case, it will be the `Dog.prototype` object.</details>