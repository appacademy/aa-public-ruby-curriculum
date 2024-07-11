# Lowest hanging fruit

+ Use Ruby version 2+.
+ Use `thin` as your webserver.

```rb
# Gemfile
gem 'thin'
```

```
# Procfile
web:bundle exec thin start -p $PORT
```

+ Use `lol_dba` to find and add missing indexes.

```rb
# Gemfile
gem 'lol_dba', group: :development
```

```sh
$ lol_dba db:find_indexes
```

+ Use `bullet` to track down N+1 queries.

```rb
# Gemfile
gem 'bullet', group: :development
```

+ Use Rack Deflater to gzip components.

```rb
# config.ru
use Rack::Deflater
```


This is a collection of useful gems / libraries / guides and resources that may be of use to you in your full-stack project.
## Rails
  * __Devise__
    * Devise is a gem for setting up all of your authentication. It adds everything for login and registration as well as many other extra features.
    * http://devise.plataformatec.com.br/
    * http://railscasts.com/episodes/209-devise-revised?view=asciicast
  * __Kaminari__
    * Kaminari is a gem for implementing pagination. ( splitting up your content into many pages )
    * https://github.com/amatsuda/kaminari
  * __Omniauth__
    * Ominiauth is a gem for easily setting up 3rd party authentication.
    * https://github.com/intridea/omniauth
    * http://railscasts.com/episodes/235-devise-and-omniauth-revised?view=asciicast
  * __Delayed Job__
    * Delayed Job allows you to run processes in the background.
    * https://github.com/collectiveidea/delayed_job
    * http://railscasts.com/episodes/171-delayed-job-revised?view=asciicast
  * __Sunspot ( Search )__
    * Sunspot is a gem for integrating WebSolr into Ruby applications. Essentially it implements Search.
    * https://github.com/sunspot/sunspot#readme
    * https://github.com/sunspot/sunspot/wiki/Adding-Sunspot-search-to-Rails-in-5-minutes-or-less
    * Alert! It will cost ~$20/month to run a Solr server on Heroku.
  * __Rails - ERD diagrams__
    * ERD diagrams map out your database schema and associations in a nice visual diagram format.
    * [http://rails-erd.rubyforge.org/](https://web.archive.org/web/20140401071013/http://rails-erd.rubyforge.org/)
  * __Bullet ( N+1 Query fixer )__
    * Bullet will alert you of N+1 queries on your pages as you navigate your site and give you advice on how to fix them. ( Use this in dev mode only )
    * http://railscasts.com/episodes/372-bullet?view=asciicast
  * __Autocomplete__
    * This is a rails cast which shows how to implement Autocomplete with jQuery and Redis.
    * http://railscasts.com/episodes/399-autocomplete-search-terms?view=asciicast
  * __Slugs / to_param__
    * Aaron TODO: Write a short guide on how to do this.
  * __Polymorphism__
    * Polymorphic associations are an advanced Rails technique that allows you to have one model belong to many other models in a clean way.
    *   http://railscasts.com/episodes/394-sti-and-polymorphic-associations
    *   http://railscasts.com/episodes/154-polymorphic-association-revised
  * __Guest User__
    * Having guest users will allow people to use your site without having to actually sign up.
    * http://railscasts.com/episodes/393-guest-user-record
  * __Configuration Security__
    * Its important to keep your config files safe as they can often contain passwords and API keys.
    * http://railscasts.com/episodes/85-yaml-configuration-revised
  * __Uploading to S3__
    * Utilize Amazon's S3 servers to host and serve your non app files.
    * http://railscasts.com/episodes/383-uploading-to-amazon-s3
  * __PaperClip__
    * Paperclip allows to implement file uploads in your form and store those files on your server / in your DB.
  * __Sending Email__
    * http://railscasts.com/episodes/61-sending-email-revised
  * __Asset Pipeline in production__
    * Production mode is quite different and assets are served differently. Best to learn how it all works.
    * http://railscasts.com/episodes/341-asset-pipeline-in-production?view=asciicast
  * __Rails Casts__
    * In case you haven't realized, most of these are from Rails Casts. Anything else you need, this might be a good place to look first.
    * http://railscasts.com/
  * __Seed Files__
    * Seed Dump (https://github.com/rroblak/seed_dump) will serialize the contents of your database, letting you create and save seed data through your website's usual UI rather than manually editing the seed file.


## JavaScript / jQuery
  * __Isotope__
    * Implement grid like system for your content.
    * http://isotope.metafizzy.co/
  * __Infinite Scroll__
    * Load more content as you hit the bottom of the page.
    * https://github.com/paulirish/infinite-scroll
  * __Filepicker__
    * Easily upload files to Amazon from your computer / FB/ Instagram etc etc.
    * https://www.inkfilepicker.com/
  * __D3.js__
    * Interactive charts and graphs.
    * http://d3js.org/
  * __jQuery UI__
    * Library of flashy widgets. Has great things such as draggable, droppable, sortable, etc.
    * http://jqueryui.com/
  * __Gritter__
    * Growl like notifications. These look great, everyone should have this.
    * https://github.com/jboesch/Gritter
  * __Chosen__
    * Turn dropdowns and other form elements into much nicer, easier to use versions.
    * http://harvesthq.github.io/chosen/

## Frontend - Design
  * __Bootstrap__
    * http://twitter.github.io/bootstrap/
  * __Foundation__
    * http://foundation.zurb.com/
  * __Flat UI__
    * http://designmodo.github.io/Flat-UI/
  * __Animate.css__
    * http://daneden.github.io/animate.css/

## External / 3rd Party
  * __Facebook Graph /  Open Graph:__
    * http://railscasts.com/episodes/363-facebook-open-graph?view=asciicast
    * http://railscasts.com/episodes/361-facebook-graph-api
  * __Twitter__
    * http://railscasts.com/episodes/359-twitter-integration

## Servers
  * __Heroku__
    * Heroku is a hosting service that offers a free tier. It makes deployment super easy and abstracts a way a lot of Sys Admin related tasks.
    * https://devcenter.heroku.com/articles/rails3
  * __DigitalOcean__
    * Very hip VPS provider. Starts at $5 per month. Great if you want to deploy on your own server.
    * https://www.digitalocean.com
  * __Amazon AWS__
    * Provides a bunch of web services, including compute, storage, and VPS. Has a free tier that's free for the first year. The free VPS server is significantly slower than DigitalOcean or Linode though.
    * http://aws.amazon.com
  * __Linode__
    * VPS provider. Used to be pretty hip before it got hacked. Good alternative to DigitalOcean. Starts at $20 per month. Has an excellent library of guides.
    * https://www.linode.com
    * https://library.linode.com
  * __Nginx__
    * Nginx (pronounced engine-x) is a free, open-source, high-performance HTTP server and reverse proxy, as well as an IMAP/POP3 proxy server. Even if you don't use this, at least know how to pronounce it.
    * http://nginx.org
  * __Unicorn__
    * Rack HTTP server for fast clients and Unix. Much faster than WebBrick. Great for production servers.
    * http://unicorn.bogomips.org
  * __PostgreSQL__
    * Popular SQL DB for production servers. "The world's most advanced open source database"
    * http://www.postgresql.org
  * __Redis__
    * Fast in memory key-value pair store. Great for non-persisted data, such as sessions.
    * http://redis.io
  * __SSH__ - How to connect / navigate
    * If you have a VPS, you need to connect to it using SSH. You can figure this out.
