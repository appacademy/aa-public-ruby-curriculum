# Testing Models With RSpec

Your model tests in Rails should make sure that

* The models still work after you change their methods
* Validations work
* Associations are set up
* You get appropriate error messages

Model testing in Rails is an example of _unit testing_--i.e., testing the
various components of your application in relative isolation--as opposed to
_integration testing_, which tests features that use many pieces of the
application.

Model specs live in __spec/models__.

## Creating the spec files

If you've already run `rails generate rspec:install`, then Rails will
automatically make spec files for you when you generate a model. Otherwise, run
`rails generate rspec:model <model_name>`, where you replace `<model_name>` with
the name of the model (e.g., 'user').

To run the model tests file-by-file, run `rspec
spec/models/<model_name>_spec.rb` (e.g., `rspec spec/models/user_spec.rb`).

## Writing tests

A model spec is wrapped in RSpec's `describe` block, which lets you run all the
usual RSpec methods.  For example:

```ruby
# spec/models/basketball_team_spec.rb

require 'rails_helper'

RSpec.describe BasketballTeam, type: :model do
  it 'orders by city' do
    cavs = BasketballTeam.create!(name: 'Cavaliers', city: 'Cleveland')
    hawks = BasketballTeam.create!(name: 'Hawks', city: 'Atlanta')

    expect(BasketballTeam.ordered_by_city).to eq([hawks, cavs])
  end
end
```

**N.B.:** In this document you are creating Rails objects to test manually, but
in the next reading you'll see how to use _factories_ to do this in a cleaner,
more flexible way.

## Validation tests

You can test if a model is valid by using its own `#valid?` method:

```ruby
# spec/models/basketball_team_spec.rb

require 'rails_helper'

RSpec.describe BasketballTeam, type: :model do
  let(:incomplete_team) { BasketballTeam.new(city: 'New York') }

  it 'validates presence of name' do
    expect(incomplete_team).not_to be_valid
  end
end
```

However, this process can become tedious if you have many different things that
need to be validated. Fortunately, there's a solution for that.

## Validation and association tests

The `shoulda-matchers` gem gives you many nice, one-line expressions to test
common cases. It does require a little configuration before you can use it,
however. See the "Shoulda Matchers Setup" reading in the left-hand sidebar for
details on how to do this.

Once installed and configured, Shoulda Matchers makes testing validations and
other model methods a breeze:

```ruby
# spec/models/basketball_team_spec.rb

require 'rails-helper'

RSpec.describe BasketballTeam, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_uniqueness_of(:name) }
  it { should ensure_inclusion_of(:name).in_array(['Cavaliers', 'Suns', 'Mavericks'])} 
  # And so on...
end
```

You can also test associations!

```ruby
# spec/models/basketball_team_spec.rb

require 'rails-helper'

RSpec.describe BasketballTeam, type: :model do
  describe 'associations' do
    # 'it' refers to an instance of the BasketballTeam class here
    # because you have not explicitly specified a subject
    it { should have_many(:basketball_players)}
    it { should have_one(:owner)}
  end
end
```

Check out the docs [here][shoulda-matchers].

[shoulda-matchers]: https://matchers.shoulda.io/docs/v5.1.0/

## Error message tests

You can also check that an error message is what you expect it to be.  For
example, you may want to test for a specific type of error within the errors
hash. **Make sure to call `#valid?` beforehand in order for any errors to show
up!**

```ruby
it 'fails validation when no name is present with message "Name can\'t be blank"' do
  no_name_team = BasketballTeam.new(city: 'Cleveland')
  no_name_team.valid?
  expect(no_name_team.errors[:name]).to include('can\'t be blank')
end
```

## Testing scopes

Say you want to write a method `BasketballTeam::playoff_teams` that should only
return basketball teams that make the playoffs. In pseudocode, the "scope" would
be "where playoffs == true".

You don't want to test that the Rails scope methods work--just assume that Rails
does its job. Instead, you want to test that your method returns the correct
data. There are two ways to do this:

1. Inspect the properties of the method's SQL query, which you can do through
   methods such as `where_values_hash` and `order_values`. Inspecting the
   properties speeds up your tests because they don't actually query the
   database. In addition, you're testing code that *you* wrote instead of
   testing Active Record.

2. Actually query the database.

```ruby
describe '::playoff_teams' do
  let!(:cavs) {
    BasketballTeam.create!(
      name: 'Cavaliers',
      city: 'Cleveland',
      playoffs: true
    )
  }

  let!(:suns) {
    BasketballTeam.create!(
      name: 'Suns',
      city: 'Phoenix',
      playoffs: false
    )
  }

  # 1. Inspect query properties.  Does NOT query the database.
  it 'has the correct values hash' do
    expect(BasketballTeam.playoff_teams.where_values_hash).to eq({ 'playoffs' => true })
  end

  # 2. Actually query the database.
  it 'returns good teams' do
    expect(BasketballTeam.playoff_teams).to include(cavs)
  end

  it 'does not return terrible teams' do
    expect(BasketballTeam.playoff_teams).not_to include(suns)
  end
end
```
