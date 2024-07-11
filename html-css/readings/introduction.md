## Front-end Development

Front-end development can be split up into three major coding languages.

**HTML** - HyperText Markup Language defines the structure of a website semantically and the content that will be rendered by the web browser.

**CSS** - Cascading Stylesheets deal with the presentation of content including aspects such as layout, formatting and colors.

**Javascript** - One of the most popular coding languages in the world, brings movement and user interaction to websites.

This Curriculum focuses on the first two cornerstones of modern front-end development: HTML & CSS.

## HTML 

HyperText Markup Language is made up of HTML Elements denoted using opening and closing tags:

```html
<p>This is an example of a paragraph element in HTML</p>
```

These elements form the building blocks of an HTML document and may either directly introduce content or wrap content to provide information about document text.

For example, the above `<p></p>` tags wrap the containing document text into an HTML Element. The `<img/>` tag below is self-closing in that it does not wrap anything but instead directly inputs the provided image as an HTML Element.

```html
<img src="appacademy.io/images/app-academy-logo.img" />
```

Notice that this image tag received additional information by declaring what is called an **attribute**. Attributes receive **values** in double quotes.  The `src` attribute provides a url to the image tag for the browser to get and render the proper image inside the HTML Element. Mastering the various tags and attributes is the first key to becoming proficient in HTML.

## Tags

The following are examples of popular tags in HTML and how they are used.

### Paragraphs and Headings

```html
<p>A paragraph tag is used to wrap a multi-line body of text</p>

<h1>A heading1 tag is used to denote the largest title on the page</h1>
```

**N.B.** The `<h1>` tag is used in site ranking algorithms by search engines such as Google. It is important to only have one `<h1>` element per page and to have it contain a keyword summarizing the page content.

```html
<h2>Used for titles with a smaller font size than h1</h2>
```

These heading tags should be used in descending order with regards to their containing font sizes. The smallest size is a:

```html
<h6>Heading six tag</h6>
```

### Lists

Lists are used to contain a series of list elements. These may be ordered or unordered but must contain at least one element. There are three different types of HTML list tags. The following is an example of the first, most common type, the unordered list.

```html
<ul>
    <li>Unordered List</li>
    <li>Ordered List</li>
    <li>Definition List</li>
</ul>
```

The ordered list is usually used to display numbered list elements.

```html
<ol>
    <li>First</li>
    <li>Second</li>
    <li>Third</li>
</ol>
```

The definition list it not as common but is used to hold definition data and term elements.

```html
<dl>
    <dt>Unordered List</dt>
    <dd>An HTML element made up of list elements in no particular order</dd>
    <dt>Ordered List</dt>
    <dd>An HTML element made up of list elements in order</dd>
    <dt>Definiton List</dt>
    <dd>An HTML element with definition term and definition data elements</dd>
</dl>
```
### Links

What is commonly referred to around the internet as a "link" is a clickable element that directs the browser to another page or area on the page. This is not to be confused with a link tag, which will be discussed in future sections.

To create a link using an html element we use what is called an anchor tag:

```html
<a href="http://appacademy.io">App Academy</a>
```

Notice that the URL for which this clickable anchor tag element will make a GET request to is provided through an href attribute. The text within the anchor tag element is the what appears as clickable on the page.

In the following code we create two anchor tags. One is self-closing with a name attribute and the other contains text that has an href attribute with the same name value preceded by a `#`. This is how we create in-page links. Clicking the 'Back to top' link wherever it is placed on the page will now take the user to the location of the named anchor tag.

```html
<a name="top-of-page" />
    <!-- Imagine all of your other content in between. By the way, this is how we denote comments in HTML. -->
<a href="#top-of-page">Back to top</a> 
```

The use of the `#` in the beginning of the url tells the browser to find an element on the page with the given name attribute instead of making a new GET request.

### Images

We create image elements in HTML using a self-closing image tag with the `src` attribute referring to the path to the image data.

```html
`<img src="http://appacademy.io/images/app-academy-logo.img" alt="app-academy-logo" />`
```

The `alt` attribute provides alternate text for the image which is used in image search rankings, speech-accessibility, and displayed when a user hovers over the image.
