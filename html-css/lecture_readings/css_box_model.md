## CSS Display

### Watch:
  * [Box Model][03-css-box-model] ([block code][03-css-box-model-html] || [inline block code][03-css-box-model-inline-html]).


[03-css-box-model]: https://vimeo.com/151190177
[03-css-box-model-html]: https://assets.aaonline.io/fullstack/html-css/demos/css_demos/lectures/03-css-box-model.zip
[03-css-box-model-inline-html]: https://assets.aaonline.io/fullstack/html-css/demos/css_demos/lectures/03-css-box-model-inline.zip

#### Box-model

- The default way to calculate an element's size is:
  - **width/height** + **padding** + **border**
- In other words, if you set width/height, it is *exclusive* of padding and
  border. You need to add them to the width/height to get the total size an
  element takes up on the page.
- This default way of calculating the box model size is called **content-box**.

#### Box-sizing

- The `box-sizing` property lets you change the default way of calculating an element's size
- Rather than using the default **content-box** value, as described above, you
  can set it to **border-box** to have the width and height be inclusive of the
  padding and border