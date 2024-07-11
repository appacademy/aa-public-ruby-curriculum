# Validations II: Custom Validations

When the built-in validation helpers are not enough for your needs,
you can write your own **validation methods** or **validator
classes**.

## Custom Methods

With validation methods, you can write your own methods to validate a
model.

```ruby
class Invoice < ApplicationRecord
  # validate tells the class to run these methods at validation time.
  validate :discount_cannot_be_greater_than_total_value

  private
  def discount_cannot_be_greater_than_total_value
    if discount > total_value
      errors.add(:discount, 'can\'t be greater than total value')
    end
  end
end
```

Note that the presence of an error is registered by adding a message to the
`errors` message hash. If no error messages are added, the validation is deemed
to have passed. Note that the message does not mention the variable name; when
you call `full_messages`, Rails will prefix the message with the attribute name
for you.

### Errors on `:base`

Sometimes an error is not specific to any one attribute. In this case, you add
the error to `:base`. For messages added to `:base`, Rails will **not** prefix
the error message with the `Base` attribute name.

```ruby
class Person < ApplicationRecord
  def a_method_used_for_validation_purposes
    errors.add(:base, 'This person is invalid because ...')
  end
end
```

## Custom Validators

Custom validators are classes that extend `ActiveModel::EachValidator`. Prefer
writing a custom validator class when you want to reuse validation logic for
**multiple models or multiple columns**. Otherwise, it's simpler to use a
validator method.

Your custom validator class must implement a `validate_each` method that takes
three arguments: the record/instance, the attribute name, and its value.

```ruby
# app/validators/email_validator.rb

class EmailValidator < ActiveModel::EachValidator
  CRAZY_EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i

  def validate_each(record, attribute_name, value)
    unless value =~ CRAZY_EMAIL_REGEX
      # you can use `EachValidator#options` to access custom options
      # passed to the validator.
      message = options[:message] || 'is not an email'
      record.errors.add(attribute_name, message)
    end
  end
end

# app/models/person.rb
class Person < ApplicationRecord
  # Rails knows `email: true` means `EmailValidator`.
  validates :email, presence: true, email: true
  # not required, but must also be an email
  validates :backup_email, email: { message: 'isn\'t even valid' }
end
```

As the example shows, you can combine standard and custom validators.
