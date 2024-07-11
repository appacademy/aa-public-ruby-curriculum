# Rainbow Routes

Today we're going to get our first experience using React Router. The goal is to
create a basic app that displays the colors of the rainbow. This rainbow,
however, has something special about it - some of the colors are nested within
others.

## Phase 0: Setup

Download the [zip file][zip-skeleton] of the skeleton. Poke around to get
familiar with the setup; it should look pretty familiar. Run `npm install` to
get it setup. Then run `npm start` to start `webpack --watch`.

Open `index.html` in your browser and verify you can see the "Rainbow Router"
header. Currently there is no functionality. Let's fix that!

## Phase 1: Routes

First take a look at the entry file `entry.jsx`. Note that in the `Root`
component we have wrapped the `Rainbow` component in `<HashRouter>` tags. This
will make the router available to all descendent React Router components
such as `<Route />` and `<Link />`. Don't change the entry file - everything is
already set up for you.

Now open the file `components/rainbow.jsx`. We're going to render some of our
color components from here. Ultimately we want our routes to look like this.

| URL            | Components                  |
| -------------- | --------------------------- |
| `/`            | `Rainbow`                   |
| `/red`         | `Rainbow -> Red`            |
| `/red/orange`  | `Rainbow -> Red -> Orange`  |
| `/red/yellow`  | `Rainbow -> Red -> Yellow`  |
| `/green`       | `Rainbow -> Green`          |
| `/blue`        | `Rainbow -> Blue`           |
| `/blue/indigo` | `Rainbow -> Blue -> Indigo` |
| `/violet`      | `Rainbow -> Violet`         |

This means that the `Red`, `Green`, `Blue`, and `Violet` components need to
render in the `Rainbow` component, but only when we are at the corresponding
URL. We'll do this with `Route` components. (Refer back to the Intro reading
for details.) Add the necessary `Route` components inside the `div` with
`id="rainbow"` in the `Rainbow#render` method. For example, to render the `Red`
component you will want

```jsx
<Route path="/red" component={Red} />
```

Test that your code works! Manually type in each URL we just created, and you
should see the color component pop up. Remember, these are React Routes, so the
paths we created will come after the `#`. For example, our red route will look
like `<some-local-path>/skeleton/index.html#/red`.

We want to nest the `Orange` and `Yellow` components inside the `Red` component,
and the `Indigo` component inside the `Blue` component. You'll have to go add
the corresponding `Route` tags to the `red.jsx` and `blue.jsx` files. Make sure
to use the correct nested paths, such as `"/red/orange"` for the orange `Route`.

## Phase 2: Links

Manually navigating to our newly created routes is tiresome, so let's add
functionality to take care of this process for us. React Router provides the
Link component for this purpose.

Add links to the paths `/red`, `/green`, `/blue`, and `/violet` in the `Rainbow`
component. For example, your red link should look like

```jsx
<Link to="/red">Red</Link>
```

When we are at `blue` we want to be able to get to `/blue/indigo`, and then back
to `/blue`. Add the corresponding `Link`s to the `Blue` component like this:

```jsx
<Link to='/blue' >Blue only</Link>
<Link to='/blue/indigo' >Add indigo</Link>
```

Similarly, add `Link`s to `/red`, `/red/orange` and `/red/yellow` to the `Red`
component. Test all your links. Navigation is so much easier now!

## Phase 3: NavLinks

It would be nice if our links gave us some indication of which route we were at.
Fortunately, React Router has a special component for that very purpose:
`NavLink`. NavLinks get an extra CSS class when their `to` prop matches the
current URL. By default this class is called `active`.

Go ahead and switch all your `Link`s to `NavLink`s. If you open the app you
won't see any change yet. That's because we haven't added any special styling to
the `active` class. Go ahead and open the `application.css` file. Find the
`.active` class and add the line `font-weight: 700`. Now your active links will
be bold. Isn't that nice!

The only problem is that now the `Blue only` link is active even when the path
is `/blue/indigo`. That doesn't make a lot of sense. Let's add the `exact` flag
to that link so it will only be active when its `to` exactly matches the current
path. Now it should look like:

```jsx
<NavLink exact to="/blue">
  Blue only
</NavLink>
```

Do the same for the `Red only` link. Everything should be working now.

Compare your work to the solution and make sure the behavior is the same. Time
to celebrate! ✨ 🌈 ✨

[zip-skeleton]:
  https://assets.aaonline.io/fullstack/react/homeworks/rainbow_routes/skeleton.zip
