## CSS Positioning and Media Queries


- Download the [skeleton][skeleton].
- Get familiar with the html and css files. Specifically take a look at what is
  currently in `custom_grid.css`, and `positioning_media_queries.css`. 
- Now open up the `index.html` and try decreasing the size of your browser
  window. 
    - Notice when the window gets to a certain small size your sidebar starts to
      overlap with your `section` tag? And if you make the window even smaller
      everything collapses into a gross pile of text. You can't have that! 
- You can fix it with a single media query in your
  `assets/positioning_media_queries.css` file. Fill in the necessary code at the
  bottom of `positioning_media_queries.css`.
    * **Hint:** Think of the size of the window and how you can utilize the grid
      that has already been set up.

If you've ever browsed the internet on your phone you've probably seen the
"hamburger icon" on many websites before. The image indicates to a user `click
here for more options`. Why don't you try building one now in order to make your
website easier to browse?

#### Here is the Recipe for Making your Hamburger-fied navbar. 

Your goal is to have the original `nav` bar disappear and a clickable hamburger
icon appear once the window shrinks to a certain size. First off, download this
[hamburger](https://assets.aaonline.io/fullstack/html-css/assets/images/hamburger.png)
icon and add it to your `assets` folder. 

#### HTML

- Copy and paste the three original `li` wrapped `a` tags you had in the
  navbar(`#description`, etc.) directly underneath and outside of your original
  navbar `ul` but still within the `nav` tags
- Wrap the three `li` tags you just made in their own `ul` element 
- Now wrap that `ul` element you just created in a `li` tag
- Finally, wrap one more `ul` encapsulating everything you just wrote, and give
  it the class "hamburger-dropdown"

- By now your `hamburger` html should look something like this:

```css 
<nav>
/* Original Navbar Here */

    <ul class="hamburger-dropdown">
        <li>
            <ul>
                /* Your navbar links go here */
                <li><a href="#description">Description</a></li>
            <ul>
        </li>
    </ul>
</nav>
```


#### CSS
Now head to `positioning_media_queries.css`.

You want to make sure your hamburger is hidden until the window is smaller, so
first set the "hamburger-dropdown" element to `display: none`. Now inside
of your media query you'll work on the following:

- You know your hamburger will be taking the place of your old navbar so you
  should make sure it's not showing by setting the `nav > ul`'s display to none.
  
    - You'll also want to make sure your hamburger is showing! You can set the
      `hamburger-dropdown` element to `display: block`.
- Next, select the `li` within the `hamburger-dropdown` element and give it a
  background using the hamburger image from your assets folder.
- Set the width/height of the hamburger image to `50px` and then set the
  background-size of the `li` to `50px 50px`

Now you can work on the list of links that should only appear when you hover
over the hamburger.

- You want to make sure the list of links positions itself directly below the
  hamburger image. 
    - Take a look [here][dropdown] for a clue on how to make a drop down.
    - **Hint**: you'll need to use two `position` properties.
- Use one position property on the `ul` containing the anchor links within the
  hamburger-dropdown element. It should not obstruct the flow of the document.
  The other position property will be on the element with the hamburger image. 
- Now use a selector like the following to trigger the hover display effect

```css
.hamburger-dropdown:hover ul { 
    display: block;
 }
```

- Finally, hide the list of links when not hovering over it by setting its
  `display` to `none`.

Play with making the screen bigger and smaller and watch the hamburger happen.
Good job!
    
[Live version](http://appacademy.github.io/curriculum/positioning_media_queries.html)

[skeleton]: https://assets.aaonline.io/fullstack/html-css/micro-projects/positioning_media_queries/skeleton.zip

[dropdown]: https://www.w3schools.com/css/css_dropdowns.asp
