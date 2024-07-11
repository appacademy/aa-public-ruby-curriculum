# HTTP Fundamentals

## What is HTTP?

HTTP stands for **Hypertext Transfer Protocol**. Hypertext means text
with links (such as an HTML page), but HTTP can be used to transfer
all sorts of different resources.

Don't worry about memorizing the information in this chapter. However,
it is important that you understand the basic concepts of HTTP
(described below.) This will help you with building RailsLite and with
effectively debugging your web apps.

## The three steps of HTTP

0. Establish a connection between the client and host
0. Client creates a **request** and sends it to the host
0. Host creates a **response** and sends it to the client

When we build RailsLite, we'll implement some of the
normally-behind-the-scenes methods of Step 3 that will translate the
client's HTTP request into an appropriate HTTP response.

## Making the connection

You type `http://en.wikipedia.org/wiki/Cats` into your browser. What
happens?

The first step in the HTTP protocol is to set up a connection between
our computer and the host (`en.wikipedia.org`). HTTP is generally
implemented on top of  a TCP (Transmission Control Protocol)
connection. If no connection currently exists between your computer
and the `en.wikipedia.org` server, then a TCP connection will be
created. In short, TCP is a reliable way to transfer an ordered stream
of bytes between two computers.

Now our web browser can send an HTTP request to the host via this
connection, and then listen for a response to come back over the same
connection.

## A request is born

Next, your browser creates an HTTP request. An HTTP request is nothing
more than a string of text formatted according to certain rules. These
rules are a big part of what puts the Protocol in HTTP.

The following string is a complete and valid HTTP request:

```http
GET /wiki/Cat HTTP/1.1
Host: en.wikipedia.org
```

An HTTP request has 4 or 5 components:

* HTTP method (GET, POST, PATCH, DELETE, etc.)
* Request target (`/wiki/Cat`)
* HTTP protocol version (`HTTP/1.1`)
* Request header (`Host: en.wikipedia.org` in this example)
* Request body (only used with certain HTTP methods; not present in
   this example)

### Request Header

The header is a set of key-value pairs that specify various properties
of the HTTP request. In HTTP version 1.1, there is only one required
request header field: `Host`; all others are optional.

In the example above, the header consists only of `Host:
en.wikipedia.org`, but a request made by your web browser will rarely
be that simple. Here's a more realistic example of an HTTP request
header:

```HTTP
Accept:text/html,application/xhtml+xml,application/xml
Accept-Encoding:gzip, deflate, sdch
Accept-Language:en-US,en;q=0.8
Cache-Control:max-age=0
Connection:keep-alive
Cookie: GeoIP=US:San_Francisco:37.7749:-122.4194:v4; uls-previous-languages=%5B%22en%22%5D; mediaWiki.user.sessionId=Idcj0EtnVcdFNrMdBFPIQnFiMM3gWo4a
Host:en.wikipedia.org
If-Modified-Since:Wed, 17 Dec 2014 18:29:57 GMT
Referer:https://www.google.com/
User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36
```

There are about 50 officially allowed header fields. Wikipedia gives
us a [nice table][wiki-request-headers] with a summary of most of the
different request header fields. Here are some of the more noteworthy
ones:

| Header field name | Description                                                                             | Example                                                                            |
|-------------------|-----------------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| Accept            | Content-Types that are acceptable for the response. (More on content types soon.)                                     | `Accept:text/html,application/xml`                           |
| Content-Type | The format of the request body | `Content-Type:application/json` |
| Cookie            | An HTTP cookie previously sent by the server, now being sent back by the client                                            | `Cookie: recentlocations=San+Francisco%2C+CA;`                                                    |
| Host              | The domain name of the server (and optionally the port number on which the server is listening) | `Host:en.wikipedia.org:80`                                                        |
| User-Agent        | Information about the requester's web browser and operating system                           | `User-Agent: Mozilla/5.0 (X11; Linux x86_64...` |

[wiki-request-headers]: http://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Request_fields

