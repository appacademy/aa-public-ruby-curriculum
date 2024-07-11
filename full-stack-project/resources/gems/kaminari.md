# Kaminari

## What's a Kaminari?
If, like most modern web-apps, your
application is serving long lists of cat pictures, you aren't going to
want to send them all at once for fear of clogging the internet tubes.
An easy way to deal with large amounts of content is to paginate it. 
[Kaminari][kaminari-docs] is a gem that will help you with this.

[kaminari-docs]: https://github.com/amatsuda/kaminari

## Installation
`gem 'kaminari'`
Congratulations! Now, in your controller, you can specify what pages you
would like your controller to send and how many models you would like to
send per page. Just use the provided methods at the end of your query
(they are defined on ActiveRecord::Relation).


```ruby
# in cats_controller.rb
def index
    @cats = current_user.cats.page(params[:page])
end
```


See the docs to set up your own page configuration.

If you check the server logs, the page method sets a limit on the query size, and an offset which
is your per_page * page_number.

See the docs for integration with Rails.

## Integration with Backbone.js

It takes a small amount of work to get your Backbone collections to play nicely with
Kaminari.

### Fetch Pages
Specify your page in your fetch calls using the data option:

```javascript
this.collection.fetch({
    remove: false, // merge this page with the rest of the collection
    data: { page: 5 },
    success: function() {}
});
```
If you want to build your collection rather than replace it with the
most recently fetched paged, don't forget the `remove: false` option.

### Track Current Page
It is helpful to pass along a reference to what page number you are on,
and what the total page number is. Similarly you can pass along the
total number of models, etc.

```ruby
# controller.rb
def index
    @cats = current_user.cats.page(params[:page])
    render :json => {
        :models => @cats,
        :page => params[:page],
        :total_pages => @cats.total_pages # thanks kaminari!
    }
end
```

Since you're changing the structure of your API's repsonse, you're going
to need to account for this in your Collection's parse method:

```javascript
//cats.js
SweetApp.Collections.Cats = Backbone.Collection.extend({
    parse: function(response) {
        this.page = response.page;
        this.total_pages = response.total_pages;
        // deal with any nested resources on response.models and return
        return response.models;
    }
});
```
## Infinite Scroll
With the above set up properly, providing your users with an endless
stream of cats should be pretty easy. Just set up a listener for scrolls
to the end of the page, if your collection's page is < the total number
of pages, fetch the next one.
