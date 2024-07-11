# Your First AJAX Request

You're going to dive more into AJAX in a bit, but we need to give you a taste
before building jQuery lite in a few days.

## Part 1: Up and Running

Download [the skeleton][skeleton]. Open `index.html` in the browser and pop open
the console (command + option + J or command + option + I). You should see a
welcome message.

## Part 2: AJAX of One Trade

Write an AJAX request underneath the top `console.log` (check out the Simple
AJAX Example reading for reference). Some guidelines:

- It should be a GET request.
- It should get the New York weather from this url:
  `http://api.openweathermap.org/data/2.5/weather?q=new%20york,US&appid=bcb83c4b54aee8418983c2aff3073b3b`
  - If the request fails, sign up for your own API key
    [here][weather-api-signup] and stick that key in place of
    `bcb83c4b54aee8418983c2aff3073b3b`.
- It should take a success callback
  - In the success callback, `console.log` out what the weather is.

Write another console.log at the bottom of the file (outside of the AJAX
request). Your file should have this rough structure:

```js
console.log("Hello from the JavaScript console!");

// your AJAX request
// --> including a console.log for the data in the success callback

// another console.log down here
```

Notice the order that the `console.log`s run.

Make sure you can answer the following questions:

1.  When does the request get sent?
2.  When does the response come back?
3.  What's the current weather in New York?
4.  Did the page refresh?
5.  How could we use different HTTP methods in our request?

[weather-api-signup]: http://home.openweathermap.org/users/sign_up
[skeleton]:
  https://assets.aaonline.io/fullstack/javascript/homeworks/first_ajax/skeleton.zip?raw=true
