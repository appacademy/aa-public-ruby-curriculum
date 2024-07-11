# Validations III: Common Validation Options

These are a few common validation options which can be applied to most
validation helpers.

## `:allow_nil`/`:allow_blank`

The `:allow_nil` option skips the validation when the value being validated is
`nil`.

```ruby
class Coffee < ApplicationRecord
  validates :size, inclusion: { in: %w(small medium large),
    message: "#{value} is not a valid size" }, allow_nil: true
end
```

The `:allow_blank` option is similar to the `:allow_nil` option. This option
will let validation pass if the attribute's value is `blank?`, like `nil` or an
empty string for example.

```ruby
class Topic < ApplicationRecord
  validates :title, length: { is: 5 }, allow_blank: true
end

Topic.create(title: '').valid?  # => true
Topic.create(title: nil).valid? # => true
```

## :message

Most validators will come up with a default error message on your behalf.
Sometimes you want more control over the message reported to the user. In this
case, you will want to use the `:message` option. This lets you provide a string
to use as the error message.

## :if

Sometimes it will make sense to validate an object only when a given predicate
is satisfied. You may use the `:if` option when you want to specify when the
validation **should** happen. If you want to specify when the validation
**should not** happen, then you may use the `:unless` option.

You can associate the `:if` and `:unless` options with a symbol corresponding to
the name of a method that will get called right before validation happens:

```ruby
class Order < ApplicationRecord
  validates :card_number, presence: true, if: :paid_with_card?

  def paid_with_card?
    payment_type == 'card'
  end
end
```
