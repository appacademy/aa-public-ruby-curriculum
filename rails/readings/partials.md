# Partials

Views can get really long and complicated. Just like you break up long methods
into smaller ones, you can also break up views into smaller bits, called
**partials**. Like small methods, partials are often reusable in different
views, so they also help you keep your code DRY.

## Naming Partials

To render a partial as part of a view, you use the `render` method within the
view:

```erb
<h1>Page title</h1>

<p>
  Here's some content for you
</p>

<!-- insert standard footer -->
<%= render "footer" %>
```

This will render a template named __\_footer.html.erb__ and insert the rendered
content at this point within the view. Note the leading underscore character in
the filename: partials are named with a leading underscore to distinguish them
from regular views, even though **they are referred to without the underscore.**
This holds true even when you're pulling in a partial from another folder:

```erb
<%= render "shared/footer" %>
```

That code will pull in the partial from __app/views/shared/\_footer.html.erb__.

## Simplifying views with partials

One way to use partials is to treat them as the equivalent of subroutines: as a
way to move details out of a view so that you can grasp what's going on more
easily. For example, you might have a view that looked like this:

```erb
<%= render "shared/ad_banner" %>

<h1>Products</h1>

<p>Here are a few of our fine products:</p>
...

<%= render "shared/footer" %>
```

Here, the __\_ad\_banner.html.erb__ and __\_footer.html.erb__ partials could
contain content that is shared among many pages in your application. You don't
need to see the details of these sections when you're concentrating on a
particular page.

### Passing local variables

Just like with methods, you can also pass local variables into partials, making
them even more powerful and flexible. For example, you can use this technique to
reduce duplication between new and edit pages, while still keeping a bit of
distinct content:

```erb
<!-- app/views/user/new.html.erb -->
<%= render "form", user: @user, action: :new %>

<!-- app/views/user/edit.html.erb -->
<%= render "form", user: @user, action: :edit %>

<!-- app/views/user/_form.html.erb -->
<!-- Is this a new user to create, or an existing one to edit? -->
<% action_url = (action == :new) ? users_url : user_url(user) %>

<form action="<%= action_url %>" method="post">
  <% if action == :edit %>
    <input type="hidden" name="_method" value="patch">
  <% end %>
  <!-- inputs go here... -->
</form>
```

### Rendering objects

It is typical to have to render model objects often. Here's the long way:

```erb
<% @cats.each do |cat| %>
  <%= render "cat", cat: cat %>
<% end %>
```

There is a shorthand for this:

```erb
<% @cats.each do |cat| %>
  <%= render cat %>
<% end %>
```

Rails will look at the `cat` value, see it is a `Cat` model object, and will
look for a __\_cat.html.erb__ partial template to use. It will then render the
template, setting a variable named `cat` inside the partial, so that you can use
a more semantically meaningful name within:

```erb
<!-- app/views/shared/_cat.html.erb -->
<ul>
  <li>Name: <%= cat.name %></li>
  <li>Age: <%= cat.age %></li>
</ul>
```

How do you think it knows to set the `cat` variable? The same way it decides the
partial to render: it looks at the class name of the model object and uses that.

### Rendering collections

As seen above, partials are very useful in rendering collections. Just like
there is a shortcut to render a model object, you can also easily render an
array of model objects:

```erb
<%= render @cats %>
```

Rails will render the __\_cat.html.erb__ partial once for each item, setting the
`cat` local variable as before.

## Hint: Pass locals, don't use instance variables

Partials, like regular views, have access to controller instance variables. You
could do the following:

```erb
<!-- app/views/user/new.html.erb -->
<!-- controller has set `@user` -->
<%= render "form" %>

<!-- app/views/user/_form.html.erb -->
<!-- Is this a new user to create, or an existing one to edit? -->
<% action_url = @user.persisted? ? user_url(@user) : users_url %>

<form action="<%= action_url %>" method="post">
  <% if @user.persisted? %>
    <input type="hidden" name="_method" value="put">
  <% end %>
  <!-- inputs go here... -->
</form>
```

However convenient it may seem to just use instance variables when creating
partials, remember that you want to make partials flexible and non-reliant on
sources of data defined outside of their scope. This also simplifies your
debugging process. Failing to provide a required instance variable can produce
confusing errors; failing to define a local variable raises the unambiguous `"no
local variable defined"` error.
