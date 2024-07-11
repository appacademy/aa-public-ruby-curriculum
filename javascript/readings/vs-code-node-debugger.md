# Debugging JS with VS Code debugger

This reading will focus on setting up the VS Code debugger configuration so we
can debug raw javascript files individually. The VS code built in debugger is a
powerful tool to help us accelerate our debugging. It allows us to code and
debug all in one place rather than using external tools.

We'll get to debugging more involved projects later in the course. For now,
we're going to be getting comfortable with using VS Code debugger features.
Let's start by adding some basic debugger configurations to VS Code that we'll
use to make our debugging lives easier during the JS curriculum!

# Setup

Make sure you have the Debugger for Chrome extension installed.

Lets go to our User Settings and add a "launch" object.

![user-settings][user-settings]

Click `Edit in settings.json`. This will open up our `settings.json` file. Let's
add some launch configuration to be able to debug our raw javascript. Add the
following to the top level of our settings object:

```json
"launch": {
        "version": "0.2.0",
        "configurations": [
            {
                "type": "node",
                "request": "launch",
                "name": "Launch Local Node File",
                "console": "integratedTerminal",
                "program": "${file}"
            },
            {
                "name": "Launch index.html",
                "type": "chrome",
                "request": "launch",
                "file": "${workspaceFolder}/index.html"
            },
        ]
    }
```

Below is an example of our `settings.json` file. Your `settings.json` might look
slightly different. Keep in mind that if you choose to copy these exact values
you will overwrite your previous settings:

```json
{
  "atomKeymap.promptV3Features": true,
  "editor.multiCursorModifier": "ctrlCmd",
  "editor.formatOnPaste": true,
  "window.zoomLevel": 2,
  "workbench.startupEditor": "welcomePage",
  "workbench.colorTheme": "Monokai Dimmed",
  "emmet.includeLanguages": {
    "erb": "html",
    "jsx": "html",
    "jsx": "js"
  },
  "[erb]": {},
  "editor.renderWhitespace": "none",
  "editor.minimap.enabled": false,
  "launch": {
    "version": "0.2.0",
    "configurations": [
      {
        "type": "node",
        "request": "launch",
        "name": "Launch Local Node File",
        "console": "integratedTerminal",
        "program": "${file}"
      },
      {
        "name": "Launch index.html",
        "type": "chrome",
        "request": "launch",
        "file": "${workspaceFolder}/index.html"
      }
    ]
  }
}
```

This allows us to run the VS Code debugger using the configuration information
included in the "launch" object, directly from a file we want to debug. For the
node configuration, the `"program"` (`"${file}"`) will be whatever file we have
open when we start the debugger, allowing us to directly test our JS code! When
we begin using webpack to bundle our files so that we can import and export, we
will use the "Launch index.html" configuration to debug.

Now we're all set up to test as we code!

Note: When one of these configurations does not work for a specific project, you
can add a local configuration directly to that project instead of adding the
configuration to your user settings. Note that the "Launch index.html"
configuration will only work for projects where the `index.html` file is in the
root directory for the project. A local configuration will be needed when our
`index.html` is nested in another directory.

[user-settings]:
  https://assets.aaonline.io/fullstack/javascript/readings/vs-code-debugger-settings.png

# Breakpoints

Add a breakpoint or `debugger` at any point that you would like to pause and
poke around to see what might be causing the bug. The VS Code debugger shows us
local and global variables available in the scope of our breakpoint, as well as
the context of `this`.

![variables][variables]

To add a breakpoint, you can right click on the line you'd like to add the
breakpoint to, or simply click in the editor margin on the line to get the red
breakpoint mark.

Note: A hollow grey breakpoint means that it is not being registered.

Another fun feature of the VS Code debugger is that we can insert _conditional_
breakpoints. In situations where we want to take a look around at a certain
point in our code but only if a certain condition is met, this makes our life so
much easier! No more having to hit the debugger unnecessarily 🎉!

Note: When we begin using webpack to bundle our files together to run in the
browser, we will need to use _the word_ `debugger` so that the VS Code debugger
will pause our code at our intended spots. The breakpoints don't get bundled
with the rest of our code when we use the default configuration of webpack.

[variables]:
  https://assets.aaonline.io/fullstack/javascript/readings/vs-code-debugger-window.png

# Console Logs

Anywhere in your code that you'd like something printed out to the console, you
can insert a logpoint. Anything written in `{}` will be interpolated!

Console logs are created the same way as a breakpoint. Right click on the line
where you'd like to add a console log. The beauty of these babies is that they
don't pollute your actual code and can be removed with the click of a button!
Simply click the red diamond to remove the logpoint.

# Watch Variables

If you want to see a variable and how it changes as you step through your code,
you can add the variable to be watched. Simply click the `+` in the `WATCH`
section. This is very similar to using `display` in byebug when we're debugging
ruby.

# Start Debugging

1. To execute your code and start debugging, click the debugging icon in the VS
   Code sidebar menu.

![debug][debug]

2. Select the desired debugging configuration from the dropdown menu next to the
   green play button.

3. Click the green play button to execute your code.

![debug_window][debug_window]

Note: Make sure you are invoking your function, etc!

[debug]: https://assets.aaonline.io/fullstack/javascript/readings/debug.png
[debug_window]:
  https://assets.aaonline.io/fullstack/javascript/readings/debug_window.png

# Homework Tonight

As you're going through your homework tonight, give each of the different tools
a try to start getting familiar with them. The better you get at debugging, the
better developer you will be! Get to squashing.
