# Object Oriented Javascript Quiz


```js
  function colors(color1, color2, ...moreColors) {
    moreColors.forEach(color => {
      console.log(color);
    });
  }

  colors("red", "orange", "yellow", "green", "blue", "purple");
```

<quiz>
  <question>
    <p>What will the above code output?</p>
    <answer>"red", "orange", "yellow", "green", "blue", "purple"</answer>
    <answer correct>"yellow", "green", "blue", "purple"</answer>
    <answer>"red", "orange"</answer>
    <explanation>`...moreColors` will grab the "rest" of the arguments given to the function invokation.  In this case, `color1` will be "red", `color2` will be "orange", and `moreColors` will be an array of `["yellow", "green", "blue", "purple"]`</explanation>
  </question>
</quiz>



```js
  function bunnies(bunny1, bunny2, bunny3) {
    console.log(`${bunny1} likes carrots`);
    console.log(`${bunny2} likes hopping`);
    console.log(`${bunny3} likes burrowing`);
  }

  const bunnyNames = ["Peter", "Bancroft", "Hopper"];
```

<quiz>
  <question>
    <p>Consider the above code. What is a correct way to pass `bunnyNames` to the `bunnies` function?</p>
    <answer correct>`bunnies(...bunnyNames);`</answer>
    <answer>`bunnyNames.bunnies();`</answer>
    <answer>`bunnies().bind(bunnyNames);`</answer>
    <answer>`bunnies(*bunnyNames);`</answer>
    <answer>`bunnies(bunnyNames.join(", "));`</answer>
    <explanation>Since `bunnies` takes three separate arguments and `bunnyNames` is an array, we need to get all of the items in the array to be passed indivually into `bunnies`.  For this, we can use the Spread Operator to "spread" out the array.</explanation>
  </question>
</quiz>



```js
    Function.prototype.inherits = function(Parent) {
      function Surrogate() {}
      Surrogate.prototype = Parent.prototype;
      // what goes here???
      this.prototype.constructor = this;
    };
```

<quiz>
  <questions>
    <p>Which of the above lines of code will complete the `inherits` function?</p>
    <answer>`this.__proto__ = Surrogate.prototype;`</answer>
    <answer>`Parent.prototype = new Surrogate();`</answer>
    <answer correct>`this.prototype = new Surrogate();`</answer>
    <answer>`parent.__proto__ = this.prototype;`</answer>
    <answer>Nothing, the function works as-is</answer>
    <explanation>We need to set the prototype of `this` based on the inheritance we have created with Surrogate. We assign `this.prototype` to a an instance of Surrogate so that *A)* we don't have create an instance of the Parent in case that constructor is an expensive one or there are specific arguments required that we would have to worry about and *B)* so that we are able to write fuctions on our own class and not have them also added to the Parent class (which would happen if we were to just set `self.prototype = Parent.prototype`).</explanation>
  </question>
</quiz>



```html
  <canvas id="canvas"></canvas>
```

```js
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // your code here
  ctx.fillRect(10, 10, 100, 100);
```

<quiz>
  <question>
    <p>What is the correct way set the rectangle's fill color to yellow?</p>
    <answer>`ctx.color = "yellow";`</answer>
    <answer>`ctx.color = yellow;`</answer>
    <answer correct>`ctx.fillStyle = "yellow";`</answer>
    <answer>`ctx.fillStyle = yellow;`</answer>
    <answer>`ctx.fillColor = "yellow";`</answer>
    <answer>`ctx.fillColor = yellow;`</answer>
    <explanation>`fillStyle` is the attribute we need to set and it accepts strings for the colors.</explanation>
  </question>
</quiz>




<quiz>
  <question>
    <p>What is webpack?</p>
    <answer correct>a module bundler</answer>
    <answer>a transpiler</answer>
    <answer>Chrome devtools extension</answer>
    <answer>a lightweight JavaScript server</answer>
    <answer>an asynchronous function</answer>
    <explanation>Yep! It's a bundler to allow us to use different files for our code but get it all bundled up into one file that the browser is able to handle.</explanation>
  </question>
</quiz>



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

<quiz>
  <question>
    <p>When defining a method that can be called on any instance of the `Dog` class, which of these two options is preferable and why?</p>
    <answer>`I` is preferable because it encapsulates all Dog methods within the Dog object.</answer>
    <answer correct>`II` is preferable because it does not create a new version of the `bark` function for each dog instance that is created.</answer>
    <answer>`I` is preferable because it can be called directly on a dog (e.g. `fido.bark()`), whereas `II` must be called on the dog's prototype (e.g. `dog.prototype.bark()`).</answer>
    <answer>They are both equally good.</answer>
    <explanation>`I` would create a whole new version of the `bark` method every time we create a new instance of a Dog. </explanation>
  </question>
</quiz>



```js
let ernest = new Dog("ernest", "corgi mix");
```

<quiz>
  <question multiple>
    <p>Consider the above. What does `ernest.__proto__` point to?</p>
    <answer>`dog.proto`</answer>
    <answer>`Dog.proto`</answer>
    <answer>`Dog.__proto__`</answer>
    <answer correct>`Dog.prototype`</answer>
    <explanation>`__proto__` is a property that points to the object used in the lookup chain. In this case, it will be the `Dog.prototype` object.</explanation>
  </question>
</quiz>