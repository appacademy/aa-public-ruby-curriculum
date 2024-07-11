# CSS Friends

## Phase 2: Notifications

**Topics:**

- [Border-radius][t-border-radius]
- [z-index]
- Positioning
- [Overflow][t-overflow]
- Display
- [White-space][t-white-space]

#### Screenshots

- [Screenshot A][ss-02-a]
- [Screenshot B][ss-02-b]
- [Screenshot C][ss-02-c]
- [Live][live-02]

### Download Skeleton [here](https://assets.aaonline.io/fullstack/html-css/projects/micro-projects/css-friends/css-friends-02/skeleton.zip)

We're adding notifications! Add an inline badge, inside the notifications `<a>`
tag. Give it the reusable `.badge` class and style it round as a circle. You'll
want to tweak the padding to get it just right.

For the dropdown, start by nesting a new list of notification list elements
inside of the original notification list element. Add it right below the `<a>`
tag. You'll see how it stretches the whole header bar down. It sort of looks
right, if only we could lift it out of the document flow, and have it not
stretch its parent. Aha, you say! Positioning! Remember to create a coordinate
system you control, by setting its parent to `relative` position.

The trick to hiding and showing the dropdown is combining the `:hover` selector
and the display property. How would you select the dropdown when someone hovers
over the parent notification list item?

If you'd like a hint at this point, check out this amazing [cat with
glasses][t-glasses-demo] demo.

To keep the notification text on one line you may use the `white-space`
property.

As you add borders to everything, make sure to nudge the dropdown to line up
nicely with vertical lines in the navigation bar. Finally, you may have issues
with a list item poking through the bottom rounded edges. Fix this using the
`overflow` property.

Before moving on to Phase 3, add a `z-index` of `1` to the whole header bar. In
order to do this, you will also have to set the `position` property to
`relative`, as `z-index` does not work on static, non-positioned, elements. This
should not change anything visually as-is, but will ensure that our header
dropdown will stay on top as we move on and add more to the page.

Pat yourself on the back, you've earned it! By now we've covered the core
concepts of CSS. Things will just get easier and _way_ more fun!

Show off your dropdown to a **TA**.

[ss-02-a]:
  https://assets.aaonline.io/fullstack/html-css/micro-projects/css-friends/docs/screenshots/02-notifications-a.png
[ss-02-b]:
  https://assets.aaonline.io/fullstack/html-css/micro-projects/css-friends/docs/screenshots/02-notifications-b.png
[ss-02-c]:
  https://assets.aaonline.io/fullstack/html-css/micro-projects/css-friends/docs/screenshots/02-notifications-c.png
[live-02]:
  http://appacademy.github.io/css-friends/solution/02-notifications.html
[t-border-radius]:
  https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius
[z-index]: https://developer.mozilla.org/en-US/docs/Web/CSS/z-index
[t-overflow]: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
[t-white-space]: https://developer.mozilla.org/en-US/docs/Web/CSS/white-space
[t-glasses-demo]: http://appacademy.github.io/css-demos/positioning.html
