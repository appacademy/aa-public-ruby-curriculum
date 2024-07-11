# Debugging Rails

Congratulations, you can write a Rails application! Now it's important to learn
how to debug Rails applications well.

## Before you start

Bugs happen. Don't be afraid of trying something because you are scared it might
not work. Part of being a programmer is giving your crazy ideas a shot to see if
they work. That is why you have Git at your disposal; remember to use Git as a
safety net that WILL save you if you ever mess up really badly.

## Google is your friend

When it comes to Rails, chances are that someone has already asked the exact
same question that you have. StackOverflow will generally have a question
related to yours on it. Be sure to get into the habit of googling when something
goes wrong or you don't know something. Your TA is always happy to help, but
when you leave App Academy, your TA won't be there for you. Part of being a good
developer is knowing how to find the answers yourself.

## Byebug

Models are tucked away from you and aren't openly exposed through a UI like
views and controllers. This may make it a little more difficult at times to work
out if something is going wrong in your model. However, this is where error
messages will become your friend. Look out for things that relate to your models
such as:

* Unknown attribute XYZ
* Undefined method ABC for XYZ

Models behave fairly similarly to classes that you would have written in the
first few weeks of App Academy. Why? Because they are classes themselves, just
with extra Rails functionality built into them.

Therefore to debug them, make use of your good friend `byebug`.

Add `gem 'byebug'` to your `Gemfile` and `bundle install`.

You can also type

```ruby
(byebug) help
```

inside of byebug to get a list of available commands.

## Better Errors

So now you can debug your models like a pro, but that's only 1/3 of the battle.
Being able to debug your controllers is a crucial skill, and one that you should
make sure that you are comfortable with.

It's important that you can realize when something is going wrong in your
controller. For example, maybe an object isn't being created properly from your
params, or you aren't being sent the right params in the first place.

In order to debug your controllers, start using these two gems:

```ruby
# Gemfile
group :development do
  gem 'better_errors'
  gem 'binding_of_caller'
end

# It's important that these go in a development group. If you have
# these available in production mode, then when you launch your site,
# if an error occurs, users will have access to your code and be able
# to do things like User.destroy_all
```

Better Errors will make your error pages a lot nicer to read. You will be able
to get stack traces as well as see useful information such as `params`.  (Note
that Better Errors causes issues with RSpec, and you should probably not use it
during assessments.)

`binding_of_caller` gives you an interactive REPL inside the `better_errors`
page. It's like a cross between the debugger and pry, except you can use it in
the browser. This is very useful for inspecting values that you have assigned
and testing your code as it runs.

Using `better_errors` and `binding_of_caller` is required. Always set this up.
:-)

**Using Better Errors**

Better errors is going to open whenever your code throws an exception of some
sort. What happens if your code isn't throwing an error, but doesn't work the
way that you want it to?

Luckily, your controllers have a method called `fail`. By typing
fail in a controller, it basically pauses your code at that point and
will open up Better Errors. For example,

```ruby
# app/controllers/posts_controller.rb

class PostsController < ApplicationController
  def create
    @post = Post.new(params[:id])
    fail

    if @post.save
      redirect_to @post
    else
      flash[:errors] ||= []
      flash[:errors] << @post.errors.full_messages.to_sentence
      render :new
    end
  end
end
```

With this fail, your code will stop just after `@post = Post.new(params[:id])`.
You can now do things like `p @post` and try to save it manually to see what's
going wrong with your code.

Using `fail` is very useful and is something you should do often. It
will allow you to step into your controller as it runs and make sure
things like params are coming in correctly.

**Useful things to do inside of a controller when debugging**

* Check what the params are.
* Try `@object.save`. If it returns `false`, then call `@object.valid?`
  and check `@object.errors.full_messages`. This will allow you to see
  what validations are failing.
* Make sure things like `current_user` are working.
* Make sure instance variables are set correctly.
* Check that you have called `permit` on the params when building
  objects.
* Check that objects being built via associations are built correctly. E.g.,
  `current_user.posts.new(post_params)`.

For further debugging tips, take a look at the Rails [Docs][debugging-reading].

[debugging-reading]:
<https://edgeguides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-byebug-gem>
