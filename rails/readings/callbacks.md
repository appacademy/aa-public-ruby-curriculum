# Callbacks

The [Rails Guide] defines _callbacks_ as

> methods that get called at certain moments of an object's life cycle. With
> callbacks it is possible to write code that will run whenever an Active Record
> object is created, saved, updated, deleted, validated, or loaded from the
> database.

In other words, a callback is a method that you set to run before, around, or
after one of the life-cycle events. For example, the `dependent: :destroy`
option on an association effectively registers a `destroy` callback to be run on
the object's dependents before `destroy` is run on the original object.

## Callback Registration

You can hook into any of the listed model life-cycle events. To achieve this,
you implement the functionality that you want to run as an ordinary method and
then use a macro-style class method to register it as a callback:

```ruby
class User < ApplicationRecord
  validates :random_code, presence: true
  before_validation :ensure_random_code

  protected
  def ensure_random_code
    # assign a random code
    self.random_code ||= SecureRandom.hex(8)
  end
end
```

The above code registers a callback to ensure the `random_code` attribute is set
before performing validations on the object. This helps the user: if they forget
to specify a `random_code`, you'll conveniently make one for them.

It is considered good practice to declare callback methods as `protected` or
`private`. If left `public`, they could be called from outside the model, which
would violate the principle of object encapsulation.

## Available Callbacks

There are many available Active Record callback registration macros. Here are a
few of the most common:

* `before_validation` (handy as a last chance to set forgotten fields)
* `after_create` (handy for performing some post-create logic, like sending a
  confirmation email)
* `after_destroy` (handy for performing post-destroy clean-up logic)

You can further specify that the callback should be called only when performing
certain operations:

```ruby
class CreditCard < ApplicationRecord
  # Strip everything but digits, so the user can specify "555 234 34" or
  # "5552-3434"; both will mean "55523434".
  before_validation(on: :create) do
    self.number = number.gsub(/[^0-9]/, '') if number.present?
  end
end
```

This callback will only run when creating the object; validations before
subsequent saves will not perform this check.

[Rails Guide]: https://guides.rubyonrails.org/active_record_callbacks.html
