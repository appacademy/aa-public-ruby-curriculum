# Git Quiz

<quiz>
  <question>
    <p>I want to push changes in my workspace to a remote repository. Which of the following outlines the correct workflow for pushing local changes to a remote repo?</p>
    <answer correct>workspace -> index (staging area) -> local repository -> upstream repository</answer>
    <answer>workspace -> local repository -> index (staging area) -> upstream repository</answer>
    <answer>local repository -> workspace -> index (staging area) -> upstream repository</answer>
    <explanation>We make changes to our local workspace, then we need to stage the changes so that they can be commited to our local repository (the hidden .git directory in our workspace) and then we can push them to the upstream remote repository.</explanation>
  </question>
</quiz>


<quiz>
  <question>
    <p>How would you create a new branch and switch to it at the same time?</p>
    <answer>`git -b checkout`</answer>
    <answer>`git branch`</answer>
    <answer correct>`git checkout -b`</answer>
    <answer>`git branch -co`</answer>
    <explanation>`git checkout -b` will do both for us! Instead of having to run `git branch <branch-name>` and then `git checkout <branch-name>`</explanation>
  </question>
</quiz>


<quiz>
  <question>
    <p>Oh no! We've messed up and coded unwanted changes to our local project! How can we go back to a previous commit and get rid of the unwanted changes?</p>
    <answer>`git rollback --soft`</answer>
    <answer>`git undo HEAD`</answer>
    <answer correct>`git reset --hard`</answer>
    <answer>`git revert HEAD`</answer>
    <explanation>`git reset --hard` will will wipe out all tracked changes back to the most recent commit.</explanation>
  </question>
</quiz>


<quiz>
  <question>
    <p>Our remote and local repositories have gotten so out of alignment that we just want to ignore any conflicts and push our local code up to remote. How would we do this?</p>
    <answer correct>`git push -f`</answer>
    <answer>`git push`</answer>
    <answer>`git force push`</answer>
    <answer>`git push -u`</answer>
    <explanation>The `-f` flag is short for `--force` which overrides any conflicts our local repo has with the remote repo.</explanation>
  </question>
</quiz>