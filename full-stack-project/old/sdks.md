# Social Features with SDKs

Integrating a social SDK with your project is a quick and easy way to
add more interactivity and content to your app. The term _SDK_
(_software development kit_) can mean a lot of different things . In
our Rails projects, SDK generally means an external API paired with a
Gem that wraps communication with said API in an Object Oriented way.

### Authentication Tokens

There are many ways to deal with Authentication tokens (as you learned
earlier, one way being [figaro](https://github.com/appacademy/curriculum/blob/master/full-stack-project/resources/security/figaro.md)). Remember that you
shouldn't ever commit API tokens to your Github repository. I've heard
rumors about robotic spiders that crawl Github looking for your API
keys. Collecting them in order to do bad things at night with their
spidery friends. So if you accidentally commit them, just make sure to
reset them.

I generally just deal with my credentials manually, and skip the whole
figaro thing. I just store them in my environment variables. Whenever
Rails (or any Ruby script) initializes, it reads all of your system's
environment variables into a constant, `ENV`.

You can set environment variables for your current terminal session
with the command `export`. Say some SDK needed a `FUN_TOKEN` to
authenticate:

```bash
 # In BASH
[~] $ export FUN_TOKEN=turtles1982
[~] $ irb
1.9.3p448 :001 > ENV["FUN_TOKEN"]
 => "turtles1982"
```

Note that this only makes the token available to things in the current
terminal session (all is lost when you close this window). To deal
with this you can place the `export` statements in `~/.bash_profile`
so they're run every time a terminal session is started. Just don't
save `.bash_profile` on GitHub if you do it this way! _N.B._ the way
around this is to have a separate script that sets environment
variables and then have `.bash_profile` call that script.

Setting environment variables on Heroku is a bit different. Check out
this example from their thorough [documentation][heroku-config]:

    $ heroku config:set GITHUB_USERNAME=joesmith
    Adding config vars and restarting myapp... done, v12
    GITHUB_USERNAME: joesmith

    $ heroku config
    GITHUB_USERNAME: joesmith
    OTHER_VAR:       production

    $ heroku config:get GITHUB_USERNAME
    joesmith

    $ heroku config:unset GITHUB_USERNAME
    Unsetting GITHUB_USERNAME and restarting myapp... done, v13

[heroku-config]: https://devcenter.heroku.com/articles/config-vars

### SDK Resources

* We can use the [Koala][koala-gem] gem to integrate the Facebook
  graph with our project.
* Take a look at the Facebook [Open Graph protocol][og].
* [Facebook Query Language][fql] to make SQL-like queries on the
  graph. Unfortunately this isn't nearly as awesome as you'd
  imagine. I was both relieved and disappointed that I couldn't get my
  friend's email addresses with a FQL query.
* [Facebook Graph API Railscast][fb1]
* [Facebook Open Graph Railscast][fb2]
* We can use the [Twitter][twitter-gem] gem to integrate the Twitter
  API with our project.
* [Twitter Railscast][twitter] - Kind of like our Twitter AR
  project from many weeks ago. Learn to fetch and cache Twitter
  statuses to display in your Rails Views.
* [Github's Octokit][octokit] looks like a nice way to interact with
  Github.

[fql]: https://developers.facebook.com/docs/reference/fql/
[og]: http://ogp.me/
[koala-gem]: https://github.com/arsduo/koala
[twitter-gem]: https://github.com/jnunemaker/twitter
[octokit]: https://github.com/octokit/octokit.rb
[twitter]: http://railscasts.com/episodes/359-twitter-integration
[fb1]: http://railscasts.com/episodes/361-facebook-graph-api
[fb2]: http://railscasts.com/episodes/363-facebook-open-graph
