# Full-stack Design Docs Preparation: State Shape

We've learned how important our state shape (and normalization) is to our 
keeping our application logic simple as our app scales.
Following what we've done in class, let's work on structuring our redux state.

Again, take some time to research the app you are cloning. While referring to 
your MVPs, keep these things in mind:
- What resources will I be fetching from the database?
- What else do I need to keep track of in my app? (current user info, form errors, loading spinners, sorting strategies for lists, etc.)

Create an outline of what your app's store will look like. This should be like a 
store snapshot, with each slice populated with some dummy data. Remember, we 
want to separate our concerns to keep it simple, so try to avoid putting every 
slice at the top-level. It is fairly common to create specific top-level 
reducers to delegate work to nested reducers. Some examples:

* `entities` - contains all resources fetched from database
* `ui` - contains view configuration data, such as: sorting, pagination, loading screens, et.
* `errors` - contains error information for different forms

## Example

[Here][bluebird]'s another example from _Bluebird_, our Twitter clone.

[bluebird]: https://github.com/appacademy/bluebird/wiki/sample-state