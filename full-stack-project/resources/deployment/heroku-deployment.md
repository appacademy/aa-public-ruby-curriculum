# Deploying Your App To Heroku

Here is a quick guide to deploying your app on Heroku for all the world to see.

This guide assumes that the project's root directory consists of your Rails
backend plus a __frontend__ folder that houses your React frontend. For more
detailed explanations of most steps, see the Deployment Instructions (Part 3)
for Week 12's Authenticate Me project.

Before you start, make sure your project commits are attached to **your** Github
account. Prospective employers want to know you can use Git, and setting your
username and email is one of its most basic functionalities. Also, you want
those green squares, right? Check through your commit history (use `git log`)
and verify that the authorship is correct. If anything is amiss, review [this
reading][git-fix-authorship] to learn how to make the appropriate changes.

[git-fix-authorship]: fixing-git-commit-authorship

## Preparing your local codebase

This first section describes how to prepare your local codebase for deployment.

### General preparation

1. Remove byebug, debuggers, and console output.  
   Use the magnifying glass in VSCode's left-hand menu (or `cmd+shift+F`) to
   search your project and make sure that you have removed all `byebug`s,
   `debugger`s, extraneous `print`/`puts`/`p`s, and unnecessary `console.log`s.

### React preparation

2. You want to build your frontend as static files stored in the __public__
   directory of your Rails application. You accordingly first need to specify
   the __public__ folder of your Rails application as the output directory for
   your React app's `build` command in __frontend/vite.config.js__:

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

3. Next, run `npm run build` in your __frontend__ directory and confirm that it
   populates the top-level __public__ folder with your build files. **You must
   re-run `npm run build` whenever you change a frontend file.**

4. To ensure that your __public__ directory gets pushed to GitHub, add a `!`
   before `/public` (or add the whole phrase if `/public` does not already
   appear) in your root __.gitignore__ file:

   ```plaintext
   !/public
   ```

Your React frontend is now ready to go!

### Rails preparation

5. If desired, move the following gems to the top level of your Gemfile so they
   will also be available in production:  
   - `faker` (if you need Faker to seed your production database)
   - `pry-rails` (to use `pry` instead of `irb` for your production Rails
    console)

6. Configure Rails to serve up the files in its public folder. Create a new
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

7. In __config/routes.rb__, add the following catch-all route **after all of
   your other routes**:

   ```rb
   #config/routes.rb

   get '*path', to: "static_pages#frontend_index"
   ```

8. If your app uses Active Storage, Action Cable, or any other Rails engine, add
   the following line to __config/application.rb__ to enable routes for those
   engines to escape your catch-all:

   ```rb
   config.railties_order = [:all, :main_app]
   ```

9. Run `bundle lock --add-platform x86_64-linux`.  
   You will need to run this command every time you generate--not just update--a
   new __Gemfile.lock__.

### Getting your app ready for Render

10. In the root directory, run `bundle install` followed by `rails s`. Open
    [localhost:5000] (or whatever port your backend runs on) to make sure that
    Rails is now serving up your frontend files.

11. In the root directory, create a __Procfile__ containing the following:

    ```plaintext
    web: rails server -p $PORT -e $RAILS_ENV
    console: rails console
    release: rails db:migrate
    ```

12. Stage and commit all changes to `main`. Remember: you should only push
    working repos to Heroku.

Congratulations! Your app is ready for deployment!

## Preparing Heroku

This section describes how to prepare Heroku for your app.

> **Note:** If you have not already done so, create an account on [heroku.com]
> before proceeding.

13. Create a new Heroku app.  
    From the [dashboard], click `New` > `Create a new app`. Give it a unique
    name, and don't change the region. Click `Create app`.

14. \[Optional\] Add the Ruby buildpack.

    - Go to the `Settings` tab in your newly created app's dashboard.
    - Scroll down to `Buildpacks`, click `Add buildpack`, and select
      `heroku/ruby` if it is not already there.

    **Note:** This step is optional because the Gemfile in your root directory should be enough for Heroku to
    discern that your app requires a Ruby buildpack.

15. Add config vars (environment variables).

    - Still in the `Settings` tab, look for the `Config Vars` section, and click
      `Reveal Config Vars`.
    - Create a key of `RAILS_MASTER_KEY`. Find the file __config/master.key__ in
      your Rails app, copy the string in that file, and paste it as the value
      for this variable on Heroku.
    - Copy any environment variable names and values from your frontend
      __.env__. (For React frontends, these will likely start with `VITE_`.)

## Deploy!

You've prepared both your local codebase and Heroku. Now it's time to deploy!

> **Note:** If you have not already, install the Heroku Command Line Interface
> (CLI) by following [these instructions][heroku-cli].

