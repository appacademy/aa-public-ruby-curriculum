# Action Cable Demo: Part I

In this demo, you will create a chat app. Logged in users can create chat rooms
and post messages in these rooms. Users can also send an emoji reaction, which
will appear next to their username in the list of users in the room. Messages can
mention other users by including `@<username>`, and users can view messages
that mention them via a dropdown in the navbar.

Start by downloading the [demo skeleton][starter]. Follow the typical setup
routine: `bundle install`, `rails db:setup`,  `npm install`, and finally `npm
start`.

The core message and mention CRUD have already been built out, and the UI is
complete. All that needs to be added is real-time functionality via Action
Cable: new messages, mentions, and reactions should automatically appear without
requiring a refresh, and the list of users in a room should automatically update
as users enter and leave.

Some notes:

- In order to cut down on sprawl, some files have been combined: e.g., actions
  and reducers are combined into a single file for each resource.
- `BrowserRouter` is used instead of `HashRouter`. This takes away the `#` from
  frontend routes. Since frontend routes are now part of the actual URL, in
  `routes.rb`, all GET requests, except those whose path starts with `api/`, are
  routed to `static_pages#root`.
- Keys in requests are getting transformed from camelCase to snake_case
  because of a `before_action` added in `ApplicationController`. Likewise,
  keys in Jbuilder responses are getting transformed from snake_cake to
  camelCase because of the line `Jbuilder.key_format camelize: :lower`
  added to `config/environment.rb`.
- If you ever want to re-seed your database, run `rails db:seed:replant`. This
  is a new command in Rails 6 that first destroys all existing records in your
  database before running `seeds.rb`.

## General Action Cable Setup

1. Run `npm install @rails/actioncable`

2. Add a `consumer.js` file with the following code to the top level of your
   `frontend` folder:

  ```js
  import { createConsumer } from "@rails/actioncable";
  export default createConsumer();
  ```

3. Add `<%= action_cable_meta_tag %>` to the `head` of `application.html.erb`.
   `createConsumer` in `consumer.js` uses the generated meta tag to retrieve the
   URL at which your Action Cable server is hosted. By default, it's just
   `/cable`.

4. Identify the user associated with each WebSocket connection by adding the
  following to `ApplicationCable::Connection`:

  ```rb
  # app/channels/application_cable/connection.rb

  # this line lets you call `current_user` directly from your channel instances
  identified_by :current_user

  def current_user
    @current_user ||= User.find_by(
      session_token: request.session[:session_token]
    )
  end
  ```

  This looks similar to your typical `ApplicationController#current_user`.
  However, a `session` getter isn't defined for `ApplicationCable::Connection`,
  so you need to access `session` via the `request` object.
  
  (*Note:* you actually have access to this `request` object in your controllers
  as well. Within a controller action, `request.session == session` will return
  `true`. [Read more here.][request])

  Awesome - you've now set up the basic infrastructure needed for Action Cable!
  Next, you'll build some channels and subscriptions on top of this
  infrastructure to make the app come to life!

  [request]: https://guides.rubyonrails.org/action_controller_overview.html#the-request-object

## Live Chat

You'll start by creating a `RoomsChannel`, which the client will subscribe to in
the `Room` component. When a new message is created in that room, `RoomsChannel`
will broadcast it to everyone subscribed to that room's stream.

### Broadcasting New Messages
  
1. **(Frontend)** In the `Room` component (`frontend/components/room.jsx`), add
  the following to subscribe to a room's channel upon entering it, and
  unsubscribe upon leaving.

  ```js
  // frontend/components/room.jsx

  // Add the following import at the top of the file:
  import consumer from '../consumer';

  class Room extends React.Component {
    // ...
    enterRoom() {
      // ...
      // Add the following lines to create a subscription:
      this.subscription = consumer.subscriptions.create(
        { channel: 'RoomsChannel', id: roomId },
      );
    }

    componentDidUpdate(/* ...destructured prevProps... */) {
      // ...
      if (prevRoomId !== curRoomId) {
        // Add this line to unsubscribe from previous room upon switching rooms:
        this.subscription?.unsubscribe();
        this.enterRoom();
      } // ...
    }

    // Add a componentWillUnmount to unsubscribe on leaving the room show page:
    componentWillUnmount() {
      this.subscription?.unsubscribe();
    }
    // ...
  }
  ```

