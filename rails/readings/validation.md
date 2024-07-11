# Validation

For sundry reasons, data saved to the database needs to be validated. Model
level validations are the most common, but validations can be created on the
controller level or on the client side in JavaScript. Database constraints can
also be added to the database to prevent bad input.

Performing the validations at the model level has these benefits:

* Database agnostic
* Convenient to test and maintain
* Nice, specific, per-field error messages
* Avoids reliance on database constraints (which throw nasty errors)

ActiveRecord::Base instance methods that run validations:

* `#create`
* `#create!`
* `#save`
* `#save!`
* `#update`
* `#update!`

## Model-Level Validation

Let's consider a `User` class with basic validations for username and password.

```ruby
class User < ApplicationRecord
  validates :username, :password, presence: true
  validates :password, length: { minimum: 6 }
end
```

So if you run

```ruby
u = User.new(username: 'Billy Bob')
u.save
```

`u.save` will run validations. After completing the validations the `u.errors`
attribute will contain a hash with all of the errors, by attribute.

```
=> { password: ["can't be blank", "is too short (minimum is 6 characters)"]}
```

## `flash` vs `flash.now`

Data stored in `flash` will be available to the next controller action and can
be used when redirecting.

Data stored in `flash.now` will only be available in the view currently being
rendered by the `render` method.

[Flash Hash][flash-api]

[flash-api]: http://api.rubyonrails.org/classes/ActionDispatch/Flash/FlashHash.html

## Rendering Errors

One common way to render errors is to store them in `flash[:errors]` after
running validations. You can then display them on the page by iterating through
each of the errors. Note that `flash` can be used as a hash and `:errors` is
just an arbitrary--though semantically meaningful!--key.

If you follow the pattern of always storing `obj.errors.full_messages` in
`flash[:errors]`, then you can use a partial to render the flash errors on each
form.

### Controller

Let's make a simple controller that will store any validation errors in
a `flash[:errors]` array.

```ruby
def create
  @user = User.new(params[:user])
  if @user.save
    flash[:notice] = 'Success!'
    redirect_to user_url(@user)
  else
    # sweet! now flash.now[:errors] will be full of informative errors!
    flash.now[:errors] = @user.errors.full_messages
    render :new
  end
end
```

### View

When the new or edit pages are rendered, also render a list of all of the
errors, if any.

```html
<!-- layouts/_errors.html.erb -->
<% if flash.now[:errors] %>
  <% flash.now[:errors].each do |error| %>
   <%= error %><br />
  <% end %>
<% end %>

<!-- views/users/new.html.erb -->
<%= render partial: 'layouts/errors' %>

<!-- views/users/edit.html.erb -->
<%= render partial: 'layouts/errors' %>
```

Notice how trivial it is to add the list of errors to future new/edit pages by
using a partial.

## Resources

* [Rails Guides - Validations][rails-guides-validations]
* [4 H's of error messages][error-4h]

[rails-guides-validations]: http://guides.rubyonrails.org/active_record_validations.html
[error-4h]: http://uxmas.com/2012/the-4-hs-of-writing-error-messages
