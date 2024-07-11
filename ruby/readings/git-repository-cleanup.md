# Git Repository Clean Up

Wouldn't it be nice if you could put all your a/A projects into one tidy
repository and still keep all your pretty green commit squares?

## Warning

**This is optional!**

Merging multiple projects into one 'super-repo' isn't a typical git pattern. All
your various projects' commits will live in one branch of one repo. This pattern
works OK for archived projects, but makes less sense for projects you'll be
updating often. In that scenario, just keep your repos separate.

If you still want all your a/A projects in one repo, then...

## Here's how it's done:

### Pre-requisite -- do this only once!

0. Create a new repo on GitHub -- call it `AppAcademyProjects` or something like
   that.

### At the end of each day

0. Open your project's root directory and create a folder named after the day,
   e.g. `w1d5`.
1. Move all of your project's content into that folder.
   - This namespaces the days folders and files so that they don't conflict with
     other days' folders/files.
   - **Don't move your .git folder!** Leave it at the root level.
1. Commit this change.
   - `git add .`
   - `git commit -m "namespace w1d5 work"`

### Once for each partner

0. Create a new branch.
   - `git checkout -b <your name>`
1. Fix your authorship.
   - Reference the reading on Fixing Git Commit Authorship in the 
     sidebar.
1. Add a remote to your `AppAcademyProjects` repository and name it after
   yourself.
   - `git remote add <your name> <your AppAcademyProjects' address>`
1. Merge your remote repository into your local repository.
   - `git pull <your name> main --no-edit --allow-unrelated-histories`
   - `--no-edit` tells Git that you don't want to edit the commit message.
   - `--allow-unrelated-histories` tells Git to perform the pull even though the
     local repo and remote repo don't share commit histories.
1. Push your merges to your remote repository.
   - `git push <your name> <your name>:main`
   - This pushes the local `<your name>` branch to your `AppAcademyProjects`
     main branch.
1. Switch back to `main` and repeat.
   - `git checkout main`