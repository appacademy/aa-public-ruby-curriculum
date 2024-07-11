# Authorization with CanCan

CanCan is an authorization library for Ruby on Rails which restricts what resources a given user is allowed to access. All permissions are defined in a single location (the Ability class) and not duplicated across controllers, views, and database queries.

## Setup

```ruby
# Gemfile
gem "cancan"
```
CanCan expects a `current_user` method to exist in the controller. So lets set up some authentication like [Devise][devise].

User permissions are defined in an Ability class which we can generate using: `rails g cancan:ability`. This will generate an `Ability` class in app/models/ability.rb.

```ruby
class Ability
  include CanCan::Ability

  def initialize(user)
  end
end
```

We can edit the body of the `initialize` method of `Ability` to limit who _can_ do what.
**Example**:

```ruby
def initialize(user)
    user ||= User.new # guest user
    if user.role? :admin
      can :manage, :all
    else
      can :read, :all
      can :create, Comment
      can :update, Comment do |comment|
        comment.try(:user) == user || user.role?(:moderator)
      end
      if user.role?(:author)
        can :create, Article
        can :update, Article do |article|
          article.try(:user) == user
        end
      end
    end
end
```

The `current_user`’s permissions can then be checked using the `can?` and `cannot?` methods in the view and controller.

```html
<!-- views/articles/show.html.erb -->
<% if can? :update, @article %>
  <a href="<%= edit_article_path(@article) %>">Edit</a>
<% end %>
```

The `authorize!` method in the controller will raise an exception if the user is not able to perform the given action.

```ruby
# articles_controller.rb
def show
  @article = Article.find(params[:id])
  authorize! :read, @article
end
```
The `load_and_authorize_resource` method is provided to automatically authorize all actions in a RESTful style resource controller. It will use a before filter to load the resource into an instance variable and authorize it for every action.

```ruby
class ArticlesController < ApplicationController
  load_and_authorize_resource

  def show
    # @article is already loaded and authorized
  end
end
```

To run authorization on every action in your application, add `check_authorization` to your ApplicationController.
```ruby
class ApplicationController < ActionController::Base
  check_authorization
end
```


## Resources

* [CanCan - Railscast][railscast-192-authorization]

[railscast-192-authorization]: http://railscasts.com/episodes/192-authorization-with-cancan
[devise]: https://github.com/plataformatec/devise
