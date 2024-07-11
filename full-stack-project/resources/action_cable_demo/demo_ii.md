# Action Cable Demo: Part II

The next two features explore some more advanced ways of using Action
Cable: broadcasting from channels, persisting data in connection instances, and
sending messages from a subscriber to a channel.

## Showing Users in a Room

1. **(Backend)** Broadcast when a user enters and leaves a room:

  ```rb
  # app/channels/rooms_channel.rb

  def subscribed
    @room = Room.find_by(id: params[:id])
    stream_for @room

    # Add these lines to broadcast entering a room:
    self.class.broadcast_to @room, 
      type: 'RECEIVE_USER',
      user: current_user.slice(:id, :username)
  end

  # Define an `unsubscribed` callback method, to broadcast leaving a room
  def unsubscribed
    self.class.broadcast_to @room, 
      type: 'REMOVE_USER',
      id: current_user.id
  end
  ```

  Just as `subscribed` gets called automatically when a client calls
  `consumer.subscriptions.create()`, `unsubscribed` gets called when a client
  calls `subscription.unsubscribe()`.

2. **(Frontend)** Handle entering & leaving broadcasts in the `Room` component:

  ```js
  // frontend/components/room.jsx

  this.subscription = consumer.subscriptions.create(
    { channel: 'RoomsChannel', id: roomId },
    {
      received: ({ type, message, user, id }) => {
        // Add this line:
        const { usersInRoom } = this.state;

        switch (type) {
          // ...other cases...
          // Add the following two cases:
          case 'RECEIVE_USER':
            this.setState({ 
              usersInRoom: { ...usersInRoom, [user.id]: user } 
            });
            break;
          case 'REMOVE_USER':
            const { [id]: _removed, ...remainingUsers } = usersInRoom;
            this.setState({ usersInRoom: remainingUsers });
            break;
          default:
            console.log('Unhandled broadcast: ', type);
            break;
        }
      }
    }
  );
  ```

  Whenever a user enters or leaves a room, the `usersInRoom` property of the
  component state gets updated accordingly. Go ahead and test this out: after
  refreshing both browsers, keep Garfield in "Garfield's First Room", and have
  Sennacy move in and out of the room. You should see Sennacy's username appear
  and disappear on Garfield's screen from the list of users in the room.

  This is pretty great, but when Sennacy enters the room, they don't see
  Garfield is already there. They weren't subscribed when Garfield first entered
  the room. Is there a way to retrieve, upon entering a room, a list of all
  users currently subscribed to that room? There is, with a bit of work.

3. **(Backend)** Persist a list of rooms each user is subscribed to in an
  `@rooms` instance variable defined for each `ActionCable::Connection`
  instance. Then, to get a list of users subscribed to a room, filter all
  active connections for those whose `@rooms` includes the given room.

  Each online user has a corresponding connection instance. The first step,
  then, is to persist a list of rooms each user is subscribed to as an instance
  variable, `@rooms`, of this connection. To do so, you'll define a `rooms`
  getter in `ActionCable::Connection`, which lazily initializes `@rooms` to an
  empty array.

  ```rb
  # app/channels/application_cable/connection.rb

  # Add :rooms as identifier, so you can access directly from channels
  identified_by :current_user, :rooms

  def current_user
    @current_user ||= User.find_by(session_token: request.session[:session_token])
  end

  # Add this @rooms getter
  def rooms
    @rooms ||= []
  end
  ```

  Next, you'll keep `@rooms` up to date by adding and removing rooms in the
  `subscribed` and `unsubscribed` methods of `RoomsChannel`:

  ```rb
  # app/channels/rooms_channel.rb

    def subscribed
      @room = Room.find_by(id: params[:id])
      # Add this line to add current room to list of rooms user is in
      rooms << @room 
      stream_for @room

      self.class.broadcast_to @room, 
        type: 'RECEIVE_USER',
        user: current_user.slice(:id, :username)
    end

    def unsubscribed
      # Add this line to remove current room from list of room user is in
      rooms.delete(@room)

      self.class.broadcast_to @room, 
        type: 'REMOVE_USER',
        id: current_user.id
    end
  ```

  Finally, you'll define `RoomsChannel::online_users`, which takes a room
  instance, filters all active connections to only include those whose `@rooms`
  array include the provided `room`, then maps those connections to the users
  associated with them:

  ```rb
  #app/channels/rooms_channel.rb

  def self.online_users(room)
    ActionCable.server.connections.filter_map do |conn| 
      conn.rooms.include?(room) && conn.current_user
    end.uniq
  end
  ```

4. **(Backend)** Include the list of users present in a room in the
  `rooms/show` response.

  In `RoomsController`:

  ```rb
  # app/controllers/api/rooms_controller.rb

  def show
    @room = Room.find(params[:id])
    # Add this line to save all the users in @room as an instance variable:
    @online_users = RoomsChannel.online_users(@room) << current_user
  end
  ```

  Add the following to the bottom of the `rooms/show.json.jbuilder` view:

  ```rb
  # app/views/api/rooms/show.json.jbuilder

  # ...
  json.online_users do
    @online_users.each do |user|
      json.set! user.id do
        json.partial! 'api/users/user', user: user
      end
    end
  end
  ```

