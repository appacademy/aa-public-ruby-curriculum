# Basic AJAX

## The Idea

As you know, forms are submitted to the server in an HTTP request. A
successful response typically redirects the browser to request another
page. The browser fetches this and renders the new content.

This makes sense when you request a form from `/widgets/new` and
expect to be redirected to `/widgets/123` after submission. It makes a
lot less sense if you are on `/books/123` and you want to click a
button "Add to Bookshelf", which is just supposed to favorite this
book. In this case, you don't really expect to be redirected
anywhere. At most, you expect the "Add to Bookshelf" button to be
either (a) greyed out or (b) replaced with a new button, "Remove from
Bookshelf".

The way to achieve this functionality is to make the HTTP request *in
the background*. A browser request made this way is called an **AJAX
request**: Asynchronous JavaScript And XML. When the AJAX request
completes, the browser *will not* load a new page; it will stay on
the same page. Instead, on receipt of the HTTP response, the browser
will fire a JavaScript callback function.

In the case of the bookshelf example, once the server responds that
the book was added to the bookshelf, the JS callback might disable the
"Add to Bookshelf" button. Another alternative would be to swap the
button for a "Remove from Bookshelf" button.

**Side note**: XML used to be the standard data format for AJAX
responses, but most people use JSON now. Note that technically a response can be in any format; AJAX requests are just background HTTP
requests and servers can respond to an HTTP request with a document
of any format (text, JavaScript, HTML, JSON, pdf, etc).

## jQuery AJAX methods

Though AJAX functionality is provided by the browser, again we use
jQuery to paper-over differences in the various browsers and profit
from a nicely designed interface. The relevant methods are

* [$.ajax][ajax-doc] (low-level, complete interface)
    * I only use this one, actually.
* [$.get][get-doc] ("more convenient" function for GET requests)
* [$.post][post-doc] ("more convenient" function for POST requests)

Here is a fairly illustrative example:

```ruby
class WidgetsController < ApplicationController
  def show
    @widget = Widget.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @widget }
    end
  end

  def create
    @widget = Widget.create!(params[:widget])

    respond_to do |format|
      format.html { redirect_to widget_url(@widget) }
      # it is common to render a newly created object.
      # this is especially useful so that client-side code can
      # access the `id` attribute of the newly created widget.
      format.json { render json: @widget }
    end
  end
end
```

And here's some JavaScript that might make a request to the server:

```javascript
$.ajax({
  url: '/widgets/1.json',
  type: 'GET',
  success: function(widgetData) {
    console.log('Here are the fetched json parameters of the widget:');
    console.log(widgetData);
  },
  error: function(errMsg) {
    console.log(errMsg);
  }
});

$.ajax({
  url: '/widgets.json',
  type: 'POST',
  data: {
    widget: {
      name: 'The Best Widget',
      maker: 'The Widget King'
    }
  },
  success: function(widgetData) {
    console.log('Widget created!');
    // `create` action should `render json: @widget`
    // this gives the client access to the `id` attribute issued by
    // the server.
    console.log('issued id: ' + widgetData.id);
  },
  error: function(errMsg) {
    console.log(errMsg);
  }
});
```

Note that `$.ajax` accepts an options object and will call the functions defined in `success` and `error` as callbacks depending upon whether the request was successful (response has HTTP status 2xx) or not (any other HTTP status).

[ajax-doc]: http://api.jquery.com/jQuery.ajax/
[get-doc]: http://api.jquery.com/jQuery.get/
[post-doc]: http://api.jquery.com/jQuery.post/
