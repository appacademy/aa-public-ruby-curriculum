# Moving Apps From Heroku To Render

Moving an app deployed on Heroku to a new home on Render.com is fairly
straightforward. This reading will show you how to do it.

## Step 1: Set up your database

If your app uses a Mongo database hosted on Atlas, you're good to go! Skip to
the next section ("Step 2").

If you plan to host multiple applications that require a PostgreSQL database on
Render, then you will need to configure your app to use a shared database before
proceeding. (Render allows only one free active PostgreSQL database.) See the
"Hosting Multiple PostgreSQL Apps on Render" reading in the left-hand sidebar.
When you have finished configuring your app, if you already have an active
PostgreSQL database on Render, skip to the next section ("Step 2"). Otherwise
continue to the instructions for creating a database below.

If you already have an active PostgreSQL database on Render that you do **NOT**
need to share among multiple apps, then it is probably best to suspend or delete
it and just create a new one. (Render's free Postgres databases expire after 90
days; creating a new one will give you the full lifespan.) Select your database
from the Render [Dashboard], click `Suspend Database` or `Delete Database` at
the bottom of the resulting page, and follow the instructions. Then create your
new database.

### Create a new PostgreSQL database

To create a new PostgreSQL database on Render:

1. From your Render [Dashboard], click the `New +` button on the top right. In
   the resulting dropdown menu, select `PostgreSQL`.

2. Enter the name of your app as the `Name` of your database. Select the
   `Region` closest to you: `Ohio` if in NY, `Oregon` if in SF. Select the
   `Free` plan. Leave other fields as their defaults and click `Create
   Database` at the bottom of the page.

## Step 2: Set up your web service

1. From your Render [Dashboard], click on the active database that you want use.
   On the database's information page, click the `Connect` button on the right
   and copy the `Internal Database URL` for an `Internal Connection`. You will
   need this address to connect your app to your database.

2. From any Render page, click the `New +` button on the top right. In the
   resulting dropdown menu, select `Web Service`.

3. If you have not already connected your GitHub account, click `Connect
   account` and follow the steps to connect it.

4. Once you have connected your GitHub account, you should see a list of your
   available repos. Select the repo with your app.

5. Fill in the `Name` field with the name of your app. You shouldn't need to
   specify a `Root Directory`. If your app uses a Rails backend with a (static)
   React frontend, select `Ruby` as the runtime `Environment`. (Render may
   misdiagnose your app as a `Node` app.) If it uses an Express backend, select
   `Node` as the runtime `Environment`. Select the `Region` closest to you:
   `Ohio` if in NY, `Oregon` if in SF. **If you are using a Render PostgreSQL
   database, make sure that the regions match!** Leave the branch as `main`.

6. The `Build Command` needs to accomplish everything that Heroku accomplished
   through buildpacks and the Procfile `release` command. Since you do
   not have access to a console in Render's free tier, it also needs to do any
   database seeding that you require. Thus, e.g., a typical Rails-React
   build command needs to build your (static) React frontend, `bundle install`,
   migrate your database, and--if needed--seed your database. While the exact
   series of commands will differ depending on your specific configuration, a
   typical Rails-React build command will likely look something like this:

   ```rb
   npm run build && bundle install && rails db:migrate db:seed
   ```

   For MERN apps, `npm run build` will likely suffice, assuming you have
   constructed the `build` script in your root directory's __package.json__ to
   build your entire app.

   Replace the string in the `Build Command` with a version of the appropriate
   command above, modified for your particular configuration.  

7. Replace the string in the `Start Command` with `rails s` (for Rails apps) or
   `npm start --prefix backend` (for MERN apps), again modifying appropriately
   for your particular startup configuration.  

8. Select the `Free` plan.

9. Click `Advanced` and then `Add Environment Variables`. If you are using a
   Render PostgreSQL database, add a key of `DATABASE_URL` with a value of the
   `Internal Connection` string that you copied when creating your database.
   Next, add any `Config Vars` that **you added to Heroku** for your app. (You
   can find these listed under `Settings` for your app in Heroku.) In other
   words, you do **NOT** need to create environment variables for the following
   Heroku-supplied `Config Vars`:

   * `LANG`
   * `RACK_ENV`
   * `RAILS_ENV`
   * `RAILS_LOG_TO_STDOUT`
   * `RAILS_SERVE_STATIC_FILES`

   (And of course, don't copy the value of `DATABASE_URL` from Heroku!) It will
   not hurt your application if you do add these variables, but Render will also
   supply most of these variables with appropriate values. (Click the links for
   the list of environment variables that Render supplies for [Ruby], [Node],
   and [all] apps.)

10. Click `Create Web Service`. This will take you to a page where you can see
    the console output as your app builds. If all goes well, you should
    eventually see `Build successful` followed by `Deploying...`.

## Step 3: Visit your site

The web address for your site will have the form
`https://your-app-name.onrender.com`--possibly with some extra letters after
your app's name to avoid conflicts--and appear under your app's name near the
top of its web service page. Once your server is running, click your app's
address and visit it live on the web!

**Note:** It can take a couple of minutes for your site to appear, **even after
Render reports that it is `Live`.** Just be patient and refresh every 30 seconds
or so until it appears.

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

[Dashboard]: https://dashboard.render.com/
[Ruby]: https://render.com/docs/environment-variables#ruby
[Node]: https://render.com/docs/environment-variables#node
[all]: https://render.com/docs/environment-variables#all-services
