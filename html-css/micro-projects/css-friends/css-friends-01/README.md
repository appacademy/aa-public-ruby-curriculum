# CSS Friends

## Phase 1: Header

**Topics:**

- [Webfonts][t-webfonts]
- [Font-weight][t-font-weight]
- [Block][block]
- [Flex][t-flex]
- [Border][t-border]

#### Screenshots

- [Screenshot A][ss-01-a]
- [Screenshot B][ss-01-b]
- [Live][live-01]

### Download Skeleton [here](https://assets.aaonline.io/fullstack/html-css/projects/micro-projects/css-friends/css-friends-01/skeleton.zip)

Let's study the first _real_ set of screenshots and make a plan of attack.

Typography is always the best place to start. Pull up the specs. The first thing
you'll notice is a font family that most computers do not have installed.
Fortunately, Google provides it to us for free as a hosted webfont. Find it on
[Google Fonts][t-google-fonts], select the appropriate font-weights, and include
the provided `<link>` tag right before the other `<link>` tags in the `<head>`.

In `./css/01-header.css` set the default font weight, family and size on the
`body` tag. If you set up your reset correctly, these styles will nicely trickle
down to all child elements going forward.

The next step is to analyze the screenshots. You want to start thinking of
everything as being contained in boxes. We see an outer red box that expands to
the full width, with inside it a fixed width box. On the left you see the "App
Academy Friends" logo heading, and on the right a list of links. How would you
express these meanings using semantic tags?

I'd suggest using the `<header>`,
`<nav>`, `<h1>`, `<ul>` and `<li>` tags to express our structure. Go ahead and
write the skeleton in HTML.

Now add text and links. As you'll be adding dummy links throughout this project,
I recommend using a pound sign as the href: `<a href="#">`. That will prevent a
page reload.

Now that we have some structured markup in place, let's add some nice classes as
hooks to select. Start by adding an outer `.header` class, for the full bar.
Then add a `.header-nav` class for the fixed width container inside. I'd also
suggest using a `.header-logo` and `.header-list` class on the `<h1>` and `<ul>`
elements, as this will keep our selectors nice and shallow. I'd avoid adding
classes to the individual `<li>`s, as we can select them by their parent.

With these classes in your HTML, jump to the `./css/01-header.css` file and make
an outline of all the classes you added as selectors. Now go fill them out with
actual styles. Make small changes, immediately refreshing in your browser to see
the changes. Your understanding will grow by experimenting!

To center a smaller block element inside a larger block element, you'll want to
set its left and right margins to `auto`. Since block elements cannot sit next
to each other normally, you're going to need to use `flex`. It's OK to flex
things inside of flexed things.

You'll want to justify your logo `<h1>` to the left, and the `<ul>` list of
links to the right. To get the individual `<li>` next to each other you'll want
to again use `flex`.

It can be helpful to give elements a temporary background color, to see their
appearance while debugging.

As you put paddings in place, remember that usability is important. We want
large click targets. Make your links `block` elements and add padding to them.
Also do not forget the hover states, this is important and gratifying feedback
for the user.

Pixel perfect? Good!

[ss-01-a]:
  https://assets.aaonline.io/fullstack/html-css/micro-projects/css-friends/docs/screenshots/01-header-a.png
[ss-01-b]:
  https://assets.aaonline.io/fullstack/html-css/micro-projects/css-friends/docs/screenshots/01-header-b.png
[live-01]: http://appacademy.github.io/css-friends/solution/01-header.html
[t-webfonts]: http://en.wikipedia.org/wiki/Web_typography
[t-google-fonts]: https://www.google.com/fonts
[t-font-weight]: http://css-tricks.com/almanac/properties/f/font-weight/
[block]: css-display
[t-flex]: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
[t-border]: http://css-tricks.com/almanac/properties/b/border/
