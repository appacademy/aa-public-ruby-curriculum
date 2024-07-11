# Delayed job

## Intro

Currently, our Rails app does all of its work as part of the
request-response cycle. The user issues a request, the server
processes it, and it eventually returns a response.

Sometimes you need to do work outside the request cycle. For instance:

* You may want to schedule work to be done at a later time. For
  instance, you may want to wait a few days before sending a new user
  a reminder email about your site.
* You may want to do something presently, but it may take a few
  seconds, and you don't want to hold up responding to the user's
  request and delaying their page load. For instance, you may want to
  send a confirmation email on user signup, but emailing can take a
  few seconds to send.

To do this, we use the `delayed_job` gem; this will let us schedule
work to be done later. At a later point, a worker process (not a web
server) will come around to finish the scheduled work.

## References

The Heroku documentation has a great description of how to use delayed
job (https://devcenter.heroku.com/articles/delayed-job).

First they have you setup DJ; this involves installing the gem,
running `rails generate delayed_job:active_record` to generate a
migration to add a jobs table to your DB, and then `rails db:migrate`
to actually run the migration.

When you schedule a delayed job, DJ will store it in this new
table. You don't have to use this db table yourself, but it needs to
be there for DJ to use.

It will have you add a line to your `Procfile`; the procfile lists
what kind of work each process should do. A standard `Procfile` has
`web` processes start a Rails server, while `worker`processes should
run `rails jobs:work`. The `rails jobs:work` task will just take jobs
one-by-one out of the database, complete them, and then move on to the
next.

`worker` processes never handle web requests, and `web` processes
never handle DJ work. That's what we want; we want the `web` processes
to schedule work for the `worker`s, so they can get back to speedily
serving a web response.

## The Delayed Job Gem
delayed Job is a useful gem for pushing your application's slower tasks into the
background. It creates a table in your database that acts as a TODO list of tasks.
doing this allows your server to process work asynchronously, so
that your responses are not unnecessarily delayed.

## Installation
since we're using Active Record you're going to want to install that
version of DJ. `gem 'delayed_job_active_record'` and bundle install.  

```bash
rails generate delayed_job:active_record
rails db:migrate
```

## Building A Queue
delayed Job provides a delay method that you can use to
queue work to be run in the background of your application:

`@photo.delay.upload`

this will create an entry into the delayed_jobs table with instructions
to call #upload on the specified Photo.

if you have methods that are always meant to be processed asynchronously
you can specify this desire in your model with `handle_asynchronously`

```ruby
class CatCircle < ActiveRecord::Base
    def flip_hats
        1_000_000_000.times do { flip_hat }
        save
    end
    handle_asynchronously :flip_hats
end
```
`handle_asynchronously` can take a few options to specify priorty
(represented by an int value) or a time proc

```ruby
def daily_reminder
    #stuff
end
handle_asynchronously :daily_reminder, run_at => Proc.new { 1.day.from_now }

def of_utmost_urgency
    #really important stuff
end
handle_asynchronously :of_utmost_urgency, priority => 9001
```
to delay an email, leave off the deliver call.
```ruby
userMailer.delay.welcome_email(user) # don't use deliver
```

## Performing the Work
ok, now that we've queued up a bunch of processes to be performed in the
background, we need to set up a process to start doing the work.  
the easiest way to do this is by using `rails jobs:work`. This sets up a
worker that checks the database ~every 5 seconds and performs any jobs
that need to be done. Tell it to stop with `CTRL-C`.  

if you just want to make one pass and exit, you can use `rails
jobs:workoff`.

optionally you can define and specify which queues you want to work off.  
clear all jobs with `rails jobs:clear`

be aware that running a worker on a Heroku app will fire up an
additional dyno and consume your precious free monthly hours. Plan
accordingly.
