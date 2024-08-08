# Frontend Auth Quiz

<quiz>
  <question>
    <p>On the frontend, how would we prevent a user who isn't logged in from viewing the index page?</p>
    <answer>Redirect them in the controller if they're not the `current_user`</answer>
    <answer>Make an AJAX request to fetch the whole site only after they log in</answer>
    <answer>Have the login page sit on top of every other component, and make it invisible with CSS once they log in</answer>
    <answer correct>Render a functional component that will conditionally render the `Index` component or a `Redirect` component depending on whether the user is logged in</answer>
    <explanation>To create this behavior using React, we can create a functional component that will render either the `Index` component or a `Redirect` component based on our Redux `session` slice of state having a `currentUser` or not.</explanation>
  </question>
</quiz>

<quiz>
  <question multiple>
    <p>How can we set up a `preloadedState` to know who our `current_user` is?</p>
    <answer correct>Set `current_user` on the `window`</answer>
    <answer correct>Use `localStorage` to store `current_user`</answer>
    <answer correct>Store the `current_user` as a data attribute in the `head` of the root route</answer>
    <answer correct>Make an AJAX request to `fetchCurrentUser` upon entering the root route</answer>
    <explanation>We can do all of the above to know who our `current_user` is!</explanation>
  </question>
</quiz>

<quiz>
  <question>
    <p>We must remember to manually include the form authentication token when sending form data with an AJAX request in a Rails app.</p>
    <answer>True</answer>
    <answer correct>False</answer>
    <explanation>The form authenticity token that is included in the AJAX request is handled by the `jquery_ujs` library. `jquery_ujs` adds the CSRF token (auth token) to a header on outgoing AJAX requests.</explanation>
  </question>
</quiz>

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

<quiz>
  <question>
    <p>Consider the above code. Which view will be rendered when the `show` route is hit?</p>
    <answer>`views/api/cats/show.html.erb`</answer>
    <answer>`views/cats/show.html.erb`</answer>
    <answer correct>`views/api/cats/show.json.jbuilder`</answer>
    <answer>`views/cats/show.json.jbuilder`</answer>
    <explanation>Our `cats` resource is namespaced under `api` so rails will look for a view in the `/api/cats` folder.  Because we didn't specify a view to render, rails will default to looking for a view with the same name as the controller action which is `show`. We are no longer using `html.erb` files now that we are using React! We use `json.jbuilder` to send javascript objects to our frontend so that React can use that info to render the data to the user.</explanation>
  </question>
</quiz>
