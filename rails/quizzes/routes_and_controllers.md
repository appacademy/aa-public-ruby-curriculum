# Routes and Controllers

Where do the key-value pairs in the `params` hash come from? (Select all that apply.)
- [ ] Query string
- [ ] The path of the request
- [ ] Form data from a `POST`/`PATCH`/`PUT` request
    
<details><summary>Answer:</summary>

- Query string
- The path of the request
- Form data from a `POST`/`PATCH`/`PUT` request</details>
<details><summary>Explanation:</summary>

All of the above!</details>

The server returned a blank form for creating a cat. Assuming RESTful Routes, which request was made?
- [ ] HTTP Verb: `NEW` Path: `/cats/`
- [ ] HTTP Verb: `GET` Path: `/cats/new`
- [ ] HTTP Verb: `GET` Path: `/cats_controller/new`
- [ ]  HTTP Verb: `NEW` Path: `/cats_controller/`

<details><summary>Answer:</summary>

HTTP Verb: `GET` Path: `/cats/new`</details>
<details><summary>Explanation:</summary>

If you are requesting a new form, you'd be making `GET` request. Since this request would lead to a new cat being made, Rails convention dictates that the path would be `/cats/new`.</details>

Which of the following is **NOT** true about controllers?
- [ ] The controller lives for only one request response cycle.
- [ ] The controller can `render` or `redirect`, but not both.
- [ ] The `CatsController` is the only controller that can access the `Cat` model.
- [ ] The controller's name is conventionally pluralized.

<details><summary>Answer:</summary>

The `CatsController` is the only controller that can access the `Cat` model.</details>
<details><summary>Explanation:</summary>

Active Record allows us to access the `Cat` model in multiple controllers.</details>

Assuming RESTful routes, a `GET` request to `/magazines/:magazine_id/articles` would do which of the following?
- [ ] Call the `articles` action of the `MagazinesController` with `magazine_id` as a key in the `params` hash.
- [ ] Call the `index` action of the `MagazinesController` with `articles` as a key in the `params` hash.
- [ ] Call the `index` action of the `ArticlesController` with `magazine_id` as a key in the `params` hash.
- [ ] Call the `articles` action of the `MagazinesController` with `id` as a key in the `params` hash.

<details><summary>Answer:</summary>

Call the `index` action of the `ArticlesController` with `magazine_id` as a key in the `params` hash.</details>
<details><summary>Explanation:</summary>

Since the last piece of the URL is plural and this is a `GET` request, you can assume you are hitting the `index` action on the matching controller (in this case, `articles`). Then looking at the rest of the URL, you can see the `:magazine_id`, meaning that you are passing a `magazine_id` as a key in the `params` hash as part of this request.</details>

Which of the following lines, if added to __config/routes.rb__, would cause the root url (i.e., "/") to run the `BicyclesController`'s `index` method when visited?
- [ ] `root "bicycles#index"`
- [ ] `resources :bicycles, root: index`
- [ ] `root :bicycles#index`
- [ ] `resources root to: #index`

<details><summary>Answer:</summary>

`root "bicycles#index"`</details>
<details><summary>Explanation:</summary>

Proper Rails syntax is essential! Always feel free to visit the Rails documentation if you are ever unsure of the syntax to implement something.</details>
