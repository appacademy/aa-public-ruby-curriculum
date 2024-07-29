# CSS

Which of the following does **NOT** belong in the HTML `head` section?
- [ ] `meta` tags
- [ ] `script` tags
- [ ] a `navbar`
- [ ] `link` tags to load in CSS

<details><summary>Answer:</summary>

a `navbar`</details>
<details><summary>Explanation:</summary>

A `navbar` belongs within the `body` tag.</details>

```html
<!-- Think back on the rules for selector precedence and consider the following: -->
<style>
  p {
    color: red;
  }
  p span {
    color: yellow;
  }
  p.small {
    font-size: 12px;
  }
  #big {
    font-size: 80px;
  }
</style>

<p class="small" id="big">
  <span>Some Text</span>
</p>
```

What will be the `font-size` and `color` of the text?
- [ ] `color: yellow`, `font-size: 80px`
- [ ] `color: red`, `font-size: 80px`
- [ ] `color: yellow`, `font-size: 12px`
- [ ] `color: red`, `font-size: 12px`

<details><summary>Answer:</summary>

`color: yellow`, `font-size: 80px`</details>
<details><summary>Explanation:</summary>

The `id` attribute takes precedence over the other attributes, so the `#big` CSS rule would ensure the `font-size: 80px`. Then the specificity of the `span` tag inheriting from the `p` tag would ensure the `color` would be `yellow`.</details>

```html
<!-- Think back on the rules for selector precedence and consider the following: -->
<style>
  * {
    color: blue;
  }
  section p {
    color: red;
  }
  article p {
    color: yellow;
  }
</style>

<article>
  <section>
    <p>
      It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness...
    </p>
  </section>
</article>
```

What will be the `color` of the text?
- [ ] red
- [ ] yellow
- [ ] blue

<details><summary>Answer:</summary>

yellow</details>
<details><summary>Explanation:</summary>

Precedence wins again! Since both the `section` and the `p` tag inherit from the `article` tag then the color of the text will be `yellow`. </details>

```html
<!-- Consider the following: -->
<style>
  body {
    background-color: white;
  }

  p {
    background-color: wheat;
    margin: ?;
    padding: ?;
  }
</style>

<p>First Paragraph</p>
<p>Second Paragraph</p>
<p>Third Paragraph</p>
```

Let's make the paragraphs display with 10 pixels of white space between them. What should the above `margin` and `padding` properties be set to?
- [ ] `margin: 5px`, `padding: 0`
- [ ] `margin: 5px`, `padding: 5px`
- [ ] `margin: 5px`, `padding: 10px`
- [ ] `margin: 10px`, `padding: 0`
- [ ] `margin: 0px`, `padding: 10px`

<details><summary>Answer:</summary>

`margin: 10px`, `padding: 0`</details>
<details><summary>Explanation:</summary>

For this problem you just need margin! Try experimenting with the different answers to see why.</details>

```html
<!-- Consider the following: -->

<style>
  section {
    height: 100px;
    width: 100px;
  }
</style>

<section>I AM A SECTION</section>
<section>I AM ALSO A SECTION</section>
```

You want the `section`s to appear next to each other, and for each `section` to be `100px` tall and `100px` wide. Which of the following properties could you add to the `section` styling to achieve this? (Select all that apply.)
- [ ] `display: inline`
- [ ] `display: inline-block`
- [ ] `float: left`
- [ ] None of these answers

<details><summary>Answer:</summary>

- `display: inline-block`
- `float: left`</details>
<details><summary>Explanation:</summary>

Both `display: inline-block` and `float: left` could achieve the look you are after!</details>

```html
<!-- Consider the following: -->
<style>
  p {
    color: red;
    font-size: 16px;
  }
</style>

<p style="color: #FFFFFF; font-size: 12px">
  Some Text
</p>
```

What will be the `p` tag's color and font size?
- [ ] `red`, `16px`
- [ ] `red`, `12px`
- [ ] `#FFFFFF`, `12px` 
- [ ] `#FFFFFF`, `16px`

<details><summary>Answer:</summary>

`#FFFFFF`, `12px` </details>
<details><summary>Explanation:</summary>

Inline styling will always be the most specific and will override any other CSS rule.</details>
