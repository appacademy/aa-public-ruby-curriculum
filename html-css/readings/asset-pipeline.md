# The Asset Pipeline

So far you've focused on rendering HTML content from Rails. But styling rules
are kept in CSS files and JavaScript code meant to be run by the client is kept
in JS source files. These are not (typically) returned directly inside the HTML
response; instead, you add `<script>` and `<link>` tags in the `<head>` to
direct the client to make additional requests to load these resources.

For purposes of code organization, JS and CSS sources are typically split across
many files. However, because web browsers are limited in the number of requests
that they can make in parallel, more files to request means a slower user
experience.

To solve this problem, the asset pipeline **concatenates** asset files into
fewer JS and CSS files. This reduces the number of requests that a browser must
make to render a web page. The asset pipeline also **minifies** the JS and CSS
assets, stripping out whitespace and applying other optimizations (especially
for JS) to reduce file-size.

The asset pipeline can also **pre-compile** higher-level languages like
CoffeeScript (to JavaScript) and Sass (to CSS). Some people like CoffeeScript
better than JavaScript; many people prefer Sass.

The asset pipeline uses a library called [Sprockets] to perform all of this
compiling and serving up of assets.

Rails defaults to concatenating all CSS files into one master
__application.css__ file in __app/assets/stylesheets__. It similarly
concatenates the JavaScript files into a master __application.js__ file. While
this file used to appear in __app/assets/javascripts__, as of Rails 7, it
appears in __app/javascript__ by default. (Note the switch from the plural
__javascripts__ to the singular __javascript__.) As you'll learn later in this
guide, you can customize this strategy to group files in any way you like.

## Writing manifest files

All your images and CSS sources should be placed in the proper __app/assets__
subdirectory: __images__ or __stylesheets__. Files in these directories will be
handled by the asset pipeline.

One of the key purposes of the asset pipeline is to group and concatenate source
files. This reduces the number of requests the client must make to the server.
_Manifest files_ describe how to group source files. For instance, here is the
default __app/stylesheets/application.css__:

```css
/*
 * This is a manifest file that'll be compiled into application.css, which will include all the files
 * listed below.
 *
 * Any CSS (and SCSS, if configured) file within this directory, lib/assets/stylesheets, or any plugin's
 * vendor/assets/stylesheets directory can be referenced here using a relative path.
 *
 * You're free to add application-wide styles to this file and they'll appear at the bottom of the
 * compiled file so the styles you add here take precedence over styles defined in any other CSS
 * files in this directory. Styles in this file should be added after the last require_* statement.
 * It is generally better to create a new file per style scope.
 *
 *= require_tree .
 *= require_self
 */
```

In asset files, header lines--i.e., lines before any code--that begin with `*=`
(or `//=` or `#=`) are _directives_: special comments that tell sprockets which
dependencies to load. The `require_tree .` directive will load any file in the
current directory (`.`) or one of its subdirectories. `require_self` then makes
sure that the current file is the last one loaded.

`require_tree` will load files alphabetically, which may not be the desired
order. You can accordingly specify the order in which a folder's files should be
loaded by creating an __index.css__ (or whatever extension is appropriate) file
inside the folder. The index file can then explicitly set the loading order
through a series of `*= require <filename>` statements.

Sprockets will compile any file named __index.xx__ to a file with the same name
as the folder. So, e.g., to load __foo/index.css__, you would specify
`asset_path("foo.css")`, **NOT** `asset_path("foo/index.css")`. (For more on
index files in Sprockets, see [here][index].)

By default Rails will compile **all** the CSS code into one file,
__application.css__. This is a reasonable default: it means only one source file
will ever need to be loaded across the whole site.

