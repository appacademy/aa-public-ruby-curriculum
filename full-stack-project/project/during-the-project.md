# During The Project

Follow the instructions in this document once the project has started.
Make sure that you have completed everything in the proposal
instructions first.

## Design Documents

We want to make sure that our design docs are up to date with our app's
implementation. This allows us to reference them later without digging
through code and will help us better plan future features. Whenever your
implementation strays from the design you laid out, make sure to update
your docs to reflect those changes. If you're making major changes, feel
free to run them by your PA to make sure you're on the right track.

## Creating Issues

You will complete this phase for each MVP directly before coding it.
Please do not create all of the issues for your project at once. Creating
an issue for an MVP will be your final chance to think about your planning
for this component immediately before you start coding it.

We'll start with only one issue. There will be more to add later, don't
worry.

1. Create an issue called `PA Review: {MVP}` (Project Advisor Review).
  If you are working on user authentication, the issue would be called
  `PA Review: User Authentication`.

![Create Github issue][create_issues]

2. In the description of this issue, create a checklist in markdown
  containing each of the below, if it pertains to this MVP. Copy the code
  below to do this.

```md
- [ ] Backend: DB, model, controller, views
- [ ] Redux Loop: ajax, actions, reducer
- [ ] Presentational Components and Containers
- [ ] Styling
- [ ] Smooth, bug-free navigation
- [ ] Adequate and appropriate seeds
```

![Make checklist][checklist]

3. Attach the label `core feature` to the issue

## Using PA Review Issues

The PA Review issue is how your PA will track your progress and give you
feedback.

From the 'Issues' tab, you can view all open issues.

![Issues overview][issues_overview]

1. As you create your app, you will write enough code to satisfy an item
  on the checklist. Make sure that you have tested that part of your code
  thoroughly! Once you have thoroughly tested, check off that list item in
  your `PA Review` issue.

2. Once all of your list items are complete, _assign_ this issue to your
  project advisor. Upon assigning them, they will receive a notification
  and know to review your work (both the code and Render.com!).

![Assign issue][pm_review_issue]

3. Your PA will review your code and your Render.com site.
  + If they are satisfied, your PA will close the issue and this MVP is
    considered complete.
  + Alternatively, if there are any additional changes to be made, your PA
    will leave a comment with checklists describing the needed changes in
    a list. At which point, you should:

    1. Make the changes for each list item and check it off
    2. When all are complete, leave a new comment on the `PA Review` issue
      with your PA's Github username. This will email them so they know to
      review it.

![PA Feedback][pm_feedback]

There may be some time between finishing the checklist and getting
feedback from your PA (like over the weekend). If this happens, start work
on your next MVP while you wait. When you do get feedback, you need to go
back and complete those before continuing on with your new MVP. The
changes you need to make may affect the new MVP so it will be best to
complete them ASAP.

## Using Other Issues

Feel free to add any other issues you want to help you track tasks or
problems you encounter in your app. This can help give you a great view
your progress at a high level.

As long as an issue is not a `PA Review` issue, feel free to close it
yourself! You can include a [special command `resolves`][git_keywords] in
your git commit message telling GitHub to automatically close the issue.
Simply include the keyword and the number of the issue that you are
closing, and GitHub does the rest when you push to main!

![GCM resolves issue][gcm_resolves_issue]

[checklist]: https://assets.aaonline.io/fullstack/full-stack-project/proposal/assets/checklist.png
[create_issues]: https://assets.aaonline.io/fullstack/full-stack-project/proposal/assets/create_issues.png
[pm_feedback]: https://assets.aaonline.io/fullstack/full-stack-project/proposal/assets/pm_feedback.png
[pm_review_issue]: https://assets.aaonline.io/fullstack/full-stack-project/proposal/assets/pm_review_issue.png
[issues_overview]: https://assets.aaonline.io/fullstack/full-stack-project/proposal/assets/issues_overview.png

[git_keywords]: https://help.github.com/articles/closing-issues-using-keywords/

[gcm_resolves_issue]: https://assets.aaonline.io/fullstack/full-stack-project/proposal/assets/gcm_resolves_issue.png
