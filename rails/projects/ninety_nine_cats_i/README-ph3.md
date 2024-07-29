# 99cats (Phases III, Bonus)

**[Live Demo!][live-demo]**

[live-demo]: https://aa-99-cats.herokuapp.com/

## Phase III: Approving/Denying requests

In today's final phase, you will enable users to approve or deny any `Cat`'s
`CatRentalRequest`.

### Write `approve!` and `deny!` methods

Currently, all `CatRentalRequest` statuses are set to `'PENDING'`. When
approving a `CatRentalRequest` (changing the cat rental request's status to
`'APPROVED'`), all other conflicting `CatRentalRequest` statuses will be denied
(changing the cat rental request's status to `'DENIED'`).

* Add a helper method `#overlapping_pending_requests` that returns all the
  overlapping requests with status `'PENDING'`. You should be able to use your
  `#overlapping_requests` method.
* Add a method `#approve!` to the rental request model. When calling the
  `#approve!` on an instance of `CatRentalRequest`:
  * Change the current instance's status from `'PENDING'` to `'APPROVED'`.
  * Save the instance into the database.
  * Deny all conflicting rental requests by calling
    `'overlapping_pending_requests'` and changing the statuses of the returned
    requests to `'DENIED'`.
* All the work of `#approve!` should occur in a single
  **[transaction][transaction-api]**.
  * Usually when you want to make several related updates to the DB, you will
    want to group them in a transaction.
* Write a `#deny!` method; this one is easier!

[transaction-api]:
  https://api.rubyonrails.org/v7.0.2/classes/ActiveRecord/Transactions/ClassMethods.html

### Add Buttons

* On the `Cat` show page, make a button to approve or deny a cat request.
* You may add two member routes to `cat_rental_requests`: `approve` and `deny`.
* Only show these buttons if a request is pending.
* You may want to add a convenient `CatRentalRequest#pending?` method.

## Bonus

Style your website to look similar to the live demo. You can add your CSS to the
__app/stylesheets/application.css__ file. A few hints to get you started:

* The cat images are all sourced from [https://placekitten.com/]. The `index`
  page uses number [231], the `show` page, number [300]. Feel free to use
  these particular images or pick others that you prefer!
* The `+`s next to `Add Cat` and `Request a Rental` on the `index` page are
  [Font Awesome] icons. If you don't want to explore Font Awesome at the moment,
  you can just style a typed `+`.
* The live demo uses the Google Font [`Amatic SC`]. You can include this font
  in your project by adding the following line inside the `<head>` of your
  document in __app/views/layouts/application.html.erb__:

  ```html
  <link href="https://fonts.googleapis.com/css?family=Amatic+SC:400,700" rel="stylesheet">
  ```

* Don't forget to add a `description` field to the `Cat` `show` page table if
  you haven't already.

Have fun styling!

[https://placekitten.com/]: https://placekitten.com/
[231]: https://placekitten.com/g/231/231
[300]: https://placekitten.com/g/300/300
[Font Awesome]: https://fontawesome.com/
[`Amatic SC`]: https://fonts.google.com/specimen/Amatic+SC

## What you've learned

Congratulations! In this project, you learned how to build a model with
validations and default values, and how to add methods and custom validations to
it. You also practiced building `new` and `edit` forms using different types of
HTML input elements, partials to keep your code DRY, and hidden fields to set a
form's method. Finally, if you made it through the bonus, then you also
exercised your CSS styling skills. Well done!