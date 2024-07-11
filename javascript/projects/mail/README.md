# Mail

Today, you're going to make a single-page email client similar to Gmail.

Some of the benefits of a single-page application include:

- More responsive user experience because you don't need to complete a
  request/response cycle for every user interaction.
- Similar feeling to a native, desktop application.
- Decoupling of server architecture from user interface gives flexibility and
  opportunity for scaling.

[**Live Demo!**]: http://appacademy.github.io/curriculum/mail/

## Learning Goals

- Understand the basics of how to make a [single-page
  application][single-page-app]
- Know how to change a URL's hash fragment
- Know how a frontend router works
  - Know how to listen to changes in the hash fragment
  - Know how to conditionally render different HTML based on the route
- Understand the purpose of separating concerns
  - Know why we write display code in components
  - Know why we write data management code in our store

Several frameworks facilitate the process of creating single-page
applications, but it is important to understand the fundamental WebAPIs and
the logic that they all use.

You will also practice managing client-side data using good modular code design.

## Phase 0: Setup

- Download the [skeleton][mail-skeleton].
- Create an `index.js` file in the `src` directory that contains
  `console.log("It's working")`.
- Open up a new terminal tab, `cd` into your `skeleton` directory, and run
  `npm init -y`
- Install `webpack` and `webpack-cli`
- In the newly created `package.json` file, under the `scripts` key, add a
  `start` script that runs `webpack --watch --mode=development`
- From a new terminal tab, run `npm start`
- Open `dist/index.html` in your browser and test that you see `It's working` in
  the console.

[mail-skeleton]:
  https://assets.aaonline.io/fullstack/javascript/projects/mail/skeleton.zip

## Phase I: Routing

In order to have a single-page application, we need a system for "routing" to
different parts of our application. We need to create a system that makes it
look like you are navigating to different pages but just uses JavaScript to
manipulate the DOM instead of making a new HTTP request.

There are different ways of accomplishing this "routing" process. We will employ
the common technique of changing the [hash fragment][hash-fragment]. When the
URL of a page changes so that **only** the hash fragment changes, your browser
will not make a new HTTP request. Instead, it will emit a `hashchange` event. We
will add an event listener for this event, and then use javascript to update the
DOM based on the new hash fragment.

This way, we can modify both the URL and the DOM without triggering a new HTTP
request.

### Triggering Route Changes

We're going to let users navigate our site by clicking on the items in the sidebar.
Clicking a sidebar item will change the hash fragment and content of our page.

#### `index.js`

- Remove your `console.log` test.
- Use the WebAPI (i.e. vanilla DOM method) to add an event listener for
  `DOMContentLoaded`.
  - In the callback, add an `click` event listener for each `.sidebar-nav li`
    that does the following:
    - Gets the `innerText` of the element; this will be our new location.
    - Call `toLowerCase` on the name to make sure there aren't case differences.
    - Set `window.location.hash` to the lower-cased location name.

Test that clicking on your sidebar items:

- Changes the hash fragment in the URL.
- Doesn't make a new request. You can do this easily by setting a variable in
  the console in the Dev Tools. If it is still defined after clicking the
  sidebar element, you have not made a new request.

### Handling Route Changes

#### Create a `Router`

- Create a `router.js` file.
- In `router.js`, create a constructor function `Router` that takes a `node`
  argument. This `node` will be a pointer to the DOM Node that the router should
  be modifying the contents of.
  - Save `node` to `this.node` so we can use it later.
- Create prototype methods `start`, `activeRoute`, and `render`.
  - `start`
    - Add an event listener for `hashchange` and call `render` in the callback
      - This will make the Router update the DOM every time the hash fragment
        changes.
    - Immediately call `render` upon `start()` so that if someone opens a link
      to a URL with a hash fragment, or if they refresh with a hash fragment,
      the router will still update the DOM.
  - `render` - This function will update the DOM by changing the content of
    `this.node`.
    - Clear `this.node` using `innerHTML = ""`. This will remove anything left
      over from a previous route.
    - Call `this.activeRoute()` to get the name of the current route. We will
      write this function soon.
    - Create a new `<p>` DOM Node using `document.createElement` to display the
      new route name that is being inserted into the DOM.
    - Set the `innerHTML` of the new DOM Node to the route name returned from
      `this.activeRoute`.
    - Insert the new DOM Node into `this.node` with `appendChild`
  - `activeRoute` - This function will initially just return the name of the
    currently active route.
    - Get the hash fragment using `window.location.hash`.
    - Remove the `#` character.
    - Return the result.

#### Use your `Router` in `index.js`

