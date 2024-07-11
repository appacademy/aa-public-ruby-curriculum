## CSS Box Model

Download this [skeleton][skeleton]

[skeleton]: https://assets.aaonline.io/fullstack/html-css/micro-projects/box_model/skeleton.zip

The purpose of this exercise is to learn the box model and start developing an
ability to visualize the structure and organization of HTML elements on a web
page. The focus should be on experimentation; think of the steps below as 
suggestions for what to experiment with. Every element in an HTML document 
is enclosed in a box, even those that don't look like boxes. A circular image, 
for example, will still be nested inside its own box when rendered to the page.

Update box_model.css as follows to see how different properties can affect these
boxes. 

### Warmup

* Right now, none of the `div` elements on the page take up any space because
   they are empty. Open up the Chrome inspector (shortcut is `cmd-option-i`) and
   find one of these `div`s on the "Elements" pane. Verify that they are on the
   page and note their dimensions.
* Let's update our CSS so that all `div`s have a fixed `height` and
   `width` of `200px`. Refresh the page and note their new dimensions in the
   inspector.
* All boxes in HTML have `padding` and `border` properties available to them.
   Let's give both boxes a `padding` of `50px` and a `border` of `5px solid black`.
* Note the current `height` and `width` of each box now. The `padding` and `border`
   has been added on top of the original `width` we defined, so we should now have
   a total width and total height of 310px.
* What if we don't want the `padding` and `border` to be added _on top_ of the
   `width`, but rather be included in the total `width` calculation? We can
   accomplish this by setting the `box-sizing` property to `border-box`. Do this
   for the second box and note the results. Note how the content box has
   shrunken to allow room for the padding and border. *NB*: The default value for
   the box-sizing property is `content-box`.
* Do box elements always need a set `height` and `width` to be visible? No! Play
   around with adding text into the `p` element and see how it expands and
   shrinks to accomodate its contents.

### For the children

What if we want a `div` to take up a certain height, but also want it to be able
to grow accomodate children? Figure out which property allows you to make an
element take up at least 400px, but grow as needed.

Make a new `div` that defaults to 10px tall, then grows when you insert a long
paragraph as a child.

### Say cheese

Now let's talk images. Have you seen [this video][nyt-front-page-video]
showing how much the New York Times' front page has changed since 1852? Long
story short, images are an important part of modern web design! We run into some
interesting problems with them in HTML/CSS.

* Let's get some cat pictures on the screen. Create a new `div` with class
   'image-1-container' and give it a fixed `width` of 200px and a fixed `height`
   of 600px. Also give it a colored background so we can actually see it (you
   get to pick the color this time). Inside of this new `div`, create an `img`
   tag that points to the file called `cat.jpg` that's in the assets folder.
* Note that the image spills out of the `div`. By default, images will want to
   render with the full glorious dimensions. How can we combat this brash
   egotism? Tell the image to obey the constraints of its container by giving it
   a width of 100%. *NB*: You may be wondering, "100% of what". From the results
   of this experiment, you should be able to infer that width percentages are
   determined by the width of one's parent.
* Make a copy of your `image-1-container` and paste it below the original.
   Change this copy's class but give it the same styles as the original. Make
   sure that the new image is back to it's old image ways and bursting out of its
   container (If it's not, you weren't specific enough with your style rules for
   the last image and you should go fix them).
* Alter the styling on this new container so that it's width still defaults to
   200px but now it can grow to accomodate any image. Hint hint, it's something
   you used earlier to accomodate your other children. Remember that `div`
   elements are blocks and will take up the whole width of the window if you
   don't constrain them, so you might want to change them to inline-blocks or
   something.

[nyt-front-page-video]: https://flowingdata.com/2017/02/21/evolution-of-the-new-york-times-front-page/