### Request Body

Some HTTP methods, such as POST and PATCH, have a body, also know as
the data payload. Most commonly, this body will be populated with data
entered by the user in an HTML form.

Some other HTTP methods, such as GET and DELETE, have no body, because
the intent of the HTTP request is already fully expressed by the other
parts of the request.

## A Response is Made

Your HTTP request makes its way across the intertubes to the web
server. The web server will turn some gears in order to generate an
HTTP response based on the details of your request, and then the
server will send you that response.

The structure of an HTTP response is very similar to a request. Again,
it's just a string. Here's an example of a response that I received
after requesting a [simple webpage][simple-webpage]:

```
HTTP/1.1 200 OK
Content-Length: 308
Content-Type: text/html
Last-Modified: Tue, 27 May 2003 15:17:04 GMT
Accept-Ranges: bytes
ETag: "6291ea76324c31:5897"
Server: Microsoft-IIS/6.0
X-Powered-By: ASP.NET
Date: Fri, 19 Dec 2014 04:53:35 GMT

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
<title>Test HTML File</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
</head>
<body>

<p>This is a very simple HTML file.</p>

</body>
</html>
```

The breakdown:

0. HTTP protocol version (`HTTP/1.1`)
0. Status code (`200`)
0. Textual description of the status code (`OK`)
0. Response header (everything from `Content-Length: ...` to `...
   04:53:35 GMT`)
0. Response body (everything from `<!DOCTYPE html ...` to `</html>`)

[simple-webpage]: http://www.brainjar.com/java/host/test.html

### Status Codes

The status code is a three-digit code summarizing the outcome of a
request. The codes fall into five different classes: 1xx
(informational), 2xx (success), 3xx (redirection), 4xx (client error),
and 5xx (server error). Here are some of the most common ones:

* **200 (OK)**: The request was processed successfully.
* **302 (Moved)**: Temporary redirect. The browser will navigate to
  the value of the `Location` field in the response header.
* **404 (Not Found)**: The server did not find anything matching the
  request-URI.
* **500 (Internal Server Error)**: An uncaught error was raised during
  the execution of server-side code.

### Response Header

The response contains a header with various key-value pairs. Here's
[Wikipedia's table][wiki-response-headers] listing most of them.
Common response header fields include:

| Header Field Name | Description | Example |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------|
| Content-Type | Indicates the MIME-type of the document (see below). | `Content-Type: text/html` |
| Date | The date/time when the server generated the response. | `Date: Fri, 19 Dec 2014 04:53:35 GMT` |
| Last-Modified | The time/date that the resource was last modified on the server. This provides a way to validate/invalidate cached resources on the client. | `Last-Modified: Tue, 27 May 2003 15:17:04 GMT` |
| Location | A 301 or 302 redirect response must include this header field; the browser will automatically navigate to the specified location. | `Location: http://www.appacademy.io` |
| Set-Cookie | The browser will set a cookie associated with the current website to the specified value. | `Set-Cookie: TestCookie=foobar` |

[wiki-response-headers]: http://en.wikipedia.org/wiki/List_of_HTTP_header_fields#Response_fields

### MIME types

A MIME type is the HTTP equivalent of a filename extension. It is
specified in the `Content-Type` response header and tells the client
how to parse the response body. A MIME type is composed of a type, a
subtype, and zero or more optional parameters. For example, an HTML
file might be designated `text/html; charset=UTF-8`, where `text` is
the type, `html` is the subtype, and `charset=UTF-8` is a parameter
indicating the character encoding. An HTML document will be rendered
directly by the browser, but other MIME types might trigger the launch
of an external application.

Some common MIME types:

* `application/json`
* `application/pdf`
* `application/zip`
* `image/jpg`, `image/png`, `image/gif`
* `text/html`
* `text/plain`

### Response body

The response body contains the actual content of the response. For
example, this could be an HTML document that will be rendered by the
browser, a JSON string containing data to be consumed by a client-side
JavaScript application, or binary data representing an image.


