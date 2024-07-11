# CSS Display & Box Model

Download this [skeleton].

The purpose of this section is to learn the box model and the differences
between the three primary display properties (block, inline, inline-block). The
anchor tags from step 2 are naturally inline elements, which is why they act
oddly when provided padding. Spacing with margin and padding is vital to
mastering CSS design. We will also use the `inline-block` property to get
practice positioning elements to create a desired layout.

Update the css file as follows to practice styling with different display and
spacing properties.

* Make our list elements in the nav menu into `inline-block` elements.
* By default a tags are inline and cannot have any padding applied to them.
  First, change their display property to correct this default behavior. Then
  give the links in those list elements a padding on all sides of 20px
* Pick the correct display property to position the nav next to the logo.
* Set our main content region by giving the body a width of 900px.
* Use the classic centering trick `margin: 0 auto` to center the body.
* Give the main section a 700px width and the aside a width of 180px.
* Apply a display property to position the aside and section next to each other.
  Space them out with a 15px `margin-right` on the aside.
  * If you find your ingredients list aligned to the bottom use the developer
    tools to find and correct the styling.
* Space out the list elements in the ingredients list with a top and bottom
  margin of 15px.
* Space out the directions the same way.
* Use the display property to put input elements on their own row. At this point
  it probably looks better to remove the "Cooking Expertise" and "Rating"
  labels.
* Space out the `select` element with margin and assign widths to the `text`
  input, `select`, and `textarea` to finish up our form.

**Challenge:** There is a reason we only gave the aside a `margin-right` of 15px
when it should have been 20px to constitute the full 900px of the body. To see
what I am talking about, jump into the DevTools, check off the `margin-right`
on the aside, and apply a `border-left 1px solid black` on the aside and a
`border-left 1px solid black` on the section. Why is there still a space between
the borders? Research why and test some corrections.

When you're finished, compare your website to the [solution][solution_display].

## CSS Reset

Download this [skeleton][reset_skeleton]. Work out of `css_reset.css`.

Oh no! We've removed the original reset stylesheet! Time to build our own.

* Create a file called `custom_reset.css`.
* Clear default margin, padding and border from any elements that we're using in
  our HTML.
* Make sure font properties get inherited.
* Remove default styling from lists.
* Give text in the body a line-height of 1.5.
* Make sure images always take up the width of their parents.

## CSS Float

In this section, we will be updating our navbar to use the `float` property and
create a basic fluid grid system for our main content. Let us begin. 🙏

* Instead of making the `nav` into an `inline-block` element, use `float` to put
  our `nav` in the top-right.
* Just for fun, float the logo to the left and then clear-fix the vertical
  collapse problem.
* Replace the fixed pixel widths of our `aside` and `main` content section with
  a fluid grid system similar to those seen in the [CSS Grid System
  video][css-grid-video]. Create a css file called`custom_grid.css` and add
  these changes to that file. Note that this will require updating `index.html`
  with respective container class names.
* You may need to give your recipe image a width of `100%` so it expands to fit
  the entire `figure` and does not default to its natural fixed pixel width. Do
  this for all images by applying it to `custom_reset.css`.

## CSS Flex

In this section, we will be converting the work from the previous section from
using floats to using flexbox.

* First, let's remove the `clearfix` class from our `header` as it won't play
  well with flex.
* Next, we should unfloat our logo image and our `nav`, and remove the
  `inline-block` display property from the list items in our `nav`.
* Now that we've undone our beautiful styling, we can call flex to our aid!
  Let's add `display: flex` to our `header` and see what happens.
* Our logo and nav links should be side-by-side now since they're both children
  of our header. Now figure out which element needs `display: flex` for our
  individual nav links to appear side-by-side.
* The last thing we need is more space between our logo and our nav links. Give
  our header `justify-content: space-between` so that it arranges its children
  just the way we want.

Download the [solution] to compare your work to ours.

[skeleton]: https://assets.aaonline.io/fullstack/html-css/micro-projects/display_box_model/skeleton.zip
[css-grid-video]: https://player.vimeo.com/video/170320160
[solution_display]: https://assets.aaonline.io/fullstack/html-css/micro-projects/display_box_model/solution.zip
[reset_skeleton]: https://assets.aaonline.io/fullstack/html-css/micro-projects/css_reset/skeleton.zip
[solution]: https://assets.aaonline.io/fullstack/html-css/micro-projects/flex/solution.zip
