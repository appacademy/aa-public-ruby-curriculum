# Responsive Design

In the olden days, designing and coding website layouts was simpler. The range
of possible screen sizes was small, and you could usually get away with fixing
the width of the page at around 700 or 900 pixels. Today's landscape is
radically different with the advent of smartphones, tablets, Internet-enabled
watches and TVs, etc. Front-end developers first handled this vast new range of
screen sizes with *fluid layouts*, using percentage-based width values so site
layouts could expand and contract depending on the size of the device's screen.
This quickly proved insufficient, as layouts needed to do more than change size.
Elements needed to be rearranged depending on the space available, stacking
vertically on a thin phone screen while sitting in line on a wide monitor.

Thus the idea of *responsive design* came forth, pioneered by Ethan Marcotte in
[his famous article][marcotte_article] defining responsive design. The idea is
that we can write groups of CSS code that apply to different classes of devices
based on characteristics like screen width. With this approach, you can create a
layout that supports a large range of screen widths, from small phones up to
widescreen monitors, tweaking styles at different points to make sure the layout
looks good on as many devices as possible. The mechanism for accomplishing such
conditional styles is called the **media query**.

[marcotte_article]: http://alistapart.com/article/responsive-web-design

## Media Queries

A media query is a wrapper for CSS code that tests if the device running it
meets one or more criteria. Commonly, the main criterion is screen width, but
today we can also query things like device orientation and pixel density. The
following is the basic syntax for a media query:

```css
@media screen and (min-width: 480px) {
  /* Selectors and their styles to apply if condition passes */
}
```

There are two parts to this condition. One is that the *media type* of the
device be `screen`. CSS supports multiple [media types][media_types]. The one we
usually care about is `screen`, meaning a device with a computer screen. Another
useful media type is `print`, which allows you to apply styles to a page only
when it is being printed onto paper. If a media type isn't specified, the
default used is `all`, meaning the query isn't restricted based on type. It's
common to simply leave the type off for most styles:

```css
@media (min-width: 480px) {
  ...
}
```

The second criterion we see used is `min-width`. This specifies that these
styles only apply on devices where the screen is greater than or equal to the
given width. This can be useful if, for example, you want certain styles to only
show on desktop computers but not phones and tablets.

You can list multiple conditions and combine them with AND or OR logic:

```css
@media (min-width: 480px) and (max-width: 980px) {
  /* Selectors and their styles to apply when 480px <= screen_width <= 980px,
     perhaps a good range for tablets */
}
```

```css
@media (max-width: 600px), (min-width: 800px) {
  /* Selectors and their styles to apply
     when screen width is <= 600px or >= 800px */
}
```

[media_types]: http://css-tricks.com/snippets/css/all-stylesheet-media-types/

## Responsive Design Process

In the early days of responsive design, developers would attempt to write groups
of styles for specific devices (e.g. iPhone 3, iPad) in order to give each
device an "optimal" look, using media queries that targeted the specific
device's width. This quickly became impractical, as so many different
smartphones and tablets have been released that it would be impossible to write
a set of styles for each one.

Instead, the best approach is to determine appropriate breakpoints for your
site. A **breakpoint** is a width measurement that represents a point at which
your site's layout needs a substantial change to accommodate screens in that
range. The process for determining your breakpoints works as follows. Start off
by viewing your site in a browser window open to the default desktop size. Then,
slowly resize the width of your browser window. Every time the layout starts to
look off or cramped, note which elements will need their styles tweaked and the
current width of the window. With Dev Tools open, Chrome will show you the
current window dimensions while you're resizing. Once you've determined your
breakpoints, you can begin the work of tweaking styles to make your site look
nice on as many devices as possible. The main takeaway is that you should rely
on breakpoints that actually matter for your layout, and not attempt to target
styles at specific devices.

## Mobile-First Design

In the early days of responsive design, it was common to start off by creating a
site's layout and styles for a desktop experience, then to add in media queries
that reversed and added styles when a smaller device was detected. This was
often done with `max-width` media queries. For example, if you have columns that
sit next to each other on a desktop, you could have them stack on mobile:

```css
@media (max-width: 760px) {
  .column {
    float: none;
    width: 100%;
  }
}
```

While this worked, it was a roundabout approach that placed the work of
restyling on less-powerful mobile devices. A better methodology came to be,
known as **mobile-first design**. The main tenet of this approach is to design
for the mobile experience first, not the desktop. All styles for the smallest
devices should be placed outside of media queries, making them the default. Then
support for larger devices should be added via `min-width` media queries. This
places the restyling responsibility on larger devices instead of smaller ones,
and leads more to adding styles than overwriting them.

```css
.column {
  width: 100%;
}

@media (min-width: 760px) {
  .column {
    float: left;
    width: 50%;
  }
}
```

## Viewport Meta Tag

The last thing you need in addition to media queries to enable a responsive
layout is the **viewport meta tag**:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

You should add this to the `<head>` of any site you want to make responsive. By
default, mobile browsers will pretend they are much wider than they really are.
The purpose of this is to support sites that aren't mobile-optimized and are
only legible on desktop screens. The mobile browser tells the site that its
display width is large so the site can render as it would on a wide display,
then the mobile browser displays it to the user zoomed out so the user can zoom
and pan around to imitate the desktop browsing experience. The meta viewport tag
tells the mobile browser to skip this step, use its own width as the display
width, and set the initial zoom to 100%. This will be ideal if you've supplied
responsive styles that cater to the device's width.

## Resources

* [CSS Media Queries & Using Available Space][css_tricks_media_queries]
* [Logic in Media Queries][logic_media_queries]
* [Media Queries on MDN][mdn_media_queries]
* [Creating a Mobile-First Responsive Web Design][mobile_first_design]

[css_tricks_media_queries]: http://css-tricks.com/css-media-queries/
[logic_media_queries]: http://css-tricks.com/logic-in-media-queries/
[mdn_media_queries]: https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Media_queries
[mobile_first_design]: http://www.html5rocks.com/en/mobile/responsivedesign/
