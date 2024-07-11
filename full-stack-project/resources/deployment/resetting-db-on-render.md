# Resetting Your Render PostgreSQL Database

The main limitation of the free Render Postgres database instance is that it
will expire 90 days after creation--i.e., your app will no longer be able to
access it--and be deleted two weeks after that. (The delay between expiration
and deletion is to encourage you to upgrade to a paid plan and preserve your
app's data.) Accordingly, to keep your application up and running, you **MUST**
create a new database instance before the 90-day period ends.

**Set up calendar reminders for yourself to reset your Render Postgres database
instance every 85 days so your application(s) will not experience any
downtime.**

## Resetting your database

Each time you get your calendar reminder, follow these steps:

1. Navigate to your Render [Dashboard] and click on your database instance.

2. Scroll to the bottom of the resulting page and click on either the "Delete
   Database" or "Suspend Database" button. Follow the instructions to complete
   the action. (Render allows you to have as many suspended databases as you
   want, but there's really no reason to keep a bunch of suspended databases.)

3. Return to your Render [Dashboard] and click the `New +` button on the top
   right. In the resulting dropdown menu, select `PostgreSQL`.

4. Enter a `Name` for your database, either the name of your app or, if the
   database will be hosting more than one app, something more general. Select
   the `Region` closest to you: `Ohio` if in NY, `Oregon` if in SF. (**ALWAYS
   SELECT THE SAME REGION EVERY TIME YOU CREATE A NEW DATABASE.** Otherwise, you
   will have to go through and change the `Region` for all of your apps as
   well.) Select the `Free` plan. Leave other fields as their defaults and click
   `Create Database` at the bottom of the page.

5. Render will take you to your new database's information page. Click the
   `Connect` button on the right and copy the address for an `Internal
   Connection`.

6. Finally, you will need to update the environment variables for **EVERY**
   application that was connected to the original database with the new database
   information. For each application:

   - Click on the application name from your [Dashboard].
   - Click on `Environment` in the left sidebar.
   - Replace the value for `DATABASE_URL` with the new value from your new
     database instance and click `Save Changes`.
   - Changing an environment variable should initiate a redeployment. If it does
     not, click `Manual Deploy` at the top of your app's page and select `Clear
     build cache & deploy`.

   > Note: If you used a __render.yaml__ file to set up a Blueprint for any of
   > your apps, the database configuration in that file will now be outdated.
   > This will not create a problem, however, unless you change and recommit
   > your __render.yaml__ file--thereby triggering an automatic Blueprint
   > sync--or click to do a `Manual Sync`. If you do not update your
   > __render.yaml__ file with the correct database information before trying to
   > sync, the build will fail. Remember that you will need to update both the
   > database configuration and the `name` of the `DATABASE_URL` `fromDatabase`
   > in your `services` configuration.

7. After each application is updated with the new database instance and
   redeployed, manually test each application to make sure everything still
   works and is appropriately seeded.

[Dashboard]: https://dashboard.render.com/
