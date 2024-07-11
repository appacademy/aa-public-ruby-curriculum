# Testing Requests With RSpec

How can you test that your controller actions render the correct responses?

Traditionally, RSpec encouraged developers to use controller tests for this type
of testing. RSpec controller tests were built on Rails's _functional_ controller
tests. Functional tests typically check whether or not a controller's actions
respond correctly to various requests. In other words, whereas _unit_ tests
check that correct **outputs** are produced, _functional_ tests check that
correct **actions** are taken.

For Rails controllers, this traditionally meant **simulating** an HTTP request
and then checking whether or not the controller performed the appropriate action
(with resultant views typically being stubbed/simulated). Like unit tests, such
tests checked only the controller: no routes were verified or views rendered.

As of version 3.5, however, RSpec no longer recommends using controller tests
and, in fact, suggests that they will likely be deprecated in future versions.
Instead, RSpec recommends testing your controllers using _request tests_, which
are a type of _integration_ test. (Rails has similarly deprecated their
functional controller tests in favor of integration tests.) Integration tests
make sure that the different components of your application play nice with each
other.

Request tests make an actual HTTP request and check the rendered result.
Accordingly, while these tests do check your controller, they also effectively
test that you have set up your routing correctly and that the response actually
returns the correct content. Request tests thus test your views as well.

The time required to run such complex tests used to be prohibitive. The
significantly increased speed of these tests in more recent Rails versions has
enabled the newfound preference for these integration tests.

## Creating the spec files

If you've already run `rails generate rspec:install`, then Rails will
automatically make request spec files for you when you generate a controller.
Otherwise, run `rails generate rspec:request <controller_name>`, where
`<controller_name>` is the pluralized name of the model. For example, running
`rails generate rspec:request users` will create the file
__spec/requests/users_spec.rb__.

To run the request tests file-by-file, run `rspec
spec/requests/<controller_name>_spec.rb` (e.g., `rspec
spec/requests/users_spec.rb`).

## Writing tests

You should write tests for each action in your controller.

RSpec Rails provides you with several helpful methods for testing
requests/controllers. You can use RSpec Rails to send a request, then verify
that the controller sends back the correct response.

Here are two useful matchers you may wish to use:

* `redirect_to`
* `have_http_status`

As an example, assume that you are testing your app's `LinksController`:

```ruby
# app/controllers/links_controller.rb

class LinksController < ApplicationController
  def index
  end

  def new
    @link = Link.new
    render :new
  end

  def create
    @link = Link.new(link_params)

    if @link.save
      redirect_to link_url(@link)
    else
      flash.now[:errors] = @link.errors.full_messages
      render :new
    end
  end
  # ...
end
```

To send a request in RSpec, you specify an http method, a path (use the Rails
`path` helpers), and params. You can then test the `response` using Rspec
Rails's controller-specific matchers.

```ruby
# spec/requests/links_spec.rb

RSpec.describe "Links", type: :request do
  describe "GET /links" do
    it "works!" do
      # This line sends a `GET` request to /links.
      get links_path

      # These lines check to make sure that the response renders the index template.
      expect(response).to have_http_status(200)
      expect(response.body).to include("Links Index!")
    end
  end
end
```

You don't necessarily need both expect clauses; they are included here more
to illustrate the kinds of tests that are possible. Note that the last one will
check the response body--here, the rendered `index` view--to see if it includes
the text "Links Index!".

> **NOTE:** The RSpec docs currently suggest that request specs will accept
> `render_template` matchers: `expect(response).to render_template(:index)`.
> **`expect` assertions that involve `render_template` will not work!**
> `render_template` delegates to the Rails method `assert_template` that was
> removed when the Rails controller specs were marked for deprecation.
>
> The problem is that these template checks essentially test **implementation
> details**. You ultimately don't care whether or not the code calls the
> returned view `index`; you care that it actually returns an index of the
> requested items. Test for that behavior.

You can also include multiple requests in a single test:

```rb
# spec/requests/links_spec.rb

RSpec.describe "Links", type: :request do
  # ...

  describe 'Creates a new link' do
    it 'New form renders and successfully creates a link on valid submission' do
      # This line sends a `GET` request to /links/new.
      get new_link_path

      # This line checks to make sure that the response renders the new template.
      expect(response.body).to include("Create Link")

      # This line sends a `POST` request to /links.
      post links_path, params: { link: { title: "valid", url: "cats.com" } }

      # This line checks that it redirects to the show page of the newly created link.
      expect(response).to redirect_to(link_url(Link.last))
    end
  end
end
```

Finally, remember to test the controller's response under different conditions.
For example, you should also test your `LinksController`'s create method with
invalid params:

```ruby
context 'with invalid params' do
  it 'validates the presence of title and body' do
    post links_path, params: { link: { title: "invalid" } } # Problem: No `url`
    expect(response.body).to include('New Link') # I.e., it stays on the `New` page
    expect(response.body).to include('Url must be present') # Renders error message
  end
end
```

For more information on request specs, consult the
[documentation][rspec-request-docs].

[rspec-request-docs]: https://rspec.info/features/6-0/rspec-rails/request-specs/request-spec/
