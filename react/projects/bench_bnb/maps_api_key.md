# Google Maps API Key

For this project, we'll need a Google Maps API Key in order for the maps feature
to work.

The Maps API requires that you have a Google account with Billing enabled (aka
your credit card saved). As developers, there will be several occasions where
we'll be billed for the usage of third party APIs, so this is a fantastic
opportunity to learn more about responsible API key stewardship. Specifically,
we'll learn more about how to protect our API keys from bad actors.

For the purposes of this project, you are almost certainly not going to use the
Maps API enough for you to actually be billed anything, especially if we
properly safeguard our API key.

## Generating an API Key

First, let's generate an API Key.

To generate a working key, we need to do the following:

1. Create a Google developers project.
2. Enable Maps Javascript API in that project.
3. Go to credentials to generate an API key.
4. Add the API key to our BenchBnB project.
5. Add billing info to unlock the full set of Maps functionality.

### Create a Google developers project

To get started, first navigate to the [Google Cloud console][gcp-console].

You will need a Google account to be able to log in to the Google Cloud console.

Once you are logged in, click on the `Select a Project` button in the nav bar.
In the newly opened modal, select `New Project`.

![New GCP Project example][maps-api-1]

Choose a name for your project.
You can name it something like `benchbnb`. Leave the `Location` set to
`No organization`. Then, click `Create`.

![New GCP Project example 2][maps-api-2]


[gcp-console]: https://console.cloud.google.com/
[maps-api-1]: https://assets.aaonline.io/fullstack/react/projects/bench_bnb/maps_api_1.png
[maps-api-2]: https://assets.aaonline.io/fullstack/react/projects/bench_bnb/maps_api_2.png

### Enable Maps JavaScript API

Once you've created your project, make sure you have selected your newly created
project. Then, open the side menu, select `APIs & Services` > `Library`.

Search for and select `Maps JavaScript API`. Now, `Enable` this API for your
project. (Again, be sure you have selected your newly created project when
enabling this API.)

![Enable JavaScript API][maps-api-3]

[maps-api-3]: https://assets.aaonline.io/fullstack/react/projects/bench_bnb/maps_api_3.png

### Generate API Key

Open the side menu navigation again, and this time, select `APIs & Services` >
`Credentials`.

Then, click `Create credentials` and select the `API key` option.

Once you've generated a new API key, click `Restrict key`. This will take you to
a new page where you can now rename the API key to something more specific (ie.
'BenchBnb Maps API Key'). You should also restrict your API key so that it can
only call on the `Maps JavaScript API`.

![Restrict API Access][maps-api-4]

In general, we want to follow the
[Principle of Least Privilege][principle-least-privilege] when it comes to
managing our API keys and what it has access to.

[principle-least-privilege]: https://en.wikipedia.org/wiki/Principle_of_least_privilege
[maps-api-4]: https://assets.aaonline.io/fullstack/react/projects/bench_bnb/maps_api_4.png

### Add API key to BenchBnB project

**Quick Note**: It's important to take this upcoming section very
seriously! There have been multiple anecdotes from students who accidentally
pushed API Keys to a public Github repo. Those keys were then scraped by bad
actors who racked up tens of thousands of dollars in charges using those keys.

With that in mind, let's add our API key to our BenchBnB project!

Any time we add an API key to our project, we want to take precautions to
prevent bad actors from stealing and misusing our keys. In the case of our Maps
API key, because billing is calculated per map load, bad actors might want to
steal your key so that they can load up maps on their own projects.

Because the Maps API key is loaded in the frontend in our HTML, there's actually
not much we can do to prevent the key from being publicly accessible if our web
app is deployed to production. If you decide you want to deploy your BenchBnB
project (for example, using Heroku), then it's highly recommended that you
protect your publicy accessible API key by restricting the websites that can use
your key.

![How to restrict API key to specific websites][maps-api-5]

For now though, since we're planning on only working on this in a local
development capacity, we don't have to worry too much about that.

We should, however, take the necessary precautions to prevent our API key from
being exposed publicly in a github repository. To prevent our API key from being
pushed to Github while still being able to conveniently use the key locally, we
have a couple of options.

The first option is to use Rails' built-in mechanism for encrypting environment
variables. You can learn more about that from the Securely Storing API Keys
reading linked in the sidebar. Feel free to ignore the sections about Heroku
unless you end up deploying to Heroku.

Another option that we'll walk through here is to use the
[Figaro gem][figaro]. Figaro helps us generate a yaml file that automatically
gets git ignored. Environment variables that we then paste into this yaml file
are accessible from within our Rails app.

Once you've followed the [Figaro][figaro] setup instructions, paste in your API
key into the newly generated `config/application.yml`:

```yaml
MAPS_API_KEY: ABCDEFG12345
```

Then in the project's `application.html.erb`, add the following script tag that
references your Maps API key:

```html
<!-- application.html.erb: -->
<!DOCTYPE html>
<html>
  <head>
    <title>BenchBnb</title>

    <%= javascript_include_tag "https://maps.googleapis.com/maps/api/js?key=#{ENV['MAPS_API_KEY']}" %>
    <%= stylesheet_link_tag 'application', media: 'all' %> <%= csrf_meta_tags %>
    <%= javascript_include_tag 'application' %>
  </head>
  <body>
    <%= yield %>
  </body>
</html>
```

**Note:** When including the google script tag, be sure to put it above `yield`
and remove the `async defer` bit (if necessary). This way, the script will fully
load before the rest of your page and be ready to use as soon as your app
mounts.

[figaro]: https://github.com/laserlemon/figaro
[maps-api-5]: https://assets.aaonline.io/fullstack/react/projects/bench_bnb/maps_api_5.png

### Add billing info

Finally, in order for our Maps API to work without restrictions, we'll need to
add billing info to our Google account. To do this, open the side navigation
menu again and go to `Billing` to add your credit card info.


## Final thoughts

You can access Google's official docs of the
[Maps JavaScript API][maps-javascript-api] for more info.

Now that we've set up our Maps API key, we're now ready to move on to rest of
the project!

[maps-javascript-api]: https://developers.google.com/maps/documentation/javascript/get-api-key
