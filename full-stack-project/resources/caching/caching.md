# Caching

## Browser caching

### Assets

* Set `config.serve_static_assets = true` in
  `config/environments/production.rb`. This tells Rails to serve the
  assets itself.
    * In some environments you can have the web server serve the
      assets directly from the FS without Rails' intervention.
    * Heroku doesn't do this; it has Rails also serve assets. Even
      `serve_static_assets` is false, Rails gets hit for the assets.
    * That's fine; we want this anyway.
* Set `config.static_cache_control = "public, max-age=31536000"`
    * This will tell the client to store the asset for as long as a
      year, and not ask again for a refreshed version until a year is
      up.
* Asset pipeline *fingerprints* the files, so you can use very long
  cache periods without worrying if clients will get have stale ata.
* In the chrome dev tools, network requests, you can see `(from
  cache)` in the size/content column.
    * Note that CTR-R will ignore the cache to refresh the page and
      the domain's assets.
    * If you want to reload the page but use cached assets, just click
      in the URL bar and hit enter to reload.

### Pages

* We're having the browser cache assets, but what about pages?
* For your own pages, you can tell the client to cache a page with
  `expires_in`.

```ruby
class StaticPagesController < ApplicationController
  # Most of App Academy site is static
  def index
    expires_in 24.hours, :public => true
  end
end
```

This will keep the client from asking the server for the page again,
by setting a header named `cache-control` (check it out in chrome dev
tools, under network, response headers). However, because pages aren't
fingerprinted, updates to your site might not immediately be visible
to users with a cached version. And especially, this only works for
static pages; if you have dynamic content on a page, users won't
rerequest the page and see the dynamic content until the cache period
expires.

For that reason, it's reasonable to set smaller cache periods.

## Page caching

### Action caching

* Page caches help users who have been to the site before.
* But new users (or any users without a fresh cached version) will hit
  the server.
* Even if there's no DB queries to make, rendering templates can take
  time.
* But even index pages don't need to be rerendered if there's no new
  object; show pages don't need to be rerendered if the model hasn't
  changed.
* Use `caches_action`

```ruby
class SiteController < ApplicationController
  # server caches index until sweeper invalidates
  caches_action :index

  def index
    # client should cache for 24 hours
    expires_in 24.hours, :public => true
  end
end
```

This will cause the server to render the page once, and never render
it again; it will just serve the rendered HTML directly back to a
requestor without rendering the templates or executing the controller
action code.

* We can cache `show` actions. The cache saves the rendered page under
  the name of the requested path (minus query-string, which is
  ignored). So `GET /items/123` will be cached separately from
  `/items/456`, which is exactly what we want; they need to be cached
  separately because of the item-specific content.
* Long story short: we don't need to do anything special to cache show
  actions.

### Sweepers

As mentioned, we can cache `show` and `index` actions. However, as we
add new items or edit existing ones, we will need to *invalidate* the
cached versions.

```ruby
# app/controllers/products_controller.rb
class ProductsController < ActionController
  # server caches index until sweeper invalidates
  caches_action :index

  # important! cached pages won't be swept unless you call these.
  cache_sweeper :product_sweeper

  def index
    @products = Product.all
  end
end

# app/sweepers/product_sweeper.rb
class ProductSweeper < ActionController::Caching::Sweeper
  # observe lets the ProductSweeper hook into the Product lifecycle.
  observe Product

  # If our sweeper detects that a Product was created call this
  def after_create(product)
    expire_cache_for(product)
  end

  # If our sweeper detects that a Product was updated call this
  def after_update(product)
   expire_cache_for(product)
 end

  # If our sweeper detects that a Product was deleted call this
  def after_destroy(product)
    expire_cache_for(product)
  end

  private
  def expire_cache_for(product)
    # Expire the index page now that we added a new product
    expire_page(:controller => 'products', :action => 'index')

  # Expire a fragment
    expire_fragment('all_available_products')
  end
end
```

### Query caching

* Queries that are rerun within a single request-cycle are cached.
* So if you call `Users.all` twice in one action; only one query is
  fired.
* Not saved across requests, though.

## Memcached

* The default caching strategy is to store cached data in memory.
* Each Rails server has its own memory, can't share a cache.
* Also, every new instance you spin up will have a *cold cache* with
  nothing in it.
* But the major problem is that if you have 4 Rails servers on one box
  (typical if you are using a single-threaded app server), you can
  only give each 1/4 of the RAM to cache with.
* One solution: memcached
* Memcached is a *cache server*; any of the Rails servers can connect
  to it.
* It's way faster than a DB because it's basically a big hash table;
  you can't make arbitrary queries.
* Once you have memcached running (exercise left to the reader), just
  set `config.cache_store = :mem_cache_store, "cache-1.example.com",
  "cache-2.example.com"`
* As seen here, memcached supports using multiple machines for
  caching.
* You won't need this at your scale, but it's good to know a little
  about how this works.

<!-- ## TODO

**TODO**: clean this up

* controller `caches_page :action`. `expire_page :action => :index` in
  another action.
* fragment caching (`cache`)
    * declare with `action_suffix`
    * `expire_fragment`
* Explicit cache access with Rails.cache.fetch
* You can etags:
    * `stale?`
    * `render :nothing, :status => :not_modified`
* Discuss Russian doll caching?
* Cache digests in Rails 4.0

* HAProxy (pure balancing)
    * Used to distribute reqs across many servers
    * Has some sophisticated strategies
* Page caching (requires web server support?)
    * Can benefit if your server can serve content straight from FS.
    * On Heroku, Rails serves static assets
    * Don't need to hit the Rails layer, though...
    * On the other hand, Rack::Cache would probably be a better
      choice.
* Rack::Cache, Varnish (server-side HTTP caching)
    * Caches on the server-side respect HTTP cache headers.
    * Rack::Cache will hit Ruby; Varnish is another server to
      configure. -->

## References

* http://guides.rubyonrails.org/caching_with_rails.html
* https://devcenter.heroku.com/articles/caching-strategies
* http://37signals.com/svn/posts/3112-how-basecamp-next-got-to-be-so-damn-fast-without-using-much-client-side-ui
* http://railscasts.com/episodes/387-cache-digests?view=comments
* http://37signals.com/svn/posts/3113-how-key-based-cache-expiration-works
* https://github.com/rails/cache_digests
* http://www.youtube.com/watch?v=FkLVl3gpJP4#t=33m38s
* https://devcenter.heroku.com/articles/increasing-application-performance-with-http-cache-headers
* https://devcenter.heroku.com/articles/http-caching-ruby-rails
* https://devcenter.heroku.com/articles/rack-cache-memcached-rails31
* http://api.rubyonrails.org/classes/ActionController/Caching.html
* https://web.archive.org/web/20140617072441/http://robotmay.com/post/23161612605/everyone-should-be-using-low-level-caching
* https://news.ycombinator.com/item?id=4873694
* http://tutorials.jumpstartlab.com/topics/performance/caching_data.html
