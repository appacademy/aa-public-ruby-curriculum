# Fixing Git Commit Authorship

So you and your pair are doing it right, committing each piece of functionality
for the day's project as you go along. Then the day ends, and you decide to push
your work to GitHub to receive some precious *green squares*. But what's this?
All the commits are attributed to App Academy Student! Or worse, a classmate
accidentally added `--global` to the `git config` command, and now all the
attributions are belong to them!

But there's still hope. Though you may not know it yet, you have the power to
rewrite a Git repository's history. This means you can change the recorded
author name and email, even after the history has been written. This power can
be quite dangerous if not yielded with the utmost care and wisdom. Therefore,
take heed of the advice that follows, lest you lose your beloved code.

## Caveats

- Never rewrite history in a repo you're sharing with someone else who already
    has the commits on their computer. Rewriting history changes the commit
    hashes, so the other person will have huge issues pulling and pushing if you
    change the hashes of existing commits on the shared repo.
- If you've cloned the repo from somewhere (e.g. a project skeleton), this
    command will rewrite the authorship for all commits, even those that aren't
    yours. This probably isn't what you want; unearned squares just don't feel
    the same.

## The Command

Follow these steps to rewrite your history so all commits have your name and
email.

1. **Create a backup branch.** That way, if something goes wrong, you can always
    get back to your original state.

    ```bash
    git branch wrong-author
    ```

    Seriously, any time you rewrite commits **for any reason**, backup the
    branch first!

2. Run this command in the Terminal from within your repo's root directory,
    *being sure to put your information in place of the placeholders*

    ```bash
    git filter-branch -f --env-filter "GIT_AUTHOR_NAME='your_full_name'; GIT_AUTHOR_EMAIL='your_email'; GIT_COMMITTER_NAME='your_full_name'; GIT_COMMITTER_EMAIL='your_email';" HEAD
    ```

3. If you've already pushed your repo to GitHub (or elsewhere), add `-f` to `git
    push` to *force push*, as all your commits now have different hash's from
    what they were before you rewrote the history.
4. Go to your GitHub profile and bask in the glory of your newly-acquired green
    squares.
