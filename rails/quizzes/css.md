# CSS

<quiz>
  <question>
  <p>Which of the following does **NOT** belong in the HTML `head` section?</p>
    <answer>`meta` tags</answer>
    <answer>`script` tags</answer>
    <answer correct>a `navbar`</answer>
    <answer>`link` tags to load in CSS</answer>
    <explanation>A `navbar` belongs within the `body` tag.</explanation>
  </question>
</quiz>

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

<quiz>
  <question>
  <p>What will be the `font-size` and `color` of the text?</p>
    <answer correct>`color: yellow`, `font-size: 80px`</answer>
    <answer>`color: red`, `font-size: 80px`</answer>
    <answer>`color: yellow`, `font-size: 12px`</answer>
    <answer>`color: red`, `font-size: 12px`</answer>
    <explanation>The `id` attribute takes precedence over the other attributes, so the `#big` CSS rule would ensure the `font-size: 80px`. Then the specificity of the `span` tag inheriting from the `p` tag would ensure the `color` would be `yellow`.</explanation>
  </question>
</quiz>

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

<quiz>
  <question>
  <p>What will be the `color` of the text?</p>
    <answer>red</answer>
    <answer correct>yellow</answer>
    <answer>blue</answer>
    <explanation>Precedence wins again! Since both the `section` and the `p` tag inherit from the `article` tag then the color of the text will be `yellow`. </explanation>
  </question>
</quiz>

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

<quiz>
  <question>
  <p>Let's make the paragraphs display with 10 pixels of white space between them. What should the above `margin` and `padding` properties be set to?</p>
    <answer>`margin: 5px`, `padding: 0`</answer>
    <answer>`margin: 5px`, `padding: 5px`</answer>
    <answer>`margin: 5px`, `padding: 10px`</answer>
    <answer correct>`margin: 10px`, `padding: 0`</answer>
    <answer>`margin: 0px`, `padding: 10px`</answer>
    <explanation>For this problem you just need margin! Try experimenting with the different answers to see why.</explanation>
  </question>
</quiz>

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

<quiz>
  <question multiple>
  <p>You want the `section`s to appear next to each other, and for each `section` to be `100px` tall and `100px` wide. Which of the following properties could you add to the `section` styling to achieve this? (Select all that apply.)</p>
    <answer>`display: inline`</answer>
    <answer correct>`display: inline-block`</answer>
    <answer correct>`float: left`</answer>
    <answer>None of these answers</answer>
    <explanation>Both `display: inline-block` and `float: left` could achieve the look you are after!</explanation>
  </question>
</quiz>

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

<quiz>
  <question>
  <p>What will be the `p` tag's color and font size?</p>
    <answer>`red`, `16px`</answer>
    <answer>`red`, `12px`</answer>
    <answer correct>`#FFFFFF`, `12px` </answer>
    <answer>`#FFFFFF`, `16px`</answer>
    <explanation>Inline styling will always be the most specific and will override any other CSS rule.</explanation>
  </question>
</quiz>
