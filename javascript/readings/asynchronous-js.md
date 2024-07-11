# Asynchronous Client-side Code

## `setInterval`: a case study

When your JavaScript code is being run in the browser, it blocks the browser
from doing other things. This includes running other JS code, making new browser
requests, rendering HTML, and even scrolling. For instance, try this:

```html
<html>
  <body>
    <script>
      while (true) {
        console.log("Help! I'm stuck in a loop!");
      }
    </script>

    <h1>This heading never appears!</h1>
  </body>
</html>
```

Your tab should be entirely locked up; you'll have to close it. Notice the `h1`
tag is never rendered; the browser stopped rendering the HTML to run the script,
but the script never finished!

However, JS engines give you a way around this. Replace the contents of the
above script with the function below:

```javascript
window.setInterval(function () {
  // call this once per second
  console.log("Whee! I'm in a loop but still working!");
}, 1000);

console.log("Timer set!");
```

The `window.setInterval` method schedules a timer that fires once every 1000
milliseconds. When the timer fires, our function is called. This approximates a
loop, but it is **non-blocking**, i.e., it doesn't stop other browser processes
from running. 


Because `setInterval` simply sets a timer that runs in the background, it
completes almost instantly. As a result, `console.log("Timer set!")` is called
immediately after `setInterval` runs and the rest of the document continues to
load. Then, every 1000 milliseconds, the callback is invoked by the JS engine. 

If you wonder how you could possibly write `window.setInterval` in pure JS, the
answer is that you can't. The browser needs to provide that functionality. This
is an example of a browser API that allows us to do things that pure JavaScript
can't. We can **ask** the browser to set a timer through the JavaScript API, but
we couldn't write it ourselves in JavaScript.

For even better animation performance, try using `requestAnimationFrame` instead
of `setInterval`. This function takes a single callback as an argument and
executes that function when the browser is ready. Inside that callback you
should then make an additional call to `requestAnimationFrame`.

```javascript
  function animate() {
    game.advanceState();
    game.clearScreen();
    game.drawEverything();
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
```

Even though it might look like `animate` will get triggered instantly, it won't.
Instead, the browser intelligently calls `animate` around 60 times per second,
perfect for animations. You can read more about `requestAnimationFrame`
[here][request-animation-frame].

[request-animation-frame]:https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame

## Callbacks and event handlers

An idiom from our Ruby game code is to enter a loop, request user
input, and then pass the input to the game. The closest thing in Javascript is the synchronous `prompt` command:

```javascript
// wait for input
constant userInput = window.prompt();

game.makeMove(userInput);
```

**Don't use prompt**. This pops up an input box for the user to type
in text. But because the `prompt` waits for user input, it blocks the
**entire** page. Nothing at all can happen (they can't even
scroll). This is bad.

Let's consider an alternative approach that runs **asynchronously**. We will register (or **bind**) a function (called a **handler**) to be called by the browser when an **event** occurs. Here's an example:

```html
<html>
  <head>
    <title>A page for you!</title>
  </head>

  <body>
    <input type="text" id="text-field" value="">
    <button id="submit-button">Submit me!</button>

    <script type="application/javascript">
      const textField = document.getElementById('text-field');
      const button = document.getElementById('submit-button');

      const showValue = () => {
        let inputValue = textField.value;
        alert(inputValue);
      }

      button.onclick = showValue;
    </script>
  </body>
</html>
```

JavaScript lets us ask the browser to notify us of **events**. Here, we're
asking the browser to listen for the `onclick` event of `button`. When a user
presses the mouse while it is hovering over the `button`, the browser interprets
this as an `onclick` of the button. It then calls any JavaScript code that has
been **registered** as a **handler** for the event, i.e., `showValue`.

Our handler extracts the value of the `textField` and gives it to `alert`.

Paste this example into an `.html` file, open it in your browser and try it out!

## Resources

* [window.setInterval][set-interval-mdn]
* [callbacks][js-is-sexy-callbacks]
* [window.prompt()][window-prompt]
* [jQuery .on()][jquery-on]

[set-interval-mdn]: https://developer.mozilla.org/en-US/docs/DOM/window.setInterval
[js-is-sexy-callbacks]: https://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/
[window-prompt]: https://developer.mozilla.org/en-US/docs/DOM/window.prompt
[jquery-on]: http://api.jquery.com/on/
