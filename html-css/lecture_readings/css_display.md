## CSS Display

#### Watch:
  * [Display][02-css-display] ([code][02-css-display-html]).

[02-css-display]: https://vimeo.com/151190176
[02-css-display-html]:  https://assets.aaonline.io/fullstack/html-css/demos/css_demos/lectures/02-css-display.zip

### Readings:

- Specifies the type of rendering box used for an element
- The bread and butter values of display are:
  - **none**
  - **block**
  - **inline**
  - **inline-block**
- There are several more exotic types such as table and flex

#### Display None

- Turns off the display for the element. The page is rendered as though the
  element did not exist.

#### Display Block

- Element expands to full width of parent container
- Height stretches to fit content inside
- You can manually override height and width properties
- Block elements stack vertically, cannot be next to each other
  naturally

#### Display Inline

- The default property for display
- Cannot contain block elements
- Inline follows text flow
- Think of inline elements as words that flow in a paragraph: they follow each
  other, are placed on a baseline, and wrap if they do not fit in the parent
  container
- Elements take up minimal width and height to accommodate content
- You cannot manually set height and width
- Padding and margin only work sensibly left and right, pushing other inline
  elements horizontally away
- Vertical padding and margin overflows and is often undesired

