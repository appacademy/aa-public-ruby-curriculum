# Ruby on Rails

Ruby on Rails is a web application framework written in Ruby. It was developed
by David Heinemeier Hansson and first released to the public in July 2004.

Not only is Rails popular with start-ups for its ease in deploying to
production, but a number of larger companies like Twitter, Hulu, and Kickstarter
use Rails in their stack as well.

Rails became popular for a number of reasons.

One major reason is that Ruby is a very readable, versatile, and elegant
language. Ruby was designed to be a "joy to use" and that can be seen in its
clean, concise code that reads like English.

Another reason why Rails is so popular is that it is an open-source framework
and has a large, active community. Not only is the framework itself well
maintained, but there are also a lot of external libraries available through
RubyGems that can be easily added to a Rails application.

Also, Rails follows a number of design principles that contribute to its
efficacy in getting an application pushed to production quickly.

## Design Principles

### MVC

Rails is an MVC framework. MVC, or Model-View-Controller, is a design pattern
that divides an application into three basic parts, each responsible for
handling a different task.

+ The model is concerned with retrieval of information from storage, as well as
  any logic done to that information.
+ The view is concerned with presenting information.
+ The controller is concerned with constructing the server's HTTP response and
  sends commands to the model to fetch or update information, and to the view to
  display information. It acts as the interface between the model and the view.

### Convention Over Configuration

Rails introduced the concept of convention over configuration (CoC). The idea
behind CoC is that the default configuration is already programmed into the
framework, and developers only have to be specific upon doing something
unconventional.

One convention that Rails makes extensive use of is the naming of various parts
of the application. For instance, if you have a `cats` database table, the
default model name is `Cat`, and the default controller is `CatsController`. By
naming in this way, Rails will automatically know how to load the application to
tie all these pieces together.

CoC circumvents having to write a lot of boilerplate configuration. Part of why
Rails is popular is that it allows developers to create an application very
quickly due to all of this configuration being handled. It also means that any
Rails developer can look at any project and know how to navigate it with less
extensive documentation.

### REST

REST, or Representational State Transfer, is an architectural style for web
services. A RESTful web service allows for access to web resources (e.g., a
document, image, web page -- practically anything accessible on the internet!)
using standard operations, such as HTTP's `GET`, `POST`, `PATCH`, or `DELETE`.
The idea behind REST is that each one of these operations, in combination with a
particular resource identifier, will have a predictable, standardized result.
For instance, a `GET` request to a resource with a specified `id` is expected to
return data on that specific item. This is true no matter what the resource is.

RESTful web services are stateless; this means that each request/response cycle
is independent of any other request/response cycle. The server will not retain
any session information over multiple requests. However, data can be cached on
the client side.

Rails defaults to a RESTful API using its `resources` method, which
automatically generates routes by linking HTTP verbs and URIs to controller
actions.

## Components

### Active Record

All models in Rails inherit from Active Record. Active Record is an ORM, or
Object Relational Mapping. It allows us to represent data from a database as
Ruby objects, which can then easily be presented or manipulated. In addition,
Active Record contains a number of methods which implement basic CRUD (Create,
Read, Update, Delete) functionality and which mirror SQL queries.

### Action Controller

Action Controller handles the controller logic. Among other things, Action
Controller allows for access to various cookies, which can store small amounts
of data such as information about the session or brief error messages that can
persist across requests.

It can also provide protection from cross-site request forgery (CSRF) attacks by
checking for the presence of authenticity tokens in requests that could modify
data (e.g., `POST` or `PATCH` requests).

### Action Cable

Action Cable provides a framework for integrating WebSockets into a Rails
application. In contrast to the stateless, request-response nature of HTTP
connections, the persistent and bidirectional nature of WebSocket connections
allows for Rails applications to incorporate real-time features such as live
chat and push notifications.

### Action Mailbox and Action Mailer

Action Mailbox enables a Rails app to receive and process incoming email from
services like Exim, Mailgun, Mandrill, Postfix, Postmark, Qmail, and SendGrid.
Its counterpart, Action Mailer, enables a Rails app to send email using view
templates.

### Action View

Action View is responsible for rendering the views. Action View templates can
take several forms. One of the supported file types is ERB, or Embedded Ruby.
ERB files are a mixture of HTML and Ruby code. Writing Ruby code in the views is
very helpful - to generate a list of items, just write a loop! Rails also has a
number of built-in helper methods that generate HTML that can be added to a view
with ERB.

Another supported file type is a builder file. Instead of rendering HTML, a view
could instead render XML or JSON. This is incredibly useful for a route that
only returns data that will then be parsed later by more code.

### Rake

Rake is a utility tool packaged with Rails that handles task management. It can
be thought of as a scripting tool for Rails, used to carry out administrative
tasks such as migrating a database and displaying routes.

Custom rake tasks are easy to create. They're written in Ruby and can access any
part of your Rails app, such as a model.

### Rack

Rack is a piece of middleware that sits between the Rails router and the web
server (e.g., Puma), receiving HTTP requests from the server and generating
responses using information from the router. There are many different Ruby
frameworks that expect a request to arrive in a certain way and format their
responses in a certain way, and many different web servers that expect the same.
Rack ensures that every server can interface with every framework.

### Puma

Beginning with version 5, Rails ships with the Puma HTTP server. Built around a
fast Ragel HTTP parser and tailored specifically to run only Rack applications,
Puma is both very fast and very light, typically requiring less memory usage
than other comparable web servers. Unlike its Rails predecessor WEBrick, it is
also multi-threaded, meaning that it can handle multiple requests concurrently.

## Other Frameworks

### Sinatra (Ruby)

While both frameworks are coded in Ruby, Sinatra is a lot smaller and simpler
than Rails, and can be very useful for small apps. It's easy to make simple
requests and present information, but code can get large and messy when trying
to accomplish more complex tasks, such as interacting with a database or
presenting complex views. To make Sinatra scalable, we'd have to essentially
implement code that comes packaged with Rails, such as ActiveRecord. For large
applications, it is probably easier to use a more robust framework.

### Node.js (JavaScript)

Node.js is part of the MEAN stack. The MEAN stack consists of four JavaScript
technologies (MongoDB, Express.js, AngularJS, Node.js) that can be used together
to create a full stack app, thus allowing developers to only use one language in
all parts of their applications.

Node isn't exactly a framework. It's a runtime environment, which means that it
can run JavaScript code. Like Ruby's gems, Node has packages called modules --
but unlike Rails, which comes with certain gems and functionality packaged into
it, a Node user has to install any modules they want and then write the code to
integrate them by hand.

Node offers a lot of flexibility because a developer can choose exactly which
modules they want to include, but developing in Rails can be significantly
faster because Rails has such strong defaults.

### Django (Python)

Django is also an MVC framework, but where Rails follows the principles of CoC
and leverages the readability of Ruby, Django is written in Python, which
follows a principle of "explicit is better than implicit." This means that
Django code is easy to read and understand because every bit of functionality is
explicitly written into every file - but it also means that a developer will
have to write all that code.

Using Rails over Django comes down to preference. Some developers prefer having
a lot of the boilerplate done for them, and some prefer seeing and writing
exactly how their server will construct a response.

### Spring MVC (Java)

Spring MVC is a Java framework. There are a lot of resources available for
Spring, and more resources are continuing to be developed. However, Spring can
be very slow. In order for code changes to take effect, Spring has to be
completely restarted, which can take a lot of time - in contrast with Rails,
which allows for most code changes to be seen upon simply refreshing the page.
It has very few built-in tools. It also suffers from lack of scalability,
because any kind of I/O holds up a thread and slows down the application. In
today's world of single-page apps with constant user input, this is a serious
drawback.

### Play! (Scala)

Play! can be written in either Scala or Java, and was built to be a more dynamic
framework that Java developers would be able to use. Unlike Spring, it supports
hot reload, allowing for changes to the code to be seen upon refresh. It also
has a lot more built-in functionality and is much more responsive than Spring.

One of the real strengths of Rails is its gem library. Play! suffers from a lack
of plugins. However, Scala is a faster language than Ruby, and that means that
Play! can be faster and therefore more scalable than Rails.

### ASP.NET MVC(.NET)

ASP.NET is developed by Microsoft and meant to be an MVC framework for .NET
languages. Many .NET languages, such as C#, are supported. As a Microsoft
product, it's particularly suited for development on Windows machines, unlike
Rails, whose gems expect Unix-like behavior. A lot of enterprise projects are
already built with .NET code, and it's easy to build an ASP.NET framework over
them.

Rails and ASP.NET are fairly similar, and often the decision to use one over the
other comes down to language preference between Ruby and C# or other .NET
languages.

### Laravel (PHP)

PHP is the most popular server-side language in use, and Laravel, although
fairly young, is its most popular framework. It was developed with modern
architecture in mind, including support for user authentication, recurring
billing services, and scheduling periodically executed tasks. PHP is an easier
language to learn than Ruby, but is more verbose and was designed to be a
scripting language. Laravel requires the code it runs to be more explicit; it
lacks the power of Rails's implicit conventions. However, for this reason, it is
more flexible because Rails is such a structured framework.
