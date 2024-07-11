# Deploying on GitHub Pages

So far, you have used GitHub to back up and share your Git repos. However, you
can also use it to deploy websites through GitHub Pages. You are limited to
static content: HTML, CSS, JavaScript, and assets like images or videos. You
can't run a server on GitHub Pages, which rules out Rails apps or other apps
with a backend. But it's great for frontend only projects that don't need a
database, such as JavaScript games or eventually your portfolio website.

There are two types of GitHub Pages sites: (1) user (or organization) sites, and 
(2) project sites. Each GitHub account gets one user site, which is hosted at
`[username].github.io`, and unlimited project sites, each of which is hosted at
`[username].github.io/[project-repo-name]`. You'll be using a project site for 
your JavaScript project.

For example, if someone's GitHub username is `super-awesome-dev`, their user
site would be `super-awesome-dev.github.io`. And if their project repo is called
`super-cool-js-project`, their project would be hosted at 
`super-awesome-dev.github.io/super-cool-js-project`. 

## Preparing Your Project for Deployment

**1. Make sure your `index.html` is at the top level of your project repo.**

When you eventually navigate to `[username].github.io/[project-repo-name]`, the
live site for your project, GitHub will look for an `index.html` file at the top
level of your repo and serve that up.

In addition, make sure you have a `README.md` at the top level of your repo. 
You should already have one with your project proposal, but double check that 
you didn't rename it or anything.

**2. Run your production build script (`npm run build`)**

The `npm run build` script, which we define in `package.json`, runs 
webpack in production mode. You can configure webpack to do a lot of things 
differently in production mode, but in the `webpack.config.js` we provided, the 
only thing we change is what kind of source map webpack builds. 

You can read more about source maps in the Setup Deep Dive reading, but the
takeaway is that in production mode, your `main.js` ends up being smaller, so
your site loads faster for recruiters.

**3. Add, commit, and push to your main branch**

You should also test and make sure everything works locally before pushing, and 
take out any console.logs and debuggers, which would look messy if anyone opened
the inspector for your live site.

## Deploying Your Project

Go to your project repo on GitHub, and navigate to the `Settings` tab. Click
`Pages` in the sidebar on the left. Select your `main` branch, and click `save`.
That's it! Your project is now live at `[username].github.io/[repo-name]`. And 
whenever you push to `main`, GitHub will automatically re-deploy!

Don't worry if you get a `404` when navigating to your live site at first. It 
takes a bit for GitHub to get things up and running. Give it five minutes and 
try again. 

If it still gives you a `404`, or if you ever make another deployment that
doesn't seem to be taking effect after waiting some time, try clearing your
cache, opening the page in incognito mode, or having a friend try opening the
project. If any of those work, then you know the deployment was successful!

[Read more about GitHub Pages here.][github-pages]

[github-pages]: https://docs.github.com/en/pages