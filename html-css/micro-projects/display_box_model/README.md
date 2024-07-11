## CSS Display & Box Model Exercise

Download this [skeleton][skeleton]. 

[skeleton]: https://assets.aaonline.io/fullstack/html-css/micro-projects/display_box_model/skeleton.zip

The purpose of this exercise is to learn the box model and the differences between the three primary display properties (block, inline, inline-block). The anchor tags from step 2 are naturally inline elements, which is why act oddly when provided padding. Spacing with margin and padding is vital to mastering CSS design. We also used the `inline-block` property to get practice positioning elements to create a desired layout.

Update box_model.css as follows to practice styling with different display and spacing properties.

* Make our list elements in the nav menu into `inline-block` elements.
* Give the links in those list elements a padding on all sides of 20px. By default `a` tags are inline and cannot have any `padding` applied to them. Change their `display` property to correct this default behavior.
* Pick the correct display property to position the nav next to the logo.
* Set our main content region by giving the body a width of 900px.
* Use the classic centering trick `margin: 0 auto` to center the body.
* Give the main section a 700px width and the aside a width of 180px.
* Apply a display property to position the aside and section next to each other. Space them out with a 15px `margin-right` on the aside.
    - If you find your ingredients list aligned to the bottom use the developer tools to find and correct the styling.
* Space out the list elements in the ingredients list with a top and bottom margin of 15px.
* Space out the directions the same way.
* Use the display property to put input elements on their own row. At this point it probably looks better to remove the "Cooking Expertise" and "Rating" labels.
* Space out the `select` element with margin and assign widths to the `text` input, `select`, and `textarea` to finish up our form.

**Challenge:** There is a reason we only gave the aside a `margin-right` of 15px when it should have been 20px to constitute the full 900px of the body. To see what I am talking about, jump into the dev tools, check off the `margin-right` on the aside, and apply a `border-left 1px solid black` on the aside and a `border-left 1px solid black` on the section. Why is there still a space between the borders? Research why and test some corrections.