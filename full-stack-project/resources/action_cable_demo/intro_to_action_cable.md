# Introduction to Action Cable

Action Cable is a framework for integrating WebSockets with a Rails application.
It allows you to include real-time features in your application, like live chat
or push notifications.

## WebSockets

WebSockets is a communication protocol between clients and servers that is an
alternative to HTTP. Like HTTP, WebSockets is built on the TCP protocol. Unlike
HTTP, though, WebSockets is fully 2-way, or *duplex*:
  
- With HTTP, the only way for a server to send data to a client is by the
  client's initiating a request to the server.
- With WebSockets, a server can send data to a client without an explicit
  request from the client.
  
In the context of live chat, for example, this means that new messages can be
pushed to the client without the client having to ask the server, 'Any new
messages?'.

Unlike the stateless request-response cycle of HTTP, a client using WebSockets
will establish a persistent *connection* with a server, usually upon loading the
web app.

As long as this connection is open, the client and server can freely send data
to each other. The connection stays open until either the server or the client
explicitly closes it, although many WebSocket frameworks will automatically take
care of closing and/or re-opening connections for you when you close tabs,
experience network interruptions, etc.

Because connections are persistent, and thus stateful, servers need to store
data about connections somewhere. An on-disk database such as Postgres would
work; however, it would be quite slow. For this reason, many apps use the
`Redis` library to manage WebSocket connections. `Redis` keeps an *in-memory*
key-value data store, which is much faster than a traditional database. It's the
default option for the Rails production environment.

## The Model: Pub/Sub, Streams, and Channels

Many WebSocket frameworks, including Action Cable, build a Pub/Sub
(Publish/Subscribe) model on top of this basic connection infrastructure. This
is a way of organizing what data the server should send to which connected
clients.

Imagine the simplest possible WebSocket system: a news app that, whenever a new
story comes in, broadcasts a notification to every connected client. It's easy:
every connected client receives every broadcast. But this system wouldn't work
for a chat room app. When a new message gets posted, only the  users in that
same room should receive a broadcast containing the new message.  

In a Pub/Sub model, clients can *subscribe* to a particular subset of all the
broadcasts the *publisher* (server) sends out; in Action Cable, each subset is
called a *stream*.

The way it works: every broadcast belongs to a particular stream identified by a
unique string — say, `chat_room_12`. When a client subscribes to a stream, this
means they want to receive every broadcast belonging to that stream. Then, for
every broadcast, the server checks to see which clients have subscribed to the
broadcast's associated stream, and sends it only to those clients.

Most WebSocket frameworks will add on more layers of abstraction to this
Pub/Sub model. In Action Cable, `channels` are used to organize streams. Let's
say that in addition to a `chat_room_12` stream, there are `chat_room_14` and
`chat_room_312` streams. Clearly, all of these streams are alike; with Action
Cable, they'd be managed by the same channel.

Channels are roughly analogous to controllers: just like HTTP requests related
to users might go through the `UsersController`, subscriptions to chat room
streams might go through the `ChatRoomsChannel`.

## Action Cable: The Basics

Action Cable, like most WebSocket frameworks, features both a client-side
library and a server-side library. Both are included when you start a new Rails
project: the server-side library is built into Rails proper, and the client-side
JavaScript library, `@rails/actioncable`, is included in the default Rails
`package.json`.

*Note*: if you created your Rails project with the `--skip-javascript` flag,
you'll need to `npm install @rails/actioncable` yourself.

### Backend

Your backend Action Cable files live in `app/channels`. It starts with two
files, `connection.rb` and `channel.rb`, in a subdirectory `application_cable`:

- `connection.rb` defines `ApplicationCable::Connection`. A single instance of
  this class is created for each client that opens a WebSocket connection with
  the server.
  - Usually, you'll add methods here, such as `current_user`, which identify /
    authenticate the user who created the connection.
  - You can't use `ApplicationController#current_user`, unfortunately, as your
    router doesn't create a controller instance when a client opens a
    WebSocket connection.
  - Note that a client can create multiple channel/stream subscriptions, all
    of which use the same underlying *connection*.
- `channel.rb` defines `ApplicationCable::Channel`, which is the parent class of
  each channel you define. Each instance of a channel represents a single
  subscription, which is associated with one (or more) streams.

Inside the `app/channels` folder, you'll create a new file,
`<something>_channel.rb`, for each channel you want to create - roughly one for
each real-time feature your app includes. There, you'll define a class that
inherits from `ApplicationCable::Channel`. For example, `chat_channel.rb` might
look something like this:

