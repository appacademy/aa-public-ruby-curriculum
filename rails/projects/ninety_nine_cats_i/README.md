# 99cats

This project asks you to clone the (now defunct) dress rental website 99dresses.
Instead of a site for dresses, however, you will make a rental site for cats.

**[Live Demo!][live-demo]**

## Learning goals

By the end of this project, you should be able to

* Build a model with validations and default values
* Add methods and custom validations to a Rails model
* Build Rails views for `new` and `edit` forms
  * Use a hidden field to set the form's method
  * Separate common form elements into a partial that both forms use
  * Show data and perform actions based on the form's type
  * Use `select` and `input` HTML elements

## Phase 0: Setup

Create a new Rails app called `ninety-nine-cats`. Remember to include the flags
to set the database, to skip setting up a Git repo, to skip tests, and to use a
minimal build. (Refer to the Rails Setup reading in the sidebar if you've
forgotten how to do this.)

Grab the __.gitignore__ and __.gitattributes__ files from the starter repo at
the `Download Project` button below and copy them into the root directory of
your project.

If you prefer to use `byebug` instead of `debug` as your debugger, then replace
`debug` with `byebug` in your Gemfile and make sure your __.gitignore__ includes
__.byebug_history__. Add any other gems you want to install (e.g., `annotate`,
`better_errors`, `binding_of_caller`, `pry-rails`). If you make any changes to
your Gemfile, run `bundle install` to incorporate them into your project.

Next, set up your Postgres database by running `rails db:create`.

Finally, you don't need to worry about CSRF attacks today. (And no, you're not
supposed to know what that is yet!) Take a walk on the wild side by adding the
line

```rb
config.action_controller.default_protect_from_forgery = false
```

right underneath the `config.load_defaults X.X` line in
__config/application.rb__.

[live-demo]: https://aa-99-cats.herokuapp.com/

## Phase I: `Cat`

In this first phase, you will set up your `cats` table in the database. You will
then build a basic web interface for creating, accessing, and manipulating the
data stored in the table. You will also practice using partials to keep the code
in your `views` DRY.

### `Cat` model

Build a `Cat` migration and model. Attributes should include:

* `birth_date`
  * Use the `date` column type.
* `color`
* `name`
* `sex`
  * Represent as a one-character string. Use the [`:limit`][limit-docs] option
    in your migration to make a `string` column of length 1.
* `description`
  * Use a `text` column to store arbitrarily long text describing fond memories
    the user has of the `Cat`.
* `timestamps`

Add database-level NOT NULL constraints to all of the columns except
`description` and `timestamps`, then migrate.

Once you've migrated, add the following validations in the model:

* `presence` where appropriate
* `inclusion` ensuring that `color` comes from a preset list of possible
  `CAT_COLORS` that you define. (You'll need to access the colors again in the
  views, so store them in a constant inside your `Cat` class.)
* `inclusion` ensuring that `sex` is `"M"` or `"F"`

Then add a [custom validation][custom validations]
`:birth_date_cannot_be_future` to ensure that the cat's `birth_date` is not in
the future. Here you can see the benefit of having declared `birth_date` to be
of type `date`: Active Record magically deserializes the string input into a
Ruby `Date` object. So, e.g., you can do this:

```ruby
kitty = Cat.new(birth_date: '2015/01/20')
kitty.birth_date #=> #<Date: 2015-01-20>
```

> Note: Naming a `Cat` instance `cat`--e.g., `cat = Cat.new(birth_date:
> '2022/01/20')`--will cause an error in pry because `cat` is a reserved word.

Because Active Record stores `birth_date` as a `Date`, you have access to all
the methods listed in the [Ruby `Date` docs][date-docs]. At least one of those
methods should prove helpful in writing this validation.

Note, too, that the `valid?` method bases its result on whether or not the
validations put anything into the `errors` collection. You will accordingly want
to `add` an error to `errors` if the validation fails. **Hint**: if you are
stuck on how to write this validation, the example in the Rails Guide to [custom
validations] should provide a helpful model.

Finally, once you have finished adding all the validations, write an `#age`
method that uses `birth_date` to calculate age. Remember that you have access to
all the methods listed in the [Ruby `Date` docs][date-docs]. You also might want
to check out the `time_ago_in_words` method in the [Rails docs][time-ago].

> Note: `DateHelper`--see the lefthand sidebar in the Rails docs--is a module
> that needs to be added to the `Cat` model if you want access to the methods
> mentioned at the Rails link. To do this, require `action_view` at the top of
> your `cat.rb` file, then `include ActionView::Helpers::DateHelper` inside your
> `Cat` class.

When you have finished building out your model, test it in the Rails console
(`rails c`). First, test your validations: create a blank `Cat` (`c = Cat.new`)
and try to `save!` it. This should trigger all of your standard validations.

Next, set the `birth_date` field for your cat for some time in the future--use a
string with a four-digit year, e.g., '1/1/2030'--and try to `save!` it. That
should fail your custom validation. Then change the `birth_date` to a valid
value and call `#age`.

