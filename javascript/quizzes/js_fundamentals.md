## Javascript Fundamentals Quiz

`1 * 34 + '0' - 100`
What does the above code evaluate to in Node?
- [ ] `"240"`
- [ ] `-66`
- [ ] `240`
- [ ] `NaN`
- [ ] The code will throw an error; you cannot add or subtract a string with an integer.

<details><summary>Answer:</summary>

`240`</details>
<details><summary>Explanation:</summary>

`1 * 34` evaluates to 34.  `34 + '0'` coerces the number `34` into the string `'34'` and then adds the two strings together giving you `'340'`.  Subtracting `100` off of the string `'340'` coerces the string `'340'` into a number and then subtracts 100 giving us `240`.</details>



```javascript
function isStringZero (item) {
  return item == "0";
}
```

We want the above function to return true only if the item is equal to the string `"0"`.
    Why will the code not work?
- [ ] The code will throw an error because `item` is not declared as a `var`
- [ ] Because the `==` operation is used instead of `===`, `isStringZero` will return true for the integer 0.
- [ ] The code will throw an error because javascript does not have a `==` operator.
- [ ] The function will work as expected.

<details><summary>Answer:</summary>

Because the `==` operation is used instead of `===`, `isStringZero` will return true for the integer 0.</details>
<details><summary>Explanation:</summary>

Double equals (`==`) does not check for type matching.  JS will attempt to coerce the two things into a common type before comparing them.  Tripe equals (`===`) will verify that the two things being compared have the same type without doing any coercing.</details>



```javascript
function printNSkip3(n) {
  let i = 0;

  while(i < n) {
    if(i % 3 === 0) {
      i += 1;
      break;
    }

    console.log(i);
    i += 1;
  }
}
```

We want a function that prints each number from 0 to `n`, except those which are divisible by 3. Why will the above function not work as planned?
- [ ] The function will not actually skip numbers divisible by 3 since the `break` will only break out of the `if` statement.
- [ ] The `break` statement will break out of the entire while loop and should be replaced with `continue`, so that it instead carries on to the next iteration.
- [ ] There is a syntax error in the `if` statement - javascript `if` statements must include an `else` clause.
- [ ] The function will work as expected.

<details><summary>Answer:</summary>

The `break` statement will break out of the entire while loop and should be replaced with `continue`, so that it instead carries on to the next iteration.</details>
<details><summary>Explanation:</summary>

`break` kicks us out of the loop completely instead of simply skipping an iteration!</details>



```javascript

function testFn () {
  const favoriteFood = "pizza";

  if (true) {
    let favoriteFood = "ramen";
    console.log(favoriteFood);
  }

  console.log(favoriteFood);
}
```

What is logged when we run `testFn`?
- [ ] "ramen", "ramen"
- [ ] "ramen", "pizza"
- [ ] "pizza", "pizza"
- [ ] The code will throw an error because `favoriteFood` was defined using `const` and cannot be overwritten in the scope of the function.

<details><summary>Answer:</summary>

"ramen", "pizza"</details>
<details><summary>Explanation:</summary>

When the first `console.log` runs, JS will look inside of the current scope for a variable called `favoriteFood`.  One exists in that scope itself so the `"ramen"` gets printed out.  When the second `console.log` runs, JS does the same thing and finds a `favoriteFood` variable that is set to `"pizza"`.</details>


```js
  // A. With an anonymous callback that takes no arguments
  [1,2,3,4,5].forEach(function() {
    console.log(el);
  });

  // B. With an anonymous callback that takes an element as an argument
  [1,2,3,4,5].forEach(function(el) {
    console.log(el);
  });

  // C. Using a block 
  [1,2,3,4,5].forEach( |el| { console.log(el); } );

  // D. Passing in a pre-defined function as a callback
  function printEl (el) {
    console.log(el);
  };
  [1,2,3,4,5].forEach(printEl);

  // E. Passing in an arrow function that takes an argument
  [1,2,3,4,5].forEach((el) => console.log(el));
```

Which of the following are valid ways to iterate over and print out each element in an array?
- [ ] A
- [ ] B
- [ ] C
- [ ] D
- [ ] E

<details><summary>Answer:</summary>

- B
- D
- E</details>
<details><summary>Explanation:</summary>

`forEach` takes a callback as an argument.  The callback needs to take an argument for the element in the array well be looking at.  There are no blocks in JS!</details>



```js
function times(n, callback) {
  let i = 0;

  while (i < n) {
    callback();
    i++;
  }
};

function dogTrick(dogName, trickVerb) {
  times(3, function () {
    console.log(`${dogName} is ${trickVerb}!`);
  });
};
```

Consider the above code. The anonymous function that prints out the dog trick is a: 
- [ ] closure
- [ ] function that captures `dogName` and `trickVerb`
- [ ] callback

<details><summary>Answer:</summary>

- closure
- function that captures `dogName` and `trickVerb`
- callback</details>
<details><summary>Explanation:</summary>

The anonymous function passed into the invokation of `times` closes over and captures the `dogName` and `trickVerb` arguments so that JS knows what they are inside of a new context. The function is also a callback because it is being passed in as an argument.  The `times` function will handle invoking the function that we are passing in.</details>
