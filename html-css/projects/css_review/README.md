# CSS Review

We're going to take our first steps using CSS! In this assignment we'll build a
pixel perfect clone of [this page][live-04]. Download the skeleton
[here][css-skeleton]!

Often when working as a front-end developer you'll be collaborating with a
designer. Most likely they will provide you with a sequence of screenshots and
specifications for you to convert into neatly, maintainable HTML and CSS.

To guide you there will be hints broken out in phases, a series of
[screenshots][shots] and a document with [specifications][specs].
Take a look at the [exploded view][exploded] to get a good sense of the
structure and nesting of elements.

As your first step towards CSS mastery, this assignment will focus on getting
comfortable with CSS properties. A semantic HTML document, as well as
stylesheets with CSS selectors have already been crafted for you. You get to do
the fun part of applying styles!

We will use the following subset of [CSS 2.1][css-21] properties. With only
these 11 properties we can style the complete page!

- display (see CSS Display reading)
- margin/padding (see Margin reading)
- [border][p-border] (and border-bottom, border-left, etc.)
- width (see CSS Intro reading)
- [font-family][p-font-family]
- [font-size][p-font-size]
- [font-weight][p-font-weight]
- [color][p-color]
- [background][p-background]
- float (see CSS Float reading)

[css-skeleton]: https://assets.aaonline.io/fullstack/html-css/projects/css_review/skeleton.zip
[css-21]: http://www.w3.org/TR/CSS21/propidx.html
[p-border]: http://css-tricks.com/almanac/properties/b/border/
[p-font-family]: http://css-tricks.com/almanac/properties/f/font-family/
[p-font-size]: http://css-tricks.com/almanac/properties/f/font-size/
[p-font-weight]: http://css-tricks.com/almanac/properties/f/font-weight/
[p-color]: https://developer.mozilla.org/en-US/docs/Web/CSS/color
[p-background]: http://css-tricks.com/almanac/properties/b/background/


## A Few Tips Before You Start...

- Make sure to keep the [specs][specs] at your side at all times.
- Open the [screenshots][shots] in Apple's Preview to study them. You get a nice
  crosshair to select and measure elements. You can also zoom.
- Use Chrome and the [inspector tools][inspector] (command-option-i). Make sure
  not to accidentally be zoomed in on your page. The screenshots and browser
  ratio should be 1:1.
- You will be working in the **skeleton** directory. Each phase corresponds to a
  numbered CSS file you should use, as well as an HTML file.
- The best way to see how properties modify the layout is to quickly try
  something, and then view the result in the browser. Try to make small
  iterative steps, getting immediate feedback from your browser.
- Finally, enjoy the beauty in the details. A designer's favorite game is Spot
  The Difference. So-so approximations never suffice, and they will kindly let
  you know.
- You can do it!

[specs]:
  https://assets.aaonline.io/fullstack/html-css/projects/css_review/SPECIFICATIONS.md
[shots]:
  https://assets.aaonline.io/fullstack/html-css/projects/css_review/screenshots.zip
[inspector]:
  https://assets.aaonline.io/fullstack/html-css/projects/css_review/dev_tools_chrome.png
[exploded]: http://appacademy.github.io/css-warm-up/exploded/exploded.html

## Phase 1: Header

- [Screenshot A][ss-01-a]
- [Live][live-01]

Every browser comes with a built in stylesheet. This is called the
`user-agent-stylesheet`. As browsers vary, and we don't want to be fighting
built in styles, we've provided a so-called reset stylesheet. This is
automatically included in your HTML documents today. If you're curious, you can
peek at `skeleton/css/00-reset.css`. We'll talk more about this later in class
this week.

OK. Let's dive into it! Open up the first screenshot and see our goal. You will
write your CSS in `skeleton/css/01-header.css`. Pull up the HTML file in
`skeleton/01-header.html` and study the markup. Also view it in the browser.

The best place to start is typography. Let's crack open the [specs][specs] and
set the corresponding values for `font-family`, `font-size`, and `font-weight`.
We set these properties on the `body` selector in the provided CSS file. Setting
them on the `body` element will cause them to nicely trickle down to all other
elements. Refresh and give a yay for `sans-serif`!