Finally, fill in the `name`, `color`, and `sex` fields with valid values and try
to `save!` again. Did it work this time? Congratulations!

[date-docs]: https://ruby-doc.org/stdlib-3.1.1/libdoc/date/rdoc/Date.html
[custom validations]: https://guides.rubyonrails.org/active_record_validations.html#custom-methods
[time-ago]:
  http://api.rubyonrails.org/classes/ActionView/Helpers/DateHelper.html#method-i-time_ago_in_words
[limit-docs]:
  https://api.rubyonrails.org/classes/ActiveRecord/ConnectionAdapters/SchemaStatements.html#method-i-add_column

### Routes and controller

Build the routes and controller as follows:

* Use the `resources` keyword to create all the RESTful routes for your `Cat`
  resource except `destroy`.
* Set the root path (`\`) to go to your `cats#index`. (Check out the comments
  that Rails provides in your __routes.rb__ file if you don't know how to do
  this.)
* Create a `CatsController` and build out the six required actions. (Again, skip
  `destroy`.)
* Define a private `cat_params` helper method to aid with mass assignments.

### `index`/`show` pages

Build an `index` page of all `Cat`s. Keep it simple: just list the cats and link
to their show pages.

Then build a `show` page for a single `Cat`. Again, keep it simple: just show
the `Cat`'s attributes. Use a [table] (`table`, `tr`, `td`, `th` tags) to format
the `Cat`'s vital information.

[table]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/table

### `new` form

Build a `new` form page to create a new `Cat`:

* Use `text` for name.
* Use radio buttons for sex.
* Use a dropdown for color (hint: keep your code DRY by using the constant you
  defined on the `Cat` class).
* Use a blank `<option>` as the default color. You may want to add the text '--
  select a color --' (or similar) so users know what this dropdown is for. This
  will force the user to consciously pick a color.
* You can use the `date` input type to prompt the user to pick a birth date.
  Look this up on MDN.
* Use a `textarea` tag for the description.

### `edit` form

Build an `edit` form to update a `Cat`:

* Copy your `new` form to an `edit` view.
* You'll want to make a `PATCH` request, but for historical reasons, a `<form>`
  won't let you specify a `method` of `PATCH`.
  * The Rails solution is to upload a special parameter `name`d `_method` with
    the value set to the HTTP method you want.
  * Use a hidden field to do this.
  * We say that you are _emulating_ a `PATCH` request this way.
* Pre-fill the form with the `Cat`'s current details.
  * You'll use the `value` attribute a lot. You may also use the `checked` (for
    `radio`, `checkbox`) and `selected` (for `option`) attributes.
  * You can look up `input` and `option` attributes on MDN. It will explain
    `checked` and `selected`.
  * Note that `textarea` is not a self-closing tag. The value is the body of the
    tag.

### Unify!

Your `edit` view duplicates your `new` view. Go ahead and unify the two:

* Copy your `edit` view to a partial named `_form`.
* Change all occurrences of the instance variable `@cat` to the local variable
  `cat`. You will pass in the value for this local variable from the form
  invoking the partial.
  * You do not want to use instance variables in your partials because it would
    promote **coupling** between your partial and the controllers that render
    it. By passing in the instance variable as a local variable, you keep your
    code DRY and prevent bugs should you ever decide to refactor.
  * Using local variables also gives you the flexibility to pass different
    variables depending on the context. For instance, you could pass
    `@cats[idx]` if you were to use this partial in the `index` view.
* Change your `edit` view to render the partial, passing in `@cat` as a local
  variable named `cat` like so:
  
  ```rb
  <%= render 'form', cat: @cat %>
  ```

* Test that everything still works. Yea!

Your next goal is to reuse this partial for the `new` form too. To do this, you
need to address four crucial differences between the `edit` and the `new`
forms:

  1. The `edit` form uses an existing `Cat`'s values to pre-fill the fields; the
     `new` form doesn't have access to an existing `Cat`.
  2. The `edit` form posts to `cat_url(cat)`; the `new` form posts to
     `cats_url`.
  3. The `edit` form makes a `PATCH` request; the `new` form makes a `POST`
     request.
  4. The `edit` form needs an `Update` button; the `new` form needs a `Create`
     button.

To resolve these differences, go back to the `new` action in your controller.
Create--but don't save to the database!--a blank `Cat` object and assign it to
`@cat`. Then in your `new` form, pass this `@cat` to the partial as `cat`.
Voilà! Now the partial will pre-fill with blank values when invoked from `new`,
exactly what you want.

This blank `cat` from the `new` form can also help resolve the three other
differences. Use [`#persisted?`][persisted] to determine which action, method,
and button text the partial should use. When you finish making these adjustments
to the partial, test it to make sure both forms display and behave correctly.

Congratulations! You have just built a website to store and display information
about cats. Commit your files, then move on to implementing the cat rental
requests in [Phase II!](README-ph2.md)

[persisted]: https://api.rubyonrails.org/classes/ActiveRecord/Persistence.html#method-i-persisted-3F