# CSS

These notes provide a brief overview of the important topics you
should be familiar with in regards to _vanilla_ CSS. A whirlwind tour.
I suggest you always first check [MDN][MDN] with any CSS related questions.

[MDN]: https://developer.mozilla.org/

### General Notes on Styling

Styling shouldn't be hard, just don't waste time with intricate
designs. Clean minimal sites are _in_ right now. Take advantage of
this.

In my experience, styling will take as long as I decide to spend on
it. The more time I spend doing it, the more insignificant stuff I'll
obsess about, and the more time I waste wavering between two shades of
black for the headline text on my page. My advice to you is to
time-box your time spent on designing, and stick to your commitment
strictly.

Further, I've found that there are diminishing returns on the
consecutive hours one spends "designing". If you take half an hour
each day next week styling, that will probably be just as effective,
if not better than spending 4 hours on Friday frantically trying to
get some navbar _pixel perfect_.

### Selectors

A rule in CSS is an attribute-value pair like this: `attribute: value;`.
For example, `font-size: 18px;` or `background-color: red;`. Rules are
grouped and applied to selected elements on the DOM with selectors
like this:`selector { rules... }`.

#### Basic Selectors

Elements can be directly accessed and styled based on their markup in HTML:
You've probably had a bit of practice with these selectors in jQuery, but as a refresher:

* Element: `li { ... }` selects all `li` tags.
* ID: `#element-id { ... }` selects the element with ID `element-id`
* Class: `.class-name { ... }` selects all element with class `class-name`
* Attributes: `a[href="appacademy.io"] { ... }` will select all anchor tags (`<a>`)
  with `href="appacademy.io"`

#### Relational/Pseudo Selectors

Elements can be accessed based on their relationship to other elements on the page. For
example, you may want to style `<li>`s that are nested in a `<ul>` differently
than `<li>`s in a `<ol>` element:

* Descendents (all): `ul li { ... }` (you could then differentiate `<li>`s in an `<ol>` with `ol li { ... }`)
* Children (direct descendents): `ul > li { ... }` (this would miss nested `<li>`s)
* Siblings: `li.class_name + li { ... }`

CSS provides a number of 'pseduo-selectors' that make it easier to style based on UI state. A few examples:

* Hover: `a:hover { ... }`
* Visited: `a:visited { ... }`
* Focus: `input:focus { ... }`
* First Letter: `p:first-letter { ... }`
* First Child: `li:first-child { ... }`

Similar to a 'pseudo-selector', CSS provides 'pseudo-content' options so that you can inject content either before or after a certain element. These selectors are only useful if you specify a content property in the styling (`content: "..."`):

* Before: `div:before { ... }`
* After: `div:after { ... }`

#### CSS3 Selectors

The CSS3 specification contains a large number of new relational/pseudo selectors to try out and take advantage of. Make sure to check sites like [Can I Use](http://www.caniuse.com) for browser compatibility, though:

* N'th Child: `li:nth-child(n) { ... } `
* First of Type: `h3:first-of-type { ... } `
* Disabled: `button:disabled { ... } `
* Checked: `input:checked { ... } `
* Preceded By (general siblings): `li.class_name ~ li { ... } `

#### Resources on Selectors

* http://www.w3.org/TR/CSS21/selector.html#pattern-matching
* http://net.tutsplus.com/tutorials/html-css-techniques/the-30-css-selectors-you-must-memorize/
* http://estelle.github.io/selectors/

### Cascading Style Sheets

From Wikipedia's page on CSS:

> CSS specifies a priority scheme to determine which style rules apply
> if more than one rule matches against a particular element. In this
> so-called cascade, priorities or weights are calculated and assigned
> to rules, so that the results are predictable.

Note that we can style the text of `<li>`s in a list by selecting their parent
list. Like so:

```
ul { color: red; }
```

the `color` rule _cascades_ down. One can overwrite rules like this:

```
li { color: green; }
li { color: red; }
```

and in this case list items will be red, as the last defined rule is chosen.
In this case however,

```
li { color: green; }
ul { color: red; }
```

the text in the `<li>` tags will be green. As even though the rule for
the containing `ul` was defined last, the `<li>` rule is more
specific, and thus takes precedence. The rules of precedence can get a
bit hairy but you'll build up an intuition by fixing bugs, if you
choose to do so.

### Content Layout

Go ahead and [read this][learn-layout] guide to layout.

[learn-layout]:http://learnlayout.com/

#### The Box Model

Every element in the DOM is a rectangular box. The inside of the box
is content, the size of which can be explicitly set width `height` and
`width` style rules. Surrounding that content, is `padding` -- the
space between content and the `border`. The outer area of the box is
the `margin` -- the negative space that separates and element from its
neighbors. Don't forget, the `border` (space between the `margin` and
`padding`) too has a width.

A common misconception is that setting an object's width, either in
pixels or percentage, will explicitly set the entire width of the
box. By default, though, height and width only impact the sizing of
an element's inner content. Set an element's width to 100% with a
padding of 50px, and you might hate yourself later. Luckily CSS3
provides a solution to this problem with `box-sizing`.

