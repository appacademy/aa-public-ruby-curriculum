# Model Testing with RSpec

Model testing is an easy way to populate your project with tests. There's a lot of simple things to test:

* Custom validations
* Associations
* Every instance method you wrote
* Every class method you wrote

Most of your models will be associated to other models, so you can demonstrate that you understand unit testing by making sure you only test one model at a time.

## Remember RSpec?

Installing RSpec is easy! Just add the following to your gemfile:

```ruby
group :test, :development do
  gem 'rspec-rails'
end
```

and run `rails generate rspec:install`. Then just make a file for each model under `spec/models/`.

## Easy Win: Custom Validations

* Make sure any validations logic going on in your app is happening at the model level. Too often I see weird validation logic being built into the `create`/`update` methods of a controller.
* Test all your custom validations.

Let's say we have the following model:

```ruby
# app/assets/models/score.rb
class Score < ActiveRecord::Base
  attr_accessible :points

  belongs_to :day

  validate :between_0_and_100

  private

    def between_0_and_100
      unless (0..100).include? points
        errors.add(:points, "Must be between 0 and 100")
      end
    end
end
```

This basically gives us two easy tests - one for the positive case of the validation (i.e. does it validate correctly) and one for the negative case (i.e. does it invalidate correctly):

```ruby
# spec/models/score_spec.rb
require 'spec_helper'

describe Score do

  it "should validate good scores" do
    score = Score.new(points: 50)

    expect(score).to be_valid
  end

  it "shouldn't validate bad scores" do
    score = Score.new(points: 200)

    expect(score).to_not be_valid
  end

end
```

## Easy Win: Instance/Class methods

* Test every instance and class method you wrote on a model.
* Make sure you're only testing one model at a time.

Here's a model:

```ruby
class Day < ActiveRecord::Base
  attr_accessible :date

  validates :date, presence: true

  has_many :scores

  def total_score
    scores.inject(0) { |sum, score| sum += score.points }
  end
end
```

Let's test the `Day#total_score` method. Normally, this would run a SQL query to find the day's associated `Score` objects. But we don't want to do this, since we only want to test the Day model. Thus, we need to:

* Build mock Score objects that respond to `#points`.
* Stub the `Day#scores` method to return these fake objects.

Easy:
```ruby
require 'spec_helper'

describe Day do

  it "day#total_score should tally up points correctly" do
    day = Day.new(date: Date.today)

    score1 = double("Score")
    score2 = double("Score")

    score1.stub(:points).and_return(20)
    score2.stub(:points).and_return(30)

    day.stub(:scores).and_return([score1,score2])

    expect(day.total_score).to eq(50)
  end
end
```
