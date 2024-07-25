# Git Quiz

#### I want to push changes in my workspace to a remote repository. Which of the following outlines the correct workflow for pushing local changes to a remote repo?</p>
- [ ] workspace -> index (staging area) -> local repository -> upstream repository</answer>
- [ ] workspace -> local repository -> index (staging area) -> upstream repository</answer>
- [ ] local repository -> workspace -> index (staging area) -> upstream repository</answer>
    
<details><summary>Answer:</summary>workspace -> index (staging area) -> local repository -> upstream repository</details>
<details><summary>Explanation:</summary>We make changes to our local workspace, then we need to stage the changes so that they can be commited to our local repository (the hidden .git directory in our workspace) and then we can push them to the upstream remote repository.</details>

#### How would you create a new branch and switch to it at the same time?</p>
- [ ] `git -b checkout`</answer>
- [ ] `git branch`</answer>
- [ ] `git checkout -b`</answer>
- [ ] `git branch -co`</answer>

<details><summary>Answer:</summary>`git checkout -b`</details>
<details><summary>Explanation:</summary>`git checkout -b` will do both for us! Instead of having to run `git branch <branch-name>` and then `git checkout <branch-name>`</details>

#### Oh no! We've messed up and coded unwanted changes to our local project! How can we go back to a previous commit and get rid of the unwanted changes?</p>
- [ ] `git rollback --soft`</answer>
- [ ] `git undo HEAD`</answer>
- [ ] `git reset --hard`</answer>
- [ ] `git revert HEAD`</answer>

<details><summary>Answer:</summary>`git reset --hard`</details>
<details><summary>Explanation:</summary>`git reset --hard` will will wipe out all tracked changes back to the most recent commit.</details>

#### Our remote and local repositories have gotten so out of alignment that we just want to ignore any conflicts and push our local code up to remote. How would we do this?</p>
- [ ] `git push -f`</answer>
- [ ] `git push`</answer>
- [ ] `git force push`</answer>
- [ ] `git push -u`</answer>
<details><summary>Answer:</summary>`git push -f`</answer></details>
<details><summary>Explanation:</summary>The `-f` flag is short for `--force` which overrides any conflicts our local repo has with the remote repo.</details>