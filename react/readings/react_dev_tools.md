# React Developer Tools

The React Developer Tools can greatly expedite the process of writing and
debugging React code. Let's look at why and how you can use them.

## Debugging React is Hard

React is a great front-end framework, but can be tough to debug or see the big
picture. Nested components defined in other disparate folders and JSX syntax
make it hard to get a clear snapshot of your component hierarchy and each
component's internal state.

## React Developer Tools are Wicked Easy

React Developer Tools are easy to install and require no setup. Just install the
[React Developer Tools Chrome Extension][chrome_extension] and open up the
Chrome Console. You should see two new tabs, `Components` and `Profiler`. The
`Components` tab will show you all your components and give you access to their
state. The `Profiler` tab can help provide performance information for properly
configured apps.

![React Dev Tools Image][img]

You can even use React Developer Tools on the [React homepage][react_home]. So
meta. A couple things to try:

* Inspect a component, looking at it's props and state
* Change a component's state from the console
* Compare a component to the native HTML it generates (look at the `Elements`
  tab)

Take a few minutes to install the extension and play around with it! Investigate
some of your past projects to get a feel for how it works, then try to
incorporate it into your workflow as you build future React projects. If
nothing else, it will help expand your visual model of React and the component
hierarchy.

[chrome_extension]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en-US
[react_home]: https://reactjs.org/
[img]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/fullstack/react/assets/React+DevTools.png
