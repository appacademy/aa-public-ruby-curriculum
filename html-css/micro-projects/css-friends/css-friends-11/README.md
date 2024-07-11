## Phase 11: Icons

**Topics:**

- [Pseudo-selectors][t-pseudo-selectors]
- [Background-size][t-background-size]
- [Background-position][t-background-position]
- [Overflow][t-overflow]

#### Screenshots
- [Screenshot A][ss-11-a]
- [Screenshot B][ss-11-b]
- [Live][live-11]

### Download Skeleton [here](https://assets.aaonline.io/fullstack/html-css/projects/micro-projects/css-friends/css-friends-11/skeleton.zip)

Icons make things look so good! And lucky you, we're going to use a
technique called a *sprite*. This is one image file that contains many
smaller images. We combine them to dry up our CSS, but most importantly,
to reduce HTTP request overload. We only have to fetch one image,
instead of many. This makes things crazily snappy!

Check out our [sprite][sprite]. Then look at the [specs][specs].

We will create a slew of icon classes, one for each icon. We will prefix
each class with `.icon-`. Let's start off with the post icons, create
classes for `.icon-comment`, `.icon-reblog`, and `.icon-favorite`.

Add these classes to the `<a>` tags you wrote in the previous phase.

Back in your CSS, you can select all of these classes using the
`[class*="icon-"]` pseudo-selector. Let's first write some general rules
that apply to all icons. Set the supplied `../docs/images/sprite.png`
image as the background image. You will want to set the
`background-size` property to the specs' sprite size, as the sprite
image is in double resolution for retina screens.

Then set the display property of all icons to `inline-block`. This
allows us to set a width and height. Set a `width` and `height` of
`25px` as per the specs. Go look at the results. Notice the background
image with the text on top of it.

We want to get rid of the text, but we do not want to take it out of our
HTML, as it conveys meaning. Let's use CSS to push the text out of the
box! First add a `overflow: hidden` rule. See how that clips off the
text at the sides?

Now let's push out the text completely. Remember how padding is part of
an element and shows the background image? Let's use a `padding-top`
that is equal to the height, and set the `height` to `0`. This
effectively pushes the text outside the box, as it does not fit in a `0`
height element. Our overflow settings then proceed to clip it off. Check
it out!

Next up, start showing the correct part of the sprite for each class we
wrote. In each individual icon class selector we will only have to set
the `background-position` coordinates.

Once we have these in place, also create selectors with the `:hover`
state.

For the small icons we're going to use the `.icon-small-` prefix. Go
ahead and flesh those out.

We can then select all of them with the `[class*="icon-small-"]`
selector. Notice how the general rules of our earlier selector will also
apply. We can override the `width` and `padding-top` for the small
icons.

When it comes to applying these icons to our HTML, we don't want these
smaller icons hiding the text of the links, rather we want them to be an
addition. For this we will repurpose the `<i>` tag, which seems suitable
for an icon.

Go ahead and add empty `<i>` tags with icons classes inside of links on
the page. You'd end up with something like this:
`<a href="#"><i class="icon-small-wall"></i> Wall</a>`.

[ss-11-a]: https://assets.aaonline.io/fullstack/html-css/micro-projects/css-friends/docs/screenshots/11-icons-a.png
[ss-11-b]: https://assets.aaonline.io/fullstack/html-css/micro-projects/css-friends/docs/screenshots/11-icons-b.png
[live-11]: http://appacademy.github.io/css-friends/solution/11-icons.html
[specs]: https://assets.aaonline.io/fullstack/html-css/micro-projects/css-friends/docs/SPECIFICATIONS.md
[sprite]: https://assets.aaonline.io/fullstack/html-css/micro-projects/css-friends/docs/images/sprite.png
[t-background-position]: https://developer.mozilla.org/en-US/docs/Web/CSS/background-position
[t-pseudo-selectors]: http://css-tricks.com/pseudo-class-selectors/
[t-background-size]: https://developer.mozilla.org/en-US/docs/Web/CSS/background-size
[t-overflow]: https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
