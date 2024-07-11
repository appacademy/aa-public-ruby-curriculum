# Cookies

## Goals

* Know what **statelessness** means.
* Know how a cookie can store data on the client.

## HTTP is stateless

HTTP is **stateless**; each request that a client makes is independent of every
other request. A stateless protocol is a communications protocol that treats
each request as an independent transaction that is unrelated to any previous
request so that the communication consists of independent pairs of requests and
responses.

Okay, but what does that mean? Let's take an example: say you log in to Amazon,
then fetch your personal wishlist. HTTP itself doesn't build in a way to tie the
first request (the login) to the second request (fetching the wishlist). That
means that, without additional work, your web app won't know whose wishlist to
display.

This is the problem that cookies were invented to solve.

Stateless protocols allow server software to be written more simply and with
fewer bugs. They can also make certain intelligent optimizations that let the
web service operator scale up his or her machines more easily. These points
aren't essential to dive into right now, but you should know that the simplicity
of HTTP and other stateless protocols is part of what makes them so powerful.

## Cookies

Okay, statelessness is a good thing, but how do you solve this problem?

Of course, it starts when you post login credentials to the server. You may
exchange a request-response with `www.amazon.com` like this:

```
Request:
    POST /session HTTP/1.1
    Host: amazon.com

    user=ruggeri&password=gizmo_is_great

Response:
    HTTP/1.1 302
    Set-Cookie: user=ruggeri; session_token=135792468
    Location: http://www.amazon.com/
```

Here you post your credentials to the Amazon server. Amazon sends you the
response: the 302 tells the browser to make a new request for the
Amazon home page. But the response also has a `Set-Cookie` header line.

The `Set-Cookie` line tells the client (i.e., your web browser) to save some
state in the browser: namely, the logged-in Amazon user and a randomly generated
session token (you'll see why in a minute). The browser is expected to upload
this **cookie** as part of each subsequent request to `www.amazon.com`.

```
GET /wishlist http/1.1
Host: www.amazon.com
Cookie: user=ruggeri; session_token=135792468
```

The way the server can know this new request is being made by user `ruggeri` is
through the cookie. It can verify the user is who they claim to be and that the
cookie is not **faked**. When the user submitted the credentials, the session
token set in the cookie would also be stored in the server's database. On future
requests, you compare the session token for the specified user with the session
token uploaded in the cookie.

Note that the server doesn't have any other way to tie together the login
request and the wishlist request. Without the cookie, the server would have no
way to differentiate this request from user `ruggeri` from another request from
user `patel`.

Once a cookie is set, it continues to be uploaded to the server on every request
until it **expires** or is cleared out by the user. It is common to set the
cookie to expire on a date far in the future so that it continues to be
uploaded. This is called a _permanent cookie_. A permanent cookie is not truly
permanent; [all things must pass][all-things-must-pass]. However, it does live
for a very long time, and since a cookie can be renewed by being set again, it
can live practically forever.

Another common option is not to set an expiration date at all. In this case, the
cookie will be deleted when the web browser closes. This is called a _session
cookie_.

[all-things-must-pass]: http://en.wikipedia.org/wiki/All_Things_Must_Pass

## Another example: shopping carts

Let's consider a second example. Say a logged-in user (`ruggeri`) is navigating
`www.amazon.com` and wants to add items to his shopping cart. Each shopping cart
request might trigger a POST request to the server; the server would then update
its database to reflect that user `ruggeri` has added another item to his
shopping cart. When user `ruggeri` checks out, the server queries the database
to check the items in his cart, and computes the price.

What about a marketplace that wants to allow users to add items to their carts
without having logged in yet? Maybe it is only at checkout that the user logs
in. Or maybe they never log in and just provide credit-card information at
checkout.

Here the users are anonymous: the server doesn't have a username for this user.
For that reason, it wouldn't be easy to record in the database that user X has
added an item to their cart, since there is no username for X.

One solution would be to store the shopping cart in the user's cookie. Each time
the user makes a request, they'll upload the cookie containing the shopping
cart. Whenever they add an item, the server will send the shopping cart cookie
back, having first appended one more item to it.

### Advantages and disadvantages

There are a few additional advantages to each approach. The approach of storing
state on the server means that the user can use different devices (maybe a
computer and a phone) to use the service and still access the cart across
machines. Also, if the cookies get cleared, users don't lose the items in their
cart.

The information stored in a cart is very small: probably just the id numbers of
the items. It won't hurt to upload them on every request. If there were more
data to store (for instance, images), then it would slow down the interaction
with the website to upload the cookie every time. Cookies have reasonable
limitations to how much data they can hold; usually 4kB. But if you want to
store more than this amount of data, you will need to do this server-side.

There are advantages to storing the cart in the cookie. It may be simpler to
just have the client store the cart in cookies. You don't have to store the cart
in the database, clean up and remove old carts that users don't ever check out,
etc. Depending on how interactive the site is, you may not have to set up a
database at all.

Another consideration is that the web application may not be able to search data
stored in the cookie. Say you wanted to run a query to ask what items were
stored in all users' carts currently. With the cookie-based architecture, you
haven't stored that information on your servers; it exists in the cookies saved
on your users' computers, which you can't access. You only get access to
that data when a user's browser makes a web request.

One last point: any information that must be reliably persisted must not be
stored in a cookie. People clear cookies all the time, so you can't count on the
data you save in the cookie being around later. And users can edit or fake the
cookies, so you can't necessarily trust that the data won't be modified by a
malicious user.

## Sessions

Information like the logged-in username or the items in a cart is called
_session data_. Session data is part of the context in which future requests are
interpreted. For instance, when a client makes a `GET` request for a wishlist,
the context includes the currently logged-in user. The session data, in
aggregate, is called the _session_.

Session is a concept; cookies are the way that concept is implemented. When you
start working with Rails, you'll see the word session more frequently than
cookie; that's because Rails is trying to be flexible about whether it uses
cookies or some other means to implement a session (e.g., by using the database,
as described above).
