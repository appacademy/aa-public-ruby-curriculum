# Window API


## Overview of the Browser Object Model (BOM)

The Browser Object Model (BOM) allows JavaScript to effectively "talk to" a 
browser. The way this model is implemented is by providing access to the global 
variable `window`. The `window` is just a POJO(Plain Old JavaScript Object), 
meaning that you can access functions and properties and even assign new 
key-value pairs onto the `window`. The `window` object is also available in all 
browsers. 

### How to Use The Window Object

While in the Developer Tools you can interact with the `window` global object, 
and see a list of properties available, by typing `window` in the console. 

Whenever any JavaScript is run within your browser it uses the `window` as the 
global context. This goes for any JavaScript code run within your console too. 
For this reason it is redundant to include the word `window` when running a 
function that already has the context of `window`. 

```js
// if you run this in the console `this` is the global context of the window
function testMe (testing) { console.log(this) }

window.testMe() //=>  Window

//don't need to reference `window` because we already defined the function on there!
testMe() //=>  Window
```

#### Using the Window to Improve User Experience

As a developer having access to the `window` object give us a lot of power over 
a user's experience. For example- you can set the height of the browser's 
current window, create a popup alert, even scroll to the bottom or top of the 
page for a user. Using the `window` properly can really enhance a user's 
experience on your website. 

For a list of all of the `window`'s properties feel free to reference the [documentation](https://developer.mozilla.org/en-US/docs/Web/API/Window).