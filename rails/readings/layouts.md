# Layouts

When Rails renders a view as a response, it does so by inserting the rendered
template into a **layout** to form the complete response. This lets you focus on
writing the page-specific information in the template without having to
duplicate surrounding data like the `<html>` and `<head>` tags, as well as any
header, navbar, or footer structure. You might also load site-wide JavaScript in
the layout.

Layouts live in __app/views/layouts__; here's the default
__application.html.erb__ layout:

```erb
<!DOCTYPE html>
<html>
  <head>
    <title>Rails 7.3 App</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>

    <%= stylesheet_link_tag "application", "data-turbo-track": "reload" %>
    <%= javascript_importmap_tags %>
  </head>

  <body>
    <%= yield %>
  </body>
</html>
```

> Note: Since a minimal Rails build does not include JavaScript, an app created
> with the `--minimal` flag will replace the last two lines of the <head> ...
> </head> block simply with `<%= stylesheet_link_tag "application" %>`.

## Understanding `yield`

Within the context of a layout, `yield` identifies a section where content from
the view should be inserted. The simplest way to use this is to have a single
`yield`, into which the entire contents of the view currently being rendered is
inserted (see above).

You can also create a layout with multiple yielding regions:

```erb
<html>
  <head>
  <%= yield :head %>
  </head>
  <body>
  <%= yield %>
  </body>
</html>
```

The main body of the view will always render into the unnamed `yield`. To render
content into a named `yield`, you use the `content_for` method.

The `content_for` method allows you to insert content into a named `yield` block
in your layout. For example, this view would work with the layout that you just
saw:

```erb
<% content_for :head do %>
  <title>A simple page</title>
<% end %>

<p>Hello, Rails!</p>
```

The result of rendering this page into the supplied layout would be this HTML:

```erb
<html>
  <head>
    <title>A simple page</title>
  </head>
  <body>
    <p>Hello, Rails!</p>
  </body>
</html>
```

The `content_for` method is very helpful when your layout contains distinct
regions such as sidebars and footers that should get their own blocks of content
inserted. It's also useful for inserting tags that load page-specific JavaScript
or CSS files into the header of an otherwise generic layout.

## Asset tags

Layouts are typically responsible for directing the browser to load site-wide
JavaScript and CSS. JavaScript and CSS source code are not (typically) embedded
in the HTML response; instead, the HTML contains `<script>` and `<link>` tags in
the header that direct the browser to make subsequent requests for the JS and
CSS files to load.

For instance, to direct the client to load __common.js__, you would use the
`javascript_include_tag` helper:

```ruby
javascript_include_tag "common"
# => <script src="/assets/common.js"></script>
```

> Note: You won't have need to incorporate JavaScript like this into the Rails
> projects that you build for App Academy.

Likewise, to tell the browser to use the css file __application.css__, you would
use `stylesheet_link_tag`:

```ruby
stylesheet_link_tag "application"
# => <link href="/assets/application.css" media="screen" rel="stylesheet" />
```

As you can see, both of these tags direct the browser to fetch another resource
from the server. When you learn about the **asset pipeline**, you'll learn where
these files are stored (__app/assets__) and how to add your own JS/CSS files.