```rb
class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "fun_stream_name"
    stream_for Room.find_by(id: params[:id])
  end
end
```

Inside each channel you'll generally define a `subscribed` method, which gets
called after a client subscribes to the channel. In this method, you'll set up a
subscription to a particular stream, often using data passed in with the
subscription request, which is available in `params`.

You can supply the stream's name directly to `stream_from` or, by passing an
Active Record model to `stream_for`, you can let Rails determine the stream
name based on the combination of the current channel and the supplied model.

To send out a broadcast, which you can do from anywhere in your app, such as in
your controller actions, you have two options:

1. If you used `stream_from`:
    `ActionCable.server.broadcast(stream_name, broadcast_data)`

2. If you used `stream_for`:
    `SomeChannel.broadcast_to(model, broadcast_data)`

Since streams are often associated with particular models, `stream_for` is more
commonly used. It's also easier, since you don't have to enforce a consistent
naming convention for streams, and less likely to silently fail, since there's
no risk of misspelling a stream name. For these reasons, `stream_for` should
generally be your go-to option.

In each case, `broadcast_data` can be any serializable object: a string, an
array, a hash, a model (which gets converted to a hash), etc.

### Frontend

A new Rails 6 project will by default include a file
`app/javascript/channels/consumer.js`, with the following code in it:

```js
import { createConsumer } from "@rails/actioncable"
export default createConsumer()
```

This exports a `consumer` object, which represents the client's WebSocket
connection to the server. You'll import this `consumer` object in your component
files in order to subscribe to channels, with `consumer.subscriptions.create()`:

```js
consumer.subscriptions.create(
  { channel: 'NameOfChannel', /* other data needed to set up subscription */ },
  { received: broadcast => {} }
);
```

The first argument is an object that specifies what you want to subscribe to.
The `channel` property is mandatory; any other data is passed along as `params`
to the backend channel.

The second argument should be an object with a `received` function, which will
get invoked whenever a broadcast comes in from the server, with broadcasted data
passed in as an argument.

A `subscription` object is returned, which you can use to unsubscribe by
calling `subscription.unsubscribe()`.

*Note*: If you used the `--skip-javascript` flag when creating your Rails
project, you'll need to create the `consumer.js` file yourself. You can do so at
the top level of your `frontend` folder.

## Deployment

As mentioned earlier, an app using Action Cable needs some system for managing
and keeping track of active connections and subscriptions; this system is called
an 'adapter'.

You can configure adapters for different environments in the `config/cable.yml`
file. The default configuration, which you won't need to change, should look
something like this:

```yml
development:
  adapter: async

test:
  adapter: test

production:
  adapter: redis
  url: <%= ENV.fetch("REDIS_URL") { "redis://localhost:6379/1" } %>
  channel_prefix: action_cable_demo_production
```

The development and production environments use `async` and `test` adapters,
respectively, which both store connection data in-memory in your Rails server.

The production environment uses the `redis` adapter. This adapter requires the
URL of a Redis server, which by default is retrieved from the `REDIS_URL`
environment variable.

To get Action Cable working in your production environment using Redis, you need
to:

1. Install the `redis` gem, by uncommenting it in your Gemfile and running
   `bundle install`.
2. Set up a Redis server, then set the `REDIS_URL` environment variable in your
   production environment to point to this server's URL.

Heroku makes the second step easy. Just go to the Heroku dashboard of your app,
then go to the `Resources` tab. In the `Add-ons` section, search for and add
`Heroku Redis`. You'll need to submit an order form, but don't worry, the
default plan is free. Heroku will automatically set up the Redis server and set
the `REDIS_URL` environment variable for you.

That's it! Now, Action Cable should work in production.

*Note*: if you are making a web service and you would like to allow clients to
connect to Action Cable from other websites or domains, you'll need to
explicitly allow this. Learn how to do this [here][ac-origins].

## Resources

- [Official Rails Action Cable Guide][ac-guide]
- [WebSockets Under the Hood (using Vanilla JavaScript)][websockets-guide]
- [Redis][redis]

[ac-guide]: https://guides.rubyonrails.org/action_cable_overview.html
[websockets-guide]: https://javascript.info/websocket
[redis]: https://redis.io/
[ac-origins]: https://guides.rubyonrails.org/action_cable_overview.html#allowed-request-origins
