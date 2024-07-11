# CSS: A brief non-technical overview

## What is CSS?

CSS is an abbreviation of Cascading Style Sheets, a style sheet language for
markup (XML, HTML, XHTML). It empowers developers to separate document content
from presentation.

Style sheets are collections of stylistic rules; they have been used by editors
and typographers since long before the web. A style sheet language describes the
presentation of structured documents, like an HTML document. CSS is 'Cascading'
because multiple files can be combined to style one page.


## A Brief History of CSS

![netscape-relic](https://assets.aaonline.io/fullstack/html-css/readings/netscape96.png)
Netscape October 20, 1996

- Early 1990's: HTML popularity was increasing and developers were frustrated
  with its limited styling abilities.
- October 1994: Hakon Wium Lie released the first draft of “Cascading HTML Style
  Sheets”
- August 1996: Microsoft Internet Explorer became the first browser to support
  CSS
- December 1996: CSS 1 release
  - Included: font properties, text attributes, alignment of text, tables,
    images, colors of text and backgrounds, spacing of words, letters and lines,
    margins, borders, padding and positioning, unique identification and
    classification of groups of attributes.
- Early 1997: The W3C formed the [CSS and Formatting Properties Working
  Group][css-working-group] to focus solely on CSS standards. (Browsers used to
  display styling much less consistently)
- 1998: CSS 2 release
  - Added: z-index, media types, bidirectional text, absolute, relative and
    fixed positioning
- June 2011 and June 2012: CSS 3 capabilities were separated into modules.
  - Four new modules were added: color, selectors level 3, namespaces, media
    queries

[css-working-group]: https://en.wikipedia.org/wiki/CSS_Working_Group
## Adding Style to HTML: Inline, Internal, and External CSS

There are three ways a developer may add style to an HTML document. External CSS
is most often preferred, but you will undoubtedly encounter inline and internal
styles in the wild. They are discussed in order of specificity: inline >
internal > external

### Inline Style Attribute

Exactly what the title suggests: style attributes added directly on an HTML
element inside of the element's opening HTML tag.

```html
<h2 style="color: #000000; font-size: 2em;"> Hi </h2>
```

Pros:
  - Highest specificity: Ensures the style will be applied to the element

Cons:
  - Highest specificity: will overwrite any other styles in an internal or
    external sheet
  - Redundant; not DRY
  - Cluttered, unreadable HTML markup
  - Difficult to manage
  - Impossible to style pseudo-elements and classes like `visited`, `hover`,
  and `active`

Extra note: When you change an element's style using Javascript, it affects the
element's inline style and can overwrite existing inline styles permanently.

### Internal: Embedded style tag

Styles for many elements are collected between `<style>` tags in the `<head>`
section of an HTML document. This is referred to as an internal style sheet or
embedded style tag because it is a complete stylesheet embedded inside of an
HTML document.

```html
<head>
  <style type="text/css">

   h2 {
     color: #000000;
     font-size: 2em;
   }

   h3 {
     color: #FF69B4;
     font-size: 1em;
   }

  </style>
</head>
```

Pros:

- Cleaner HTML markup than inline styles: all styles are in one section of the
  document
- Selectors apply styles to multiple elements on a page
  - Smaller page size than using all inline styles
  - More DRY than inline styles
- Apply styles to the document they are embedded within; not globally

Cons:
- Loaded with the HTML page and not cached by the browser

### External file: linked stylesheet

```html
<link rel="stylesheet" type="text/css" href="styles.css" />
```

Pros:
  - Can be cached by browsers for improved performance
  - Global: can be used across pages in your site

Cons:
  - Global: the developer must structure the CSS so that styles are not applied
    to elements they are not intended for.

## Popular CSS Preprocessors

A preprocessor is a program that converts data to conform with the input
requirements of another program. For example, [Haml][haml] is a markup language
that describes HTML but is not supported by browsers. Haml requires the use of a
preprocessor to translate it into HTML. On the CSS end, SCSS, Sass, Less, and
Stylus are languages which describe CSS and require their own preprocessors for
translation.

Example:

This haml

```rb
%strong.code#message Hello, World!
```

is processed into this HTML

```html
<strong class="code" id="message">Hello, World!</strong>
```

CSS preprocessors extend CSS's functionality with variables, nesting, functions,
mixins, operators, and more. They help with style sheet maintenance and allow
developers to write DRY-er, more extensible code.

### SCSS and Sass

[SCSS/Sass][sass] are the most widely used CSS preprocessors.

SCSS (Sassy CSS) is a superset of CSS3, which means that every valid CSS3
stylesheet is also valid SCSS. It retains CSS brackets and semicolons; a
developer can add SCSS to a CSS file by simply changing the extension to
`.scss`.

Sass is the older version of SCSS. It uses line indentation rather than brackets
and semicolons to specify blocks. Many developers prefer this syntax because it
feels cleaner and more concise.

SCSS/Sass support while/each loops and if/then/else statements, custom function
declaration, nested selectors, variables, mixins, extends, and many more
features that allow it to be used more like a complete programming language.
SCSS/Sass has gained a large following from designers and appears to be
preferred by many developers ([according to this small survey][sass-v-less]).

SCSS and Sass are Ruby-based, so they require that Ruby be installed before use.

Example:

SCSS

```css
$spacing: 0

nav {
  ul {
    margin: $spacing;
    padding: $spacing;
    list-style: none;
  }
  li { display: inline-block; }
}
```

Sass

```css
$spacing: 0

nav
  ul
    margin: $spacing
    padding: $spacing
    list-style: none
  li
    display: inline-block
```

CSS

```css
nav ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

nav li { display: inline-block; }
```

[haml]: http://haml.info/tutorial.html
[sass]: http://sass-lang.com/
[sass-v-less]: https://www.keycdn.com/blog/sass-vs-less/
### Less

[Less][less] is inspired by and very similar to Sass. It is preferred by some
designers and developers because of its gentle learning curve: it has less
features than Sass and relies mainly on mixins for custom functionality. Less
includes "guarded mixins" which take place conditionally. Mixins can also call
themselves recursively with updated values. It does not support `while` or
`each` loops. Some of Less's popularity can be attributed to its past use by
Bootstrap, a popular CSS framework.

Less is Javascript-based and run by NodeJS.

Example:

Less

```css
@base: #f938ab;
.box {
  color: saturate(@base, 5%);
  border-color: lighten(@base, 30%);
}
```

CSS

```css
.box {
  color: #fe33ac;
  border-color: #fdcdea;
}
```

[less]: http://lesscss.org/

### Stylus

[Stylus][stylus] syntax uses line indentation and white space instead of
semicolons and brackets. Of the popular CSS preprocessors it behaves the most
like a complete programming language. Some of its special features include
splats, converting files to base64, hashes, and color blending. Because of its
comparative power and complexity, Stylus is perceived as less beginner-friendly
than SCSS/Sass and lacks its extensive community support.

Stylus is Javascript-based and run by NodeJS.

Example:

Stylus

```css
body
  font: 12px Helvetica, Arial, sans-serif
```

CSS

```css
body {
  font: 12px Helvetica, Arial, sans-serif;
}
```

[stylus]: http://stylus-lang.com/

## Popular CSS Frameworks

A CSS Framework is a package of pre-structured and standardized code that
supports CSS development. For example, a grid system framework will provide
basic column sizes and styles that can be adapted to many different designs.


### Bootstrap

Twitter developed [Bootstrap][bootstrap] as a way to standardize their UI
components. It was publicly released in August of 2011 and has since become the
most popular front-end framework on the web. The massive community has developed
countless themes and templates along with incredibly thorough support resources.
Bootstrap used to be written in Less, but switched to Sass in the most recent
release. This makes its styles easier to customize than in previous releases,
but because components are already polished out of the box, many developers do
not fight the pre-existing designs. Bootstrap is a great choice for projects
that have to get off the ground quickly.

Sites built with Bootstrap:

- [NBA.com][nba]
- [Walmart][walmart]
- [Bloomberg Business][bloomberg]

[bootstrap]: http://getbootstrap.com/
[nba]: http://www.nba.com/
[walmart]: https://www.walmart.com/
[bloomberg]: http://www.bloomberg.com/

### Foundation

[ZURB][zurb], a high profile design agency, developed [Foundation][foundation]
as an internal style guide. They released it in September 2011 as an
open-sourced front-end framework. Though its following is smaller than
Bootstrap's, Foundation has an adequate amount of community technical support
and resources. Foundation invites more customization than Bootstrap by offering
minimally pre-styled components. Its grid system also supports mobile-first
design, a strategy that has grown more popular with the need for responsive
websites. Foundation aids projects with more designer support that aim for an
original look and feel.

Sites built with Foundation:

- [Dr Martens][drmartens]
- [Lamborghini][lambo]
- [L'Estrange London][llondon]

[zurb]: http://zurb.com/
[foundation]: http://foundation.zurb.com/
[drmartens]: http://www.drmartens.com/us/
[lambo]: https://www.lamborghini.com/en-en/
[llondon]: https://lestrangelondon.com/


## Some terms related to CSS in industry

- UI: Short for user interface, or how a user interacts with a device or
  technology. CSS helps a UI design communicate how a user might use a web app.
  If you see a job posting for a UI Developer, that role likely includes writing
  a lot of HTML and CSS. Ex: "The Windows 10 UI is so confusing! I don't know
  how to change any settings."

- Responsive: A web design is responsive if it adjusts to (and looks decent
  across) different device screen sizes. Ex: "My orthodontist's website looks
  okay on my laptop, but it isn't responsive. It displays weirdly on mobile and
  I can't find her contact information."

  - Breakpoints: Set in a web page's styles, breakpoints are the markers at
  which a change will occur to improve the UI.
  Ex: "Please add a breakpoint so the picture grid on this page has four
  columns on wide screens and three columns on screens less than 1024px
  wide."

    - Example: When a container element is <= 480px wide, its inner elements
      will stack in one column instead of two columns.

  - Media queries: Used for device-specific breakpoints. They include an
    optional media type and expressions that limit the scope of their contained
    styles. Ex: "The app's styles include media queries for smartphone and
    tablet screens."

    - Example:
    
      ```css
      @media only screen
      and (min-device-width: 320px)
      and (max-device-width: 480px){
        font-size: 12px;
      }
      ```

- Pixel perfect: Replicating a mockup perfectly (down to the pixel level).
  Sometimes used to mean great attention to detail. Ex: "The design team gave me
  a mockup annotated with specifications so that my implementation can be
  pixel-perfect."

  - Flat design: A minimalist UI design language characterized by simple
    elements, subtle typography, and flat colors. Ex: "You should make your app
    responsive and use flat design for a more modern look."

  - Skeuomorphism: A design language characterized by elements that look like
    their counterparts in the real world. Ex: "Remember iOS6 when the icons
    looked really bulgy and realistic? I miss skeuomorphism."

  - Grid system: A simple type of CSS framework that provides column systems for
    grid layouts, usually helpful for responsive designs Ex: "Use a grid system
    to ensure all the photos in your photo album app are evenly spaced."

- [Material Design][material]: Google's visual language inspired by paper and
  ink with realistic lighting. Ex: "Google apps feel intuitive and cohesive
  thanks to Material Design." Ex: "We don't have a UI designer, but we followed
  the Material Design principles so our app looks okay."

- [Material UI][material-ui]: The React Components implementation of Google's
  design language, Material Design. Ex: "She used Material UI to make her full
  stack project look like a Google app."

- [W3C][w3c]: The group responsible for HTML and CSS standards. It is the
  largest standards body for Internet design and best practices. Ex: "My
  lifelong dream has been to join the W3C and fight browser inconsistencies!"

[material]: https://material.google.com
[material-ui]: http://www.material-ui.com/
[w3c]: https://www.w3.org/
