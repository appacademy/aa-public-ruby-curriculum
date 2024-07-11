# Syntactically Awesome Style Sheets (Sass)

Sass is a tool that makes it easier for developers to write CSS. It falls into a
category of languages known as preprocessors. A **preprocessor** is a language
that compiles into another language, usually before a web app is deployed. Sass
code is preprocessed into plain CSS code, which is what is served to and parsed
by the browser. Sass "adds" features to CSS (things that are rewritten when the
real CSS is produced) that make it more like regular programming, such as
variables, functions, and arithmetic operators.

## Syntaxes

Sass supports two syntaxes. The first, confusingly called Sass, is
whitespace-delimited and omits semi-colons. The second, SCSS, uses the same
basic syntax as regular CSS. SCSS is more verbose than Sass syntax, but it has a
distinct advantage: it is a *superset* of CSS. This means that all regular CSS
code is valid SCSS code, making the migration of CSS to Sass easier. SCSS also
seems to be more popular, and it's the syntax we'll consider going forward.

## Variables

Variables in Sass start with a `$` and store a value to be reused later, such as
a property value. When translated to CSS, all references to a variable will be
replaced with its value, but in Sass we can use them to DRY up our code and
make it easy to change a value in one place.

```scss
$brand-color-main: #b0e0f8;

.container {
  border: 1px $brand-color-main solid;
}

.button {
  background-color: $brand-color-main;
}
```

## Nesting

Sass allows us to nest a selector inside another selector in order to denote a
particular relationship. This is commonly used to write *descendant selectors*,
which apply styles to something if one of its ancestors is something else:

```css
.main-menu {
  padding: 0;
}

.main-menu li {
  display: inline-block;
}
```

This CSS styles an element with the class `.main-menu` and any `<li>`s inside of
it. We can rewrite this using Sass's nesting:

```scss
.main-menu {
  padding: 0;
  li {
    display: inline-block;
  }
}
```

We can also use nesting to set states on elements. To do this, we use the `&` to
tell Sass that we're referring to the selector we're nested inside. For example,
we can nest styles for the hover state:

```scss
.button {
  &:hover {
    background-color: #0791D6;
  }
}
```

This will produce:

```css
.button:hover {
  background-color: #0791D6;
}
```

### Nesting Caveat

Nesting is great for making code more readable. But it can quickly get out of
hand. A general CSS best practice is to keep your selectors as simple as
possible. This keeps their specifity low and makes for more maintainable CSS.
With nesting, it's easy to accidentally create overly-complex selectors.
Consider the following:

```scss
.main-menu {
  // Main menu styles...
  li {
    // Main menu list item styles...
    a {
      // Main menu list item links styles...
    }
  }
}
```

This code seems nice because it reflects the structure of the HTML, but for the
links inside the list items of the main menu, it's going to create a gnarly
selector:

```css
.main-menu li a {
  ...
}
```

This selector is overly-specific. Likely `.main-menu a` would suffice, but our
nesting has created a selector with superfluous info. The moral of the story,
then, is to be careful with nesting and try to keep it as shallow as possible.

## Mixins

To further the DRYing out of our CSS, Sass provides a facility called mixins. A
**mixin** is similar to a function, but specifically for containing CSS code.
They can take arguments like functions, allowing you to produce customized CSS
based on a pattern. The basic syntax looks like the following:

```scss
@mixin my-mixin($parameter-1, $parameter-2) {
  // Reusable code goes here. Ex:
  color: $parameter-1;
  padding: $parameter-2;
}
```

Whatever code you put in the mixin will be copied to where it's called, but the
parameter variables allow you to customize it for each instance. You call a
mixin to copy its code somewhere using the `@include` operator:

```scss
.some-class {
  @include my-mixin(red, 5px);
}
```

This produces the following CSS:

```css
.some-class {
  color: red;
  padding: 5px;
}
```

Mixins are great when you have similar CSS that you want to use in multiple
places, but without duplicating a lot of code.

## Extend

In addition to `@include`, Sass provides an `@extend` operator for DRYing up
code. While including mixins is great for code that is slightly different in
each place, you sometimes just want the same exact CSS to apply to multiple
selectors. You could make a mixin with that CSS, but then it would end up being
copied to multiple places in the CSS that Sass outputs. For this reason, Sass
provides the `@extend` operator to make it easy for a selector to use the
styles of another. In vanilla CSS, we can have multiple selectors use the same
styles by separating them with commas:

```css
.red-button,
.blue-button {
  border-radius: 5px;
}
```

With Sass, we can DRY this up by extending one selector with the other:

```scss
.button {
  border-radius: 5px;
}

.red-button {
  @extend .button;
  // ...
}

.blue-button {
  @extend .button;
  // ...
}
```

Note that this will include our `.button` class in the output:

```css
.button,
.red-button,
.blue-button {...
```

If you aren't ever going to use `.button` in your HTML, you can exclude it from
the output using the `%` marker:

```scss
%button {
  border-radius: 5px;
}

.red-button {
  @extend %button;
  // ...
}

.blue-button {
  @extend %button;
  // ...
}
```

This produces the original CSS we were looking at.

## Functions

Sass also supports functions. Functions are similar to mixins, but are for
producing specific values, not large groups of CSS code. Sass comes with a lot
of built-in functions. For example, the `darken` function takes a color and a
percentage amount to darken it by. You can check out the [rest of the built-in
functions][built_in_functions].

You can also create functions of your own with the following syntax:

```scss
@function my-function($parameter-1, $parameter-2) {
  // Perform some operations...
  @return $result;
}
```

You can then call your function from elsewhere in your Sass code:

```scss
.some-class {
  padding: my-function(10px, 15px);
}
```

[built_in_functions]: http://sass-lang.com/documentation/Sass/Script/Functions.html

## Partials and `@import`

Sass makes it easy for you to break up your code into modular files through its
support of partials and the `@import` operator. You create a partial by naming
the file with a leading underscore (e.g. `_header.scss`). Sass will skip
partials when converting your SCSS files into CSS. You can import a partial into
another Sass file:

```scss
body {
  // ...
}

@import "header";
```

Notice that `@import` does not need the leading underscore or the file
extension. Interestingly, CSS itself has an `@import` operator. CSS's version is
different than Sass's. Instead of copying the output of one file into the output
of another, it instructs the browser to make an HTTP request for the other file.
Since performance best practices dictate that HTTP requests should be kept to a
minimum, most avoid the native CSS `@import`. Sass's `@import` is superior
because it brings in the imported code at build-time, so no extra HTTP request
is necessary.

Using partials and `@import` can lead to [improved code
organization][project_structure] for your app's styles.

[project_structure]: http://thesassway.com/beginner/how-to-structure-a-sass-project

## Sass and Rails

Since Sass is implemented in Ruby, it enjoys first-class support in Rails
through the sass-rails gem, which is automatically included in new Rails
projects. You can add Sass files to `app/assets/stylesheets` with the extension
`.css.scss`, and Rails will automatically compile them for you.

## Resources

* [Official Guide][official_guide]
* [Video Tutorials][video_tutorials]
* [The Sass Way (Tutorials & Guides)][sass_way]

[official_guide]: http://sass-lang.com/guide
[video_tutorials]: https://www.youtube.com//playlist?list=PL2CB1F80266E986EA
[sass_way]: http://thesassway.com/
