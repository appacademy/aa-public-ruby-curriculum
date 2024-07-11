# View helpers

When writing your view templates, you want to keep them DRY like the rest of
your code. You've seen that you can do this using partials. Rails also gives you
another tool: view helpers.

View helpers are Ruby methods that can be called from your view. The job of view
helpers is to hold **view specific** code that DRYs up templates. The most
popular view helper is [`link_to`]. [`form_with`] is a common helper for
building forms. You'll see many more Rails helpers.

> **Note:** Because `link_to` and `form_with` do significant work for you behind
> the scenes, **you will not be allowed to use them on assessments** and are
> discouraged from using them on practices. They are good to know about, but you
> should use them only once you understand (and can implement!) the code that
> they abbreviate.

You can also write your own helpers: they are stored in
__app/helpers/#{controller}_helper.rb__. Any view logic that will be repeated
should be broken out to a helper method.

It's common to write helper methods for repeated chunks of HTML you might use
all over the place. Some examples might be to highlight a string or display a
user picture.

```ruby
# app/helpers/application_helper.rb
module ApplicationHelper
  def highlight(text)
    "<strong class=\"highlight\">#{h(text)}</strong>".html_safe
  end

  def picture_for(user)
    html = '<div class="user-picture">'
    html += "<img src=\"#{user.picture_url}\" alt=\"#{h(user.name)}\">"
    html += '</div>'

    html.html_safe
  end
end
```

You can then use these helpers in any of your views:

```erb
<!-- app/views/cats/show.html.erb -->
<p>
  How can one not like <%= highlight "cats" %>? They are my favorite!
</p>

<%= picture_for @cat %>
```

You should really lean on helpers to keep your templates clean and readable.
View partials are useful for breaking up larger bits of repeated code, but
repeated snippets of a few lines are best stored in helpers.

To organize your helper methods, Rails lets you make as many helper module files
as necessary. They go in the folder __app/helpers__. All the methods in these
modules will be available in every view. For example, a helper method in
__app/helpers/user_helpers__ will still be available in a __app/views/posts__
view. You may put non-specific helper methods in the `ApplicationHelper` module
Rails has generated for you.

[`link_to`]: https://api.rubyonrails.org/classes/ActionView/Helpers/UrlHelper.html#method-i-link_to
[`form_with`]: https://guides.rubyonrails.org/form_helpers.html#dealing-with-basic-forms

## Escaping HTML

Rails escapes all HTML when it prints out content in ERB tags.

```erb
<%= '<p>This paragraph tag will be escaped</p>' %>
<!--
Outputs: &lt;p&gt;This paragraph tag will be escaped&lt;/p&gt;
-->
```

This prevents user generated HTML from sneaking into the page. It's the same
idea as using `?` in a SQL query to protect against a SQL injection attack. This
prevents HTML injection.

In HTML injection, a malicious user embeds links or JavaScript in their uploaded
content. Anyone who views that content will be affected. A common case is
embedding a link to the hacker's site to improve SEO. In the worst case though,
it could be an official-looking link to a phishing site or JavaScript that
scrapes private user data from the page and sends it to the hacker's servers.

When making helper methods that generate HTML for us this becomes problematical.
Your helper builds up a string, which should be inserted into the HTML
unescaped.

Fortunately, Rails added an `.html_safe` method to the `String` class, which
lets you bypass the escaping. Any string marked `html_safe` will not be escaped
when inserted into a view.

```erb
<%= '<p>This will NOT be escaped</p>'.html_safe %>
<!--
Outputs: <p>This will NOT be escaped</p>
-->
```

So, for instance:

```ruby
# app/helpers/application_helper.rb
module ApplicationHelper
  def highlight(text)
    "<strong class=\"highlight\">#{text}</strong>".html_safe
  end
end
```

wouldn't work without `html_safe`.

However, you're now at risk of an injection attack. Do you trust `text`? Could
that come from the user? What if they try something sneaky?

Just like there is a way to mark a string as HTML safe so that it won't be
escaped when inserted into a template, there's a way to escape an HTML unsafe
string: you use the `html_escape` method (an alias, `h`, is conveniently short
and thus more common):

```ruby
# app/helpers/application_helper.rb
module ApplicationHelper
  def highlight(text)
    "<strong class=\"highlight\">#{h(text)}</strong>".html_safe
  end
end
```

You can read more [here][erb-util-doc].

## Capturing a block in ERB

Sometimes you want to pass a lot of content into a helper. Rails conveniently
lets you render ERB blocks into text using the [`capture`][rails-api-capture]
method.

```ruby
def long_quote(author, &block)
  text = capture(&block)

  html = "<blockquote cite=\"#{h(author)}\">"
  html += text
  html += "</blockquote>"

  html.html_safe
end
```

Alright, let's do it!

```erb
<%= long_quote("_whytheluckystiff") do %>
  <p>
    All you need to know thus far is that Ruby is basically built from
    sentences. They aren’t exactly English sentences. They are short
    collections of words and punctuation which encompass a single
    thought.
  </p>

  <p>
    Look ma, a <%= link_to "link",
    "http://en.wikipedia.org/wiki/Why_the_lucky_stiff" %>
  </p>

  <p>
    These sentences can form books. They can form pages. They can form
    entire novels, when strung together. Novels that can be read by
    humans, but also by computers.
  </p>
<% end %>
```

[rails-api-capture]: http://api.rubyonrails.org/classes/ActionView/Helpers/CaptureHelper.html#method-i-capture
[erb-util-doc]: http://api.rubyonrails.org/classes/ERB/Util.html
