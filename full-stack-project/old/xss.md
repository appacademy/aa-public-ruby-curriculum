#HTML Escaping and XSS (Cross-Site Scripting)
A web security principle is the [Same Origin Policy][Same Origin Policy], which says
that any content on a site will have permission to access resources (e.g., files) on
the server that runs it, while content from another site has to have its own
set of permissions to access the server.

In a cross-site scripting attack, a user puts malicious code into a request that still
originates from the compromised site (think post data from a "new" form).  The app thinks
that the data is trustworthy because it generated the new form, but there's really
unintended code running that could get access to a user's cookies or make requests to a
different site.  See a great example [here][Example].

[Same Origin Policy]: http://en.wikipedia.org/wiki/Same_origin_policy
[Example]: http://en.wikipedia.org/wiki/Cross-site_scripting#Persistent

##Another Example
Let's say I have a form to upload a photo.  On that form I have
something like this:

```html
  <form action="/pictures" method="post">
  <input type="text" name="picture[name]">
  <input type="submit" value="submit">
  </form>
```
And my show page looks something like this:

```html
  <h2><%=@picture.name%></h2>
```
Enter Mr. Hacker.  Mr. Hacker wants to inject some scripts into
my website to do who-knows-what.  For example, he might enter the picture
name as ```<script>alert("I'm hacking yo comp");</script>```

Luckily for us, rails escapes this by default (as it also does for certain
SQL queries like the "find_by" methods), so that when the show page is rendered, we see:
<br /><img src="http://i.imgur.com/8H1Lyj2.jpg"><br />
Thus Mr. Hacker is rebuffed.
If wanted to unescape the text field and let Mr. Hacker work his magic, we would
interpolate using the `raw` method:

```html
  <h2><%=raw @picture.name%></h2>
```
But this may not work!  Some browsers protect against responses that include scripts that are sent
as part of the original post request.  To get around this, we'll have to explicitly set our
response headers in our controller to allow the scripts to run:
```ruby
response.headers["X-XSS-Protection"]="0"
```

There are very few cases why you would ever want to do this, but it's nice to know
the safeguards that are in place for your code.
