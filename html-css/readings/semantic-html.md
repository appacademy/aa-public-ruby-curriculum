# Semantic HTML

HTML5 gives us a new set of semantic tags that allow us to write
markup that makes sense. For instance:

```html
<header>
  <h1> AppAcademy! </h1>
  <nav>
    <a href="#">First navigation link</a>
    <a href="#">Second navigation link</a>
  </nav>
</header>

<section>
  <article>
    <h2> First article in this section! </h2>
    <p> A paragraph of text under the h1 tag! </p>
  </article>

  <article>
    <h2> Second article in this section! </h2>
    <p> Lorem ipsum dolor sit amet, consectetur adipisicing... </p>
  </article>
</section>

<footer> End of the document :( </footer>
```

The semantic tags like `main`, `section`, `article` and `nav` are new to
HTML5, and make it read like english. Your document should always make
semantic sense _before_ worrying about styling. [This
list][html5-tags] of tags should comprise the vast majority of your
markup. The days of nested `div` and `span` tags are gone.

__Bonus__: [This flowchart][html5-flowchart] might help you decide on your tags.

[html5-tags]: https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/HTML5_element_list
[html5-flowchart]: http://html5doctor.com/downloads/h5d-sectioning-flowchart.pdf
