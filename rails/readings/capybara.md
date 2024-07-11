# Testing with Capybara

Rails uses Capybara in _system tests_ to simulate the way that a user interacts
with your app: clicking buttons, visiting links, submitting forms, etc. (This
focus on simulating the actions of a real user is what differentiates system
tests from integration tests.) Capybara lets you conduct several browser actions
in sequence so you can test the same part of your app in different ways.

For example, you could write a test that...

* expects to see a welcome screen on the index page if a user isn't signed in.

You could write another test that...

* signs in a user
* expects to see their username on the index page.

You could write a third test that...

* creates a user
* logs out that user
* expects to be redirected to the index page
* expects the index page to tell the user they've been logged out

And so on...

## Setting up Capybara

Rails includes Capybara by default when building a full app. Capybara is
installed as part of System Tests, however, and System Tests are one of the
features omitted when you create a project using the `--minimal` flag or the
`-T` flag. So the easiest way to install and use Capybara is simply not to use
`--minimal` or `-T` when creating an app.

If you want to use Capybara in an app that you have already created without it,
add the following gems to your __Gemfile__ and bundle install:

```rb
group :test do
  gem "capybara"
  gem "selenium-webdriver"
  gem "webdrivers"
end
```

Adding these gems will enable you to install and use Capybara with RSpec, but it
will not activate the full Rails System Test package. If you take this approach,
you accordingly might have to do some additional manual configuration to take
full advantage of Capybara's features.

Once Rspec is set up (`rails g rspec:install`), add `require "capybara/rspec"`
to __rails_helper.rb__.

Capybara spec files can be placed in either __spec/features__ or
__spec/system__. The __features__ directory is the traditional home for Capybara
specs, but tests run from this directory (again) typically require additional
configuration and gems. With system tests, in contrast, Rails incorporates
Capybara directly into the Rails framework. In other words, Rails handles the
configuration issues for system tests, and they are now the recommended way to
run Capybara in Rails.

At the top of each Capybara spec file, require the `rails_helper`:

```ruby
# spec/features/authentication_spec.rb

require 'rails_helper'
# ...
```

By default, system tests default to using the Selenium driver, which will open a
browser to run every test. This is helpful if your tests need to run some
JavaScript in the browser, but the apps you are building at the moment do not
need this functionality. Accordingly, you will want to set the driver to
`:rack_test` for all of your tests by including the following `before` block at
the beginning of each set of specs:

```ruby
RSpec.describe "Auths", type: :system do
  before do
    driven_by(:rack_test)
  end
```

To run the tests individually, run `rspec spec/system/{feature_name}_spec.rb`.

## Example

Here's a snippet of how you might test signing up a user:

```ruby
# spec/system/authentication_spec.rb

require 'rails_helper'

RSpec.describe 'the signup process' do
  before do
    driven_by(:rack_test)
  end

  it 'has a new user page' do
    visit new_user_url
    expect(page).to have_content 'New user'
  end

  describe 'signing up a user' do
    before do
      visit new_user_url
      fill_in 'username', with: 'testing_username'
      fill_in 'password', with: 'biscuits'
      click_on 'Create User'
    end

    it 'redirects to team index page after signup' do
      expect(page).to have_content 'Team Index Page'
    end

    it 'shows username on the homepage after signup' do
      expect(page).to have_content 'testing_username'
    end
  end
end
```

**Note:** When used for feature tests, Capybara specs tend to use a different
syntax:

* `feature` rather than `describe`/`context`
* `scenario` rather than `it`/`specify`
* `background` rather than `before`/`before(:each)`
* `given`/`given!` rather than `let`/`let!` (not shown above)

This is a [special syntax][capybara-syntax]--related to _acceptance
testing_--just for Capybara specs. When writing system tests, the normal [RSpec
syntax] is preferred, although either will work.

## Important Methods

(This list is taken from the [Capybara docs][capybara-docs].)

* Visiting a page
  * [`visit('/projects')`][visit]
  * [`visit(post_comments_path(post))`][visit]

* Clicking
  * [`click_link('id-of-link')`][click-link]
  * [`click_link('Link Text')`][click-link]
  * [`click_button('Save')`][click-button]
  * [`click_on('Link Text')`][click-on] # clicks on either links or buttons
  * [`click_on('Button Value')`][click-on]

* Forms
  * [`fill_in('id-of-input', with: 'whatever you want')`][fill-in]
    * [`fill_in('Password', with: 'Seekrit')`][fill-in]
    * [`fill_in('Description', with: 'Really Long Text...')`][fill-in]
  * [`choose('A Radio Button')`][choose]
  * [`check('A Checkbox')`][check]
  * [`uncheck('A Checkbox')`][uncheck]
  * [`attach_file('Image', '/path/to/image.jpg')`][attach-file]
  * [`select('Option', from: 'Select Box')`][select]
  * [`unselect('Option', from: 'Select Box')`][unselect]

* Content (`page`)
  * [`page.has_selector?('table tr')`][has-selector]
  * `expect(page).to have_content('Blah blah blah')`

**Read the [docs][capybara-docs] for more.**

## `save_and_open_page`

You can see what your pages look like in the middle of your Capybara tests by
using the [launchy] gem. Just add `gem "launchy"` to the test group in your
__Gemfile__ and `bundle install`. Then call `save_and_open_page` whenever you
want to check what a page looks like. Launchy will open it in a new browser
window for you. For example,

```ruby
it 'has an index page' do
  visit posts_url
  save_and_open_page
  expect(page).to have_content('Index')
end
```

## Additional Links

* [Capybara docs][capybara-docs]

[capybara-syntax]: https://rspec.info/features/6-0/rspec-rails/feature-specs/feature-spec/
[RSpec syntax]: https://rspec.info/features/6-0/rspec-rails/system-specs/system-specs/
[launchy]: http://rubygems.org/gems/launchy
[capybara-docs]: http://rdoc.info/github/jnicklas/capybara#the-dsl
[visit]: https://rubydoc.info/github/teamcapybara/capybara/master/Capybara/Session#visit-instance_method
[fill-in]: https://rubydoc.info/github/teamcapybara/capybara/master/Capybara/Node/Actions#fill_in-instance_method
[click-button]: https://rubydoc.info/github/teamcapybara/capybara/master/Capybara/Node/Actions#click_button-instance_method
[click-link]: https://rubydoc.info/github/teamcapybara/capybara/master/Capybara/Node/Actions#click_link-instance_method
[click-on]: https://rubydoc.info/github/teamcapybara/capybara/master/Capybara/Node/Actions#click_link_or_button-instance_method
[choose]: https://rubydoc.info/github/teamcapybara/capybara/master/Capybara/Node/Actions#choose-instance_method
[check]: https://rubydoc.info/github/teamcapybara/capybara/master/Capybara/Node/Actions#check-instance_method
[uncheck]: https://rubydoc.info/github/teamcapybara/capybara/master/Capybara/Node/Actions#uncheck-instance_method
[attach-file]: https://rubydoc.info/github/teamcapybara/capybara/master/Capybara/Node/Actions#attach_file-instance_method
[select]: https://rubydoc.info/github/teamcapybara/capybara/master/Capybara/Node/Actions#select-instance_method
[unselect]: https://rubydoc.info/github/teamcapybara/capybara/master/Capybara/Node/Actions#unselect-instance_method
[has-selector]: https://rubydoc.info/github/teamcapybara/capybara/master/Capybara/Node/Matchers#has_selector%3F-instance_method
