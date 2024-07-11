# Basic Action Cable Workflow

To start:

1. If you created your Rails project using the `--skip-javascript` flag, then
   `npm install @rails/actioncable` and add a `consumer.js` file at the top
   level of your frontend folder.
2. Add a `current_user` method to
   `app/channels/application_cable/connection.rb`.
3. Add `<%= action_cable_meta_tag %>` to the `head` of `application.html.erb`.

Then, for each real-time feature of your app:

1. Create a channel file in `app/channels`, defining a class that inherits
    from `ApplicationCable::Channel`
    - At the very least, define a `subscribed` method, using
      `stream_for(model)` or `stream_from(string)` to connect the
      subscribing user to a stream.
2. In the relevant frontend component:
    - import consumer
    - create a subscription in `componentDidMount` (and possibly
      `componentDidUpdate`, for a routed show page), using
      `consumer.subscription.create()`:
        - *first argument*: an object with a `channel` property, and any params
          your `subscribed` method on the backend needs
        - *second argument*: an object with a `received` property, pointing to a
          callback that gets invoked for each broadcast of the subscription's
          stream
    - unsubscribe in `componentWillUnmount` (and possibly `componentDidUpdate`)
3. In your backend controllers and/or channels, broadcast data to a stream by
   calling:
    - `SomeChannel.broadcast_to(model, data)`, if you used `stream_for`
    - `ActionCable.server.broadcast(stream_name, data)`, if you used
      `stream_from`
