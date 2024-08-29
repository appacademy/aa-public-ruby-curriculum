# Routes and Controllers

<quiz>
  <question multiple>
  <p>Where do the key-value pairs in the `params` hash come from? (Select all that apply.)</p>
    <answer correct>Query string</answer>
    <answer correct>The path of the request</answer>
    <answer correct>Form data from a `POST`/`PATCH`/`PUT` request</answer>
    <explanation>All of the above!</explanation>
  </question>
</quiz>

<quiz>
  <question>
  <p>The server returned a blank form for creating a cat. Assuming RESTful Routes, which request was made?</p>
    <answer>HTTP Verb: `NEW` Path: `/cats/`</answer>
    <answer correct> HTTP Verb: `GET` Path: `/cats/new`</answer>
    <answer>HTTP Verb: `GET` Path: `/cats_controller/new`</answer>
    <answer> HTTP Verb: `NEW` Path: `/cats_controller/`</answer>
    <explanation>If you are requesting a new form, you'd be making `GET` request. Since this request would lead to a new cat being made, Rails convention dictates that the path would be `/cats/new`.</explanation>
  </question>
</quiz>

<quiz>
  <question>
  <p>Which of the following is **NOT** true about controllers?</p>
    <answer>The controller lives for only one request response cycle.</answer>
    <answer>The controller can `render` or `redirect`, but not both.</answer>
    <answer correct>The `CatsController` is the only controller that can access the `Cat` model.</answer>
    <answer>The controller's name is conventionally pluralized.</answer>
    <explanation>Active Record allows us to access the `Cat` model in multiple controllers.</explanation>
  </question>
</quiz>

<quiz>
  <question>
  <p>Assuming RESTful routes, a `GET` request to `/magazines/:magazine_id/articles` would do which of the following?</p>
    <answer>Call the `articles` action of the `MagazinesController` with `magazine_id` as a key in the `params` hash.</answer>
    <answer>Call the `index` action of the `MagazinesController` with `articles` as a key in the `params` hash.</answer>
    <answer correct>Call the `index` action of the `ArticlesController` with `magazine_id` as a key in the `params` hash.</answer>
    <answer>Call the `articles` action of the `MagazinesController` with `id` as a key in the `params` hash.</answer>
    <explanation>Since the last piece of the URL is plural and this is a `GET` request, you can assume you are hitting the `index` action on the matching controller (in this case, `articles`). Then looking at the rest of the URL, you can see the `:magazine_id`, meaning that you are passing a `magazine_id` as a key in the `params` hash as part of this request.</explanation>
  </question>
</quiz>

<quiz>
  <question>
  <p>Which of the following lines, if added to __config/routes.rb__, would cause the root url (i.e., "/") to run the `BicyclesController`'s `index` method when visited?</p>
    <answer correct>`root "bicycles#index"`</answer>
    <answer>`resources :bicycles, root: index`</answer>
    <answer>`root :bicycles#index`</answer>
    <answer>`resources root to: #index`</answer>
    <explanation>Proper Rails syntax is essential! Always feel free to visit the Rails documentation if you are ever unsure of the syntax to implement something.</explanation>
  </question>
</quiz>
