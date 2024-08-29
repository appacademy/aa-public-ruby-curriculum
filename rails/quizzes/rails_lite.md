# Rails Lite

Which of the following is **NOT** part of an HTTP request?
- [ ] HTTP method
- [ ] Status Code
- [ ] Request Header
- [ ] Request Target
- [ ] HTTP Protocol Version

<details><summary>Answer:</summary>

Status Code</details>
<details><summary>Explanation:</summary>

The status code is the only thing not included in an HTTP request.</details>

Which list contains only items that the Rails framework provides for you when creating a default Rails project?
- [ ] jQuery, RSpec, The Router  
- [ ] The Database, WEBrick, Sinatra
- [ ] Routes, Models, Controllers, Views
- [ ] Rack, Active Record Base, Action Controller, Puma
- [ ] Active Record Base, Models, The Router, HTTP

<details><summary>Answer:</summary>

Rack, Active Record Base, Action Controller, Puma</details>
<details><summary>Explanation:</summary>

Rails only provides the Rack, Active Record Base, Action Controller, and Puma.</details>

Suppose you want to capture only the part of the URL that comes **before** the query string. Using Regex, what is the best way to do this?
- [ ] `/^(\?)/`
- [ ] `/\\?\w+\=/`
- [ ] `/^[^\?]*/`
- [ ] `/\.\w+\/\w+\\?/`
- [ ] `/http:\/\/\w+\.\w+\//`

<details><summary>Answer:</summary>

`/^[^\?]*/`</details>
<details><summary>Explanation:</summary>

You want to match everything before the `?` in the URL. The first `^` says to start at the beginning of the string. `[^\?]` says to match any single character that is not (`^`) `?`. Finally, the `*` says to match this single-character-that-is-not-? between 0 and an unlimited number of times.</details>

Imagine you make a request to the Google Maps API but accidentally enter an incorrect API key. What response status would you expect to get back?
- [ ] 204
- [ ] 301
- [ ] 401
- [ ] 404
- [ ] 418

<details><summary>Answer:</summary>

401</details>
<details><summary>Explanation:</summary>

The 401 (Unauthorized) status code indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.</details>

What does `Rack::Response#write` do? It ...
- [ ] Creates a mock GET request object from the given string.
- [ ] Parses the given text string into an HTML request.
- [ ] Sets the body of the request to the given string.
- [ ] Formats stored response data into properly formatted HTTP.
- [ ] Appends the given string to the body and updates Content-Length.

<details><summary>Answer:</summary>

Appends the given string to the body and updates Content-Length.</details>
<details><summary>Explanation:</summary>

`Rack::Response#write` appends the given string to the body and updates Content-Length.</details>

Which of the following is **NOT** an example of middleware?
- [ ] A static asset server
- [ ] Request authentication
- [ ] A server log
- [ ] A browser filter that redirects you to download Chrome if you visit the site using IE
- [ ] The main web application

<details><summary>Answer:</summary>

The main web application</details>
<details><summary>Explanation:</summary>

Middleware can do many different things, but middleware's purpose is to allow software developers to focus on the specific purpose of their application. So the main web application is **not** an example of middleware.</details>
