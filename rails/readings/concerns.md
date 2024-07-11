# Concerns

A concern is a module that allows us to add class methods, instance methods, and
run code at class definition time all from within one convenient file.
Previously with modules we have `include`d them to add instance methods or
`extend`ed them to add class methods, but a concern can add both instance
methods _and_ class methods at the same time! On top of that, concerns can
actually execute code at the time they are included, unlike vanilla modules.
This means that an association like `has_many` will immediately be created when
we include the concern.

Concerns are commonly used in rails to group all the code needed to add a
feature into one file. For example: if we were adding tagging as a feature to a
model there would likely be associations, validations, instance methods, and
class methods needed. We can put all of these into a concern and add the entire
feature at once by including the concern.

This comes in especially handy when we are writing polymorphic associations.
Imagine if we wanted to add tagging to both a `Question` class and an `Answer`
class. We could write the association, validation, instance methods, and class
methods in `Question` and copy all that over to `Answer` since the code would be
identical, but that is not _dry_. Instead, it would be better to write all this
tagging code in a concern and include that concern in both models.

See the example below to see how we can include all the tagging functionality in
multiple classes without having to duplicate any code.

```ruby
# app/models/concerns/taggable.rb
# file name must be the same as our module's name
module Taggable
  # this module becomes a concern thanks to this line
  extend ActiveSupport::Concern

  # code in this block will be run in class scope when the concern is included
  included do
    # validations and associations usually go here
    has_many :taggings, as: :taggable
    has_many :tags, through: :taggings
    validates #...
    # etc
  end

  # tags_string will become an instance method
  def tags_string
    tags.map(&:name).join(', ')
  end

  # methods defined in here become class methods
  module ClassMethods

    # this will become a class method
    # it should return all the elements that are tagged 'tag_name'
    def by_tag_name(tag_name)
      self.joins(:tags).where('tags.name' => tag_name)
    end
  end
end

# app/models/question.rb
class Question < ApplicationRecord
  include Taggable
  # ...
end

# app/models/answer.rb
class Answer < ApplicationRecord
  include Taggable
  # ...
end
```
