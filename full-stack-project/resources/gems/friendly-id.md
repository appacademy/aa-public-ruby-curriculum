#FriendlyId

##Slugs, more than just [bananas] [banana-slug-url]
Slugs are human readable counterparts to numeric URL identifiers, like
id numbers. They are great for users and search engines, and act just 
like normal ids:  
```url
http://99dogs.com/dogs/apollo
```
Instead of:
```url
http://99dogs.com/dogs/1031933301938
```
And instead of this:
```ruby
Dog.find(1031933301938)
```
You get this:
```ruby
Dog.find('apollo')
```

##Use
`gem 'friendly_id'` and bundle install.

Your model needs a slug column:
```bash
rails g friendly_id
rails g dog name:string age:integer slug:string
```

You also need to add an index on it:
```ruby
# db/migrate/*_create_dogs.rb
class CreateDogs < ActiveRecord::Migration
    def change
        create_table :dogs do |t|
            t.string :name
            t.integer :age
            t.string :slug # add this to the migration
        end
    end

    add_index :dogs, :slug, :unique => true # add a unique index on the slug
end
```

After migrating you just need to extend your model and specify what
should be slugged:

```ruby
# app/models/dog.rb
class Dog < ActiveRecord::Base
    extend FriendlyId
    friendly_id :name, :use => :slugged
end
```

Now you can find by your friendly id:
```ruby
Dog.create!(:name => "Apollo", :age => 4)
```
```ruby
# app/controllers/dogs_controller.rb
def show
    @dog = Dog.friendly.find(params[:id]) # works even if params[:id] #=> "apollo"
end
```

##Updating Existing Models
Generate the slug column and index to the table. Extend the model and
specify the `friendly_id`. Run this from console:
`ModelName.find_each(&:save)`

[banana-slug-url]: http://en.wikipedia.org/wiki/Banana_slug