- Require your `Router` constructor.
- Modify the `DOMContentLoaded` callback:
  - Get the `.content` DOM Node with `document.querySelector`. This is DOM Node
    we'll be updating with the `Router`.
  - Create a `new Router`, passing in the `.content` node.
  - `start()` your new router.

Test that clicking on the sidebar items changes the content of the page AND that
we are not making new HTTP requests.

## Phase II: Displaying Messages

Let's make something more interesting happen when the route changes. We could do
all the logic of creating DOM Nodes for each route in the router itself like we
are now, but it's better to separate "view" logic into separate modules that
will be responsible for returning a DOM Node to display. These modules are
called "components".

### Routing to Components

#### `Inbox`

- Create an `Inbox.js` file that will export our `Inbox` component.
  - The `Inbox` component should be a JavaScript object.
  - Create a property on the `Inbox` called `render` that is a function that
    returns a DOM Node.
    - In `render`, create a container `<ul>` DOM Node using
      `document.createElement`.
    - Set the class name of the container to `messages` using the `className`
      property. This puts our CSS styles onto the node.
    - For now, set the `innerHTML` of the container to `"An Inbox Message"` so
      we can test that the component works.
    - Return the `<ul>` container.

#### `index.js`

Let's create a mapping from `routes` to `components`. This will allow us to
specify the routing configuration from outside of the router. Separating the
configuration logic from the routing logic promotes [separation of
concerns][separation-of-concerns].

- Create the `routes`
  - Create an object called `routes`. You don't need to create this inside the
    `DOMContentLoaded` callback. We could theoretically load this in from
    another file, but our `routes` will be simple enough to include in
    `index.js`.
  - We are going to format this object so that its properties will be the names
    of routes, i.e. `compose`, `inbox`, and `sent`.
  - For now, just create one route by setting an `inbox` property with a value of
    the `Inbox` component (**Make sure you require the `Inbox` module**).
- Let's give the routes to the router.
  - Pass the `routes` object as a second argument to the `Router` constructor
    function. We will make use of this additional argument in the next part.

#### `router.js`

- Change the `Router`.
  - Add a second parameter to the constructor function called `routes`.
  - Save `routes` to `this.routes`.
- Change `activeRoute`.
  - `activeRoute` should return the component that matches the current route
    instead of just returning the name of the route.
  - Look up the appropriate component for the current route by accessing the
    `this.routes` object using the location name you retrieved from the hash.
    **Make sure you have removed "#" from the name.**
  - Return the component.
- Change `render`.
  - Now that `activeRoute` returns a `component`, we need to tweak `render`.
  - Save the result of calling `activeRoute` to a variable called `component`.
  - There is a chance that no component will be returned from `activeRoute` if a
    user navigates to an incorrect hash fragment.
  - If `component` is not defined, then `render` should just clear `this.node`
    with `this.node.innerHTML = ""`
  - If `component` is defined, then we want to render the component into
    `this.node`
    - Clear `this.node` as before.
    - Call `component.render()` to retrieve the DOM Node returned by the
      component.
    - Use `appendChild` to insert the DOM Node into `this.node`.
- Test that clicking on the `Inbox` link in the sidebar inserts
  `An Inbox Message` onto the page.
- Test that clicking on the other sidebar links clears the page.

### Rendering Data from Components

Now that we have the core pieces of our single-page application, we can add any
cool new component and corresponding route that we want, and everything should
work.

Before our components can render anything particularly interesting, however, we
will need a data source to give them something to work with.

Just like we separated our `router` from our `components`, we are going to make
a separate module to store our data and expose an API for retrieving and
manipulating it.

#### `MessageStore`

- Create a file called `message_store.js`.

- Create a local variable in this file called `messages`. This variable will
  store all of the e-mail messages for our application. Instead of directly
  exporting `messages` itself, we are going to export a separate `MessageStore`
  object that closes around `messages`. This way, code in other modules will not
  be able to directly change `messages`; instead, they will have to go through
  `MessageStore`, which will act as our API for accessing `messages`.

- Let's fill the `messages` object with some seed data that our components will
  able to display.

  - Create two properties on the object: `sent` and `inbox`.
  - These two properties will store an `array` of messages for their particular
    folder.
  - Each `array` will contain objects representing individual messages.
  - You should format the messages so they have the following properties: `to`,
    `from`, `subject`, and `body`.
  - Here is an example:

    ```js
    let messages = {
      sent: [
        {
          to: "friend@mail.com",
          subject: "Check this out",
          body: "It's so cool"
        },
        { to: "person@mail.com", subject: "zzz", body: "so booring" }
      ],
      inbox: [
        {
          from: "grandma@mail.com",
          subject: "Fwd: Fwd: Fwd: Check this out",
          body:
            "Stay at home mom discovers cure for leg cramps. Doctors hate her"
        },
        {
          from: "person@mail.com",
          subject: "Questionnaire",
          body: "Take this free quiz win $1000 dollars"
        }
      ]
    };
    ```

