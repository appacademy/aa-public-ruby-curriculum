# Project Setup

Setting up your project correctly the first time will make your entire project
run better. Important considerations include:

## Rails New

There are plenty of optional arguments you can pass when running `rails new`;
some of them will make your life considerably easier. Additionally, any options
specified in the `~/.railsrc` file will be passed by default when `rails
new` is run. I've included a snippet of my `.railsrc` below; for a complete list
of options, run `rails new --help`.

```rb
# ~/.railsrc

--database=postgresql # use Postgres
--skip-test-unit      # skip unit tests; use RSpec
--skip-turbolinks     # skip Turbolinks; it interferes with front-end frameworks
```

## Initial Configuration

The most important command you will run is the first `git init` from inside
your project directory.  You'll also want to do a few things:

1. If you didn't already do this in `rails new`, remove turbolinks from
   your application; it will interfere with Backbone navigation. There are three
   places you must remove references to Turbolinks:
    1. In the Gemfile
    2. In `application.js`
    3. In the javascript and stylesheet `include_tag`s in `application.html.erb`

2. Setup your .gitignore: the `/tmp` and `/log` directories don't need to be
   checked in; they will bloat your commits if you fail to ignore them. Any
   production secrets (such as AWS keys) MUST be kept out of git (note that
   `secrets.yml` does not, by default, contain any dangerous secrets).
   [Here][rails-gitignore] is the `.gitignore` file recommended for Rails by
   GitHub.

   [rails-gitignore]: https://github.com/github/gitignore/blob/master/Rails.gitignore

3. Setup your development database. Use Postgres in development; this will
   guarantee that you don't face compatibility problems when pushing to 
   production.

## Gemfile

The `backbone-on-rails` and `bootstrap-sass` gems are the simplest way to
include Backbone and Bootstrap in your project. If you plan on using jQuery UI,
`jquery-ui-rails` will put it in the asset pipeline; I recommend requiring the
whole thing for development. Once your app is stable in production, you can
download and minify a customized version.
