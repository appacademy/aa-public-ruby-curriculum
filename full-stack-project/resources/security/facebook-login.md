## OmniAuth and Facebook Login

We're going to set up Facebook login as an example of Omniauth. The basic structure will very similar for any OmniAuth provider.

You can check out the [OmniAuth docs][omniauth-docs] or Devise's own [OmniAuth overview][devise-omniauth] with Facebook example. Devise's page also has an example with Google and OAuth2 (another authentication strategy).

[omniauth-docs]: https://github.com/intridea/omniauth
[devise-omniauth]: https://github.com/plataformatec/devise/wiki/OmniAuth%3A-Overview

### Add necessary gems and setup the model

Each provider has their own `omniauth` gem. You'll want to make sure you have the `omniauth` gem installed as well as any gems specific to the providers you want to use.

Add `omniauth` and `omniauth-facebook` to your `Gemfile`.

Create and run a migration that adds `provider` and `uid` columns to your `users` table. These columns are necessary to authenticate through OmniAuth with Devise.

```
class AddOmniAuthColumnsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :provider, :string
    add_column :users, :uid, :string
  end
end
```


### Setup your Facebook credentials

Developers must set up their application with Facebook. You must get an API key and do some other setup. Go [here][facebook-apps] to do so.

[facebook-apps]: https://developers.facebook.com/apps

### Configure Facebook oauth keys

Now that you have your app's keys from Facebook, you need to configure OmniAuth to use them when it sends users to Facebook to login. You will do so in your `devise.rb` initializer file, which can be found in the `config` directory.

```
--- a/rails/DeviseDemo/config/initializers/devise.rb
+++ b/rails/DeviseDemo/config/initializers/devise.rb
@@ -205,7 +205,7 @@ Devise.setup do |config|
   # ==> OmniAuth
   # Add a new OmniAuth provider. Check the wiki for more information on setting
   # up on your models and hooks.
-  # config.omniauth :github, 'APP_ID', 'APP_SECRET', :scope => 'user,public_repo'
+  config.omniauth :facebook, '428173313926594', 'aeed8d919aa2cc066c6564b08db6a5ec'
```

By default, you'll get some basic information about the user back from Facebook but you may want to ask for more permissions from the user. You would do so by adding the `:scope` option to the above `config.omniauth` line. See the [`omniauth-facebook` wiki][oa-facebook] for more info.

[oa-facebook]: https://github.com/mkdynamic/omniauth-facebook

---
**Note on Environment Variables:**

We put the key and secret in plain text in the Devise intializer above. **DO NOT DO THIS.** When you push your code to GitHub, these will be out there for the world to see. Use a tool like [Figaro][figaro] instead to set some `ENV` variables that can be accessed in the app without compromising their security.

[figaro]: https://github.com/laserlemon/figaro

---

### Make the user omniauthable

You'll have to make some edits in your model now. Devise has modules `omniauthable` and `omniauth_providers` for this purpose. Make sure to white-list the `provider` and `uid` for mass-assignment as well.

```
--- a/rails/DeviseDemo/app/models/user.rb
+++ b/rails/DeviseDemo/app/models/user.rb
@@ -4,9 +4,12 @@ class User < ActiveRecord::Base
   # :lockable, :timeoutable and :omniauthable
   devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
+  devise :omniauthable, :omniauth_providers => [:facebook]
   devise :confirmable

   # Setup accessible (or protected) attributes for your model
   attr_accessible :email, :password, :password_confirmation, :remember_me
+
+  # for oauth
+  attr_accessible :provider, :uid
 end
```

### Handle the callback

Devise will list facebook login as an option now. Users can click to
be directed to Facebook, where they will give permissions to the app,
then be redirected to a callback url. For instance, Facebook users
would be redirected to `users/auth/facebook`. But we need to setup a
controller to handle this.

```
rails g controller OmniAuthCallbacks
```

Facebook will send the user to the callback, sending along the necessary data. We can access that data in the `request`.

`request` is a special controller method to get the HTTP request (much
like `param` or `session`). `request.env` pulls out data from the
request header. The oauth details are sent as part of the Facebook
redirect request in `request.env['omniauth.auth']`.

`omniauth_callbacks_controller.rb`:

```
class OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    facebook_data = request.env["omniauth.auth"]

    # You need to implement the method below in your model
    @user = User.find_or_create_by_facebook_oauth(facebook_data)

    sign_in_and_redirect @user
  end
end
```

`User.rb`:

```
class User

  ....

  def self.find_or_create_by_facebook_oauth(auth)
     user = User.where(:provider => auth.provider, :uid => auth.uid).first

     unless user
       user = User.create!(
       provider: auth.provider,
       uid: auth.uid,
       email: auth.info.email,
       password: Devise.friendly_token[0,20]
     )
     end

    user
  end
end
```

`routes.rb`:

```
  devise_for :users, :controllers => {
    :omniauth_callbacks => 'omniauth_callbacks'
  }

```

Voila. You've got Facebook login setup.

---

Let's say you wanted not just login but Facebook API integration. For that, you can use the [`koala`][koala] gem.

[koala]: https://github.com/arsduo/koala

### Add `koala`

First we need to save the access token. Migrate the db to add a column
to `users`:

```
class AddAccessTokenToUsers < ActiveRecord::Migration
  def change
    add_column :users, :access_token, :string
  end
end
```

Then, you need to make sure to save it when creating the `User`:

```
class User < ActiveRecord::Base
   def self.find_or_create_by_facebook_auth(auth)
     user = User.where(:provider => auth.provider, :uid => auth.uid).first

     unless user
       user = User.create!(
         provider: auth.provider,
         uid: auth.uid,
         email: auth.info.email,
+        access_token: auth.credentials.token,
         password: Devise.friendly_token[0,20]
       )
     end
   end
end
```

Add `koala` to the Gemfile.

Now you can use the access token with Koala.

```
class User < ActiveRecord::Base
+
+  def facebook_friends
+    graph = Koala::Facebook::API.new(access_token)
+    graph.get_object("me")
+    graph.get_connections("me", "friends")
+  end
 end
```

```
>> User.first.facebook_friends
  User Load (0.2ms)  SELECT "users".* FROM "users" LIMIT 1
 => [{"name"=>"Diana Zmuda", "id"=>"1264910957"}]
```