- Now that we have some data, let's create the functionality for working with
  it.
  - Create a new object called `MessageStore`.
  - Create the following functions as properties on this object:
    - `getInboxMessages`: a function that returns the array at `messages.inbox`.
    - `getSentMessages`: a function that returns the array at `messages.sent`.
  - Make sure set `module.exports` to `MessageStore` at the end of the file.

#### Modify your `Inbox`

Now that we have a data source to work with let's change our `Inbox` component
to render it.

- Require the `MessageStore` so we can access our messages.
- `render`

  - Instead of just inserting `"An Inbox Message"` into the `innerHTML` of the
    container `<ul>` DOM Node, we are going to append a new DOM Node into the
    container for each message in the inbox.
  - First, we need to get all of the messages in the inbox. Call
    `MessageStore.getInboxMessages()` to retrieve them from the store.
  - Now iterate over the inbox messages array so we can put each message into
    the container.
    - In order to keep `render` nice and clean, we're going to rely on a
      `renderMessage` function that we will write later. This function will
      render a DOM Node for a given message.
    - When you iterate over each message, first call `this.renderMessage` and
      pass in the current message to get a DOM Node for that message.
    - Then call `appendChild` on the container and pass it the DOM Node returned
      from `renderMessage`.

- `renderMessage`

  - Add a new function to the `Inbox` component that takes a `message` object as
    a parameter and returns a new DOM Node for that message.
  - First, create a new `<li>` DOM Node that we will return after we've populated
    it.
  - Give the `<li>` a class of `message` using the `className` property to apply
    our styling.
  - Now set the `innerHTML` of the `<li>` to the following:
    - A `<span>` with class `from` with content `message.from`.
    - A `<span>` with class `subject` with content `message.subject`.
    - A `<span>` with class `body` with content `message.body`.
  - Using a [template literal][template-literals] will make this easier by
    letting you interpolate as you would with an `html.erb` file.
  - Return the `<li>` DOM Node.

- Test that clicking on the inbox link displays all your messages.
- Now that your inbox works, make the application immediately route to the inbox
  by using `location.hash` to route to `#inbox` inside the `DOMContentLoaded`
  callback. **Make sure this happens after the router starts**.

## Phase III: `Sent` Component

After setting up routing and creating a store for our data, creating another
component should be easy.

### `sent.js`

- The `Sent` component should be almost identical to the `Inbox` component. It
  should look exactly the same, but make the following changes:
  - `render`
    - Retrieve the sent messages instead of the inbox by calling
      `MessageStore.getSentMessages`.
  - `renderMessage`
    - Replace `<span class="from">${message.from}</span>` with
      `<span class="to">To: ${message.to}</span>`, so we display the recipient
      instead of the sender in the sent folder.

### `index.js`

- Add a route for the `Sent` component by adding a property to `routes` called
  `sent` with a value of the `Sent` component. **Remember to require the Sent
  component**.

## Phase IV: `Compose` Component

_(Read this entire section before coding, as there is more context to process)._

Now let's add a new component that will allow us to write new e-mails. The
process will be the same as making the `Inbox` and `Sent` components with a few
key differences:

- The component will have a more complicated structure for the DOM Node it needs
  to render.
- We will need to add event listeners in order to give our component a
  few key pieces of functionality:
  1. We want to store the message being drafted somewhere in memory. If the
     currently drafted message only exists as a value in the fields of a form,
     then as soon as the form is unmounted from the DOM then you will lose the
     contents of your draft. For example, if you are writing a message and you
     then click on the inbox tab, this will delete your drafted message. We need
     to add a listener to the form so that every time the value changes we
     update the copy that we're storing in memory.
  2. The default behavior when a form is submitted is to make a new request to
     the current URL (or the one specified in the form) with the contents of the
     form. This would cause a reload of the entire page and completely ruin the
     single page application architecture we are going for. Therefore we will
     add another listener on the form so that when it is submitted, we prevent
     the default behavior and handle the submission according to our own logic.

### Add message drafts to `MessageStore`

Let's make a couple of additions to our `messageStore` to provide the logic for
storing message drafts. We are going to make a constructor function to
facilitate creating new message objects. Every time we send a message, we need
to create a new message object; making a constructor function will DRY out our
code.

This conflicts with the way we wrote our seed data, but since the seed data only
really exists for testing purposes, it's alright. In a real mail application we
would not be hard coding messages, but instead fetching them from a server. So
you can leave the seed data as is for now.