The next thing to note about the screenshot is that the background of the
entire page is a light gray. Look up the hexadecimal color code for a light gray
in the [specs][specs]. Add the `background` property to the `body` selector.
Refresh the page and see the change!

**Note:** Setting temporary background colors on elements is an excellent way to
debug your CSS. This helps you understand what rectangle you are working with. I
like to use built in color names to quickly do this. Using `background: yellow;`
or `background: green;` is quick and easy. Most crayon colors are supported as
keywords.

The next step is to focus on the header bar. Make it red. Add the
appropriate property and value to the `.header` class. Refresh. Notice a thin
gray line below the bar. Go add it using `border-bottom`.

Next up, as we see in the HTML and can discern from the screenshot, there is an
inner element inside the `.header` element. It is less wide than the whole
header, which expands to the full width of the browser. Look at the
[specs][specs] to see the desired width of the container and set the `width`
property for the `.header-nav` element. Refresh. Note that there's no easy way
to see if this had the desired effect, as elements are transparent by default
(we dictated this in the provided reset stylesheet). So let's give the
`.header-nav` a temporary background color. How about green? Refresh. What do
you see?

So it's the right size, but it's aligned to the left. All block elements behave
this way by default. Rather, we would like it to be centered. Somewhat
unintuitive, we center block elements by giving them a `margin: auto` property.
This will evenly space out the margins on the left and right side of an element.
Note that this only works if the element is less wide than its parent element,
else there would be no remaining space to evenly divide. Refresh and enjoy!

Almost there! Let's set left and right gray borders on the `.header-nav` and get
rid of the temporary green background color. Let's also set the `color` property
on the `.header` to make all the text white. So close!

Finally, we note that our header is quite thin compared to the screenshot. There
needs to be more space around the words of "App Academy Friends". We have
several options with CSS to fix this, adding padding or margin to either the
`header`, `nav`, `h1`, or `a` elements would do the trick. However, I'd argue
that from a usability standpoint it would make sense to make our click targets
as large as possible. So let's add `padding` to all links nested in the
`.header`. Padding, however, only plays nicely on block elements. By default
`<a>` tags are inline elements, as they nicely flow as words in a paragraph.
Let's use our CSS powers to override this default, by setting `display: block;`,
together with the padding on all `.header a` elements.

Refresh and high-five yourself!

[live-01]: http://appacademy.github.io/css-warm-up/solution/01-header.html
[ss-01-a]:
  https://assets.aaonline.io/fullstack/html-css/projects/css_review/screenshots/01-header-a.png

## Phase 2: Navigation

- [Screenshot A][ss-02-a]
- [Screenshot B][ss-02-b]
- [Live][live-02]

Let's add some navigation! Pull up the screenshot and study the HTML for this
phase. Note that we've been given a nicely structured unordered list `<ul>` with
list items `<li>` inside of it, who in their turn contain `<a>` tags. Note how
we declared the corresponding CSS selectors for all these tags.

Since we added a general rule to make all `a` tags inside of the `.header` to be
block elements and have padding, our newly added `<a>` tags nicely pick up this
style too.

The big challenge of this phase will be to get a bunch of `block` elements next
to each other horizontally. As you might recall, block elements do not tolerate
any neighbors by default. However, we'd like the `h1` to be on the left, and the
`ul` on the right. Inside the `ul`, we'd like all `li`'s to be next to each
other too.

We can accomplish this using a property called `float`. There's a lot to say
about floating, and we'll go more in depth on it soon in class. For now it's
enough to know that you can set the `float` property to either `left`, `right`,
or `none`. In short it will cause an element to float on the right or left,
causing any content below it to move up and wrap around it.

Let's see it in action. Set `float: left;` on `.header-logo` and `float: right;`
on `.header-list`. Refresh the page and observe. Note that the red header
completely disappeared, but `.header-logo` and `.header-list` are still there on
the left and the right in faint white. This is sort of what we want, but it's
also broken. We'll talk more about this crazy behavior in class.

