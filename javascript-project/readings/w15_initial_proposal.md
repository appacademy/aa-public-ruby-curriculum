# Initial Proposal

**Initial proposals are due Friday (W14D5) at 5pm**

Your initial proposal should be a 1 - 2 paragraph overview of your intended
project. The purpose of the initial proposal is:

1. to make sure your idea is viable before you spend hours crafting a full
   proposal tonight, and 

2. to ensure you have enough time to properly research and plan your project
   tonight, instead of spending all your time coming up with an idea

Your initial proposal should describe:
* the basic content of your project (basic gameplay, subject matter of data
  visualization, etc)
* what technologies or libraries you're tentatively planning to use (Canvas, D3,
  etc)

No need for too much detail: we don't need all the rules of your game, or
whether you'll use a bar or line chart for your data visualization. And
everything is tentative: you might, for instance, switch your data source after
doing more research tonight, and that's OK. 

## General Considerations When Choosing a Project

### This is a portfolio project. 
This is a project you'll include on your personal website and resume, and which
recruiters will see. Being the smallest scale portfolio project, its main
purpose is to be visually compelling, interactive, and user-friendly to catch
recruiters' attention.  

**Takeaway**: This project is a chance to show off your personality and
creativity. Choose something that excites and interests you; don't hold back.
But also, don't worry about coming up with a genius, original idea. Just pick
something that'll be fun to work on, and that you'd enjoy talking about with an
interviewer.

### This is an open-ended project.

This project has the least provided structure of the 3 portfolio projects.
We won't dictate what libraries to use, how to structure your code, or whether
to build a game, data visualization, or interactive demo.

**Takeaway**: Treat this as a learning opportunity. Be curious; explore a
technology that intrigues you.

### You have roughly a week to complete this project.

**Takeaway**: Pick something you could reasonably complete in that time
frame. Ideally, you'll pick a project which you can easily expand and add new
features to. That way, you have something polished and functional after a week,
which you can develop further during the job search. 

## So You're Thinking of Making A...

### Game

Think about simple games you've enjoyed playing in the past. Is there a creative
spin you could put on any of them, or could you create a mashup between two of
them?

Start thinking about how you might implement:
  - rules, scoring, and win conditions
  - updating game data: how do objects move? do you need collision detection?
    gravity? a moving camera or game view?
  - user input and event handling: will your game be keyboard driven? click
    driven? will you track mouse movement?
  - drawing / animating game elements: will you use [Canvas][canvas], vanilla
    DOM manipulation, an external library like [Three.js][three.js]?

Obviously, you don't need to figure out all the details at this point. But check
in with yourself as you think through these implementation questions: Do you
feel excited by any anticipated challenges? Does your game seem achievable,
without being too straightforward?

Some other things to keep in mind:
  - Games often (but don't necessarily) involve a lot of pixel math.
  - An ideal game can be created in layers: very simple core mechanics, with
    additional rules or features that you can add on over time.
  - There are a lot of JavaScript job seekers out there with games in their
    portfolio. Avoid commonly cloned games: Asteroids, Snake, Flappy Bird,
    Tetris, Pac-Man, Lunar Lander, or mazes. And avoid anything too simple;
    something like TicTacToe or Towers of Hanoi is not complex enough.

**Note:** You may not use online tutorials or the Phaser.js library to create
your game. Tutorials often give you a lot of code snippets. At best, it looks
like you don't actually know how to write code yourself, and, at worst, it looks
like you plagiarized someone else's work.

### Data Visualization

Start by thinking about facts and statistics that have fascinated or surprised
you in the past. Consider topics that you nerd out about or which seem
especially relevant, and think through the kinds of comparisons you might make
about a given topic: across geographic regions or demographics, over a period of
time, between competing products or approaches, etc. Think about different ways
of visualizing your data: bar graphs, pie charts, scatter plots, maps. Think
about a color scheme or theme for presenting your data. 

For data visualization projects, you'll need to nail both your data source and
visualization.

For data sources, do some Googling to see if there are public APIs or datasets
about the topics you're considering. [This Public APIs repo][public-apis] is a
good place to start.  Researching data sources can take a while, and you'll need
to do a bit of digging. If you find an API or dataset, make sure:
* it's free or has a free tier
* there aren't overly restrictive limits on how much data you can request or how
  many requests you can make per day / month
* it's maintained / active, with quality data (test it out if you can)

No need to decide on a data source now, but you'll want to make sure there are
viable options for data sources before committing to a topic.

For visualizing your data, many students choose to use the [D3 library][d3];
poke around their website and see if it piques your interest. 

Keep in mind that a lot of the work with data visualization projects involves
formatting your data in a way that plays nicely with the D3 API. Do you find
filtering, traversing, and transforming data (in arrays, objects, etc.)
interesting and enjoyable? 

### Interactive Demo

Think about technologies you'd like to explore. Are you curious about the [Web
Audio API][audio-api]? Would you love to dive deeper into [CSS
animations][css-animations]?  A good place to start is MDN's list of [Web
APIs][web-apis], which are built into most browsers! Poke around and see what
captures your interest.

Once you find a technology you'd like to use, you can start thinking through how
you can demo its functionality: think proof of concept. Consider what the user
interaction will be and how you are going to divide responsibilities between
HTML, CSS, and JS. As with games, the ideal interactive demo will have a simple
core mechanic which is functional and interesting on its own, upon which you can
layer on additional twists & features over time.

[public-apis]: https://github.com/public-apis/public-apis 
[canvas]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API 
[d3]: https://d3js.org 
[web-apis]: https://developer.mozilla.org/en-US/docs/Web/API
[three.js]: https://threejs.org 
[audio-api]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API 
[css-animations]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations