# Advanced Deployment

So you think you're all that and a bag of chips throwing around
`git push heroku main`? Well, that is pretty cool, but let's
dig a bit deeper into what the deployment process is really all
about.

Here you'll see an overview of the basic components of deployment,
and you'll be introuced to two gems that make the process a bit
smoother: Capistrano and Rubber. Rubber helps you easily deploy to
Amazon EC2.

---

We'll cover the pieces in two categories. There's the tech stack that
actually runs when your application is serving requests, and there are
all the things you need to do to set that stack up and prepare your
application to serve those requests.

## The Tech Stack

### Server Box

First things first: There's your server box somewhere out in the world
with an IP address. That's the box you'll be running your application
on. That box will receive requests through the interwebs (which find it
by IP address, of course). You usually have this box through some hosting
company - DigitalOcean, Linode, Amazon Web Services, etc.

### Application Server

So, the server box is open to requests and when one arrives, your server
process - also known as your application server - is waiting for it and
processes it. The server process is the one that has loaded up and is
actually running all the code in your Rails app.

There are a variety of application servers to choose from. Before Rails 5, Rails shipped
with WEBrick, but WEBrick is not considered to be a good choice for
production. Rails 5 ships with Puma, which is more suitable for production. Some other popular production app servers are Thin, Unicorn, and Phusion Passenger.

Thin is the easiest to swap in: just put `gem 'thin'` in your Gemfile.

### Proxy Server

You'll usually have a cluster of app servers running (even on just one
box), so you need something that will actually distribute the requests
among each instance. Enter the proxy server.

What's a proxy server? A proxy server is a server that sits in front of
your application server and forwards requests on to it. Why? For two
reasons mainly: first, you could have multiple server processes running
and your proxy server can send requests on to each server in turn (this
is called load balancing); second, your proxy server can take care of
serving static assets (CSS, JavaScripts, and the like) which means your
app server doesn't have to. Less load = good.

Nginx and Apache are the two most popular proxy servers. Nginx is known
to be particularly fast.

### Database + Caching Servers

With your box, proxy server, and app server, you're ready to serve
requests, but if you want to be persisting any data, you'll also have to
have your database setup. Postgres and most other major databases run in
their own process, so that will have to be started as well. If you're
running any caching layers, those will also have to be started.

## Preparing and Launching Rails

All your code is ready to go. Your app is ready to meet the world. What
now? Let's get an overview of all the things that need to happen.

It's not important for you to be able to do or know each of these things
in detail since you'll see how to use Rubber (which uses Capistrano) to
actually deploy the app but it's good to know what's generally happening
under the hood.

### Moving the Files

Once you have a server up, you have to get your files over to it. You do
this either through FTP (file transfer protocol) or through git by
setting up a remote bare repository on the server that you can push to.

### Gems

First things first: you'll have to get all your dependencies setup on
the server box. Easy enough:

```
$ bundle install --without development test
```

### Setting up the Database

First, you would start your database server, and once that's up, you'd
create and migrate your database in production mode.

```
$ rails db:create RAILS_ENV=production
$ rails db:migrate RAILS_ENV=production
```

### Assets

In development, all your assets (CSS and JavaScript files) are sent down
as individual files so that you can debug easily. But in production, we
don't want clients making requests for so many files; instead what Rails
does in production is precompile the assets into just two files:
`application.css` and `application.js`.

```
$ rails assets:precompile
```

### Rails Production Environment

Rails has different environments that it can run your application in:
development, production, and testing. It keeps all the configuration
settings and initialization logic for each of those environments in the
`config/environments/` directory.

The file you'll be particularly interested in when it comes to
deployment is the `config/environments/production.rb` file. Take a read
through it sometime to get a sense of the sorts of options that are set
in it. Compare it to `development.rb`.

Wondering how you would even boot up your Rails sever in production
mode?

```
$ rails server -e production
```

Now you're fired up and ready to go.


## Using Capistrano and Rubber to Deploy

Now that you've gotten a sense of all the components involved in a
hands-on deployment, you can see the value that something like Heroku
provides. It does all that stuff for you right out of the box.

Amazon EC2 is another popular service, but it requires much more manual
configuration. You manually spin up and shut down servers, move files,
install dependencies, precompile assets, etc. etc. You'd have to do the
same on any other hosting service like Digital Ocean or Linode.

[Capistrano][capistrano] was created to automate much of this process.
[Rubber][rubber] was built on top of Capistrano specifically for
deploying to Amazon EC2.

Capistrano provides a sort of deployment templating system; it has
"recipes" for various deployment setups that take out all this grunt
work (or at least automate it). Rubber provides particular templates and
command-line tasks to interact with Amazon EC2 specifically. They're
both great.

Watch this [Rubber RailsCast][railscast-deploy] to walkthrough deploying
to Amazon EC2. It's pretty straightforward and not very long (17m).

[capistrano]: https://github.com/capistrano/capistrano
[rubber]: https://github.com/rubber/rubber
[railscast-deploy]: http://railscasts.com/episodes/347-rubber-and-amazon-ec2

## Additional Resources

* Excellent [Stack Overflow answer][so-deployment] explaining proxy
  servers, application servers, and the basics of the deployed tech
  stack.

[so-deployment]: http://stackoverflow.com/questions/4113299/ruby-on-rails-server-options
