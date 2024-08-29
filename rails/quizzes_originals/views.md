# Rails Views

```ruby
# Consider the following routes table:

Prefix    |   Verb   |     URI Pattern             |  Controller#Action
---------------------------------------------------------------
voters    |  GET     |   /voters(.:format)         |    voters#index
          |  POST    |   /voters(.:format)         |    voters#create
new_voter |  GET     |   /voters/new               |    voters#new
edit_voter|  GET     |   /voters/:id/edit(.:format)|    voters#edit
voter     |  GET     |   /voters/:id(.:format)     |    voters#show
          |  PATCH   |   /voters/:id(.:format)     |    voters#update
          |  PUT     |   /voters/:id(.:format)     |    voters#update
```

<quiz>
  <question >
  <p>Suppose you have a form at `/voters/:id/edit` for voters to update their information.  What are the correct `action` and `method` values for that form, respectively?</p>
    <answer>`/voters/:id`, `post`</answer>
    <answer>`/voters`, `post`</answer>
    <answer correct>`/voters/:id`, `patch`</answer>
    <answer>`/voters/:id/edit`, `patch`</answer>
    <answer>`/voters`, `patch`</answer>
    <explanation>The main clue here is that in order for your form to *update* information in the database, it needs to make a `patch` request. If you know the verb is `patch` then you can look in the table above to find the matching URL.</explanation>
  </question>
</quiz>

```ruby
# app/controllers/voters_controller.rb
class VotersController < ApplicationController
  def index
    voters = Voter.all
    render :index
  end
end
```

```html
<!-- app/views/voters/index.html.erb -->
<h1>List of Registered Voters:</h1>

<ul>
  <% voters.each do |voter| %>
    <li> <%= voter.full_name %> </li>
  <% end %>
</ul>
```

<quiz>
  <question >
  <p>What is wrong with the above code?</p>
    <answer>A list item cannot have nested ERB code.</answer>
    <answer>`VotersController#index` should redirect, not render.</answer>
    <answer correct>`voters` will be undefined in the index view.</answer>
    <answer>The index page should show information for only one voter.</answer>
    <answer>Nothing is wrong.</answer>
    <explanation>An HTML view can only access a controller's **instance variables**, not its local variables. Accordingly, for the code above to work, the `index` controller would need to store the `Voter`s in an instance variable--e.g., `@voters`--that the HTML view then accesses.</explanation>
  </question>
</quiz>

<quiz>
  <question >
  <p>Which of the following is **NOT** a valid HTTP verb?</p>
    <answer>`GET`</answer>
    <answer>`PATCH`</answer>
    <answer>`PUT`</answer>
    <answer correct>`DESTROY`</answer>
    <answer>`POST`</answer>
    <explanation>This one is tricky! The HTTP verb is not destroy but `DELETE`.</explanation>
  </question>
</quiz>

```ruby
class VotersController < ApplicationController
  def edit
    @voter = Voter.find_by(id: params[:id])
    render :edit
  end

  def update
    @voter = Voter.find_by(id: params[:id])

    if @voter.update(voter_params)
      redirect_to voter_url(@voter)
    end

    render :edit
  end

  private
  def voter_params
    params.require(:voter).permit(:name, :ssn)
  end
end
```

<quiz>
  <question >
  <p>What is wrong with the above code?</p>
    <answer>The voter params are not properly filtered.</answer>
    <answer>`update` will not persist to the database.</answer>
    <answer correct>It may throw a double render error.</answer>
    <answer>`update` should not render the `edit` template.</answer>
    <explanation>A Rails controller cannot `render` twice. (`redirect_to` counts as a form of `render`.) In the code above, a successful `update` would cause the controller to attempt both to `redirect` and, because there is no `return` statement after the `redirect`, to `render`.</explanation>
  </question>
</quiz>

<quiz>
  <question >
  <p>In the Gemfile for a Rails project, in which block should the `binding_of_caller` and `better_errors` gems be nested?</p>
    <answer correct>`group :development`</answer>
    <answer>`group :production`</answer>
    <answer>They should not be nested within any block</answer>
    <explanation>Since `binding_of_caller` and `better_errors` create a security risk by exposing the inner workings of your code, you never want to include them in a `production` environment. They can also lead to false results in a `test` environment. Accordingly, you should nest them in the `development` group.</explanation>
  </question>
</quiz>

```html
<!--  _form.html.erb -->
  <label for="name"></label>
  <input type="text" name="voter[name]" id="name">

  <label for="ssn"></label>
  <input type="text" name="voter[ssn]" id="ssn">

  <input type="submit" value="Submit!">
</form>

<!--  edit.html.erb -->
<h1>Update Voter!</h1>

<form action="/voters/#{@voter.id}" method="post">
  <input type="hidden" name="_method" value="patch">

  <%= render 'form', voter: @voter %>
```

<quiz>
  <question >
  <p>What is wrong with the above code snippet?</p>
    <answer>The name of partial is wrong; it should be `_form`.</answer>
    <answer>Forms cannot span two templates.</answer>
    <answer>The params are incorrectly nested.</answer>
    <answer>Form action must use a Rails url helper method.</answer>
    <answer correct>`@voter.id` needs to be evaluated within printing ERB tags.</answer>
    <answer>There is nothing wrong.</answer>
    <explanation>ERB won't interpolate values unless they are within printing ERB tags!</explanation>
  </question>
</quiz>
