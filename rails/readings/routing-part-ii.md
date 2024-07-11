# Routing II: Nested Resource Routes

It's common to have resources that are "children" of other resources. For
example, suppose that your application includes these models:

```ruby
# app/models/magazine.rb
class Magazine < ApplicationRecord
  has_many :articles
end

# app/models/article.rb
class Article < ApplicationRecord
  belongs_to :magazine
end
```

Nested routes allow you to capture this relationship in your routing. In this
case, you could include this route declaration:

```ruby
# config/routes.rb
NewspapersApp::Application.routes.draw do
  resources :magazines do
    # provides a route to get all the articles for a given magazine.
    resources :articles, only: :index
  end

  # provides all seven typical routes
  resources :articles
end
```

This generates a `/magazines/:magazine_id/articles` route. Requests for this
route will be sent to the `ArticlesController#index` action.

Here's what the `ArticlesController` might look like:

```ruby
class ArticlesController
  def index
    if params.has_key?(:magazine_id)
      # index of nested resource
      @articles = Article.where(magazine_id: params[:magazine_id])
    else
      # index of top-level resource
      @articles = Article.all
    end

    render json: @articles
  end
end
```

The nested resource has a dynamic segment parameter, `:magazine_id`, that will
capture which magazine is in view.

## Restricting nested member routes

You can restrict what routes you build for a resource using the `:only` option.
The code above tells the nested resource to generate only the `index` route.

If you didn't specifically restrict the routes, Rails would generate all the
typical routes for the nested resource:

```sh
# Collection Routes:
index: GET /magazines/:magazine_id/articles
new: GET /magazines/:magazine_id/articles/new
create: POST /magazines/:magazine_id/articles

# Member routes
show: GET /magazines/:magazine_id/articles/:id
edit: GET /magazines/:magazine_id/articles/:id/edit
update: PUT /magazines/:magazine_id/articles/:id
update: PATCH /magazines/:magazine_id/articles/:id
destroy: DELETE /magazines/:magazine_id/articles/:id
```

Here's a general design principle: **there should be exactly one URL which maps
to the representation of a resource**. The URLs `/articles/101` and
`/magazines/42/articles/101` would both route to the same `Article`. One of
these is superfluous.

The `/magazines/42` bit of the `/magazines/42/articles/101` path is also
redundant. `ArticlesController#show` doesn't need the magazine id to find the
article; it can just use the article id directly. If you wish to use the
`magazine_id`, you can always look it up from the article id:

```ruby
Article.find(id).magazine_id
```

As a general rule, never generate any of the member routes when nesting; member
routes should only belong to top level resources. Note, however, that there's
nothing wrong with defining the same resource at two levels.

## Nested collection routes

You now have three remaining collection routes you might nest:

```sh
index: GET /magazines/:magazine_id/articles
new: GET /magazines/:magazine_id/articles/new
create: POST /magazines/:magazine_id/articles
```

Nested `index` routes are often helpful because they perform a distinct action.
For example, the nested article `index` above should return all the articles
**in the given magazine**. This is different from the top-level `/articles`
`index` route, which should return all the articles **in the system**. Because
it returns a subset, `/magazines/:magazine_id/articles` does **not** repeat the
top-level `index` route's behavior in the way nested member routes do.

Nesting `new` and `create` routes simply means that you can grab the outer
resource's id from the URL. For example, `/magazines/123/articles/new` should
return a form to create an `Article` for `Magazine` #123; a non-nested `new`
route would require that the returned form have a field to specify the
particular magazine in which the article appears. Similarly, a nested article
`create` route could grab the magazine's id from the URL whereas a top-level
`create` route would require that information to be submitted in the request
body. (Once you get to React, you may find that using top-level `create` routes
helps to simplify your React components.)

## Shallow nesting

The idea that you should only nest collection routes is so conventional that
Rails even provides a shorthand way to achieve this result: the `:shallow`
option. For example, the discussion above recommends structuring your magazine
and article routes like this:

```rb
resources :magazines do
  resources :articles, only: [:index, :new, :create]
end
resources :articles, only: [:show, :edit, :update, :destroy]
```

which produces the following routes:

```sh
              Prefix Verb   URI Pattern                                    Controller#Action
   magazine_articles GET    /magazines/:magazine_id/articles(.:format)     articles#index
                     POST   /magazines/:magazine_id/articles(.:format)     articles#create
new_magazine_article GET    /magazines/:magazine_id/articles/new(.:format) articles#new
           magazines GET    /magazines(.:format)                           magazines#index
                     POST   /magazines(.:format)                           magazines#create
        new_magazine GET    /magazines/new(.:format)                       magazines#new
       edit_magazine GET    /magazines/:id/edit(.:format)                  magazines#edit
            magazine GET    /magazines/:id(.:format)                       magazines#show
                     PATCH  /magazines/:id(.:format)                       magazines#update
                     PUT    /magazines/:id(.:format)                       magazines#update
                     DELETE /magazines/:id(.:format)                       magazines#destroy
        edit_article GET    /articles/:id/edit(.:format)                   articles#edit
             article GET    /articles/:id(.:format)                        articles#show
                     PATCH  /articles/:id(.:format)                        articles#update
                     PUT    /articles/:id(.:format)                        articles#update
                     DELETE /articles/:id(.:format)                        articles#destroy
```

You can produce the same routes using the `:shallow` option on the nested
resource:

```ruby
resources :magazines do
  resources :articles, shallow: true
end
```

The `:shallow` option will nest the specified resource's collection routes but
create top-level member routes:

```sh
              Prefix Verb   URI Pattern                                    Controller#Action
   magazine_articles GET    /magazines/:magazine_id/articles(.:format)     articles#index
                     POST   /magazines/:magazine_id/articles(.:format)     articles#create
new_magazine_article GET    /magazines/:magazine_id/articles/new(.:format) articles#new
        edit_article GET    /articles/:id/edit(.:format)                   articles#edit
             article GET    /articles/:id(.:format)                        articles#show
                     PATCH  /articles/:id(.:format)                        articles#update
                     PUT    /articles/:id(.:format)                        articles#update
                     DELETE /articles/:id(.:format)                        articles#destroy
           magazines GET    /magazines(.:format)                           magazines#index
                     POST   /magazines(.:format)                           magazines#create
        new_magazine GET    /magazines/new(.:format)                       magazines#new
       edit_magazine GET    /magazines/:id/edit(.:format)                  magazines#edit
            magazine GET    /magazines/:id(.:format)                       magazines#show
                     PATCH  /magazines/:id(.:format)                       magazines#update
                     PUT    /magazines/:id(.:format)                       magazines#update
                     DELETE /magazines/:id(.:format)                       magazines#destroy
```

You can read more about shallow nesting--and other ways of invoking
it--[here][shallow].

[shallow]: https://guides.rubyonrails.org/routing.html#shallow-nesting