19. In your terminal, link Heroku to your app's git repo by running

    ```sh
    heroku git:remote -a <your-app-name>
    ```

20. Push to Heroku!

    ```sh
    git push heroku main
    ```

21. If needed, seed your database:

    ```sh
    heroku run rails db:seed
    ```

## See your site!

Run `heroku open`. If everything has gone according to plan, your site will open
in the browser!

Now that your app is live on Heroku, remember to push any changes that you
commit to both GitHub and Heroku.

<!--
1.  **Migrate static assets to the Asset Pipeline**

- Put assets in `app/assets/`
- Images should be in `app/assets/images/`
- Use the Rails helpers (`image_url` for things in `app/assets/images/`,
  `asset_url` for anything in `app/assets/`) to generate the URL.
- For use in Rails views:
  ```html
  <img src="<%= image_url('brent.png') %>" />
  ```
- For use in React:
  ```html
  <!-- application.html.erb -->
<!--
  <script type="text/javascript">
    window.brentURL = "<%= image_url('brent.png') %>";
  </script>
  ```
  ```jsx
  // your component
  render() {
    return <img src={window.brentURL} />;
  }
  ```
- For use in [SASS](https://www.sitepoint.com/an-introduction-to-sass-in-rails/)
  ```scss
  image-url('brent.png')
  asset-url('brent.png')
  ```
-->

## Common Gotchas

- **Heroku build failed**
  - This probably means there was a syntax error somewhere in your code. (Local
    environments can be more forgiving than Heroku.)
- **"We're sorry, but something went wrong" error message appears on page load**
  - Something is failing silently server-side. Use `heroku logs -t` to see your
    server logs and debug the issue.
  - If the heroku logs don't help, try running `heroku console`, which will load
    the Rails console. Doing this might throw an error that will point you to
    the part of your code you need to fix.
- **Can't fetch any data**
  - Make sure you seeded your database on Heroku.
- **Changing only capitalization when renaming a file.**
  - Git will fail to recognize the change. Use
    `git mv -f <old_file_name> <new_file_name>` to force the update.
- **Missing package errors in console when viewing production site, but none on
  `localhost`**
  - Your project is likely accessing a dependency that 1) is a `devDependency`
    or 2) was installed globally in the local environment and is therefore not
    installed on Heroku. Verify that **all** dependencies are included in your
    __package.json__.

<!--
- **Heroku build was successful, but nothing shows up on the page and there are
  no console errors.**
  - Failed to webpack your frontend. Double check your `postinstall` script,
    ensure there is only one `scripts` key in your `package.json` and make sure
    `webpack` is listed in your `package.json` `dependencies`
  - Try manually precompiling your assets by running `bundle exec rake assets:precompile RAILS_ENV=production`, then add, commit, and push back up to heroku
    - If this fixes your problem it means that you did not `.gitignore` your `/public/assets` folder. To permanently fix this problem and make sure Heroku handles this for you do the following
      - Add `/public/assets` to your `.gitignore` file
      - Run `git rm -r --cached .` from the root of your project
      - Add, commit, and push back up to Heroku
- **Asset pipeline not retrieving an asset, but is looking in the right
  directory (on `localhost`)**
  - Assets are only precompiled when the server is starts up. Try restarting
    your server to initiate precompiling  
-->

## Helpful Console Commands

- `heroku logs -t` - opens running server log of your Heroku app
- `heroku run <command>` - can run any terminal command
  - `heroku run rails db:<cmd>`
- `heroku console` - open production Rails console  
  > **Note:** This command is defined in your __Procfile__. It is equivalent to
  > `heroku run rails c`.
- `heroku pg:psql` - connect to Postgres db (in lieu of `rails dbconsole`)
- `heroku pg:reset DATABASE_URL` - used to drop and reset your Heroku Postgres
  database (you don't have the permissions to run `rails db:reset` and
  `rails db:drop` on Heroku)
  - `DATABASE_URL` is a Heroku config variable you can reference from the command
    line
  - Make sure to run `heroku run rails db:migrate` and `heroku run rails
    db:seed` to remigrate and reseed your database
- `heroku open` - opens your app in the browser

<!--
## Setting up a Custom Domain

**N.B.:** This is not a requirement for the initial submission of your
full-stack project, but will be required at the beginning of the Job Curriculum.

Check out our reading on [setting up a custom domain][domains] to find out more.

[domains]: domains
-->
[localhost:5000]: http://localhost:5000
[heroku.com]: https://signup.heroku.com
[dashboard]: https://dashboard.heroku.com/
[heroku-cli]: https://devcenter.heroku.com/articles/heroku-command-line
