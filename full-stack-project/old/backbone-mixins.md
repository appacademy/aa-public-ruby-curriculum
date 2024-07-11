# Backbone Mixin Pattern

As you write your Backbone app, you may find that some components (models and
views, especially) share significant chunks of functionality. If this rings a
bell, you might want to extract some of that behavior. One way to do this is by
creating a **mixin** (of which Ruby modules are one example). In JavaScript, we
can represent a mixin simply as an object that contains the functions or
properties we want to share. You can find examples in our [Trello
solution][trello-mixin] and in the [Like button demo][likes-mixin].

[trello-mixin]: https://github.com/appacademy/TrelloClone/blob/master/solution/app/assets/javascripts/utils/ord_view.js
[likes-mixin]: https://github.com/appacademy/like-button-demo/blob/master/app/assets/javascripts/util/likable.js

```js
AppName.Mixins.MixinName = {
  foo: function () {
  },

  // ...
}
```

Armed with our new mixin, we're ready to extend our Backbone model or view.
[Backbone.extend][backbone-extend] takes two arguments: `properties` and `classProperties`. The
first argument, `properties`, will be added to the Backbone component's
`prototype` (effectively adding instance methods--think Ruby `include`).
`classProperties` will be added to the constructor (as class methods, like Ruby
`extend`). But if we simply pass in our mixin as the `properties` object,
there's no room left for any other instance methods!  Luckily there's a
workaround:

[backbone-extend]: http://backbonejs.org/#Model-extend

```js
AppName.MyNewView = Backbone.View.extend(
  _.extend({}, mixinOne, mixinTwo, {
    // instance properties
  })
);
```

`_.extend` takes a target object as its first argument. It then iterates over
the remaining arguments, copying their properties to the target. Finally, it
returns the target object (which will be passed in as the `properties` argument
to `Backbone.extend`). The end result is that our `MyNewView` class gets all the
instance properties and methods from our mixins. **NB:** Beware of namespace
collisions. If you try to extend mixins that share property names, the property
from the mixin extended **last** will be used.
