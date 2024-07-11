# Rails Testing

<quiz>
  <question>
  <p>Which of the following should you not test when testing Rails models?</p>
    <answer>Associations</answer>
    <answer>Class methods</answer>
    <answer correct>Private methods</answer>
    <answer>Validations</answer>
    <explanation>You should never need to test a `private` method directly. Instead, you would want to test the method that calls the `private` method.</explanation>
  </question>
</quiz>

```ruby
# spec/factories/puppies.rb

FactoryBot.define do
  factory :puppy do
    name Faker::Name.name
  end
end
```

<quiz>
  <question>
  <p>Say you use FactoryBot to build puppies. What, if anything, is wrong with the above puppy factory?</p>
    <answer>You need to define your factory using the code `FactoryBot.build(:puppy, name: Faker::Name.name))`</answer>
    <answer>You must say `factory Puppy` instead of `factory :puppy` in order for FactoryBot to know what sort of model you are trying to build.</answer>
    <answer correct>You need to put `Faker::Name.name` inside a block so that it reads `name { Faker::Name.name }`.</answer>
    <answer>You should generate a random name using `Faker.name` rather than `Faker::Name.name`.</answer>
    <answer>Nothing--this factory will produce puppies with random names.</answer>
    <explanation>FactoryBot will throw an error if you do not wrap `Faker::Name.name`--or any value you want to assign to an attribute--inside a block. (Passing a block enables the values to be generated dynamically.)</explanation>
  </question>
</quiz>

```ruby
  describe Puppy do
    describe '::puppies_by_cuteness' do
      it 'should rank puppies in order of cuteness' do
        cute_puppy = FactoryBot.build(:puppy, cuteness: 8)
        cuter_puppy = FactoryBot.build(:puppy, cuteness: 9)
        cutest_puppy = FactoryBot.build(:puppy, cuteness: 10)

        puppies_by_cuteness = Puppy::puppies_by_cuteness.map do |puppy|
          puppy.cuteness
        end

        expect(puppies_by_cuteness).to eq([10,9,8])
      end
    end
  end
```

<quiz>
  <question>
  <p>Assuming that `Puppy::puppies_by_cuteness` is written correctly, why will the above spec fail?</p>
    <answer correct>`FactoryBot.build` should be changed to `FactoryBot.create` since `Puppy::puppies_by_cuteness` queries the database. </answer>
    <answer>You cannot use the same factory to build multiple objects.</answer>
    <answer> You cannot use `FactoryBot` in model tests, only in integration tests.</answer>
    <answer>The test should read `expect(puppies_by_cuteness).to be([10,9,8])` rather than `expect(puppies_by_cuteness).to eq([10,9,8])`.</answer>
    <explanation>Calling `FactoryBot.build` is equivalent to calling `Model.new` which will not save to the testing database. If you are querying the database, you need to actually create these Puppies in your database by calling `FactoryBot.create`.</explanation>
  </question>
</quiz>

Consider the following:

```ruby
feature 'signing up a user' do
  background do
    visit new_user_url
    fill_in 'username', with: 'testing_username'
    fill_in 'password', with: 'biscuits'
    click_on 'Create User'
  end

  scenario 'redirects to team index page after signup' do
    expect(page).to have_content 'Team Index Page'
  end
end
```

<quiz>
  <question>
  <p>The above code represents the syntax for a Capybara feature test. To transform it into typical syntax for a system test, what should you replace `feature`, `background`, and `scenario` with?</p>
    <answer>`describe`, `before(:all)`, `it`</answer>
    <answer correct>`describe`, `before`, `it`</answer>
    <answer>`describe`, `given`, `context`</answer>
    <answer>`context`, `given`, `describe`</answer>
    <answer>`describe`, `context`, `it`</answer>
    <explanation>When converting from Capybara feature DSL, `feature` becomes `describe`, `background` becomes `before`, `scenario` becomes `it`, and `given` becomes `let`.</explanation>
  </question>
</quiz>

<quiz>
  <question multiple>
  <p>Capybara helps with which of the following kinds of tests? (Select all that apply.) </p>
    <answer correct>End-to-End tests</answer>
    <answer correct>Integration tests</answer>
    <answer>Unit tests</answer>
    <answer>Manual tests</answer>
    <answer> None of these answers</answer>
    <explanation>You use Capybara only for end-to-end tests and integration tests. For unit tests, you can still use regular old `RSpec`.</explanation>
  </question>
</quiz>
