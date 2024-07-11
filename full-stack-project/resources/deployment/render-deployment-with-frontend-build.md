# Deploying Your App To Render.com With Frontend Build

How can you deploy your project if it requires a frontend API key (for Google
Maps, for example) that you do not want to store on GitHub? If you build your
frontend before pushing to GitHub, your API key will already be included in the
build files and, therefore, subject to scraping on GitHub. A better solution is
to set your API key to be an environment variable on [Render.com] and then have
Render build your frontend as well as your backend.

**NOTE:** Your app will ultimately expose any API key that it uses on the
frontend, so you should still set restrictions on its use at the generating site
(or call the API from a secure backend instead of your frontend). Still, the
deployment process described below will at least keep the key off of GitHub.

This guide assumes that the project's root directory consists of your Rails
backend plus a __frontend__ folder that houses your React frontend. If you need
to configure multiple apps to use the same PostgreSQL database, see the "Hosting
Multiple Apps on Render" reading in the left-hand sidebar in addition to the
instructions below.

Before you start, make sure your project commits are attached to **your** GitHub
account. Prospective employers want to know you can use Git, and setting your
username and email is one of its most basic functionalities. Also, you want
those green squares, right? Check through your commit history (use `git log`)
and verify that the authorship is correct. If anything is amiss, review [this
reading][git-fix-authorship] to learn how to make the appropriate changes.

Also, if you do not yet have a Render account, sign up for one
[here][render-signup].

[Render.com]: https://render.com/
[git-fix-authorship]: fixing-git-commit-authorship
[render-signup]: https://dashboard.render.com/register

## Free-tier limitations on Render

Before starting, it will be helpful to acknowledge certain limitations of
Render's free tier. In particular, you should be aware of the following three
issues:

1. **Render limits each account to 750 total free runtime hours each month.**  
   Web service runtime hours consist of any time that your app is active and
   waiting for user interaction. To help preserve your allotted time, Render
   will automatically spin down your app after 15 minutes of inactivity,
   essentially putting it to sleep. It will then reactivate the app whenever a
   request comes in, but the reactivation process can take over a minute. For
   tips on how to keep your site active during peak hours while still remaining
   within the allotted hours, see the [Keeping Your Site Active][active-site]
   reading.

2. **Free PostgreSQL databases are good for only 90 days.**  
   Render's free databases expire after 90 days--meaning that your app can no
   longer use them--and are deleted two weeks later. You will accordingly need
   to create a new database for your app every 90 days. For help migrating your
   apps to a new database, see the [Resetting Your Render PostgreSQL
   Database][reset-db] reading.

3. **You can have only one free active PostgreSQL database at a time.**  
   This is not a problem if you are hosting only one app that uses a PostgreSQL
   database, the situation of most Campus Hybrid graduates. If you want to host
   multiple Postgres-based apps, however, then you will need to have them share
   the same database. To configure your apps for database sharing, see the
   [Hosting Multiple Apps Using One Database][multiple-dbs] reading.

[active-site]: keeping-your-site-active
[reset-db]: resetting-your-render-postgresql-database
[multiple-dbs]: hosting-multiple-apps-using-one-database

## Preparing your local codebase

This section describes how to prepare your local codebase for deployment.

### Rails preparation

**NOTE:** These backend instructions are similar to the deployment process you
have already learned. The difference is that you need to **gitignore** the
__public__ folder (step 5 below) instead of pushing it to GitHub.

1. If you need Faker to seed your production database, move the `faker` gem to
   the top level of your Gemfile so it will also be available in production.  

2. Configure Rails to serve up the files in its public folder. Create a new
   __static_pages_controller.rb__ file inside your __app/controllers__ folder.
   Inside, define the following action:

   ```rb
   # app/controllers/static_pages_controller.rb

   class StaticPagesController < ActionController::Base
     def frontend_index
       render file: Rails.root.join('public', 'index.html')
     end
   end
   ```

3. In __config/routes.rb__, add the following catch-all route **after all of
   your other routes**:

   ```rb
   #config/routes.rb

   get '*path', to: "static_pages#frontend_index"
   ```

