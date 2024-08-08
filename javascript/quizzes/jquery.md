# jQuery Quiz


What is the difference between `document.getElementById("cat")` and `$('#cat')`?
- [ ] `document.getElementById("cat")` returns an HTML element and `$('#cat')` returns a jQuery object
- [ ] `$('#cat')` executes more quickly than `document.getElementById("cat")`
- [ ] No difference
- [ ] You need to have JQuery loaded in order to run `$('#cat')`, and you don't for `document.getElementById("cat")`

<details><summary>Answer:</summary>

- `document.getElementById("cat")` returns an HTML element and `$('#cat')` returns a jQuery object
- You need to have JQuery loaded in order to run `$('#cat')`, and you don't for `document.getElementById("cat")`</details>

<details><summary>Explanation:</summary>

`document.getElementById` is Vanilla Javascript and will return an HTML Element.  `$()` is jquery and will return a jquery object. To use `$()` you have to load jQuery.</details>



```javascript
$('ul.test').on('click', 'li', () => {
  alert('!!!');
})
```

The above code is part of a script loaded by an html page. Assume that the html page and the rest of the script are syntactically correct and bug-free. What do these lines of code do?
- [ ] they alert "!!!" when an `li` inside of a `ul` with class `test` is clicked
- [ ] they fail silently
- [ ] they alert "!!!" when an `li` is clicked
- [ ] they alert "!!!" when an `li` inside of a `ul` is clicked
- [ ] they alert "!!!" when a `ul` is clicked

<details><summary>Answer:</summary>

they alert "!!!" when an `li` inside of a `ul` with class `test` is clicked</details>
<details><summary>Explanation:</summary>

We are setting up and event listener on a `ul` with a class `test`.  It is listening for the "click" event on a child `li` element.  When the click happens, the callback will be invoked which will alert "!!!"</details>



```javascript
$( () => {
  alert('!!!')
});
```

The above code is in a .js file that is loaded by a website. When will the alert happen?
- [ ] When the file is fully loaded
- [ ] When the document has loaded, including its dependencies 
- [ ] As soon as it is interpreted or compiled
- [ ] When a user clicks anywhere on the page

<details><summary>Answer:</summary>

When the document has loaded, including its dependencies </details>
<details><summary>Explanation:</summary>

We do not specify an element on the page, therefore the callback will be invoked as soon as the document and its dependencies have loaded. This is shorthand for the `$(document).ready(cb)` which will only execute `cb` once the page DOM is "ready" to receive JS code to execute.</details>



If you wanted to select all of the `ul`s of class `abc`, how would you do so using jQuery?
- [ ] `$('ul').class('abc')`
- [ ] `document.getElementById(abc)`
- [ ] `$('ul.abc')`
- [ ] `$('ul>abc')`

<details><summary>Answer:</summary>

`$('ul.abc')`</details>
<details><summary>Explanation:</summary>

The `.` inside of a string given to the `$()` as an argument signifies that we are looking for an element based on the class name given. So `$('.hello')` would mean we are looking for elements with a class name of `hello`.  `$('li.hello')` would mean we are looking for `li` elements that has a class name of `hello`.</details>



Fill in the blanks: ______ is the way to access a data attribute that has been set with ______.
- [ ] `$li.data("number");`, `$li.data("number", number);`
- [ ] `$li.data("number", idx);`, `$li.data("number");`
- [ ] `$li.data("test");`, `$li.data("testing", idx);`
- [ ] `$li.attr("number", idx);`, `$li.data("number", idx);`
- [ ] `$li.data("number", idx);`, `$li.data("number", idx);`

<details><summary>Answer:</summary>

`$li.data("number");`, `$li.data("number", number);`</details>
<details><summary>Explanation:</summary>

`$li.data("number");` will allow us to see what the `"number"` attribute is set to and `$li.data("number", number);` will set the `"number"` attribute to some `number`.</details>