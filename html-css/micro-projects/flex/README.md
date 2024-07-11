## CSS Flex Exercise

Download this [skeleton][skeleton].

[skeleton]: https://assets.aaonline.io/fullstack/html-css/micro-projects/flex/skeleton.zip

Starting from the skeleton, update the `flex.css` stylesheet. In this exercise, we will be converting yesterday's solution from using floats to using flexbox. Let us begin. 🙏

 * First, let's remove the `clearfix` class from our `header` as it won't play well with flex.
 * Next, we should unfloat our logo image and our `nav`, and remove the `inline-block` display property from the list items in our `nav`.
 * Now that we've undone our beautiful styling we can call flex to our aid! Let's add `display: flex` to our `header` and see what happens.
 * Our logo and nav links should be side-by-side now since they're both children of our header. Now figure out which element needs `display: flex` for our individual nav links to appear side-by-side.
 * The last thing we need is more space between our logo and our nav links. Give our header `justify-content: space-between` so that it arranges its children just the way we want.

Check the solution to compare your work to ours.

