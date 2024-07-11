# A Basic AJAX Example

```js
const id = "bcb83c4b54aee8418983c2aff3073b3b";
const city = "London,UK";

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${id}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(response);
    }
  })
  .then(data => {
    console.log("Success!");
    console.log(data);
  })
  .catch(errorResponse => {
    console.log("Failure!");
    console.error(errorResponse);
  });
```

To run the above code in your browser, save it to a __weather.js__ file. Then
create an __index.html__ in the same directory with this content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <script type="text/javascript" src="./weather.js"></script>
  </head>
  <body></body>
</html>
```

Load the __index.html__ in your browser with the console open so you can see the
results!