For now, the thing to memorize is that **whenever we float any element, we have
to add the `.group` clearfix class to the parent element in our HTML.** This is
a little snippet of CSS we provided as an utility in the reset stylesheet. Open
up the `skeleton/02-navigation.html` file and add `group` to the class list of
the `<nav>` tag, causing it look like `<nav class="header-nav group">`. Refresh
and our red header should reappear. Yay!

Let's use this same trick to get the `li` elements next to each other
horizontally. Add `float: left;` rule to the `.header-list > li` selector. Make
sure to add the group class to the `<ul>` tags. Great!

Next up, add some borders. We'd like a line on the right side of the
`.header-logo`. We'd also like a line on the left side of all
`.header-list > li` elements. Let's also set the `font-weight` on the
`.header-logo` to make it bold.

Finally, to top it off, consider the usability of our navigation bar.
Wouldn't it be great to give some visual feedback that you can click on links?
Sure, you're given a little pointer hand as a cursor when you hover over any `<a>`
tag. But why not go the extra mile? Set it to change its background color to
black. You can employ the `:hover` pseudo-selector to accomplish this. Use the
`.header-logo:hover` and `.header-list > li:hover` to set the `background`
property. Neat, no?

At this point you've covered all basic techniques. Yay! The next two steps will
simply be variations of what you've done so far!

[live-02]: http://appacademy.github.io/css-warm-up/solution/02-navigation.html
[ss-02-a]:
  https://assets.aaonline.io/fullstack/html-css/projects/css_review/screenshots/02-navigation-a.png
[ss-02-b]:
  https://assets.aaonline.io/fullstack/html-css/projects/css_review/screenshots/02-navigation-b.png

## Phase 3: Content

- [Screenshot A][ss-03-a]
- [Live][live-03]

Launch the HTML file in Chrome and notice the big mess and broken navigation
bar. Don't be discouraged, it's simply the missing `group` classes from the
HTML. Add them back to the HTML like we did earlier. Much better!

Let's study the screenshots. We need a white background on the `.content`
container. We also need to constrain its width. Next we need to center it (hint:
margin!). Let's also add borders to its left, right and bottom sides.

Inside the `.content` container we have two child elements: `.content-sidebar`
and `.content-main`. If we look in the specs we see their widths defined. Go
ahead and set them. Next we'd like to have them be next to each other. Use the
`float: left` property on both elements. Don't forget to set the group class on
their parent `.content`. Refresh.

That looks good. However, we'd like some whitespace to allow our text to
breathe. Again we have several options to use margin or padding to accomplish
this. I'd suggest setting padding on both `.content-sidebar` and
`.content-main`. Note though that padding increases an element's total width.
Therefore you're going to have to subtract any padding off the previously
defined width to make it all fit. Give it a shot.

Finally, set the `font-size` and `font-weight` on the `.content h1`. Add a
bottom margin to the header to allow some space between it and the paragraph
below.

So close!

[live-03]: http://appacademy.github.io/css-warm-up/solution/03-content.html
[ss-03-a]:
  https://assets.aaonline.io/fullstack/html-css/projects/css_review/screenshots/03-content-a.png

## Phase 4: Footer

- [Screenshot A][ss-04-a]
- [Screenshot B][ss-04-b]
- [Live][live-04]

At this point you should be able to tackle the footer mostly on your own. I'd
suggest giving it a shot! Remember the [specs][specs].

If you get stuck, here's the list of steps I'd take: Set the width and the
background, align the footer center, set the color and font-size and add the
borders. Float the copyright to the left, and the list of links to the right.
Have the inner list items be floated to the left. Don't forget to add the group
classes to all parents of a floated element. Use padding to space everything
out. Finally, set a hover state for the links. Et voila!

You did it! Pretty cool, right? Now compare your work to my solutions!

[live-04]: http://appacademy.github.io/css-warm-up/solution/04-footer.html
[ss-04-a]:
  https://assets.aaonline.io/fullstack/html-css/projects/css_review/screenshots/04-footer-a.png
[ss-04-b]:
  https://assets.aaonline.io/fullstack/html-css/projects/css_review/screenshots/04-footer-b.png
