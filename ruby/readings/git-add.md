# Using Git `add`

Use `git add <files>` or `git add -A` instead of `git add .` or `git add -u`.

## The Background

When you run `git add .`  you're telling git, "take everything that's new or has
changed in my current directory and add it to the staging area". We discourage
this, because we usually are only working on a few files at a time and it is
easy to accidentally include files that have sensitive information (such as API
Keys, etc.).

When you run `git add -A` you are telling git, "take my all the changes from my
entire project up to my top level directory(where the .git directory resides)
and add those to my staging area". We also discourage this, because we usually
are only working on a few files at a time and it is easy to accidentally include
changes that have nothing to do with the current commit.

What should I do instead?

-  You should be adding individual files as you create them and running `git add
   <file>`.
    - This way you avoid adding any unwanted files and your commits are
      isolated. 

NOTE: `-A` and `-u` are options of the `git add` command. They use the project
directory if you don't explicitly give them a filepath, e.g. `git add -u
lib/board`. For example, `.` is the filepath that you pass in as an argument to
`git add`.

`git add -u` adds all new and updated files (but doesn't include deleted files!)
- this command isn't as relevant when using Git 2.0.  


## The Visuals

<table>
  <tr>
    <td><strong>Command</strong></td>
    <td><strong>`git add .`</strong> (current directory)</td>
    <td><strong>`git add -u`</strong> (update)</td>
    <td><strong>`git add -A`</strong> (all)</td>
    <td><strong>Recommended: `git add <files>`</strong> (explicit)</td>
  </tr>
  <tr>
    <td>Effect</td>
    <td>Adds everything that is new/has changed in the current directory.</td>
    <td>Updates already tracked files and removes them from staging area if they're not in the working directory.</td>
    <td>Finds new files as well as updating old files. (git add . + git add -u)</td>
    <td>Adds, updates or deletes listed files.</td>
  </tr>
  <tr>
    <td>Downside</td>
    <td>Easy to accidentally include changes that have nothing to do with current commit</td>
    <td>Doesn't track new files!</td>
    <td>Easy to accidentally include changes that have nothing to do with current commit</td>
    <td>Can be tedious for many files.</td>
  </tr>
</table>
