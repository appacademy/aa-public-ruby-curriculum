#jQuery UI

##Introduction
[jQuery UI] [jquery_ui] is a rather large library that extends the base jQuery to
provide numerous useful user interaction functionalities. Using this library you
can allow users to resize, select, drag, sort, and drop dom elements. It also provides
various widgets like autocompleting text fields, progress bars, etc.

These sorts of UI flourishes, while they may seem small, can have a huge effect on a 
potential employer's perception of your app.

##Installation
You have several good alternatives when it comes to using jQuery UI in your project:

#### Manual
Go to [jQuery UI] [jquery_ui] and download the stable version. They also provide a custom download,
if you know exactly which functionalities you want (some are dependent upon each other). 
There are also various css themes should you choose to use them. Otherwise you can just select
which files you want to use from the entire library. The javascript files are located in the ui
subdirectory.

#### Autopilot
Install the [jquery-ui-rails gem][jquery-ui-rails]. Add it to your
Gemfile and application manifests according to the instructions in their
repository. Then you're good to go!

Caution! jQuery UI is a bit bloated, so if you want to only use specific
parts, check out the [documentation][jquery-ui-specific-modules] on how
to pick and choose.

You'll look pretty silly requiring the whole library if you don't need
it.

[jquery-ui-rails]: https://github.com/joliss/jquery-ui-rails
[jquery-ui-specific-modules]: https://github.com/joliss/jquery-ui-rails#require-specific-modules

##Use
You enable jQuery UI functionalities by using jQuery to select your desired elements and calling 
jQuery UI functions on them. You will often pass in an options object which can further configure
the functionality as well as define callbacks at numerous events in the interaction.

```javascript
$(".tiles").draggable({

  drag: function() {
    console.log($(this).position()); // this is set to the dom element
  },

  drop: function() {
    console.log("Landed at: " + $(this).position());
  }

});

```

You will definitely want to refer to the [API Documentation] [jquery_docs].

##Interactions
The fun stuff!

###Draggable
Allows users to click and drag your DOM elements. Options include specification of what
the element is contained in and whether the element should snap to others, among
many others. This is implemented by setting the element's `position: relative;` and adding
`left` and `top` css attributes. If you want to persist the layout through sessions you could
save these coordinates as attributes on your model.  
While the element is being dragged, it is referred to as a helper. You can set the class of the
helper element if you want it to be slightly transparent.  
Events that callbacks can be defined on include the start, stop, and duration dragging.

###Droppable
Goes hand in hand with draggable. Allows DOM elements to 'accept' draggable objects, from which
you can define event callbacks. You can also make sure elements are only able to be dropped in these containers.

###Sortable
Allows user to drag and sort lists or grids. Useful for making a more constrained draggable-droppable UI
setup. Think [Trello][trello]



[jquery_ui]: http://jqueryui.com/
[jquery_docs]: http://api.jqueryui.com/
[trello]: http://trello.com/