#### Box Sizing

If you want to make your life easier, you can use `{ box-sizing:
border-box; }` to switch the box-sizing property to a more sensible
box model default for every element on the page. This sets the width
to **include** the border and the padding, allowing you to set the
width to a percentage without having to do extremely hard calculations
for borders and paddings.

Changing this property does have dramatic consequences, and might
cause problems if you rely on pre-existing styles or frameworks.
Box sizing is also a CSS3 feature, so make sure to check
[Can I Use](http://www.caniuse.com) and implement the necessary
pre-fixes.

#### Display Options

CSS provides a number of `display` options to control the flow of your
document. Most commonly we will use `block`, `inline`, `inline-block`,
and `none` (e.g. `display: inline;`).

`block` content will, by default, render on the next line after a
block element. Elements like `<p>`, `<div>` and `<h1>` are block by
default. Block elements have margins and padding. If no height is set,
they will expand naturally to fit their children, and they will expand
in width to fit their parents.

`inline` elements are aligned inline with one another. Elements like
`<span>` and `<a>` are inline by default, remember how they flow with
the text, in fact you can just think of them as boxes that act like
text. They do not automatically go underneath their siblings, nor do
they cause line-breaks. They ignore `height` and `witdth` properties,
as well as the`margin-top` & `margin-bottom` properties. _n.b._ they
become block elements if you apply`float: left` or `right`.

`inline-block` elements flow inline, but many style rules like `height` and
`width` can be applied. `<img>` elements default to inline-block.
[More on inline block][inline-block].

`none`: content is hidden from the document and will not affect the
flow of elements. It's as if it is not on the page at all, this is how
jQuery's `$element.hide()` works, from the documentation:

> The matched elements will be hidden immediately, with no
> animation. This is roughly equivalent to calling
> `.css('display', 'none')`, except that the value of the
> `display` property is saved in
> jQuery's data cache so that `display` can later be restored to its
> initial value.

[inline-block]: http://www.impressivewebs.com/inline-block/

#### Position Options

CSS provides 4 core position options to layout content on your
page. For all of these options (except `static`), you can supply
positive or negative values to rules like `top`, `left`, `right` and
`bottom` to define the offset of the element's position:

* `static`: by default, all elements in the DOM are `{ position:
  static }`. It's very rare to explicitly define an element's position
  as static, unless you need to forcibly remove a previously added
  positioning rule, like in a responsive layout. Ignores `top`, `left`, &c.

* `relative`: this option positions an element relative to its own
  default (`static`) position. Essentially, the element is first
  placed as if it were static and then offset from that position. This
  can be useful to iron out any pesky vertical/horzontal alignment
  issues that may pop up. Setting a relative position also enforces
  the scope of any absolutely positioned descendent elements.

* `absolute`: absolutely positioned elements are removed from the
  document flow (_i.e._ they don't take up space) and placed
  absolutely in relation to the nearest parent with `relative`,
  `absolute`, or `fixed` positioning. If no such parent exists, these
  elements are positioned relative to the `<html>` tag. Use but don't
  abuse -- too much absolute positioning can lead to a lot of
  colliding/overlapping madness.

* `fixed`: fixed positioning should be used sparingly for content that
  you always want to have visible. It's common to used `fixed` for
  headers or navigational elements on a page. Fixed elements are
  positioned relative to the viewport. Beware: fixed positioning can
  present many usability problems on small screens, or for users who
  have zoomed in too far in their viewport. Use with caution.

### Float and Clearfix

Floating an element is a very common way to create a grid-based layout,
implement a side bar, wrap text around an image, and so forth. By
setting `{ float: right }` or `{ float: left }`, you are taking that
element out of the normal document flow, and floating it either to the
left or the right of its siblings.

The one perk and drawback of the float is that the element's parent
container no longer considers the floated child in its height
calculations. This is useful when trying to wrap paragraph text around
an image, but less so when trying to put together a clean grid layout.

A popular hack to fix this is using what's referred to as a ['clearfix'][clearfix]
to fix this clearing issue. First, add the name of your 'clearfix'
class to the parent container (note: it doesn't need to be called
'clearfix' -- this is just convention). In CSS, we use the
pseudo-element selecter `:after` to inject fake content to the end of
the parent container, fixing the height calculation of the container
to include the floated element:

    .clearfix:after {
       visibility: hidden;
       display: block;
       font-size: 0;
       content: " ";
       clear: both;
       height: 0;
    }

This style rule will place a hidden element with no height and a " " for content to extend the height of our parent element.

[clearfix]:http://nicolasgallagher.com/micro-clearfix-hack/

### CSS 3

CSS 3 introduced a bunch of new style attributes. While many are not
widely supported by all the browsers. I encourage you to spice
up your app with a few rounded corners (`border-radius`, keep it under
`5px`), transitions (`transition`, keep 'em under 100ms), and
rotations/stretching (`transform`).

CSS3 has a lot of fun features like transitions and animations, but the spec is far from finalized. Make sure you always check [caniuse.com](http://www.caniuse.com) for browser compatibility, but also use vender prefixes (-webkit, -moz, -o, -ms) when using CSS3 features.


### CSS Reset

Since each browser has its own quirks and implementation of the basic
tags, _e.g._ `<a>` or `<p>`, sometimes you want to just get everyone
to agree on how to do stuff before you start applying your own
styling. You can accomplish this with [CSS Reset][css-reset] or
[Normalize][normalize], small stylesheets meant to be included before
any of your styles to promote cross-browser consistency.

CSS frameworks like Bootstrap and Foundation use CSS resets to
normalize user agent stylesheet differences. Try to style a `<button>`
without a reset. It's rough.

[css-reset]:http://meyerweb.com/eric/tools/css/reset/
[normalize]:http://necolas.github.io/normalize.css/

#### Resources

* http://css-tricks.com/the-css-box-model/
* https://developer.mozilla.org/en-US/docs/CSS/box_model
* http://css-tricks.com/snippets/css/clear-fix/
* http://nicolasgallagher.com/micro-clearfix-hack/
* http://paulirish.com/2012/box-sizing-border-box-ftw/
* https://developer.mozilla.org/en-US/docs/CSS/box-sizing
* http://css-tricks.com/all-about-floats/
* http://coding.smashingmagazine.com/2007/05/01/css-float-theory-things-you-should-know/

### Responsive Design


#### Media Queries

With the growing number of devices used to access web pages,
developers need to make sure their experiences are user-friendly on
any kind of device. One way to handle device differences is to use
media queries to change content display based on pixel density, device
width, and so forth. It's also great practice to set print media
queries for printable web page content (hint: your resume) to make
sure pages break before headers, after paragraphs, etc.

Media queries continue the cascading style rules, allowing the most
specific and applicable rules to override default rules. Here are some
common media query breakpoints courtesy of
[CSS Tricks](http://css-tricks.com/snippets/css/media-queries-for-standard-devices/):

```css
    /* Smartphones (portrait and landscape) ----------- */

    @media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
      /* Styles */
    }

    /* Smartphones (landscape) ----------- */

    @media only screen and (min-width : 321px) {
      /* Styles */
    }

    /* Smartphones (portrait) ----------- */

    @media only screen and (max-width : 320px) {
      /* Styles */
    }

    /* iPads (portrait and landscape) ----------- */

    @media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
      /* Styles */
    }

    /* iPads (landscape) ----------- */

    @media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) {
      /* Styles */
    }

    /* iPads (portrait) ----------- */

    @media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) {
      /* Styles */
    }

    /* Desktops and laptops ----------- */

    @media only screen and (min-width : 1224px) {
      /* Styles */
    }

    /* Large screens ----------- */

    @media only screen and (min-width : 1824px) {
      /* Styles */
    }

    /* iPhone 4 ----------- */

    @media
    only screen and (-webkit-min-device-pixel-ratio : 1.5), only screen and (min-device-pixel-ratio : 1.5) {
      /* Styles */
    }
```

#### Viewport Tag

Another helpful way to adapt your web experience for an array of
devices is to include a meta viewport tag in your HTML `<head>`.

  `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">`

Including a tag like this helps you control the size of your content in the viewport, regardless of a device's default pixel density ratios, etc. There are a variety of options you can set for the content attribute to help you customize your app's experience. Read more [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag).

#### Resources

* http://css-tricks.com/snippets/css/media-queries-for-standard-devices/
* http://mediaqueri.es/
* https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag

### Best Practices & Random Tips

* Use CSS classes to toggle the state of an element. It's much more
  clean/efficient to add/remove a class to an element in JavaScript
  than to hard code new CSS rules for an element.
* Classes can be assigned to more than one element. IDs must be unique
  to that element. You should generally use classes to select for CSS
  rules. Use IDs to target certain things in javascript.
* In general  you don't want to  have a long line  of nested selectors
  like `div.sidebar nav ul  li a { ... }`. This  is really fragile! If
  you got  rid of the `nav`  tag, you would  have to waste a  bunch of
  time debugging your stylesheet to  fix your selectors. Instead, just
  apply a  class like `.nav-list-link`  to your  `a` tags in  your nav
  list, and simply  select by that class. You want  to generally avoid
  having major changes just when changing the structure of the markup,
  so decouple your styling from your HTML.
* [Read about OOCSS](http://www.slideshare.net/stubbornella/object-oriented-css),
  and making everything modular.
* It's hard to keep track of browser compatibility issues. If you
  really care about your IE-loving users, tools like
  [Modernizr](http://modernizr.com/) help you and your app feature
  detect and gracefully degrade modern features. Also check out
  [Initializr](http://www.initializr.com/) to generate boilerplate
  HTML5 templates to get your app going.
* Check out BEM (block element modifier) naming when you get a
  chance. It's a nice name scheme for your classes in a complex
  application.  This is still a pretty new idea,
  [BEM](http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/).

Helpful Resources
-----------------

* http://www.colorhexa.com
* http://css3generator.com/
* http://www.initializr.com
* http://caniuse.com/
