# Music App (Phases II-IV)

**[Live Demo!][live-demo]**

[live-demo]: https://aa-music-app.herokuapp.com

## Phase II: Notes

In this phase you will allow users to write notes about tracks. You can "embed"
the note form on the track show page.

- Add a `Note` model. Users can make a `Note` on any `Track`.
  - `Note`s will belong to an author and a track.
  - Use the column type `text` to store arbitrarily long notes.
  - Add appropriate indexes, constraints, and validations.
- On the `Track` `show` page, display the track's `Note`s.
  - Write a __notes/_note.html.erb__ partial.
  - Render the content, plus the author's email.
- Put a `Note` form on the `Track` `show` page.
  - Use a __notes/_form.html.erb__ partial.
  - Use a `textarea` in the form. Do not store the `user_id` in a hidden field.
    **Why?**
  - On submit of a new `Note`, redirect back to the track.
  - For this form, you can `redirect_to` the track even on validation failure.
    This "blanks out" the note content in the form. That would be bad, but the
    only real validation is that the content is not blank...
- Add destroy buttons for notes to the `notes/_note` partial.
  - Only show the button if the `current_user` authored the note.
  - In the controller, ensure that a user is not allowed to destroy a note
    unless they authored it.
    - **Hint:** You don't need a `before_action` for this; you can accomplish it
      by cleverly constructing your note search.

## Phase III: Helpers

In a fit of poor judgment, you have decided to display your lyrics like this,
with a music note before every line:

```sh
♫ And I was like baby, baby, baby, oooh
♫ Like baby, baby, baby, nooo
♫ Like baby, baby, baby, oooh
♫ I thought you'd always be mine (mine)
```

Write an `ugly_lyrics(lyrics)` method inside the `ApplicationHelper` module in
__app/helpers/application_helper.rb__. The method should:

- Break up the lyrics on newlines.
- Insert a ♫ at the start of each line (the HTML entity that will render as a
  music note is `&#9835;`).
- Properly escape the user input (avoid HTML injection attacks).
- Wrap the lyrics in a [`pre` tag][pre-tag] so that the newlines are respected
  (in a`<pre>` or _preformatted text tag_, whitespace is preserved).
- Mark the produced HTML as safe for insertion (otherwise your `<pre>` tag will
  get escaped when you insert it into the template).

## Phase IV: Validating form input

Now that you've got a site and users, they are bound to start making mistakes!

On each form view, include the logic to display any errors that your validations
return.

- In your view, check if `@___.errors.full_messages` exists.
- If so, display each of them in its own stylish div!

## Next steps

Congratulations, you've finished the basic project! If you still have time, head
over to the [bonus phases](README-bonus.md) to learn--among other things--how to send out an
account activation email using Action Mailer.

[pre-tag]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre