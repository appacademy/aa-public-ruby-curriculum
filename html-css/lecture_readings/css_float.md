## CSS Float

### Watch:
  * [Float][08-css-float] ([code][08-css-float-html])

[08-css-float]: https://vimeo.com/151190182
[08-css-float-html]: https://assets.aaonline.io/fullstack/html-css/demos/css_demos/lectures/08-css-float.zip

#### Floats
- The float property *floats* an element to the left or right side of its parent container
- Used to align block elements next to each other
- A floated element shows up at the expected position
- Takes up minimal vertical/horizontal space to accommodate content
- Does not stretch height of parent container, it sticks out
- All content that follows wraps/flows around, unless cleared
- To tell an element that it cannot wrap around a floated element, you define the `clear` property on it
- Setting `clear` on an element is like having it say: "I refuse to wrap around
  any floated element, thus I will show up below the floated element."

#### Clearfix
- To make a parent element extend to the full height of all floated elements
  inside it, apply the clearfix
- It injects a pseudo-element inside the parent container with the clear
  property
- In doing so this pseudo-element will show up below the floated elements
- Since this pseudo-element is just a regular element, it will stretch the
  height of the parent to accommodate it
- You don't want this pseudo-element to show up visually, so just set it to an
  empty string, effectively making it a 0-height element
- It's a trick! Memorize it, but be able to reason about it
- Prefer a semantic name as `.group` for the class you add to the parent
  container of the floats

```css
.group:after {
  content: "";
  display: block;
  clear: both;
}
```