7. **(Frontend)** Add the new `onlineUsers` slice of the `rooms/show` response
  to the `Room` component's internal state.

  Refactor the `fetchRoom` thunk action creator in `redux/rooms.js`:

  ```js
  // frontend/redux/rooms.js

  // Add `onlineUsers` to the destructured properties:
  return API.fetchRoom(id).then(({ room, messages, users, onlineUsers }) => {
    dispatch(receiveMessages(messages));
    dispatch(receiveRoom(room));
    dispatch(receiveUsers(users));
    // Return `onlineUsers` so it becomes the argument to the next `.then`:
    return onlineUsers;
  });
  ```

  In the `enterRoom` function of the `Room` component, after fetching the room
  data, refactor the `.then` callback:

  ```js
  // frontend/components/room.jsx

  // Add an argument of `usersInRoom`, with a default value of {}
  fetchRoom(roomId).then((usersInRoom = {}) => {
    // Add this line to put `usersInRoom` in state:
    this.setState({ usersInRoom });

    if (this.activeMessage.current) {
      this.scrollToMessage();
    } else {
      this.scrollToBottom();
    }
  });
  ```

  Restart your server, refresh your browsers, and test it again. Now, if
  Garfield is already in a room when Sennacy enters, Sennacy should see
  Garfield's username in the list of users in the room.

### Reactions: Sending Data to the Server via WebSockets

The last Action Cable feature you'll add demonstrates the ability to send
messages from a client to the server through an Action Cable subscription.

There are two ways of doing so:

1. `this.subscription.send(data)`
    - The `received` method of the subscription's corresponding backend channel
      is invoked, taking in the client-sent `data` as an argument
    - The following example simply broadcasts out any data that is sent by
      clients:

    ```rb
    class RoomsChannel < ApplicationCable::Channel
      def receive(data)
        self.class.broadcast_to(@room, data)
      end
    end
    ```

2. `this.subscription.perform(action, data)`
    - `action` should be the name of a method defined in the subscription's
      corresponding backend channel. The named method is invoked with `data`
    - For example, if `this.subscription` represents a subscription to the
      `RoomsChannel`, `this.subscription.perform('say_hi')` would invoke
      `RoomsChannel#say_hi`
Why not just send a regular AJAX request that hits a backend route? Sending
client-to-server messages via Action Cable is useful for cases where a user
needs to perform non-RESTful actions that are visible to other
connected users but that don't persist any data to the database.

Live video chat might be an example: a user's webcam video is streamed to other
users live but isn't persisted in any fashion (hopefully).

This app uses a simpler example of fleeting, streamed data: reactions that
expire after 4 seconds.

1. **(Frontend)** In the `generateReactions` helper method of the `Room`
  component, refactor the `onClick` event handler to perform the
  `RoomsChannel#react` whenever a user clicks on a reaction emoji:

  ```js
  // frontend/components/room.jsx

  // change from:
  onClick={() => this.setReaction(this.props.currentUserId, reaction)}
  // to:
  onClick={() => this.subscription.perform('react', { reaction })}
  ```

2. **(Backend)** Define `RoomsChannel#react`, which broadcasts the emoji
  reaction it receives along with the id of the user who performed the
  reaction:

  ```rb
  # app/channels/rooms_channel.rb

  def react(reaction)
    self.class.broadcast_to @room, 
      type: 'RECEIVE_REACTION',
      id: current_user.id,
      **reaction
  end
  ```

3. **(Frontend)** Upon receiving a reaction broadcast, put the reaction in state
  (via the `setReaction` helper method), then set a timeout to remove it from
  state after 4 seconds:
  
  ```js
  // frontend/components/room.jsx
  
  constructor(props) {
    // ...initializing state, creating refs, binding callbacks...

    // Add the following line to keep track of active timeouts:
    this.reactionTimeouts = {};
  }

  // in enterRoom()
  this.subscription = consumer.subscriptions.create(
    { channel: 'RoomsChannel', id: roomId },
    {
      // Add `reaction` to destructured properties
      received: ({ type, message, user, id, reaction }) => {
        switch (type) {
          // ...cases for receiving and removing messages and users...

          // Add this case to set a reaction, then clear it after 4 seconds
          case 'RECEIVE_REACTION':
            window.clearTimeout(this.reactionTimeouts[id]);

            this.setReaction(id, reaction);

            this.reactionTimeouts[id] = window.setTimeout(() => {
              this.setReaction(id, null);
            }, 4000);
            break;
          default:
            console.log('Unhandled broadcast: ', type);
            break;
        }
      }
    }
  );
  ```

  Note: `this.reactionTimeouts` stores each active timeout under a key of the
  reacting user's id. If the same user reacts twice within 4 seconds, the first
  timeout is cancelled, so that their reaction clears 4 seconds after the
  second reaction.
  
## Solution

Take a look at the [solution][solution].

[solution]:
