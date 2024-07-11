# CSS Friends

## Phase 6: Sidebar

**Topics:**

- Positioning
- [Pseudo-selectors][t-pseudo-selectors]

#### Screen Shots

- [Screenshot A][ss-06-a]
- [Screenshot B][ss-06-b]
- [Live][live-06]

### Download Skeleton [here](https://assets.aaonline.io/fullstack/html-css/projects/micro-projects/css-friends/css-friends-06/skeleton.zip)

Divide the sidebar up into three sections: `.profile-picture`, `.profile-info`,
and `.profile-nav`.

Have the `.profile-picture` be a link that contains an image tag with the
provided `./images/cat.jpg` picture. Make the link a `block` element and style
it. Thanks to your earlier reset, the image will now expand to fill the full
width of the link.

To pull the `.profile-picture` partly out of its sidebar section, use a negative
`margin-top`. This is better than positioning, as it is still in the document
flow, and won't leave a gap, but pull everything up with it.

To make sure it is in front of the `.content-header` section, you will have to
position it `relative`. You do not need to nudge it (we used `margin-top` to do
that) or give it a z-index. As they're now both `relative`, order of appearance
on the page dictates the stacking order. This is in our favor, as
`.profile-picture` is declared later.

To get the divider lines between all the `.profile-nav` list elements, but also
at the top and bottom, you'll want to use a pseudo selector like `:first-child`,
`:last-child`, or `:nth-child()`.

[ss-06-a]:
  https://assets.aaonline.io/fullstack/html-css/micro-projects/css-friends/docs/screenshots/06-sidebar-a.png
[ss-06-b]:
  https://assets.aaonline.io/fullstack/html-css/micro-projects/css-friends/docs/screenshots/06-sidebar-b.png
[live-06]: http://appacademy.github.io/css-friends/solution/06-sidebar.html
[t-pseudo-selectors]: http://css-tricks.com/pseudo-class-selectors/

