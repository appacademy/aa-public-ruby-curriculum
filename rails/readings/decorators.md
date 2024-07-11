# Decorators

The [Decorator Pattern][decorator-pattern] is a design pattern for adding new
functionality to an object without altering its class. In languages like Ruby,
this is typically accomplished by creating a new class that *wraps* an instance
of another class. It then defines new methods to augment the functionality of
the wrapped object, while delegating calls to all other methods to that object
(an easy feat in Ruby with `method_missing`).

## Decorators in Rails

In Rails, decorators are great for enhancing model objects with functionality
that is outside the concerns of the model class (e.g., view/presentation logic).
Models should be concerned with data and business logic, not with how values
should be displayed in a view. With decorators, you can add methods to format
attributes or help with forms, all without cluttering your model class.

## Draper

An easy way to create a decorator class in Rails is to use the [Draper
gem][draper]. Install it, then create the directory __app/decorators__. Next
create a class named with the pattern `ModelNameDecorator` that inherits from
`Draper::Decorator`. Lastly, call the `delegate_all` macro inside your decorator
class. This tells Draper to delegate calls to any methods not defined in your
decorator class to the instance it wraps.

## Writing Your Decorator

Once you have your decorator class set up, you can start adding methods. To
access the wrapped model instance, call `object`. For instance, here's how you
would add a method to format the model's `created_at` nicely:

```ruby
def formatted_created_at
  object.created_at.strftime('%b %-d, %Y')
end
```

If you need to access a URL or view helper method, call it on the `h` object, as
in `h.cat_url(object)`.

Here's an example `CatDecorator` class that could be useful in the Ninety-Nine
Cats project:

```ruby
class CatDecorator < Draper::Decorator
  delegate_all

  def color_options
    {}.tap do |color_options|
      object.class.const_get(:ALLOWED_COLORS).each do |color|
        color_options[color] = color.capitalize
      end
    end
  end

  def color_selected(color)
    object.color == color ? ' selected="selected"' : ''
  end

  def form_url
    object.persisted? ? h.cat_url(object) : h.cats_url
  end

  def sex_checked(sex)
    object.sex == sex ? ' checked="checked"' : ''
  end

  def sex_options
    object.class.const_get(:SEXES)
  end

  def submit_text
    object.persisted? ? 'Edit Cat' : 'Add Cat'
  end
end
```

## Using Your Decorator

In order to use your decorator, you'll need to convert a plain model instance to
a decorated instance. Draper makes this easy. Just call the `decorate` method on
a model or a collection of models:

```ruby
@cat = Cat.find(params[:id]).decorate
```

Then in your view, you can access methods from the decorator just like you
access regular model methods. Here are some examples:

```erb
<form action="<%= @cat.form_url %>" method="post" accept-charset="utf-8"
      enctype="multipart/form-data">
```

```erb
<select name="cat[color]" id="cat_color">
  <option></option>
  <% @cat.color_options.each do |value, name| %>
    <option value="<%= value %>"<%= @cat.color_selected(value) %>>
      <%= name %>
    </option>
  <% end %>
</select>
```

```erb
<input type="submit" value="<%= @cat.submit_text %>">
```

## Decorate All the Things!

Decorators can be cleaner and more modular than the alternatives for writing
view helper code. Adding conditional logic directly to your views or to helper
methods works fine, but neither is as object-oriented as decorator methods.

## Resources

* [RailsCast on Draper][draper-rails-cast]

[decorator-pattern]: http://en.wikipedia.org/wiki/Decorator_pattern
[draper]: https://github.com/drapergem/draper
[draper-rails-cast]: http://railscasts.com/episodes/286-draper
