## HTML Introduction Exercise

Practice writing HTML and coding popular HTML elements by creating a recipe
page.

First, create a new file called `index.html`.

Start with the standard HTML structure. We will go over this in more detail
later in the curriculum. For now, write all of today's exercise within the body
tag.

```html
<html>
  <head>
  <title>Kevin McCall Recipe</title>
  </head>
  <body>
    <h1>Shakshuka</h1>
  </body>
</html>
```

**Pro-Tip:** Use the html snippet in VS Code to generate a basic HTML page layout by typing `html:5` and then pressing Tab.

Now build up your page with the following elements:

* An `h1` with the title of your recipe
* An unordered list of anchor links to each section of your recipe
* An `h2` for the description section
* A paragraph with the description of your recipe
* A link within the description to a wikipedia article about your recipe
* An image of your prepared dish
* An `h2` for the ingredients section
* An unordered list of recipe ingredients
* An `h2` for the directions section
* An ordered list of cooking directions
* A comment at the end citing the author of the original recipe

It may be helpful to open up your file in your web browser and refresh as you
code to see your work. To do this in VS Code, right-click on the file name in the
file tree and select `Copy Path`. Paste this path into your browser and
see your rendered code!

You may also try `open index.html` from the terminal. Just make sure you are in the correct working directory.

Feel free to find your favorite recipe on the web and paste in content to the
respective elements.

#### HTML Character Codes

When copying over your recipe content you may run into some weird character
problems. For example, the word sauté appeared on my page as sautÃ©.

This is because HTML is parsing the characters using a defined character set. We
will talk more about where we define this character set later in the curriculum.

For now, the best way to deal with these characters is to escape them using HTML
Character Entity References. For example, if I wrote in my code: `saut&eacute;`
it would render correctly in the browser as `sauté`.

Other common character entity references are `&amp;` for an ampersand and
`&nbsp;` for a non-breaking space.

Here is a list of [HTML Character Entity
References](https://dev.w3.org/html5/html-author/charref).

After coding your recipe page, compare your html to [this
example][solution].

[solution]: https://assets.aaonline.io/fullstack/html-css/micro-projects/html-introduction/solution.html
