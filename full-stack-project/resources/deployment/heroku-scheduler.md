# Heroku Scheduler

## About

Using Delayed Job requires starting up a worker process using `rails jobs:work` to run
the delayed tasks.  Once started, the worker process continues to run even after finishing scheduled tasks.  It is waiting for another delayed task.  On Heroku, this worker process
uses dyno hours, and can risk using up the [750 free dyno hours][free-dyno-hours] allotted to your
app.

One alternative is to run `rails jobs:workoff`, which makes one run through all the
currently scheduled tasks and then dies.  However, it's a pain to have to run this
command manually on Heroku whenever you want to work through the accumulated tasks.

**You can save dyno hours by scheduling `rails jobs:workoff` to run regularly using the
Heroku Scheduler**.  It is a free add-on that allows you to schedule rake tasks to run
at regular intervals.  If your Delayed Job tasks can afford to wait 10 minutes, then
it will be more efficient to just run though them every 10 minutes rather than having
the worker dyno constantly waiting to run them.

[free-dyno-hours]: https://devcenter.heroku.com/articles/usage-and-billing#750-free-dyno-hours-per-app

## Basic Use

You can install the add-on with `heroku addons:add scheduler:standard`.

**Note**: You will be asked to add a credit card to your account during set-up.

Once it is installed, the scheduled tasks can be managed from the "Scheduler" interface
under the Add-on's drop down in your Heroku account page.  You can open it instantly
by using `heroku addons:open scheduler` from the terminal.

The scheduled processes will show up in your Heroku logs under the name `scheduler`.

## Writing Rake Tasks

The Heroku Scheduler can be used to run any rake task at regular intervals.  What if
you want it to run your own code?  You can write your very own rake task for the job!

In Ruby on Rails, Rake tasks live in the `lib/tasks` directory.

Here is an example of how to write a rake task that prints "Hello World".  
Enter `rails generate task test say_hello` in the terminal.  
This will generate a file for rake tasks under the prefix of `test`,
with an individual task called `say_hello`.

```ruby
# in lib/tasks/test.rake
namespace :test do
  desc "TODO"
  task :say_hello => :environment do
  end

end
```

Fill out the file as follows:

```ruby
# in lib/tasks/test.rake
namespace :test do
  desc "My first rake task!"
  task :say_hello => :environment do
    puts "Hello World"
  end

end
```

You can run this rake task using the command `rails test:say_hello`.  When you run a rake
task, the code inside the `:environment do` block gets executed.

For writing tasks to use with Heroku Scheduler, the tasks should be prefixed under
the word `scheduler`.  That means they can be added to a file called
 `lib/tasks/scheduler.rake`.

## Gotchas

There is a time limit on tasks run by the Heroku scheduler: Tasks cannot take more time
than the interval at which they run.  For example; if a task is set to run every
 10 minutes, then it can't take more than ten minutes.  
 Tasks must be short enough that
  they do not overlap.

Tasks are occasionally dropped or skipped by the scheduler; there is no guarantee that a
scheduled task will run on time or at all.  If it is essential that a task run at a
certain time, then a better tool may be a [custom clock process][custom-clock-process].

[custom-clock-process]: https://devcenter.heroku.com/articles/scheduled-jobs-custom-clock-processes

## Resources

 * [Heroku Scheduler][heroku-scheduler]
 * [Add-ons and Dyno Hours][add-on-hours]
 * [Heroku: Usage and Billing][heroku-usage-billing]

[heroku-usage-billing]: https://devcenter.heroku.com/articles/usage-and-billing
[add-on-hours]: https://devcenter.heroku.com/articles/addons-with-dyno-hour-usage
[heroku-scheduler]: https://devcenter.heroku.com/articles/scheduler#known-issues-and-alternatives
