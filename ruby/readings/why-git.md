# Git

## What is this thing called Git?

Git is a Version Control System.

So far, we've been working on small projects with small groups. If we make
mistakes, it isn't too hard to backtrack. However, as we begin to work on larger
projects with larger groups, revising and adding code can become a tricky
endeavor. What if one team member accidentally overwrites important code written
by another team member? What if two team members try to edit a section of code
at the same time? Disaster could ensue!

Enter Version Control Systems. Version Control Systems allow us to:

* Keep a log of changes made to a project
* Revert the project back to a previous state if we mess something up

Git also provides us an easier workflow to develop as a team, such as the
ability to separate our work from others using branches. A branch is like a
private copy of the main project that can be changed without modifying the
original. These branches, when complete, may be merged back into the main
project, bringing with it the accumulation of all the little changes made on it.

## How Git Stores Things

Two important concepts:

1. Git stores data as a series of snapshots.

  * Every time you make a commit, or store your data, Git takes a snapshot of
    all the changes you've made and stores a reference to that snapshot. We can
    easily look through previous commits and see what changes were made in each
    one. This concept of a "stream of snapshots" is what makes Git different
    from most other Version Control Systems.

2. Git performs most operations locally.

![distributed-centralized][dist-cent]

[dist-cent]: https://git-scm.com/book/en/v2/book/05-distributed-git/images/centralized_workflow.png

Git is distributed but centralized. What does that mean?

While a "master copy" of each repository (aka project) often lives in a remote
location such as Github, each project contributor also keeps a copy of the repo,
along with its version history, locally. When we want to look through past
changes or save new changes to the project, we look to our local repo - no need
to fetch data from the server every time.

Only when we want to push our changes up to the remote "master copy" or grab
other people's changes do we fetch from or push to Github.

For more details on how Git works and how it's different from other Version
Control Systems, check out [this excellent and detailed reading][git-reading].

[git-reading]: https://git-scm.com/book/en/v2/Getting-Started-Git-Basics

## The Three States of Git

So, how do we actually take advantage of Git's version control system? First,
lets learn about the three states of Git.

![git-stages][git-stages]

[git-stages]: https://git-scm.com/book/en/v2/book/01-introduction/images/areas.png

Files can live in three different states: modified, staged, and committed. A
typical Git workflow goes like this:

1. You make changes in your working directory. Your files are now **modified**.
2. You decide which files you want to add to your next commit and add them to
   the staging area. Your files are now **staged**. Don't want a change to be
   committed? Simple - don't stage that file.
3. You commit all of the files in your staging area and create a snapshot which
   permanently lives in your local Git directory. Your files are now
   **committed**.

(Note: all of this happens locally. Pushing files to your remote repository is a
separate business.)

Ok, so how do we actually stage and commit files? To be explained in the
following readings!
