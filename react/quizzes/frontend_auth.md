# Frontend Auth Quiz

On the frontend, how would we prevent a user who isn't logged in from viewing the index page?
- [ ] Redirect them in the controller if they're not the `current_user`
- [ ] Make an AJAX request to fetch the whole site only after they log in
- [ ] Have the login page sit on top of every other component, and make it invisible with CSS once they log in
- [ ] Render a functional component that will conditionally render the `Index` component or a `Redirect` component depending on whether the user is logged in

<details><summary>Answer:</summary>

Render a functional component that will conditionally render the `Index` component or a `Redirect` component depending on whether the user is logged in</details>
<details><summary>Explanation:</summary>

To create this behavior using React, we can create a functional component that will render either the `Index` component or a `Redirect` component based on our Redux `session` slice of state having a `currentUser` or not.</details>

How can we set up a `preloadedState` to know who our `current_user` is?
- [ ] Set `current_user` on the `window`
- [ ] Use `localStorage` to store `current_user`
- [ ] Store the `current_user` as a data attribute in the `head` of the root route
- [ ] Make an AJAX request to `fetchCurrentUser` upon entering the root route

<details><summary>Answer:</summary>

- Set `current_user` on the `window`
- Use `localStorage` to store `current_user`
- Store the `current_user` as a data attribute in the `head` of the root route
- Make an AJAX request to `fetchCurrentUser` upon entering the root route</details>
<details><summary>Explanation:</summary>

We can do all of the above to know who our `current_user` is!</details>

We must remember to manually include the form authentication token when sending form data with an AJAX request in a Rails app.
- [ ] True
- [ ] False

<details><summary>Answer:</summary>

False</details>
<details><summary>Explanation:</summary>

The form authenticity token that is included in the AJAX request is handled by the `jquery_ujs` library. `jquery_ujs` adds the CSRF token (auth token) to a header on outgoing AJAX requests.</details>

```ruby
#routes.rb

namespace :api, defaults: {format: :json} do
  resources :cats, only: [:index, :show, :create]
end
```

```ruby
#controllers/api/cats_controller.rb

def show
  @cat = Cat.find(params[:id])
end
```

Consider the above code. Which view will be rendered when the `show` route is hit?
- [ ] `views/api/cats/show.html.erb`
- [ ] `views/cats/show.html.erb`
- [ ] `views/api/cats/show.json.jbuilder`
- [ ] `views/cats/show.json.jbuilder`

<details><summary>Answer:</summary>

`views/api/cats/show.json.jbuilder`</details>
<details><summary>Explanation:</summary>

Our `cats` resource is namespaced under `api` so rails will look for a view in the `/api/cats` folder.  Because we didn't specify a view to render, rails will default to looking for a view with the same name as the controller action which is `show`. We are no longer using `html.erb` files now that we are using React! We use `json.jbuilder` to send javascript objects to our frontend so that React can use that info to render the data to the user.</details>
