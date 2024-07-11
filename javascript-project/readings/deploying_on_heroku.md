# Deploying on Heroku

If your project has a lightweight backend, this guide is for you. Otherwise, you
should follow the reading for Deploying on GitHub Pages.

## What is Heroku?

You'll learn much more about Heroku during your full stack projects. Briefly,
Heroku is what's known as a Platform as a Service (PaaS). It provides you a
domain where you can host your app (`<your-app-name>.herokuapp.com`), and servers
for running your app and optionally a database too. 

But what distinguishes it from more barebones Infrastructure as a Service (IaaS) 
offerings is that it provides numerous tools for easily managing and scaling 
your app, doing a lot of the dirty work of network administration for you. 

For instance, Heroku takes care of setting up your server's runtime environment
for you: installing necessary dependencies, running the appropriate scripts for
compiling your code, setting environment variables etc. You just need to tell
Heroku a few things: that it needs run `npm install`, for instance, or what 
environmental variables you want it to set. 

To give a more advanced example, you can pay to run multiple instances of your 
app at once so it can better handle large amounts of traffic. You don't have to 
worry about coordinating the work between these two server instances; Heroku 
does it for you.

Another great thing about Heroku is that it uses `git` to manage your source 
code. Just like GitHub can host remote repos, you'll create a remote repo on
Heroku for your project. All you need to do then is `push` to this repo!

## Preparing Your Project for Deployment

1. **Ensure package.json has an `engines` field and `start` & `build` scripts.** 
This was a part of the set up instructions, but you should double check you have
something like these in your `package.json`:
```json
{
  "engines": {
    "node": "14.x" // use your version of node; check with `node -v`
  },
  "scripts": { // Heroku will run the `start` and `build` scripts for you
    "start": "node app.js", 
    "build": "webpack --mode=production"
  },
}
```

2. **Add and commit to your main branch.** 
You should also test and make sure everything works locally before pushing, and 
take out any console.logs and debuggers, which would look messy if anyone opened
the inspector for your live site.

## Deploying Your Project

1. **Create a New Heroku App**
  * Create an account on [heroku.com][heroku]
  * Create a new app. From the dashboard, click `New` > `Create a new app`. Give 
  it a unique name, and don't change the region. Click `Create app`.

2. **Setup Buildpack and Config Vars**
  * Go to the `Settings` tab in the app's dashboard
  * Go to `Config Vars`, click `Reveal Config Vars`, and then add key value 
  pairs for every environmental variable you set in your `.env` file (such as 
  API keys).
  * Go to `Buildpacks`, click `Add buildpack` and select `heroku/nodejs`


3. **Pushing to Heroku**
  * Go to the `Deploy` tab in the app's dashboard
  * Follow the instructions in the `Deploy using Heroku Git` section, under the
  the headers of 'Install the Heroku CLI' and then skipping to 'Existing Git
  repository'. 
  * Push to Heroku: `git push heroku main`. Whenever you want to redeploy, just
  re-run this command!

## Helpful Heroku CLI Commands

- `heroku logs -t` - opens running server log of your Heroku app
- `heroku open` - opens your app in the browser

[heroku]: https://www.heroku.com