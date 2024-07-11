## CSS Syntax

Observe the syntax of a single style declaration in your stylesheet:

```css
selector {
  property: value; /* This is a comment. Don't forget your semicolons! */
}
```

The **values** of the **properties** apply to any HTML elements that match the given **selector**.

Here's how to style all `<p>` elements with blue, bold, sans-serif font.

```css
p {
  font-family: sans-serif;
  font-weight: bold;
  color: blue;
}
```

You can have as many style declarations as you wish in a CSS document. In some situations several selectors match similar elements, hence the name **Cascading** Style Sheets.

### Cascading Styles

```css
p {
    color: black;
}

p span {
    font-weight: bold;
}

p span.highlight {
    color: yellow;
}
```


```html
<p>
  This is some text in a paragraph element. 
  
  <span>
    This text has been styled bold because it is in a span element 
    that's a child of a paragraph element.
   </span>
  
  <span class="highlight">
    This text is yellow because the class selector overrides 
    the tag selector when multiple style declarations apply to the same
    attribute (`color`) of the same element. It's still bold though!
   </span>
</p>
```

The above example introduces another type of selector and hints at how we can maintain DRY CSS using cascading/overiding styles.

### CSS Basic Selectors

**Element Selector**

You can directly select HTML elements by stating their name.

Example: Select all `<h1>` elements and make their font size 24px.

```css
h1 {
    font-size: 24px;
}
```

Select children of elements by using a space between the names of parents and children.

Example: Select all `<a>` elements that are descendants of `<li>` elements that are descendants of `<ul>` elements and remove all text-decoration.

``` css
ul li a {
    text-decoration: none; /* This assures the a elements are not underlined */
}
```

**Class Selector**

Classes group elements together for styling purposes. Classes are extremely popular in front-end development and are key to making our style code DRY. They are also helpful by making our stylesheets more readable.

Reference a class selector with a `.`

```html
<section>This is a normal section</section>

<section class="bg-grey">This section has a grey background</section>
```

```css
.bg-grey {
    background-color: whitesmoke; /* there are many color names */
}
```

**Bad Selectors**

You may see these selectors in the wild, but you should almost never use them in practice because they're more or less specific than necessary.

Universal selectors are usually too broad and are rarely necessary. They are also not as descriptive as classes.

```css
* {
    border: 1px solid red; /* puts a red border around EVERY element */
}
```

ID attributes should be unique to their element. ID selectors are thus inherently too specific and often lead to repetitive styling. They're declared in CSS using a `#`.

```html
<img id="logo"/>
```

```css
#logo {
    width: 100px;
}
```

Class and Element selectors will get you very far in CSS styling. We'll discuss more advanced selectors later in the curriculum.

### Overspecificity

If you want to override properties defined for a "specific"
(high-specificity) selector, you must use an _even more_ specific
selector. Multiple overrides in your styles can become difficult to manage, so it's important to follow this simple rule: **Be only as specific as necessary.**

### Precedence

Precedence governs which styles are overridden. The more specific a selector is, the higher its precedence. Selectors with higher precedence override those with lower ones.

Both the type of selector and how it's applied to the HTML document determine specificity. Here's the hierarchy of specificity (from most to least):

*  inline styles
*  ID selectors
*  class selectors
*  element selectors

**Inline Styles**

Inline styling is simply too specific and should not be used in practice. Inline styles are applied directly to the HTML document with a style attribute.

```html
<span style="font-weight:bold;color:black;">Bold and Black Text</span>
```

**Additional Resources:**

* [CSS Precedence](http://www.vanseodesign.com/css/css-specificity-inheritance-cascaade/)
* [CSS-Tricks Precedence](http://css-tricks.com/specifics-on-css-specificity/)
* [CSS Selectors](http://www.w3.org/TR/CSS21/selector.html#pattern-matching)
* [30 Selectors to Memorize](http://net.tutsplus.com/tutorials/html-css-techniques/the-30-css-selectors-you-must-memorize/)
