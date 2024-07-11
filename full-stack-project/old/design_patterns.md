# Design Patterns

## Introduction

### Origin Story

When noble Object Orientation came to fair Software
Developmentlandia, the people waved their keyboards and cheered.
Now objects reigned; objects have state and they have methods and
they communicate with one another by calling those methods on one
another. How nice.

Though the structure was good, ivy began to overgrow it and code
became cluttered. In some developer homes (i.e. codebases), rot set
in. View logic was sprinkled into models, models grew to be
unmanageable, objects knew too much and cut across vast lands. When
something needed to be changed, everything needed to be changed.
Horror.

At first, developers began sharing ways in which they dealt with this
problem or that. Over time, these developers began writing these
solutions down and sharing them more systematically. They called these
ways "design patterns."

Today, patterns abound, some better than others, all aiming to make
the lives of us earnest and humble developers a little easier,
allowing us to construct our modern digital marvels with the right
tools for the job.

### The Gang of Four

Design patterns have been around for a long time (as long as code
itself) and there is no definitive tome with all the patterns that
have been created or discovered, but there are some that are more
common and reusable than others.

There is one tome, however, that contains many of the most common and
well-known patterns; that tome is called "Design Patterns: Elements of
Reusable Object-Oriented Software" by the infamous Gang of Four (no
joke, they're called the Gang of Four, like the Chinese political faction).

Four computer warriors (ahem...computer scientists) - Gamma, Helm,
Johnson, and Vlissides - banded together and scoured the land for
these most useful patterns and in the year of the Lord 1994, they
published said tome cataloging 23 such patterns.

It's not important to know all 23 patterns. Some of them you're
already familiar with and just don't know the name, others don't make
much sense in Ruby, and others would be new to you. Feel free to
browse through [some summaries][pattern-summaries].

[pattern-summaries]: http://www.blackwasp.co.uk/GofPatterns.aspx

## Rails Patterns

### Concerns: Breaking Models Up

In keeping with the general principle of Skinny Controllers, Fat
Models, we push as much logic as possible down into our models, which
keeps our controllers nice and streamlined. Fat models are great, but
only up to a point. Sometimes, the models themselves become
unmanageable.

Enter concerns. When your models get too big, it'd be nice to be able
to break them up. *The idea behind concerns is to group methods
together by functionality (i.e. a bunch of stuff that's "concerned"
with the same functionality) and pull them out into a module.* The
main benefit is a more manageable model that's split into chunks. An
additional benefit is that the module is potentially reusable.

You could implement this pattern straightforwardly yourself, but Rails
provides additional support for it through [`ActiveSupport::Concern
`][active-support-concern].

[active-support-concern]: http://api.rubyonrails.org/classes/ActiveSupport/Concern.html

For example:

```ruby
class Post < ActiveRecord::Base
  include Searchable
end

module Searchable
  # This extend gives us all of the nice features 
  # explained below.

  extend ActiveSupport::Concern



  # Macros:
  # For class methods that you would want to 
  # call in the body of the class (things like
  # has_many or attr_accessible), you put them in
  # an "included" block that ActiveSupport::Concern
  # will run with class_eval.

  included do
    make_searchable :title, :body
  end



  # Instance Methods:
  # You can define instance methods right in
  # module body as you normally would

  def searchable?
    ...
  end



  # Class Methods:
  # Class methods get defined in a special
  # nested module called ClassMethods that
  # ActiveSupport::Concern will make sure to 
  # 'extend' into your class when you include
  # the module.

  module ClassMethods
    def search
      ...
    end
  end
end
```

Macros, instance methods, class methods wrapped up in concerns. That's
everything you need to break your models up effectively and sensibly.
As you can see, a concern is a pattern that simply uses modules of
related functionality to break up models.


### Plain Old Ruby Objects: Making more models

Do you think that every model has to inherit from ActiveRecord::Base?
Do you think that every model has to have a table? Not true! Did I
just blow your mind?

Tableless models are bomb. Always be on the lookout for places in your
code where you could refactor into objects. When you find something,
don't be afraid to just create a plain old Ruby class in your `models`
directory and use it wherever. You don't always need persistence to
have an object/class/model do something useful for you - objects are
there to wrap up some data with some functions.

You won't inherit from ActiveRecord::Base, however, which does in fact
require a table to back the model. Your model need not inherit from
anything, and if you want some nice Rails model methods (things like
validations, callbacks, mass assignment, and naming conventions), you
can include those things individually from 
[`ActiveModel`][active-model-github]. You can also include them 
as a bundle with [`ActiveModel::Model`][active-model-api].

```
class LoginRequest
  include ActiveModel::Naming
  include ActiveModel::Validations
  include ActiveModel::Conversion

  ...
end
```

There is a library called `ActiveAttr` that serves as an
extension of `ActiveModel`. You would include
`ActiveAttr::BasicModel` or more specific individual modules from the
library. Take a look at its [github page][active-attr].

For more on this pattern of using plain old Ruby objects more often in
your code (and for a brief overview of `ActiveModel` and
`ActiveAttr`), check out this 
["Models Everywhere" presentation][models-everywhere] and 
this [RailsCast on `ActiveModel`][railscast-active-model].

