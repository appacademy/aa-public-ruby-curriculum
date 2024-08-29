# 99cats (Phase II)

**[Live Demo!][live-demo]**

[live-demo]: https://aa-99-cats.herokuapp.com/

## Phase II: `CatRentalRequest`

In this phase, you will create a `CatRentalRequest` model with appropriate
validations, build a form to create such a request, and integrate that form into
the rest of your site.

### `CatRentalRequest` model

Make a `CatRentalRequest` migration and model. Attributes should include:

* `cat_id` (bigint)
  * Use the `references` type in your migration to set this up.
* `start_date` (date)
* `end_date` (date)
* `status` (string)
  * Should start out as `'PENDING'` but can be switched to `'APPROVED'` or
    `'DENIED'`.

In the migration,

* Add NOT NULL constraints to everything except `timestamps`.
* Make `'PENDING'` the default value for `status`.
* Make sure that your migration adds an index and `foreign_key` constraint on
  `cat_id`.

In the model,

* Add an inclusion validation on `status`.
* Add presence validations where appropriate.
* Add associations between `CatRentalRequest` and `Cat`.
* Make sure that when a `Cat` is deleted, all of its rental requests are also
  deleted. (The foreign key constraint you set above requires this.) Use
  `dependent: :destroy`.

### Custom validations

`CatRentalRequest`s should not be valid if they overlap with an approved
`CatRentalRequest` for the same cat. A single cat can't be rented out to two
people at once! You will write a custom validation for this.

First, write a method `#overlapping_requests` to get all the `CatRentalRequest`s
that overlap with the one you are trying to validate:

* Be sure to use Active Record to do this. It may be tempting just to get
  `CatRentalRequests.all` and then do all the filtering in Ruby, but this
  would be wasteful. You don't want to create objects you don't need. Your
  database is really good at solving this kind of problem, so use it!
* The method should return an `ActiveRecord::Relation` so you can chain more
  methods onto it later.
* The `CatRentalRequest` you are trying to validate should not appear in the
  list of `#overlapping_requests`.
* The method should return the requests for the current cat.
* The method should work for both saved and unsaved `CatRentalRequests`.
* Consider the following cases:
  * A cat rental request starting on 02/25/22 and ending on 02/27/22.
  * There is a overlap if another cat rental also starts on the same day
    (02/25/22).
  * There is a overlap if another cat rental request starts on the return day
    (02/27/22).
  * There is a overlap if another cat rental request starts between the start
    and end dates (02/26/22).
* Hint: Consider the case(s) where requests would **NOT** overlap and then code
  the negation.
* Beware of SQL ternary logic (values: true, false, unknown).

Next, write a method `#overlapping_approved_requests` that returns all the
overlapping requests with `'APPROVED'` status. You should be able to use your
`#overlapping_requests` method.

Now you can write your [custom validation],
`#does_not_overlap_approved_request`. All you need to do is call
`#overlapping_approved_requests` and check whether any [`#exists?`][exists].

[custom validation]: https://guides.rubyonrails.org/active_record_validations.html#custom-methods
[exists]: https://api.rubyonrails.org/v7.0.2/classes/ActiveRecord/FinderMethods.html#method-i-exists-3F

### Routes, controller, & `new` view

* Create `new` and `create` routes for your rental requests in your routes file.
  Nest an additional `new` route under `cats` to create a
  `/cats/:cat_id/cat_rental_requests/new` route. You will use this route to
  initiate rental requests for a specific cat (i.e., from a cat's `show` page).
* Create a controller and build out those two actions. (Remember to use strong
  params for mass assignment!)
* Add a `new` request form to submit rental requests.
  * Use a dropdown to select the `Cat` desired. Your rental request form should
    upload a `Cat` `id`.
  * Use the `date` input type for selecting the request's start and end dates.
  * Use the [`required`] attribute to ensure that all three fields are filled in
    before submitting.
* Edit the `Cat` `show` page to show existing requests
  * If there are no rental requests, just report that the cat--personalize this
    by using the cat's `name`--has no requests.
  * Otherwise, create a table to show the `start_date`, `end_date`, and `status`
    of each request.
  * Use `order` to sort them by `start_date`.
* Add a link to the `Cat` `show` page to initiate a rental request for that cat.
  (Use your nested route!)
* Add a link to the `Cat` `index` page to initiate a generic rental request.

Test your work in the browser as you go.

[`required`]: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/required

When you finish, head on to [Phase III](README-ph3.md) (approving/denying requests)!