2. **(Backend)** Create a new file `rooms_channel.rb` in `app/channels`:

  ```rb
  # app/channels/rooms_channel.rb

  class RoomsChannel < ApplicationCable::Channel
    def subscribed
      @room = Room.find_by(id: params[:id])
      stream_for @room
    end
  end
  ```

3. **(Backend)** Broadcast every new message in `MessagesController#create`:

  ```rb
  # app/controllers/api/messages_controller.rb

  def create
    # ...
    if @message.save
      # Add the following line to broadcast to subscribers of @message.room:
      RoomsChannel.broadcast_to(@message.room, @message)
      # ...
    end
  end
  ```

4. **(Frontend)** Add a second argument to `consumer.subscriptions.create` in
   the Room component's `enterRoom` method, to handle broadcasts from the
   server:
  
  ```js
  // frontend/components/room.jsx

  this.subscription = consumer.subscriptions.create(
    { channel: 'RoomsChannel', id: roomId },
    {
      received: message => {
        console.log('Received message: ', message);
      }
    }
  );
  ```

  Time to test what you've written so far. Start up the server (`rails s`), open
  localhost in your browser, and login as Garfield. Enter "Garfield's First
  Room". This should trigger the Room component's `componentDidMount`, which
  invokes `enterRoom` where you subscribe to this room's stream.

  Confirm that the subscription was created by looking in your server log. You
  should see somewhere: `RoomsChannel is streaming from rooms:<long-string>`.
  (If you instead see `Subscription class not found: "RoomsChannel"`, make sure
  that `rooms_channel.rb` is in the `app/channels` folder and not in
  `app/channels/application_cable`.)

  Next, in a second browser (or incognito window), open localhost, login as
  Sennacy, and enter "Garfield's First Room". Try putting both browser windows
  side by side. With the DevTools open in both browsers, send a message as
  Sennacy. The chat room won't update yet--that comes next--but you should see
  the message logged in both browser consoles! Awesome!

### Rendering Broadcast Messages

To render the new message, you'll need to make a few tweaks; instead of straight
up broadcasting the message model, you'll want to use the `messages/show`
Jbuilder view, with its additional `user` data and automatic transformation of
keys into camelCase. Then, on the frontend, you can dispatch this data to the
Redux store.

5. **(Backend)** Broadcast the `messages/show` Jbuilder view instead of the
  message model.

  First, add a `from_template` helper method to `ApplicationController`, which
  renders a Jbuilder template, returning a Ruby `Hash`:

  ```rb
  # app/controllers/application_controller.rb

  def from_template(template, locals = {})
    JSON.parse(self.class.render(:json, template: template, locals: locals))
  end
  ```

  Note that `from_template` calls `ApplicationController::render`, which is
  similar to the instance method of the same name. Instead of actually sending a
  response to the user, though, it merely returns a string of the response body.

  Next, use this helper method to refactor the new message broadcast in
  `MessagesController#create`:

  ```rb
  # app/controllers/api/messages_controller.rb

    RoomsChannel.broadcast_to @message.room,
      from_template('api/messages/show', message: @message)
  ```

  Check that the broadcast data logged in the browser now has camelCase keys and
  matches the shape of the `messages/show` Jbuilder view.

6. **(Frontend)** In the `received` subscription callback passed to
   `consumer.subscriptions.create`, handle this broadcasted message data by
   putting it into the Redux store instead of logging it to the console:

  ```js
  // frontend/components/room.jsx

  received: ({ message, user }) => {
    this.props.receiveMessage(message);
    this.props.receiveUser(user);
  }
  ```

  Now that all new messages are getting put into the Redux store, you can
  simplify the `.then` callback in `handleSubmit`:

  ```js
  // frontend/components/room.jsx

  createMessage({ body, roomId, authorId }).then(() => {
    this.setState({ body: '' });
  });
  ```

  After broadcasting in `MessagesController#create` (in
  `app/controllers/api/messages_controller.rb`), you no longer need to render
  the `show` view. Change `render :show, locals: { message: @message }` to
  `render json: nil, status: :ok`.

  Test your app again, remembering to refresh both browsers to get the latest
  JavaScript. New messages should now automatically appear for both users!

  This may be all the complexity you'll need for Action Cable in your own app.
  Take some time to review the steps above, tweaking things, adding console logs
  and debuggers, etc., to get a handle on what's going on.

### Broadcasting the Deletion of Messages