If you want more control, however, you could remove the `require_tree .` line so
the manifest would not include all CSS files. You could then write additional
manifests that included some files but not others, and have only the
layouts/templates that needed those bits load them. (You don't need to do
this right now, but it's good to know how the system works.)

> **Note:** Sass files import dependencies using either `@import` or `@use` (and
> sometimes `@forward`). `@import` loads everything into the same scope. This
> has the advantage of allowing variables and mix-ins from different files to
> see each other, but it also allows the same file to be loaded multiple times,
> raises the possibility of name conflicts, and makes ordering very important.
> For these reasons, Sass now recommends using `@use` instead. `@use` imports
> each file as a module under a namespace that must be invoked to access the
> module's variables, functions, etc. (You can also specify that you do not want
> to use a namespace by explicitly setting the namespace to `*`.) For more
> differences between `import` and `@use` see [here][use-import].

You can find the overarching manifest for the Asset Pipeline in
__app/assets/config__. The default version looks like this:

```js
//= link_tree ../images
//= link_directory ../stylesheets .css
//= link_tree ../../javascript .js
//= link_tree ../../../vendor/javascript .js
```

The `link_tree` and `link_directory` directives instruct Rails to compile the
specified tree/directory and make it publicly available without including the
results in the current file.

## Compilation

When you deploy your application on Heroku, Heroku will precompile your asset
files to __public/assets__ by running the `rails assets:precompile` task.

The precompilation task involves:

1. Compiling sources from CoffeeScript/Sass to JavaScript/CSS.
2. Concatenating manifest files.
3. Minifying the results.

The precompiled versions are then placed in the __public/assets__ folder. When
using the Rails asset tag helpers (see below), links refer to this directory.
The original sources in __app/assets__ are never served directly in the
production environment.

You don't want to compile the assets in development because the minification
process makes it difficult to debug errors. (The code becomes largely
indecipherable.) If you are using Sass, however, then you will need to create a
build that converts the Sass into CSS that the browser can use.

### Heroku

To precompile assets, you can run `rails assets:precompile` in a production
environment. However, you shouldn't need to precompile assets yourself. By
default, Heroku will take care of running this command when you push your code
to the server. You should also never check compiled assets into your git
repository: compiled assets are unnecessary to track, since they are just the
processed version of the original source files, which **are** tracked in the
repo.

## Coding links to assets

The familiar asset tags will link to the precompiled versions of your assets.
You don't need to do anything special to use the asset pipeline:

```erb
<%= stylesheet_link_tag "application" %>
<%= javascript_importmap_tags %>
<%= image_tag "rails.png" %>
```

The `stylesheet_link_tag`/`image_tag` helpers will return links to the
precompiled, concatenated, minified versions in __public/assets__ (not the
originals in __app/assets__).

You should not hard-code links to __/assets/stylesheets/application.css__ (or
other asset files). The names of precompiled assets contain an inserted,
unpredictable _fingerprint_. For instance, don't put a `link` in a view header
like this:

```erb
<head>
  <!-- noooo! -->
  <link href="/assets/stylesheets/application.css" type="text/css">
  <!-- yesss! -->
  <%= stylesheet_link_tag "application" %>
</head>
```

When __app/assets/stylesheets/application.css__ is compiled, it is saved to
__public/assets/application-1bf77c05c1043f3a0467723f43f6cd7c.css__ (or some such
file). These fingerprints are used for _cache control_, which is a topic for
another day. For now, just know that you want to use the fingerprinted version,
which is what `stylesheet_link_tag` will look up for you. Just give it the base.

## Server configuration

Eventually you will want to configure your web server to set the expiration date
of your CSS/JavaScript assets for far in the future so that they are not
re-requested by the client on every page load. Likewise, you will want your
server to serve compressed (gzipped) versions of these files.

Do not worry about this for now. When it comes up later, just remember that it
involves configuring the web server, not Rails itself.

## Resources

* Rails guide to the [Asset Pipeline]

[Sprockets]: https://github.com/rails/sprockets
[index]: https://github.com/rails/sprockets#index-files-are-proxies-for-folders
[use-import]: https://sass-lang.com/documentation/at-rules/use#differences-from-import
[Asset Pipeline]: https://guides.rubyonrails.org/asset_pipeline.html
