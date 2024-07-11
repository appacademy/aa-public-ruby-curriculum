# Templates

As you've seen, controllers cause templates to be rendered by calling the
`render` method. But how are templates structured? Answer: with HTML and ERB
(and love!).

## ERB (embedded Ruby)

Templates consist of HTML, but they are augmented with Ruby code. ERB templates
are pretty simple:

* `<% ruby_code_here %>` executes Ruby code that does not return anything, e.g.,
  conditionals, loops, or blocks.
* `<%= %>` is used when you want to embed the return value into the template,
  i.e., something that will actually show up in the HTML.

For example:

```erb
<b>Names of all the people</b>
<ul>
  <% ['Tom', 'Dick', 'Harry'].each do |name| %>
    <li>
      Name: <%= name %>
    </li>
  <% end %>
</ul>
```

The loop is set up in regular embedding tags `<% %>` and the name is written
using the output embedding tag `<%= %>`. Output functions like `print` or `puts`
won't work with ERB templates. So this would be wrong:

```erb
<!-- WRONG -->
Hi Mr. <% puts "Frodo" %>
```

It's important to note that the ERB is simply helping construct HTML
server-side.  When the view is finished rendering, it will be pure HTML and it
is the pure HTML that is sent to the user. Your user will never know you are
using ERB.

### Commenting out ERB

Say you want to comment out some broken Ruby code in your ERB file that's
throwing an error:

```erb
<!-- <%= my_broken_ruby_code %> -->
```

Even though you wrap the embedded Ruby in an HTML comment, the Ruby code will
still be evaluated (and inserted as the body of the comment). If the code was
erroring out previously, it will still be run and will still cause errors.

To stop the code from running, simply add a `#`:

```erb
<%#= my_broken_ruby_code %>
```

The `%#` means to skip evaluating the embedded Ruby. The `=` is dangling: it has
no effect as long as the `#` is in place, but it does remind you that the
expression was originally `<%= %>` and not `<% %>` when you are ready to remove
the `#`.

### Code shortcuts

If you have [`Erb-VSCode Snippets`] installed in VSCode, you have several code
shortcuts available to you. For example, in an __.html.erb__ file, type `er`
followed by the `<Tab>` key to get `<% %>`. Type `pe` followed by `<Tab>` to get
`<%= %>`. Type `pc` followed by `<Tab>` to get `<%# %>`.

## Instance variables

Controllers make data available to the view layer by **setting instance
variables**. It may seem a bit silly that this is the mechanism by which data is
shared since instance variables are all about keeping data private, but that's
how Rails does it. When the view is rendered, it copies over the instance
variables of the controller so that the view has access to the variables. By
default, the view has no other access to the controller or its methods.

Here's a full example:

```ruby
# app/controllers/products_controller.rb
class ProductsController < ApplicationController
  def index
    # get an array of all products, make it available to view
    @products = Product.all
    render :index
  end
end
```

```erb
<!-- app/views/products/index.html.erb -->
<h1>All the products!</h1>
<ul>
  <% @products.each do |product| %>
    <li>
      <%= product.name %>
    </li>
  <% end %>
</ul>
```

It is good practice to make all your database queries inside the controller,
setting the results to instance variables. Never make database queries in your
views; it can make it harder to find hidden performance issues caused by
unintended queries.

[`Erb-VSCode Snippets`]: https://marketplace.visualstudio.com/items?itemName=ZneuRay.erb-vscode-snippets
