# CSS Friends

## Part 3: Modal

**Topics:** 

- [Positioning][t-positioning]
- [Border-radius][t-border-radius]

#### Screenshots
- [Screenshot A][ss-12-a]
- [Screenshot B][ss-12-b]
- [Screenshot C][ss-12-c]
- [Live][live-12]

### Download Skeleton [here](https://assets.aaonline.io/fullstack/html-css/projects/micro-projects/css-friends/css-friends-12/skeleton.zip)

Create a `.modal` container at the bottom of the page, with `<body>` as
its parent. Have it contain two sections: `.modal-screen` and
`.modal-form`.

Give `.modal-screen` a `fixed` position. By setting `top`, `bottom`,
`left`, `right` all to `0`, we will stretch it out to fill the entire
screen. Add a `z-index` of `2` to have it sit in front of everything
else on the page. Give it a `rgba(0, 0, 0, 0.8)` value for its
`background` property. The `0.8` alpha will make it slightly
see-through.

Position the `.modal-form` absolute, using the centering trick from
earlier. Style it reusing the `.input` and `.submit` classes you
created.

You may want to use the `&times;` HTML-entity as your `x` closing
button.

Toggle the showing and hiding of the modal based on the presence of the
`.is-open` class on the `.modal` parent container. Use the display
property.

Use the following script to make the toggling work in your mockup. Add
the classes `.js-modal-open` and `.js-modal-close` to any elements you
want to add interactivity. Enjoy!

```html
<script src="../shared/js/jquery.js"></script>
<script>
$(function(){

  $("body").on("click", ".js-modal-open", function(event){
    event.preventDefault();
    $(".modal").addClass("is-open");
  });

  $("body").on("click", ".js-modal-close", function(event){
    event.preventDefault();
    $(".modal").removeClass("is-open");
  });

});
</script>
```

[ss-12-a]: https://assets.aaonline.io/fullstack/html-css/micro-projects/css-friends/docs/screenshots/12-modal-a.png
[ss-12-b]: https://assets.aaonline.io/fullstack/html-css/micro-projects/css-friends/docs/screenshots/12-modal-b.png
[ss-12-c]: https://assets.aaonline.io/fullstack/html-css/micro-projects/css-friends/docs/screenshots/12-modal-c.png
[live-12]: http://appacademy.github.io/css-friends/solution/12-modal.html
[t-border-radius]: https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius

[t-positioning]: https://www.w3schools.com/css/css_positioning.asp