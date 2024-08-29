# Rails Lite

<quiz>
  <question>
  <p>Which of the following is **NOT** part of an HTTP request?</p>
    <answer>HTTP method</answer>
    <answer correct>Status Code</answer>
    <answer>Request Header</answer>
    <answer>Request Target</answer>
    <answer>HTTP Protocol Version</answer>
    <explanation>The status code is the only thing not included in an HTTP request.</explanation>
  </question>
</quiz>

<quiz>
  <question>
  <p>Which list contains only items that the Rails framework provides for you when creating a default Rails project?</p>
    <answer>jQuery, RSpec, The Router  </answer>
    <answer>The Database, WEBrick, Sinatra</answer>
    <answer>Routes, Models, Controllers, Views</answer>
    <answer correct>Rack, Active Record Base, Action Controller, Puma</answer>
    <answer>Active Record Base, Models, The Router, HTTP</answer>
    <explanation>Rails only provides the Rack, Active Record Base, Action Controller, and Puma.</explanation>
  </question>
</quiz>

<quiz>
  <question>
  <p>Suppose you want to capture only the part of the URL that comes **before** the query string. Using Regex, what is the best way to do this?</p>
    <answer>`/^(\?)/`</answer>
    <answer>`/\\?\w+\=/`</answer>
    <answer correct>`/^[^\?]*/`</answer>
    <answer>`/\.\w+\/\w+\\?/`</answer>
    <answer>`/http:\/\/\w+\.\w+\//`</answer>
    <explanation>You want to match everything before the `?` in the URL. The first `^` says to start at the beginning of the string. `[^\?]` says to match any single character that is not (`^`) `?`. Finally, the `*` says to match this single-character-that-is-not-? between 0 and an unlimited number of times.</explanation>
  </question>
</quiz>

<quiz>
  <question>
  <p>Imagine you make a request to the Google Maps API but accidentally enter an incorrect API key. What response status would you expect to get back?</p>
    <answer>204</answer>
    <answer>301</answer>
    <answer correct>401</answer>
    <answer>404</answer>
    <answer>418</answer>
    <explanation>The 401 (Unauthorized) status code indicates that the request has not been applied because it lacks valid authentication credentials for the target resource.</explanation>
  </question>
</quiz>

<quiz>
  <question>
  <p>What does `Rack::Response#write` do? It ...</p>
    <answer>Creates a mock GET request object from the given string.</answer>
    <answer>Parses the given text string into an HTML request.</answer>
    <answer>Sets the body of the request to the given string.</answer>
    <answer>Formats stored response data into properly formatted HTTP.</answer>
    <answer correct>Appends the given string to the body and updates Content-Length.</answer>
    <explanation>`Rack::Response#write` appends the given string to the body and updates Content-Length.</explanation>
  </question>
</quiz>

<quiz>
  <question>
  <p>Which of the following is **NOT** an example of middleware?</p>
    <answer>A static asset server</answer>
    <answer>Request authentication</answer>
    <answer>A server log</answer>
    <answer>A browser filter that redirects you to download Chrome if you visit the site using IE</answer>
    <answer correct>The main web application</answer>
    <explanation>Middleware can do many different things, but middleware's purpose is to allow software developers to focus on the specific purpose of their application. So the main web application is **not** an example of middleware.</explanation>
  </question>
</quiz>
