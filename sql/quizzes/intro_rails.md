# Introduction To Rails

```ruby
class CreateFriends < ActiveRecord::Migration[7.0]
  def change
    create_table :friends do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
```

The above migration is:</p>
- [ ] Creating a Friend model
- [ ] Creating a model's validations
- [ ] Creating a friends table
- [ ] Creating a new Rails project

<details><summary>Answer:</summary>

Creating a friends table</details>
<details><summary>Explanation:</summary>

The `create_table` block will create the specified `friends` table.</details>

```ruby
class Dog < ApplicationRecord
  belongs_to :owner,
    class_name: :Person,
    foreign_key: :owner_id,
    primary_key: :id
end
```

What class is the Dog class associated with?</p>
- [ ] Person
- [ ] `owner_id`
- [ ] Owner
- [ ] `.owner`

<details><summary>Answer:</summary>

Person</details>
<details><summary>Explanation:</summary>

The `class_name` will always point to the name of the model that will be returned by that association.</details>

What is the difference between `belongs_to` and `has_one`?</p>
- [ ] The model that `belongs_to` the other model has a column holding the other model's `id`s
- [ ] The model that `has_one` of the other model has a column holding the other model's `id`s
- [ ] Both models in both relationships hold each other's `id`s
- [ ] `belongs_to` implies ownership of; a Car `belongs_to` a Human and not the other way around

<details><summary>Answer:</summary>

The model that `belongs_to` the other model has a column holding the other model's `id`s</details>
<details><summary>Explanation:</summary>

The surefire way to know which model `belongs_to` another is if that model has a column holding the other model's `id`s. If a `Person` has a `cat_id` column then that Person model `belongs_to` a Cat model.</details>

```ruby
class Newspaper < ApplicationRecord
  has_many :subscribers,
    class_name: :Human,
    foreign_key: :paper_id,
    primary_key: :id
end

class Human < ApplicationRecord
  belongs_to :newspaper,
    class_name: :Newspaper,
    foreign_key: :paper_id,
    primary_key: :id
end

sf_chronicle = Newspaper.create(name: 'sf_chronicle')
aaron_the_human = Human.create(name: 'aaron', newspaper: sf_chronicle)
```

Which of the following would return `aaron_the_human`?</p>
- [ ] `Human.new(name: 'aaron')`
- [ ] `Newspaper.subscribers`
- [ ] `sf_chronicle.subscribers.find_by(name: 'aaron')`
- [ ] `aaron_the_human.newspaper`

<details><summary>Answer:</summary>

`sf_chronicle.subscribers.find_by(name: 'aaron')`</details>
<details><summary>Explanation:</summary>

You'd want to query the `subscribers` association on the `sf_chronicle` instance to find the particular `Human` you are seeking.</details>

What do ORMs allow you to do? Select all that apply.
- [ ] ORMs allow you to create instances of classes using information from a database
- [ ] ORMs allow you to use OOP techniques to handle your information
- [ ] ORMs allow you to persist state to a database

<details><summary>Answer:</summary>

- ORMs allow you to create instances of classes using information from a database
- RMs allow you to use OOP techniques to handle your information
- ORMs allow you to persist state to a database</details>
<details><summary>Explanation:</summary>

ORMs are so helpful!</details>

``` ruby
class LibraryMember < ApplicationRecord
  has_many :book_checkouts,
    class_name: :BookCheckout,
    foreign_key: :library_member_id,
    primary_key: :id

  has_many :books, through: :book_checkouts, source: :book
end

class BookCheckout < ApplicationRecord
  belongs_to :book
    class_name: :Book
    foreign_key: :book_id
    primary_key: :id

  belongs_to :library_member
    class_name: :LibraryMember
    foreign_key: :library_member_id
    primary_key: :id
end

class Book < ApplicationRecord
  has_many :book_checkouts,
    class_name: :BookCheckout,
    foreign_key: :book_id,
    primary_key: :id

  has_many :readers, through: :book_checkouts, source: :library_member
end
```

What is wrong with the above code?</p>
- [ ] Missing parentheses in the `has_many` associations
- [ ] The associations should use `=>` instead of `:`
- [ ] Missing commas in the `BookCheckout` associations
- [ ] Book's `readers` association should be called `library_member`

<details><summary>Answer:</summary>

Missing commas in the `BookCheckout` associations</details>
<details><summary>Explanation:</summary>

Those commas will get you! Always be watchful for syntax errors.</details>
