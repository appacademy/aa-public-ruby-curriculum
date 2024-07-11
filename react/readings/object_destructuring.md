# Object Destructuring

Object destructuring in ES6 makes it possible to extract parts of an object and
assign those parts to different variables. For example:

```javascript
const { a: x, b: y } = { a: 1, b: 2 };

x; //=> 1
y; //=> 2
```

This assigns `x` to the value that the `a` key is pointing to and `y` to the
value that the `b` key is pointing to. A shorthand is available if you want to
have the extracted variables have the same name as their associated keys:

```js
// note that the ordering is unimportant
const { b, a } = { a: 1, b: 2 };

a; //=> 1
b; //=> 2
```

It works by matching object properties, so we don't have to worry about order
and can choose exactly what we want. If we only wanted to save some properties,
we could do this:

```javascript
const { a, c } = { a: 1, b: 2, c: 3 };
a; //=> 1
c; //=> 3
```

It also works for nested objects:

```js
const { a: { b } } = { a: { b: 2 } };

a; //=> undefined (gasp)
b; //=> 2
```

To reference both `a` and the nested `b` from the example, we need to do:

```js
const { a } = { a: { b } } = { a: { b: 2 } };
a; //=> { b: 2 }
b; //=> 2
```

...or in a single assignment, not using shorthand assignment for `a`:

```js
const { a: a, a: { b } } = { a: { b: 2 } };
a; //=> { b: 2 }
b; //=> 2
```

This works even if we have a variable or function that returns an object.

```js
const multiply = n => ({ one: n, two: n * 2, three: n * 3 });

const { one, two, three } = multiply(10);
one; //=> 10
two; //=> 20
three; //=> 30
```

```javascript
this.props = {
  userId: 1,
  user: {
    fname: 'Ned',
    lname: 'Ruggeri'
  }
};

const { userId, user: { fname, lname } } = this.props;
userId; //=> 1
fname; //=> 'Ned'
lname; //=> 'Ruggeri'
```

It's much nicer to have these variables to refer to instead of having to call
`this.props.userId` every time we want the `userId`. Note that we're easily
extracting from nested objects too.

## Parameters

This gets to be really useful when we're passing objects around into different
functions. Each function can pull as its parameters exactly what it needs from
the object.

Let's say we've created this movie review object and we want to use it in a
few different places.

```javascript
const review = {
  id: 1,
  userId: 2,
  movie: 'Star Trek',
  comment: 'It was excellent!',
  rating: 5
};

const user = {
  id: 2,
  fname: 'Ned',
  lname: 'Ruggeri'
};
```

It would be nice to get some more information about our user. Let's extract the
`userId` from the review object and pass it to a function that will return a
user object by the user's id. Then let's print the user's name to the console.

```javascript
// printUser can receive an ob
const printReviewUser = ({ userId: id }) => {
  // code to fetch user object via userId
  const user = fetchUserById(id);
  console.log(`${user.fname} ${user.lname}`);
};

const printReview = ({ movie, comment, rating }) => {
  console.log(`Watched ${movie}`);
  console.log(`Gave it ${rating} stars!`);
  console.log(`${comment}`);
};

printReviewUser(review);
// Ned Ruggeri

printReview(review);
// Watched Star Trek
// Gave it 5 stars!
// It was excellent!
```

All we have to do is pass in the whole object! Each function can extract exactly
what it needs in its parameters and use just that.