**In `message_store.js`:**

- Create a `Message` constructor function.
  - This function should have the following parameters: `from`, `to`, `subject`,
    `body`. Make sure to save these values as instance variables.
- Now we need a place to store the current message draft. Create a variable
  called `messageDraft` and set `new Message`. Drafts always start off blank so
  it is okay if the fields start off blank.
- Add accessor functions to your `MessageStore` for updating/reading
  `messageDraft`:
  - `updateDraftField`
    - This should take two parameters, `field` and `value`, and set the property
      of `messageDraft` specified in `field` to `value`.
  - `sendDraft`
    - Add the current draft to the sent folder by pushing `messageDraft` onto
      the `messages.sent` array.
    - Reset `messageDraft` to a **new** blank message object by calling the
      `Message` constructor.

### Create the `Compose` component.

As with the other components, the `Compose` component will be an object with a
`render` function and a helper function for doing the work of creating the
complicated DOM structure.

- Make a new file as you did for the other components.
- Require the `MessageStore`.
- `render`
  - Create a `<div>` DOM Node that will be returned from this function.
  - Set the class of this node to `new-message` using `className`.
  - Set the `innerHTML` of this node to the result of calling `this.renderForm`.
- `renderForm` - This helper function will build and return the HTML for the
  form.
  - First, get the current message draft so we can make sure to render it into
    the form by calling `MessageStore.getMessageDraft()`.
  - Next we need to build up an `HTML` string for the form. Use a template
    literal to build up the following elements:
    - A `<p>` with class "new-message-header" and content `New Message`
    - A `<form>` tag with class "compose-form" with the following nested inside
      it:
      - An `<input>` tag with the following attributes: `placeholder` =
        `Recipient`, `name` = `to`, `type` = `text`, and `value` = the `to`
        property of the current draft.
      - An `<input>` tag with the following attributes: `placeholder` =
        `Subject`, `name` = `subject`, `type` = `text`, and `value` = the
        `subject` property of the current draft.
      - A `<textarea>` with the following attributes: `name` = `body` and `rows`
        = `20`.
        - In order to change the inside of the `<textarea>` to contain the
          `body` of the current message, you need to put it between the two
          tags. `<textarea>Here's some text</textarea>`.
        - `<textarea value="Here's some text"></textarea>` will not work.
      - A `<button>` with the following attributes: `type` = `submit`, `class` =
        `btn btn-primary submit-message` and content `Send`.
        - Set the content by placing it between the tags, as we did with
          `<textarea>`.
    - Return this content string at the end of the function.

### Add `Compose` to `index.js`

Require `Compose` in `index.js` and add a new route for your `Compose` component
by adding it to your `routes` object. Test that clicking the compose button
renders your compose form.

### Add User I/O to `Compose`

Finally we will add the event listeners to our `Compose` function to make it
respond to user actions.

Update the message draft whenever the form changes:

#### render

    * Add an event listener to the container `<div>` on a `change` event.
    * This event listener will be called any time one of the fields in the form
      fires a `change` event because the event will propagate up.
    * The handler function should receive one `event` argument.
    * You can retrieve the element that fired the event by accessing the
      `target` property of the `event`.
    * Get the name of the field that changed through the `name` property of the `target` element.
    * Get the value of the field that changed through the `value` property of the `target` element.
    * Tell the `MessageStore` to update the contents of the `messageDraft` to
      match the form by calling `MessageStore.updateDraftField`.
      * Pass in the name of the field to change as the first argument and the value of the field to change as the second argument.
    * Test that if you fill out the form and click `Inbox` or `Sent` before
      submitting and then navigate back to compose form, the form is still filled
      out.

- Send the new message when the form is submitted:
  - Add an event listener to the container `<div>` on a `submit` event.
  - This event listener will be called when the `form` fires a `submit` event.
  - The handler function should do the following:
    - Prevent the default behavior of the `submit` event by calling
      `preventDefault()` on the event object.
    - Tell the `MessageStore` to send the current draft by calling
      `MessageStore.sendDraft()`
    - Navigate back to the inbox by changing the hash fragment using
      `window.location.hash`.
  - Test that when you submit the form you are redirected to the `Inbox`.
  - Test that your `Sent` folder contains the message you sent.

[template-literals]: tagging-template-literals--bonus-
[separation-of-concerns]: https://en.wikipedia.org/wiki/Separation_of_concerns
[hash-fragment]: https://en.wikipedia.org/wiki/Fragment_identifier
[single-page-app]: https://en.wikipedia.org/wiki/Single-page_application
