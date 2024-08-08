# jQuery Quiz


<quiz>
  <question multiple>
    <p>What is the difference between `document.getElementById("cat")` and `$('#cat')`?</p>
    <answer correct>`document.getElementById("cat")` returns an HTML element and `$('#cat')` returns a jQuery object</answer>
    <answer>`$('#cat')` executes more quickly than `document.getElementById("cat")`</answer>
    <answer>No difference</answer>
    <answer correct>You need to have JQuery loaded in order to run `$('#cat')`, and you don't for `document.getElementById("cat")`</answer>
    <explanation>`document.getElementById` is Vanilla Javascript and will return an HTML Element.  `$()` is jquery and will return a jquery object. To use `$()` you have to load jQuery.</explanation>
  </question>
</quiz>



```javascript
$('ul.test').on('click', 'li', () => {
  alert('!!!');
})
```

<quiz>
  <question>
    <p>The above code is part of a script loaded by an html page. Assume that the html page and the rest of the script are syntactically correct and bug-free. What do these lines of code do?</p>
    <answer correct>they alert "!!!" when an `li` inside of a `ul` with class `test` is clicked</answer>
    <answer>they fail silently</answer>
    <answer>they alert "!!!" when an `li` is clicked</answer>
    <answer>they alert "!!!" when an `li` inside of a `ul` is clicked</answer>
    <answer>they alert "!!!" when a `ul` is clicked</answer>
    <explanation>We are setting up and event listener on a `ul` with a class `test`.  It is listening for the "click" event on a child `li` element.  When the click happens, the callback will be invoked which will alert "!!!"</explanation>
  </question>
</quiz>



```javascript
$( () => {
  alert('!!!')
});
```

<quiz>
  <question>
    <p>The above code is in a .js file that is loaded by a website. When will the alert happen?</p>
    <answer>When the file is fully loaded</answer>
    <answer correct>When the document has loaded, including its dependencies </answer>
    <answer>As soon as it is interpreted or compiled</answer>
    <answer>When a user clicks anywhere on the page</answer>
    <explanation>We do not specify an element on the page, therefore the callback will be invoked as soon as the document and its dependencies have loaded. This is shorthand for the `$(document).ready(cb)` which will only execute `cb` once the page DOM is "ready" to receive JS code to execute.</explanation>
  </question>
</quiz>



<quiz>
  <question>
    <p>If you wanted to select all of the `ul`s of class `abc`, how would you do so using jQuery?</p>
    <answer>`$('ul').class('abc')`</answer>
    <answer>`document.getElementById(abc)`</answer>
    <answer correct>`$('ul.abc')`</answer>
    <answer>`$('ul>abc')`</answer>
    <explanation>The `.` inside of a string given to the `$()` as an argument signifies that we are looking for an element based on the class name given. So `$('.hello')` would mean we are looking for elements with a class name of `hello`.  `$('li.hello')` would mean we are looking for `li` elements that has a class name of `hello`.</explanation>
  </question>
</quiz>



<quiz>
  <question>
    <p>Fill in the blanks: ______ is the way to access a data attribute that has been set with ______.</p>
    <answer correct>`$li.data("number");`, `$li.data("number", number);`</answer>
    <answer>`$li.data("number", idx);`, `$li.data("number");`</answer>
    <answer>`$li.data("test");`, `$li.data("testing", idx);`</answer>
    <answer>`$li.attr("number", idx);`, `$li.data("number", idx);`</answer>
    <answer>`$li.data("number", idx);`, `$li.data("number", idx);`</answer>
    <explanation>`$li.data("number");` will allow us to see what the `"number"` attribute is set to and `$li.data("number", number);` will set the `"number"` attribute to some `number`.</explanation>
  </question>
</quiz>