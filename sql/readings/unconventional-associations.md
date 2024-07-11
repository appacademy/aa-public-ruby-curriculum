# Unconventional Associations

You've learned about the `class_name`/`foreign_key`/`primary_key` options for
`belongs_to` and `has_many` associations. Rails can often infer what these
values are, such that you don't have to specify them when defining your
associations. For example, you can define a `belongs_to` association specifying
only the name:

```rb
belongs_to :user
```

Rails will automatically infer that the `primary_key` will be `:id`, the
`foreign_key` will be `:user_id`, and the `class_name` will be `:User`. (**It is
nevertheless good practice to continue writing these attributes out in full
while you are still learning how these associations work.**)

This reading discusses the cases where Rails **cannot** infer these values.

## Reflexive associations

Consider this example:

```ruby
class Employee < ApplicationRecord
  has_many :subordinates,
    class_name: 'Employee',
    foreign_key: :manager_id,
    primary_key: :id

  belongs_to :manager,
    class_name: 'Employee',
    foreign_key: :manager_id,
    primary_key: :id
end
```

This is a *reflexive association* because the association refers back to the
same table. Here, there is an `employees.manager_id` column that refers to the
`employees.id` column.

You have to use the non-standard association names like `subordinates`/`manager`
because `employees`/`employee` would be extremely confusing to understand.
Indeed, Rails itself will probably get confused if you have two associations on
the same class that differ only in pluralization.

Note that this example has also departed from the conventional `employee_id`
column name for the foreign key. `manager_id` better explains the nature of this
key and is therefore preferred.

## Two associations to the same class

Here's another example:

```ruby
# emails: id|from_email_address|to_email_address|text
#  users: id|email_address

class User < ApplicationRecord
  has_many(
    :sent_emails,
    class_name: 'Email',
    foreign_key: :from_email_address,
    primary_key: :email_address
  )
  has_many(
    :received_emails,
    class_name: 'Email',
    foreign_key: :to_email_address,
    primary_key: :email_address
  )
end

class Email < ApplicationRecord
  belongs_to(
    :sender,
    class_name: 'User',
    foreign_key: :from_email_address,
    primary_key: :email_address
  )
  belongs_to(
    :recipient,
    class_name: 'User',
    foreign_key: :to_email_address,
    primary_key: :email_address
  )
end
```

Here the `Email` and `User` objects are associated in two ways: sender and
recipient. Additionally, the `Email` record doesn't reference `User`'s `id`
field directly; instead, it refers to an `email_address`. For that reason, you
need to specify the `primary_key` option; this would otherwise default simply to
`id`.

Through these two examples, you've seen how you can go beyond the conventional
Active Record guesses in cases where your associations are a little special.