Unfortunately, if you delete a message in one browser, it won't automatically
disappear in the other. Let's change that.

7. **(Backend)** Broadcast the deletion of a message.

  Now that you are introducing multiple types of broadcasts, you'll want to
  handle each of them on the frontend differently. Taking a cue from Redux
  reducers, add a `type` key to each broadcast.

  In `MessageController#create`, refactor the new message broadcast:

  ```rb
  # app/controllers/api/messages_controller.rb

  RoomsChannel.broadcast_to @message.room,
    type: 'RECEIVE_MESSAGE',
    **from_template('api/messages/show', message: @message)
  ```

  The `**`, or double splat, spreads out the key-value pairs from the `Hash`
  returned by `from_template`, so they can be merged with the `type` key-value
  pair to form a single `Hash`.

  Now, you can add a `DESTROY_MESSAGE` broadcast in the `destroy` action:

  ```rb
  # app/controllers/api/messages_controller.rb

  def destroy
    # ...
    RoomsChannel.broadcast_to @message.room,
      type: 'DESTROY_MESSAGE',
      id: @message.id
    # ...
  end
  ```

8. **(Frontend)** Refactor the `received` subscription callback passed to
   `consumer.subscriptions.create` to use a `switch` statement for handling
   different broadcast types. Include a case for the new `DESTROY_MESSAGE`
   broadcast type:

  ```js
  // frontend/components/room.jsx

  received: ({ type, message, user, id }) => {
    switch (type) {
      case 'RECEIVE_MESSAGE':
        this.props.receiveMessage(message);
        this.props.receiveUser(user);
        break;
      case 'DESTROY_MESSAGE':
        this.props.removeMessage(id);
        break;
      default:
        console.log('Unhandled broadcast: ', type);
        break;
    }
  }
  ```

  Remove the now superfluous `.then` callback in `handleDelete`:

  ```js
  // frontend/components/room.jsx

  handleDelete(messageId) {
    destroyMessage(messageId);
  }
  ```

  Go ahead and test out that deleted messages get automatically removed in
  both browsers!

### Live Mentions

Next, you'll integrate Action Cable with mentions. Pay attention to the patterns
that carry over from setting up the `RoomsChannel`.

1. **(Backend)** Define `MentionsChannel` and broadcast new mentions in
  `MessagesController#create`:

  In a new file, `app/channels/mentions_channel.rb`:

  ```rb
  class MentionsChannel < ApplicationCable::Channel
    def subscribed
      stream_for current_user
    end
  end
  ```

  In the `MessagesController`:

  ```rb
  # app/controllers/api/messages_controller.rb

  def create
  # ...
    if @message.save
      # Add the following to broadcast to users mentioned in this message:
      @message.mentions.includes(:user, message: [:room]).each do |mention| 
        MentionsChannel.broadcast_to mention.user,
          type: 'RECEIVE_MENTION',
          **from_template('api/mentions/show', mention: mention)
      end
      # ...
    end
  end
  ```

  Note that a message's mentions are automatically generated in an
  `after_create` callback defined in `Message` (see `app/models/message.rb`).

2. **(Frontend)** Subscribe to `MentionsChannel` in the `Mentions` component:

  ```js
  // frontend/components/mentions.jsx
  
  // Add this import at the top of the file:
  import consumer from '../consumer';
  // ...
  componentDidMount() {
    // ...
    this.subscription = consumer.subscriptions.create(
      { channel: 'MentionsChannel' },
      {
        received: ({ type, mention, message, user }) => {
          switch (type) {
            case 'RECEIVE_MENTION':
              this.props.receiveMention(mention);
              this.props.receiveMessage(message);
              this.props.receiveUser(user);
              this.setState({ hasUnseen: true });
              break;
            default:
              console.log('Unhandled broadcast: ', type);
              break;
          }
        }
      }
    );
  }

  // Unsubscribe in a componentWillUnmount
  componentWillUnmount() {
    this.subscription?.unsubscribe();
  }
  ```

  All of the render and Redux logic is already taken care of, so it's time to
  test this out! Send a message from Sennacy, with the text `@garfield`
  somewhere in the body. Garfield should automatically receive this mention!

## Next Steps

Move on to Part II to see examples of more advanced usages of Action Cable, or
jump ahead and check out the [solution][solution]. Visit the Basic Workflow
reading for a high-level, generalized summary of the steps you took above.

[skeleton]:
[solution]:
