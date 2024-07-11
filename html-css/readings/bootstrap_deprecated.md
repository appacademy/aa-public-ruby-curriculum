# Project Outline:

## Overview

This project involves adding Twitter Bootstrap to a basic Rails project
and using the bootstrap classes to add new style and functionality to
the application.  Polished style and good user interface *are vital for
you to impress employers*, and Twitter Bootstrap can get you there.

You'll be building an interactive site for a company or product. You can
make one up, or use the [startup name generator][startup-name-gen]. The
content will mostly be Lorem Ipsum nonsense, so it doesn't really matter
what the site is about, but use [this generator to generate a startup
concept][gen].

[startup-name-gen]: http://www.buzzfeed.com/jessicamisener/startup-name-generator
[gen]: http://www.itsthisforthat.com/

## Phase I: Setup

1. Start with the [auth video demo repo][auth-video-demo] as a base.
   Before we add Bootstrap, let's fire up the `rails server` and look
   at the blandness of the current log-in page.  This is what we will
   be improving on today.
2. Add `gem 'bootstrap-sass'` to your `Gemfile` and run `bundle install`.
3. Rename the existing `application.css` file to `application.scss`.
4. Add `@import "bootstrap-sprockets";` and `@import "bootstrap";` to
   `application.scss`.
5. Add `//= require bootstrap` to your `application.js`.

Start up the server, and verify that the appropriate JS and CSS files
are loading when you visit a page in the browser. Visual changes to your
application should be immediately obvious.

[auth-video-demo]: https://github.com/appacademy/authvideodemo

## Phase 2: Navigation
1. Add your own navbar to `app/views/layouts/application.html.erb`.
Please **do not copy and paste** the html from the bootstrap docs.  Write your own navbar - a common pattern is to wrap a `ul` element in a
containing `nav`, and then put each `a` tag inside an `li` in the
`ul`.  Without styles, it will look like an unordered list of links.

  ```html
  <nav>
    <ul>
      <li><a href="#">link one</a></li>
      <li><a href="#">link two</a></li>
    </ul>
  </nav>
  ```
2. Add some basic bootstrap classes (`nav nav-pills` will do the trick)
 to style your nav.  Check this out in the browser.
 This looks better, but we are still only half-way there.

 ```html
 <nav class="navbar navbar-default">
   <ul class="nav nav-pills">
     <li><a href="#">link one</a></li>
     <li><a href="#">link two</a></li>
   </ul>
 </nav>
 ```
3. To take advantage of bootstrap's responsive nav functionality you
will need to restructure your HTML a bit.
In the bootstrap [docs for navbar][bootstrap-docs-navbar], you'll
see their example has a div with the class `navbar-header` inside the
main `nav` element that wraps the whole navbar.  This button inside
the `navbar-header` will replace the full navbar when the screen
width gets too narrow, and will toggle a drop-down with the navbar
links.  This is a responsive feature, and you get it practically
for free!

 ```html
 <nav class="navbar navbar-default">
  <div class="container-fluid">

    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#collapse-menu"
              aria-expanded="false">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
    </div>

    <div class="collapse navbar-collapse" id="collapse-menu">
      <ul class="nav navbar-nav pull-right">
        <li><a href="#">link one</a></li>
        <li><a href="#">link two</a></li>
      </ul>
    </div>

  </div>
</nav>
 ```
Adapt your code based on the example to use the full navbar feature.
4. The last tweak to make in `application.html` is to wrap the `yield`
statement in a div with the class `container`.  This is allows us to use
the grid system classes later.

```html
<div class="container">
  <%= yield %>
</div>
```

[bootstrap-docs-navbar]: http://getbootstrap.com/components/#navbar
[bootstrap-stickyfooter-example]: http://getbootstrap.com/examples/sticky-footer/

## Phase 3: Form Styles and General Layout

The purpose of this step is to improve the styling of the signin/singup
forms. Bootstrap will style them a little by default, but we want to
take advantage of all the form styling as well as adopting the grid
system.

0. Read the documentation for [basic forms][bootstrap-forms]. Read the
code. What do we need to change in our code so that it will receive the
bootstrap styling?

0. Put all the label and input pairs *inside* the
form tag into new divs with the class `form-group`.  **NB**: The
Bootstrap styling won't apply correctly if you nest the inputs inside
the labels.

0. Give all the inputs that are not hidden the class `form-control`.
This will give them the bootstrap styling. But now they take up the
whole page and look silly! Continue to the next step.

0.  Read the documentation on the [grid system][bootstrap-grid-system].
It is short; read it.

0. To take advantage of the aforementioned grid, we must put all of our
html elements into rows and columns. Do this by first putting everything
in a `div` with the class `row`. Inside this we need to put a column to
control the width of our content. Have it take up 1/3 of the screen. The
screen is divided into twelve columns, so we should put all the content
into a column of width 4. To do this, put everything that is *inside*
the `row` div into a `div` with the class `col-xs-4`. The `xs` from the
class `col-xs-4` indicates to bootstrap's grid system that this is for
'extra small' devices and to not do some fancy adaptation if the screen
resolution is below a certain threshold.  Meaning: if we display this
page on a mobile device our columns will still be next to each other
instead of on top of each other.

0. Next, offset the content 1 column to the right. Do this by giving the
column div *another* class. Give it `col-xs-offset-1`.

