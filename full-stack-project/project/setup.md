# Setting Up Your Full Stack Project

This guide explains how to set up a Ruby 2.7 / Rails 6.1 project in such a way
that it integrates well with a standard Webpack setup, like those you've used
throughout this course.

Why these versions of Ruby and Rails? They play much more nicely with Heroku,
the service you'll use to deploy your app as a live website. They also provide
some future-proofing, so that if, for instance, a new version of a Gem
requires Rails 6, you can still use it.

If you've already created a project repo that uses earlier versions of Ruby and
Rails, don't worry! Just follow these instructions like you're setting up a new
project, and then check out the section at the end about pushing this new
project to your existing GitHub project repo.

## Install the Correct Ruby & Rails Versions

1. Open your terminal, and navigate to the directory in which you'd like to
   create your (new) full stack project. 
    - Make sure you're not inside an existing Git repo (you can check by running
    `git status`; it should fail with the message that neither your current directory nor its parent directories are git repositories).

2. Check that you are using at least Ruby 2.7.3
    - Run `ruby -v`. 
    - If the version printed out is >= 2.7.3, you're good to skip to step 3.
    Otherwise, run `rbenv versions`:
        - If you see any version >= 2.7.3 listed, switch to that version by
          running `rbenv global <version #>` (e.g., `rbenv global 2.7.3`).
        - If you don't see any version >= 2.7.3 listed, install one by running
          `rbenv install 2.7.3`. Then run `rbenv rehash` and finally `rbenv
          global 2.7.3`.
    - Verify your Ruby version is correct by running `ruby -v` again.

3. Check that you are using at least Rails 6.1
    - Run `rails -v`
    - If the version printed out is >= 6.1, you're good to skip to step 4.
    - Otherwise, install the latest version with `gem install rails -v 6.1.4`. 
    - Verify your Rails version is correct by running `rails -v` again.

## Create a New Rails Project

4. Create a new Rails project: 
  `rails new <your-app-name> -d=postgresql --skip-javascript`
    - You're skipping JavaScript so that you can use your own Webpack setup,
      instead of the default Rails 6 `webpacker` setup.

5. `cd` into your new Rails project and open `Gemfile`. 
    - Add `jquery-rails` at the top level (not inside any group). 
    - While you're at it, you can comment in `bcrypt`, and add useful gems to
      your development group such as `pry-rails`, `better_errors`,
      `binding_of_caller`, and `annotate`.
    - We also recommend you comment out the gem `rack-mini-profiler`. This gem
      creates a widget on each web page with stats on the performance of your
      application. This is overkill for the scale of your project.
      Alternatively, if you'd like to keep this gem, you can toggle its
      appearance on the page with `Alt+P`.
    - Run `bundle install`.

6. Open `.gitignore` and add the following lines:
    ```
    node_modules/
    bundle.js*
    .DS_Store
    npm-debug.log
    ```

## Recreate the JavaScript Asset Pipeline

7. Open the file `manifest.js` inside `app/assets/config/`. Add the last line
   below to link your `javascripts` directory. Your file should look like this:
    ```js
    //= link_tree ../images
    //= link_directory ../stylesheets.css
    //= link_directory ../javascripts.js
    ```

8. Create a new directory `javascripts` inside `app/assets`. Then create a file
   inside `javascripts` called `application.js`. Paste the following into this
   file:
    ```js
    //= require jquery
    //= require jquery_ujs
    //= require_tree .
    ```

9. Open `application.html.erb` inside `app/views/layouts/`. Inside `head`, and
   below the `stylesheet_link_tag`, add the following: 
   ```
    <%= javascript_include_tag 'application' %>
   ```

That's it! Rails will now compile whatever is required in `application.js` and
load this in your `application.html.erb`, just like Rails 5.

## If You Already Have a GitHub Repository

1. Create your first commit by adding all and then committing. 

2. Change your branch name to main: `git branch -M main`.

3. Run `git remote add origin <your-repo-url>`. 

4. Force push your main branch: `git push origin main -f`. 
    - *Note:*: Force pushing is generally quite dangerous, and you should only
      use it when you know exactly what you are doing, and when the stakes are
      low. It overrides the existing commit history in your remote repo, and
      replaces it with the commit history from the local repo you're pushing.

## If You're Going to Use Action Cable / WebSockets:

Note: This applies only to projects with realtime features like live chat. Of
the approved clones, this would only apply (excluding bonus features) to
Discord, Slack, and Poll Everywhere.

When creating your Rails project, you used the`--skip-javascript` flag to opt
out of the default Rails 6 `webpacker` setup. 

This prevented Rails from creating a `javascript/channels` folder, which
would contain `consumer.js` and `index.js` files. 

No need to recreate `index.js` - it's just a convenience file to avoid some
manual imports.

You should create your own `consumer.js` file, however, anywhere in your
`frontend` folder. Paste in the following lines:

```js
import { createConsumer } from "@rails/actioncable"
export default createConsumer()
```

You can then import the exported `consumer` object in any of your other
JavaScript files in order to subscribe to Action Cable channels.

You'll notice this file imports from the `@rails/actioncable` library. When you
create a `package.json` for your frontend, you will also want to install this
package: `npm install @rails/actioncable`.
