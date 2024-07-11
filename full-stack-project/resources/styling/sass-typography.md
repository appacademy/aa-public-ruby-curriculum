# Preprocessing, Boilerplate Frameworks, and Type

### SASS and LESS

SASS and LESS are both examples of preprocessing languages, meant to
make writing your stylesheets more pleasant. You write your
stylesheets in a simplified syntax, and then run them through a
compiler which outputs plain old CSS. They are both more or less
equivalent, however LESS was moved from Ruby to Javascript a while
back. And so while you can automatically compile your SASS in the
asset pipeline without any additional setup, you will need to install
a javascript runtime to compile LESS in the asset pipeline. I've found
this to be non-trivial to set up with Heroku.

Just go with SASS. They both provide the same major convenience
features.

#### Features of SASS

##### Nested selectors

This will rid your code of a bunch of similar selectors like:

```
ul { ... }
ul li { ... }
ul li a { ... }
ul li a:hover { ... }
```

Instead you will have,

```
ul {
    ...
    li {
        ...
       a {
          ...
          &:hover { ...  }
       }
    }
}
```

But that is a terrible example, don't nest stuff more than one or two levels. Use classes instead.

```
.navlist { ... }
.navlist-item {
               ...
               a {
                  ...
                  &:hover { ... }
               }
}
```

##### Variables

No more magic numbers in your stylesheets. As it's a pain to have to
go around changing the same number in a bunch of places, this is
perfect for font sizes and colors.

```
  $text-color: #333;
  p { color: $text-color; }
  h1 { color: $text-color; }
```

##### Mixins

A mixin is for when you have a group of attributes that you want to
put in more than one class. Great for stuff like rounded corners or
anything with user-agent specific rules. Much like inheritance. I'll
leave the nitty gritty to you once you're comfortable with the
rest. But it looks something like this:

```
@mixin rounded-corners($amount) {
                        -moz-border-radius: $amount;
                        border-radius: $amount;
}
.nav { @include rounded-corners(3px); }
.content { @include rounded-corners(5px); }
```

[Bourbon][bourbon] is a library of helpful mixins. Read the source to learn more about SASS and CSS in general.
[bourbon]: http://bourbon.io/

### Typography

Type is difficult, so try and keep the number of fonts and styles you
use to a minimum. I suggest no more than one header and one body font. In general,
it looks pretty good to have a sans-serif font for your headers
`<h1> - <h6>` and a serif font for your body text. By the way,
[serifs][serifs] are the little flags on the end of letters (Garamond
is serif and Helvetica is sans), serif fonts typically look more
academic and are easier to read for extended periods of time than more
modern looking sans-serif fonts.

You should also keep the usage of of different text styles (bold,
italic, different sizes) to a minimum.

So the font you choose to use must be present on the user's computer,
or else you have to send the font to them.  If you want to use local
fonts, I suggest just using `font-family: sans-serif;` for sans-serif
(Helvetica Neue on OSX or Arial on Windows). Or `font-family:Garamond,
Georgia, serif;` for serif.

If you want to get fancy and use an online font,
[Google Web Fonts][google-web-fonts] is a great place to find nice
free hosted fonts from a bunch of designers. This will allow you to
use fonts which are not on the user's computer. You usually just have
to include a line in your stylesheet to tell their browser to load the
font from Google. Google Web Fonts is full of trash, but I really like
Lato and Merriweather.

[serifs]:https://en.wikipedia.org/wiki/Serif
[google-web-fonts]:http://www.google.com/fonts
