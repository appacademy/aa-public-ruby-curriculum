# Active Record

```ruby
  1  witches = Student.where('school = ?', 'Hogwarts')
  2   owls = Animal.where('type = ?', 'owl')
  3
  4   owls.each do |owl|
  5     puts "#{owl.name} is a #{owl.breed}"
  6   end
  7
  8   witches.each do |witch|
  9     puts "#{witch.name} is in #{witch.house} House."
  10  end
```

When will the `witches` be fetched from the database?
- [ ] Line 1
- [ ] Line 2
- [ ] Line 4
- [ ] Line 8
- [ ] Line 9

<details><summary>Answer:</summary>

Line 8</details>
<details><summary>Explanation:</summary>

Active Record practices _lazy loading_, which means that it will not query the database until the records are needed. In the code above, the `witches` records are not needed until `witches.each` starts to iterate through `witches`, so that is when Active Record will actually fetch the information from the database.</details>

What typically indicates an N+1 query?
- [ ] Fetching a `Relation` and one of its associations simultaneously
- [ ] Fetching a `Relation`, followed by fetching an association on each item in the original `Relation`
- [ ] Using `.joins`
- [ ] Using `.includes?`

<details><summary>Answer:</summary>

Fetching a `Relation`, followed by fetching an association on each item in the original `Relation`</details>
<details><summary>Explanation:</summary>

An N+1 query occurs when you make a query (1) and then call an association on **each** of the N records fetched by that initial query (N).</details>

```ruby

# For all those who did not spend their 11th birthday 
# waiting for a Hogwarts letter, take note of this schema outline:

#### subjects
column name     | data type
----------------|-----------
id              | integer   
name            | string    
professor       | string      

#### books
column name     | data type
----------------|-----------
id              | integer   
title           | string    
author          | string
subject_id      | integer

#### spells
column name     | data type
----------------|-----------
id              | integer   
magic_words     | string    
book_id         | integer

#### inventors
column name     | data type
----------------|-----------
id              | integer   
name            | string    
spell_id        | integer

#### theories
column name     | data type
----------------|-----------
id              | integer   
explanation     | string    
spell_id        | integer


transfiguration = Subject.find_by(name: 'transfiguration')
spells = transfiguration.books.includes(spells: [:inventor, :theory])
```

What would the above query fetch?
- [ ] All magical spells
- [ ] A Beginner's Guide to Transfiguration by Emeric Switch
- [ ] All transfiguration books, along with their authors
- [ ] All magical books, along with their spells and the spells' inventors and theories
- [ ] All transfiguration books, along with their spells and the spells' inventors and theories

<details><summary>Answer:</summary>

All transfiguration books, along with their spells and the spells' inventors and theories</details>
<details><summary>Explanation:</summary>

`Subject.find_by(name: 'transfiguration')` fetches the one `Subject` where the `name` is `transfiguration`. The resulting Active Record `Relation` is stored in the `transfiguration` variable. `transfiguration.books` then chains a `has_many` association that will grab all the `Book`s whose `subject_id` points to the transfiguration `Subject`. Finally, the chained `.includes(spells: [:inventor, :theory])` says that for each `Book` in `transfiguration.books`, grab its `spells` and each spell's `inventor` and `theory`.</details>

```ruby
  class Character < ApplicationRecord
    scope :muggles, -> { where(magic: false) }
  end
```

What do the above lines create? (Select all that apply.)
- [ ] A class method to select all muggles that can be called with `Character.muggles`
- [ ] A succinct and clear name to use for this query
- [ ] An easier way to call a commonly-used query

<details><summary>Answer:</summary>

- A class method to select all muggles that can be called with `Character.muggles`
- A succinct and clear name to use for this query
- An easier way to call a commonly-used query</details>
<details><summary>Explanation:</summary>

All of the above!</details>
