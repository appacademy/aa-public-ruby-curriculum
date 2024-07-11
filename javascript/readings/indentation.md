# Writing Clean Javascript

Would you rather debug this:

```js
function isOdd(num) {
return num%2 === 1;
}
function foo(num) {
if (num%3 === 0) {
for (let x = 1; x<num; x++) {
if (isOdd(x^1010)) {
console.log(x);
} else {
console.log('write clean code');
}
}
}
return 'write clean code';
}
foo(9);
```

or this:

```js
function isOdd(num) {
  return num % 2 === 1;
}

function foo(num) {
  if (num % 3 === 0) {
    for (let x = 1; x < num; x++) {
      if (isOdd(x ^ 1010)) {
        console.log(x);
       } else {
        console.log('write clean code');
      }
    }
  }

  return 'write clean code';
}

foo(10);
```

Lesson: **Always style, indent and match your brackets and curly-braces.**

Pro-tip: Write your brackets and curly braces first, then fill in the code
block.