4. If your app uses Active Storage, Action Cable, or any other Rails engine, add
   the following line to __config/application.rb__ to enable routes for those
   engines to escape your catch-all:

   ```rb
   config.railties_order = [:all, :main_app]
   ```

5. Add `/public` to your root-level __.gitignore__. If you have already
   committed __public__ files to version control, remove them by running

   ```sh
   git rm -r --cached public
   ```

   Stage and commit the changes.

6. Run `bundle lock --add-platform x86_64-linux`.  
   You will need to run this command every time you generate a new
   __Gemfile.lock__.

7. In __config/database.yml__, change the `production` key at the bottom of the
   file to read as follows (remember that spacing and indentation matter in a
   __.yml__ file!):

   ```yaml
   production:
     <<: *default
     url: <%= ENV['DATABASE_URL'] %>
   ```

   **Note:** This step is not strictly necessary since Rails will automatically
   prefer the configuration in a `DATABASE_URL` environment variable to the
   configuration specified in __config/database.yml__.

### React preparation

8. Specify the __public__ folder of your Rails application as the output
   directory for your React app's `build` command in
   __frontend/vite.config.js__:

   ```js
   // frontend/vite.config.js

   export default defineConfig(({ mode }) => ({
     plugins:[
       // plugin config
     ]
     server: {
       // server config
     },
     build: {
       outDir: '../public',
       emptyOutDir: true
     }
   }));
   ```

9. In the root directory, run `npm init --yes` to create a root-level
   __package.json__.

10. Clean up this root __package.json__ (i.e., fix names, remove the "main"
    key/value pair), then add an `"engines"` key specifying the Node major
    version to use. (To find your Node version, run `node -v` in the terminal.)

    ```json
    // package.json

    {
      // ...
      "engines": {
        "node": "18.x"
      },
      // ...
    }
    ```

11. Still in this __package.json__, under the `"scripts"` key, replace `"test"`
    with the following `"build"` script to install and build your frontend:

    ```json
    // package.json

    {
      // ...
      "scripts": {
        "build": "npm install --prefix frontend && npm run build --prefix frontend"
      },
      // ...
    }
    ```

    **Note:** If you look at your __frontend/package.json__, you will note that
    the `build` script runs `vite build`, yet `vite` is a `devDependency`, i.e.,
    a dependency that is not available in production. How can Render build your
    production app using a `devDependency`? This approach works only because, by
    default, Render builds in development mode and does not switch to a
    production environment until it actually runs your app. Be warned, however,
    that other hosting sites may not distinguish the build and run phases in
    that way.

### General preparation

12. Remove byebug, debuggers, and console output.  
    Use the magnifying glass in VSCode's left-hand menu (or `cmd+shift+F`) to
   search your project and make sure that you have removed all `byebug`s,
   `debugger`s, extraneous `print`/`puts`/`p`s, and unnecessary `console.log`s.

13. In the root directory, run `bundle install && npm install && npm run build`.
    Run `rails s`. Open [localhost:5000] (or whatever port your backend server
    uses in development) to make sure that Rails is now serving up your frontend
    files.

14. Create a __render-build.sh__ file in the __bin__ directory and copy in the
    following content (including the comments at the top!):

    ```sh
    #!/usr/bin/env bash

    # exit on error
    set -o errexit

    npm run build
    bundle install
    rails db:migrate
    rails db:seed #if needed
    ```

    This is the build script that you will have Render run whenever it needs
    to build your app. The commands should all look familiar.

15. Stage and commit all changes to `main`. Remember: You should only push
    working repos to Render.

## Deploying to Render.com

Your app is now ready to deploy to Render.com!

First, go to your [Render Dashboard] and make sure that you do not already
have an active PostgreSQL database on Render. (Render's free tier does not allow
more than one hosted database to be active.) If you need to suspend an active
PostgreSQL database, simply click on the database in your Dashboard, scroll to
the bottom of the resulting page, and select `Suspend Database`.

As for deployment, Render offers two distinct paths:

