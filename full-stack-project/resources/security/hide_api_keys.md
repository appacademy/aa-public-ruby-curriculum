# How To Hide Your API Key

If you're using Google Maps or any other API that requires an API key, you need
to be careful not to push that API key to GitHub. There are crawlers that search
through GitHub for API keys.

Fortunately, Rails and Vite make it really easy to use API keys on Render.com
without pushing them to GitHub. Note, however, that **if you use your API keys
in the frontend, they will still be exposed.** They're just less likely to be
picked up by crawlers.

Some web services, like Google Maps, account for this frontend exposure by
allowing you to restrict your API key by platform (Android or iOS) or site. So,
for example, you can set Google Maps to validate your API key only when it is
used in requests that come from your specific website. For cases where you need
to keep the key secret because such extra restrictions are not available, you
are probably better off letting your more-secure backend make any requests
involving the API key.

## Rails master key

Every Rails project automatically comes with a __master.key__ file in
__config/__. This file contains a randomly generated master key that is used to
encrypt and decrypt your API keys. The __master.key__ file is automatically
gitignored and it should never be pushed to GitHub.

You can tell Render about your master key in two different ways. If you are
using a __render.yaml__ file to configure a Blueprint for your app, just add
`RAILS_MASTER_KEY` to your web service under `envVars` with the `sync` set to
`false`:

```yaml
services:
  - type: web
    # ...
    envVars:
      - key: RAILS_MASTER_KEY
        sync: false
```

> Note: Spacing and indentation matter in __.yaml__ / __.yml__ files.

The `sync: false` designation tells Render that you will supply the value for
the environment variable on Render.com, i.e., it is not stored in the file.
Then, when you initially create the Blueprint for your app on Render, it will
ask you to input the value for your `RAILS_MASTER_KEY`, which you can copy from
__config/master.key__. (For more on deploying with __yaml__ files, see the
"Deploying to Render" reading.)

Alternatively, if you deploy your app through the Render.com GUI, click
`Advanced` at the bottom of the initial deployment configuration page and then
`Add Environment Variables`. Add a key of `RAILS_MASTER_KEY` with a value of the
string found in your app's __config/master.key__ file.

To add a `RAILS_MASTER_KEY` environment variable after you have deployed your
app, go to your Render [Dashboard] and click on your app. In the left-hand menu,
select `Environment` and then click the `Add Environment Variable` button. Don't
forget to click `Save Changes` once you have input the key (`RAILS_MASTER_KEY`)
and value.

Note that you must store your master key somewhere so that you can pick up your
project from a new computer if you have to. For example, you can email the file
to yourself. Then, to continue working on your project on a new computer, simply
clone your project from GitHub and paste the __master.key__ file into
__config/__.

### Encrypting API keys in Rails

Now that Render knows what your master key is, you can add your API key to an
encrypted __credentials.yml__ file which will be what you push to GitHub. To
edit this file, run `rails credentials:edit`. This will open a __.yml__ file. To
add a Google API key, add the following:

```yml
google:
  api_key: 123456
```

 For __.yml__ files, white space matters, so be careful to match this syntax
 exactly. After making the edits, save and close the file. Rails will take
 care of encrypting it.

### Using API keys in Rails

 Now that you've stored your Google API key, you can access it like this:

 ```ruby
Rails.application.credentials.google[:api_key]
 ```

That means that in, e.g., an __html.erb__ file, you can access the key like
this:

```html
<h1>My secret key: <%= Rails.application.credentials.google[:api_key] %></h1>
```

## Vite (React)

To use the API key in a Vite React frontend, store it in an environment variable
that begins with `VITE_`. (Vite will simply ignore any custom environment
variables that do not begin with `VITE_`.) For local development, create a
__frontend/.env.development.local__ file, add it to your
__frontend/.gitignore__, and store the key inside:

```js
// frontend/env.development.local

VITE_MAPS_API_KEY=<your-api-key-here>
```

### Using API keys in Vite React projects

You can then access the API key using `import.meta.env.VITE_MAPS_API_KEY` in a
JS or JSX file, e.g.,

```jsx
function ExposeAPIKey() {
  const apiKey = import.meta.env.VITE_MAPS_API_KEY;
  
  return (
    <h1>API Key: {apiKey}</h1>
  );
}
```

In HTML (non-JSX) files, you can use `%ENV_VAR_NAME%` without the
`import.meta.env`:

```html
<p>This line exposes the Google maps API key to be %VITE_MAPS_API_KEY%.</p>
```

It is important to stress, however, that VITE will insert the variable value at
**build** time, not run time. The value will accordingly be plainly visible in
your build files and, potentially, your HTML. This means that, if you build your
frontend locally and then push the build files to GitHub for deployment, **your
key will be exposed.** This is a scenario you want to avoid.

> **Note:** Since `npm run build` produces a production build, Vite will only
> substitute environment variables specified for a **production** environment,
> i.e., variables listed in a __.env__ or __.env.production__ file. The values
> of any environment variables stored in, e.g., __.env.development.local__ will
> **NOT** be inserted into the build files. To test your build files locally,
> run `npm run preview` after you have run `npm run build`.

### Deploying Vite keys on Render

How, then, can you securely supply your key to a production build? One option is
to build your frontend files on the hosting platform using environment variables
that you specify on the platform. For instance, on Render you could set the
`VITE_MAPS_API_KEY` environment variable using the website GUI (see above) or in
your __render.yaml__ file:

```yaml
services:
  - type: web
    # ...
    envVars:
      - key: RAILS_MASTER_KEY
        sync: false
      - key: VITE_MAPS_API_KEY
        sync: false
```

Render builds in a development environment and only switches to a production
environment at runtime. Unless you have explicitly set the environment to
`production`, you can accordingly tell Render to have Vite--which is typically
installed as a `devDependency` not available in production--build your frontend
before the platform builds the backend. (See subsequent deployment instructions
for how to do this.)

### Keeping your frontend API key safe

It is important to stress again, however, that even if you build on Render, a
key's value will still be plainly visible in your build files and, potentially,
your HTML. While using an environment variable to secure a secret key in your
frontend will keep your key off of GitHub, it will **NOT** keep your key from
being exposed in your app.

If you are able to set other restrictions on the use of your key--e.g., limiting
it to your specific site or whitelisting specific users--then set those
restrictions to further secure your key.

If a service does not allow you to set these types of restrictions, then you
should instead set up a route for returning the desired information from a
secure backend.

## Resources

* [API keys in Rails]
* [API keys in Vite React]

[API keys in Rails]: https://guides.rubyonrails.org/security.html#custom-credentials
[API keys in Vite React]: https://vitejs.dev/guide/env-and-mode
