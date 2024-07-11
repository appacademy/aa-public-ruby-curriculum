# RSpec Views Tests

As other readings have noted, Rails views are often tested today through
request/integration tests and/or system tests. RSpec does have the capability,
however, of unit testing your views as well. That is to say, RSpec can test the
content of a view template in isolation, i.e., without invoking a specific
controller.

Unlike Capybara, [RSpec view specs] test a template's rendered HTML without
testing its functionality. RSpec view specs are accordingly best used for
testing presentational views (like a `show` or `index` view).

By the end of this reading you should be able to write RSpec view specs to test
a presentational template's output.

## RSpec view spec syntax

Here are some examples of how you would go about writing view specs. Assume you
have the following index template for an application with Cats:

```html
<!--  app/views/cats/index.html.erb -->

<h1>Cat App</h1>
<div>
  <ul>
    <% @cats.each do |cat| %>
    <li>
      <a href="<%= cat_url(cat) %>"><%= cat.name %></a>
    </li>
    <% end %>
  </ul>
</div>
```

To start writing RSpec view specs, you must first install RSpec into your Rails
project. (See the "RSpec and Rails" reading.) Once RSpec is set up, your view
specs will reside in the __spec/views__ folder. The file structure within this
directory will closely match your __app/views__ directory.

To test the code above from __app/views/cats/index.html.erb__, you would create
a __spec/views/cats__ directory. View specs are named after the type of template
you will be testing with __\_spec.rb__ appended to the end. So within the
__spec/views/cats__ directory, you would create a new file named
__index.html.erb_spec.rb__.

```ruby
# spec/views/cats/index.html.erb_spec.rb
require "rails_helper"

# name of the template you are testing
RSpec.describe "cats/index" do

end
```

Now let's write some specs! View specs typically consist of three main parts:

1. Assigning values for any instance variables
2. Rendering the view
3. Checking the rendered view for expected content

Assigning values for instance variables is probably the step that differs most
from other specs you have written. In the above __cats/index.html.erb__, you can
see an `@cats` instance variable is being iterated through with the name of each
cat rendered to the user. __cats/index.html.erb__ thus relies on the existence
of an `@cats` variable to render properly.

In the typical Rails flow, a Controller would set all the instance variable
values in a Rails view template. However, using RSpec views, you can set your
own values for the instance variables, like `@cats` in the __index.html.erb__.

Here is how you would do this:

```ruby
# spec/views/cats/index.html.erb_spec.rb
require "rails_helper"

RSpec.describe "cats/index" do
    it "renders Cat names" do
        # here you are assigning the value of the index template's instance
        # variable @cats
        assign(:cats, [
        Cat.create!(:name => "Jet"),
        Cat.create!(:name => "Frey"),
        ])

        # this method will render the template with the above assigned
        # instance variable
        render

        # you can check the "rendered" output for a match in the HTML
        expect(rendered).to match /Jet/
        expect(rendered).to match /Frey/
    end
end
```

Nice! Not only can you test rendered instance variables, but you can also test
whatever HTML is rendered on the page:

```ruby
require "rails_helper"

RSpec.describe "cats/index" do
    it "has a header with the name of the application" do
        # you still need to make sure to assign a value to the @cats variable
        # because the template relies on that variable to run
        assign(:cats, [
        Cat.create!(:name => "Jet")
        ])

        render

        # you can check the "rendered" output for a match in the HTML
        expect(rendered).to match /Cat App/
    end
end
```

RSpec view tests can also identify links and their `href` paths in the rendered
html by using the matcher `has_links`. In the above __cats/index.html.erb__,
each rendered cat name links to that cat's show page.

Let's see how you could test that functionality:

```ruby
require "rails_helper"

RSpec.describe "cats/index" do
    let(:jet) { Cat.create!(name: "Jet") }

    it "has a link to each cat's show page" do
        assign(:cats, [jet])

        render

        # here you are ensuring the link will have a cat's name and the
        # href of the link matches the cat_url for your assigned cat variable
        expect(rendered).to have_link 'Jet', href: cat_url(jet.id)
    end
end
```

All together, you now have a thorough RSpec view test for
__cats/index.html.erb__:

```ruby
# spec/views/cats/index.html.erb_spec.rb
require "rails_helper"

RSpec.describe "cats/index" do
    let(:jet) { Cat.create!(name: "Jet") }
    let(:frey) { Cat.create!(name: "Frey") }

    it "has a header with the name of the application" do
        assign(:cats, [jet])

        render

        expect(rendered).to match /Cat App/
    end

    it "renders Cat names" do
        assign(:cats, [jet, frey])

        render

        expect(rendered).to match /Jet/
        expect(rendered).to match /Frey/
    end

    it "has a link to each cat's show page" do
        assign(:cats, [jet, frey])

        render

        expect(rendered).to have_link 'Jet', href: cat_url(jet.id)
        expect(rendered).to have_link 'Frey', href: cat_url(frey.id)
    end
end
```

## What you have learned

RSpec Views specs are great for unit testing a view's rendered content without
relying on a specific controller to render that view. They typically consists of
three parts: assigning values for instance variables, rendering the view, and
checking the rendered content against expectations.

[RSpec view specs]: https://rspec.info/features/6-0/rspec-rails/view-specs/view-spec/