* Add a __render.yaml__ file to your root directory specifying your desired
  configuration. Render will use this file to create a _Blueprint_ for your
  application.
* Use Render's website GUI to configure the various components manually.

Instructions for each option appear below. Choose **ONE** of them and implement
it to deploy your app!

### Option 1: Add a __render.yaml__ file

16. **In the root directory,** create a __render.yaml__ file with the following
    content (**note:** indentation and spacing matter in a __yaml__ file!):

    ```yaml
    databases:
      - name: mysite
        user: mysite
        plan: free
        region: ohio

    services:
      - type: web
        name: mysite
        plan: free
        region: ohio
        branch: main
        env: ruby
        buildCommand: "./bin/render-build.sh"
        startCommand: "rails s"
        envVars:
          - key: DATABASE_URL
            fromDatabase:
              name: mysite
              property: connectionString
          - key: RAILS_MASTER_KEY
            sync: false
    ```

    > If you don't need a PostgreSQL database, eliminate the `databases` section
    > and the `DATABASE_URL` key (along with the three associated lines below
    > it) from `envVars` under your web service.

    This __yaml__ file tells Render that you want to set up a web service to
    host/run your app and a PostgreSQL database to store information. A few
    notes:

    * Replace all of the `mysite` values with the name of your app.
    * The example above sets the `region` to `ohio`. If you are on the West
      Coast, use `oregon` instead. Whichever region you choose, note that your
      database and web service need to specify the same region! (`oregon` is
      Render's default.)
    * The configuration above sets the `RAILS_MASTER_KEY` to `sync: false`. This
      tells Render that the actual value is not stored in the file, so Render
      will provide a space for you to input the value on the Render page where
      you initially install your Blueprint.
    * Add any additional environment variable names and values from your backend
      or frontend __.env__ as additional `key`s. (For React frontends, these
      will likely start with `REACT_APP`.) Use `sync: false` for any environment
      variable that you do not want to store on GitHub. For environment
      variables that do not need to be kept secret, you can specify the value
      directly using `value: XXXX`--where `XXXX` is the actual value you want to
      assign--instead of `sync: false`. To have Render generate a random value,
      use `generateValue: true`. For other possibilities, see
      [here][render-env]. Make sure to match the indentation and spacing shown
      above!

17. Stage and commit all changes to `main`.

18. Go to your [Render Dashboard] and select `Blueprints` in the top nav
    bar. Click to create a `New Blueprint Instance`.

19. If you have not already connected your GitHub account, click `Connect
    account` and follow the steps to connect it.

20. Once you have connected your GitHub account, you should see a list of your
    available repos. Select the repo with your app (i.e., the one with the
    __render.yaml__ file).

21. Enter a `Service Group Name`--the name of your app should be fine--and any
    environment variable values for which you had specified `sync:false` in your
    __yaml__ file. (**Note:** Copy the string inside __config/master.key__ for
    the value of `RAILS_MASTER_KEY`.) Click `Apply`. Render will then start
    creating your database and web service.

22. If you want to watch your app build, go back to the Dashboard and click the
    line for your app's `Web Service`. You should see a page logging `First
    deploy started for ...`. Click on `deploy` to follow the console output as
    your build progresses. If all goes well, you should eventually see `Build
    successful` followed by `Deploying...`.

You can now skip to the `Visit your site!` section below.

### Option 2: Use Render's website GUI

**Note:** If you followed Option 1 above, you do not need to implement the
following steps.

In this option, you will need to set up your PostgreSQL database and your web
service separately. (If you do not need the database--e.g., if you are using
MongoDB--you can skip straight to the web service section.)

#### Set up a PostgreSQL database

16. Go to your [Render Dashboard] and click the `New +` button on the top
    right. In the resulting dropdown menu, select `PostgreSQL`.

17. Enter the name of your app as the `Name` of your database. Select the
    `Region` closest to you: `Ohio` if in NY, `Oregon` if in SF. Select the
    `Free` plan. Leave other fields as their defaults and click `Create
    Database` at the bottom of the page.

18. Render will take you to your new database's information page. Click the
    `Connect` button on the right and copy the address for an `Internal
    Connection`. You will need this address when setting up your web service.

That's it! Your database should be ready to go.

#### Set up a web service

19. Go to your [Render Dashboard] and click the `New +` button on the top
    right. In the resulting dropdown menu, select `Web Service`.

20. If you have not already connected your GitHub account, click `Connect
    account` and follow the steps to connect it.

21. Once you have connected your GitHub account, you should see a list of your
    available repos. Select the repo with your app.

22. Fill in the `Name` field with the name of your app. You shouldn't need to
    specify a `Root Directory`. If your app uses a Rails backend with a (static)
    React frontend, select `Ruby` as the runtime `Environment`. (Render may
    misdiagnose your app as a `Node` app.) Select the `Region` closest to you:
    `Ohio` if in NY, `Oregon` if in SF. If you are using a Render PostgreSQL
    database, make sure that the regions match! Leave the branch as `main`.

23. Replace the string in the `Build Command` with `bin/render-build.sh`.  
    Replace the string in the `Start Command` with `rails s`.  
    Select the `Free` plan.

24. Click `Advanced` and then `Add Environment Variables`. If you are using a
    Render PostgreSQL database, add a key of `DATABASE_URL` with a value of the
    `Internal Connection` string that you copied when creating your database.
    Next, add a key of `RAILS_MASTER_KEY` with a value of the string found in
    your app's __config/master.key__ file. Finally, add any additional
    environment variable names and values from your backend or frontend __.env__
    as additional key-value pairs. (For React frontends, these will likely start
    with `REACT_APP`.)

25. Click `Create Web Service`. This will take you to a page where you can see
    the console output as your app builds. If all goes well, you should
    eventually see `Build successful` followed by `Deploying...`.

## Visit your site!

The web address for your site will have the form
`https://your-app-name.onrender.com`--possibly with some extra letters after
your app's name to avoid conflicts--and appear under your app's name near the
top of its web service page. Once your server is running, click your app's
address and visit it live on the web!

**Note:** It can take a couple of minutes for your site to appear, **even after
Render reports that it is `Live`.** Just be patient and refresh every 30 seconds
or so until it appears.

If you open your browser's DevTools and go to the `Sources` (Chrome) or
`Debugger` (Firefox) tab, you will notice that you--and everyone else who
accesses your app--can see all of the code in your frontend files. This is
because `create-react-app` defaults to showing a created app's source maps in
production. This can be **very** helpful when it comes to debugging your app in
production. Once your app is running well, however, consider removing the source
maps so that your code remains largely private and takes less time to build.

To remove source maps, go to the `Environment` tab. Under `Environment
Variables`, click `Add Environment Variable`. Add a key of
`GENERATE_SOURCEMAP` with the value `false`. This should trigger a new
deployment, this time without generating your source maps. Now if you check in
the DevTools, you will see that only your build file appears
(__main.########.js__). Nice! If you ever want the source maps back, just change
the value of `GENERATE_SOURCEMAP` to `true`.

Unless you changed the `Auto-Deploy` setting from `Yes`, your app should rebuild
and redeploy whenever you push changes to your `main` branch. If you ever need
to trigger a manual redeployment, click the blue `Manual Deploy` button at the
top of your app's Render page. Select `Clear build cache & deploy` for a clean
redeployment from scratch. You will be able to see the logs and confirm that
your redeployment is successful.

Finally, a **WARNING** about Render's free tier:  
If you are using a PostgreSQL database on Render's free tier, it will expire 90
days after creation--i.e., your app will no longer be able to access it--and be
deleted two weeks after that. **You will accordingly need to create and
configure a new database for your app every 90 days as long as you remain on the
free tier.** See the "Resetting Your PostgreSQL Database On Render" in the
left-hand sidebar for tips on how to do this.

**Set up calendar reminders for yourself to reset your Render Postgres database
instance every 85 days so your application(s) will not experience any
downtime.**

[localhost:5000]: http://localhost:5000
[render-env]: https://render.com/docs/blueprint-spec#environment-variables
[Render Dashboard]: https://dashboard.render.com/
