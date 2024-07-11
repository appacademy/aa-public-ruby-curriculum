# Finding Resources & Reading Documentation

## Where to Start

Most major libraries and APIs have an official website. Go there first, and look
for something like an Introduction or Getting Started page, or a Guides section.
Then, once you have a basic sense of what's going on, look for a Documentation
or API section to get specifics, and to use as an ongoing reference for 
available methods and properties.

If you can't find an official website for a library, or if the official website 
is pretty sparse, look for a GitHub repository associated with the library. 
Those often have documentation or links to documentation. Another place to look 
is the package's page on the `npm` website, [npmjs.com][npm].

After doing some Googling, if you're still struggling to find resources or 
documentation, reach out to your peers and instructors!

## A Note on Plagiarism

Throughout this reading, you'll see references to tutorials and guides with 
example code, Stack Overflow answers with code snippets, etc. You should 
**never** find yourself copying code you find online and directly pasting it 
into your project. 

Use demo code as a learning tool, to experiment and familiarize yourself with 
how a library, a Web API, or a CSS property works. Keep the code separate from 
your project. Write your project code from scratch, building on the 
understanding you gained from experimentation. You should feel prepared to 
explain every line of code in your project.

If you find a code snippet that allegedly solves your problem, again, use it as 
a learning tool. Read up on the methods and techniques used in the code snippet. 
Then implement it on your own; it shouldn't look exactly like the code snippet. 

In rare circumstances, pasting code from online is permissible, as long as it's 
attributed. An example would be a CSS reset file. **Ask an instructor whenever** 
**you want to copy paste code, or if you're ever uncertain as to whether** 
**something constitutes plagiarism.**

## Follow Along with Guides

A good library website will include a tutorial or guide, or at least some 
example code. The [homepage for `d3`][d3], for instance, includes 
a pretty good introduction to `d3` with example code. 

On the other hand, sometimes you'll find  an excellent tutorial or guide on a 
third party website. MDN, for example, has great resources on many Web APIs, 
such as their guides for [Canvas][canvas-tutorial] and for [audio and video manipulation][audio-and-video-manipulation].

A good guide can be an invaluable resource. Don't just read through the whole 
thing in one sitting, and don't just look at the completed code at the end. 
Follow along on your own: create a blank demo project (could be just an `html` 
file and a `js` file), or copy an old project skeleton to use as a starting 
place. For every step taken or line written in the guide, mirror that step in 
your own code, and test that it works. 

Sometimes, some setup will be required that isn't detailed by the guide. For 
instance, the first example code on the `d3` homepage, which is about styling `p` 
elements, looks like this: `d3.selectAll("p").style("color", "blue")`. To follow 
along, I'd need to (1) install and import `d3`, and (2) have a demo `html` file 
that includes several `p` elements with text inside. That's it!

Experiment and be curious as you follow along! It might feel like slow going, 
but it'll pay off in the end.	

## Tinker With and Break Demo Code

Take some *working* demo code, whether it's the end result of a tutorial, a code 
snippet you found, or something you quickly wrote up, and tinker with it. Change 
one thing at a time: take out an attribute, switch the order of some code, 
adjust the value of a variable or argument. Observe what happens. See if you can 
break the example code, and make note of how you did so and why it broke.

As a simple example, the `d3` example code mentioned above looks like this: 
`d3.selectAll("p").style("color", "blue")`. I notice that `p` looks like a CSS 
selector; what if I try other CSS selectors? What if I chain on another call to 
`style`? Test these things out!

## Log and Inspect

As often as possible, use debuggers and `console.logs` to acquaint yourself with 
libraries and APIs. It'll help you get a grasp of what kinds of values variables 
point to, how data is structured, and when & how data is getting mutated. Some 
examples:

* Whenever you're getting data back from an API, `console.log` it, or better yet, 
throw in a debugger and inspect it in the console! How is it structured? What 
parts are arrays, what parts are objects, how deeply nested is the data you 
need? Right there in the console, experiment with whatever kind of keying into, 
iterating over, mapping, or filtering of the data you'll need to do in your 
code, to make sure you get the logic and syntax right.

* If you're using a library and you're not sure exactly what a method returns or 
what arguments you're being passed in a callback, throw in a debugger and 
inspect it. Maybe it's an instance of some class defined in the library; if so, 
check out the documentation for that class.

## Critically Evaluate Third Party Resources

There are way more places you can learn about a library or API, especially a 
popular one, besides its documentation or tutorials: Stack Overflow, GitHub 
issues, YouTube videos, blog posts, random developer forums, etc. You should 
definitely utilize this wealth of freely shared knowledge.

But obviously, not everything you encounter will be equally relevant, accurate, 
up-to-date, or advisable. On each of these counts, then, critically evaluate 
what you find:

* **Relevant**: On Q&A sites like Stack Overflow or forums, be sure to read the 
full question or opening post; it can be tempting to skip or skim it. Do you 
have the same problem? Are you trying to accomplish the same thing? You don't 
want to implement a solution for a problem you don't have. 

* **Accurate**: Take into account how many upvotes an answer or post gets, and 
take a look at the kind of comments a video or blog post receives. Often times, 
you'll see people dispute or ignore inaccurate answers. But that's not enough. 
You should also immediately test everything you read about (in the console, in a 
quick demo etc) to make sure it works like you expected.

* **Up-To-Date**: A perfect answer to a question 7 years ago might be a dreadful 
answer today. Things change quickly in the world of web development. Make sure 
to double check the date something was posted — the older a post, the more 
carefully you should investigate its accuracy. Check for any mention of the 
version of a library being used, and make sure it matches yours. Look into 
whether there have been any major version changes for your library, and if so, 
when those happened. Read about what those changes were, so you can spot 
outdated code. 

* **Advisable**: Sometimes you'll find a solution or approach that technically 
works, but isn't advisable. It could be as simple as bad code style in a Stack 
Overflow answer, or it might be a walkthrough that has you installing way more 
packages, doing way more configuration or setup, or writing way more boilerplate 
code than you really need. Always compare multiple answers; see if there is a 
better or simpler way. If something feels excessive or you catch a whiff of what 
you think is code smell, look into it more: do some Googling, ask an instructor, 
check in with your peers.

[npm]: https://www.npmjs.com/
[d3]: https://d3js.org/
[canvas-tutorial]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial
[audio-and-video-manipulation]: https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_manipulation