[active-model-github]: https://github.com/rails/rails/tree/master/activemodel
[active-model-api]: http://edgeapi.rubyonrails.org/classes/ActiveModel/Model.html
[active-attr]: https://github.com/cgriego/active_attr
[models-everywhere]: https://speakerdeck.com/cgriego/models-models-every-where
[railscast-active-model]: http://railscasts.com/episodes/219-active-model


### Presenters: Keeping view logic out of models

We know that view logic belongs in our views and business logic
belongs in our models. But what to do when there is a bunch of
presentation logic related to our model?

One (poor) solution is to stick it all in the view. Two downsides:
clutter in the views, and unreusuable presentation logic.

Well, we could make it reusable by abstracting them out into view
helpers. Better, especially if you group them together in their own
view helper module.

Even better though is using a presenter. A presenter is basically an
object that contains presentation logic for another object. It would
go something like this:

```
# Note the use of a plain old Ruby object

# app/presenters/user_presenter.rb
class UserPresenter
  def initialize(user)
    @user = user
  end

  def twitter_url
    # Totally made up example but the idea is that there's
    # a bit of presentation logic here that shouldn't really
    # be in the User model, so we put it in this presenter here.

    name = @user.api_connections.where(service: 'twitter').username
    base_url = APIConnection.url_for(:twitter)
    base_url + "/#{name}"
  end
end

# app/controllers/users_controller.rb
class UsersController < ApplicationController
  def show
    user = User.find(params[:id])

    # Note how you pass the presenter object to the view,
    # instead of the model object itself.
    @user = UserPresenter.new(user)
    render :show
  end
end
```

Now our model gets to stay view-logic-free and we have a good place
to put all our user-related presentation logic.

The [`draper` gem][draper] provides additional support for presenters.
Check out the [docs][draper] or the [RailsCast][railscast-draper] for
more info.

Presenters are related to **decorators**, which are objects that
wrap other objects and provide additional functionality. You can
think of a presenter as a decorator that is specifically adding
presentation functionality. 

[draper]: https://github.com/drapergem/draper
[railscast-draper]: http://railscasts.com/episodes/286-draper

## Other Patterns

### Indirection: Delegation, Proxy, Mediator, and Adapter

One common general pattern is to introduce a layer of indirection 
between objects so that you can limit widespread dependencies. Many
of these patterns are quite similar and so are presented together
here in brief. 

Proxy is when one object sits on top of another and simply forwards
(i.e. proxies) method calls to the underlying object. The proxy serves
as an intermediary between the calling object and the object that
ultimately carries out the requested work.

**Proxy Example:** Totally plain proxies are tough to find since
usually the proxy pattern is combined with some more functionality (a
little bit of adapter or decorator or delegation mixed in). The Rails
router serves as a proxy to the controllers, though it is also an
adapter in a sense (adapting the controllers to the outside world - 
i.e. HTTP requests).

Delegation is quite similar to proxying, but is more typically used to
aggregate functionality. You might have a few different classes with
related functionality, but you don't want the outside world to have to
talk to each of those classes separately, so you would construct a new
class that acts as a public interface to the collection of classes.
This class would delegate to the underlying ones.

**Delegation Example:** jQuery's API provides an interface for us to
use, but under the hood it simply delegates to the real DOM API, and
it will use different methods depending on which browser it's in.

A mediator is an object that specifies how several objects interact.
It is a go-between, coordinating the activities of other objects.

**Mediator Example:** A Rails controller is a mediator between your
models, your views, and the request/response objects.

An adapter is an object that wraps another one with the intention of
presenting a standard public interface to the outside world. That is,
you may want to be able to swap out a certain piece of the program at
will, so you want to limit the impact of the change. What you would do
is write adapters for the pieces being swapped out so that to the rest
of the program, it always looked the same.

**Adapter Example:** Rails doesn't know or care about which database
you're using. The only parts of the program that know are the adapters
that you require in your Gemfile (`gem 'pg'` or `gem 'sqlite'`). The
adapters' job is to present a common public interface for the rest of
your Rails app so that you could swap out databases without much
hassle.

### Singleton: There Can Be Only One

[There Can Be Only One][highlander]. That's pretty much all you need
to know about the singleton pattern. We saw it with our `DBConnection`
class in Rails Lite. There can only be one `DBConnection` object at
any given time and by including Ruby's `Singleton` module and its
`instance` class method, we can enforce that. You could easily
implement the same pattern yourself.

[highlander]: http://www.youtube.com/watch?v=sqcLjcSloXs

### Observer

The observer pattern is very interesting and we've already used it 
heavily in JavaScript and Backbone. Every time you've used the `.on`
or `.listenTo` functions, you've been using the observer pattern. Its
usefulness comes with the fact that one object need not know or care
who or how many other objects are observing it; it can simply 
broadcast a change or message or event, and all the objects that
are observing it (the observers) can be notified of that message.

You may also hear this pattern called pub/sub, which is short for
publish/subscribe. Objects can publish messages and other objects can
subscribe to the object for those messages. Broadcasters/Publishers
and Observers/Subscribers.

## Resources

* [Design Patterns in JS][design-patterns-in-js]
* [Design Patterns in Ruby][design-patterns-in-ruby]

[design-patterns-in-ruby]: https://github.com/nslocum/design-patterns-in-ruby/
[design-patterns-in-js]: http://addyosmani.com/resources/essentialjsdesignpatterns/book/
