# Express

The 'E' in MERN stands for Express.

## Learning Goals

- Understand what Express is
- Understand Express's role in the MERN stack

### What is Express?

Express is a web application framework for Node. It provides you with tools to
do the following things:

1. Write handlers to respond to different HTTP verb requests at different URL
   paths.

   - Similar to defining routes and controller methods in your Fullstack
     Projects, you will use Express to turn your backend into an API that your
     frontend will use to retrieve information.

2. Generate views by passing data to templates that view-rendering engines
   process.

   - Express can also function similarly to Rails by serving up 'views' as a
     response to a request. Your frontend will be handled primarily by React and
     Redux, however, so you will not be using this functionality.

3. Set common web application settings, like which port to use.

   - This functionality is similar to the way you could change the setting in
     __config/puma.rb__ to allow your Rails API to listen on port 5000.

4. Add middleware at any point within the request handling pipeline.

   - Express middlewares are similar to Rails controller callbacks such as
     `before_action` or `after_action`. They allow you to apply some code or
     logic to HTTP requests or responses at any point during the request
     pipeline of your app.

Express is a very minimalistic library, so there is a huge amount of middleware
that has been created by other developers to solve specific web development
problems. For example, you will be using several pieces of middleware to help
implement user auth for your MERN app.
