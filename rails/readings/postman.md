# Postman

Postman is a handy web app you will be using for the next couple days to test
your routes and controller actions.

The Postman app should already be installed on all a/A machines, but if you
would like to install it on your personal machine, download it
[here][download_link].

## Making requests

There are four main components of Postman that you will be using:

1. `Request Type` - change the dropdown to send `GET`, `POST`, `PATCH`, `DELETE`
   requests
2. `Request URL` - change the path to which your request is made
3. `Body Tab` - input the body/data of your request
   - Tip: Use the key-value pairs in the `form-data` sub-tab
4. `Response` - see the response body and HTTP status

Optionally, you can build a query string (the bit after the `?`) by clicking
`Params` to the right of the Request URL and adding key-value pairs. These are
received as top-level params by the controller. For example, a request made to
`localhost:3000/users?username=jack_bauer` has `params[:username] # =>
'jack_bauer'`.

![Image of Postman App][overview_img]

## Demo

Let's say your Rails app has a route of `POST /users`, which is the path to
create a new user. To hit this route, you should

1. Change the `Request Type` to `POST`.
2. Since you are running Rails in the development environment, change the
   `Request URL` to `localhost:3000/users`.
3. Add the request body. This will contain the key-value pairs corresponding to
   the attributes you would like to set for your new user.
   - Rails convention is to nest the attribute names (`username`, `password`)
     inside the resource name (`user`).
   - In this example, you will create a new `User` with a `username` of
     `chloe_obrian` and a `password` of `hacktheworld`. To input this, create
     the following key-value pairs:
  
     ```txt
     user[username]: chloe_obrian
     user[password]: hacktheworld
     ```

4. At this point, you are ready to make your request, but in order to make a
   request from outside of `localhost:3000` you will need to turn off CSRF
   protection. Right after the `config.load_defaults X.X` line in
   __config/application.rb__, add:

   ```rb
   config.action_controller.default_protect_from_forgery = false
   ```

   Remember, you should only turn off this protection in development!

5. Finally, hit `Send` to make the request and inspect the response. Make sure
   to verify that you are receiving not only the correct response body but also
   the correct status.

Happy testing!

[download_link]: https://www.getpostman.com/
[overview_img]: https://assets.aaonline.io/fullstack/rails/assets/postman_screenshot.jpg
