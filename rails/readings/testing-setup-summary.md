# Testing Setup Summary

This reading pulls together all of the setup instructions for the many great
testing-related packages you have read about. For more information/context, see
the reading on the specific package.

## __Gemfile__

To set up your __Gemfile__, change the default debugger from `debug` to `byebug`
if you wish. (If you make the change, add __.byebug_history__ to your
__.gitignore__ too.) Then add the gems for the various testing packages:

- To `group :development, :test`, add
  - `rspec-rails`
  - `factory_bot_rails`
  - `faker`
  - `shoulda-matchers`  

- To `group :development`, add
  - `spring`
  - `spring-commands-rspec`
  - `guard-rspec`
  - Your standard development gems (`annotate`, `pry-rails`, `better_errors`,
    `binding_of_caller`)

- To `group :test`, add
  - `capybara` # Should already be present if System Tests are installed
  - `selenium-webdriver` # Should already be present if System Tests are
    installed
  - `webdrivers` # Should already be present if System Tests are installed
  - `launchy` # for use with Capybara; enables `save_and_open_page`

Make sure that `better_errors` and `binding_of_caller` are **NOT** included in
the `:test` group since they can lead to false positives in your tests.

Once you have finished modifying your __Gemfile__, `bundle install`.

## Set up RSpec

Run `rails g rspec:install` to create the following files:

- .rspec
- spec
- spec/spec_helper.rb
- spec/rails_helper.rb

Open __.rspec__ and add the following lines under `--require spec_helper`:

```text
--color
--format documentation
```

## Configure __spec/rails_helper.rb__

To configure Shoulda Matchers and Capybara, require the following packages in
__spec/rails_helper.rb__ after `require 'rspec/rails'` and add the Shoulda
Matchers configuration to the end of the file. Also, if you don't want to prefix
each FactoryBot method call with `FactoryBot`, add the FactoryBot configuration
line shown below:

```rb
# spec/rails_helper.rb

# ...
require 'rspec/rails'
# Add additional requires below this line. Rails is not loaded until this point!
require 'shoulda-matchers'
require 'capybara/rspec'

# ...

RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
  # ...
end

Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end
```

## Configure Spring

In __config/environments/test.rb__, change this line

```rb
config.cache_classes = true
```

to this:

```rb
config.cache_classes = false
config.action_view.cache_template_loading = true
```

Then on the command line, run `spring binstub --all`.

## Configure Guard

Run `bundle exec guard init` to create a __Guardfile__. To set up a basic watch,
replace everything in your __Guardfile__ with these five lines:

```rb
guard :rspec, cmd: 'spring rspec' do
  watch(%r{^app/}) { 'spec' }
  watch(%r{^spec/}) { 'spec' }
  watch('config/routes.rb') { 'spec' }
end
```

Tweak as needed.
