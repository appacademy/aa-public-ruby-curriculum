## Thinking in boxes

As we continue structuring web pages we should try to maintain a perspective of seeing all of these HTML element building blocks as boxes.

By thinking in boxes and boxes surrounding other boxes we will be able to create more advanced layouts and have an easier time styling our layouts in the future with Cascading Style Sheets.

So how do we step into this mindset of seeing the web in boxes? 

Practice.

Front-end development is more of an art than a science. There are many ways to structure and style a page to achieve the same design, but by maintaining this box perspective we will minimize our efforts.

## Containers

When we are referring to boxes we are talking about both HTML Elements for the sake of holding content and HTML Elements for the sake of holding other HTML Elements.

The HTML Elements that are purely used to hold other HTML elements are commonly called containers.

Containers are vital to our next step in front-end development which will be to use CSS to layout our elements on the page.

## Semantic HTML

First, let us go over some of the tags used to define container elements:

```html
<header>
    Container for elements in the top header section of a page
</header>
```

```html
<footer>
    Container for elements in the bottom footer section of a page
</footer>
```

```html
<nav>
    Usually used to hold navigation elements like lists of links
</nav>
```

```html
<article>
    Used to hold content that makes sense on its own like Posts or Comments
</article>
```

```html
<aside>
    Used to hold sidebar sections that are tangentially related to the content
</aside>
```

```html
<figure>
    Holds images, graphic content, code samples etc.
</figure>
```

```html
<figcaption>
    Holds caption content for a corresponding figure element
</figcaption>
```

```html
<section>
    A section of the page or chapter of an <article> with a heading
</section>
```

```html
<div>
    A common container element used when other semantic elements do not seem appropriate
</div>
```

Other than the div element, all of these tags were introduced in HTML5. This means you will likely find a lot of developers still containing everything in `<div>` elements.

Here is a great figure from HTML5 Doctor describing the decision of which semantic element we should use: [Semantic HTML Flow Chart](http://html5doctor.com/downloads/h5d-sectioning-flowchart.png)

Watch the following GIF several times to see how this developer thought through containing each of their HTML Elements:

![Breaking A Layout Into Boxes](https://assets.aaonline.io/fullstack/html-css/demos/css_demos/lectures/navbar.gif)

When looking for the right HTML Element we can always refer back to the great [MDN HTML Elements Documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element).

**We should try to be as semantic as possible with our HTML structure to not only make our code more readable, but to make styling our code easier as well.**
