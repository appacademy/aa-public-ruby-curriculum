# ES6 Prototypal Inheritance

Previously, we've had to create an empty `Surrogate` function to properly set up
a prototype chain.

```js
function Surrogate() {};
Surrogate.prototype = parent.prototype;
child.prototype = new Surrogate();
child.prototype.constructor = child;
```

This was a way to set up an inheritance chain without directly changing the
`__proto__` property.

With ES6, `__proto__` has become standardized and can be used as an accessor for
the prototype of the object it's called on. This means that we can set up
inheritance simply by writing:

```js
child.prototype.__proto__ = parent.prototype;
child.prototype.constructor = child;
```

## `Object.setPrototypeOf`

Changing the `__proto__` directly is something that's highly discouraged, so we
can use `Object.getPrototypeOf` and `Object.setPrototypeOf` as our getter and
setter instead.

For example:

```js
Object.getPrototypeOf(parent) //returns parent.prototype
```

Remember that when we write inheritance, we don't want to just set the child's
prototype to the parent's prototype. If we do this, any functions we write in
the child class will also be available to the parent. We want to set the child's
prototype's `__proto__` equal to the parent's prototype to properly establish
the chain of inheritance. `Object.setPrototypeOf` takes two arguments: the
object whose prototype we want to link, and the prototype we want to link it to.

```js
Object.setPrototypeOf(child.prototype, parent.prototype);
child.prototype.constructor = child;
```

If we simply passed in `child`, we would run into the problem of setting the
child's prototype to the parent's prototype.

## `Object.create`

Because of how JavaScript searches for and accesses properties in the prototype
chain, anything that changes the prototype of an object will lead to very poor
performance.

We can use `Object.create` to get around this problem.

```js
child.prototype = Object.create(parent.prototype);
child.prototype.constructor = child;
```

This is currently the recommended way to establish prototypal inheritance in
JavaScript.
