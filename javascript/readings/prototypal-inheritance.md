# Prototypal Inheritance

## Classes & Prototypes

JavaScript has an unusual system for implementing inheritance. JavaScript's
version of inheritance is called **prototypal inheritance**, and it differs from
the **classical inheritance** that we are familiar with from Ruby.

When you call any property on any JavaScript object, the interpreter will first
look for that property in the object itself. If it does not find it there, it
will look in the object's prototype (which is pointed to by the object's
internal `__proto__` property).

If it does not find the property in the prototype, it will recursively look at
the prototype's `__proto__` property to continue up the *prototype chain*. How
does the chain stop? `Object.prototype.__proto__ === null`, so eventually the
chain ends.

It is for this reason that we call `Object` the "top-level class" in JavaScript.

Inheritance in JavaScript is all about setting up the prototype chain. Let's
suppose we have an `Animal` class, and we'd like to have a `Dog` class that
inherits from `Animal`.

Well, we know that we'll instantiate each of these constructor style:

```javascript
function Animal () {};
function Dog () {};

const myAnimal = new Animal();
const myDog = new Dog();
```

* `myAnimal`'s `__proto__` references `Animal.prototype`.
* `myDog`'s `__proto__` references `Dog.prototype`.

Great, but `Animal`, `Dog`, and `Poodle` don't yet relate to each other in any
way. How can we link them up?

We want `Dog.prototype` to reference `Animal.prototype`. Now you might be
wondering why we don't just call `Dog.prototype = Animal.prototype`. We don't do
this because that means any function added to `Dog` would also be added to
`Animal`.

What we need is for the `__proto__` property to point to the correct prototype
object. In particular, we want:

* `Dog.prototype.__proto__ === Animal.prototype`

This way when an attribute is not found on `Dog.prototype` and the interpreter
looks at whatever is set equal to `Dog.prototype.__proto__`, it will look at
`Animal.prototype`. `Dog` objects will then have access to methods defined on
the `Animal` prototype.

Javascript provides us a number of ways to accomplish this. Some work better
than others. Let's explore them.

##  Object.prototype.__proto__

As it turns out `__proto__` can be used as an accessor for the prototype of the
object it is called on. This means we can set up inheritance simply by writing:

```js
Dog.prototype.__proto__ = Animal.prototype;
```

Dog objects now have access to methods defined on the Animal prototype because
`Dog.prototype.__proto__` references the Animal prototype.

Using `__proto__`, however, is bad practice. Its behavior was just standardized
in ES2015 and is not supported across all browsers. Furthermore, because of how
JavaScript searches for and accesses properties in the prototype chain, anything
that alters the prototype of an object will lead to very poor performance. For
these reasons, we don't want to use `__proto__` to manage inheritance.

## Object.setPrototypeOf

It's also possible to change an object's prototype with `Object.setPrototypeOf`.
`Object.setPrototypeOf` takes two arguments: the object whose prototype we want
to link, and the prototype we want to link it to.

```js
Object.setPrototypeOf(Dog.prototype, Animal.prototype)
```

Like `__proto__`, however, using `Object.setPrototypeOf` comes with a
performance hit because it alters an object's `prototype`.

In order to efficiently manage inheritance in Javascript, it will be necessary
to refrain from mutating the prototype at all.

## Object.create

The workaround is to create an entirely new `prototype` object.

We can use `Object.create` to do this.

```js
Dog.prototype = Object.create(Animal.prototype);
```

`Object.create` returns an entirely new object with its `__proto__` set to
whatever argument is passed to `Object.create`. We then set the object returned
by `Object.create` to be the prototype of the child constructor function.

This is currently the recommended way to establish prototypal inheritance in
JavaScript.

Let's look at an example.

```javascript
function Animal (name) {
  this.name = name;
};

Animal.prototype.sayHello = function () {
  console.log("Hello, my name is " + this.name);
};

function Dog () {};

Dog.prototype = Object.create(Animal.prototype); // Dog now inherits from Animal

Dog.prototype.constructor = Dog // otherwise instances of Dog will have 'instance.constructor === Animal'

Dog.prototype.bark = function () {
  console.log("Bark!");
};

const liesel = new Dog("Liesel");

liesel.bark();
liesel.sayHello();
```

This works for the most part. However, we still have the problem that Animal
won't be called when constructing a Dog instance. `liesel.sayHello` will run,
but `this.name` will be undefined.

Let's make one final tweak to the Dog constructor function in the previous
solution:

```js
function Dog (name, coatColor) {
  // call super-constructor function on **the current `Dog` instance**.
  Animal.call(this, name);

  // `Dog`-specific initialization
  this.coatColor = coatColor;
}
```

This pattern is especially useful if the superclass (`Animal`) has a lot of
initialization code. You could have copy-and-pasted the `Animal` constructor
code into `Dog`'s constructor, but calling the `Animal` constructor itself is
obviously much DRYer.

Note that we write `Animal.call` and not `new Animal`. Inside the `Dog`
constructor, we don't want to construct a whole new `Animal` object. We just
want to run the `Animal` initialization logic **on the current `Dog` instance**.
That's why we use `call` to call the `Animal` constructor, setting `this` to the
current `Dog` instance.

## The (old) Surrogate trick

You'll sometimes see older code bases manage inheritance in the following way:

```js
function Animal (name) {
  this.name = name;
};

Animal.prototype.sayHello = function () {
  console.log("Hello, my name is " + this.name);
};

function Dog (name, coatColor) {
  Animal.call(this, name);

  this.coatColor = coatColor;
}

// A surrogate will be used to construct `Dog.prototype`.
// A `Surrogate` instance should delegate to `Animal.prototype`.
function Surrogate () {};
Surrogate.prototype = Animal.prototype;

// Set `Dog.prototype` to a `Surrogate` instance.
Dog.prototype = new Surrogate();

// Make sure that instances of Dog have instance.constructor === Dog (rather than Animal)
Dog.prototype.constructor = Dog; 

const liesel = new Dog("Liesel", "Black");

liesel.sayHello();
```

Instead of using `Object.create` to make a new prototype object, this method
uses a third class traditionally called the `Surrogate`.

`Surrogate.prototype` is set equal to `Animal.prototype` so all instances of
`Surrogate` will have a `__proto__` accessor that points to `Animal.prototype`.
This `surrogate` instance becomes the new `Dog.prototype`.

## Inheritance in ES2015

ES2015 greatly simplifies JavaScript inheritance. `class Dog extends Animal` is
the syntactic-sugar equivalent of using `Object.create`.

One can access a parent class's overwritten functions using `super`. Within a
child class's `constructor` function, simply call `super` with the necessary
parameters for the base class's `constructor`. Less commonly, one can invoke the
base-class version of an overwritten (non-constructor) function using
`super.methodName()`.

Note the use of `extends` and `super` below.

```js
class Bicycle {
  constructor(color, model) {
    this.color = color;
    this.model = model;
  }

  action() {
    return "rolls along";
  }
}

class RaceBicycle extends Bicycle {
  constructor(color, model, gears) {
    super(color, model);
    this.gears = gears;
  }

  action() {
    const oldAction = super.action();
    return `${oldAction} at a blistering pace!`
  }
}
```

## References
* [ECMAScript Discussion Archives on Javascript engines and prototype chain](https://esdiscuss.org/topic/extending-an-es6-class-using-es5-syntax#content-15)