0. One final thing: the button. Change it from a `submit` element to a
`button element`. Give it the class `btn` and `btn-primary`. It should
now be all Bootstrappy and blue. Isn't that nice?

[bootstrap-grid-system]: http://getbootstrap.com/css/#grid-intro
[bootstrap-forms]: http://getbootstrap.com/css/#forms

## Phase 4: Set up static pages controller.

0. Edit the navbar  by adding links to not-yet existing static pages
(home, contact, about)

0. Create static pages controller and associated routes.

0. Create rails views for home, contact, and about. Leave them empty for
now except for a `<h1>` with the title at the top.

## Phase 5: Contact Page

0. For this page we will want a two column layout, similar to
[this][contact].  Use the grid layout classes to create a row and two
columns, and put a form in the left column. (The form doesn't actually
need to create anything in the database; we are only using it to test
different bootstrap effects.  Make the  "submit" input `type='button'`
rather than `type='submit'`, and the page won't refresh when you push
the button.)

0. Make the submit button blue. `btn btn-primary` are the classes you
need.  Much like with the sign-in form, add the appropriate classes to
any other inputs or elements in the form.

0. Create a right column which has a striped table of staff names and
phone numbers.  There is a bootstrap class for this.

[contact]: https://yourkarma.com/contact
[bootstrap-modal]: http://getbootstrap.com/javascript/#modals
[bootstrap-alerts]: http://getbootstrap.com/components/#alerts
[bootstrap-forms]: http://getbootstrap.com/css/#forms

## Phase 6: About page

0. Check out [the jumbotron][jumbo] reading. Simple but sweet.

0. Create a jumbotron. Give it a snappy `<h1>`.

0. Use two columns for text in the jumbotron.

0. After your jumbotron, add a 'meet the team' section, this will
require a new `row`. Use an `<h1>` to start the section's content.

0. Add another row. Make 4 width 3 columns.

0. Add a [badass circular image][images] to each column. Get a random or
placeholder image from somewhere. Each image should be unique. Put the
name of the team member below the image in an `<h2>`.

0. Add a paragraph of some sort of ipsum below the name in a `<p>`.

0. Make all the text in the about the team section centered. This is as
easy as adding the class `text-center` to the `row` `<div>`.

[jumbo]: http://getbootstrap.com/components/#jumbotron
[images]: http://getbootstrap.com/css/#images

## Phase 7: Index/Home Page
0. As you add content to this page, remember to use our grid layout;
put each section in a row, and give it width and centering with the
`col-xs` and `col-xs-offset` classes.

1. Put a [carousel][carousel] front and center on this page. Use some
nice images to populate it. (I like finding CC-licensed images with
Flickr's advanced search options.  Have some [creative commons
kittens][cc-kittens].)

Here are some more tips:
 * To add images in a rails project, put them in the `assets/images`
   directory and use the [image_tag helper][rails-image-tag].

 * In this case the code will be similar to the bootstrap example.  You
   can pretty much copy their example, changing the outer div id and the
   images.

 * You almost [never should use a carousel][should-i-use-a-carousel],
   but it's a good exercise in using one of bootstrap's fanciest
   features.

2. After the carousel, add several [Lorem Ipsum][lorem-generator]
headers with paragraphs following them.  We want some dummy content.

[should-i-use-a-carousel]: http://shouldiuseacarousel.com/
[carousel]: http://getbootstrap.com/javascript/#carousel
[left-arrow-unicode]: http://www.fileformat.info/info/unicode/char/25c0/index.htm
[cc-kittens]: http://www.flickr.com/search/?q=kitten&l=cc&ct=0&mt=all&adv=1
[rails-image-tag]: http://apidock.com/rails/ActionView/Helpers/AssetTagHelper/image_tag
[bootstrap-scrollspy]: http://getbootstrap.com/javascript/#scrollspy

## Phase 8: Sign In/Log Out

0. Ok, lets go back to the navbar in the application layout.

0. If a user is not logged in, lets show a link to the sign_in page that
we customized earlier.

0. Let's add a [drop down menu][bootstrap-drop-down] to our navbar.
However, lets only add it to the navbar if a user is logged in.

0. Now that our navbar does a nice job of telling us if we are signed in
or not, we can remove the `<ul>` from the application layout that
informs the user that they are signed in and gives them a sign out link.

0. Make one link to the user's profile. Make another link to sign the
user out.

[bootstrap-docs-navbar]: http://getbootstrap.com/components/#navbar
[bootstrap-drop-down]: http://getbootstrap.com/components/#dropdowns

## Phase 9: Free Bootstrap Theme

To wrap things up, pick a custom (free) theme to try out.  Find some
[here][free-bootstrap-themes].

## Bonus

+ [Checkout bootsnipp][bootsnipp] for more bootstrap snippets.
+ [Learn about gravatar][gravatar-railscast] and add a user profile page
that shows their gravatar image.

[bootsnipp]: http://bootsnipp.com/
[gravatar-railscast]: http://railscasts.com/episodes/244-gravatar
[free-bootstrap-themes]: http://bootswatch.com/
[mykarma-homepage]: https://yourkarma.com/
[bootstrap-tooltips]: http://getbootstrap.com/javascript/#tooltips
[bootstrap-scrollspy]: http://getbootstrap.com/javascript/#scrollspy
[bootstrap-js]: http://getbootstrap.com/javascript/#js-overview
[lorem-generator]: http://www.lipsum.com/
