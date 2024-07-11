# Tagged Template Literals

Putting a template literal directly after a function will trigger a function
call.

```js

function yodaSays(strings, ...values) {
  console.log(strings); // ['',' loves ', '!']
  console.log(values); // ['Sarah', 'sushi']
  return `${values[1]}, ${values[0]} ${strings[1]}${strings[2]}`;
}

let name = 'Sarah', food = 'sushi';
let str = yodaSays `${name} loves ${food}!`;
console.log(str) // sushi, Sarah  loves !
```

The above code is probably pretty puzzling. `yodaSays` is going to be invoked on
the line where we assign the `str` variable because JavaScript will invoke a
function if a template literal is directly after it.

The really interesting part is the arguments passed to `yodaSays`. Instead of
passing the entire `Sarah loves sushi!` string as an argument, the string is
split into substrings (split on the curly brace delimiters) and the substrings
are passed as an array into the first argument of the function. Note that when
an interpolated value starts or ends a template string, an empty string is added
in front of or behind it.

 The interpolated values are passed as the remaining arguments, where we use the
 rest operator `...values` to capture them into a second array. We can then
 rearrange the string however we like using our `strings` and `values`
 arguments.

 A more real-world example might be using template literal taggings to rearrange
 the markup of an HTML string.

For more info, check out [this resource][mdn-literals].

[mdn-literals]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
