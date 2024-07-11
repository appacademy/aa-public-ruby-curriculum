# CSS Friends

## Phase 8: Thumbs

**Topics:**

- [Border-radius][t-border-radius]
- [Pseudo-content][pseudo-content]
- [Positioning][t-positioning]
- [Transform][t-transform]
- [Triangles][t-triangles]

#### Screenshots

- [Screenshot A][ss-08-a]
- [Screenshot B][ss-08-b]
- [Live][live-08]

### Download Skeleton [here](https://assets.aaonline.io/fullstack/html-css/projects/micro-projects/css-friends/css-friends-08/skeleton.zip)

A grid of friends! Use a list and float every `<li>`! Spacing them out properly
will be tricky. You will need to use `:nth-child()` pseudo-selectors to add some
left and right margin to the middle of every three `<li>`s.

Create a `.thumb` class to style the links that contain the thumbnails. You can
use the same `../docs/images/cat.jpg` picture for the `<img>` tag. We will want
to reuse this `.thumb` class later. Note that we're not using this `.thumb`
class to float or space the grid, that task is left to the `<li>`s.

Add `title` attributes containing friend names to the link tags. You should have
something like: `<a href="#" class="thumb" title="Jonathan">`. Then use
`:before` pseudo-content to grab this title and inject it into the link. Style
this to make it a tool tip, making it a `block` element and position it
absolute.

To position an `absolute` element in the center relative to its parent, use a
combination of `left: 50%` and `transform: translateX(-50%)`. The `left`
percentage is relative to its parent, and will set the current element's left
most pixel to half its parent width. Since this is too far to the left, we have
to adjust this by subtracting half our own width. The `translateX()` value takes
a percentage relative to itself, which is exactly what we need.

To create a little triangle below the tooltip, we'll need to inject more
pseudo-content. Fortunately, we have two injection points, `:before` and
`:after`. Since we used `:before`, we will now use `:after`. Look at [this
demo][t-triangles] for a demonstration of how you can make a triangle out of
borders.

If you'd like an additional hint, check out this [tool tip][t-tooltip] demo. But
give it a shot yourself first!

[ss-08-a]:
  https://assets.aaonline.io/fullstack/html-css/micro-projects/css-friends/docs/screenshots/08-thumbs-a.png
[ss-08-b]:
  https://assets.aaonline.io/fullstack/html-css/micro-projects/css-friends/docs/screenshots/08-thumbs-b.png
[live-08]: http://appacademy.github.io/css-friends/solution/08-thumbs.html
[t-triangles]: http://appacademy.github.io/css-demos/triangle.html
[t-tooltip]: http://appacademy.github.io/css-demos/tooltip.html
[t-border-radius]:
  https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius
[t-positioning]: https://www.w3schools.com/css/css_positioning.asp
[t-transform]: https://developer.mozilla.org/en-US/docs/Web/CSS/transform
[pseudo-content]: css-pseudo-content
