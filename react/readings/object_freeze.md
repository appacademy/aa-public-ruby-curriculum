# Object.freeze

As you saw in the Redux Reducer reading, a reducer must never mutate its
arguments. If the state changes, the reducer must return a new object.

Javascript provides us with an easy way to enforce this. Read up on
[Object.freeze][obj-freeze]. It prevents new properties from being added to an
object, and also prevents properties currently on an object from being altered
or deleted. Essentially, it renders an object immutable, which is exactly what
we want.

By calling `Object.freeze(state)` at the top of every reducer, we can ensure
that the state is never accidentally mutated. For example, this is what our
farmer reducer from our fruit stand app would look like:

```js
const farmersReducer = (state = {}, action) => {
  Object.freeze(state); // freezes the state
  switch (action.type) {
    case "HIRE_FARMER":
      let nextState = Object.assign({}, state);
      const farmer = {
        id: action.id,
        name: action.name,
        paid: false
      };
      nextState[action.id] = farmer;
      return nextState;
    case "PAY_FARMER":
      let nextState = Object.assign({}, state);
      let farmer = nextState[action.id];
      farmer.paid = !farmer.paid;
      return nextState;
    default:
      return state;
  }
};

export default farmersReducer;
```

Now we can be certain that we won't mutate the state.

Here's an example.

```js
const people = { farmers: { name: "Old MacDonald" } };
Object.freeze(people);
```

When you try to mutate an object that you _froze_ by modifying a property, it
will be prevented.

```js
people.farmers = { name: "Young MacDonald" };
people; //=> { farmers: {name: 'Old MacDonald' } }
```

**NB: This is not a deep freeze.** Nested objects can still be mutated, so be
careful.

Here's an example of this:

```js
people.farmers.name = "Young MacDonald";
people; //=> { farmers: {name: 'Young MacDonald' } }
```

[obj-freeze]:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
