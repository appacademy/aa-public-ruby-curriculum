# Performance and Scaling

Performance and scaling are two very common interview topics. Being able to
relate questions about them back to your FSP is a great way to demonstrate your
command of React and Rails. Below are some resources to get you started building
a faster site.

## React

React provides multiple tools and strategies for optimizing the performance of
your application, outlined in this [comprehensive guide][react-optimization].

One way to optimize is to speed up the actual execution of your React
application as the user interacts with it. This generally means avoiding
unnecessary and redundant work: only re-rendering your components when you need
to and making the render time as fast as possible.

Another way to optimize is to reduce how much data and code a user needs to load
over the network before they can interact with your app. This generally means
reducing your initial bundle file size.

Let's look at a few key strategies for both of these types of React
optimization.

### Speed: Measuring performance

Before you start optimizing, it's best to know if it's necessary, and if so,
which parts of your application need optimization. 

React provides a way to measure how many times your app is rendering and how
long each render takes via the [Profiler tab of its developer
tools][profiler-devtools]. The general process is this:

1. Start recording.
2. Interact with your app.
3. Stop recording.
4. Get data and graphs showing how many times your app re-rendered while you
   were recording and how long each re-render took. These stats are also
   provided for each individual component. 

If you want finer-grained control in tracking and logging this data, you can use
the [`Profiler`][profiler-api] component included in the `react` library:

```js
 <Profiler id="stuff" onRender={(...stats) => console.log(stats)}>
   <Stuff />
 </Profiler>
```

Just wrap any part of your app in a `Profiler` component with an `onRender`
callback prop. Whenever that part of your app mounts or updates, the `onRender`
callback gets invoked with a bunch of data about that render. Check out [the
official documentation][profiler-api] to learn more. 

### Speed: `React.memo`

Whenever a parent component re-renders, its children re-render too. Often, this
is very important, since the parent might pass different props to its children. 

But what if a children's props remain unchanged, and you know for a fact that it
is a *pure function* of its props--i.e., given the same props, it will render
the exact same JSX?

You can tell React that a component does not need to re-render if its props
remain unchanged by wrapping that component in `React.memo(component)`. React
will cache the output of a memoed component. When it would typically re-render,
React will first compare its new props to its old props. If they are equal,
React won't re-render the component, instead using the cached output. 

Check out [the documentation][react-memo] for more details.

### Bundle Size: Code splitting

Your bundle file can be very large and result in slow load times when a user
first navigates to your site. It includes the code for every component that
could ever appear in your application--plus whatever libraries those components
rely on!

*Code splitting* allows you to separate your code into multiple bundle files.
Suppose you are creating a running app that includes a page, `/map`, where you
can plan a route. You could have one bundle file with your primary application
code, and another bundle file that includes just the `MapPage` component and
whatever mapping library it uses. The map bundle file could then only be loaded
when you go to `/map`.

Thankfully, Webpack provides [built-in support][webpack-code-splitting] for code
splitting. It automatically splits your code when you use a [dynamic import]--a
function, `import(path)`, which only loads the imported file or module when you
invoke it.

It's best to integrate dynamic imports with `react-router`--loading a routed
component only when the user navigates to the matching route. Check out the
[React Router documentation about code-splitting][react-router-code-splitting]
for an explanation and examples on how to implement this!

### Speed & Bundle Size: Windowing

While code splitting allows you to get around having to make the browser handle
an overly large bundle file, that still leaves you with potentially
unnecessary rendering of complex elements on the user's current page. 

For instance, when you render very large lists or tables, you generally want to
avoid rendering elements at the bottom of the list until the user scrolls and
those components are about to come into view. Think of how Twitter fetches and
renders more tweets as you scroll down; if you scroll slowly enough, you'd never
know those tweets weren't there all along. This strategy is known as
*windowing*.

While you can roll your own windowing functionality, there are also a number of
excellent NPM packages out there that can quickly be integrated with your app.
Two packages React recommends are:

- [`react-virtualized`]
- [`react-window`]

## Rails

### Caching with Redis

Using a tool like Redis can speed up data-intensive SQL queries on the backend
by holding data-sets in memory for fast retrieval. Redis can be used to store
recently queried data, effectively caching it so later requests for that data
never hit the database, but are instead served by Redis.

<!-- 
- [Caching in Rails][rails-caching]
- [Caching with Redis in Rails][redis-caching]
- [Caching railscasts][railscasts-caching]
-->

## More resources

- [Site Performance][yahoo-performance]
- **Tool**: [Google's PageSpeed Insights][pagespeed]
- **Bonus: Front-end Performance Resources**: [jankfree.org][jankfree]

[profiler-api]: https://reactjs.org/docs/profiler.html
[profiler-devtools]: https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html
[react-optimization]: https://reactjs.org/docs/optimizing-performance.html
[`react-virtualized`]: https://github.com/bvaughn/react-virtualized
[`react-window`]: https://react-window.now.sh/
[react-memo]: https://reactjs.org/docs/react-api.html#reactmemo
[webpack-code-splitting]: https://webpack.js.org/guides/code-splitting/
[dynamic import]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#dynamic_imports
[react-router-code-splitting]: https://v5.reactrouter.com/web/guides/code-splitting
[rails-caching]: caching-in-rails
[redis-caching]: caching-with-redis-in-rails
[railscasts-caching]: http://railscasts.com/?tag_id=18
[yahoo-performance]: https://developer.yahoo.com/performance/rules.html
[pagespeed]: https://developers.google.com/speed/pagespeed/insights/
[jankfree]: http://jankfree.org/
