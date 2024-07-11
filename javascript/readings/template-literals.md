# Template Literals

Template Literals are a new feature in ES6.

In JavaScript, template literals are strings that allow for a couple of convenient features such as string interpolation (much like in Ruby) and multi-line strings (much like a `heredoc`). Template literals are defined using the grave character, a.k.a. backticks.

## Interpolation
To use template string interpolation, surround your string in backticks and your interpolated values with `${}`:

Javascript:
```javascript
  var name = 'Brooke';
  var favoriteFood = 'pizza';

  console.log(`Hi, my name is ${name} and my favorite food is ${favoriteFood}!`);
```

As we can see in the above example, the values of the variables are being interpolated into the string that is being created with the template literal. Expressions will also be evaluated if they are placed within the curly braces.


## Multi-line Strings
We can also use template literals to create multi-line strings:

```javascript
const superLongString = `I am an example
of an extremely long string
ok maybe not that long,
but certainly longer than many other strings.
- Oscar Wilde`;

```
