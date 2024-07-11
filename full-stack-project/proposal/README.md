# Full-Stack Design Documents

Welcome to full-stack projects! This is a hectic and exciting time, and it
represents the culmination of your education at App Academy. Now that you've
chosen your project, we want to help you build the best projects possible; so
we'll help you come up with a road map to keep yourself on track.

We are going to use Github's built-in project management to store all your
planning materials. The main document will be a wiki that outlines all the major
facets of your development process.

## Sample Design Docs

To get started, take a look at this [sample repo][sample]. This is what your
design docs should look like by the time you've finished it. We want it to be
comprehensive, well-organized, and well-polished. This is not just for our
benefit; by the time you start implementing your project, you will have already
thought carefully about the functionality and scope of each feature, allowing
your future self to focus completely on writing the code for it.

[sample]: https://www.github.com/appacademy/bluebird/wiki

## Creating Your Design Docs

The Github wiki of your project repo MUST include the following:

### Render.com Link

At the end of the first day of full-stack projects, you should have a link to
the live version of your site. It doesn't have to be pretty, but it has to be
there. Push to Render ASAP!

### Minimum Viable Product

- `mvp-list`

Write a one-sentence summary of the project and a list of the features that
would be absolutely necessary for the app to be marketable. Your MVP section
must follow the format outlined [here][mvp-features].

[mvp-features]: mvp-checklist

### DB Schema

- `schema`

Link to a document outlining the database schema for your app. Build up the
schema by walking through your app's wireframes. Think carefully about what data
will be needed for each view and the best way to store that data. Make note of
any database-level validations and foreign key relationships.

### Sample State

- `sample-state`

Create a basic illustration of your state shape. Think about what information
you need to store for your app to work, and how best to organize it to minimize
duplication and maximize ease of access.

### Frontend Routes and Components

- `frontend-routes`

Link to a page that lists your frontend React Router routes. Discuss what
components will be rendered at those routes.

### Backend Routes

- `backend-routes`

Link to a page that lists your Rails API endpoints. Break these up between HTML
and JSON endpoints.

### Implementation Timeline

This is crucial both here and in the industry. The truth is, one never knows how
long implementing any particular phase will take. Constraints change. Timelines
are shortened without warning. An app after any phase must be able to stand on
its own. We call this building in 'slices' instead of 'layers'. To create your
timeline, add due dates to each feature of your MVP List on your project wiki.

## Submission

Email the repo link to your Instructional team (instructors-sf@appacademy.io or
instructors-ny@appacademy.io). A TA will review your design docs and leave their
comments in issues on the project repo. Be prepared to respond to feedback, and
keep your wiki up to date as you make progress. Happy hunting!
