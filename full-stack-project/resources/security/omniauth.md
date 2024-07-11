# OmniAuth

## `omniauth` on `devise`

OmniAuth is a library that standardizes authentication via multiple providers or
strategies. A common convenience of todays web applications is to login via
another provider/strategy.

OmniAuth can be used to authenticate to third party systems to make requests on
behalf of the user, or as a method of authenticating users.

### Examples
* [Facebook][facebook-provider]
* [Twitter][twitter-provider]
* [Google][google-provider]
* [Github][github-provider]
* [LinkedIn][linkedin-provider] or [LinkedIn(b)][linkedin-provider2]
* [OTHERS][provider-list]

![flowchart](https://assets.aaonline.io/fullstack/full-stack-project/resources/assets/omni_auth_internal.png)

### Getting Started

* Install devise.

```sh
rails generate devise:install
rails generate devise user
```

* OmniAuth uses uid, provider, token, secret (`Authorization`) and name (`User`)
  attributes. One `User` has_many `Authorization`s.

```sh
rails g migration add_name_to_users name:string
rails g model Authorization provider:string uid:string user_id:integer token:string secret:string name:string link:string
rails db:migrate
```

Ensure the `omniauth` gem and all of the supporting provider/strategy gems are
also included (`omniauth-facebook`) in your __Gemfile__.

```ruby
# Gemfile
gem 'omniauth'
# providers
gem 'omniauth-facebook'
# gem 'omniauth-twitter'
# gem 'omniauth-google'

gem 'uuidtools'
```

### Config

Setup mailer host. Use `letter_opener` gem in development.

```ruby
# development.rb
config.action_mailer.default_url_options = { :host => 'localhost:3000' }
```

Visit the provider's developer API documentation and sign up for an API key.

```ruby
# devise.rb
config.omniauth :facebook, "key", "secret"
```

### Models

`User` and `Authorization` classes might be setup like this:

```ruby
# user.rb
class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable, :confirmable, :omniauthable

  attr_accessible :email, :name, :password, :password_confirmation, :remember_me

  has_many :authorizations, :dependent => :destroy
end
```

```ruby
# authorization.rb
class Authorization < ActiveRecord::Base
  belongs_to :user
end
```

### Routes

The route helper provided by devise--`devise_for :users`--can be customized to
use omniauth controllers using the following additional parameters:

```ruby
# routes.rb
devise_for :users, controllers: { omniauth_callbacks: "omniauth_callbacks" }
```

### Controllers

The user is redirected to the provider and asked to authenticate, the provider
will redirect to your "callback url". A `Devise::OmniauthCallbacksController`
can be used to handle these requests.

```ruby
class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  require 'uuidtools'

  def facebook
    oauthorize "Facebook"
  end

  private

  def oauthorize(kind)
    @user = find_for_ouath(kind, env["omniauth.auth"], current_user)
    if @user
      flash[:notice] = I18n.t "devise.omniauth_callbacks.success", :kind => kind
      session["devise.#{kind.downcase}_data"] = env["omniauth.auth"]
      sign_in_and_redirect @user, :event => :authentication
    end    
  end

  def find_for_ouath(provider, access_token, resource=nil)
    user, email, name, uid, auth_attr = nil, nil, nil, {}
    case provider
    when "Facebook"
      uid = access_token['uid']
      email = access_token[:info][:email]
      auth_attr = { :uid => uid,
                    :token => access_token['credentials']['token'],
                    :secret => nil,
                    :name => access_token[:info][:name],
                    :link => access_token[:info][:urls]["Facebook"]
                  }
    else
      raise 'Provider #{provider} not handled'
    end
    if resource.nil?
      if email
        user = find_for_oauth_by_email(email, resource)
      elsif uid && name
        user = find_for_oauth_by_uid(uid, resource)
        if user.nil?
          user = find_for_oauth_by_name(name, resource)
        end
      end
    else
      user = resource
    end

    auth = user.authorizations.find_by_provider(provider)
    if auth.nil?
      auth = user.authorizations.build(:provider => provider)
      user.authorizations << auth
    end
    auth.update_attributes auth_attr

    return user
  end

  def find_for_oauth_by_uid(uid, resource=nil)
    user = nil
    if auth = Authorization.find_by_uid(uid.to_s)
      user = auth.user
    end
    return user
  end

  def find_for_oauth_by_email(email, resource=nil)
    if user = User.find_by_email(email)
      user
    else
      user = User.new(:email => email, :password => Devise.friendly_token[0,20])
      user.save
    end
    return user
  end

  def find_for_oauth_by_name(name, resource=nil)
    if user = User.find_by_name(name)
      user
    else
      user = User.new(:name => name, :password => Devise.friendly_token[0,20], :email => "#{UUIDTools::UUID.random_create}@host")
      user.save :validate => false
    end
    return user
  end
end
```

## Options

Between Devise and OmniAuth, you can build really nice Authentication workflows.
Authentication is the "who are you?", Authorization is the "may you access this
resource?"

Read through the CanCan reading for more about Authorization.

## OmniAuth, cont.

Now that you've seen how you can [authenticate using OmniAuth][omniauth], let's
take a look at how you might use the credentials provided to make requests of a
provider on behalf of a user.

The credentials stored in an `Authorization` can be used to make OAuth requests.

See how you can make a twitter_client attribute of user? This can be used to interact with the [twitter][twitter-client] API.

```ruby
class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable, :confirmable, :omniauthable

  attr_accessible :email, :name, :password, :password_confirmation, :remember_me

  has_many :authorizations, dependent: :destroy

  has_many :tweets

  def twitter_client
    twitter_auth = authorizations.where(provider: "Twitter").first
    return [] unless twitter_auth
    Twitter::Client.new(
      :oauth_token => twitter_auth.token,
      :oauth_token_secret => twitter_auth.secret
    )
  end
end
```

This allows you access to a variety of Twitter resources. Let's pull the
timeline of the `current_user`:

```erb
<%= current_user.twitter_client.home_timeline.first.to_json %>
```

## Resources

* [OmniAuth][omniauth]
* [Setup Gist][setup-gist]
* [Simple OmniAuth Railscast][omniauth-simple-railscast]
* [Devise + OmniAuth Railscast][omniauth-devise-railscast]
* [OmniAuth part1 Railscast][omniauth-part1-railscast]
* [OmniAuth part2 Railscast][omniauth-part2-railscast]

[omniauth]: https://github.com/omniauth/omniauth
[setup-gist]: https://gist.github.com/schleg/993566
[omniauth-simple-railscast]: http://railscasts.com/episodes/241-simple-omniauth-revised
[omniauth-devise-railscast]: http://railscasts.com/episodes/235-devise-and-omniauth-revised
[omniauth-part1-railscast]: http://railscasts.com/episodes/235-omniauth-part-1
[omniauth-part2-railscast]: http://railscasts.com/episodes/236-omniauth-part-2
[facebook-provider]: https://github.com/mkdynamic/omniauth-facebook
[twitter-provider]: https://github.com/arunagw/omniauth-twitter
[linkedin-provider]: https://github.com/skorks/omniauth-linkedin
[linkedin-provider2]: https://github.com/decioferreira/omniauth-linkedin-oauth2
[google-provider]: https://github.com/zquestz/omniauth-google-oauth2
[github-provider]: https://github.com/intridea/omniauth-github
[provider-list]: https://github.com/intridea/omniauth/wiki/List-of-Strategies
[twitter-client]: https://github.com/sferik/twitter
