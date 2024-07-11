# Keeping Your Site Active

Render.com limits its free tier to a collective 750 runtime hours per month. 750
hours is a little over 31 (24-hour) days worth of runtime, so if you only have
one app, you will be fine. As a Campus Hybrid graduate, however, you will be
hosting at least two web services: your Full Stack Project and your MERN
project. If they each run 24 hours a day, you will hit your runtime limit
roughly halfway through the month. That means any potential employers who try to
view your apps in the latter half of the month will see nothing but a blank
page, which will probably not help your chances.

To help conserve runtime, Render.com will spin down and inactivate free web
services that have been idle for 15 minutes. While that is great for preserving
your runtime, it means that Render will then have to spin up and reactivate your
site whenever the next request comes in. Unfortunately, this reactivation
process can take over a minute, which once again leaves potential employers with
a bad first impression.

What you need is a solution that will keep your site active--and, therefore,
fast and responsive--whenever potential employers are likely to be looking at
it, but that also allows your site to spin down when activity is likely to be
low so you don't use up all of your free runtime hours. To achieve this goal,
you can set up a _cron job_--i.e., a non-interactive task scheduled to run
automatically at certain times--to ping your websites every 10 minutes or so,
thereby keeping them active during optimal hours.

What hours qualify as optimal? Work hours are becoming more flexible, but most
companies still focus their workday from 9 to 5. Potential employers are
therefore most likely to try to access your site during those hours.
Assuming you might apply to companies on either coast--and anywhere in
between--you should also account for that workday extending across different
time zones. Ideally, then, you would want your cron job to be active from 9am
to 8pm EST / 6am to 5pm PST.

Having both apps active 11 hours a day will use 22 hours of runtime each day,
giving you an average of two extra hours of runtime per day to cover cases where
someone accesses your app outside of normal working hours. (Remember, users can
access your app at any time, they will just have to wait for it to spin up if it
is currently inactive.)

Feel free to adjust this basic scenario to fit your needs. For example, you
could expand your active hours during the week and not have your cron jobs run
on the weekends. Or you might add a third app, in which case you would need to
recalculate the best way to use your 750 free hours.

## Creating a cron job

There are several websites that allow you to set up free cron jobs. Render even
has the capability to set cron jobs for your apps, but it is not available in
the free tier. The following instructions use [cron-job.org], a free site that
includes all the functionality you will need, but feel free to select another.
The basic setup should be similar across sites.

To set up a cron job on [cron-job.org], go to the site and sign up for an
account. Once on the dashboard, click the button on the right to `CREATE
CRONJOB`. Use the name of your app for the `Title`--you will need to set up a
cron job for each app you want to keep active--and supply the app's `URL`.

Under `Execution schedule`, select `Custom`. This pulls up 5 columns, with most
values against a gray background: `Days of month`, `Days of week`, `Months`,
`Hours`, and `Minutes`. The gray background indicates that a value is currently
selected. The default `Custom` setting executes every 15 minutes of every day,
so everything is selected except under `Minutes`, which only has `0`, `15`,
`30`, and `45` selected.

Program your cron job to execute on your desired schedule. For example, to
program the schedule mentioned above--every 10 minutes on weekdays from 9am to
8pm EST--you would select:

* `Monday` through `Friday` for `Days of the Week`
* `9` through `20` for `Hours`
* `0`, `10`, `20`, `30`, `40`, `50` for `Minutes`
* Everything for `Days of month` and `Months`

> Note: To select multiple items individually, press `<ctrl>` (PC) or `<cmd>`
> (Mac) while clicking the desired values. Pressing `<shift>` while clicking on
> a value will select the clicked value and every value in between that value
> and the previously selected value.

The above configuration equates to the following crontab expression:

```plaintext
*/10 9-20 * * 1-5
```

A crontab expression is the actual syntax for running your cron job. It always
consists of five values signifying, from left to right, minutes, hours, days of
the month, months, and days of the week. An `*` means to include all values. The
crontab above says to run every ten minutes (`*/10`), between the hours of 9 and
20 (`9-20`), every day (`*`), of every month (`*`), that falls on a Monday
through Friday (`1-5`).

> You can check/configure which timezone cron-job is using under the `Advanced`
> options.

Again, tweak the proposed schedule as desired. You can leave the other options
as the defaults suggest. When you are satisfied, click `CREATE` on the bottom
right. Your cron job is up and running!

**Remember to repeat this process for any other apps you want to keep active!**

[cron-job.org]: https://console.cron-job.org/signup
