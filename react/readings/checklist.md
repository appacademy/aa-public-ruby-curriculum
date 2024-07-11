# Project Setup Checklist

Here's a Rails/React/Redux setup checklist. It should serve only as a reminder.
Ask a TA if you don't understand **why** you're configuring something on this
list.

**1. `rails new <project_name> --database=postgresql -T --api`**

* Add `--database=postgresql` to use PostgreSQL.
* Add `-T` to skip setting up Rails's internal Test::Unit files.
* Add `--api` to set up Rails as an API only.
  
  **Note:** You have used the `--minimal` option throughout this course when
  creating Rails apps. For your Full Stack Project, however, you should not use
  this option because you will probably end up needing one of the packages that
  `--minimal` skips: Action Cable (for live chat / real-time updates), Active
  Storage (for storing files/images/etc. on Amazon S3), Action Mailer (for
  sending emails), Action Text (for rich text editing), and so on. If you are
  sure you will not need certain packages, use an `rc` file or command line
  `skip-*` options to skip installing those packages.

**2. Update your `Gemfile`.**

* `bcrypt` (top level)
* `jbuilder` (top level; may already be present)
* `byebug` for `debug`
* `annotate`
* `pry-rails`
* `better_errors`
* `binding_of_caller`
* Any testing gems you want: `rspec-rails`, `factory_bot_rails`, `faker`,
  `shoulda-matchers`, etc. (Note that some of these will require further
  setup.)

**3. `bundle install`**

**4. Update your `.gitignore` to include:**

* __.byebug_history__
* __.DS_Store__

**5. `npx create-react-app frontend --template @appacademy/react-v17 --use-npm`**

**6. To install Redux and React Router, go to the __frontend__ folder and `npm
install` the following packages:**

* `react-redux`
* `react-router-dom@^5`
* `redux`
* `redux-thunk`

**7. Still in the __frontend__ folder, install the following dev-dependencies
with `npm install -D`:**

* `redux-logger`

**8. Return to the root directory and `git add .`**
  
**9. `git commit -m "<message>"`**

**10. Go to GitHub, create a new repository, and follow the resulting
instructions to push an existing repository from the command line.**

After following these instructions, your Rails-backend + React-Redux-frontend
project should be on GitHub with a default branch of `main`.

> **Note:** Your app will still require some adjustments to prepare it for a
> production environment. See the Deployment README in the Authenticate Me
> practice for details.
