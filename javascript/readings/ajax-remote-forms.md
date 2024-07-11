# AJAX Remote Forms

Using AJAX, let's write an event handler that, when the user clicks the
"submit" button, will submit the form data in the background.

jQuery comes with a `serialize` method which translates a set of form elements as a URL encoded string. In this case the `name`/`value` attributes of each `input` element within our form serve as key/value pairs. Since HTTP request data is just structured text which can be decoded on the server side, this will work quite nicely.

Let's see it go!

```html
<!-- notice how we don't set the action/method on the form tag -->

<form id="cat-form">
  <input type="text" name="cat[name]">
  <input type="text" name="cat[color]">

  <input type="submit">
</form>

<script>
  $('#cat-form').on('submit', (event) => {
		// Lookup `preventDefault`; it stops the browser's default action,
		// which is to make a synchronous submission of the form.
		// http://api.jquery.com/category/events/event-object
		event.preventDefault();

		// As a shortcut, when jQuery calls your event handler, it sets
		// `this == event.currentTarget`.

		var formData = $(event.currentTarget).serialize();

		// If you filled out name "Gizmo" and color "Black", then
		// formData == "cat%5Bname%5D=Gizmo&cat%5Bcolor%5D=Black"

		$.ajax({
			url: '/cats',
			type: 'POST',
			data: formData,
			success() {
				console.log('Your callback here!');
			}
		});
  });
</script>
```

[jquery-serialize-doc]: http://api.jquery.com/serialize

### Getting input values in JS `Object` format

Hmm, our `formData` is a little bit hard to read and if we want to add any additional data we will either need to add `hidden` inputs or append more URL encoded strings to our formData. It's great to get a URL encoded representation of the input values,
but it's also a little frustrating. URL encoding is difficult for us
to manipulate on the client side; just about the only thing we can do
with it is to submit it to the server.

Fortunately, `$.ajax` accepts `Object` and `Array` data types for its `data` property. We can use the
[serializeJSON][serializeJSON] jQuery plug-in to add a `serializeJSON` method to jQuery. It creates a JavaScript
object following the Rails parameter conventions.

Using the same form as the above example, we can now get `formData` in the following way:

```js
var formData = $(event.currentTarget).serializeJSON();

/* formData is now an easy-to-use POJO
formData == {
  cat: {
    name: 'Gizmo',
    color: 'Black'
  }
}
*/
```

You can get Rails to automatically load the serializeJSON plugin by
including the [serialize_json-rails][serializeJSON-rails] gem:

```ruby
gem 'serialize_json-rails'
```

and then load the file (after jQuery) in app/assets/javascripts/application.js:

```js
//= require serialize_json
```

[serializeJSON]: https://github.com/marioizquierdo/jquery.serializeJSON
[serializeJSON-rails]: https://github.com/travisR004/serialize_json-rails

## Authenticity token

What about the authenticity token? Rails will automatically include a
JavaScript library named `rails.js` in your `application.js`
file. Among a number of other things, this will install a
`$.ajaxPrefilter`; this filter gets run before every AJAX request.

The filter ([`rails.CSRFProtection`][rails-csrf-protection]), will
look up the CSRF token (which Rails stores in a `meta` element in the
`head`), and add this as a header to send with the request.

Should you ever explicitly need the CSRF token, you can do what
`rails.js` does to look it up:

```js
$('meta[name="csrf-token"]').attr('content');
```

[rails-csrf-protection]: https://github.com/rails/jquery-ujs/blob/master/src/rails.js#L55
